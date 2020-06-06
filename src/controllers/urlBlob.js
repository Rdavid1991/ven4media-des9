const path = require("path");
const { Image, Video} = require('../models');

module.exports ={
    image: (req,res)=>{  
        res.sendFile(path.join(__dirname,`../upload/images/${req.params.image_id}`));
    },
    preview:(req,res)=>{
        res.sendFile(path.join(__dirname,`../upload/images/${req.params.image_id}`));
    },
    miniature:(req,res)=>{
        res.sendFile(path.join(__dirname,`../upload/video-miniature/${req.params.miniature_id}`));
    },
    video:async (req,res) =>{
        const video = await Video.findOne({ miniature: { $regex: String(req.params.video_id) } });
        if (video) {
            video.views = video.views + 1;
            await video.save();
            res.sendFile(path.join(__dirname,`../upload/video/${video.filename}`));
        } else {
            res.redirect("/");
        }
    }
};