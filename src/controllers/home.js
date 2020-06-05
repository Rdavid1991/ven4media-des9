const { Image } = require('../models');

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
        res.render('videos');
    },

    upload: async (req, res) => {
        res.render('upload');
    }
};