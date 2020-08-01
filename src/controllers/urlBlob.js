const path = require('path');
const fs = require('fs');
const { Video} = require('../models');

module.exports ={
    image: (req,res)=>{  
        res.sendFile(path.join(__dirname,`../public/upload/images/${req.params.image_id}`));
    },


    miniature:(req,res)=>{
        res.sendFile(path.join(__dirname,`../public/upload/video-miniature/${req.params.miniature_id}`));
    },
    videoModal:async (req,res) =>{
        const video = await Video.findOne({ miniature: { $regex: String(req.params.video_id) } });
        if (video) {
            video.views = video.views + 1;
            await video.save();
            
            let file = fs.createReadStream(path.join(__dirname,`../public/upload/video/${video.filename}`));
            //res.sendFile(path.join(__dirname,`../public/upload/video/${video.filename}`));
            file.pipe(res);
        } else {
            res.redirect('/');
        }
    },

    videoPreview:(req,res)=>{
        res.sendFile(path.join(__dirname,`../public/upload/video/${req.params.video_id}`));
    }
};