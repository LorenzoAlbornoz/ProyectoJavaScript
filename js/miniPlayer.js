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

let currentAudio;
let prevAudio; // Variable para almacenar el audio actualmente reproduciéndose
let pausaManual=false;

function playSong(id, event) {
  let audio = document.getElementById(id); // Acceder al elemento de audio utilizando el ID dinámico

  if (currentAudio && currentAudio !== audio) { // si existe audioactual y es distinto

        currentAudio.pause(); // Pausar el audio actual
        currentAudio.currentTime=0;
        document.getElementById(`play${currentAudio.id}`).classList.remove("fa-pause");
        document.getElementById(`play${currentAudio.id}`).classList.add("fa-play");
        document.getElementById(`timeTrack${currentAudio.id}`).classList.remove("Active");
        document.getElementById(`title${currentAudio.id}`).classList.remove("Active");
}
else {
    if(pausaManual){
        prevAudio.currentTime=0; // currentTime es una propieda de audio
        document.getElementById(`play${prevAudio.id}`).classList.remove("fa-pause");
        document.getElementById(`play${prevAudio.id}`).classList.add("fa-play");
        document.getElementById(`timeTrack${prevAudio.id}`).classList.remove("Active");
        document.getElementById(`title${prevAudio.id}`).classList.remove("Active");
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
    currentAudio = null; // No hay audio reproduciéndose actualmente
    pausaManual = true;
  }
}

//Actualizar el tiempo transcurrido de la cancion
function updateCurrentTime(id){
    let minutes = Math.floor(document.getElementById(id).currentTime / 60);
    let seconds = Math.floor(document.getElementById(id).currentTime % 60);
    // console.log(seconds)
    let timeTotal = padDigits(minutes, 2) + ':' + padDigits(seconds, 2);//un total de dos caracteres, 
    document.getElementById(`timeTrack${id}`).innerText = `${timeTotal}`

}
//para formatear el tiempo
function padDigits(number, digits) { // number numeros y digits digitos
    return String(number).padStart(digits, '0'); // 0 a la izquierda si no tiene dos numeros
  }

//Actualizar barra de progreso de la cancion
function updateProgress(id){
    //total y el acutal

    const duration = document.getElementById(id).duration;
    const currentTime = document.getElementById(id).currentTime;
    const porcentaje = (currentTime/duration)*100;
    let progress = document.getElementById(`progress${id}`)// busca un elemento en el documento HTML con un ID específico 
    progress.style.width = porcentaje + "%" // asigna un valor al estilo de ancho (width) de un elemento con un ID específico, Al asignar porcentaje + "%", se establece el ancho del elemento en el porcentaje indicado
}

//hacer la barra de progreso clickeable
function setProgress (event){
    let clickedContainer = event.target.closest(".progress-container");// busca la clase especificada
    console.log(clickedContainer)
    let audioId = clickedContainer.id.replace("progress-container", ""); // Obtener el ID dinámico del elemento de audio
    console.log(audioId)
    let audio = document.getElementById(audioId); // Acceder al elemento de audio utilizando el ID dinámico

    let progressBar = document.getElementById("progress-container" + audioId); // Acceder al elemento de progreso utilizando el ID dinámico

    let progressBarWidth = progressBar.offsetWidth; // nos devuelve el ancho total de un elemento, solo el padding, valor en px
    let clickPosition = event.offsetX; // determinar la posición horizontal relativa del puntero dentro del elemento objetivo
    let seekTime = (clickPosition / progressBarWidth) * audio.duration;

    audio.currentTime = seekTime;
}