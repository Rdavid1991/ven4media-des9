const path = require("path");
const fs = require('fs-extra');

const {saveImage,saveVideo,saveAudio} = require("./process");

module.exports = {
    data: async (req, res) => {

        console.log(req.user);

        const fileTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            let imageUrl = await saveImage(ext, fileTempPath, req);
            res.send(imageUrl);
        } else if (ext === '.mp4') {
            let videoUrl = await saveVideo(ext, fileTempPath, req);
            res.send(videoUrl);

        } else if (ext === '.mp3' || ext === ".acc") {
            let audioUrl = await saveAudio(ext, fileTempPath, req);
            res.send(audioUrl);
        } else {
            await fs.unlink(fileTempPath);
            res.status(500).json({ error: 'file is not correct' });
        }
    }
};