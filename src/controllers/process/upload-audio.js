/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path = require("path");
const fs = require('fs-extra');

const { Audio } = require('../../models');

const libs = require('../../helpers/libs');

const saveAudio = async (ext, audioTempPath, req) => {

    const audioUrl = libs.randomName(30);
    const audio = await Audio.find({ filename: audioUrl });

    if (audio.length > 0) {
        saveAudio();
    } else {
        const targetPath = path.resolve(`src/public/upload/audio/${audioUrl}${ext}`);

        if (!fs.existsSync("src/public/upload/audio/")) {
            fs.mkdirSync("src/public/upload/audio/");
        }

        await fs.rename(audioTempPath, targetPath);
        const newAudio = new Audio({
            title: req.body.title,
            filename: audioUrl + ext,
            description: req.body.description,
        });

        await newAudio.save();

        return audioUrl;
    }
};

module.exports = saveAudio;