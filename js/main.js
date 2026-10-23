/* ==========================================
   TEAM SEKIRO - MAIN JAVASCRIPT
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Team Sekiro System Initialized successfully.");

    // Ejemplo de interactividad para los enlaces del menú (Cerrar navbar en móviles al hacer click)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    
    if(menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    bsCollapse.hide();
                }
            });
        });
    }
});