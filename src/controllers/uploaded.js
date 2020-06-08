const { Image} = require('../models');

module.exports = {
    img: async(req, res) => {
        const image = await Image.findOne({ filename: { $regex: String(req.params.image_id) } });
        if (image) {
            image.views = image.views + 1;
            await image.save();
            res.render('image', {image});
        } else {
            res.redirect("/");
        }
    },
};