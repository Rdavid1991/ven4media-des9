const selection = document.getElementById('video-selection');

selection.addEventListener('click', (e) => {
    let element = e.target;

    if (element.getAttribute("name") === "figure") {
        previewVideo(element);
    } else if (element.getAttribute("name") === "like") {
        setLike(element);
    }
});

function previewVideo(element) {
    element
        .parentNode
        .parentNode
        .nextElementSibling
        .style.display = "block";
    let xhs = new XMLHttpRequest();
    xhs.open("GET", "/watch/" + element.getAttribute("data"));
    xhs.responseType = "arraybuffer";
    xhs.onload = (e) => {
        let blob = new Blob([xhs.response]);
        let url = URL.createObjectURL(blob);
        let video = element
            .parentNode
            .parentNode
            .nextElementSibling
            .firstElementChild
            .lastElementChild
            .firstElementChild
            .firstElementChild;
        video.src = url;
    };
    xhs.send();
}

function setLike(element) {
    let xhs = new XMLHttpRequest();
    xhs.open("POST", "/videos/" + element.getAttribute("data") + "/like");
    xhs.onload = (e) => {
        let response = JSON.parse(xhs.response);
        element.nextElementSibling.innerText = response.like;
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