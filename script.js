const WHATSAPP_NUMBER = '559187630955';
const SUBMIT_COOLDOWN = 5000;

const backToTopButton = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const phoneInput = document.getElementById('telefone');
const emailInput = document.getElementById('email');

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');

        if (!href || href === '#') {
            event.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
            return;
        }

        element.textContent = target;
    };

    updateCounter();
}

const revealTargets = document.querySelectorAll('.scroll-animate, .reveal');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach((element) => revealObserver.observe(element));

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || entry.target.classList.contains('counted')) {
                return;
            }

            const target = Number(entry.target.getAttribute('data-target'));
            if (Number.isFinite(target)) {
                animateCounter(entry.target, target);
            }
            entry.target.classList.add('counted');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach((counter) => counterObserver.observe(counter));
} else {
    revealTargets.forEach((element) => element.classList.add('active'));
    document.querySelectorAll('.counter').forEach((counter) => {
        const target = Number(counter.getAttribute('data-target'));
        if (Number.isFinite(target)) {
            counter.textContent = target;
        }
    });
}

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        const isVisible = window.scrollY > 300;
        backToTopButton.classList.toggle('show', isVisible);
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function buildWhatsAppUrl(formData) {
    const lines = [
        'Olá! Acabei de preencher o formulário e quero entender qual atendimento faz mais sentido para mim.',
        '',
        `Nome: ${formData.nome}`,
        `WhatsApp: ${formData.telefone}`,
        formData.email ? `E-mail: ${formData.email}` : '',
        formData.interesse ? `Interesse: ${formData.interesse}` : '',
        formData.mensagem ? `Objetivo: ${formData.mensagem}` : ''
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function showNotification(message, type = 'success', action) {
    document.querySelectorAll('[data-notification-toast="true"]').forEach((toast) => toast.remove());

    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const notification = document.createElement('div');
    notification.dataset.notificationToast = 'true';
    notification.style.position = 'fixed';
    notification.style.zIndex = '60';
    notification.style.maxWidth = isMobile ? 'calc(100vw - 2rem)' : '380px';
    notification.style.padding = '1rem';
    notification.style.borderRadius = '1.25rem';
    notification.style.boxShadow = '0 24px 60px rgba(24, 21, 17, 0.22)';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(12px)';
    notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    notification.style.background = type === 'success' ? '#1f6b4f' : '#9f2b1f';
    notification.style.color = '#f5ede0';

    if (isMobile) {
        notification.style.left = '1rem';
        notification.style.right = '1rem';
        notification.style.bottom = '6rem';
    } else {
        notification.style.top = '1rem';
        notification.style.right = '1rem';
    }

    notification.innerHTML = `
        <div style="display:flex;gap:0.9rem;align-items:flex-start;">
            <div style="font-size:1.35rem;line-height:1;">
                <i class="fas fa-${type === 'success' ? 'circle-check' : 'triangle-exclamation'}"></i>
            </div>
            <div style="flex:1;min-width:0;">
                <p style="margin:0;font-weight:800;">${type === 'success' ? 'Recebido' : 'Atenção'}</p>
                <p style="margin:0.4rem 0 0;line-height:1.5;">${message}</p>
                ${action ? `<a href="${action.href}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;margin-top:0.85rem;align-items:center;gap:0.5rem;border-radius:999px;padding:0.65rem 1rem;background:#f5ede0;color:#181511;font-weight:800;text-decoration:none;">${action.label} <i class="fas fa-arrow-up-right-from-square" style="font-size:0.8rem;"></i></a>` : ''}
            </div>
            <button type="button" aria-label="Fechar notificação" style="border:0;background:transparent;color:inherit;padding:0;cursor:pointer;font-size:1rem;line-height:1;">
                <i class="fas fa-xmark"></i>
            </button>
        </div>
    `;

    const closeButton = notification.querySelector('button');
    closeButton.addEventListener('click', () => notification.remove());

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(12px)';
        setTimeout(() => notification.remove(), 300);
    }, 5200);
}

if (phoneInput) {
    phoneInput.addEventListener('input', (event) => {
        let value = event.target.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length > 0) {
            if (value.length <= 2) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 10) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            } else {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            }
        }

        event.target.value = value;
    });
}

if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            emailInput.style.borderColor = '#9f2b1f';
            showNotification('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        emailInput.style.borderColor = '';
    });
}

let lastSubmitTime = 0;
if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const now = Date.now();
        if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
            showNotification('Aguarde alguns segundos antes de enviar novamente.', 'error');
            return;
        }

        lastSubmitTime = now;

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton ? submitButton.innerHTML : '';
        const formData = {
            nome: document.getElementById('nome')?.value.trim() || '',
            telefone: document.getElementById('telefone')?.value.trim() || '',
            email: document.getElementById('email')?.value.trim() || '',
            interesse: document.getElementById('empresa')?.value.trim() || '',
            mensagem: document.getElementById('mensagem')?.value.trim() || ''
        };

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        }

        try {
            await new Promise((resolve) => setTimeout(resolve, 900));
            contactForm.reset();
            showNotification(
                'Seus dados foram recebidos. Se quiser acelerar a conversa, continue no WhatsApp.',
                'success',
                { label: 'Continuar no WhatsApp', href: buildWhatsAppUrl(formData) }
            );
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Erro ao enviar. Tente novamente em instantes.', 'error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.innerHTML = originalText;
            }
        }
    });
}

document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                event_category: 'engagement',
                event_label: 'WhatsApp Contact'
            });
        }
    });
});

const skipLink = document.createElement('a');
skipLink.href = '#hero';
skipLink.textContent = 'Pular para o conteúdo';
skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-coral focus:px-4 focus:py-2 focus:text-charcoal';
document.body.insertBefore(skipLink, document.body.firstChild);

window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateCounter,
        showNotification
    };
}
