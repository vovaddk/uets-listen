document.addEventListener("DOMContentLoaded", () => {
  // Аудіо плеєр
  const audioPlayer = document.getElementById("audio-player");
  const playButton = document.getElementById("play-button");
  const rewindButton = document.getElementById("rewind-button");
  const forwardButton = document.getElementById("forward-button");
  const speedButton = document.getElementById("speed-button");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeElem = document.getElementById("current-time");
  const durationElem = document.getElementById("duration");

  if (audioPlayer) {
    // Toggle Play/Pause
    playButton.addEventListener("click", () => {
      if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.querySelector("img").src = "public/images/pause.svg";
      } else {
        audioPlayer.pause();
        playButton.querySelector("img").src = "public/images/play.svg";
      }
      updateProgressBar();
    });

    // Rewind 15 seconds
    rewindButton.addEventListener("click", () => {
      audioPlayer.currentTime -= 15;
      updateProgressBar();
    });

    // Forward 15 seconds
    forwardButton.addEventListener("click", () => {
      audioPlayer.currentTime += 15;
      updateProgressBar();
    });

    // Change Playback Speed
    let playbackRate = 1;
    speedButton.addEventListener("click", () => {
      playbackRate = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
      audioPlayer.playbackRate = playbackRate;
      speedButton.querySelector("p").textContent = `${playbackRate}x`;
    });

    // Update Progress Bar and Time
    audioPlayer.addEventListener("timeupdate", updateProgressBar);

    progressBar.addEventListener("input", () => {
      const duration = audioPlayer.duration;
      audioPlayer.currentTime = (progressBar.value / 100) * duration;
      updateProgressBar();
    });

    audioPlayer.addEventListener("loadedmetadata", () => {
      durationElem.textContent = formatTime(audioPlayer.duration);
      updateProgressBar();
    });

    function updateProgressBar() {
      const currentTime = audioPlayer.currentTime;
      const duration = audioPlayer.duration;
      const progress = (currentTime / duration) * 100;
      progressBar.value = progress;
      progressBar.style.background = `linear-gradient(to right, #30485f ${progress}%, #fff ${progress}%)`;
      currentTimeElem.textContent = formatTime(currentTime);
    }

    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    }
  }
});
