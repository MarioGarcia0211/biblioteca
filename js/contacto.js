const campoNombre = document.getElementById("nombre");
const campoApellido = document.getElementById("apellido");
const campoEmail = document.getElementById("email");
const campoMensaje = document.getElementById("mensaje");
const botonEnviar = document.getElementById("botonEnviar");
const formMensaje = document.getElementById("formMensaje");
const toastError = new bootstrap.Toast(document.querySelector('.toastError'));
const toastSuccess = new bootstrap.Toast(document.querySelector('.toastSuccess'));

const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const patronSinNumeros = /^[a-zA-Z\s]+$/;

function validarCampo(campo, mensajeError, criterio) {
    const valor = campo.value.trim();
    if (!criterio(valor)) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        mensajeError && (campo.nextElementSibling.textContent = mensajeError);
        return false; // Retorna false si no cumple con el criterio
    } else {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
        return true; // Retorna true si cumple con el criterio
    }
}

function validarNombre() {
    const valor = campoNombre.value.trim();
    if (valor === "") {
        return validarCampo(campoNombre, "El nombre es obligatorio.", () => false);
    } else if (!patronSinNumeros.test(valor)) {
        return validarCampo(campoNombre, "El nombre no puede contener números ni signos.", () => false);
    } else {
        return validarCampo(campoNombre, "", () => true);
    }
}

function validarApellido() {
    const valor = campoApellido.value.trim();
    if (valor === "") {
        return validarCampo(campoApellido, "El apellido es obligatorio.", () => false);
    } else if (!patronSinNumeros.test(valor)) {
        return validarCampo(campoApellido, "El apellido no puede contener números ni signos.", () => false);
    } else {
        return validarCampo(campoApellido, "", () => true);
    }
}

function validarEmail() {
    const valor = campoEmail.value.trim();
    if (valor === "") {
        return validarCampo(campoEmail, "El correo es obligatorio.", () => false);
    } else if (!patronEmail.test(valor)) {
        return validarCampo(campoEmail, "Ingrese un correo válido.", () => false);
    } else {
        return validarCampo(campoEmail, "", () => true);
    }
}

function validarMensaje() {
    const valor = campoMensaje.value.trim();
    if (valor === "") {
        return validarCampo(campoMensaje, "El mensaje es obligatorio.", () => false);
    } else {
        return validarCampo(campoMensaje, "", () => true);
    }
}

// Validar campos al perder el foco o al cambiar
campoNombre.addEventListener("blur", validarNombre);
campoApellido.addEventListener("blur", validarApellido);
campoEmail.addEventListener("blur", validarEmail);
campoMensaje.addEventListener("blur", validarMensaje);

campoNombre.addEventListener("input", validarNombre);
campoApellido.addEventListener("input", validarApellido);
campoEmail.addEventListener("input", validarEmail);
campoMensaje.addEventListener("input", validarMensaje);

// Evento de envío del formulario
formMensaje.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el envío por defecto

    const nombreValido = validarNombre();
    const apellidoValido = validarApellido();
    const emailValido = validarEmail();
    const mensajeValido = validarMensaje();

    // Verificar si todos los campos son válidos
    if (nombreValido && apellidoValido && emailValido && mensajeValido) {
        // Mostrar el toast de éxito
        toastSuccess.show();
        formMensaje.reset(); // Limpiar el formulario después de enviar
        document.querySelectorAll('.is-valid').forEach(input => input.classList.remove('is-valid')); // Quitar la clase 'is-valid'
    } else {
        // Mostrar el toast de error
        toastError.show();
    }
});
