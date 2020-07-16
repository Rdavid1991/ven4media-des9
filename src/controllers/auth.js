const passport = require('passport');

const {Image, Video, Audio} = require('../models');

module.exports = {
    signup: (req, res) => {
        res.render('signup');
    },

    signupCreate : passport.authenticate("local-signup", {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        passReqToCallback: true
    }),

    signin: (req, res ) => {
        res.render('signin');
    },

    signinLogin: passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        passReqToCallback: true
    }),

    profile: (req, res) => {
        res.render('profile');
    },

    images: async(req,res)=>{
 
        const images = await Image.find({userid:req.user._id}).sort({timestamp:'desc'});

        res.render('profile', {images, image:true});
    },

    video: async(req,res)=>{
 
        const videos = await Video.find({userid:req.user._id}).sort({timestamp:'desc'});

        res.render('profile', {videos, video:true});
    },

    sound: async(req,res)=>{
 
        const audios = await Audio.find({userid:req.user._id}).sort({timestamp:'desc'});

        res.render('profile', {audios, audio:true});
    },

    logout: (req, res ) => {
        req.logout();
        res.redirect('/');
    },
};