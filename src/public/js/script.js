/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
let uploadButton;

/* htmlElements */
let file = document.getElementById("file");
let title = document.getElementById("title");
let description = document.getElementById("description");
let progress = document.getElementById("progress-upload");
let groupButton = document.getElementById("group-button");

let video = document.getElementById("video-preview");

file.addEventListener("change", (e) => {
    e.target.parentNode.parentNode.parentNode.classList.toggle("required-valid", false);
});
title.addEventListener("change", (e) => {
    e.target.parentNode.classList.toggle("required-valid", false);
});
description.addEventListener("change", (e) => {
    e.target.parentNode.classList.toggle("required-valid", false);
});

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

/* Subir archivos */
function submit(button) {

    let data = new FormData();

    if (file.validity.valid && title.validity.valid && description.validity.valid) {
        button.disabled = true;
        uploadButton = button;
        data.append("file", file.files[0]);
        data.append("title", title.value);
        data.append("description", description.value);

        let xhs = new XMLHttpRequest();
        xhs.open("POST", "/upload");
        xhs.responseType = "json";
        xhs.upload.addEventListener("progress", (e) => {
            progress.ariaValueNow = e.loaded / e.total * 100;
            progress.style.width = e.loaded / e.total * 100 + "%";
        });
        xhs.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = xhs.response;

                console.log(data);

                if (data.duration.length > 0) {
                    groupButton.innerHTML = `<h3> tu video ${data.duration}</h3>
                    <button class="btn btn-danger" onclick='closeUploadModal()'>OK</button>`;
                }

                if (data.fileUrl.length > 0) {
                    let ext = data.fileUrl.toString();
                    if (ext.match(/.mp4/g)) {
                        groupButton.innerHTML = `<a href="/video/${ext.replace(/.mp4/i, "")}" class="btn btn-success">Successful</a>`;
                    } else if (ext.match(/.jpg/g) || ext.match(/.png/g) || ext.match(/.jpeg/g) || ext.match(/.gif/g)) {
                        groupButton.innerHTML = `<a href="/images/${ext}" class="btn btn-success">Successful</a>`;
                    } else if (ext.match(/.mp3/g) || ext.match(/.acc/g)) {
                        groupButton.innerHTML = `<a href="/sound/${ext}" class="btn btn-success">Successful</a>`;
                    }
                }
                openUploadModal();
            } else if (this.readyState == 4 && this.status != 200) {
                console.log("facho");
            }
        };
        xhs.send(data);
    } else {
        if (!file.validity.valid) {
            file.parentNode.parentNode.parentNode.classList.toggle("required-valid", true);
        }
        if (!title.validity.valid) {
            title.parentNode.classList.toggle("required-valid", true);
        }
        if (!description.validity.valid) {
            description.parentNode.classList.toggle("required-valid", true);
        }
    }
}

/* Abrir modal */
// Get the modal
var modal = document.getElementById("myModal");
// When the user clicks on the button, open the modal
function openUploadModal() {
    modal.style.display = "block";
}

function closeUploadModal() {
    modal.style.display = "none";
    uploadButton.disabled = false;
    progress.ariaValueNow = 0;
    progress.style.width = 0 + "%";
    groupButton.innerHTML = "";
}

/* Preview del video en modal */
function watchPreview(element, miniature) {
    element.nextElementSibling.style.display = "block";
    let xhs = new XMLHttpRequest();
    xhs.open("GET", "/watch/" + miniature);
    xhs.responseType = "arraybuffer";
    xhs.onload = (e) => {
        let blob = new Blob([xhs.response]);
        let url = URL.createObjectURL(blob);
        let video = element.nextElementSibling
            .firstElementChild
            .lastElementChild
            .firstElementChild
            .firstElementChild;
        video.src = url;
    };
    xhs.send();
}

//* Preview de la imagen en modal */
function previewImage(element, img) {
    element.nextElementSibling.style.display = "block";
    let xhs = new XMLHttpRequest();
    xhs.open("GET", "/images/preview/" + img);
    xhs.responseType = "arraybuffer";
    xhs.onload = (e) => {
        let blob = new Blob([xhs.response]);
        let url = URL.createObjectURL(blob);
        let img = element.nextElementSibling
            .firstElementChild
            .lastElementChild
            .firstElementChild
            .firstElementChild;
        img.src = url;
    };
    xhs.send();
}

function closeModal(e) {
    let video = e.nextElementSibling
        .firstElementChild
        .firstElementChild;

    video.pause();
    video.src = "";

    e.parentNode
        .parentNode
        .style.display = "none";
}

function closeImgModal(e) {
    let img = e.nextElementSibling
        .firstElementChild
        .firstElementChild;

        img.src = "";

    e.parentNode
        .parentNode
        .style.display = "none";
}