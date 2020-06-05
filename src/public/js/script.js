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


/* Subir archivos */
document.getElementById("submit").addEventListener("click", (e) => {
    e.target.disabled = true;
    let progress = document.getElementById("progress-upload");
    let file = document.getElementById("file").files[0];

    let data = new FormData();
    data.append("file", file);

    let xhs = new XMLHttpRequest();
    xhs.open("POST", "/upload");
    xhs.upload.addEventListener("progress", (e) => {
        progress.ariaValueNow = e.loaded / e.total * 100;
        progress.style.width = e.loaded / e.total * 100 + "%";
    });
    xhs.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let groupButton = document.getElementById("group-button");
            groupButton.innerHTML = `<a href="/images/${xhs.response}" class="btn btn-success">Successful</a>`;
            openModal();
        }else if (this.readyState == 4 && this.status != 200) {
            console.log("facho");
        }
    };
    xhs.send(data);
});

/* Abrir modal */
// Get the modal
var modal = document.getElementById("myModal");
// When the user clicks on the button, open the modal
function openModal() {
    modal.style.display = "block";
}