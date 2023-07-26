const loginIcon = document.querySelector(".login-icon");
const userStatus = document.querySelector(".user-status");
const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

const actualizarEstadoUsuario = () => {
  if (usuarioLogueado && usuarioLogueado.isLogged) {
    userStatus.textContent = "¡Hola, " + usuarioLogueado.nombre + "!";
  } else {
    userStatus.textContent = "Iniciar sesión";
  }
};

actualizarEstadoUsuario();
const cerrarSesion = () => {

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
      localStorage.removeItem("usuarioLogueado");
      actualizarEstadoUsuario();
      location.href = "../login.html";
    }
  });
};

loginIcon.addEventListener("click", (event) => {
  event.preventDefault();

  if (usuarioLogueado && usuarioLogueado.isLogged) {
    cerrarSesion();
  } else {
    location.href = "../login.html";
  }
});

document.addEventListener("DOMContentLoaded", actualizarEstadoUsuario);

const verificarAdminLogueado = () => {
  const adminLink = document.querySelector(".admin")
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (usuarioLogueado && usuarioLogueado.isLogged && usuarioLogueado.isAdmin) {
    if (adminLink) {
      adminLink.classList.add("active");
    }
  }
};

const verificarUserLogueado = () => {
  const adminLink1 = document.querySelector(".user");
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (usuarioLogueado && usuarioLogueado.isLogged) {
    if (adminLink1) {
      adminLink1.classList.add("active");
    }
  }
};

document.addEventListener("DOMContentLoaded", verificarAdminLogueado);
document.addEventListener("DOMContentLoaded", verificarUserLogueado);

