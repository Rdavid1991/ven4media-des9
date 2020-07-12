const path = require("path");
const fs = require('fs-extra');

const libs = require('../../helpers/libs');
const { Image } = require('../../models');
const { waterMark } = require('./water-mark');

const saveImage = async (ext, imageTempPath, req) => {

    const imageUrl = libs.randomName(30);
    const images = await Image.find({ filename: imageUrl });

    if (images.length > 0) {
        saveImage();
    } else {
        const targetPath = path.resolve(`src/public/upload/images/${imageUrl}${ext}`);

        if (!fs.existsSync("src/public/upload/images/")) {
            fs.mkdirSync("src/public/upload/images/");
        }

        await fs.rename(imageTempPath, targetPath);

        let result = waterMark(`${imageUrl}${ext}`);

        if (result) {
            fs.unlink(targetPath);
            return { fileUrl: '', duration: "Fallo la subida de la imagen" };
        } else {

            const newImage = new Image({
                title: req.body.title,
                filename: imageUrl + ext,
                description: req.body.description,
                userid: req.user._id
            });
            newImage.save();

            return { fileUrl: `${imageUrl}${ext}`, duration: "" };
        }
    }
};

module.exports = saveImage;