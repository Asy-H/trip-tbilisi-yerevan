// ===== PARTICLE ANIMATION =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.transform = `scale(${Math.random() * 1.5 + 0.5})`;
        container.appendChild(particle);
    }
}

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbar() {
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== MOBILE MENU =====
function handleMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    toggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        toggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// ===== ACTIVE NAV LINK =====
function handleActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function handleScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe transport cards
    document.querySelectorAll('.transport-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe budget cards
    document.querySelectorAll('.budget-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Observe day headers
    document.querySelectorAll('.day-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'all 0.6s ease';
        observer.observe(header);
    });
}

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateX(0) translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ===== TIMELINE PROGRESS =====
function handleTimelineProgress() {
    const timelines = document.querySelectorAll('.timeline');
    
    window.addEventListener('scroll', () => {
        timelines.forEach(timeline => {
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (rect.height + windowHeight)));
                timeline.style.setProperty('--progress', progress);
            }
        });
    });
}

// ===== HOVER EFFECTS FOR CARDS =====
function handleCardHoverEffects() {
    document.querySelectorAll('.transport-card, .budget-card, .essentials-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ===== COUNTDOWN TO TRIP =====
function updateCountdown() {
    const tripDate = new Date('2026-02-17T11:20:00');
    const now = new Date();
    const diff = tripDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        // Find or create countdown element
        let countdown = document.querySelector('.countdown-display');
        if (!countdown) {
            const heroStats = document.querySelector('.hero-stats');
            if (heroStats) {
                countdown = document.createElement('div');
                countdown.className = 'stat countdown-display';
                countdown.innerHTML = `
                    <span class="stat-number countdown-number">${days}</span>
                    <span class="stat-label">Days to Go</span>
                `;
                heroStats.appendChild(countdown);
            }
        } else {
            countdown.querySelector('.countdown-number').textContent = days;
        }
    }
}

// ===== TYPING EFFECT FOR HERO =====
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

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    handleNavbar();
    handleMobileMenu();
    handleActiveNavLink();
    handleScrollAnimations();
    handleSmoothScroll();
    handleTimelineProgress();
    handleCardHoverEffects();
    updateCountdown();
    
    // Update countdown every minute
    setInterval(updateCountdown, 60000);
    
    console.log('🌍 Georgia & Armenia Trip Planner loaded!');
});
