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
        createMusic(data)
        //Cierra el modal una vez que se guarda
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        // esta funcion lo limpia una vez se hace click y se guarda
        (() => {
            add.setAttribute("data-bs-dismiss", "");
            form.reset();
            // location. reload()
        })()

    }
}

const createMusic = (data) => {
    canciones.innerHTML = "";
    data.map((cancion, idx) => {
        // concatenamos las demas tareas
        return canciones.innerHTML += `
         <div class="contenedor-cancion">
         <div id="${idx}">

         <audio src="${cancion.url}" id="${cancion.id}"></audio>
 
         <div class="player">
         <div class="container-fluid d-flex h-100 align-items-center" >
             <div class="row d-flex w-100 justify-content-between">
                 
                 <div class="col-3 d-flex align-items-center  gap-2 ms-3">
                        <div class="d-flex align-items-center justify-content-between me-5">
                            <img src="${cancion.imagen}" alt="" class="imgAlbum" id="cover">
                        </div>
                        <i class="fa-solid fa-backward-step fa-lg" style="color: #ffffff;" id="prev"></i>
                        <i onclick="playSong(${cancion.id})" class="fa-solid fa-play fa-2x" style="color: #ffffff;" id="play${cancion.id}"></i>
                        <i class="fa-solid fa-forward-step fa-lg" style="color: #ffffff;" id="next"></i>
                        <div class="d-none d-sm-flex flex-column ms-3">
                            <p class="mb-0 title" id="title${cancion.id}">${cancion.nombre}</p>
                            <p class="mb-0 artist" id="artist${cancion.id}">${cancion.artista}</p>
                        </div>
                        
                         
                 </div>
                 <div class="col-1 ms-3 align-items-center justify-content-start  d-none d-lg-flex">
                            <p class="mb-0 genero" id="genero${cancion.id}">${cancion.genero}</p>
                        </div>
                 
                 <div class="col d-none d-sm-flex justify-content-end justify-content-lg-evenly mb-0 align-items-center">
                        <div class="col-md-2 timeSong d-none d-md-flex align-items-center " id="timeTrack${cancion.id}">
                            --:--
                        </div>
                        

                        <div class="w-50  d-none d-sm-inline progressBar align-items-center h-100">
                        <div onclick="setProgress(event)" class="progress-container my-5"  id="progress-container${cancion.id}">
                            <section class="progress" id="progress${cancion.id}"></section>
                        </div>
                    </div>
                        
                 </div>
                 
                 
                 
                 <div class="col-5 col-sm-4  d-flex align-items-center justify-content-end gap-2 ms-0">
                 <div class="actions d-none d-md-flex align-items-center gap-3 justify-content-end me-3">
                         <i class="fa-solid fa-download" ></i>
                         <i class="fa-solid fa-star" ></i>
                         <i class="fa-solid fa-share-nodes"></i>
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

const updateMusic = (id) => {
    cerrar.classList.add("d-none")
    xClose.classList.add("d-none")
    cerrarM.classList.remove("d-none")
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
    createMusic(data)
}

const deleteMusic = (id) => {

    const confirmar = confirm("Desea eliminar esta cancion")
    if (confirmar) {
        const cancionFiltrada = data.filter((tarea) => {
            return tarea.id !== id
        })      
        data = cancionFiltrada
        localStorage.setItem("canciones", JSON.stringify(data))
        createMusic(data)
    } else {
        alert('Cancelado')
    }
}

const closeWithOutSave= () =>{
    localStorage.setItem("canciones", JSON.stringify(data))
    createMusic(data)
}

const filterTabla = () =>{
    let text = document.getElementById("textBuscar").value;
    let tipoBusqueda = document.querySelector(".tipo-busqueda").value
    let clear = document.getElementById("clear");
    switch (tipoBusqueda) {
        case "1":
                data = JSON.parse(localStorage.getItem("canciones")) || [];
                listaFiltrada = data.filter((cancion)=>{
                return cancion.nombre.toLowerCase().includes(text.toLowerCase());
                })
            break;
        case "2":
                data = JSON.parse(localStorage.getItem("canciones")) || [];
                listaFiltrada = data.filter((cancion)=>{
                return cancion.artista.toLowerCase().includes(text.toLowerCase());
                })
            break;
        case "3":
                data = JSON.parse(localStorage.getItem("canciones")) || [];
                listaFiltrada = data.filter((cancion)=>{
                return cancion.genero.toLowerCase().includes(text.toLowerCase());
                })
            break;
        default:
            break;
    }    
    if (text.length>0){
        clear.classList.remove("d-none")
    }
    else
    {
        clear.classList.add("d-none")
    }
    createMusic(listaFiltrada)
    console.log(listaFiltrada)
    if (listaFiltrada.length == 0){
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
    text.value="";
    text.focus(),
    createMusic(data)
}
createMusic(data)
