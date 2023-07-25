let audioPlayer = document.getElementById("audioPlayer")
let volumeSlider = document.getElementById("volumeSlider")
let idx;
let indiceArray;

let dbSongs = JSON.parse(localStorage.getItem("canciones")) || [];

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
let bandera=false;

function playSong(id, event) {
  let audio = document.getElementById(id); // Acceder al elemento de audio utilizando el ID dinámico
  idx = id;
  audioPlayer = audio;
  indiceArray = dbSongs.findIndex((cancion)=>{
    return cancion.id == idx;
  })
  if (currentAudio && currentAudio !== audioPlayer) { // si existe audioactual y es distinto  
    currentAudio.pause(); // Pausar el audio actual
        currentAudio.currentTime=0;
        if (document.getElementById(`play${currentAudio.id}`)){
          document.getElementById(`play${currentAudio.id}`).classList.remove("fa-pause");
          document.getElementById(`play${currentAudio.id}`).classList.add("fa-play");
        }
        document.getElementById(`playPlayer`).classList.remove("fa-pause");
        document.getElementById(`playPlayer`).classList.add("fa-play");
        if (document.getElementById(`timeTrack${currentAudio.id}`)){
          document.getElementById(`timeTrack${currentAudio.id}`).classList.remove("Active");
          document.getElementById(`title${currentAudio.id}`).classList.remove("Active");
        }

}
else {
    if(pausaManual){
      console.log("entro por aqui? currenaudio",prevAudio) 
      if(prevAudio!=currentAudio){

        prevAudio.currentTime=0; // currentTime es una propieda de audio
      } 
        if (document.getElementById(`play${prevAudio.id}`)){
          document.getElementById(`play${prevAudio.id}`).classList.remove("fa-pause");
          document.getElementById(`play${prevAudio.id}`).classList.add("fa-play");
        }

        document.getElementById(`playPlayer`).classList.remove("fa-pause");
        document.getElementById(`playPlayer`).classList.add("fa-play");
        if ( document.getElementById(`timeTrack${prevAudio.id}`)){
          document.getElementById(`timeTrack${prevAudio.id}`).classList.remove("Active");
        }
        if ( document.getElementById(`title${prevAudio.id}`)){
          document.getElementById(`title${prevAudio.id}`).classList.remove("Active");
        }
        pausaManual=false;
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
    currentAudio = null; // No hay audio reproduciéndose actualmente
    pausaManual = true;
  }
}

//Ejecuta playSong al play del reproductor Player
const playSongPlayer = () => {
  if(idx){
    playSong(idx)
  }
  
}

//Actualizar los datos del reproductor
const updatePlayer = (id) => {
  // let audio = document.getElementById(id)
  let titlePlayer = document.getElementById("titlePlayer")
  let artistPlayer = document.getElementById("artistPlayer")
  let coverPlayer = document.getElementById("coverPlayer")
  if (!audioPlayer.paused) {
    if(document.getElementById(`title${id}`)){
      titlePlayer.innerText = document.getElementById(`title${id}`).innerText
    }
    if (document.getElementById(`artist${id}`)){
      artistPlayer.innerText = document.getElementById(`artist${id}`).innerText
    }
    if (document.getElementById(`cover${id}`)){
      coverPlayer.src = document.getElementById(`cover${id}`).src
    }
  }
}

//Actualizar el tiempo transcurrido de la cancion
function updateCurrentTime(id){
  // console.log("aqui se esta parando", document.getElementById(id))
    let minutes = Math.floor(audioPlayer.currentTime / 60);
    let seconds = Math.floor(audioPlayer.currentTime % 60);
    // console.log(seconds)
    let timeTotal = padDigits(minutes, 2) + ':' + padDigits(seconds, 2);//un total de dos caracteres,
    if(document.getElementById(`timeTrack${id}`)){
      document.getElementById(`timeTrack${id}`).innerText = `${timeTotal}`
    }
    document.getElementById(`timeTrackPlayer`).innerText = `${timeTotal}`
}

//para formatear el tiempo
function padDigits(number, digits) { // number numeros y digits digitos
    return String(number).padStart(digits, '0'); // 0 a la izquierda si no tiene dos numeros
  }

//Actualizar barra de progreso de la cancion
function updateProgress(id){
    //total y el acutal
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const porcentaje = (currentTime/duration)*100;
    if (document.getElementById(`progress${id}`)){
      let progress = document.getElementById(`progress${id}`)// busca un elemento en el documento HTML con un ID específico 
      progress.style.width = porcentaje + "%" // asigna un valor al estilo de ancho (width) de un elemento con un ID específico, Al asignar porcentaje + "%", se establece el ancho del elemento en el porcentaje indicado
    }
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



//funcion para el modal de detalle de cancion
const nombre = document.getElementById("cancionModal");
const artista = document.getElementById("artistaModal");
const codigo = document.getElementById("codModal");
const genero = document.getElementById("generoModal");
const duracion = document.getElementById("duracionModal");
const img = document.getElementById("imgDetalle");
const modal = document.getElementById("form");
const play = document.getElementById("playModal");

const cargarDatos = (id) => {
    const cancionElegida = dbSongs.filter((cancion)=>{
        return cancion.id == id;
    })
    img.src = cancionElegida[0].imagen;
    nombre.innerText= cancionElegida[0].nombre;
    artista.innerText= cancionElegida[0].artista;
    codigo.innerText= cancionElegida[0].id;
    genero.innerText= cancionElegida[0].genero;
    const audio = document.getElementById(id);
    duracion.innerText = obtenerDuracion(id);
    play.setAttribute("data-bs-dismiss","modal")
    play.setAttribute("onclick",`playSong(${id})`)
    if (audio.paused){
      play.innerText="Reproducir";
    }
    else
    {
      play.innerText="Pausar reproducción";
      console.log("deberia decir pausa")
    }
}

function obtenerDuracion(id) {
    const audio = document.getElementById(id);
    // Comprobamos si el archivo de audio está cargado antes de obtener la duración
    if (audio.readyState >= 2) {
      const duracion = audio.duration; // Obtenemos la duración en segundos
      // Formateamos la duración en minutos y segundos
      const minutos = Math.floor(duracion / 60);
      const segundos = Math.floor(duracion % 60);
      let tiempoTotal = padDigits(minutos, 2) + ':' + padDigits(segundos, 2);//un total de dos
      const duracionFormateada = tiempoTotal + " min";
      // Mostramos la duración por pantalla
      return duracionFormateada;
    } else {
      // El archivo de audio no está cargado completamente, espera a que cargue y luego intenta de nuevo
      audio.addEventListener('loadedmetadata', obtenerDuracion);
    }
  }