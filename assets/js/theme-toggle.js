class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.systemTheme = 'light';
    this.storageKey = 'portfolio-theme';
    this.transitionClass = 'theme-switching';
    
    this.init();
  }

  init() {
    this.detectSystemTheme();
    this.loadSavedTheme();
    this.setupToggleButton();
    this.setupSystemThemeListener();
    this.setupKeyboardShortcut();
    
    // Apply initial theme
    this.applyTheme(this.currentTheme, false);
  }

  detectSystemTheme() {
    this.systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    this.currentTheme = savedTheme || this.systemTheme;
  }

  setupToggleButton() {
    const toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) {
      console.warn('Theme toggle button not found');
      return;
    }

    toggleButton.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Add hover effect
    toggleButton.addEventListener('mouseenter', this.onToggleHover.bind(this));
    toggleButton.addEventListener('mouseleave', this.onToggleLeave.bind(this));
  }

  setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      this.systemTheme = e.matches ? 'dark' : 'light';
      
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem(this.storageKey);
      if (!savedTheme) {
        this.applyTheme(this.systemTheme);
      }
    });
  }

  setupKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Shift + T to toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.saveTheme(newTheme);
    this.announceThemeChange(newTheme);
  }

  applyTheme(theme, withTransition = true) {
    if (withTransition) {
      document.body.classList.add(this.transitionClass);
      
      // Remove transition class after animation completes
      setTimeout(() => {
        document.body.classList.remove(this.transitionClass);
      }, 300);
    }

    // Update the data attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update current theme
    this.currentTheme = theme;
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
    
    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme, previousTheme: this.currentTheme }
    }));
    
    // Update toggle button state
    this.updateToggleButton(theme);
    
    console.log(`Theme switched to: ${theme}`);
  }

  saveTheme(theme) {
    localStorage.setItem(this.storageKey, theme);
  }

  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    const color = theme === 'dark' ? '#0f172a' : '#ffffff';
    metaThemeColor.content = color;
  }

  updateToggleButton(theme) {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
      toggleButton.title = `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`;
    }
  }

  announceThemeChange(theme) {
    // For screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = `Theme switched to ${theme} mode`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  onToggleHover() {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.style.transform = 'scale(1.1)';
    }
  }

  onToggleLeave() {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.style.transform = 'scale(1)';
    }
  }

  // Advanced theme features
  setCustomTheme(customProperties) {
    const root = document.documentElement;
    Object.entries(customProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }

  resetTheme() {
    this.applyTheme(this.systemTheme);
    localStorage.removeItem(this.storageKey);
  }

  getThemePreference() {
    return {
      current: this.currentTheme,
      system: this.systemTheme,
      saved: localStorage.getItem(this.storageKey)
    };
  }

  // Auto theme based on time of day
  enableAutoTheme() {
    const updateThemeByTime = () => {
      const hour = new Date().getHours();
      const isDaytime = hour >= 6 && hour < 18;
      const timeBasedTheme = isDaytime ? 'light' : 'dark';
      
      // Only apply if no manual preference is set
      if (!localStorage.getItem(this.storageKey)) {
        this.applyTheme(timeBasedTheme);
      }
    };

    // Check every hour
    updateThemeByTime();
    setInterval(updateThemeByTime, 3600000);
  }

  // Theme scheduling
  scheduleTheme(lightTime, darkTime) {
    const checkSchedule = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const lightMinutes = this.timeToMinutes(lightTime);
      const darkMinutes = this.timeToMinutes(darkTime);
      
      const shouldBeDark = currentTime >= darkMinutes || currentTime < lightMinutes;
      const targetTheme = shouldBeDark ? 'dark' : 'light';
      
      if (this.currentTheme !== targetTheme) {
        this.applyTheme(targetTheme);
      }
    };

    checkSchedule();
    setInterval(checkSchedule, 60000); // Check every minute
  }

  timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }

  destroy() {
    // Cleanup event listeners and intervals
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.removeEventListener('click', this.toggleTheme);
    }
  }
}

// Initialize theme manager
export function initThemeToggle() {
  return new Promise((resolve) => {
    const themeManager = new ThemeManager();
    window.themeManager = themeManager;
    resolve(themeManager);
  });
}

// Export for external use
export { ThemeManager };
