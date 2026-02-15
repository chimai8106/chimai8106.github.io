// ===================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===================================

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

// ===================================
// PARALLAX EFFECT ON SCROLL
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.blob');
    
    blobs.forEach((blob, index) => {
        const speed = 0.5 + (index * 0.2);
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// TYPING EFFECT FOR HERO TEXT
// ===================================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on page load
// window.addEventListener('load', () => {
//     const heroHeading = document.querySelector('.hero-text h2');
//     const originalText = heroHeading.textContent;
//     setTimeout(() => {
//         typeWriter(heroHeading, originalText, 30);
//     }, 2000);
// });

// ===================================
// ANIMATED COUNTERS FOR STATS
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            // For GPA, show decimals
            if (target === 4.02) {
                element.textContent = current.toFixed(2);
            } else if (target === 81) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }
    }, 16);
}

// Intersection Observer for counter animation
const statCards = document.querySelectorAll('.stat-card');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const numberElement = entry.target.querySelector('.stat-number');
            const text = numberElement.textContent;
            
            if (text === '4.02') {
                animateCounter(numberElement, 4.02);
            } else if (text === '81%') {
                animateCounter(numberElement, 81);
            } else if (text === '2nd') {
                // Don't animate text values, just add the class
                numberElement.style.opacity = '0';
                setTimeout(() => {
                    numberElement.style.transition = 'opacity 0.5s ease';
                    numberElement.style.opacity = '1';
                }, 100);
            }
            
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => counterObserver.observe(card));

// ===================================
// INTERSECTION OBSERVER FOR FADE-IN
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards for staggered animation
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    fadeInObserver.observe(card);
});

// ===================================
// SKILL ITEMS RANDOM COLOR ON HOVER
// ===================================

const skillItems = document.querySelectorAll('.skill-item');
const colors = ['var(--coral)', 'var(--purple)', 'var(--blue)', 'var(--orange)', 'var(--green)'];

skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.backgroundColor = randomColor;
        this.style.color = 'white';
    });
    
    item.addEventListener('mouseleave', function() {
        // CSS handles the reset
    });
});

// ===================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ===================================

let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Create cursor trail dot
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.left = e.pageX + 'px';
    dot.style.top = e.pageY + 'px';
    document.body.appendChild(dot);
    
    cursorTrail.push(dot);
    
    // Remove old dots
    if (cursorTrail.length > maxTrailLength) {
        const oldDot = cursorTrail.shift();
        oldDot.remove();
    }
    
    // Fade out and remove
    setTimeout(() => {
        dot.style.opacity = '0';
        setTimeout(() => dot.remove(), 500);
    }, 100);
});

// Add cursor trail styles dynamically
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--coral);
        pointer-events: none;
        z-index: 9998;
        transition: opacity 0.5s ease;
        opacity: 0.6;
    }
`;
document.head.appendChild(style);

// ===================================
// PROJECT CARD TILT EFFECT
// ===================================

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
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(245, 239, 230, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ===================================
// DYNAMIC GRADIENT BACKGROUND
// ===================================

function updateGradientPosition() {
    const mouseX = event.clientX / window.innerWidth;
    const mouseY = event.clientY / window.innerHeight;
    
    document.querySelectorAll('.blob').forEach((blob, index) => {
        const speed = (index + 1) * 0.02;
        const x = mouseX * 50 * speed;
        const y = mouseY * 50 * speed;
        
        blob.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Uncomment to enable mouse-following blobs
// document.addEventListener('mousemove', updateGradientPosition);

// ===================================
// EASTER EGG: KONAMI CODE
// ===================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        activatePartyMode();
    }
});

function activatePartyMode() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
        rainbowStyle.remove();
    }, 10000);
    
    // Show fun message
    const message = document.createElement('div');
    message.textContent = '🎉 PARTY MODE ACTIVATED! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--coral);
        color: white;
        padding: 2rem 4rem;
        border-radius: 20px;
        font-family: 'Archivo Black', sans-serif;
        font-size: 2rem;
        z-index: 10000;
        border: 4px solid var(--text-dark);
        box-shadow: 10px 10px 0 var(--beige-dark);
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transition = 'opacity 0.5s ease';
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}
