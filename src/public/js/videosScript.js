document.getElementById('active-video').style = 'background-color :#eb6468!important; border-radius:10px 10px 0 0; color:white!important;';
const selection = document.getElementById('video-selection');
const videoModal = document.getElementById('video-modal');
const videoPreview = document.getElementById('video-preview');

selection.addEventListener('click', (e) => {
    let element = e.target;

    if (element.getAttribute("name") === "figure") {
        previewVideo(element);
    } else if (element.getAttribute("name") === "like") {
        setLike(element);
    }
});

function previewVideo(element) {
    videoModal.style.display = "block";

    let xhs = new XMLHttpRequest();
    xhs.open("GET", "/watch/" + element.getAttribute("data"));
    xhs.responseType = "arraybuffer";
    xhs.onload = (e) => {
        let blob = new Blob([xhs.response]);
        let url = URL.createObjectURL(blob);

        console.log(url);

        videoPreview.src = url;
    };
    xhs.send();
}

function setLike(element) {
    let xhs = new XMLHttpRequest();
    xhs.open("POST", "/videos/" + element.getAttribute("data") + "/like");
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

function closeModal(e) {
   
    videoPreview.pause();
    videoPreview.src = "";

    videoModal.style.display = "none";
}