
// Menu Hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header fixo com efeito ao scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.padding = '1rem 0';
    }
});

// Carrossel de Imagens
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

let currentIndex = 0;
const totalSlides = slides.length;

// Criar indicadores
for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play do carrossel
let autoplayInterval = setInterval(nextSlide, 4000);

// Pausar autoplay ao passar o mouse
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 4000);
});

// Validação do Formulário
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validar Nome
    const nome = document.getElementById('nome');
    const nomeError = document.getElementById('nomeError');
    if (nome.value.trim().length < 3) {
        nomeError.textContent = 'Nome deve ter no mínimo 3 caracteres';
        nomeError.style.display = 'block';
        isValid = false;
    } else {
        nomeError.style.display = 'none';
    }
    
    // Validar Email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Digite um e-mail válido';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Validar Telefone
    const telefone = document.getElementById('telefone');
    const telefoneError = document.getElementById('telefoneError');
    const telefoneRegex = /^[\d\s\-\(\)]+$/;
    if (!telefoneRegex.test(telefone.value) || telefone.value.length < 10) {
        telefoneError.textContent = 'Digite um telefone válido';
        telefoneError.style.display = 'block';
        isValid = false;
    } else {
        telefoneError.style.display = 'none';
    }
    
    // Validar Mensagem
    const mensagem = document.getElementById('mensagem');
    const mensagemError = document.getElementById('mensagemError');
    if (mensagem.value.trim().length < 10) {
        mensagemError.textContent = 'Mensagem deve ter no mínimo 10 caracteres';
        mensagemError.style.display = 'block';
        isValid = false;
    } else {
        mensagemError.style.display = 'none';
    }
    
    if (isValid) {

        // Aqui envia os dados para o servidor
        successMessage.classList.add('show');
        contactForm.reset();
        
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }
});

// Máscara de telefone
document.getElementById('telefone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    e.target.value = value;
});

// Botão Voltar ao Topo
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Criar Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.service-card, .about-content, .contact-content, .gallery, .section-title, .section-subtitle, .carousel-slide').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
