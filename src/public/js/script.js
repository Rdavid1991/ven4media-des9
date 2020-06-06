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

/* htmlElements */
let file = document.getElementById("file");
let title = document.getElementById("title");
let description = document.getElementById("description");

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

/* Subir archivos */
function submit(button) {
    let progress = document.getElementById("progress-upload");
    let data = new FormData();

    if (file.validity.valid && title.validity.valid && description.validity.valid) {
        button.disabled = true;
        data.append("file", file.files[0]);
        data.append("title", title.value);
        data.append("description", description.value);

        let xhs = new XMLHttpRequest();
        xhs.open("POST", "/upload");
        xhs.upload.addEventListener("progress", (e) => {
            progress.ariaValueNow = e.loaded / e.total * 100;
            progress.style.width = e.loaded / e.total * 100 + "%";
        });
        xhs.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let ext = String(xhs.response);

                let groupButton = document.getElementById("group-button");
                if (ext.match(/.mp4/g)) {
                    groupButton.innerHTML = `<a href="/video/${xhs.response}" class="btn btn-success">Successful</a>`;
                } else if (ext.match(/.jpg/g) || ext.match(/.png/g) || ext.match(/.jpeg/g) || ext.match(/.gif/g)) {
                    groupButton.innerHTML = `<a href="/images/${xhs.response}" class="btn btn-success">Successful</a>`;
                } else if (ext.match(/.mp3/g) || ext.match(/.acc/g)) {
                    groupButton.innerHTML = `<a href="/sound/${xhs.response}" class="btn btn-success">Successful</a>`;
                }
                openModal();
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
function openModal() {
    modal.style.display = "block";
}

function watchPreview(miniature) {
    let modal = document.getElementById("video-modal");
    modal.style.display = "block";

    let xhs = new XMLHttpRequest();
    xhs.open("GET", "/watch/" + miniature);
    xhs.responseType = "arraybuffer";
    xhs.onload = (e) => {
        let blob = new Blob([xhs.response]);
        let url = URL.createObjectURL(blob);
        video.src = url;
    };
    xhs.send();
}

function closeModal() {
    let modal = document.getElementById("video-modal");
    video.pause();
    video.src="";
    modal.style.display = "none";
}