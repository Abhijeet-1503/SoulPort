import { debounce, formatNumber } from '../assets/js/utils.js';

class HeroComponent {
  constructor() {
    this.heroSection = null;
    this.typewriterElement = null;
    this.statNumbers = [];
    this.isAnimating = false;
    this.typewriterTexts = [
      "AI Enthusiast | Web Master | Researcher | Travelling Soul",
      "BTech AI Student @ Marwadi University",
      "IEEE Active Member | Technical Specialist",
      "Building the Future with Innovation"
    ];
    this.currentTextIndex = 0;
    this.typewriterInterval = null;
    
    this.init();
  }

  init() {
    this.heroSection = document.getElementById('home');
    if (!this.heroSection) {
      console.error('Hero section not found');
      return;
    }

    this.typewriterElement = this.heroSection.querySelector('.typewriter');
    this.statNumbers = Array.from(this.heroSection.querySelectorAll('[data-count]'));
    
    this.setupIntersectionObserver();
    this.setupParallaxEffect();
    this.setupHoverEffects();
    this.setupResponsiveTypography();
    
    // Initialize typewriter after a delay
    setTimeout(() => {
      this.startTypewriter();
    }, 1000);
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isAnimating) {
          this.animateHeroElements();
        }
      });
    }, options);

    this.observer.observe(this.heroSection);
  }

  setupParallaxEffect() {
    const handleScroll = debounce(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      
      // Parallax effect for hero content
      const heroContent = this.heroSection.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${rate}px)`;
      }

      // Update avatar glow intensity based on scroll
      const avatarGlow = this.heroSection.querySelector('.avatar-glow');
      if (avatarGlow) {
        const intensity = Math.max(0.3, 1 - (scrolled / window.innerHeight));
        avatarGlow.style.opacity = intensity;
      }
    }, 16);

    window.addEventListener('scroll', handleScroll);
  }

  setupHoverEffects() {
    // Hero avatar hover effect
    const heroAvatar = this.heroSection.querySelector('.hero-avatar');
    if (heroAvatar) {
      heroAvatar.addEventListener('mouseenter', () => {
        heroAvatar.style.transform = 'scale(1.05) rotate(5deg)';
      });

      heroAvatar.addEventListener('mouseleave', () => {
        heroAvatar.style.transform = 'scale(1) rotate(0deg)';
      });
    }

    // Stat items hover effects
    const statItems = this.heroSection.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
        item.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
        
        // Add ripple effect
        this.createRippleEffect(item);
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(-5px) scale(1)';
        item.style.boxShadow = '';
      });
    });

    // Button hover effects with micro-interactions
    const buttons = this.heroSection.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', (e) => {
        this.animateButtonHover(button, true);
      });

      button.addEventListener('mouseleave', (e) => {
        this.animateButtonHover(button, false);
      });

      button.addEventListener('click', (e) => {
        this.createClickAnimation(button, e);
      });
    });
  }

  setupResponsiveTypography() {
    const updateFontSizes = () => {
      const vw = window.innerWidth;
      const heroTitle = this.heroSection.querySelector('.hero-title');
      const heroSubtitle = this.heroSection.querySelector('.hero-subtitle');
      
      if (heroTitle) {
        if (vw < 480) {
          heroTitle.style.fontSize = 'clamp(2rem, 8vw, 3rem)';
        } else if (vw < 768) {
          heroTitle.style.fontSize = 'clamp(2.5rem, 10vw, 4rem)';
        } else {
          heroTitle.style.fontSize = '';
        }
      }

      if (heroSubtitle) {
        if (vw < 480) {
          heroSubtitle.style.fontSize = 'clamp(0.9rem, 4vw, 1.1rem)';
        } else {
          heroSubtitle.style.fontSize = '';
        }
      }
    };

    updateFontSizes();
    window.addEventListener('resize', debounce(updateFontSizes, 250));
  }

  async animateHeroElements() {
    this.isAnimating = true;

    // Animate hero text elements with staggered timing
    const textElements = [
      this.heroSection.querySelector('.hero-title'),
      this.heroSection.querySelector('.hero-subtitle'),
      this.heroSection.querySelector('.hero-description'),
      this.heroSection.querySelector('.hero-actions')
    ];

    for (let i = 0; i < textElements.length; i++) {
      if (textElements[i]) {
        await this.animateElement(textElements[i], i * 200);
      }
    }

    // Animate hero visual elements
    setTimeout(() => {
      this.animateHeroVisual();
    }, 800);

    // Animate statistics with counters
    setTimeout(() => {
      this.animateStatistics();
    }, 1200);
  }

  async animateElement(element, delay = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        
        requestAnimationFrame(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        });

        setTimeout(resolve, 800);
      }, delay);
    });
  }

  animateHeroVisual() {
    const heroAvatar = this.heroSection.querySelector('.hero-avatar');
    const heroStats = this.heroSection.querySelector('.hero-stats');

    if (heroAvatar) {
      heroAvatar.style.opacity = '0';
      heroAvatar.style.transform = 'scale(0.8) rotate(-10deg)';
      heroAvatar.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
      
      setTimeout(() => {
        heroAvatar.style.opacity = '1';
        heroAvatar.style.transform = 'scale(1) rotate(0deg)';
      }, 100);
    }

    if (heroStats) {
      heroStats.style.opacity = '0';
      heroStats.style.transform = 'translateY(30px)';
      heroStats.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s';
      
      setTimeout(() => {
        heroStats.style.opacity = '1';
        heroStats.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  animateStatistics() {
    this.statNumbers.forEach((stat, index) => {
      setTimeout(() => {
        this.animateCounter(stat);
      }, index * 200);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = formatNumber(Math.floor(current));
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = formatNumber(target);
      }
    };

    // Add pulsing animation during counting
    element.style.animation = 'pulse 0.5s ease-in-out infinite';
    updateCounter();
    
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  }

  startTypewriter() {
    if (!this.typewriterElement) return;

    const typeText = (text, callback) => {
      let index = 0;
      this.typewriterElement.textContent = '';
      
      const type = () => {
        if (index < text.length) {
          this.typewriterElement.textContent += text.charAt(index);
          index++;
          setTimeout(type, 100);
        } else {
          setTimeout(callback, 2000); // Wait 2 seconds before next text
        }
      };

      type();
    };

    const eraseText = (callback) => {
      const currentText = this.typewriterElement.textContent;
      let index = currentText.length;
      
      const erase = () => {
        if (index > 0) {
          this.typewriterElement.textContent = currentText.substring(0, index - 1);
          index--;
          setTimeout(erase, 50);
        } else {
          setTimeout(callback, 500);
        }
      };

      erase();
    };

    const cycle = () => {
      const currentText = this.typewriterTexts[this.currentTextIndex];
      
      typeText(currentText, () => {
        eraseText(() => {
          this.currentTextIndex = (this.currentTextIndex + 1) % this.typewriterTexts.length;
          cycle();
        });
      });
    };

    cycle();
  }

  createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(99, 102, 241, 0.3);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      width: ${size}px;
      height: ${size}px;
      top: 50%;
      left: 50%;
      transform-origin: center;
      pointer-events: none;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  animateButtonHover(button, isHovering) {
    const icon = button.querySelector('svg');
    
    if (isHovering) {
      button.style.transform = 'translateY(-2px) scale(1.02)';
      button.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.4)';
      
      if (icon) {
        icon.style.transform = 'translateX(5px) rotate(15deg)';
      }
    } else {
      button.style.transform = 'translateY(0) scale(1)';
      button.style.boxShadow = '';
      
      if (icon) {
        icon.style.transform = 'translateX(0) rotate(0deg)';
      }
    }
  }

  createClickAnimation(button, event) {
    // Prevent default if it's a navigation link
    const href = button.getAttribute('href');
    if (href && href.startsWith('#')) {
      event.preventDefault();
      
      // Add click animation
      button.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        button.style.transform = '';
        
        // Navigate to section
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 150);
    }

    // Create click ripple effect
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: clickRipple 0.6s ease-out;
      width: 20px;
      height: 20px;
      left: ${x - 10}px;
      top: ${y - 10}px;
      pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  // Public API methods
  updateStatistic(selector, newValue) {
    const statElement = this.heroSection.querySelector(selector);
    if (statElement) {
      statElement.dataset.count = newValue;
      this.animateCounter(statElement);
    }
  }

  pauseTypewriter() {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
  }

  resumeTypewriter() {
    this.startTypewriter();
  }

  addTypewriterText(text) {
    this.typewriterTexts.push(text);
  }

  handleResize() {
    // Recalculate responsive elements
    this.setupResponsiveTypography();
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }

    // Remove event listeners
    window.removeEventListener('scroll', this.setupParallaxEffect);
    window.removeEventListener('resize', this.setupResponsiveTypography);
  }
}

// Add necessary CSS animations
const heroStyles = document.createElement('style');
heroStyles.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes clickRipple {
    to {
      transform: scale(10);
      opacity: 0;
    }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .hero-avatar {
    transition: transform 0.3s ease;
  }

  .stat-item {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn svg {
    transition: transform 0.3s ease;
  }
`;

document.head.appendChild(heroStyles);

// Initialize hero component
export function initHero() {
  return new Promise((resolve) => {
    const hero = new HeroComponent();
    resolve(hero);
  });
}

export default HeroComponent;
