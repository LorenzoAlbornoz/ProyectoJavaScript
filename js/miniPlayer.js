let currentAudio;
let prevAudio; // Variable para almacenar el audio actualmente reproduciéndose
let pausaManual=false;

//actualizar controles
function updateControls(id){
    if(currentAudio.paused()){
        document.getElementById(`play${id}`).classList.remove("fa-pause")
        document.getElementById(`play${id}`).classList.add("fa-play")
        
    }
    else{
        document.getElementById(`play${id}`).classList.remove("fa-play")
        document.getElementById(`play${id}`).classList.add("fa-pause")
    }
}


function playSong(id, event) {
  let audio = document.getElementById(id); // Acceder al elemento de audio utilizando el ID dinámico

  if (currentAudio && currentAudio !== audio) { // si existe audioactual y es distinto

        currentAudio.pause(); // Pausar el audio actual
        currentAudio.currentTime=0;
        if (document.getElementById(`play${currentAudio.id}`)){
          document.getElementById(`play${currentAudio.id}`).classList.remove("fa-pause");
          document.getElementById(`play${currentAudio.id}`).classList.add("fa-play");
        }
        if(document.getElementById(`timeTrack${currentAudio.id}`)){
          document.getElementById(`timeTrack${currentAudio.id}`).classList.remove("Active");
        }
        if(document.getElementById(`title${currentAudio.id}`)){
          document.getElementById(`title${currentAudio.id}`).classList.remove("Active");
        }
}
else {
    if(pausaManual){
        if (document.getElementById(`play${prevAudio.id}`)){
          document.getElementById(`play${prevAudio.id}`).classList.remove("fa-pause");
          document.getElementById(`play${prevAudio.id}`).classList.add("fa-play");
        }
        if (document.getElementById(`timeTrack${prevAudio.id}`)){
          document.getElementById(`timeTrack${prevAudio.id}`).classList.remove("Active");
        }
        if (document.getElementById(`title${prevAudio.id}`)){
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
    prevAudio = currentAudio;
    pausaManual = true;
  }
}

//Actualizar el tiempo transcurrido de la cancion
function updateCurrentTime(id){
    let minutes = Math.floor(currentAudio.currentTime / 60);
    let seconds = Math.floor(currentAudio.currentTime % 60);
    let timeTotal = padDigits(minutes, 2) + ':' + padDigits(seconds, 2);//un total de dos caracteres, 
    if(document.getElementById(`timeTrack${id}`)){
      document.getElementById(`timeTrack${id}`).innerText = `${timeTotal}`
    }


}
//para formatear el tiempo
function padDigits(number, digits) { // number numeros y digits digitos
    return String(number).padStart(digits, '0'); // 0 a la izquierda si no tiene dos numeros
  }

//Actualizar barra de progreso de la cancion
function updateProgress(id){
    //total y el acutal
    const duration = currentAudio.duration;
    const currentTime = currentAudio.currentTime;
    const porcentaje = (currentTime/duration)*100;
    if(document.getElementById(`progress${id}`)){
      let progress = document.getElementById(`progress${id}`)// busca un elemento en el documento HTML con un ID específico 
      progress.style.width = porcentaje + "%" // asigna un valor al estilo de ancho (width) de un elemento con un ID específico, Al asignar porcentaje + "%", se establece el ancho del elemento en el porcentaje indicado
    }
}

//hacer la barra de progreso clickeable
function setProgress (event){
    let clickedContainer = event.target.closest(".progress-container");// busca la clase especificada
    let audioId = clickedContainer.id.replace("progress-container", ""); // Obtener el ID dinámico del elemento de audio
    let audio = document.getElementById(audioId); // Acceder al elemento de audio utilizando el ID dinámico

    let progressBar = document.getElementById("progress-container" + audioId); // Acceder al elemento de progreso utilizando el ID dinámico

    let progressBarWidth = progressBar.offsetWidth; // nos devuelve el ancho total de un elemento, solo el padding, valor en px
    let clickPosition = event.offsetX; // determinar la posición horizontal relativa del puntero dentro del elemento objetivo
    let seekTime = (clickPosition / progressBarWidth) * audio.duration;

    audio.currentTime = seekTime;
}