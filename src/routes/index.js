const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const create = require('../controllers/create');
const preview = require('../controllers/preview');
const blob = require('../controllers/urlBlob');
const uploaded = require("../controllers/uploaded");


module.exports = app => {

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


    router.get('/upload', home.upload);
    router.post('/upload', create.data);

    router.get('/video/miniature/:miniature_id', blob.miniature);

    app.use(router);
};

