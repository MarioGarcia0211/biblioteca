// Obtener elementos del formulario
const campoNombre = document.getElementById("nombre");
const campoApellido = document.getElementById("apellido");
const campoEmail = document.getElementById("email");
const campoPassword = document.getElementById("password");
const botonRegistrar = document.getElementById("botonRegistrar");
const formRegistro = document.getElementById("formRegistro");
const toastError = new bootstrap.Toast(document.querySelector('.toastError'));
const toastSuccess = new bootstrap.Toast(document.querySelector('.toastSuccess'));

// Patrón para validar el correo electrónico y que no contenga números
const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const patronSinNumeros = /^[a-zA-Z\s]+$/;

// Función para validar los campos
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
    habilitarBotonRegistrar();
}

// Validar los campos con reglas específicas
function validarNombre() {
    const valor = campoNombre.value.trim();
    if (valor === "") {
        validarCampo(campoNombre, "El nombre es obligatorio.", () => false);
    } else if (!patronSinNumeros.test(valor)) {
        validarCampo(campoNombre, "El nombre no puede contener números, ni signos.", () => false);
    } else {
        validarCampo(campoNombre, "", () => true);
    }
}

function validarApellido() {
    const valor = campoApellido.value.trim();
    if (valor === "") {
        validarCampo(campoApellido, "El apellido es obligatorio.", () => false);
    } else if (!patronSinNumeros.test(valor)) {
        validarCampo(campoApellido, "El apellido no puede contener números, ni signos.", () => false);
    } else {
        validarCampo(campoApellido, "", () => true);
    }
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

// Habilitar el botón de registro solo si todos los campos son válidos
function habilitarBotonRegistrar() {
    botonRegistrar.disabled = !(
        campoNombre.classList.contains("is-valid") &&
        campoApellido.classList.contains("is-valid") &&
        campoEmail.classList.contains("is-valid") &&
        campoPassword.classList.contains("is-valid")
    );
}

// Escuchar los eventos de blur y de input para cada campo
campoNombre.addEventListener("blur", validarNombre);
campoApellido.addEventListener("blur", validarApellido);
campoEmail.addEventListener("blur", validarEmail);
campoPassword.addEventListener("blur", validarPassword);

campoNombre.addEventListener("input", validarNombre);
campoApellido.addEventListener("input", validarApellido);
campoEmail.addEventListener("input", validarEmail);
campoPassword.addEventListener("input", validarPassword);

// Registrar usuario y guardar en localStorage
formRegistro.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = campoNombre.value.trim();
    const apellido = campoApellido.value.trim();
    const email = campoEmail.value.trim();
    const password = campoPassword.value.trim();

    // Recuperar los usuarios existentes desde localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el correo electrónico ya está registrado
    if (usuariosRegistrados.some((usuario) => usuario.email === email)) {
        mostrarAlerta();
        return;
    }

    // Agregar el nuevo usuario
    usuariosRegistrados.push({ nombre, apellido, email, password });
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

    mostrarAlertaExito();
    // window.location.href = "index.html";

    // Limpiar los campos después del registro
    formRegistro.reset();
    campoNombre.classList.remove("is-valid");
    campoApellido.classList.remove("is-valid");
    campoEmail.classList.remove("is-valid");
    campoPassword.classList.remove("is-valid");

    // Actualizar la lista de usuarios en la consola
    mostrarUsuariosRegistrados();
});

// Función para mostrar el toast de er
function mostrarAlerta() {
    toastError.show();
}

// Función para mostrar el toast de éxito
function mostrarAlertaExito() {
    toastSuccess.show();
}


// Función para mostrar usuarios registrados en la consola
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

// Mostrar los usuarios registrados en la consola
mostrarUsuariosRegistrados();
