const passport = require('passport');

const {Image, User} = require('../models');
const { image } = require('./urlBlob');

module.exports = {
    signup: (req, res, next) => {
        res.render('signup');
    },

    signupCreate : passport.authenticate("local-signup", {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        passReqToCallback: true
    }),

    signin: (req, res, next) => {
        res.render('signin');
    },

    signinLogin: passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        passReqToCallback: true
    }),

    profile: (req, res, next) => {
        res.render('profile');
    },

    images: async(req,res)=>{
 
        const images = await Image.find({userid:req.user._id});

        res.render('profile', {images, image:true});
    },

    logout: (req, res, next) => {
        req.logout();
        res.redirect('/');
    },
};