const videoPlayer = document.querySelector(".video-player");
const video = videoPlayer.querySelector(".video");
const playButton = videoPlayer.querySelector(".play-button");
const volume = videoPlayer.querySelector(".volume");
const currentTimeElement = videoPlayer.querySelector(".current");
const durationTimeElement = videoPlayer.querySelector(".duration");
const progress = videoPlayer.querySelector(".video-progress");
const progressBar = videoPlayer.querySelector(".video-progress-filled");

// Auxiliary functions
const addZerosToFront = (s) => {
    let res = "";
    if(s < 10) {
        res = "0";
    }
    res += String(s);
    return res;
};

const PLAY = '<i class="fa fa-play-circle fa-lg"></i>';
const PAUSE = '<i class="fa fa-pause-circle fa-lg"></i>';

// Play or Pause
playButton.addEventListener("click", (e) => {
    if(video.paused) {
        video.play();
        playButton.innerHTML = PAUSE;
    }
    else {
        video.pause();
        playButton.innerHTML = PLAY;
    }
});

// Volume
volume.addEventListener("mousemove", (e) => {
    video.volume = e.target.value;
});

// Current Time and Duration
const currentTime = () => {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = addZerosToFront(Math.floor(video.currentTime % 60));
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = addZerosToFront(Math.floor(video.duration % 60));

    currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds}`;
    durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`;
};

video.addEventListener("timeupdate", currentTime);

// Progress Bar
video.addEventListener("timeupdate", () => {
    const percentage = (video.currentTime / video.duration * 100);
    progressBar.style.width = `${percentage}%`;
});

progress.addEventListener("click", (e) => {
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = progressTime;
});