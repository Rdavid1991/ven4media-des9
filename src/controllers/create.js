const path = require("path");
const fs = require('fs-extra');
const Ffmpeg = require("fluent-ffmpeg");


const libs = require('../helpers/libs');
const { Image, Video } = require('../models');


module.exports = {
    data: async (req, res) => {

        const fileTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            let imageUrl = await saveImage(ext, fileTempPath, req);
            res.send(imageUrl);
        } else if (ext === '.mp4') {
            let videoUrl = await saveVideo(ext, fileTempPath, req);
            res.send(videoUrl);
        } else if (ext === '.mp3' || ext === ".acc") {
            let imageUrl = await saveAudio(ext, fileTempPath, req);
            res.send(imageUrl);
        } else {
            await fs.unlink(fileTempPath);
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
        const newImage = new Image({
            title: req.body.title,
            filename: imageUrl + ext,
            description: req.body.description,
        });
        newImage.save();

        return imageUrl;
    }
};

const saveVideo = async (ext, videoTempPath, req) => {

    const videoUrl = libs.randomName(30);
    const miniature = libs.randomName(6);
    const video = await Video.find({ filename: videoUrl });

    if (video.length > 0) {
        saveImage();
    } else {
        const targetPath = path.resolve(`src/public/upload/video/${videoUrl}${ext}`);

        await fs.rename(videoTempPath, targetPath);
        const newVideo = new Image({
            title: req.body.title,
            filename: videoUrl + ext,
            miniature: miniature,
            description: req.body.description,
        });

        newVideo.save();

        Ffmpeg.setFfmpegPath("C:/Users/david/Desktop/bin/ffmpeg.exe");
        Ffmpeg.setFfprobePath("C:/Users/david/Desktop/bin/ffprobe.exe");

        const ffmpeg = Ffmpeg();
        ffmpeg("src/public/upload/video/0CmafMAWXn9rmJxwCybQTfDsvqsPzYp.mp4")
        .screenshots({
            count: 1,
            filename: miniature,
            folder: path.join(__dirname, '../upload/video-miniature/'),
            size: '320x240'
          });

        return videoUrl;
    }
};

const saveAudio = async (ext, audioTempPath, req) => {

    const audioUrl = libs.randomName();
    const audio = await Video.find({ filename: audioUrl });

    if (audio.length > 0) {
        saveImage();
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

