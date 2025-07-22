import { smoothScrollTo, debounce } from '../assets/js/utils.js';

class NavbarComponent {
  constructor() {
    this.navbar = null;
    this.navLinks = [];
    this.sections = [];
    this.activeSection = null;
    this.isScrolling = false;
    this.mobileMenuOpen = false;
    
    this.init();
  }

  init() {
    this.navbar = document.getElementById('navbar');
    if (!this.navbar) {
      console.error('Navbar element not found');
      return;
    }

    this.navLinks = Array.from(this.navbar.querySelectorAll('.nav-link'));
    this.sections = Array.from(document.querySelectorAll('.section'));
    
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupMobileMenu();
    
    // Set initial active section
    this.updateActiveSection();
  }

  setupEventListeners() {
    // Navigation link clicks
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          this.navigateToSection(targetSection, link);
        }
      });
    });

    // Scroll events for navbar background
    const handleScroll = debounce(() => {
      this.updateNavbarAppearance();
      this.updateActiveSection();
    }, 10);

    window.addEventListener('scroll', handleScroll);

    // Resize events
    window.addEventListener('resize', debounce(() => {
      this.handleResize();
    }, 250));

    // Theme change events
    document.addEventListener('themechange', () => {
      this.updateNavbarTheme();
    });
  }

  setupIntersectionObserver() {
    const options = {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-80px 0px -80px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          this.setActiveSection(entry.target.id);
        }
      });
    }, options);

    this.sections.forEach(section => {
      this.observer.observe(section);
    });
  }

  setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      // Close mobile menu when clicking on links
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (this.mobileMenuOpen) {
            this.closeMobileMenu();
          }
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.mobileMenuOpen && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
          this.closeMobileMenu();
        }
      });

      // Close mobile menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.mobileMenuOpen) {
          this.closeMobileMenu();
        }
      });
    }
  }

  navigateToSection(targetSection, clickedLink) {
    // Prevent multiple simultaneous scrolls
    if (this.isScrolling) return;
    
    this.isScrolling = true;
    
    // Update active state immediately for better UX
    this.setActiveLink(clickedLink);
    
    // Smooth scroll to section
    smoothScrollTo(targetSection, {
      offset: 80, // Account for fixed navbar
      duration: 800,
      easing: 'easeInOutCubic'
    });

    // Reset scrolling flag after animation
    setTimeout(() => {
      this.isScrolling = false;
    }, 800);

    // Track navigation event
    this.trackNavigation(targetSection.id);
  }

  updateNavbarAppearance() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    // Add glass effect based on scroll position
    const opacity = Math.min(scrollY / 200, 1);
    this.navbar.style.setProperty('--nav-opacity', opacity);
  }

  updateActiveSection() {
    if (this.isScrolling) return;

    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let activeSection = null;

    for (const section of this.sections) {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        activeSection = section;
        break;
      }
    }

    if (activeSection && activeSection !== this.activeSection) {
      this.setActiveSection(activeSection.id);
    }
  }

  setActiveSection(sectionId) {
    this.activeSection = document.getElementById(sectionId);
    
    // Update nav link states
    this.navLinks.forEach(link => {
      const linkTarget = link.getAttribute('href').substring(1);
      if (linkTarget === sectionId) {
        this.setActiveLink(link);
      }
    });

    // Dispatch event for other components
    document.dispatchEvent(new CustomEvent('sectionchange', {
      detail: { sectionId, section: this.activeSection }
    }));
  }

  setActiveLink(activeLink) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  toggleMobileMenu() {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (navMenu && navToggle) {
      navMenu.classList.add('active');
      navToggle.classList.add('active');
      this.mobileMenuOpen = true;

      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';

      // Focus management
      const firstLink = navMenu.querySelector('.nav-link');
      if (firstLink) {
        firstLink.focus();
      }

      // Add backdrop
      this.createBackdrop();
    }
  }

  closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (navMenu && navToggle) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      this.mobileMenuOpen = false;

      // Restore body scroll
      document.body.style.overflow = '';

      // Remove backdrop
      this.removeBackdrop();
    }
  }

  createBackdrop() {
    if (document.querySelector('.mobile-menu-backdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.3s ease;
    `;

    backdrop.addEventListener('click', () => {
      this.closeMobileMenu();
    });

    document.body.appendChild(backdrop);
  }

  removeBackdrop() {
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    if (backdrop) {
      backdrop.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        if (backdrop.parentNode) {
          backdrop.parentNode.removeChild(backdrop);
        }
      }, 300);
    }
  }

  updateNavbarTheme() {
    // Update navbar appearance based on current theme
    const theme = document.documentElement.getAttribute('data-theme');
    this.navbar.setAttribute('data-theme', theme);
  }

  handleResize() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }

    // Recalculate section positions
    this.updateActiveSection();
  }

  trackNavigation(sectionId) {
    // Track navigation for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'navigation', {
        event_category: 'User Interaction',
        event_label: sectionId
      });
    }

    console.log(`Navigated to section: ${sectionId}`);
  }

  // Public API
  navigateTo(sectionId) {
    const section = document.getElementById(sectionId);
    const link = this.navLinks.find(l => 
      l.getAttribute('href') === `#${sectionId}`
    );

    if (section && link) {
      this.navigateToSection(section, link);
    }
  }

  getCurrentSection() {
    return this.activeSection;
  }

  highlight(sectionId, duration = 2000) {
    const link = this.navLinks.find(l => 
      l.getAttribute('href') === `#${sectionId}`
    );

    if (link) {
      link.style.animation = `highlight ${duration}ms ease`;
      setTimeout(() => {
        link.style.animation = '';
      }, duration);
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }

    // Remove event listeners
    window.removeEventListener('scroll', this.updateNavbarAppearance);
    window.removeEventListener('resize', this.handleResize);

    // Close mobile menu if open
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}

// Initialize navbar component
export function initNavbar() {
  return new Promise((resolve) => {
    const navbar = new NavbarComponent();
    resolve(navbar);
  });
}

// Add highlight animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes highlight {
    0%, 100% { background-color: transparent; }
    50% { background-color: var(--color-primary); color: white; }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .mobile-menu-backdrop {
    animation: fadeIn 0.3s ease;
  }
`;
document.head.appendChild(style);

export default NavbarComponent;
