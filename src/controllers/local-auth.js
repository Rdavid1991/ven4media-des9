const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {

    const user = await User.findOne({ email: email });

    if (user) {
        return done(null, false, req.flash('signupMessage', 'El email ya existe'));
    } else {
        const user = new User();
        user.email = email;
        user.password = user.encryptPassword(password);
        await user.save();
        done(null, user);
    }
}));

passport.use("local-signin", new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        return done(null, false, req.flash("signinMessage", "No user found"));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash("signinMessage", "Incorrect Password"));
    }

    done(null, user);
}));