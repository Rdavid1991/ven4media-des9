document.getElementById('active-video').style = 'background-color :#eb6468!important; border-radius:10px 10px 0 0; color:white!important;';
const videoSelection = document.getElementById('video-selection');

videoSelection.addEventListener('click', (e) => {
    let element = e.target;

    if (element.getAttribute("name") === "figure") {
        previewVideo(element);
    } else if (element.getAttribute("name") === "like") {
        setVideoLike(element);
    }
});

function previewVideo(element) {
    let modal = element.parentNode.parentNode.nextElementSibling;
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";

    let xhs = new XMLHttpRequest();
    xhs.open("GET", "/watch/" + element.getAttribute("data"));
    xhs.responseType = "arraybuffer";
    // eslint-disable-next-line no-unused-vars
    xhs.onload = (e) => {
        let blob = new Blob([xhs.response]);
        let url = URL.createObjectURL(blob);

        modal
            .getElementsByClassName('video-modal')[0]
            .src = url;
    };
    xhs.send();
}

function setVideoLike(element) {
    let xhs = new XMLHttpRequest();
    xhs.open("POST", "/videos/" + element.getAttribute("data") + "/like");
    // eslint-disable-next-line no-unused-vars
    xhs.onload = (e) => {
        let response = JSON.parse(xhs.response);

        if (response.status) {
            element.classList.replace('unlike', 'liked');
        } else {
            element.classList.replace('liked', 'unlike');
        }
        element.nextElementSibling.innerText = response.like;
    };
    xhs.send();
}

// eslint-disable-next-line no-unused-vars
function closeVideoModal(element) {

    let videoPreview = element.parentNode.getElementsByClassName('video-modal')[0];

    videoPreview.pause();
    videoPreview.src = "";

    element.parentNode.parentNode.style.display = "none";
    document.body.style.overflowY = "auto";
}