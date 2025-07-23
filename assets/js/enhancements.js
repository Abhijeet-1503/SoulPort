// Performance and Quality Enhancements

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupLazyLoading();
    this.setupPreloadCriticalResources();
    this.setupErrorHandling();
    this.monitorPerformance();
  }

  // Intersection Observer for performance
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .card, .stat-item').forEach(el => {
      observer.observe(el);
    });
  }

  // Lazy loading for images and heavy content
  setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Preload critical resources
  setupPreloadCriticalResources() {
    const criticalResources = [
      '/assets/css/main.css',
      '/assets/css/components.css',
      '/assets/css/themes.css',
      '/assets/css/interactive.css'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  // Error handling and fallbacks
  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.warn('Resource failed to load:', e.target.src || e.target.href);
      // Provide fallbacks for critical resources
      this.handleResourceFailure(e.target);
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.warn('Unhandled promise rejection:', e.reason);
      e.preventDefault();
    });
  }

  handleResourceFailure(element) {
    if (element.tagName === 'IMG') {
      element.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999">Image</text></svg>';
    }
  }

  // Performance monitoring
  monitorPerformance() {
    // Monitor First Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            console.log('FCP:', entry.startTime);
          }
        });
      });
      observer.observe({ entryTypes: ['paint'] });
    }

    // Monitor layout shifts
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        let clsValue = 0;
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        if (clsValue > 0.1) {
          console.warn('High Cumulative Layout Shift detected:', clsValue);
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }
}

// Accessibility enhancements
class AccessibilityEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupAriaLabels();
    this.setupReducedMotion();
  }

  setupKeyboardNavigation() {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('click', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--primary-color);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  setupFocusManagement() {
    // Enhanced focus indicators
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }

  setupAriaLabels() {
    // Add missing aria labels
    document.querySelectorAll('button:not([aria-label])').forEach(btn => {
      if (!btn.textContent.trim()) {
        btn.setAttribute('aria-label', 'Button');
      }
    });

    // Add aria-expanded to mobile menu toggle
    const mobileToggle = document.querySelector('.nav-toggle');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  setupReducedMotion() {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PerformanceOptimizer();
  new AccessibilityEnhancer();
});

export { PerformanceOptimizer, AccessibilityEnhancer };
