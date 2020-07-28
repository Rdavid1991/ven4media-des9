const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email, password, done) => {

    const dbuser = await User.findOne({ email: email });

    if (dbuser) {
        return done(null, false, req.flash('signupMessage', 'El email ya existe'));
    } else {
        let val = false;
        const newUser = new User();
        const {name,lastName,user,role} = req.body;

        if (role === "on") {
            val = true;
        }

        newUser.email = email;
        newUser.name = name;
        newUser.lastName = lastName;
        newUser.user = user;
        newUser.password = newUser.encryptPassword(password);
        newUser.seller = val;

        await newUser.save();
        done(null, newUser);
    }
}));

passport.use("local-signin", new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const dbuser = await User.findOne({ email: email });

    if (!dbuser) {
        return done(null, false, req.flash("signinMessage", "Usuario no encontrado"));
    }
    if (!dbuser.comparePassword(password)) {
        return done(null, false, req.flash("signinMessage", "Contraseña incorrecta"));
    }

    done(null, dbuser);
}));