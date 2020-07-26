function loadImage(image) {
    let xhs = new XMLHttpRequest();
    xhs.open("GET", "/image-file/" + image);
    xhs.responseType = "arraybuffer";
    xhs.onload = (e) => {
        let blob = new Blob([xhs.response]);
        let url = URL.createObjectURL(blob);
        let video = document.getElementById("image");
        video.src = url;
    };
    xhs.send();
}
/* Variables */


/* htmlElements */


//html elements form

let video = document.getElementById("video-preview");

/* Ver videos recien subido */
function loadVideo(video) {
    let xhs = new XMLHttpRequest();
    xhs.open("GET", "/video-file/" + video);
    xhs.responseType = "arraybuffer";
    xhs.onload = (e) => {
        let blob = new Blob([xhs.response]);
        let url = URL.createObjectURL(blob);
        let video = document.getElementById("video");
        video.src = url;
    };
    xhs.send();
}