let formedit = document.getElementById("edit")
let imagenInputU = document.getElementById("imagenInputU")
let artistaInputU = document.getElementById("artistaInputU")
let nombreInputU = document.getElementById("nombreInputU")
let generoInputU = document.getElementById("generoInputU")
let urlCancionInputU = document.getElementById("urlCancionInputU")
let imagenMsgU = document.getElementById("imagenMsgU")
let artistaMsgU = document.getElementById("artistaMsgU")
let nombreMsgU = document.getElementById("nombreMsgU")
let generoMsgU = document.getElementById("generoMsgU")
let urlCancionMsgU = document.getElementById("urlCancionMsgU")
let addU = document.getElementById("addU")
let cerrarU = document.getElementById("cerrarU")
let songs = document.getElementById("canciones")


let songList = JSON.parse(localStorage.getItem("canciones")) || [];
let idCancionSeleccionada;

// Genera un id 
const idShuffle = () => {
    if (data.length > 0) {
        return data[data.length - 1].id + Math.round(Math.random() * 100);
    } else {
        return Math.round(Math.random() * 100);
    }
};

formedit.addEventListener("submit", (e) => {
    e.preventDefault();
    updateSong();
})


const updateMusic = (id) => {
    console.log("esto es el song list", songList)
    songList = JSON.parse(localStorage.getItem("canciones")) || [];
    const cancionBuscada = songList.find((cancion) => {
        return cancion.id === id
    })
    imagenInputU.value = cancionBuscada.imagen;
    artistaInputU.value = cancionBuscada.artista;
    nombreInputU.value = cancionBuscada.nombre;
    generoInputU.value = cancionBuscada.genero;
    urlCancionInputU.value = cancionBuscada.url;
    idCancionSeleccionada = id;
}

const refreshList = () => {
    if (document.querySelector("#clear")) {
        let clear = document.getElementById("clear");
        clear.classList.add("d-none")
        let text = document.getElementById("textBuscar")
        text.value = "";
        document.querySelector(".tipo-busqueda").selectedIndex = "Tipo de busqueda"
      }
    // traemos todas las canciones que sean distintas al id. Elimina al id y genera uno nuevo
    const filter = songList.filter((cancion) => {
        return cancion.id !== idCancionSeleccionada
    })
    songList = filter;
    // guardamos la nueva cancion
    localStorage.setItem("canciones", JSON.stringify(songList))

    songs.innerHTML = "";
    songList.map((cancion, idx) => {
        // concatenamos las demas tareas
        return songs.innerHTML += `
         <div class="contenedor-cancion">
         <div id="${idx}">

         <audio src="${cancion.url}" id="${cancion.id}"></audio>
 
         <div class="player">
         <div class="container-fluid d-flex h-100 align-items-center" >
             <div class="row d-flex w-100 justify-content-between">
                 

                 <div class="col-6 col-sm-5 d-flex align-items-center  gap-2 ms-3">
                        <div class="d-sm-flex align-items-center justify-content-between me-5">
                            <img src="${cancion.imagen}" alt="" class="imgAlbum" id="cover">
                        </div>
                         <i onclick="playSong(${cancion.id})" class="linkPointer fa-solid fa-play fa-2x" style="color: #ffffff;" id="play${cancion.id}"></i>
                         <div class=" d-sm-flex flex-column ms-3">
                            <p class="mb-0 title" id="title${cancion.id}">${cancion.nombre}</p>
                            <p class="mb-0 artist" id="artist${cancion.id}">${cancion.artista}</p>
                        </div>
                        
                         
                 </div>
                 <div class="col-1 ms-3 align-items-center justify-content-start  d-none d-lg-flex">
                            <p class="mb-0 genero" id="genero${cancion.id}">${cancion.genero}</p>
                        </div>
                 

                        <div class="col-2 col-sm-3 d-none d-sm-flex justify-content-end justify-content-lg-evenly mb-0 align-items-center">
                        <div class="col-md-2 timeSong d-none d-md-flex align-items-center " id="timeTrack${cancion.id}">
                            --:--
                        </div>
                        

                        <div class="w-50  d-none d-sm-inline progressBar align-items-center h-100">
                        <div onclick="setProgress(event)" class="progress-container my-5"  id="progress-container${cancion.id}">
                            <section class="progress" id="progress${cancion.id}"></section>
                        </div>
                    </div>
                        
                 </div>
                 
                 
                 
                 <div class="col-2 col-sm-2  d-flex align-items-center justify-content-end gap-2 ms-0">
                 <div class="actions d-none d-md-flex align-items-center gap-3 justify-content-end me-3">
                         <i class="linkPointer fa-solid fa-download" ></i>
                         <i class="linkPointer fa-solid fa-star" ></i>
                         <i class="linkPointer fa-solid fa-share-nodes"></i>
                 </div>
                 <div class="d-flex gap-2" >
                        <button onclick="updateMusic(${cancion.id})" data-bs-toggle="modal" data-bs-target="#edit" class="btn btn-edit"><i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i></button>
                        <button onclick="deleteMusic(${cancion.id})" class="btn btn-delete"><i class="fa-solid fa-delete-left"></i></button>
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

const updateSong = () => {
    if (imagenInputU.value === "" || artistaInputU.value === "" || nombreInputU.value === "" || generoInputU.value === "" || urlCancionInputU.value === "") {
        imagenMsgU.innerHTML = "La URL de la imagen es requerida";
        artistaMsgU.innerHTML = "El artista es requerido";
        nombreMsgU.innerHTML = "El nombre es requerido";
        generoMsgU.innerHTML = "El genero es requerido";
        urlCancionMsgU.innerHTML = "La URL es requerida"
        setTimeout(() => {
            imagenMsgU.innerHTML = "";
            artistaMsgU.innerHTML = "";
            nombreMsgU.innerHTML = "";
            generoMsgU.innerHTML = "";
            urlCancionMsgU.innerHTML = ""
        }, 4000);
        return;
    } else {
        // Caso contrario no mostrar las validaciones
        imagenMsgU.innerHTML = "";
        artistaMsgU.innerHTML = "";
        nombreMsgU.innerHTML = "";
        generoMsgU.innerHTML = "";
        urlCancionMsgU.innerHTML = "";
        songList.unshift({
            id: idShuffle(),
            imagen: imagenInputU.value,
            artista: artistaInputU.value,
            nombre: nombreInputU.value,
            genero: generoInputU.value,
            url: urlCancionInputU.value
        })
        localStorage.setItem('canciones', JSON.stringify(songList))
        refreshList(songList)
        //Cierra el modal una vez que se guarda
        addU.setAttribute("data-bs-dismiss", "modal");
        addU.click();
        // esta funcion lo limpia una vez se hace click y se guarda
        (() => {
            addU.setAttribute("data-bs-dismiss", "");
            Swal.fire({
                background: 'var(--c-navbar)',
                color: "var(--c-letter)",
                position: "center",
                icon: "success",
                title: "Canción actualizada exitosamente",
                showConfirmButton: false,
                timer: 1500,
            });
            formedit.reset();
            idCancionSeleccionada=null;
        })()
    }
}