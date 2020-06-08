/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path = require("path");
const fs = require('fs-extra');

const libs = require('../../helpers/libs');

const saveAudio = async (ext, audioTempPath, req) => {

    const audioUrl = libs.randomName();
    //const audio = await Video.find({ filename: audioUrl });

    if (audio.length > 0) {
        saveAudio();
    } else {
        const targetPath = path.resolve(`src/public/upload/audio/${audioUrl}${ext}`);

        await fs.rename(audioTempPath, targetPath);
        const newVideo = new Image({
            title: req.body.title,
            filename: audioUrl + ext,
            description: req.body.description,
        });
        newVideo.save();

        return audioUrl;
    }
};

module.exports = saveAudio;