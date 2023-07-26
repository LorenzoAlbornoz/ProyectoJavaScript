let audioPlayer = document.getElementById("audioPlayer")
let volumeSlider = document.getElementById("volumeSlider")
let idx = null;
let indiceArray;
let url
let dbSongs = JSON.parse(localStorage.getItem("canciones")) || [];

function updateControls() {
  console.log("entro a updatecontrols")
  if (audioPlayer.paused && idx != null) {
    console.log("entro audioPlayer paused");
    if (document.getElementById(`play${idx}`))
      document.getElementById(`play${idx}`).classList.remove("fa-pause")
    document.getElementById(`play${idx}`).classList.add("fa-play")
  }
  else {
    if (document.getElementById(`play${idx}`)) {
      document.getElementById(`play${idx}`).classList.remove("fa-play")
      document.getElementById(`play${idx}`).classList.add("fa-pause")
      document.getElementById(`title${idx}`).classList.add("Active");
    }
  }
}

let prevId
function playSong(id, src) {
  if (document.getElementById(id)) {
    url = document.getElementById(id).src;
  }


  if (id != idx) {
    prevId = idx
    idx = id
  }
  if (audioPlayer.src != url) {
    audioPlayer.src = url;
  }

  indiceArray = dbSongs.findIndex((cancion) => {
    return cancion.id == id;
  })
  if (prevId && prevId !== id) {
    if (document.getElementById(`play${prevId}`)) {
      document.getElementById(`play${prevId}`).classList.remove("fa-pause");
      document.getElementById(`play${prevId}`).classList.add("fa-play");
    }
    document.getElementById(`playPlayer`).classList.remove("fa-pause");
    document.getElementById(`playPlayer`).classList.add("fa-play");
    if (document.getElementById(`timeTrack${prevId}`)) {
      document.getElementById(`timeTrack${prevId}`).classList.remove("Active");
      document.getElementById(`title${prevId}`).classList.remove("Active");
    }

  }

  if (audioPlayer.paused) {
    audioPlayer.play();
    if (document.getElementById(`play${id}`)) {
      document.getElementById(`play${id}`).classList.remove("fa-play");
      document.getElementById(`play${id}`).classList.add("fa-pause");
    }
    document.getElementById(`playPlayer`).classList.remove("fa-play");
    document.getElementById(`playPlayer`).classList.add("fa-pause");
    if (document.getElementById(`timeTrack${id}`)) {
      document.getElementById(`timeTrack${id}`).classList.add("Active");
    }
    if (document.getElementById(`title${id}`)) {
      document.getElementById(`title${id}`).classList.add("Active");
    }

    audioPlayer.addEventListener("timeupdate", function () {
      updateCurrentTime(id);
      updateProgress(id);
      updatePlayer(id);
    });

  } else {
    audioPlayer.pause();
    if (document.getElementById(`play${id}`)) {
      document.getElementById(`play${id}`).classList.add("fa-play");
      document.getElementById(`play${id}`).classList.remove("fa-pause");
    }
    if (document.getElementById(`play${id}`)) {
      document.getElementById(`play${id}`).classList.add("fa-play");
    }

    document.getElementById(`playPlayer`).classList.remove("fa-pause");
    document.getElementById(`playPlayer`).classList.add("fa-play");
    if (document.getElementById(`timeTrack${id}`)) {
      document.getElementById(`timeTrack${id}`).classList.remove("Active");
    }
    if (document.getElementById(`title${id}`)) {
      document.getElementById(`title${id}`).classList.remove("Active");
    }
    pausaManual = true;
  }
}


const playSongPlayer = () => {
  if (idx) {
    playSong(idx)
  }
}

const updatePlayer = (id) => {
  let titlePlayer = document.getElementById("titlePlayer")
  let artistPlayer = document.getElementById("artistPlayer")
  let coverPlayer = document.getElementById("coverPlayer")
  if (!audioPlayer.paused) {
    if (document.getElementById(`title${idx}`)) {
      titlePlayer.innerText = document.getElementById(`title${idx}`).innerText
    }
    if (document.getElementById(`artist${idx}`)) {
      artistPlayer.innerText = document.getElementById(`artist${idx}`).innerText
    }
    if (document.getElementById(`cover${idx}`)) {
      coverPlayer.src = document.getElementById(`cover${idx}`).src
    }
  }
}

