let form = document.getElementById("form")
let imagenInput = document.getElementById("imagenInput")
let artistaInput = document.getElementById("artistaInput")
let nombreInput = document.getElementById("nombreInput")
let generoInput = document.getElementById("generoInput")
let urlCancionInput = document.getElementById("urlCancionInput")
let imagenMsg = document.getElementById("imagenMsg")
let artistaMsg = document.getElementById("artistaMsg")
let nombreMsg = document.getElementById("nombreMsg")
let generoMsg = document.getElementById("generoMsg")
let urlCancionMsg = document.getElementById("urlCancionMsg")
let add = document.getElementById("add")
let canciones = document.getElementById("canciones")

let data = JSON.parse(localStorage.getItem("canciones")) || [];

// Genera un id 
const idRandom = () => {
    if (data.length > 0) {
        return data[data.length - 1].id + Math.round(Math.random() * 100);
    } else {
        return Math.round(Math.random() * 100);
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation()
})

let formValidation = () => {
    if (imagenInput.value === "" || artistaInput.value === "" || nombreInput.value === "" || generoInput.value === "" || urlCancionInput.value === "") {
        imagenMsg.innerHTML = "La URL de la imagen es requerida";
        artistaMsg.innerHTML = "El artista es requerido";
        nombreMsg.innerHTML = "El nombre es requerido";
        generoMsg.innerHTML = "El genero es requerido";
        urlCancionMsg.innerHTML = "La URL es requerida"
    } else {
        // Caso contrario no mostrar las validaciones
        imagenMsg.innerHTML = "";
        artistaMsg.innerHTML = "";
        nombreMsg.innerHTML = "";
        generoMsg.innerHTML = "";
        urlCancionMsg.innerHTML = "";
        data.push({
            id: idRandom(),
            imagen: imagenInput.value,
            artista: artistaInput.value,
            nombre: nombreInput.value,
            genero: generoInput.value,
            url: urlCancionInput.value
        })
        localStorage.setItem('canciones', JSON.stringify(data))
        createMusic()
        //Cierra el modal una vez que se guarda
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        // esta funcion lo limpia una vez se hace click y se guarda
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })()

    }
}

const createMusic = () => {
    canciones.innerHTML = "";
    data.map((cancion, idx) => {
        // contatenamos las demas tareas
        return canciones.innerHTML += `
         <div id="${idx}">

         <audio src="${cancion.url}" id="audio"></audio>
         <ul class="songs" id="songs">
         </ul>
 
         <div class="player">
         <div class="container-fluid d-flex h-100 align-items-center" >
             <div class="row d-flex w-100">
                 <div class="col-1 d-flex align-items-center justify-content-between">
                     <img src="${cancion.imagen}" alt="" class="imgAlbum" id="cover">
                 </div>
                 <div class="col-1 d-flex align-items-center  gap-2 mx-5">
                         <i class="fa-solid fa-backward-step fa-lg" style="color: #ffffff;" id="prev"></i>
                         <i class="fa-solid fa-play fa-2x" style="color: #ffffff;" id="play"></i>
                         <i class="fa-solid fa-forward-step fa-lg" style="color: #ffffff;" id="next"></i>
                 </div>
                 <div class="col-1 timeSong mx-3 d-flex align-items-center" id="timeTrack">
                         3:00
                 </div>
                 <div class="col d-flex justify-content-center mb-0 flex-column align-items-center">
                         <p class="mb-0" id="title">${cancion.nombre}</p>
                         <p class="mb-0" id="artist">${cancion.artista}</p>
                 </div>
                 <div class="col progressBar align-items-center h-100">
                     <div class="progress-container my-5"  id="progress-container">
                         <section class="progress" id="progress"></section>
                     </div>
                 </div>
                 <div class="col-2 d-flex align-items-center gap-2 justify-content-end">
                         <i class="fa-solid fa-download" style="color: #ffffff;"></i>
                         <i class="fa-solid fa-star" style="color: #ffffff;"></i>
                         <i class="fa-solid fa-share-nodes" style="color: #ffffff;"></i>
                 </div>
                 <div class="col d-flex align-items-center justify-content-end gap-2">
                     <i class="fa-solid fa-volume-high" style="color: #ffffff;"></i>
                     <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="1">
                 </div>
                 <div class="col d-flex align-items-center justify-content-end gap-2">
                 <button onclick="updateMusic(${cancion.id})" data-bs-toggle="modal" data-bs-target="#form" class="btn btn-primary">Modificar</button>
                 <button onclick="deleteMusic(${cancion.id})" class="btn btn-danger">Eliminar</button>
               </div>
             </div>
         </div>
     </div>
          </div>
        `
    })
}

const updateMusic = (id) => {
    console.log(id)
    const cancionBuscada = data.find((cancion) => {
        return cancion.id === id
    })
    imagenInput.value = cancionBuscada.imagen;
    artistaInput.value = cancionBuscada.artista;
    nombreInput.value = cancionBuscada.nombre;
    generoInput.value = cancionBuscada.genero;
    urlCancionInput.value = cancionBuscada.url;
    // traemos todas las canciones que sean distintas al id. Elimina al id y genera uno nuevo
    const filter = data.filter((cancion) => {
        return cancion.id !== id
    })
    data = filter;
    // guardamos la nueva cancion
    localStorage.setItem("canciones", JSON.stringify(data))
    console.log(cancionBuscada);
    createMusic()
}

const deleteMusic = (id) => {
    const confirmar = confirm("Desea eliminar esta cancion")
    if (confirmar) {
        const cancionFiltrada = data.filter((tarea) => {
            return tarea.id !== id
        })
        data = cancionFiltrada
        localStorage.setItem("cancion", JSON.stringify(data))
        createMusic()
    } else {
        alert('Cancelado')
    }
}
createMusic()