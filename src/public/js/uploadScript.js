document.getElementById('active-upload').style = 'background-color :#eb6468!important; border-radius:10px 10px 0 0; color:white!important;';
let modal = document.getElementById("modal-upload");
let file = document.getElementById("file");
let title = document.getElementById("title");
let description = document.getElementById("description");
let progress = document.getElementById("progress-upload");

let uploadFileForm = document.getElementById("upload-form");

let groupButton = document.getElementById("group-button");

let uploadButton;

/* Subir archivos */
uploadFileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.submitter.disabled = true;
    uploadButton = e.submitter;//temporal

    let formData = new FormData();

    formData.append("file", file.files[0]);
    formData.append("title", title.value);
    formData.append("description", description.value);

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

            if (data.duration.length > 0) {
                groupButton.innerHTML = `<h3>${data.duration}</h3>
                        <button class="btn btn-danger" onclick='closeUploadModal()'>OK</button>`;
            }

            if (data.fileUrl.length > 0) {
                let ext = data.fileUrl.toString();
                if (ext.match(/.mp4/g)) {
                    groupButton.innerHTML = `<a href="/profile/videos" class="btn btn-success">Successful</a>`;
                } else if (ext.match(/.jpg/g) || ext.match(/.png/g) || ext.match(/.jpeg/g) || ext.match(/.gif/g)) {
                    groupButton.innerHTML = `<a href="/profile/images" class="btn btn-success">Successful</a>`;
                } else if (ext.match(/.mp3/g) || ext.match(/.acc/g)) {
                    groupButton.innerHTML = `<a href="/profile/audios" class="btn btn-success">Successful</a>`;
                }
            }
            openUploadModal();
        } else if (this.readyState == 4 && this.status != 200) {
            console.log("facho");
        }
    };
    xhs.send(formData);
});

function openUploadModal() {
    modal.style.display = "flex";
}

// eslint-disable-next-line no-unused-vars
function closeUploadModal() {
    modal.style.display = "none";
    uploadButton.disabled = false;
    progress.ariaValueNow = 0;
    progress.style.width = 0 + "%";
    groupButton.innerHTML = "";
}