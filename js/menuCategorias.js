const ul = document.getElementById("lista-categorias");
const listaCanciones =  JSON.parse(localStorage.getItem("canciones"));

let generosEncontrados = [];

listaCanciones.forEach(function(elemento) {
  if (!generosEncontrados.includes(elemento.genero)) {
    generosEncontrados.push(elemento.genero);
  }
});

generosEncontrados.forEach((elemento,indice)=>{
  console.log(elemento)
    ul.innerHTML+= `<li onclick="filtrarCategoria(${indice})" class="item-categoria py-3" id="item${indice}">${elemento}</li>`
})


