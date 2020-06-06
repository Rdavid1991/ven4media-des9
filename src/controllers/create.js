const path = require("path");
const fs = require('fs-extra');
const Ffmpeg = require("fluent-ffmpeg");
const moment = require("moment");

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

        const targetPath = path.resolve(`src/upload/video/${videoUrl}${ext}`);
        await fs.rename(videoTempPath, targetPath);

        Ffmpeg.setFfmpegPath("C:/Users/david/Desktop/bin/ffmpeg.exe");
        Ffmpeg.setFfprobePath("C:/Users/david/Desktop/bin/ffprobe.exe");

        const miniatureRoute = 'src/upload/video-miniature';

        if (!fs.existsSync(miniatureRoute)) {
            fs.mkdirSync(miniatureRoute);
        }

        const ffmpeg = Ffmpeg;
        ffmpeg(targetPath)
            .screenshots({
                count: 1,
                filename: miniature,
                folder: miniatureRoute,
                size: '320x240'
            });

        let metaData = (targetPath) => new Promise((res, rej) => {

            ffmpeg.ffprobe(targetPath, (err, data) => {
                let hour, min, seg, width, heigth;

                /* Duracion del video */
                let duration = Math.floor(data.format.duration * 1000);
                let d = moment.duration(duration, 'milliseconds');

                hour = Math.floor(d.asHours());
                min = Math.floor(d.asMinutes()) - hour * 60;
                seg = Math.floor(d.asSeconds()) - min * 60;

                /* Resolucion de video */
                width = data.streams[0].width;
                heigth = data.streams[0].height;

                res({ hour, min, seg, width, heigth });
            });
        });

        let data = await metaData(targetPath);

        if (!fs.existsSync("src/upload/video/")) {
            fs.mkdirSync("src/upload/video/");
        }

        console.log(typeof(data.min));
        

        if (data.min < 5) {
            const newVideo = new Video({
                title: req.body.title,
                filename: videoUrl + ext,
                min: data.min,
                seg: data.seg,
                width: data.width,
                Height: data.heigth,
                miniature: miniature,
                description: req.body.description,
            });
            newVideo.save();
            return { videoUrl, dutation: null };
        } else {
            setTimeout(()=>{
                fs.unlink(targetPath);
            },5000);
            return { videoUrl: null, dutation: "Exede los 5 minutos" };
        }
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