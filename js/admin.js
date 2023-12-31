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
let cerrar = document.getElementById("cerrar")
let cerrarM = document.getElementById("cerrarUpdate")
let canciones = document.getElementById("canciones")
let xClose = document.getElementById("xClose")
let data = JSON.parse(localStorage.getItem("canciones")) || [];
let listaFiltrada = JSON.parse(localStorage.getItem("canciones")) || [];
let datosSinGuardar = [];

const resetForm = () => {
    form.reset()
}

const idRandom = () => {
    if (data.length > 0) {
        return data[data.length - 1].id + Math.round(Math.random() * 100);
    } else {
        return Math.round(Math.random() * 100);
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
})

let formValidation = () => {
    if (imagenInput.value === "" || artistaInput.value === "" || nombreInput.value === "" || generoInput.value === "" || urlCancionInput.value === "") {
        imagenMsg.innerHTML = "La URL de la imagen es requerida";
        artistaMsg.innerHTML = "El artista es requerido";
        nombreMsg.innerHTML = "El nombre es requerido";
        generoMsg.innerHTML = "El genero es requerido";
        urlCancionMsg.innerHTML = "La URL es requerida"
        setTimeout(() => {
            imagenMsg.innerHTML = "";
            artistaMsg.innerHTML = "";
            nombreMsg.innerHTML = "";
            generoMsg.innerHTML = "";
            urlCancionMsg.innerHTML = ""
        }, 4000);
        return;
    } else {
        imagenMsg.innerHTML = "";
        artistaMsg.innerHTML = "";
        nombreMsg.innerHTML = "";
        generoMsg.innerHTML = "";
        urlCancionMsg.innerHTML = "";

        data = JSON.parse(localStorage.getItem("canciones")) || [];
        data.unshift({
            id: idRandom(),
            imagen: imagenInput.value,
            artista: artistaInput.value,
            nombre: nombreInput.value,
            genero: generoInput.value,
            url: urlCancionInput.value
        })
        localStorage.setItem('canciones', JSON.stringify(data))
        createMusic(data)
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "");
            Swal.fire({
                background: 'var(--c-navbar)',
                color: "var(--c-letter)",
                position: "center",
                icon: "success",
                title: "Canción creada exitosamente",
                showConfirmButton: false,
                timer: 1500,
            });
            form.reset();
            document.getElementById("edit").reset();
        })()
    }
}

