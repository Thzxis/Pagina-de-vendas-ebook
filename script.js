// Animação de scroll
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

// FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fechar todos os FAQ
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir item clicado se nao tiver ativo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Cronometro
function updateCountdown() {
    // começar tempo (2 dias apartir da data visitada)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(23, 59, 59, 999);
    
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // tempo expirado
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// atualizar o relogio a cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // chamada inicial

// efeito do scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--background-white)';
        header.style.backdropFilter = 'none';
    }
});

// Observador de interseção das animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observador de elementos das animações
document.querySelectorAll('.problema-item, .modulo, .bonus-item, .depoimento').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Botão de compra
document.querySelector('.btn-comprar').addEventListener('click', () => {
    // Aqui você se integraria ao seu processador de pagamento
    // Para fins de demonstração, vou deixar so um alerta
    alert('Redirecionando para o pagamento seguro...\n\nEm uma implementação real, aqui seria integrado com processadores de pagamento como Stripe, PayPal, PagSeguro, etc.');
    
    // Exemplo do que você pode fazer:
    // window.location.href = 'https://checkout.stripe.com/seu-link-de-pagamento';
    // ou
    // window.open('https://pagseguro.uol.com.br/checkout/seu-codigo-de-checkout', '_blank');
});

// Alternar menu móvel (se você quiser adicionar o menu móvel mais tarde)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Adicionar rastreamento de cliques para análise (exemplo)
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', (e) => {
        const elementText = e.target.textContent.trim();
        const elementClass = e.target.className;
        
        // Aqui você enviaria dados para seu serviço de análise
        console.log('Click tracked:', {
            text: elementText,
            class: elementClass,
            timestamp: new Date().toISOString()
        });
        
        // Exemplo com o Google Analytics (se implementado):
    // gtag('event', 'click', {
    // event_category: 'engagement',
    // event_label: elementText
    // });
    });
});

// Validação de formulário (se você adicionar formulários de captura de e-mail)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Carregamento lento para imagens (navegadores modernos oferecem suporte nativo a isso com loading="lazy")
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Otimização de desempenho: eventos de rolagem Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce ao manipulador de rolagem
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--background-white)';
        header.style.backdropFilter = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
