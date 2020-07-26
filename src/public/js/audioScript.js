document.getElementById('active-audio').style = 'background-color :#eb6468!important; border-radius:10px 10px 0 0; color:white!important;';

let audio = document.getElementById('audio');
let audioSelection = document.getElementById('audio-selection');



let interval;
let newid;

// eslint-disable-next-line no-unused-vars
audio.addEventListener('play', (e) => {

    interval = setInterval(() => {
        document.getElementById(newid)
            .value = audio.currentTime / audio.duration * 100;
    }, 1000);
});

audio.addEventListener('pause', () => {
    clearInterval(interval);
});

audioSelection.addEventListener('click', (e) => {

    let element = e.target;

    if (element.getAttribute("name") === "like") {
        setAudioLike(element);
    } else {

        if (element.className.match(/play/g)) {
            let play = document.getElementsByClassName('pause')[0];

            if (play) {
                play.classList.replace('pause', 'play');
            }

            if (newid) {
                document.getElementById(newid).value = 0;
            }

            element.classList.replace('play', 'pause');
            newid = element.getAttribute('data');
            updateDuration(newid);
            audio.src = "/public/upload/audio/" + element.getAttribute('data');

            audio.play();
        } else if (element.className.match(/pause/g)) {
            element.classList.replace('pause', 'play');
            audio.pause();
        }
    }
});

function updateDuration(param) {
    document.getElementById(param).addEventListener('change', (e) => {
 
        audio.currentTime = (audio.duration / 100) * e.target.value;
    });
}

function setAudioLike(element){
    let xhs = new XMLHttpRequest();
    xhs.open("POST", "/audios/" + element.getAttribute("data") + "/like");
    // eslint-disable-next-line no-unused-vars
    xhs.onload = (e) => {
        let response = JSON.parse(xhs.response);

        if (response.status) {
            element.classList.replace('unlike-bk', 'liked-bk');
        } else {
            element.classList.replace('liked-bk', 'unlike-bk');
        }
        element.nextElementSibling.innerText = response.like;
    };
    xhs.send();
}




