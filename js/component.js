async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const content = await response.text();
            document.getElementById(id).innerHTML = content;
            setActiveLink();  // Llama a esta función después de cargar el navbar
        } else {
            console.error("Error loading", file);
        }
    } catch (error) {
        console.error("Error fetching component:", error);
    }
}

function setActiveLink() {
    const path = window.location.pathname;
    if (path.includes("inicio.html")) {
        document.getElementById("homeLink").classList.add("active");
    } else if (path.includes("nosotros.html")) {
        document.getElementById("aboutLink").classList.add("active");
    } else if (path.includes("catalogo.html")) {
        document.getElementById("catalogLink").classList.add("active");
    } else if (path.includes("contacto.html")) {
        document.getElementById("contactLink").classList.add("active");
    }
}

loadComponent("navbar", "/components/navbar.html");
// loadComponent("footer", "/componentes/footer.html");