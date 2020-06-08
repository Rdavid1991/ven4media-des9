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
    router.get('/images/preview/:image_id', preview.img);//Preview de las imagenes listadas en un modal
    router.get('/images/miniature/:image_id', preview.imgMiniature);//Muestra imagenes con marca de agua
    router.get('/image-file/:image_id', blob.image);


    /* Rutas de video */
    router.get('/videos', home.videos);
    router.get('/video/:video_id', preview.video);
    router.get('/watch/:video_id', blob.videoModal);
    router.get('/video-file/:video_id', blob.videoPreview);


    router.get('/upload', home.upload);



    router.get('/video/miniature/:miniature_id', blob.miniature);


    router.post('/upload', create.data);


    app.use(router);
};

