const video = document.querySelector("video");
const videoContainer = document.querySelector(".video-container");
const playPauseBtn = document.querySelector(".play-pause-btn");
const miniPlayerBtn = document.querySelector(".mini-player-btn");
const theaterBtn = document.querySelector(".theater-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const muteBtn = document.querySelector(".mute-btn");
const volumeSlider = document.querySelector(".volume-slider");
const currentTimeElem = document.querySelector(".current-time");
const totalTimeElem = document.querySelector(".total-time");
const captionsBtn = document.querySelector(".captions-btn");
const speedBtn = document.querySelector(".speed-btn");
const previewImg = document.querySelector(".preview-img");
const thumbnailImg = document.querySelector(".thumbnail-img");
const timelineContainer = document.querySelector(".timeline-container");
const message = document.querySelector(".custom-message");

document.addEventListener("keydown", (e) => {
  const tagName = document.activeElement.tagName.toLowerCase();

  if (tagName === "input" || tagName === "textarea") return;
  switch (e.key.toLowerCase()) {
    case " ":
      if (tagName === "button") return;
    case "k":
      togglePlay();
      break;
    case "f":
      toggleFullScreenMode();
      break;
    case "t":
      toggleTheaterMode();
      break;
    case "i":
      toggleMiniPlayerMode();
      break;
    case "m":
      toggleMute();
      break;
    case "arrowleft":
    case "j":
      video.currentTime -= 5;
      break;
    case "arrowright":
    case "l":
      video.currentTime += 5;
      break;
    case "c":
      toggleCaptions();
      break;
  }
});

// Disable Right Click
videoContainer.addEventListener("contextmenu", function (e) {
  e.preventDefault();

  if (message) {
    // Position the custom message at the click position
    message.style.top = e.pageY + "px";
    message.style.left = e.pageX + "px";
    message.style.display = "block";
  }
});

// Hide message when clicking anywhere
document.addEventListener("click", function (e) {
  message.style.display = "none";
});

// Play / Pause
playPauseBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

video.addEventListener("play", () => {
  videoContainer.classList.remove("paused");
});

video.addEventListener("pause", () => {
  videoContainer.classList.add("paused");
});

// View Modes
// Theater Mode
theaterBtn.addEventListener("click", toggleTheaterMode);
function toggleTheaterMode() {
  videoContainer.classList.toggle("theater");
}

// Full Screen Mode
fullScreenBtn.addEventListener("click", toggleFullScreenMode);
function toggleFullScreenMode() {
  if (document.fullscreenElement === null) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
document.addEventListener("fullscreenchange", () => {
  const isFullscreen = document.fullscreenElement !== null;
  videoContainer.classList.toggle("full-screen", isFullscreen);
  theaterBtn.style.display = isFullscreen ? "none" : "";
});

// Mini Player Mode
miniPlayerBtn.addEventListener("click", toggleMiniPlayerMode);
function toggleMiniPlayerMode() {
  if (videoContainer.classList.contains("mini-player")) {
    document.exitPictureInPicture();
  } else {
    video.requestPictureInPicture();
  }
}
video.addEventListener("enterpictureinpicture", () => {
  videoContainer.classList.add("mini-player");
});
video.addEventListener("leavepictureinpicture", () => {
  videoContainer.classList.remove("mini-player");
});

// Volume
muteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.muted = e.target.value === 0;
});
function toggleMute() {
  video.muted = !video.muted;
}
video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume;
  let volumeLevel;
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0;
    volumeLevel = "muted";
  } else if (video.volume >= 0.5) {
    volumeLevel = "high";
  } else {
    volumeLevel = "low";
  }

  videoContainer.dataset.volumeLevel = volumeLevel;
});

// Duration
video.addEventListener("loadeddata", () => {
  totalTimeElem.textContent = formatDuration(video.duration);
});
video.addEventListener("timeupdate", () => {
  currentTimeElem.textContent = formatDuration(video.currentTime);
  const percent = video.currentTime / video.duration;
  timelineContainer.style.setProperty("--progress-position", percent);
});
const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});
function formatDuration(duration) {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  if (hours === 0) {
    return `${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}

// Captions
const captions = video.textTracks[0];
captions.mode = "hidden";
captionsBtn.addEventListener("click", toggleCaptions);
function toggleCaptions() {
  const isHidden = captions.mode === "hidden";
  captions.mode = isHidden ? "showing" : "hidden";
  videoContainer.classList.toggle("captions", isHidden);
}

// Speed
speedBtn.addEventListener("click", changePlaybackSpeed);
function changePlaybackSpeed() {
  let currentRate = video.playbackRate;
  let newPlaybackRate;

  if (currentRate < 2) {
    newPlaybackRate = currentRate + 0.25;
    if (newPlaybackRate > 2) newPlaybackRate = 2;
  } else {
    newPlaybackRate = currentRate + 2;
    if (newPlaybackRate > 4) newPlaybackRate = 0.25;
  }

  video.playbackRate = newPlaybackRate;
  speedBtn.textContent = `${newPlaybackRate}x`;
}

// Timeline
timelineContainer.addEventListener("mousemove", handleTimelineUpdate);
timelineContainer.addEventListener("mousedown", toggleScrubbing);
document.addEventListener("mouseup", (e) => {
  if (isScrubbing) {
    toggleScrubbing(e);
  }
});
document.addEventListener("mousemove", (e) => {
  if (isScrubbing) {
    handleTimelineUpdate(e);
  }
});
let isScrubbing = false;
let wasPaused;
function toggleScrubbing(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  isScrubbing = (e.buttons & 1) === 1;
  videoContainer.classList.toggle("scrubbing", isScrubbing);

  if (isScrubbing) {
    wasPaused = video.paused;
    video.pause();
  } else {
    video.currentTime = percent * video.duration;
    if (!wasPaused) video.play();
  }

  handleTimelineUpdate(e);
}
function handleTimelineUpdate(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  const previewImgNumber = Math.max(
    1,
    Math.floor((percent * video.duration) / 10)
  );

  const previewImgSrc = `./assets/previewImgs/preview${previewImgNumber}.jpg`;
  previewImg.src = previewImgSrc;
  timelineContainer.style.setProperty("--preview-position", percent);

  if (isScrubbing) {
    e.preventDefault();
    thumbnailImg.src = previewImgSrc;
    timelineContainer.style.setProperty("--progress-position", percent);
  }
}
