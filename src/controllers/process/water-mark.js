const fs = require("fs-extra");
const os = require("os");
const { execSync } = require('child_process');

//.\img\magick composite -gravity center -resize 1440x1440 -dissolve 45% .\0i0gnli.png '.\Fotos 148.jpg' 'Marcada.jpg'
module.exports = {

    waterMark: (img) => {

        if (!fs.existsSync("src/public/upload/mark/")) {
            fs.mkdirSync("src/public/upload/mark/");
        }

        let magick;

        if (process.env.NODE_ENV === 'production') {
            magick = "magick";
        } else {
            magick = "./library/img/magick";
        }

        let plataforma = (os.type() === 'Windows_NT') ? 'powershell.exe' : '';

        let waterMark = "./src/assets/img/watermark.png";
        let originalImg = `./src/public/upload/images/${img}`;
        let secureImg = `./src/public/upload/mark/${img}`;

        try {
            let cmdWidth = `${magick} identify -format %w ${originalImg}`;
            let imgWidth = execSync(`${plataforma} ${cmdWidth}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
            console.log(imgWidth);

            let cmdHeigth = `${magick} identify -format %h ${originalImg}`;
            let imgHeigth = execSync(`${plataforma} ${cmdHeigth}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
            console.log(imgHeigth);

            let cmd = `${magick} composite -gravity center -resize ${imgWidth}x${imgHeigth} -dissolve 60% ${waterMark} ${originalImg} ${secureImg}`;
            let result = execSync(`${plataforma} ${cmd}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
            console.log(result);

            return false;
        } catch (error) {
            console.log(error);
            return true;
        }

    }
};


