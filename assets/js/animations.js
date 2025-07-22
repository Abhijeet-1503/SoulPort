import { debounce } from './utils.js';

class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.animations = new Map();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupTypewriterAnimations();
    this.setupParallaxEffects();
    
    // Listen for reduced motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.isReducedMotion = e.matches;
      this.updateAnimationsForMotionPreference();
    });
  }

  setupIntersectionObserver() {
    const options = {
      threshold: [0, 0.1, 0.5, 1],
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, options);

    this.observers.set('main', observer);

    // Observe all animatable elements
    document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
      observer.observe(el);
    });
  }

  setupScrollAnimations() {
    const handleScroll = debounce(() => {
      this.updateScrollProgress();
      this.updateParallaxElements();
    }, 16);

    window.addEventListener('scroll', handleScroll);
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !counter.classList.contains('animated')) {
            this.animateCounter(counter);
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  }

  setupTypewriterAnimations() {
    const typewriters = document.querySelectorAll('.typewriter');
    
    typewriters.forEach(typewriter => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !typewriter.classList.contains('animated')) {
            this.animateTypewriter(typewriter);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(typewriter);
    });
  }

  setupParallaxEffects() {
    if (this.isReducedMotion) return;

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    const handleScroll = debounce(() => {
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const rect = element.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        
        element.style.transform = `translateY(${rate}px)`;
      });
    }, 16);

    window.addEventListener('scroll', handleScroll);
  }

  animateElement(element) {
    if (element.classList.contains('visible') || this.isReducedMotion) return;

    const animationType = this.getAnimationType(element);
    const delay = parseFloat(element.dataset.delay) || 0;

    setTimeout(() => {
      element.classList.add('visible');
      this.triggerCustomAnimation(element, animationType);
    }, delay * 1000);
  }

  getAnimationType(element) {
    if (element.classList.contains('fade-in')) return 'fade-in';
    if (element.classList.contains('slide-up')) return 'slide-up';
    if (element.classList.contains('scale-in')) return 'scale-in';
    return 'fade-in';
  }

  triggerCustomAnimation(element, type) {
    const customEvent = new CustomEvent('animationTriggered', {
      detail: { element, type }
    });
    document.dispatchEvent(customEvent);
  }

  animateCounter(counter) {
    if (this.isReducedMotion) {
      counter.textContent = counter.dataset.count;
      return;
    }

    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    counter.classList.add('animated');

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  }

  animateTypewriter(typewriter) {
    if (this.isReducedMotion) {
      typewriter.textContent = typewriter.dataset.text;
      return;
    }

    const text = typewriter.dataset.text;
    const speed = parseInt(typewriter.dataset.speed) || 100;
    let index = 0;

    typewriter.classList.add('animated');
    typewriter.textContent = '';

    const type = () => {
      if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const maxHeight = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(scrolled / maxHeight, 1);

    // Update any progress indicators
    const progressElements = document.querySelectorAll('[data-scroll-progress]');
    progressElements.forEach(element => {
      element.style.setProperty('--scroll-progress', progress);
    });

    // Dispatch scroll progress event
    document.dispatchEvent(new CustomEvent('scrollProgress', {
      detail: { progress, scrolled, maxHeight }
    }));
  }

  updateParallaxElements() {
    if (this.isReducedMotion) return;

    const scrolled = window.pageYOffset;
    
    // Update hero parallax
    const hero = document.querySelector('.hero-section');
    if (hero) {
      const rate = scrolled * 0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }

    // Update background elements
    const backgroundElements = document.querySelectorAll('.parallax-bg');
    backgroundElements.forEach((element, index) => {
      const rate = scrolled * (0.2 + index * 0.1);
      element.style.transform = `translateY(${rate}px)`;
    });
  }

  updateAnimationsForMotionPreference() {
    if (this.isReducedMotion) {
      // Disable all animations
      document.body.classList.add('reduce-motion');
      
      // Complete any ongoing animations instantly
      document.querySelectorAll('.typewriter').forEach(el => {
        if (el.dataset.text) {
          el.textContent = el.dataset.text;
        }
      });

      document.querySelectorAll('[data-count]').forEach(el => {
        el.textContent = el.dataset.count;
      });
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }

  // Utility methods for external use
  animateElementManually(element, options = {}) {
    const {
      type = 'fade-in',
      delay = 0,
      duration = 500,
      easing = 'ease'
    } = options;

    if (this.isReducedMotion) return Promise.resolve();

    return new Promise((resolve) => {
      setTimeout(() => {
        element.style.transition = `all ${duration}ms ${easing}`;
        element.classList.add(type, 'visible');
        
        setTimeout(resolve, duration);
      }, delay);
    });
  }

  createStaggeredAnimation(elements, options = {}) {
    const {
      staggerDelay = 100,
      type = 'fade-in'
    } = options;

    if (this.isReducedMotion) {
      elements.forEach(el => el.classList.add('visible'));
      return Promise.resolve();
    }

    return Promise.all(
      Array.from(elements).map((element, index) => 
        this.animateElementManually(element, {
          ...options,
          delay: index * staggerDelay
        })
      )
    );
  }

  createSequenceAnimation(animations) {
    if (this.isReducedMotion) {
      animations.forEach(anim => {
        if (anim.element) {
          anim.element.classList.add('visible');
        }
      });
      return Promise.resolve();
    }

    return animations.reduce((promise, animation) => {
      return promise.then(() => {
        if (animation.element) {
          return this.animateElementManually(animation.element, animation.options);
        } else if (animation.callback) {
          return animation.callback();
        }
      });
    }, Promise.resolve());
  }

  pause() {
    document.body.classList.add('animations-paused');
  }

  resume() {
    document.body.classList.remove('animations-paused');
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animations.clear();
  }
}

// Initialize animation manager
export function initAnimations() {
  return new Promise((resolve) => {
    const animationManager = new AnimationManager();
    window.animationManager = animationManager;
    resolve(animationManager);
  });
}

// CSS for animations (injected dynamically)
const animationCSS = `
  .reduce-motion *,
  .reduce-motion *::before,
  .reduce-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .animations-paused * {
    animation-play-state: paused !important;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }

  .fade-in:not(.visible) { opacity: 0; }
  .slide-up:not(.visible) { opacity: 0; transform: translateY(30px); }
  .scale-in:not(.visible) { opacity: 0; transform: scale(0.8); }
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);
