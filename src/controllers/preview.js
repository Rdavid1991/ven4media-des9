const path = require('path');

const { Image, Video} = require('../models');

module.exports = {
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

    img:async(req, res) => {
        const image = await Image.findOne({ filename: { $regex: String(req.params.image_id) } });
        if (image) {
            image.views = image.views + 1;
            await image.save();
            res.sendFile(path.join(__dirname, `../upload/mark/${req.params.image_id}`));
        } else {
            res.redirect("/");
        }
    },

    imgMiniature:(req,res)=>{
        res.sendFile(path.join(__dirname,`../upload/mark/${req.params.image_id}`));
    },
};