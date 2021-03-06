document.getElementById('active-images').style = 'background-color :#eb6468!important; border-radius:10px 10px 0 0; color:white!important;';
const imageSelection = document.getElementById('image-selection');


imageSelection.addEventListener('click', (e) => {
    let element = e.target;

    if (element.getAttribute("name") === "figure") {
        previewImage(element);
    } else if (element.getAttribute("name") === "like") {
        setImageLike(element);
    }
});

function previewImage(element) {

    element
        .parentNode
        .parentNode
        .nextElementSibling
        .style
        .display = "flex";
    document.body.style.overflowY = "hidden";
}

function setImageLike(element) {
    let xhs = new XMLHttpRequest();
    xhs.open("POST", "/images/" + element.getAttribute("data") + "/like");
    xhs.onload = () => {
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
function closeImgModal(element) {

    element
        .parentNode
        .parentNode
        .style
        .display = "none";
        document.body.style.overflowY = "auto";
}