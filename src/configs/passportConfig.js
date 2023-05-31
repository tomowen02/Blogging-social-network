const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback : true
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'authInfo.authID': profile.id });
            // if user exists return the user
            if (existingUser) {
              return done(null, existingUser);
            }
            // if user does not exist create a new user
            console.log('Creating new user...');
            const newUser = new User({
                authInfo: {
                    method: 'google',
                    authID: profile.id
                },
                name: profile.displayName,
                email: profile.emails[0].value,
                profileSlug: "test"
            });
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
      }
    ));
    
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
      User.findById(id).then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
    });
}