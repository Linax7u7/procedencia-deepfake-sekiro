/* ==========================================
   TEAM SEKIRO - MAIN JAVASCRIPT (v2)
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Team Sekiro System Initialized successfully.");

    /* -------- 1) Cerrar navbar en móvil al hacer click -------- */
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    if (menuToggle && window.bootstrap) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) bsCollapse.hide();
            });
        });
    }

    /* -------- 2) Scrollspy (solo enlaces internos '#') -------- */
    const sections = document.querySelectorAll('section[id], header[id], article[id]');
    const navMap = {};
    document.querySelectorAll('.navbar-nav .nav-link').forEach(l => {
        const href = l.getAttribute('href');
        if (href && href.startsWith('#')) navMap[href.slice(1)] = l;
    });

    const setActive = (id) => {
        Object.values(navMap).forEach(l => l.classList.remove('active'));
        if (navMap[id]) navMap[id].classList.add('active');
    };

    const spy = () => {
        if (!sections.length || !Object.keys(navMap).length) return;
        const pos = window.scrollY + 140;
        let current = '';
        sections.forEach(s => { if (s.offsetTop <= pos) current = s.id; });
        setActive(current);
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();

    /* -------- 3) Animación de aparición al scroll -------- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('is-visible'));
    }

    /* -------- 4) Stagger de tarjetas por fila -------- */
    document.querySelectorAll('.row').forEach(row => {
        const children = row.querySelectorAll(':scope > .reveal');
        children.forEach((el, i) => { el.style.transitionDelay = (i * 0.08) + 's'; });
    });

    /* -------- 5) Botón "volver arriba" -------- */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 500);
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});