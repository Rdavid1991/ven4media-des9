const path = require("path");

module.exports ={
    image: (req,res)=>{  
        res.sendFile(path.join(__dirname,`../public/upload/images/${req.params.image_id}`));
    },
    preview:(req,res)=>{
        res.sendFile(path.join(__dirname,`../public/upload/images/${req.params.image_id}`));
    }
};