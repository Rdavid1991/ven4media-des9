const path = require("path");
const fs = require('fs-extra');

const libs = require('../../helpers/libs');
const { Image } = require('../../models');


const saveImage = async (ext, imageTempPath, req) => {

    const imageUrl = libs.randomName(30);
    const images = await Image.find({ filename: imageUrl });

    if (images.length > 0) {
        saveImage();
    } else {
        const targetPath = path.resolve(`src/upload/images/${imageUrl}${ext}`);

        if (!fs.existsSync("src/upload/images/")) {
            fs.mkdirSync("src/upload/images/");
        }

        await fs.rename(imageTempPath, targetPath);

        const newImage = new Image({
            title: req.body.title,
            filename: imageUrl + ext,
            description: req.body.description,
        });
        newImage.save();

        return { fileUrl: `${imageUrl}${ext}`, duration: "" };
    }
};

module.exports = saveImage;