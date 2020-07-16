document.getElementById('active-images').style = 'background-color :#eb6468!important; border-radius:10px 10px 0 0; color:white!important;';
const selection = document.getElementById('selection');
const imageModal = document.getElementById('image-modal');
const imagePreview = document.getElementById('image-preview');

selection.addEventListener('click', (e) => {
    let element = e.target;

    if (element.getAttribute("name") === "figure") {
        previewImage(element);
    } else if (element.getAttribute("name") === "like") {
        setLike(element);
    }
});

function previewImage(element) {
    imageModal.style.display = "block";

    imagePreview.src = '/public/upload/mark/' + element.getAttribute("data");
}

function setLike(element) {
    let xhs = new XMLHttpRequest();
    xhs.open("POST", "/images/" + element.getAttribute("data") + "/like");
    xhs.onload = () => {
        let response = JSON.parse(xhs.response);

        console.log(response);
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
function closeImgModal(e) {

    imagePreview.src = "";

    imageModal.style.display = "none";
}