const btnSignIn = document.querySelector(".sign-in-btn"),
    btnSignUp = document.querySelector(".sign-up-btn"),
    singUp = document.querySelector(".sign-up"),
    signIn = document.querySelector(".sign-in");

document.addEventListener("click", (e) => {
    if (e.target === btnSignIn || e.target === btnSignUp) {
        signIn.classList.toggle("active");
        singUp.classList.toggle("active");
    }
})

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

const idRandom = () => {
    if (usuarios.length > 0) {
        return usuarios[usuarios.length - 1].id + Math.round(Math.random() * 100);
    } else {
        return Math.round(Math.random() * 100);
    }
};

formSignUp.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = idRandom();
    let nombre = document.querySelector("#nombre-registro").value;
    let email = document.querySelector("#email-registro").value;
    let password = document.querySelector("#password-registro").value;
    let error = document.querySelector(".error");
    error.innerHTML = "";

    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const emailValidado = regex.test(email); // Busca coincidencia

    let contraseña = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,10}$/;
    const contraseñaValidada = contraseña.test(password)

    if (nombre === '' || email === '' || password === '') {
        error.innerHTML = "Todos los campos son obligatorios";
        error.style.display = "block"
        error.style.padding = "10px"
        error.style.marginTop = "10px"
        error.style.color = "var(--c-white)"
        error.style.borderRadius = "10px"
        error.style.backgroundColor = "var(--c-wrong)"
        setTimeout(() => {
            error.innerHTML = "";
            error.style.display = "none"
        }, 4000);
        return;
    }

    if (!contraseñaValidada) {
        error.innerHTML = "Contraseña no valida";
        error.style.display = "block";
        error.style.padding = "10px";
        error.style.color = "var(--c-white)";
        error.style.backgroundColor = "var(--c-wrong)"
        setTimeout(() => {
            error.style.display = "none";
        }, 4000);
        return;
    }

    if (!emailValidado) {
        error.innerHTML = "Email no valido";
        error.style.display = "block";
        error.style.padding = "10px";
        error.style.color = "var(--c-white)";
        error.style.backgroundColor = "var(--c-wrong)"
        setTimeout(() => {
            error.style.display = "none";
        }, 4000);
        return;
    }

    let validarUsuario = usuarios.find((usuario) => {
        return usuario.email === email
    });
    if (validarUsuario !== undefined) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Usuario Existente",
            background: 'var(--c-navbar)',
            color: "var(--c-letter)",
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
        background: 'var(--c-navbar)',
        color: "var(--c-letter)",
        showConfirmButton: false,
        timer: 1500,
    });
})

formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    const errorLogin = document.querySelector(".error-login");

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

    const validarEmail = usuarios.find((usuario) => {
        return usuario.email === email && usuario.password === password
    });
    if (validarEmail === undefined) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Usuario o contraseña son incorrectos",
            background: 'var(--c-navbar)',
            color: "var(--c-white)",
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
        background: 'var(--c-navbar)',
        color: "var(--c-letter)",
        showConfirmButton: false,
        timer: 1500,
    });
    setTimeout(() => {
        if (validarEmail.isLogged) {
            if (validarEmail.isAdmin) {
                window.location.href = "../html/admin.html";
            } else {
                window.location.href = "../html/usuario.html";
            }
        }
    }, 2000);
})

const logout = () => {
    localStorage.removeItem('usuarioLogueado');
}
