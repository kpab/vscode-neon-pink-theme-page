// ================================
// Language Switching
// ================================

class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang);

        // Add event listeners to language buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.setLanguage(lang);
            });
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);

        // Update all elements with data-en and data-ja attributes
        const elements = document.querySelectorAll('[data-en][data-ja]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });

        // Update active button state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
}

// ================================
// Scroll Animations
// ================================

class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Create Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observe all feature cards and sections
        const elements = document.querySelectorAll('.feature-card, .color-item, .method-card');
        elements.forEach(el => this.observer.observe(el));
    }
}

// ================================
// Copy to Clipboard
// ================================

class ClipboardManager {
    constructor() {
        this.init();
    }

    init() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const code = e.target.closest('.code-block').querySelector('code').textContent;
                this.copyToClipboard(code, btn);
            });
        });
    }

    async copyToClipboard(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            this.showCopyFeedback(button);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    showCopyFeedback(button) {
        const originalText = button.querySelector('span').textContent;
        const lang = localStorage.getItem('language') || 'en';
        const copiedText = lang === 'ja' ? 'コピーしました！' : 'Copied!';

        button.querySelector('span').textContent = copiedText;
        button.style.background = '#00ff00';
        button.style.color = '#000000';

        setTimeout(() => {
            button.querySelector('span').textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }
}

// ================================
// Smooth Scrolling
// ================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ================================
// Neon Grid Animation
// ================================

class NeonGridAnimation {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.init();
    }

    init() {
        // Create canvas for background particles
        this.createCanvas();
        this.createParticles();
        this.animate();
    }

    createCanvas() {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;

        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';

        heroBackground.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * (this.canvas?.width || window.innerWidth),
                y: Math.random() * (this.canvas?.height || window.innerHeight),
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        if (!this.ctx || !this.canvas) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.fillStyle = `rgba(255, 45, 190, ${Math.random() * 0.5 + 0.2})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.strokeStyle = `rgba(255, 45, 190, ${(1 - distance / 150) * 0.2})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ================================
// Parallax Effect
// ================================

class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-background');

            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// ================================
// Performance Optimization
// ================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();

        // Preload critical resources
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload hero image
        const heroImage = document.querySelector('.theme-icon');
        if (heroImage && heroImage.src) {
            const img = new Image();
            img.src = heroImage.src;
        }
    }
}

// ================================
// Analytics & Tracking
// ================================

class Analytics {
    constructor() {
        this.init();
    }

    init() {
        // Track button clicks
        this.trackButtons();

        // Track scroll depth
        this.trackScrollDepth();
    }

    trackButtons() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const label = btn.textContent.trim();
                console.log('Button clicked:', label);
                // Add your analytics tracking code here (e.g., Google Analytics)
            });
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > maxScroll) {
                maxScroll = Math.floor(scrollPercent / 25) * 25; // Track in 25% increments
                console.log('Scroll depth:', maxScroll + '%');
                // Add your analytics tracking code here
            }
        });
    }
}

// ================================
// Easter Egg - Konami Code
// ================================

class KonamiCode {
    constructor() {
        this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.position = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.sequence[this.position]) {
                this.position++;
                if (this.position === this.sequence.length) {
                    this.activate();
                    this.position = 0;
                }
            } else {
                this.position = 0;
            }
        });
    }

    activate() {
        // Easter egg: Ultra neon mode
        document.body.style.filter = 'saturate(2) brightness(1.2)';
        document.body.style.animation = 'rainbow 2s infinite';

        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg) saturate(2) brightness(1.2); }
                100% { filter: hue-rotate(360deg) saturate(2) brightness(1.2); }
            }
        `;
        document.head.appendChild(style);

        // Reset after 10 seconds
        setTimeout(() => {
            document.body.style.filter = '';
            document.body.style.animation = '';
        }, 10000);

        console.log('🎮 ULTRA NEON MODE ACTIVATED! 💖✨');
    }
}

// ================================
// Initialize Everything
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new LanguageSwitcher();
    new ScrollAnimations();
    new ClipboardManager();
    new SmoothScroll();

    // Visual effects
    new NeonGridAnimation();
    new ParallaxEffect();

    // Optimization
    new PerformanceOptimizer();

    // Optional features
    new Analytics();
    new KonamiCode();

    // Add loaded class to body
    document.body.classList.add('loaded');

    // Log initialization
    console.log('%c🌃 Neon Pink Dark Theme 💖', 'color: #FF2DBE; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome to the cyberpunk future! ✨', 'color: #FF8CF0; font-size: 14px;');
});

// ================================
// Service Worker Registration
// ================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you want to add PWA support
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}
