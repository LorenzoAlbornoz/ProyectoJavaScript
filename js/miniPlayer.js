let currentAudio;
let prevAudio;
let pausaManual = false;

//actualizar controles
function updateControls(id) {
  if (currentAudio.paused()) {
    document.getElementById(`play${id}`).classList.remove("fa-pause")
    document.getElementById(`play${id}`).classList.add("fa-play")
  }
  else {
    document.getElementById(`play${id}`).classList.remove("fa-play")
    document.getElementById(`play${id}`).classList.add("fa-pause")
  }
}


function playSong(id, event) {
  let audio = document.getElementById(id);

  if (currentAudio && currentAudio !== audio) {

    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (document.getElementById(`play${currentAudio.id}`)) {
      document.getElementById(`play${currentAudio.id}`).classList.remove("fa-pause");
      document.getElementById(`play${currentAudio.id}`).classList.add("fa-play");
    }
    if (document.getElementById(`timeTrack${currentAudio.id}`)) {
      document.getElementById(`timeTrack${currentAudio.id}`).classList.remove("Active");
    }
    if (document.getElementById(`title${currentAudio.id}`)) {
      document.getElementById(`title${currentAudio.id}`).classList.remove("Active");
    }
  }
  else {
    if (pausaManual) {
      if (document.getElementById(`play${prevAudio.id}`)) {
        document.getElementById(`play${prevAudio.id}`).classList.remove("fa-pause");
        document.getElementById(`play${prevAudio.id}`).classList.add("fa-play");
      }
      if (document.getElementById(`timeTrack${prevAudio.id}`)) {
        document.getElementById(`timeTrack${prevAudio.id}`).classList.remove("Active");
      }
      if (document.getElementById(`title${prevAudio.id}`)) {
        document.getElementById(`title${prevAudio.id}`).classList.remove("Active");
      }
    }
  }

  if (audio.paused) {
    audio.play();
    document.getElementById(`play${id}`).classList.remove("fa-play");
    document.getElementById(`play${id}`).classList.add("fa-pause");
    document.getElementById(`timeTrack${id}`).classList.add("Active");
    document.getElementById(`title${id}`).classList.add("Active");
    audio.addEventListener("timeupdate", function () {
      updateCurrentTime(id);
      updateProgress(id);
    });

    currentAudio = audio;
  } else {
    audio.pause();
    document.getElementById(`play${id}`).classList.remove("fa-pause");
    document.getElementById(`play${id}`).classList.add("fa-play");
    document.getElementById(`timeTrack${id}`).classList.remove("Active");
    document.getElementById(`title${id}`).classList.remove("Active");
    prevAudio = currentAudio;
    pausaManual = true;
  }
}

function updateCurrentTime(id) {
  let minutes = Math.floor(currentAudio.currentTime / 60);
  let seconds = Math.floor(currentAudio.currentTime % 60);
  let timeTotal = padDigits(minutes, 2) + ':' + padDigits(seconds, 2);
  if (document.getElementById(`timeTrack${id}`)) {
    document.getElementById(`timeTrack${id}`).innerText = `${timeTotal}`
  }
}

function padDigits(number, digits) {
  return String(number).padStart(digits, '0');
}

function updateProgress(id) {
  const duration = currentAudio.duration;
  const currentTime = currentAudio.currentTime;
  const porcentaje = (currentTime / duration) * 100;
  if (document.getElementById(`progress${id}`)) {
    let progress = document.getElementById(`progress${id}`)
    progress.style.width = porcentaje + "%"
  }
}

function setProgress(event) {
  let clickedContainer = event.target.closest(".progress-container");
  let audioId = clickedContainer.id.replace("progress-container", "");
  let audio = document.getElementById(audioId);
  let progressBar = document.getElementById("progress-container" + audioId);
  let progressBarWidth = progressBar.offsetWidth;
  let clickPosition = event.offsetX;
  let seekTime = (clickPosition / progressBarWidth) * audio.duration;
  audio.currentTime = seekTime;
}