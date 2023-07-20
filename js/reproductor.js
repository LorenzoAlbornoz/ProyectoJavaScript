let audioPlayer = document.getElementById("audioPlayer")
let volumeSlider = document.getElementById("volumeSlider")
let idx;
let indiceArray;

let dbSongs = JSON.parse(localStorage.getItem("canciones")) || [];
console.log(dbSongs)

//actualizar controles
function updateControls(id){
    if(audioPlayer.paused){
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
  idx = id;
  audioPlayer = audio;
  indiceArray = dbSongs.findIndex((cancion)=>{
    return cancion.id == idx;
  })
  console.log("indiceArray de la cancion sonando ",indiceArray)

  if (currentAudio && currentAudio !== audioPlayer) { // si existe audioactual y es distinto

        currentAudio.pause(); // Pausar el audio actual
        currentAudio.currentTime=0;
        document.getElementById(`play${currentAudio.id}`).classList.remove("fa-pause");
        document.getElementById(`play${currentAudio.id}`).classList.add("fa-play");
        document.getElementById(`playPlayer`).classList.remove("fa-pause");
        document.getElementById(`playPlayer`).classList.add("fa-play");
        document.getElementById(`timeTrack${currentAudio.id}`).classList.remove("Active");
        document.getElementById(`title${currentAudio.id}`).classList.remove("Active");
}
else {
    if(pausaManual){
        // prevAudio.currentTime=0; // currentTime es una propieda de audio
        document.getElementById(`play${prevAudio.id}`).classList.remove("fa-pause");
        document.getElementById(`play${prevAudio.id}`).classList.add("fa-play");
        document.getElementById(`playPlayer`).classList.remove("fa-pause");
        document.getElementById(`playPlayer`).classList.add("fa-play");
        document.getElementById(`timeTrack${prevAudio.id}`).classList.remove("Active");
        document.getElementById(`title${prevAudio.id}`).classList.remove("Active");
    }
}

  if (audioPlayer.paused) {
    audioPlayer.play();
    document.getElementById(`play${id}`).classList.remove("fa-play");
    document.getElementById(`play${id}`).classList.add("fa-pause");
    document.getElementById(`playPlayer`).classList.remove("fa-play");
    document.getElementById(`playPlayer`).classList.add("fa-pause");
    document.getElementById(`timeTrack${id}`).classList.add("Active");
    document.getElementById(`title${id}`).classList.add("Active");
    audioPlayer.addEventListener("timeupdate", function() {
      updateCurrentTime(id);
      updateProgress(id);
      updatePlayer(id);
    });

    currentAudio = audioPlayer; // Actualizar el audio actualmente reproduciéndose
  } else {
    audio.pause();
    document.getElementById(`play${id}`).classList.remove("fa-pause");
    document.getElementById(`play${id}`).classList.add("fa-play");
    document.getElementById(`playPlayer`).classList.remove("fa-pause");
    document.getElementById(`playPlayer`).classList.add("fa-play");
    document.getElementById(`timeTrack${id}`).classList.remove("Active");
    document.getElementById(`title${id}`).classList.remove("Active");
    prevAudio = currentAudio;
    // currentAudio = null; // No hay audio reproduciéndose actualmente
    pausaManual = true;
  }
}

//Ejecuta playSong al play del reproductor Player
const playSongPlayer = () => {
  playSong(idx)
}

//Actualizar los datos del reproductor
const updatePlayer = (id) => {
 
  let audio = document.getElementById(id)
  let titlePlayer = document.getElementById("titlePlayer")
  let artistPlayer = document.getElementById("artistPlayer")
  let coverPlayer = document.getElementById("coverPlayer")
  if (!audio.paused) {
    titlePlayer.innerText = document.getElementById(`title${id}`).innerText
    artistPlayer.innerText = document.getElementById(`artist${id}`).innerText
    coverPlayer.src = document.getElementById(`cover${id}`).src
  }
}

//Actualizar el tiempo transcurrido de la cancion
function updateCurrentTime(id){
    let minutes = Math.floor(document.getElementById(id).currentTime / 60);
    let seconds = Math.floor(document.getElementById(id).currentTime % 60);
    // console.log(seconds)
    let timeTotal = padDigits(minutes, 2) + ':' + padDigits(seconds, 2);//un total de dos caracteres, 
    document.getElementById(`timeTrack${id}`).innerText = `${timeTotal}`
    document.getElementById(`timeTrackPlayer`).innerText = `${timeTotal}`


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
    const progressPlayer = document.getElementById("progressPlayer")
    progressPlayer.style.width = porcentaje + "%"
}

//hacer la barra de progreso clickeable
function setProgress (event){
     let audio = document.getElementById(idx); // Acceder al elemento de audio utilizando el ID dinámico

    let progressBar = document.getElementById("progress-container" + idx); // Acceder al elemento de progreso utilizando el ID dinámico

    let progressBarWidth = progressBar.offsetWidth; // nos devuelve el ancho total de un elemento, solo el padding, valor en px
    let clickPosition = event.offsetX; // determinar la posición horizontal relativa del puntero dentro del elemento objetivo
    let seekTime = (clickPosition / progressBarWidth) * audio.duration;

    audio.currentTime = seekTime;
}

//Escucha cambios en el input de volumen
volumeSlider.addEventListener('input', updateVolume);

// Actualiza el volumen del audio
function updateVolume() {
    audioPlayer.volume = volumeSlider.value;
  }

  //avanzar cancion 
function nextSong() {
  if (indiceArray + 1 < dbSongs.length)
  {
      
    playSong(dbSongs[indiceArray+1].id)
  }
  
}

//retroceder cancion 
function prevSong() {
  if (indiceArray > 0){
    
    playSong(dbSongs[indiceArray-1].id)
  }
  
}