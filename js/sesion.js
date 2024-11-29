document.addEventListener("DOMContentLoaded", function () {
    const sesionActiva = localStorage.getItem("sesionActiva");
    if (sesionActiva !== "true") {
        // Si no hay sesión activa, redirigir al inicio de sesión
        window.location.href = "../index.html";
    }
});

function cerrarSesion() {
    localStorage.removeItem("sesionActiva"); // Elimina el indicador de sesión activa
    window.location.href = "../index.html"; // Redirige a la página de inicio de sesión
}