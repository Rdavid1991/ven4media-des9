const path = require("path");
const fs = require('fs-extra');

const libs = require('../helpers/libs');
const { Image } = require('../models');

module.exports = {
    data: async (req, res) => {

        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            let imageUrl = await saveImage(ext, imageTempPath, req);
            res.send(imageUrl);
        } else {
            await fs.unlink(imageTempPath);
            res.status(500).json({ error: 'file is not correct' });
        }
    }

};

const saveImage = async (ext, imageTempPath, req) => {

    const imageUrl = libs.randomName();
    const images = await Image.find({ filename: imageUrl });

    if (images.length > 0) {
        saveImage();
    } else {
        const targetPath = path.resolve(`src/public/upload/images/${imageUrl}${ext}`);

        await fs.rename(imageTempPath, targetPath);
        const newImage =new Image({
            title: req.body.title,
            filename: imageUrl + ext,
            description: req.body.description,
        });
        newImage.save();

        return imageUrl;
    }
};