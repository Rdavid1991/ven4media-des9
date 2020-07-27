const path = require("path");
const fs = require('fs-extra');
const { spawn } = require('child_process');

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

        if (process.env.NODE_ENV === 'production') {

            const python = spawn('nudepy', [`${targetPath}`]);

            // eslint-disable-next-line no-unused-vars
            let intento = await new Promise((res, rej) => {
                python.stdout.on('data', function (data) {
                    console.log('Pipe data from python script ...');
                    let dataToSend = data.toString();
                    res(dataToSend);
                });
            });
            if(intento.match(/True/g)){
                await fs.unlink(targetPath);
                return { fileUrl: '', duration: "Imagen inapropiada" };
            }
        }

        let result = waterMark(`${imageUrl}${ext}`);

        if (result) {
            await fs.unlink(targetPath);
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