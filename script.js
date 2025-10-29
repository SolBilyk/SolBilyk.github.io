// ===== VARIABLES GLOBALES =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// ===== NAVEGACIÓN MÓVIL =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 46, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(157, 78, 221, 0.1)';
    } else {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// ===== SMOOTH SCROLLING PARA NAVEGACIÓN =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMACIONES AL HACER SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animación especial para las barras de habilidades
            if (entry.target.classList.contains('skill-item')) {
                const skillLevel = entry.target.querySelector('.skill-level');
                if (skillLevel) {
                    setTimeout(() => {
                        skillLevel.style.opacity = '1';
                    }, 300);
                }
            }
            
            // Animación para los elementos de la timeline
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.style.opacity = '1';
                if (entry.target.querySelector('.timeline-content')) {
                    entry.target.querySelector('.timeline-content').style.transform = 'translateX(0)';
                }
            }
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
    // Elementos generales para animar
    const elementsToAnimate = document.querySelectorAll(`
        .about-content,
        .skill-item,
        .timeline-item,
        .project-card,
        .contact-content,
        .cert-item
    `);
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
    
    // Animación especial para elementos de timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        if (content) {
            if (index % 2 === 0) {
                content.style.transform = 'translateX(-50px)';
            } else {
                content.style.transform = 'translateX(50px)';
            }
            content.style.transition = 'all 0.8s ease';
        }
    });
});

// ===== EFECTO TYPING PARA EL HERO =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Aplicar efecto typing al cargar la página
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    const heroSubtitle = document.querySelector('.hero-text h2');
    
    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        setTimeout(() => {
            typeWriter(heroTitle, titleText, 80);
        }, 500);
        
        setTimeout(() => {
            typeWriter(heroSubtitle, subtitleText, 60);
        }, 2000);
    }
});

// ===== PARTÍCULAS FLOTANTES EN EL BACKGROUND =====
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(157, 78, 221, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 20 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// CSS para animación de partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Crear partículas al cargar la página
window.addEventListener('load', createFloatingParticles);

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    const statusEl = document.getElementById('form-status');
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        // Honeypot: si está completo, abortar silenciosamente
        const hpField = document.getElementById('hp-field');
        if (hpField && hpField.value && hpField.value.trim() !== '') {
            // Opcional: log interno para depurar
            console.warn('Honeypot activado, envío bloqueado.');
            return;
        }
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Validación básica
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, completa todos los campos.', 'error');
            if (statusEl) statusEl.textContent = 'Por favor, completa todos los campos.';
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            if (statusEl) statusEl.textContent = 'Por favor, ingresa un email válido.';
            return;
        }

        // Añadir metadatos para mejorar la entrega en Formspree
        formData.set('_subject', `Nuevo mensaje de ${name}: ${subject}`);
        formData.set('_replyto', email);

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
        }
        if (statusEl) statusEl.textContent = 'Enviando...';

        try {
            const res = await fetch(this.action, {
                method: this.method || 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                showNotification('¡Mensaje enviado correctamente! Te responderé pronto.', 'success');
                if (statusEl) statusEl.textContent = '¡Mensaje enviado! Gracias por contactarme.';
                this.reset();
                // Redirección con JS a la sección de contacto
                setTimeout(() => {
                    // Mantener al usuario en la misma página anclado a #contacto
                    window.location.hash = 'contacto';
                }, 600);
            } else {
                const data = await res.json().catch(() => null);
                const errDetail = data && data.errors ? data.errors.map(e => e.message).join(', ') : await res.text().catch(() => '');
                const err = `Error ${res.status}: ${errDetail || 'Hubo un error al enviar. Intenta nuevamente.'}`;
                console.error('Formspree error:', { status: res.status, data });
                showNotification(err, 'error');
                if (statusEl) statusEl.textContent = err;
            }
        } catch (error) {
            showNotification('No se pudo enviar. Revisa tu conexión e intenta otra vez.', 'error');
            if (statusEl) statusEl.textContent = 'No se pudo enviar. Revisa tu conexión e intenta otra vez.';
            console.error('Fetch error:', error);
        } finally {
            if (submitBtn) {
                submitBtn.textContent = originalText || 'Enviar Mensaje';
                submitBtn.disabled = false;
            }
        }
    });
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    // Colores según el tipo
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== CURSOR PERSONALIZADO =====
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #9d4edd, #f72585);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Efecto hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'linear-gradient(135deg, #ffd60a, #f72585)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'linear-gradient(135deg, #9d4edd, #f72585)';
        });
    });
}

// Activar cursor personalizado solo en desktop
if (window.innerWidth > 768) {
    createCustomCursor();
}

// ===== CONTADOR ANIMADO PARA ESTADÍSTICAS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar animación cuando el elemento sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Inicializar contadores
document.addEventListener('DOMContentLoaded', animateCounters);

// ===== TEMA OSCURO/CLARO (OPCIONAL) =====
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #9d4edd, #f72585);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(157, 78, 221, 0.3);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Crear toggle de tema
createThemeToggle();

// ===== PRELOADER =====
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: all 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 60px;
                height: 60px;
                border: 3px solid rgba(157, 78, 221, 0.3);
                border-top: 3px solid #9d4edd;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <h3 style="
                background: linear-gradient(135deg, #9d4edd 0%, #f72585 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-family: 'Poppins', sans-serif;
            ">Cargando Portfolio...</h3>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // CSS para animación de spin
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    // Remover preloader cuando la página esté cargada
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 1000);
    });
}

// Crear preloader
createPreloader();

// ===== SCROLL TO TOP BUTTON =====
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #9d4edd, #f72585);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(100px);
        box-shadow: 0 5px 15px rgba(157, 78, 221, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top al hacer click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Crear botón scroll to top
createScrollToTop();

console.log('🚀 Portfolio cargado correctamente!');
console.log('💜 Diseñado con amor para destacar tus habilidades frontend');
