module.exports = {
    ensureAuth: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/auth/google');
        }
    },
    ensureGuest: (req, res, next) => {
        if(!req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    },
    ensureAdmin: (req, res, next) => {
        if(req.user.isAdmin) {
            return next();
        } else {
            res.redirect('/');
        }
    },
    ensureAuthor: (req, res, next) => {
        if(req.user.isAuthor) {
            return next();
        } else {
            res.redirect('/');
        }
    },
}