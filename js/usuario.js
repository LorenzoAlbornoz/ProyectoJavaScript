let canciones = document.getElementById("canciones")
let data = JSON.parse(localStorage.getItem("canciones")) || [];
let listaFiltrada = JSON.parse(localStorage.getItem("canciones")) || [];
let categoriaPrevia = null;

const idRandom = () => {
    if (data.length > 0) {
        return data[data.length - 1].id + Math.round(Math.random() * 100);
    } else {
        return Math.round(Math.random() * 100);
    }
};

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
                    <a href="./error404.html"> <i class="linkPointer fa-solid fa-star" ></i> </a>
                    <a href="./error404.html"> <i class="linkPointer fa-solid fa-share-nodes"></i> </a>
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

const filterTabla = () => {
    let text = document.getElementById("textBuscar").value;
    let tipoBusqueda = document.querySelector(".tipo-busqueda").value
    let clear = document.getElementById("clear");
    let sinBusqueda = true;
    switch (tipoBusqueda) {
        case "1":
            sinBusqueda = false;
            data = JSON.parse(localStorage.getItem("canciones")) || [];
            listaFiltrada = data.filter((cancion) => {
                return cancion.nombre.toLowerCase().includes(text.toLowerCase());
            })
            break;
        case "2":
            sinBusqueda = false;
            data = JSON.parse(localStorage.getItem("canciones")) || [];
            listaFiltrada = data.filter((cancion) => {
                return cancion.artista.toLowerCase().includes(text.toLowerCase());
            })
            break;
        case "3":
            sinBusqueda = false;
            data = JSON.parse(localStorage.getItem("canciones")) || [];
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
    mostrarListaFiltrada()
    if (listaFiltrada.length == 0 && !sinBusqueda) {
        canciones.innerHTML += `       
         <p class="ms-3" id="fail">No se encontraron resultados que coincidan con la busqueda</p>
        `
    }
    updateControls()
}

const limpiarTabla = () => {
    let clear = document.getElementById("clear");
    clear.classList.add("d-none")
    let text = document.getElementById("textBuscar")
    text.value = "";
    text.focus(),
    document.querySelector(".tipo-busqueda").selectedIndex = "Tipo de busqueda"
    document.getElementById("btn-filtro").classList.add("d-none");
    cargarMenuCategorias()
    createMusic()
    updateControls()
}

const limpiarTablaCategoria = () => {
    let clear = document.getElementById("btn-filtro");
    clear.classList.add("d-none")
    data = JSON.parse(localStorage.getItem("canciones"))
    document.getElementById(`item${categoriaPrevia}`).classList.remove("Active")
    document.querySelector(".tipo-busqueda").selectedIndex = "Tipo de busqueda"
    let text = document.getElementById("textBuscar")
    text.value = "";
    document.getElementById("clear").classList.add("d-none");
    createMusic()
    updateControls()
}

createMusic()