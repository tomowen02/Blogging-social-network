if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const bodyParser = require('body-parser')

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

// Set up routes
const indexRouter = require('./src/routes/index.route');
app.use('/', indexRouter);
const postRouter = require('./src/routes/posts.route');
app.use('/posts', postRouter);
const authorRouter = require('./src/routes/authors.route');
app.use('/bloggers', authorRouter);
const adminRouter = require('./src/routes/admin_controls.route');
 app.use('/admin', adminRouter);

app.listen(process.env.PORT || 3000);