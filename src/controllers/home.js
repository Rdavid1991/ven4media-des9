const { Image, Video, Audio, UserLike } = require('../models');

module.exports = {

    /* Mostrar pantalla principal */
    home: async (req, res) => {
        res.render('home');
    },

    /* Mostrar lista de imagenes */
    images: async (req, res) => {
 
        const images = await Image.find({});

        if (req.user) {
            const like = await UserLike.find({ user: req.user._id });

            for (let i = 0; i < images.length; i++) {
                for (let j = 0; j < like.length; j++) {
    
                    if (String(images[i]._id) === String(like[j].imgId)) {
                        console.log('funciona');
                        images[i].status = like[j].status;
                    }
                }
            }
        }

        console.log(images);

        let viewModel = { images: [] };
        viewModel.images = images;
        res.render('images', viewModel);
    },

    audios: async (req, res) => {
        const audios = await Audio.find({});

        if (req.user) {
            const like = await UserLike.find({ user: req.user._id });

            for (let i = 0; i < audios.length; i++) {
                for (let j = 0; j < like.length; j++) {
    
                    if (String(audios[i]._id) === String(like[j].imgId)) {
                        console.log('funciona');
                        audios[i].status = like[j].status;
                    }
                }
            }
        }

        let viewModel = { audios: [] };
        viewModel.audios = audios;
        res.render('sounds', viewModel);
    },

    videos: async (req, res) => {
        const videos = await Video.find({});

        if (req.user) {
            const like = await UserLike.find({ user: req.user._id });

            for (let i = 0; i < videos.length; i++) {
                for (let j = 0; j < like.length; j++) {
    
                    if (String(videos[i]._id) === String(like[j].imgId)) {
                        console.log('funciona');
                        videos[i].status = like[j].status;
                    }
                }
            }
        }

        let viewModel = { videos: [] };
        viewModel.videos = videos;
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
            user = await UserLike.findOne({ user: req.user._id, imgId: String(vid._id)});
        }else{
            user = await UserLike.findOne({ user: req.user._id});
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