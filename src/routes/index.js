const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');

const home = require('../controllers/home');
const create = require('../controllers/create');
const blob = require('../controllers/urlBlob');



module.exports = app => {

    //Pantallas listar, subir archivos y home
    router.get('/', home.home);
    router.get('/images', home.images);
    router.get('/videos', home.videos);
    router.get('/sounds', home.audios);
    router.get('/upload', isAuthenticate, home.upload);

    //Session
    router.get('/signup', auth.signup);
    router.post('/signup', auth.signupCreate);
    router.get('/signin', auth.signin);
    router.post('/signin', auth.signinLogin);
    router.get('/profile', isAuthenticate, auth.profile);
    router.get('/profile/images', isAuthenticate, auth.images);
    router.get('/profile/videos', isAuthenticate, auth.video);
    router.get('/profile/audios', isAuthenticate, auth.audio);
    router.get('/*logout', auth.logout);

    //Likes
    router.post('/images/:image_id/like', home.imgLike);
    router.post('/videos/:video_id/like', home.vidLike);
    router.post('/audios/:audio_id/like',home.audLike);

    router.get('/watch/:video_id', blob.videoModal);
    router.get('/video-file/:video_id', blob.videoPreview);

    router.post('/upload', isAuthenticate, create.data);

    router.get('/video/miniature/:miniature_id', blob.miniature);

    router.get('/image/payment/:image_id',isAuthenticate,auth.imagePayment );
    router.get('/video/payment/:video_id',isAuthenticate,auth.videoPayment );
    router.get('/audio/payment/:audio_id',isAuthenticate,auth.audioPayment );


    router.get('/stripe-key',isAuthenticate,auth.stripeKey);
    router.post('/pay',isAuthenticate,auth.pay);

    router.get('/download/:file_id',isAuthenticate,auth.download);

    router.get('/profile/seller', isAuthenticate,auth.seller);

    app.use(router);
};


function isAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}
