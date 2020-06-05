const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const create = require('../controllers/create');
const images = require('../controllers/images');
const url = require('../controllers/urlBlob');


module.exports = app => {

    router.get('/', home.home);
    router.get('/images', home.images);
    router.get('/sounds', home.sounds);
    router.get('/videos', home.videos);
    router.get('/upload', home.upload);
    router.get('/images/:image_id', images.index);
    router.get('/image-file/:image_id', url.image);
    router.get('/img/preview/:image_id',url.preview);


    router.post('/upload', create.data);


    app.use(router);
};

