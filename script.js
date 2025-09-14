// Navigation et effets de scroll
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.modal-close');

    // Effet de scroll sur la navigation
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Animation des éléments au scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .gallery-item, .download-card, .stat');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-up');
            }
        });
    }

    // Navigation mobile
    function toggleMobileNav() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navActions.classList.toggle('active');
        
        // Animation du hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    // Smooth scroll pour les liens d'ancrage
    function smoothScrollToAnchor(e) {
        const href = e.currentTarget.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Offset pour la navbar fixe
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                if (hamburger.classList.contains('active')) {
                    toggleMobileNav();
                }
            }
        }
    }

    // Galerie modale
    function openModal(imageSrc) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunction() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Parallax effect pour le hero
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const heroGif = document.querySelector('.hero-gif');
        
        if (heroGif) {
            const rate = scrolled * -0.5;
            heroGif.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    }

    // Compteur animé pour les statistiques
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + suffix;
            }, 20);
        });
    }

    // Lazy loading pour les images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
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

        images.forEach(img => imageObserver.observe(img));
    }

    // Effet de typing pour le titre
    function typeWriter(element, text, speed = 100) {
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

    // Gestion des formulaires (si nécessaire)
    function handleFormSubmission(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation de chargement
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulation d'envoi
            setTimeout(() => {
                submitBtn.textContent = 'Envoyé !';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Gestion du thème (si nécessaire pour le futur)
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.add(savedTheme);
        }
    }

    // Event listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        animateOnScroll();
        parallaxEffect();
    });

    // Navigation mobile
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileNav);
    }

    // Liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', smoothScrollToAnchor);
    });

    // Galerie
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openModal(img.src);
            }
        });
    });

    // Fermeture de la modale
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModalFunction();
            }
        });
    }

    // Fermeture avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });

    // Fermeture du menu mobile en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (hamburger.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target) && 
            !navActions.contains(e.target)) {
            toggleMobileNav();
        }
    });

    // Animation des boutons au survol
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Gestion des formulaires
    document.querySelectorAll('form').forEach(handleFormSubmission);

    // Animation des cartes au survol
    document.querySelectorAll('.feature-card, .download-card, .gallery-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Intersection Observer pour les animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animation spéciale pour les statistiques
                if (entry.target.classList.contains('community-stats')) {
                    setTimeout(() => {
                        animateCounters();
                    }, 300);
                }
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.feature-card, .gallery-item, .download-card, .community-stats, .section-header').forEach(el => {
        observer.observe(el);
    });

    // Initialisation
    initTheme();
    lazyLoadImages();
    
    // Animation d'entrée pour le hero
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('fade-in-up');
    }, 500);

    // Préchargement des images importantes
    function preloadImages() {
        const imageUrls = [
            'public/SC_Overview.gif',
            'public/SC_BuildingSystem.gif',
            'public/SC_Gather.gif',
            'public/SC_SpiritEssence.gif',
            'public/SC_IslandArchon.gif'
        ];

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    preloadImages();

    // Performance: Throttle scroll events
    let scrollTimer = null;
    const throttledScroll = () => {
        if (scrollTimer !== null) {
            return;
        }
        scrollTimer = setTimeout(() => {
            handleScroll();
            animateOnScroll();
            parallaxEffect();
            scrollTimer = null;
        }, 16); // ~60fps
    };

    window.removeEventListener('scroll', () => {
        handleScroll();
        animateOnScroll();
        parallaxEffect();
    });
    
    window.addEventListener('scroll', throttledScroll);

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        // Fermer le menu mobile si la fenêtre devient plus large
        if (window.innerWidth > 768 && hamburger.classList.contains('active')) {
            toggleMobileNav();
        }
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konami.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konami.join(',')) {
            // Easter egg activé !
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiCode = [];
        }
    });

    // CSS pour l'easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    console.log('🎮 Island Archon - Site Web Chargé avec Succès!');
    console.log('💡 Astuce: Essayez le code Konami pour un effet spécial!');
});

// Fonctions utilitaires
const Utils = {
    // Débounce pour optimiser les performances
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    // Throttle pour limiter la fréquence d'exécution
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Animation smooth vers un élément
    scrollToElement: function(element, offset = 80) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    // Vérifier si un élément est visible
    isElementInViewport: function(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Générer un ID unique
    generateId: function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    },

    // Formater les nombres
    formatNumber: function(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
};
