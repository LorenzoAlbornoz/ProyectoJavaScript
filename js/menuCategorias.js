const ul = document.getElementById("lista-categorias");
const listaCanciones =  JSON.parse(localStorage.getItem("canciones"));

let generosEncontrados = [];



const cargarMenuCategorias = ()=> {
  ul.innerHTML=""
  listaCanciones.forEach(function(elemento) {
    if (!generosEncontrados.includes(elemento.genero)) {
      generosEncontrados.push(elemento.genero);
    }
  });
  
  generosEncontrados.forEach((elemento,indice)=>{
      ul.innerHTML+= `<li onclick="filtrarCategoria(${indice})" class="item-categoria py-3" id="item${indice}">${elemento}</li>`
  })
}

cargarMenuCategorias()