
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.modal-close');

    
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    
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

    
    function toggleMobileNav() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navActions.classList.toggle('active');
        
        
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

    
    function smoothScrollToAnchor(e) {
        const href = e.currentTarget.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; 
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                
                if (hamburger.classList.contains('active')) {
                    toggleMobileNav();
                }
            }
        }
    }

    
    function openModal(imageSrc) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunction() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const heroGif = document.querySelector('.hero-gif');
        
        if (heroGif) {
            const rate = scrolled * -0.5;
            heroGif.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    }

    
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

    
    function handleFormSubmission(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            
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

    
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.add(savedTheme);
        }
    }

    
    window.addEventListener('scroll', () => {
        handleScroll();
        animateOnScroll();
        parallaxEffect();
    });

    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileNav);
    }

    
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', smoothScrollToAnchor);
    });

    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openModal(img.src);
            }
        });
    });

    
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

    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });

    
    document.addEventListener('click', function(e) {
        if (hamburger.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target) && 
            !navActions.contains(e.target)) {
            toggleMobileNav();
        }
    });

    
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    
    document.querySelectorAll('form').forEach(handleFormSubmission);

    
    document.querySelectorAll('.feature-card, .download-card, .gallery-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                
                if (entry.target.classList.contains('community-stats')) {
                    setTimeout(() => {
                        animateCounters();
                    }, 300);
                }
            }
        });
    }, observerOptions);

    
    document.querySelectorAll('.feature-card, .gallery-item, .download-card, .community-stats, .section-header').forEach(el => {
        observer.observe(el);
    });

    
    initTheme();
    lazyLoadImages();
    
    
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('fade-in-up');
    }, 500);

    
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
        }, 16); 
    };

    window.removeEventListener('scroll', () => {
        handleScroll();
        animateOnScroll();
        parallaxEffect();
    });
    
    window.addEventListener('scroll', throttledScroll);

    
    window.addEventListener('resize', () => {
        
        if (window.innerWidth > 768 && hamburger.classList.contains('active')) {
            toggleMobileNav();
        }
    });

    
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; 

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konami.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konami.join(',')) {
            
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiCode = [];
        }
    });

    
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


const Utils = {
    
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

    
    scrollToElement: function(element, offset = 80) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    
    isElementInViewport: function(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    
    generateId: function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    },

    
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
