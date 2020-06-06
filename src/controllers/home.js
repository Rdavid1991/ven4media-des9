const { Image, Video } = require('../models');

module.exports = {

    /* Mostrar pantalla principal */
    home: async (req, res) => {
        res.render('home');
    },

    /* Mostrar lista de imagenes */
    images: async (req, res) => {
        const images = await Image.find({});
        let viewModel = { images: [] };
        viewModel.images = images;
        res.render('images', viewModel);
    },

    sounds: async (req, res) => {
        res.render('sounds');
    },

    videos: async (req, res) => {
        const videos = await Video.find({});
        let viewModel = { videos: [] };
        viewModel.videos = videos;
        res.render('videos', viewModel);
    },

    upload: async (req, res) => {
        res.render('upload');
    }
};