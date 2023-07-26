let usuarios = [];

const actualizarUsuariosConectados = () => {
    const userListElement = document.getElementById("userList");
    userListElement.innerHTML = "";

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const rows = usuarios.map((usuario) => `
      <tr>
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td class="usuarios">${usuario.email}</td>
          <td class="d-flex justify-content-center"><button class="btn btn-delete btn-sm d-flex align-item-center" onclick="eliminarUsuario(${usuario.id})">
                <i class="ri-close-circle-line"></i>
            </button>
        </td>
      </tr>
  `);
    userListElement.innerHTML = rows.join("");
};

const eliminarUsuario = (id) => {
    Swal.fire({
        background: 'var(--c-navbar)',
        color: "var(--c-letter)",
        position: "center",
        icon: "warning",
        title: "¿Desea eliminar este usuario?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "var(--c-success)",
        cancelButtonColor: "var(--c-wrong)",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            const index = usuarios.findIndex((usuario) => usuario.id === id);
            if (index !== -1) {
                usuarios.splice(index, 1);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                actualizarUsuariosConectados();
                Swal.fire({
                    background: 'var(--c-navbar)',
                    color: "var(--c-letter)",
                    position: "center",
                    icon: "success",
                    title: "Canción eliminada exitosamente",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
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

document.addEventListener("DOMContentLoaded", () => {
    actualizarUsuariosConectados();
});