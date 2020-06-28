const {  Video} = require('../models');

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
};