function updateCurrentTime(id) {
  let minutes = Math.floor(audioPlayer.currentTime / 60);
  let seconds = Math.floor(audioPlayer.currentTime % 60);
  let timeTotal = padDigits(minutes, 2) + ':' + padDigits(seconds, 2);
  if (document.getElementById(`timeTrack${id}`) && document.getElementById(id).src == url) {
    document.getElementById(`timeTrack${id}`).innerText = `${timeTotal}`
  }
  else {
    if (document.getElementById(`timeTrack${id}`)) {
      document.getElementById(`timeTrack${id}`).innerText = `00:00`
    }
  }
  document.getElementById(`timeTrackPlayer`).innerText = `${timeTotal}`
}


function padDigits(number, digits) {
  return String(number).padStart(digits, '0');
}

function updateProgress(id) {
  const duration = audioPlayer.duration;
  const currentTime = audioPlayer.currentTime;
  const porcentaje = (currentTime / duration) * 100;
  if (document.getElementById(`progress${id}`) && document.getElementById(id).src == url) {
    let progress = document.getElementById(`progress${id}`)
    progress.style.width = porcentaje + "%"
  }
  else {
    if (document.getElementById(`progress${id}`)) {
      let progress = document.getElementById(`progress${id}`)
      progress.style.width = "0%"
    }
  }
  const progressPlayer = document.getElementById("progressPlayer")
  progressPlayer.style.width = porcentaje + "%"
}

function setProgress(event) {
  console.log("entra");

  let progressBar = document.getElementById("progress-container");
  let progressBarWidth = progressBar.offsetWidth;
  let clickPosition = event.offsetX;
  let seekTime = (clickPosition / progressBarWidth) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
}

volumeSlider.addEventListener('input', updateVolume);

function updateVolume() {
  audioPlayer.volume = volumeSlider.value;
}

function nextSong() {
  if (indiceArray + 1 < dbSongs.length) {
    if (document.getElementById(dbSongs[indiceArray + 1].id)) {

      playSong(dbSongs[indiceArray + 1].id)
    }
  }

}

function prevSong() {
  if (indiceArray > 0) {
    if (document.getElementById(dbSongs[indiceArray - 1].id)) {
      playSong(dbSongs[indiceArray - 1].id)
    }
  }
}

audioPlayer.addEventListener("ended", () => {
  prevId = idx
  nextSong()
  if (document.getElementById(prevId)) {
    document.getElementById(`play${prevId}`).classList.add("fa-play");
    document.getElementById(`play${prevId}`).classList.remove("fa-pause");
  }
})

const nombre = document.getElementById("cancionModal");
const artista = document.getElementById("artistaModal");
const codigo = document.getElementById("codModal");
const genero = document.getElementById("generoModal");
const duracion = document.getElementById("duracionModal");
const img = document.getElementById("imgDetalle");
const modal = document.getElementById("form");
const play = document.getElementById("playModal");

const cargarDatos = (id) => {
  const cancionElegida = dbSongs.filter((cancion) => {
    return cancion.id == id;
  })
  img.src = cancionElegida[0].imagen;
  nombre.innerText = cancionElegida[0].nombre;
  artista.innerText = cancionElegida[0].artista;
  codigo.innerText = cancionElegida[0].id;
  genero.innerText = cancionElegida[0].genero;
  const audio = document.getElementById(id);
  duracion.innerText = obtenerDuracion(id);
  play.setAttribute("data-bs-dismiss", "modal")
  play.setAttribute("onclick", `playSong(${id})`)
  if (audio.paused) {
    play.innerText = "Reproducir";
  }
  else {
    play.innerText = "Pausar reproducción";
  }
}

