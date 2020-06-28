const selection = document.getElementById('selection');

selection.addEventListener('click', (e) => {
    let element = e.target;

    if (element.getAttribute("name") === "figure") {
        previewImage(element);
    } else if (element.getAttribute("name") === "like") {
        setLike(element);
    }
});

function previewImage(element) {
    element
        .parentNode
        .parentNode
        .nextElementSibling
        .style.display = "block";

    let img = element
        .parentNode
        .parentNode
        .nextElementSibling
        .firstElementChild
        .lastElementChild
        .firstElementChild
        .firstElementChild;

    img.src = '/public/upload/mark/' + element.getAttribute("data");

}

function setLike(element) {
    let xhs = new XMLHttpRequest();
    xhs.open("POST", "/images/" + element.getAttribute("data") + "/like");
    xhs.onload = () => {
        let response = JSON.parse(xhs.response);
        element.nextElementSibling.innerText = response.like;
    };
    xhs.send();
}

// eslint-disable-next-line no-unused-vars
function closeImgModal(e) {
    let img = e.nextElementSibling
        .firstElementChild
        .firstElementChild;

    img.src = "";

    e.parentNode
        .parentNode
        .style.display = "none";
}