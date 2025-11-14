// ========================================
// The Sweet Soirée - Main JavaScript
// ========================================

(function() {
    'use strict';

    // ========================================
    // SPLASH SCREEN WITH FALLING FOOD SPRINKLES
    // ========================================
    const splashScreen = document.getElementById('splashScreen');
    const splashSparklesContainer = document.getElementById('splashSparkles');

    // Create falling food sprinkles for splash screen
    function createSplashSparkle() {
        const sprinkle = document.createElement('div');
        sprinkle.className = 'splash-sparkle';
        
        // Random sprinkle color (food sprinkle colors)
        const colors = ['pink', 'blue', 'yellow', 'green', 'purple', 'orange', 'red', 'white'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        sprinkle.classList.add(color);
        
        // Random size variation for sprinkles
        const width = Math.random() * 4 + 6; // 6-10px
        const height = Math.random() * 10 + 20; // 20-30px
        sprinkle.style.width = `${width}px`;
        sprinkle.style.height = `${height}px`;
        
        // Random horizontal position - full width coverage
        sprinkle.style.left = `${Math.random() * 100}%`;
        
        // Start from lower - just above or at top of screen
        sprinkle.style.top = `${-20 - Math.random() * 30}px`;
        
        // Random animation delay - spread over longer time for continuous coverage
        sprinkle.style.animationDelay = `${Math.random() * 10}s`;
        
        // Random duration
        sprinkle.style.animationDuration = `${Math.random() * 4 + 4}s`;
        
        // Random initial rotation
        sprinkle.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        splashSparklesContainer.appendChild(sprinkle);
    }

    // Generate colorful falling sprinkles for splash screen (full coverage, evenly distributed)
    const sprinkleCount = window.innerWidth > 768 ? 200 : 120;
    for (let i = 0; i < sprinkleCount; i++) {
        createSplashSparkle();
    }

    // Hide splash screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            
            // Remove splash screen from DOM after transition
            setTimeout(() => {
                splashScreen.remove();
            }, 800);
        }, 2000); // Show splash for at least 2 seconds
    });

    // Fallback: Hide splash after max 5 seconds
    setTimeout(() => {
        if (splashScreen && !splashScreen.classList.contains('hidden')) {
            splashScreen.classList.add('hidden');
            setTimeout(() => splashScreen.remove(), 800);
        }
    }, 5000);

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ========================================
    // Smooth Scroll
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Intersection Observer for Reveals
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
        '.reveal-text, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade'
    );
    revealElements.forEach(el => observer.observe(el));

    // ========================================
    // Lazy Loading Images
    // ========================================
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // Animated Falling Crumbs
    // ========================================
    const crumbsContainer = document.getElementById('crumbsContainer');
    const crumbCount = window.innerWidth > 768 ? 15 : 8;

    function createCrumb() {
        const crumb = document.createElement('div');
        crumb.className = 'crumb';
        const size = Math.random() * 8 + 4;
        crumb.style.width = `${size}px`;
        crumb.style.height = `${size}px`;
        crumb.style.left = `${Math.random() * 100}%`;
        crumb.style.animationDelay = `${Math.random() * 8}s`;
        crumb.style.animationDuration = `${Math.random() * 4 + 6}s`;
        crumbsContainer.appendChild(crumb);
    }

    for (let i = 0; i < crumbCount; i++) {
        createCrumb();
    }

    // ========================================
    // Animated Sauce Drips
    // ========================================
    const dripContainer = document.getElementById('dripContainer');
    const dripCount = window.innerWidth > 768 ? 8 : 4;

    function createDrip() {
        const drip = document.createElement('div');
        drip.className = 'sauce-drip';
        drip.style.left = `${Math.random() * 100}%`;
        drip.style.animationDelay = `${Math.random() * 4}s`;
        drip.style.animationDuration = `${Math.random() * 2 + 3}s`;
        dripContainer.appendChild(drip);
    }

    for (let i = 0; i < dripCount; i++) {
        createDrip();
    }

    // ========================================
    // Organic Blobs (Business Card Style)
    // ========================================
    const organicBlobsContainer = document.getElementById('organicBlobs');
    const blobCount = window.innerWidth > 768 ? 6 : 3;

    function createOrganicBlob() {
        const blob = document.createElement('div');
        blob.className = 'organic-blob';
        
        // Random size
        const size = Math.random() * 150 + 100;
        const colors = ['#D17235', '#C96A31', '#B85A28'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random position
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        // Random border radius for organic shape
        const br1 = Math.random() * 40 + 30;
        const br2 = 100 - br1 + Math.random() * 20;
        const br3 = Math.random() * 40 + 30;
        const br4 = 100 - br3 + Math.random() * 20;
        
        blob.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${br1}% ${br2}% ${br3}% ${br4}%;
            top: ${top}%;
            left: ${left}%;
            opacity: 0.4;
            animation: organicFloat ${Math.random() * 20 + 15}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            z-index: 0;
        `;
        
        organicBlobsContainer.appendChild(blob);
    }

    // Add organic blob animation CSS
    const organicBlobStyle = document.createElement('style');
    organicBlobStyle.textContent = `
        .organic-blobs {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        }
        
        @keyframes organicFloat {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg) scale(1);
            }
            33% {
                transform: translate(30px, -30px) rotate(120deg) scale(1.1);
            }
            66% {
                transform: translate(-20px, 20px) rotate(240deg) scale(0.9);
            }
        }
    `;
    document.head.appendChild(organicBlobStyle);

    // Create blobs
    for (let i = 0; i < blobCount; i++) {
        createOrganicBlob();
    }

    // ========================================
    // Hero Section Falling Crumbs (FRONT AND CENTER)
    // ========================================
    const heroCrumbsContainer = document.getElementById('heroCrumbs');
    const heroCrumbCount = window.innerWidth > 768 ? 80 : 50;

    function createHeroCrumb() {
        const crumb = document.createElement('div');
        crumb.className = 'hero-crumb';
        
        // Larger sizes for maximum visibility
        const size = Math.random() * 18 + 10; // 10-28px
        crumb.style.width = `${size}px`;
        crumb.style.height = `${size}px`;
        
        // Random horizontal position across hero section
        crumb.style.left = `${Math.random() * 100}%`;
        
        // Start from top of screen
        crumb.style.top = '0px';
        
        // Random animation delay for staggered falling
        crumb.style.animationDelay = `${Math.random() * 12}s`;
        
        // Random duration for varied falling speeds
        crumb.style.animationDuration = `${Math.random() * 6 + 10}s`;
        
        heroCrumbsContainer.appendChild(crumb);
    }

    // Create hero crumbs
    for (let i = 0; i < heroCrumbCount; i++) {
        createHeroCrumb();
    }

    // ========================================
    // SPARKLE ANIMATIONS
    // ========================================
    
    // Create sparkle container
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    sparkleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(sparkleContainer);

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const size = Math.random() * 8 + 4;
        const duration = Math.random() * 1 + 0.5;
        const colors = ['#FFD700', '#FF8C00', '#FFA500', '#F4C430', '#FFFFFF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px ${color};
            animation: sparkleFloat ${duration}s ease-out forwards;
        `;
        
        sparkleContainer.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, duration * 1000);
    }

    // Add sparkle animation CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-30px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-60px) scale(0);
            }
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
        }
        
        .star-sparkle {
            position: absolute;
            pointer-events: none;
            animation: twinkle 2s ease-in-out infinite;
        }
        
        .star-sparkle::before,
        .star-sparkle::after {
            content: '';
            position: absolute;
            background: currentColor;
        }
        
        .star-sparkle::before {
            width: 100%;
            height: 2px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .star-sparkle::after {
            width: 2px;
            height: 100%;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Random sparkles around hero section
    function createRandomSparkles() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const rect = heroSection.getBoundingClientRect();
        const x = Math.random() * rect.width + rect.left;
        const y = Math.random() * rect.height + rect.top;
        
        createSparkle(x, y);
    }

    // Generate random sparkles periodically
    setInterval(createRandomSparkles, 800);

    // Sparkles on button hover
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const x = rect.left + Math.random() * rect.width;
                    const y = rect.top + Math.random() * rect.height;
                    createSparkle(x, y);
                }, i * 100);
            }
        });
    });

    // Star sparkles on menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const starCount = 3;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star-sparkle';
            const size = Math.random() * 12 + 8;
            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                color: #FFD700;
                top: ${Math.random() * 80 + 10}%;
                left: ${Math.random() * 80 + 10}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            item.style.position = 'relative';
            item.appendChild(star);
        }
    });

    // Cursor trail sparkles
    let lastSparkleTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkleTime > 100) {
            createSparkle(e.clientX, e.clientY);
            lastSparkleTime = now;
        }
    });

    // Touch sparkles for mobile
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const now = Date.now();
        if (now - lastSparkleTime > 100) {
            createSparkle(touch.clientX, touch.clientY);
            lastSparkleTime = now;
        }
    });

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
        }
    });

    // ========================================
    // Form Submission
    // ========================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Success sparkle burst
        const rect = submitButton.getBoundingClientRect();
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width;
                const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * rect.height;
                createSparkle(x, y);
            }, i * 50);
        }
        
        submitButton.innerHTML = '<span>✓ Sent Successfully!</span>';
        submitButton.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // ========================================
    // Performance Optimization
    // ========================================
    
    // Reduce animations on low-power devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0.01s');
        document.documentElement.style.setProperty('--transition-normal', '0.01s');
        document.documentElement.style.setProperty('--transition-slow', '0.01s');
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.querySelectorAll('.crumb, .sauce-drip, .sparkle').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            document.querySelectorAll('.crumb, .sauce-drip, .sparkle').forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });

    console.log('🍫 The Sweet Soirée website loaded successfully! ✨');

})();
