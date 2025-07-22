import { initThemeToggle } from './theme-toggle.js';
import { initThreeScene } from './three-scene.js';
import { initAnimations } from './animations.js';
import { initNavbar } from '../../components/navbar.js';
import { initHero } from '../../components/hero.js';
import { initExperience } from '../../components/experience.js';
import { initProjects } from '../../components/projects.js';
import { initLive } from '../../components/live.js';
import { initWander } from '../../components/wander.js';
import './data-manager.js';
import './data-interface.js';

class PortfolioApp {
  constructor() {
    this.isLoaded = false;
    this.components = [];
    this.init();
  }

  async init() {
    try {
      // Show loading screen
      this.showLoading();
      
      // Initialize core systems
      await this.initializeSystems();
      
      // Initialize components
      await this.initializeComponents();
      
      // Set up global event listeners
      this.setupEventListeners();
      
      // Hide loading screen
      await this.hideLoading();
      
      // Mark as loaded
      this.isLoaded = true;
      
      console.log('Portfolio app initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize portfolio app:', error);
      this.showError(error);
    }
  }

  async initializeSystems() {
    const systems = [
      { name: 'Theme Toggle', init: initThemeToggle },
      { name: 'Three.js Scene', init: initThreeScene },
      { name: 'Animations', init: initAnimations },
      { name: 'Navigation', init: initNavbar }
    ];

    for (const system of systems) {
      try {
        await system.init();
        console.log(`✓ ${system.name} initialized`);
      } catch (error) {
        console.error(`✗ Failed to initialize ${system.name}:`, error);
        throw error;
      }
    }
  }

  async initializeComponents() {
    const components = [
      { name: 'Hero Section', init: initHero, globalName: 'heroComponent' },
      { name: 'Experience Section', init: initExperience, globalName: 'experienceComponent' },
      { name: 'Projects Section', init: initProjects, globalName: 'projectsComponent' },
      { name: 'Live Section', init: initLive, globalName: 'liveComponent' },
      { name: 'Wander Section', init: initWander, globalName: 'wanderComponent' }
    ];

    for (const component of components) {
      try {
        const instance = await component.init();
        if (instance) {
          this.components.push(instance);
          // Make component globally accessible for data interface
          if (component.globalName) {
            window[component.globalName] = instance;
          }
        }
        console.log(`✓ ${component.name} initialized`);
      } catch (error) {
        console.error(`✗ Failed to initialize ${component.name}:`, error);
        // Continue with other components even if one fails
      }
    }
  }

  setupEventListeners() {
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Handle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.handleScroll();
      }, 16); // ~60fps
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });

    // Handle focus management
    document.addEventListener('focusin', (e) => {
      this.handleFocus(e);
    });

    // Handle errors globally
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });
  }

  showLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.remove('hidden');
      
      // Animate loading progress
      const progressBar = loadingScreen.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = '100%';
        }, 100);
      }
    }
  }

  async hideLoading() {
    return new Promise((resolve) => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          setTimeout(resolve, 500); // Wait for fade out
        }, 1500); // Show loading for at least 1.5s
      } else {
        resolve();
      }
    });
  }

  showError(error) {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      const loadingText = loadingScreen.querySelector('.loading-text span');
      if (loadingText) {
        loadingText.textContent = 'Error loading application';
      }
      
      const progressBar = loadingScreen.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
        progressBar.style.width = '100%';
      }
    }
  }

  pauseAnimations() {
    this.components.forEach(component => {
      if (component.pause) {
        component.pause();
      }
    });
  }

  resumeAnimations() {
    this.components.forEach(component => {
      if (component.resume) {
        component.resume();
      }
    });
  }

  handleResize() {
    this.components.forEach(component => {
      if (component.handleResize) {
        component.handleResize();
      }
    });
  }

  handleScroll() {
    this.components.forEach(component => {
      if (component.handleScroll) {
        component.handleScroll();
      }
    });
  }

  handleKeyboardNavigation(e) {
    // Escape key handling
    if (e.key === 'Escape') {
      // Close any open modals or menus
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        activeModal.classList.remove('active');
      }
      
      const activeMenu = document.querySelector('.nav-menu.active');
      if (activeMenu) {
        activeMenu.classList.remove('active');
      }
    }

    // Arrow key navigation for sections
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          this.navigateToSection('prev');
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.navigateToSection('next');
          break;
      }
    }
  }

  handleFocus(e) {
    // Ensure focused elements are visible
    const focusedElement = e.target;
    if (focusedElement) {
      focusedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }

  navigateToSection(direction) {
    const sections = document.querySelectorAll('.section');
    const currentSection = this.getCurrentSection();
    const currentIndex = Array.from(sections).indexOf(currentSection);
    
    let targetIndex;
    if (direction === 'next') {
      targetIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      targetIndex = Math.max(currentIndex - 1, 0);
    }
    
    sections[targetIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;
      
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        return section;
      }
    }
    
    return sections[0];
  }

  // Public API for external interaction
  getComponent(name) {
    return this.components.find(component => component.name === name);
  }

  isComponentLoaded(name) {
    return this.components.some(component => component.name === name);
  }

  reload() {
    window.location.reload();
  }
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
  });
} else {
  window.portfolioApp = new PortfolioApp();
}

// Export for potential external use
export default PortfolioApp;
