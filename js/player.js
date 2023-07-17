//datos de canciones
const songList = [
    {
        title: "The Kites",
        file:"https://cms-public-artifacts.artlist.io/content/music/aac/849670_Skygaze_-_Vintage_Heat_-_EX-000159-1_-_Master_v2_-_100_Bpm_-_130723_-_BOV_-_EXT_-_RMS_-_2444.aac",
        cover:"https://cdn.artlist.io/artlist-images/843549_Evgeny_Bardyuzha_-_The_Kites_-__A_-_Thum.jpg",
        artist: "Evgeny Bardyuzha"
    },
    {
        title: "Wandering heart",
        file:"https://cms-public-artifacts.artlist.io/Y29udGVudC9tdXNpYy9hYWMvODMxODk1XzgzMTA0Ml84MzA5MzFfRGFuaWVsX0V2ZXJfSGFkYW5pXy1fRm9yZXZlcl9hbmRfRXZlcl8tX0FPLTAwMTEyMi0xXy1fTWFzdGVyX1YyXy1fMTIyX0JwbV8tXzI3MDIyM18tX0JPVl8tX09SR18tXzI0NDQuYWFj",
        cover:"https://cdn.artlist.io/artlist-images/845583_DaniHaDani_-_Wandering_Heart_-_A_-_Thum.jpg",
        artist: "DaniHaDani"
    }
]

//cancion actual
let actualSong=null;

//Capturar elementos del DOM para trabajar con js
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const artist = document.getElementById("artist");
const title = document.querySelector("#title");
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const time = document.getElementById("timeTrack")
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const volumeSlider = document.getElementById('volumeSlider');

progressContainer.addEventListener("click",setProgress)

//Escuchar AUDIO
audio.addEventListener("timeupdate",()=>{
    updateCurrentTime()
    updateProgress()
})


//Escuchar clicks en los controles
play.addEventListener("click",()=>{
    if (audio.paused){
        playSong()
    }
    else {
        pauseSong()
    }
})

next.addEventListener("click",()=>{
    nextSong();
})

prev.addEventListener("click",()=>{
    prevSong();
})

//Escucha cambios en el input de volumen
volumeSlider.addEventListener('input', updateVolume);

// Actualiza el volumen del audio
function updateVolume() {
    audio.volume = volumeSlider.value;
  }

// Cargar canciones y mostrar el listado
function loadSongs(){
    songList.forEach((song, index) => {
        //crear li
        const li = document.createElement("li");
        //crear a
        const link = document.createElement("a");
        //hidratar a
        link.textContent = song.title;
        link.href = "#"
        //escuchar clicks
        link.addEventListener("click", ()=>loadSong(index))
        //añadir a li
        li.appendChild(link);
        // añadir li a ul
        songs.appendChild(li);
    })
}

//cargar cancion seleccionada
function loadSong(songIndex){
    if(songIndex !== actualSong){
        changeActiveClass(actualSong, songIndex);
        actualSong = songIndex;
        audio.src = songList[songIndex].file;
        // audio.addEventListener("loadeddata", function() {
        //     let timerSong = this.duration/60;
        //     time.innerText = `${timerSong.toFixed(2)}`
        //    });
        playSong();

        changeCover(songIndex);
        changeSongtitle(songIndex);
        
    }
}

//Actualizar el tiempo transcurrido de la cancion
function updateCurrentTime(){
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60);
    console.log(seconds)
    let timeTotal = padDigits(minutes, 2) + ':' + padDigits(seconds, 2);
    time.innerText = `${timeTotal}`

}
//para formatear el tiempo
function padDigits(number, digits) {
    return String(number).padStart(digits, '0');
  }

//Actualizar barra de progreso de la cancion
function updateProgress(event){
    //total y el acutal
    // const {currentTime, duration} = event.srcElement;
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const porcentaje = (currentTime/duration)*100;
    progress.style.width = porcentaje + "%"

}

//hacer la barra de progreso clickeable
function setProgress (event){
    const totalWidth = this.offsetWidth;
    const progressWidth = event.offsetX;
    const porcentaje = ( progressWidth / totalWidth) * audio.duration;
    audio.currentTime = porcentaje;
}

//actualizar controles
function updateControls(){
    if(audio.paused){
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    }
    else{
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
    }
}

//Reproducir canción
function playSong() {
    audio.play();
    updateControls();
}
//Pausar canción
function pauseSong() {
    audio.pause();
    updateControls();
}

//avanzar cancion 
function nextSong() {
    if (actualSong + 1 < songList.length)
    {
        
        loadSong(actualSong + 1);
    }
    
}

//retroceder cancion 
function prevSong() {
    if (actualSong - 1 > songList.length)
        loadSong(actualSong - 1);
}

//cambiar clase activa
function changeActiveClass(lastIndex, newIndex){
    const links = document.querySelectorAll("a");
    if (lastIndex !== null){
        links[lastIndex].classList.remove('active');
    }
    links[newIndex].classList.add('active');
}

//cambiar el cover de la cancion
function changeCover(songIndex){
    cover.src = songList[songIndex].cover;
}

//cambiar el titulo de la cancion
function changeSongtitle(songIndex){
    title.innerText=songList[songIndex].title;
    console.log()
    artist.innerText=songList[songIndex].artist;
}

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
})

//GO
loadSongs();