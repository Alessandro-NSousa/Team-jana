// #TeamJana Landing Page - JavaScript Functionality

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Intersection Observer for Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-animate class
document.querySelectorAll('.scroll-animate, .reveal').forEach(el => {
    observer.observe(el);
});

// ============================================
// Counter Animation for Statistics
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// ============================================
// Back to Top Button
// ============================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
        backToTopButton.style.opacity = '1';
        backToTopButton.style.pointerEvents = 'all';
    } else {
        backToTopButton.classList.remove('show');
        backToTopButton.style.opacity = '0';
        backToTopButton.style.pointerEvents = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Get form data
    const formData = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        empresa: document.getElementById('empresa').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        // Simulate API call (replace with your actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success message
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Redirect to WhatsApp
        const whatsappMessage = `Olá! Meu nome é ${formData.nome}. ${formData.mensagem}`;
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
        
        setTimeout(() => {
            if (confirm('Deseja continuar a conversa pelo WhatsApp?')) {
                window.open(whatsappUrl, '_blank');
            }
        }, 1000);
        
    } catch (error) {
        showNotification('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.innerHTML = originalText;
    }
});

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-2xl transform transition-all duration-500 translate-x-full ${
        type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
    }`;
    notification.style.maxWidth = '400px';
    
    notification.innerHTML = `
        <div class="flex items-start gap-3">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} text-2xl"></i>
            <div class="flex-1">
                <p class="font-semibold">${type === 'success' ? 'Sucesso!' : 'Erro'}</p>
                <p class="text-sm">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// ============================================
// Phone Number Formatting
// ============================================
const phoneInput = document.getElementById('telefone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    
    if (value.length > 0) {
        if (value.length <= 2) {
            value = `(${value}`;
        } else if (value.length <= 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        }
    }
    
    e.target.value = value;
});

// ============================================
// Lazy Loading Images
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Prevent Form Spam
// ============================================
let lastSubmitTime = 0;
const SUBMIT_COOLDOWN = 5000; // 5 seconds

contactForm.addEventListener('submit', (e) => {
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
        e.preventDefault();
        showNotification('Por favor, aguarde alguns segundos antes de enviar novamente.', 'error');
        return false;
    }
    lastSubmitTime = now;
}, true);

// ============================================
// Track WhatsApp Click Events
// ============================================
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        // Track event (integrate with your analytics)
        console.log('WhatsApp clicked:', link.href);
        
        // Optional: Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'engagement',
                'event_label': 'WhatsApp Contact'
            });
        }
    });
});

// ============================================
// Email Validation
// ============================================
const emailInput = document.getElementById('email');

emailInput.addEventListener('blur', () => {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        emailInput.style.borderColor = '#ef4444';
        showNotification('Por favor, insira um e-mail válido.', 'error');
    } else {
        emailInput.style.borderColor = '';
    }
});

// ============================================
// Parallax Effect (Optional - Performance Conscious)
// ============================================
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ============================================
// Prevent Right Click on Images (Optional)
// ============================================
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ============================================
// Page Load Performance
// ============================================
window.addEventListener('load', () => {
    // Remove loading class if you have one
    document.body.classList.remove('loading');
    
    // Log load time
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    // Track performance (optional)
    if (loadTime > 3000) {
        console.warn('Page load time exceeded 3 seconds');
    }
});

// ============================================
// Service Worker Registration (Optional - for PWA)
// ============================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}
*/

// ============================================
// Accessibility: Skip to Content
// ============================================
const skipLink = document.createElement('a');
skipLink.href = '#hero';
skipLink.textContent = 'Pular para o conteúdo';
skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-magenta focus:text-white focus:px-4 focus:py-2 focus:rounded';
document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// Console Easter Egg
// ============================================
console.log('%c👋 Olá, desenvolvedor curioso!', 'font-size: 20px; color: #ec4899; font-weight: bold;');
console.log('%c🚀 Interessado em trabalhar conosco?', 'font-size: 14px; color: #d946ef;');
console.log('%cEntre em contato: contato@teamjana.com', 'font-size: 12px; color: #a855f7;');

// ============================================
// Initialize all animations on page load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing page initialized successfully');
    
    // Trigger initial animations
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        heroSection.classList.add('active');
    }
});

// ============================================
// Export for testing (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateCounter,
        showNotification
    };
}
