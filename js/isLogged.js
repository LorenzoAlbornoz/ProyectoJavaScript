// Obtener el elemento del icono de login y el span para mostrar el estado del usuario
const loginIcon = document.querySelector(".login-icon");
const userStatus = document.querySelector(".user-status");

// Verificar si el usuario está logeado en el localStorage
const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

// Función para actualizar el estado del usuario en el icono de login
const actualizarEstadoUsuario = () => {
  if (usuarioLogueado && usuarioLogueado.isLogged) {
    // Si el usuario está logeado, muestra su nombre o un mensaje de bienvenida
    userStatus.textContent = "¡Hola, " + usuarioLogueado.nombre + "!";
  } else {
    // Si el usuario no está logeado, muestra "Iniciar sesión" u otro mensaje
    userStatus.textContent = "Iniciar sesión";
  }
};

// Llama a la función para actualizar el estado del usuario al cargar la página
actualizarEstadoUsuario();

// Luego de hacer un login o logout (según tu implementación), llama a la función para actualizar el estado del usuario nuevamente.

// Función para verificar si el usuario está logueado y es administrador
const verificarAdminLogueado = () => {
  const adminLink = document.querySelector(".admin");

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (usuarioLogueado && usuarioLogueado.isLogged && usuarioLogueado.isAdmin) {
    adminLink.href = "administrador.html"; // Cambia "administrador.html" por la página que corresponda para el administrador
    adminLink.classList.add("active");
  } else {
    adminLink.href = "javascript:void(0);"; // Establece un enlace sin acción cuando el administrador no está logeado
    adminLink.classList.remove("active");
  }
};

// Llamar a la función cuando se cargue la página
document.addEventListener("DOMContentLoaded", verificarAdminLogueado);