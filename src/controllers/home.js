const { Image, Video } = require('../models');
const like = require('./process/like');

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
    },

    imgLike: async (req, res) => {
        res.json({ like: await like(Image, req.params.image_id) });
    },

    vidLike: async (req, res) => {
        res.json({ like: await like(Video, req.params.video_id) });
    }
};