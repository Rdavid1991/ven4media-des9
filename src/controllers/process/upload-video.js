const path = require("path");
const fs = require('fs-extra');
const Ffmpeg = require("fluent-ffmpeg");
const moment = require("moment");
const os = require("os");

const libs = require('../../helpers/libs');
const { Video } = require('../../models');

const saveVideo = async (ext, videoTempPath, req) => {

    //random names
    const videoUrl = libs.randomName(30);
    const miniature = libs.randomName(6);

    const video = await Video.find({$or:[{ filename: videoUrl},{miniature }]});

    if (video.length > 0) {
        saveVideo();
    } else {

        const targetPath = path.resolve(`src/public/upload/video/${videoUrl}${ext}`);

        if (!fs.existsSync("src/public/upload/video/")) {
            fs.mkdirSync("src/public/upload/video/");
        }

        await fs.rename(videoTempPath, targetPath);

        if (os.type() === 'Windows_NT') {
            Ffmpeg.setFfmpegPath("bin/ffmpeg.exe");
            Ffmpeg.setFfprobePath("bin/ffprobe.exe");
        }else{
            Ffmpeg.setFfmpegPath("bin/ffmpeg");
            Ffmpeg.setFfprobePath("bin/ffprobe");
        }
    
        const miniatureRoute = 'src/public/upload/video-miniature/';

        if (!fs.existsSync(miniatureRoute)) {
            fs.mkdirSync(miniatureRoute);
        }

        const ffmpeg = Ffmpeg;
        //let count = Math.floor(Math.random() * 7) + 1
        ffmpeg(targetPath)
            .screenshots({
                count:1 ,
                filename: miniature,
                folder: miniatureRoute,
                size: '352x240'
            });

        // eslint-disable-next-line no-unused-vars
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
            return { fileUrl: `${videoUrl}${ext}`, duration: "" };
        } else {
            setTimeout(() => {
                fs.unlink(targetPath);
                fs.unlink(path.join(miniatureRoute, miniature + ".png"));
            }, 5000);
            return { fileUrl: '', duration: "exede los 5 minutos" };
        }
    }
};

module.exports = saveVideo;