const createMusic = () => {
    canciones.innerHTML = "";
    data.map((cancion, idx) => {
        return canciones.innerHTML += `
         <div class="contenedor-cancion">
         <div id="${idx}">

         <audio src="${cancion.url}" id="${cancion.id}"></audio>
 
         <div class="player">
         <div class="container-fluid d-flex h-100 align-items-center" >
             <div class="row d-flex w-100 justify-content-between">
                 

                 <div class="col-6 col-sm-5 d-flex align-items-center  gap-2 ms-3">
                        <div class="d-none d-sm-flex align-items-center justify-content-between me-5">
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
                            00:00
                        </div>
                        

                        <div class="w-50  d-none d-sm-inline progressBar align-items-center h-100">
                        <div onclick="setProgress(event)" class="progress-container my-5"  id="progress-container${cancion.id}">
                            <section class="progress" id="progress${cancion.id}"></section>
                        </div>
                    </div>
                        
                 </div>
                 
                 
                 
                 <div class="col-2 col-sm-2  d-flex align-items-center justify-content-end gap-2 ms-0">
                 <div class="actions d-none d-md-flex align-items-center gap-3 justify-content-end me-3">
                 <a href="./error404.html"> <i class="linkPointer fa-solid fa-download" ></i> </a>
                 <a href="./error404.html"> <i class="linkPointer fa-solid fa-star" ></i> </a>
                 <a href="./error404.html"> <i class="linkPointer fa-solid fa-share-nodes"></i> </a>
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

const deleteMusic = (id) => {
    Swal.fire({
        background: 'var(--c-navbar)',
        color: "var(--c-letter)",
        position: "center",
        icon: "warning",
        title: "¿Desea eliminar esta canción?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "var(--c-success)",
        cancelButtonColor: "var(--c-wrong)",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            if (document.querySelector("#clear")) {
                let clear = document.getElementById("clear");
                clear.classList.add("d-none")
                let text = document.getElementById("textBuscar")
                text.value = "";
                document.querySelector(".tipo-busqueda").selectedIndex = "Tipo de busqueda"
            }
            data = JSON.parse(localStorage.getItem("canciones")) || [];
            const cancionFiltrada = data.filter((tarea) => {
                return tarea.id !== id;
            });
            data = cancionFiltrada;
            localStorage.setItem("canciones", JSON.stringify(data));
            createMusic();
            listaFiltrada = [];
            Swal.fire({
                background: 'var(--c-navbar)',
                color: "var(--c-letter)",
                position: "center",
                icon: "success",
                title: "Canción eliminada exitosamente",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Eliminación cancelada",
                background: 'var(--c-navbar)',
                color: "var(--c-letter)",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
};

const filterTabla = () => {
    data = JSON.parse(localStorage.getItem("canciones"))
    let text = document.getElementById("textBuscar").value;
    let tipoBusqueda = document.querySelector(".tipo-busqueda").value
    let clear = document.getElementById("clear");
    let sinBusqueda = true;
    switch (tipoBusqueda) {
        case "1":
            sinBusqueda = false;
            listaFiltrada = data.filter((cancion) => {
                return cancion.nombre.toLowerCase().includes(text.toLowerCase());
                sinBusqueda = false;
            })
            break;
        case "2":
            sinBusqueda = false;
            listaFiltrada = data.filter((cancion) => {
                return cancion.artista.toLowerCase().includes(text.toLowerCase());

            })
            break;
        case "3":
            data = JSON.parse(localStorage.getItem("canciones")) || [];
            sinBusqueda = false;
            listaFiltrada = data.filter((cancion) => {
                return cancion.genero.toLowerCase().includes(text.toLowerCase());
            })
            break;
        default:
            sinBusqueda = true;
            break;
    }
    if (text.length > 0 && tipoBusqueda <= 3 && !sinBusqueda) {
        clear.classList.remove("d-none")
    }
    else {
        clear.classList.add("d-none")
    }
    refreshTabla()
    if (listaFiltrada.length == 0) {
        canciones.innerHTML += `       
         <p class="ms-3" id="fail">No se encontraron resultados que coincidan con la busqueda</p>
        `
    }
}

const limpiarTabla = () => {
    let clear = document.getElementById("clear");
    clear.classList.add("d-none")
    data = JSON.parse(localStorage.getItem("canciones"))
    let text = document.getElementById("textBuscar")
    text.value = "";
    document.querySelector(".tipo-busqueda").selectedIndex = "Tipo de busqueda"
    text.focus(),
        createMusic()
}

const refreshTabla = () => {
    canciones.innerHTML = "";
    listaFiltrada.map((cancion, idx) => {
        return canciones.innerHTML += `
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
                         <i onclick="playSong(${cancion.id})" class="fa-solid fa-play fa-2x" style="color: #ffffff;" id="play${cancion.id}"></i>
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
                            00:00
                        </div>
                        

                        <div class="w-50  d-none d-sm-inline progressBar align-items-center h-100">
                        <div onclick="setProgress(event)" class="progress-container my-5"  id="progress-container${cancion.id}">
                            <section class="progress" id="progress${cancion.id}"></section>
                        </div>
                    </div>
                        
                 </div>
                 
                 
                 
                 <div class="col-2 col-sm-2  d-flex align-items-center justify-content-end gap-2 ms-0">
                 <div class="actions d-none d-md-flex align-items-center gap-3 justify-content-end me-3">
                 <a href="./error404.html"> <i class="fa-solid fa-download" ></i> </a>
                 <a href="./error404.html"> <i class="fa-solid fa-star" ></i> </a>
                 <a href="./error404.html"> <i class="fa-solid fa-share-nodes"></i> </a>
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

createMusic()