//////////// funcionalidad slide ///////////////////////
const btnSignIn = document.querySelector(".sign-in-btn"),
    btnSignUp = document.querySelector(".sign-up-btn"),
    singUp = document.querySelector(".sign-up"),
    signIn = document.querySelector(".sign-in");

document.addEventListener("click", (e) => {
    if (e.target === btnSignIn || e.target === btnSignUp) {//nos muestra elementos ocultos
        signIn.classList.toggle("active");//Esta clase se aplica cuando se quiere mostrar el elemento con la clase, Al agregar la clase "active" al elemento con la clase .sign-in, se cambiará su visibilidad a opacity: 1; y visibility: visible;, lo que lo hará visible en la página.
        singUp.classList.toggle("active");//Esta clase se aplica cuando se quiere ocultar el elemento con la clase, Al agregar la clase "active" al elemento con la clase .sign-up, se cambiará su visibilidad a opacity: 0; y visibility: hidden;, lo que lo ocultará de la página.
    }

})
/////////////////////////////////////////////////////////////////////

const formSignUp = document.querySelector("#registro");
const formLogin = document.querySelector("#login");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
console.log(usuarios);

class Usuario {
    constructor(id, nombre, email, password, isAdmin = false, isLogged = false) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isLogged = isLogged
    }
}

//funcion para crear ids dinamicos
const idRandom = () => {
    if (usuarios.length > 0) {
        return usuarios[usuarios.length - 1].id + Math.round(Math.random() * 100);
    } else {
        return Math.round(Math.random() * 100);
    }
};

// funcionalidad de registro

formSignUp.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = idRandom();
    let nombre = document.querySelector("#nombre-registro").value;
    let email = document.querySelector("#email-registro").value;
    let password = document.querySelector("#password-registro").value;
    let error = document.querySelector(".error");
    error.innerHTML = ""; //empieza vacio

    // validar email
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const emailValidado = regex.test(email); // Busca coincidencia
    if (nombre === '' || email === '' || password === '') {
        error.innerHTML = "Todos los campos son obligatorios";
        error.style.display = "block"
        error.style.padding = "10px"
        error.style.marginTop = "10px" // se escribe en camelCase
        error.style.color = "white"
        error.style.borderRadius = "10px"
        error.style.backgroundColor = "var(--c-wrong)"
        setTimeout(() => {// se borran a los 4 segundos
            error.innerHTML = "";
            error.style.display = "none"
        }, 4000);
        return;
    }
    //validar el email coincida con la expresion regular
    if (!emailValidado) {
        error.innerHTML = "Email no valido";
        error.style.display = "block";
        error.style.padding = "10px";
        error.style.color = "var(--c-wrong)";
        setTimeout(() => {
            error.style.display = "none";
        }, 4000);
        return;
    }
    //validar si ya existe el usuario
    let validarUsuario = usuarios.find((usuario) => {
        return usuario.email === email
    });
    if (validarUsuario !== undefined) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Usuario Existente",
            showConfirmButton: false,
            timer: 1500,
        });
        formSignUp.reset();
        document.querySelector("#nombre-registro").focus();
        return;
    }
    let nuevoUsuario = new Usuario(id, nombre, email, password);
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    formSignUp.reset()
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Registro exitoso!",
        showConfirmButton: false,
        timer: 1500,
    });
})

//fucnioalidad login
formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    const errorLogin = document.querySelector(".error-login");

    //validar que los campos no esten vacios
    if (email === "" || password === "") {
        errorLogin.innerHTML = "Debes ingresar un email y una contraseña";
        errorLogin.style.display = "block";
        errorLogin.style.padding = "10px";
        errorLogin.style.marginTop = "10px";
        errorLogin.style.color = "white";
        errorLogin.style.borderRadius = "10px";
        errorLogin.style.backgroundColor = "var(--c-wrong)";
        setTimeout(() => {
            errorLogin.style.display = "none";
        }, 4000);
        return;
    }

    //validar si existe el usuario con ese mail
    const validarEmail = usuarios.find((usuario) => {
        return usuario.email === email && usuario.password === password
    });
    if (validarEmail === undefined) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Usuario o contraseña son incorrectos",
            showConfirmButton: false,
            timer: 1500,
        });
        document.getElementById("login").reset();
        document.getElementById("email-login").focus();
        return;
    }

    validarEmail.isLogged = true;
    localStorage.setItem('usuarioLogueado', JSON.stringify(validarEmail));
    formLogin.reset()
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Bienvenido!",
        showConfirmButton: false,
        timer: 1500,
    });
    setTimeout(() => {
        if (validarEmail.isLogged) { // Cambia esta condición para verificar si el usuario está logueado
            if (validarEmail.isAdmin) { // Verifica si el usuario es administrador
                window.location.href = "../html/Administrador.html"; // Redirige a la página de administrador si es administrador
            } else {
                window.location.href = "../html/usuario.html"; // Redirige a la página normal si no es administrador
            }
        }
    }, 2000);
})

const logout = () => {
    localStorage.removeItem('usuarioLogueado'); //cuando cierras el navegador se deslogea
}


