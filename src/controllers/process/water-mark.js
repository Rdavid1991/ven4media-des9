const fs = require("fs-extra");
const { spawnSync } = require('child_process');

//.\img\magick composite -gravity center -resize 1440x1440 -dissolve 45% .\0i0gnli.png '.\Fotos 148.jpg' 'Marcada.jpg'
module.exports = {

    waterMark: (img) => {

        if (!fs.existsSync("src/upload/mark/")) {
            fs.mkdirSync("src/upload/mark/");
        }
        let magick = "./library/img/magick";
        let waterMark = "./src/assets/img/watermark.png";
        let originalImg = `./src/upload/images/${img}`;
        let secureImg = `./src/upload/mark/${img}`;

        let cmdWidth = `${magick} identify -format %w ${originalImg}`;
        let imgWidth = spawnSync( "powershell.exe",[cmdWidth], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
        console.log(imgWidth);

        let cmdHeigth = `${magick} identify -format %h ${originalImg}`;
        let imgHeigth = spawnSync( "powershell.exe",[cmdHeigth], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
        console.log(imgHeigth);

        let cmd = `${magick} composite -gravity center -resize ${imgWidth.stdout}x${imgHeigth.stdout} -dissolve 30% ${waterMark} ${originalImg} ${secureImg}`;

        //return spawnSync( "powershell.exe",["ls"], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
        let result = spawnSync( "powershell.exe",[cmd], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
        console.log(result);
        return result;
    }
};


