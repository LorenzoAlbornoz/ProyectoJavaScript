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

actualizarEstadoUsuario();

  // Función para cerrar sesión con SweetAlert
  const cerrarSesion = () => {
    // Mostrar un cuadro de confirmación utilizando SweetAlert
    Swal.fire({
      title: "Cerrar sesión",
      text: "¿Estás seguro que deseas cerrar sesión?",
      icon: "warning",
      background: 'var(--c-navbar)',
      color: "var(--c-letter)",
      showCancelButton: true,
      confirmButtonColor: "var(--c-success)",
      cancelButtonColor: "var(--c-wrong)",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, cerrar la sesión
        localStorage.removeItem("usuarioLogueado");
        actualizarEstadoUsuario();
        location.href = "./login.html";
      }
    });
  };

  // Agregar evento de clic al icono de login
  loginIcon.addEventListener("click", (event) => {
    event.preventDefault(); // Previene la redirección inmediata al hacer clic

    if (usuarioLogueado && usuarioLogueado.isLogged) {
      // Si el usuario está logeado, mostrar SweetAlert para cerrar sesión
      cerrarSesion();
    } else {
      // Si el usuario no está logeado, redirigir a la página de inicio de sesión
      location.href = "./login.html";
    }
  });

  // Llamar a la función para actualizar el estado del usuario cuando se cargue la página
  document.addEventListener("DOMContentLoaded", actualizarEstadoUsuario);

// Luego de hacer un login o logout (según tu implementación), llama a la función para actualizar el estado del usuario nuevamente.

// Función para verificar si el usuario está logueado y es administrador
const verificarAdminLogueado = () => {
  const adminLink = document.querySelector(".admin");

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (usuarioLogueado && usuarioLogueado.isLogged && usuarioLogueado.isAdmin) {
    if(adminLink){
      
      adminLink.classList.add("active");// Si no es administrador, quitamos la clase 'active' para ocultar el enlaceL
    }
  }
};

// Llamar a la función cuando se cargue la página
document.addEventListener("DOMContentLoaded", verificarAdminLogueado);
