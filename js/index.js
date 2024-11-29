const campoEmail = document.getElementById("email");
const campoPassword = document.getElementById("password");
const botonEnviar = document.getElementById("botonEnviar");
const toastError = new bootstrap.Toast(document.querySelector('.toastError'));
const toastSuccess = new bootstrap.Toast(document.querySelector('.toastSuccess'));

const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validarCampo(campo, mensajeError, criterio) {
    const valor = campo.value.trim();
    if (!criterio(valor)) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        mensajeError && (campo.nextElementSibling.textContent = mensajeError);
    } else {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
    }
    habilitarBoton();
}

function validarEmail() {
    const valor = campoEmail.value.trim();
    if (valor === "") {
        validarCampo(campoEmail, "El correo es obligatorio.", () => false);
    } else if(!patronEmail.test(valor)){
        validarCampo(campoEmail, "Ingrese un correo válido.", () => false);
    } else{
        validarCampo(campoEmail, "", () => true);
    }
    
}

function validarPassword() {
    validarCampo(campoPassword, "Debe ingresar una contraseña con mínimo 8 caracteres.", (valor) => valor.length >= 8);
}

function habilitarBoton() {
    botonEnviar.disabled = !(campoEmail.classList.contains("is-valid") && campoPassword.classList.contains("is-valid"));
}

function habilitarBoton() {
    botonEnviar.disabled = !(
        campoEmail.classList.contains("is-valid") &&
        campoPassword.classList.contains("is-valid")
    );
}

campoEmail.addEventListener("blur", validarEmail);
campoPassword.addEventListener("blur", validarPassword);

campoEmail.addEventListener("input", validarEmail);
campoPassword.addEventListener("input", validarPassword);

function iniciarSesion(event) {
    event.preventDefault();

    const email = campoEmail.value.trim();
    const password = campoPassword.value.trim();

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuariosRegistrados.find((usuario) => usuario.email === email && usuario.password === password);

    if (usuarioEncontrado) {
        console.log(`Bienvenido, ${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}!`);
        mostrarAlertaExito();
        localStorage.setItem("sesionActiva", "true");
        window.location.href = "views/inicio.html";
    } else {
        mostrarAlerta();
    }
}

function mostrarAlerta() {
    toastError.show();
}

function mostrarAlertaExito() {
    toastSuccess.show();
}

document.querySelector(".formulario").addEventListener("submit", iniciarSesion);


function mostrarUsuariosRegistrados() {
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuariosRegistrados.length === 0) {
        console.log("No hay usuarios registrados.");
    } else {
        console.log("Usuarios registrados:");
        usuariosRegistrados.forEach((usuario, index) => {
            console.log(`Usuario ${index + 1}:`, usuario);
        });
    }
}

mostrarUsuariosRegistrados();

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("sesionActiva") === "true") {
        window.location.href = "views/inicio.html";
    }
});