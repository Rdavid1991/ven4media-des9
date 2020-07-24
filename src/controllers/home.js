const { Image, Video, Audio, UserLike } = require('../models');

module.exports = {

    /* Mostrar pantalla principal */
    home: async (req, res) => {

        const images = await Image.find({}).sort({ likes: 'desc' }).limit(5);
        const audios = await Audio.find({}).sort({ likes: 'asc' }).limit(5);
        const videos = await Video.find({}).sort({ likes: 'asc' }).limit(5);

        let viewModel = { audios: [], images: [], videos: [] };

        viewModel.images = await getLike(req,images);
        viewModel.videos = await getLike(req,videos);
        viewModel.audios = await getLike(req,audios);

        res.render('home', viewModel);
    },

    /* Mostrar lista de imagenes */
    images: async (req, res) => {

        const images = await Image.find({});

        let viewModel = { images: [] };
        viewModel.images = await getLike(req, images);
        res.render('images', viewModel);
    },

    audios: async (req, res) => {
        const audios = await Audio.find({});

        let viewModel = { audios: [] };
        viewModel.audios = await getLike(req, audios);
        res.render('sounds', viewModel);
    },

    videos: async (req, res) => {
        const videos = await Video.find({});

        let viewModel = { videos: [] };
        viewModel.videos = await getLike(req, videos);
        res.render('videos', viewModel);
    },

    upload: async (req, res) => {
        res.render('upload');
    },

    imgLike: async (req, res) => {

        const img = await Image.findOne({ _id: req.params.image_id });
        const user = await UserLike.findOne({ user: req.user._id, imgId: String(img._id) });

        if (user) {
            if (img) {
                if (user.status === true) {
                    img.likes = img.likes - 1;
                    user.status = false;
                } else if (user.status === false) {
                    img.likes = img.likes + 1;
                    user.status = true;
                }
            } else {
                res.status(500).json({ error: 'internal error' });
            }
            await user.save();
            await img.save();
            res.json({ like: img.likes, status: user.status });
        } else {
            const newuser = new UserLike({
                imgId: img._id,
                user: req.user._id,
                status: true,
            });
            img.likes = img.likes + 1;
            await img.save();
            await newuser.save();
            res.json({ like: img.likes, status: newuser.status });
        }
    },

    vidLike: async (req, res) => {
        let user;
        const vid = await Video.findOne({ _id: req.params.video_id });
        if (vid) {
            user = await UserLike.findOne({ user: req.user._id, imgId: String(vid._id) });
        } else {
            user = await UserLike.findOne({ user: req.user._id });
        }


        if (user) {
            if (vid) {
                if (user.status === true) {
                    vid.likes = vid.likes - 1;
                    user.status = false;
                } else if (user.status === false) {
                    vid.likes = vid.likes + 1;
                    user.status = true;
                }
            } else {
                res.status(500).json({ error: 'internal error' });
            }
            await user.save();
            await vid.save();
            res.json({ like: vid.likes, status: user.status });
        } else {
            const newuser = new UserLike({
                imgId: vid._id,
                user: req.user._id,
                status: true,
            });
            vid.likes = vid.likes + 1;
            await vid.save();
            await newuser.save();
            res.json({ like: vid.likes, status: newuser.status });
        }
    }
};

const getLike = async (req, data) => {
    if (req.user) {
        const like = await UserLike.find({ user: req.user._id });

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < like.length; j++) {

                if (String(data[i]._id) === String(like[j].imgId)) {
                    console.log('funciona');
                    data[i].status = like[j].status;
                }
            }
        }
    }

    return data;
};