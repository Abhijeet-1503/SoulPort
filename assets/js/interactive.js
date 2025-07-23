// Enhanced Interactive Features

class InteractiveEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.setupCustomCursor();
    this.setupButtonRipple();
    this.setupMagneticEffect();
    this.setupParallax();
    this.setupCounterAnimations();
    this.setupSmoothScrollEnhancements();
    this.setupCardTilt();
  }

  // Custom Cursor
  setupCustomCursor() {
    if (window.innerWidth > 768) { // Only on desktop
      const cursor = document.createElement('div');
      cursor.className = 'cursor';
      document.body.appendChild(cursor);

      let mouseX = 0, mouseY = 0;
      let cursorX = 0, cursorY = 0;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(animateCursor);
      };
      animateCursor();

      // Cursor interactions
      document.querySelectorAll('a, button, .card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
      });
    }
  }

  // Button Ripple Effect
  setupButtonRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ripple = btn.querySelector('.btn-ripple');
        if (ripple) {
          ripple.style.width = '0';
          ripple.style.height = '0';
          
          setTimeout(() => {
            ripple.style.width = '300px';
            ripple.style.height = '300px';
          }, 10);
          
          setTimeout(() => {
            ripple.style.width = '0';
            ripple.style.height = '0';
          }, 600);
        }
      });
    });
  }

  // Magnetic Effect
  setupMagneticEffect() {
    document.querySelectorAll('.btn, .card').forEach(el => {
      el.classList.add('magnetic');
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // Parallax Effects
  setupParallax() {
    const parallaxElements = document.querySelectorAll('.hero-visual, .three-canvas');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(el => {
        if (el) {
          el.style.transform = `translateY(${rate}px)`;
        }
      });
    });

    // Mouse parallax for hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        
        const parallaxElements = hero.querySelectorAll('.parallax-element');
        parallaxElements.forEach((el, index) => {
          const speed = (index + 1) * 10;
          el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
      });
    }
  }

  // Counter Animations
  setupCounterAnimations() {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target.querySelector('.stat-number');
          const target = parseInt(counter.getAttribute('data-count'));
          
          this.animateCounter(counter, 0, target, 2000);
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.stat-item').forEach(item => {
      observer.observe(item);
    });
  }

  animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (difference * easeOutQuart));
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = end.toLocaleString();
      }
    };
    
    requestAnimationFrame(step);
  }

  // Enhanced Smooth Scrolling
  setupSmoothScrollEnhancements() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // 3D Card Tilt Effect
  setupCardTilt() {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new InteractiveEnhancements();
});

// Export for use in other modules
export { InteractiveEnhancements };
