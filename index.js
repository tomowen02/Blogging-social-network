if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { ensureAuth, ensureGuest, ensureAdmin } = require('./src/middleware/auth.middleware');

app.use(express.static(path.join(__dirname, '/src/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views')); //!TEMP needed?
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// Set up database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
.then((res) => {
    console.log('Connected to database!');
}).catch((err) => {
    if (err) {
        console.log('An error has occured while connecting to the database. ' +err);
        return;
    }
});
const db = mongoose.connection;

// Passport and sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true },
    store: MongoStore.create({ client: mongoose.connection.getClient() })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        res.locals.amAuthor = req.user.isAuthor;
        res.locals.amAdmin = req.user.isAdmin;
        next();
    } else {
        res.locals.user = null;
        next();
    }
})

// Set up routes
const indexRouter = require('./src/routes/index.route');
app.use('/', indexRouter);
const authRouter = require('./src/routes/auth.route');
app.use('/auth', authRouter);
const postRouter = require('./src/routes/posts.route');
app.use('/posts', postRouter);
const authorRouter = require('./src/routes/authors.route');
app.use('/bloggers', authorRouter);
const adminRouter = require('./src/routes/admin_controls.route');
app.use('/admin', ensureAdmin, adminRouter);

app.listen(process.env.PORT || 3000);