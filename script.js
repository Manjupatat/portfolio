// ==========================================
// SCRIPT.JS - Portfolio JavaScript
// ==========================================

// ==========================================
// REMOVE NO-JS CLASS WHEN JAVASCRIPT LOADS
// ==========================================
document.documentElement.classList.remove('no-js');

// ==========================================
// IMMEDIATE VISIBILITY CHECK ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Force immediate visibility of elements in viewport
    const checkVisibility = () => {
        document.querySelectorAll('.fade-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInViewport = (
                rect.top < window.innerHeight - 50 &&
                rect.bottom > 0
            );
            
            if (isInViewport) {
                el.classList.add('visible');
            }
        });
    };
    
    // Check immediately
    checkVisibility();
    
    // Check after a short delay to ensure page is fully rendered
    setTimeout(checkVisibility, 100);
});

// ==========================================
// CURSOR GLOW EFFECT
// ==========================================
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================
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

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    scrollObserver.observe(el);
});

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    statsAnimated = true;
    
    const statsNumbers = document.querySelectorAll('.stats-number');
    statsNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
};

// Trigger stats animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.hero-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==========================================
// PARALLAX EFFECT ON SCROLL
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.bg-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// PROJECT CARD 3D TILT EFFECT
// ==========================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ==========================================
// SKILL CARD HOVER EFFECT
// ==========================================
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.4s ease';
    });
});

// ==========================================
// TYPING EFFECT FOR HERO SUBTITLE
// ==========================================
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    let index = 0;
    
    setTimeout(() => {
        const typeWriter = () => {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 20);
            }
        };
        typeWriter();
    }, 1000);
}

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==========================================
// TECH BADGES REVEAL ANIMATION
// ==========================================
setTimeout(() => {
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.3s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, index * 50);
    });
}, 500);

// ==========================================
// SOCIAL CARD PULSE EFFECT
// ==========================================
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease';
    });
    
    card.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// ==========================================
// MOBILE MENU CLOSE ON LINK CLICK
// ==========================================
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Double-check visibility of all sections
    document.querySelectorAll('.fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        }
    });
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c👋 Welcome to my Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS (Bootstrap), and Vanilla JavaScript', 'color: #764ba2; font-size: 14px;');



// ==========================================
// CONTACT FORM HANDLING
// ==========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            description: document.getElementById('description').value
        };
        
        // Validate required fields
        if (!formData.name || !formData.email || !formData.description) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with your actual API call)
        setTimeout(() => {
            // Success simulation
            showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Log form data (in production, send to your backend)
            console.log('Form submitted:', formData);
            
            /* 
            // Example: Send to backend API
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            })
            .catch(error => {
                showFormMessage('Oops! Something went wrong. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
            */
            
        }, 1500);
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ==========================================
// FORM INPUT ANIMATIONS
// ==========================================
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ==========================================
// TIMELINE ANIMATION ON SCROLL
// ==========================================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// ==========================================
// CERTIFICATION CARDS STAGGER ANIMATION
// ==========================================
const certObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.cert-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    certObserver.observe(card);
});