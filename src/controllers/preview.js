const { Image, Video} = require('../models');

module.exports = {
    index: async(req, res) => {
        const image = await Image.findOne({ filename: { $regex: String(req.params.image_id) } });
        if (image) {
            image.views = image.views + 1;
            await image.save();
            res.render('image', {image});
        } else {
            res.redirect("/");
        }
    },

    video: async(req, res) => {
        const video = await Video.findOne({ filename: { $regex: String(req.params.video_id) } });
        if (video) {
            video.views = video.views + 1;
            await video.save();
            res.render('preview-video', {video});
        } else {
            res.redirect("/");
        }
    },
};