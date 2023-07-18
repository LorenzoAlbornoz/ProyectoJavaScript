//actualizar controles
function updateControls(id){
    if(document.getElementById(id).paused()){
        document.getElementById(`play${id}`).classList.remove("fa-pause")
        document.getElementById(`play${id}`).classList.add("fa-play")
        
    }
    else{
        document.getElementById(`play${id}`).classList.remove("fa-play")
        document.getElementById(`play${id}`).classList.add("fa-pause")
    }
}

let currentAudio; // Variable para almacenar el audio actualmente reproduciéndose

function playSong(id, event) {
  let audio = document.getElementById(id); // Acceder al elemento de audio utilizando el ID dinámico

  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause(); // Pausar el audio actual
    currentAudio.currentTime=0;
    document.getElementById(`play${currentAudio.id}`).classList.remove("fa-pause");
    document.getElementById(`play${currentAudio.id}`).classList.add("fa-play");
    document.getElementById(`timeTrack${currentAudio.id}`).classList.remove("Active");document.getElementById(`title${currentAudio.id}`).classList.remove("Active");
  }

  if (audio.paused) {
    audio.play();
    document.getElementById(`play${id}`).classList.remove("fa-play");
    document.getElementById(`play${id}`).classList.add("fa-pause");
    document.getElementById(`timeTrack${id}`).classList.add("Active");
    document.getElementById(`title${id}`).classList.add("Active");
    audio.addEventListener("timeupdate", function() {
      updateCurrentTime(id);
      updateProgress(id);
    });

    currentAudio = audio; // Actualizar el audio actualmente reproduciéndose
  } else {
    audio.pause();
    document.getElementById(`play${id}`).classList.remove("fa-pause");
    document.getElementById(`play${id}`).classList.add("fa-play");
    document.getElementById(`timeTrack${id}`).classList.remove("Active");
    document.getElementById(`title${id}`).classList.remove("Active");
    currentAudio = null; // No hay audio reproduciéndose actualmente
  }
}

//Actualizar el tiempo transcurrido de la cancion
function updateCurrentTime(id){
    let minutes = Math.floor(document.getElementById(id).currentTime / 60);
    let seconds = Math.floor(document.getElementById(id).currentTime % 60);
    // console.log(seconds)
    let timeTotal = padDigits(minutes, 2) + ':' + padDigits(seconds, 2);
    document.getElementById(`timeTrack${id}`).innerText = `${timeTotal}`

}
//para formatear el tiempo
function padDigits(number, digits) {
    return String(number).padStart(digits, '0');
  }

//Actualizar barra de progreso de la cancion
function updateProgress(id){
    //total y el acutal

    const duration = document.getElementById(id).duration;
    const currentTime = document.getElementById(id).currentTime;
    const porcentaje = (currentTime/duration)*100;
    let progress = document.getElementById(`progress${id}`)
    progress.style.width = porcentaje + "%"

}

//hacer la barra de progreso clickeable
function setProgress (event){
    let clickedContainer = event.target.closest(".progress-container");
    console.log(clickedContainer)
    let audioId = clickedContainer.id.replace("progress-container", ""); // Obtener el ID dinámico del elemento de audio
    console.log(audioId)
    let audio = document.getElementById(audioId); // Acceder al elemento de audio utilizando el ID dinámico

    let progressBar = document.getElementById("progress-container" + audioId); // Acceder al elemento de progreso utilizando el ID dinámico

    let progressBarWidth = progressBar.offsetWidth;
    let clickPosition = event.offsetX;
    let seekTime = (clickPosition / progressBarWidth) * audio.duration;

    audio.currentTime = seekTime;
}


/*
//cambiar clase activa
function changeActiveClass(lastIndex, newIndex){
    const links = document.querySelectorAll("a");
    if (lastIndex !== null){
        links[lastIndex].classList.remove('active');
    }
    links[newIndex].classList.add('active');
}*/



/*
//lanzar siguiente cancion cuando se acaba la actual
audio.addEventListener("ended",()=>{
    if (actualSong + 1 < songList.length)
    {        
        nextSong();
    }
    else{
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
        progress.style.width = "0%";
    }
})*/