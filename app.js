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

let data = JSON.parse(localStorage.getItem("cancion")) || [];

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
            URL: urlCancionInput.value
        })
        localStorage.setItem('cancion', JSON.stringify(data))
        createMusic()
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })()

    }
}

const createMusic = () => {
    canciones.innerHTML = "";
    data.map((cancion, idx) => {
        return canciones.innerHTML += `
        <div id="${idx}">
        <table class="table-css">
        <thead>
            <tr>
                <th>Imagen del álbum o artista</th>
                <th>Artista</th>
                <th>Nombre de la Canción</th>
                <th>Género</th>
                <th>Cancion</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        <tr>
        <td>
           <img src="${cancion.imagen}"
            alt="" class="img-album">
         </td>
        <td>${cancion.artista}</td>
        <td>${cancion.nombre}</td>
        <td>${cancion.genero}</td>
        <td>
            <audio class="audio" controls>
              <source
              src="${cancion.url}"
              type="audio/mpeg">
            </audio>
         </td>
         <td>
         <button onclick="updateMusic(${cancion.id})" data-bs-toggle="modal" data-bs-target="#form" class="btn btn-primary">Modificar</button>
         <button onclick="deleteMusic(${cancion.id})" class="btn btn-danger">Eliminar</button>
     </td>
     </tr>
 </div>
</tbody>
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
    const filter = data.filter((cancion) => {
        return cancion.id !== id
    })
    data = filter;
    localStorage.setItem("cancion", JSON.stringify(data))
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