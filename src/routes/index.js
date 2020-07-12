const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');

const home = require('../controllers/home');
const create = require('../controllers/create');
const preview = require('../controllers/preview');
const blob = require('../controllers/urlBlob');
const uploaded = require("../controllers/uploaded");


module.exports = app => {

    
    router.get('/signup', auth.signup);
    router.post('/signup', auth.signupCreate);

    router.get('/signin', auth.signin);
    router.post('/signin', auth.signinLogin);

    router.get('/profile', isAuthenticate, auth.profile);
    router.get('/profile/images', isAuthenticate, auth.images);

    router.get('/*logout', auth.logout);

    router.get('/', home.home);
    router.get('/sounds', home.sounds);

    /* Rutas de imagenes */
    router.get('/images', home.images);//Lista todas las imagenes
    router.get('/images/:image_id', uploaded.img); //muestra los archivos reciensubidos del usuario
    router.post('/images/:image_id/like', home.imgLike);

    /* Rutas de video */
    router.get('/videos', home.videos);
    router.get('/video/:video_id', preview.video);
    router.get('/watch/:video_id', blob.videoModal);
    router.get('/video-file/:video_id', blob.videoPreview);

    router.post('/videos/:video_id/like', home.vidLike);


    router.get('/upload',isAuthenticate, home.upload);
    router.post('/upload',isAuthenticate, create.data);

    router.get('/video/miniature/:miniature_id', blob.miniature);


    app.use(router);
};


function isAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