function obtenerDuracion(id) {
  const audio = document.getElementById(id);
  if (audio.readyState >= 2) {
    const duracion = audio.duration;

    const minutos = Math.floor(duracion / 60);
    const segundos = Math.floor(duracion % 60);
    let tiempoTotal = padDigits(minutos, 2) + ':' + padDigits(segundos, 2);
    const duracionFormateada = tiempoTotal + " min";

    return duracionFormateada;
  } else {
    audio.addEventListener('loadedmetadata', obtenerDuracion);
  }
}


const filtrarCategoria = (id) => {
  let audio = document.getElementById("audioPlayer")
    if (categoriaPrevia==null)
    {
      audio.pause()
      playSong(idx)
    }
    document.getElementById("btn-filtro").classList.remove("d-none")
    let text = document.getElementById(`item${id}`).innerText;
    data = JSON.parse(localStorage.getItem("canciones")) || [];
    listaFiltrada = data.filter((cancion)=>{
        return cancion.genero.toLowerCase() == text.toLowerCase();
    })
    mostrarListaFiltrada()
    if(categoriaPrevia===null){
        categoriaPrevia=id;
        document.getElementById(`item${id}`).classList.add("Active")
    }
    else
    {   
        document.getElementById(`item${categoriaPrevia}`).classList.remove("Active")
        document.getElementById(`item${id}`).classList.add("Active")
        categoriaPrevia = id;
    }
    updateControls()
}

const mostrarListaFiltrada = () => {
  canciones.innerHTML = "";
  listaFiltrada.map((cancion, idx) => {

    return canciones.innerHTML += `
        <div class="contenedor-cancion">
        <div id="${idx}">

        <audio src="${cancion.url}" id="${cancion.id}"></audio>

        <div class="player">
            <div class="container-fluid d-flex h-100 align-items-center" >
                <div class="row d-flex w-100 justify-content-between">
                 
                <div class="col-lg-5 col-sm-6 d-flex align-items-center gap-2 ms-3">
                    <div class="d-sm-flex d-flex align-items-center justify-content-between me-5">
                        <img src="${cancion.imagen}" alt="" class="coverAlbum" id="cover${cancion.id}">
                    </div>

                    <i onclick="playSong(${cancion.id})" class="linkPointer fa-solid fa-play fa-2x" style="color: #ffffff;" id="play${cancion.id}"></i>                        
                    <div class="linkPointer d-flex flex-column ms-3" onclick="cargarDatos(${cancion.id})" data-bs-toggle="modal" data-bs-target="#form">
                            <p class="mb-0 title" id="title${cancion.id}">${cancion.nombre}</p>
                        <p class="mb-0 artist" id="artist${cancion.id}">${cancion.artista}</p>
                    </div>                  
                </div>
                <div class="col-1 ms-3 align-items-center justify-content-start  d-none d-lg-flex">
                    <p class="mb-0 genero" id="genero${cancion.id}">${cancion.genero}</p>
                </div>
                <div class="col d-none d-sm-flex justify-content-end justify-content-lg-evenly mb-0 align-items-center">
                    <div class="col-md-2 timeSong d-none d-md-flex align-items-center " id="timeTrack${cancion.id}">
                            00:00
                    </div>
                    <div class="w-50  d-none d-sm-inline progressBar align-items-center h-100">
                        <div onclick="setProgress(event)" class="progress-container my-5"  id="progress-container${cancion.id}">
                            <section class="progress" id="progress${cancion.id}"></section>
                        </div>
                    </div>
                </div>
                <div class="col-5 col-sm-2  d-flex align-items-center justify-content-end gap-2 ms-0">
                    <div class="actions d-none d-md-flex align-items-center gap-3 justify-content-end me-3">
                    <a href="./error404.html"> <i class="linkPointer fa-solid fa-download" ></i> </a>
                    <a href="./error404.html">  <i class="linkPointer fa-solid fa-star" ></i> </a>
                    <a href="./error404.html">  <i class="linkPointer fa-solid fa-share-nodes"></i> </a>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
        `
  })
}