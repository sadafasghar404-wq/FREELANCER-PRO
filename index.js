// ===== Navbar Functionality =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Counter Animation for Stats =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value[data-count]');
    const observedCounters = new Set();
    
    const updateCounter = (counter) => {
        if (observedCounters.has(counter)) return;
        observedCounters.add(counter);

        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 50);
        let current = 0;

        const interval = setInterval(() => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
            } else {
                counter.textContent = target.toLocaleString();
                clearInterval(interval);
            }
        }, 50);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter(entry.target);
            }
        });
    }, { threshold: 0.1 });

    counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// ===== Card Fade In Animation =====
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .testimonial, .pricing-card, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    cardObserver.observe(card);
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    
    header.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = item.hasAttribute('open');
        
        // Close all other items
        document.querySelectorAll('.faq-item[open]').forEach(openItem => {
            if (openItem !== item) {
                openItem.removeAttribute('open');
                openItem.querySelector('.faq-content').style.maxHeight = '0';
            }
        });
        
        // Toggle current item
        if (