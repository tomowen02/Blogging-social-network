const express = require('express');
const router = express.Router();
const passport = require("passport");
require("../configs/passportConfig")(passport);
const { ensureAuth, ensureGuest } = require('../middleware/auth.middleware');

// Redirect the user to the Google signin page</em> 
router.get("/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);
// Retrieve user data using the access token received</em> 
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: '/auth/error' }), (req, res) => {
        console.log(req);
        res.redirect("/");
    }
);

router.get('/logout', async (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;