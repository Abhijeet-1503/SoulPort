// Utility functions for the portfolio application

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} Debounced function
 */
export function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

/**
 * Throttle function to limit the rate of function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if an element is in viewport
 * @param {Element} element - Element to check
 * @param {number} threshold - Percentage of element that should be visible (0-1)
 * @returns {boolean} Whether element is in viewport
 */
export function isInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
  
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  
  const visibleArea = visibleHeight * visibleWidth;
  const totalArea = rect.height * rect.width;
  
  return vertInView && horInView && (visibleArea / totalArea) >= threshold;
}

/**
 * Smooth scroll to element
 * @param {Element|string} target - Target element or selector
 * @param {Object} options - Scroll options
 */
export function smoothScrollTo(target, options = {}) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;

  const {
    offset = 0,
    duration = 800,
    easing = 'easeInOutCubic'
  } = options;

  const start = window.pageYOffset;
  const targetPosition = element.offsetTop - offset;
  const distance = targetPosition - start;
  let startTime = null;

  const easingFunctions = {
    linear: t => t,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeOutCubic: t => (--t) * t * t + 1
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const ease = easingFunctions[easing] || easingFunctions.easeInOutCubic;
    const easedProgress = ease(progress);
    
    window.scrollTo(0, start + (distance * easedProgress));
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
}

/**
 * Format number with commas for display
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date
 */
export function formatDate(date, options = {}) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const {
    style = 'medium',
    includeYear = true,
    includeTime = false
  } = options;

  const formatOptions = {
    year: includeYear ? 'numeric' : undefined,
    month: style === 'short' ? 'short' : 'long',
    day: 'numeric',
    hour: includeTime ? 'numeric' : undefined,
    minute: includeTime ? '2-digit' : undefined
  };

  return dateObj.toLocaleDateString('en-US', formatOptions);
}

/**
 * Calculate reading time for text content
 * @param {string} text - Text content
 * @param {number} wordsPerMinute - Average reading speed
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(text, wordsPerMinute = 200) {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate unique ID
 * @param {string} prefix - Optional prefix
 * @returns {string} Unique ID
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
}

/**
 * Create and show toast notification
 * @param {string} message - Toast message
 * @param {Object} options - Toast options
 */
export function showToast(message, options = {}) {
  const {
    type = 'info',
    duration = 3000,
    position = 'top-right'
  } = options;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type} toast-${position}`;
  toast.textContent = message;
  
  // Apply styles
  Object.assign(toast.style, {
    position: 'fixed',
    padding: '12px 24px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: '10000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    opacity: '0'
  });

  // Position the toast
  const positions = {
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' },
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' }
  };

  Object.assign(toast.style, positions[position]);

  // Type-specific styling
  const typeColors = {
    info: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  toast.style.backgroundColor = typeColors[type];

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
  });

  // Auto remove
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get random item from array
 * @param {Array} array - Array to pick from
 * @returns {*} Random item
 */
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Clamp number between min and max
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped number
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Linear interpolation between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} factor - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

/**
 * Get current device type
 * @returns {string} Device type: 'mobile', 'tablet', or 'desktop'
 */
export function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean} Whether user prefers reduced motion
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Wait for specified duration
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after duration
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create intersection observer with default options
 * @param {Function} callback - Callback function
 * @param {Object} options - Observer options
 * @returns {IntersectionObserver} Observer instance
 */
export function createIntersectionObserver(callback, options = {}) {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

/**
 * Performance monitoring utility
 */
export class PerformanceMonitor {
  constructor() {
    this.marks = new Map();
    this.measures = new Map();
  }

  mark(name) {
    this.marks.set(name, performance.now());
  }

  measure(name, startMark, endMark) {
    const start = this.marks.get(startMark);
    const end = endMark ? this.marks.get(endMark) : performance.now();
    
    if (start !== undefined) {
      const duration = end - start;
      this.measures.set(name, duration);
      console.log(`${name}: ${duration.toFixed(2)}ms`);
      return duration;
    }
  }

  getMeasure(name) {
    return this.measures.get(name);
  }

  getAllMeasures() {
    return Object.fromEntries(this.measures);
  }

  clear() {
    this.marks.clear();
    this.measures.clear();
  }
}

// Create global performance monitor instance
export const perfMonitor = new PerformanceMonitor();

/**
 * Error handling utility
 */
export class ErrorHandler {
  constructor() {
    this.errors = [];
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    window.addEventListener('error', (event) => {
      this.logError(event.error, 'JavaScript Error');
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.logError(event.reason, 'Unhandled Promise Rejection');
    });
  }

  logError(error, type = 'Error') {
    const errorInfo = {
      type,
      message: error.message || error,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.errors.push(errorInfo);
    console.error(`[${type}]`, error);

    // You could send errors to a logging service here
    this.reportError(errorInfo);
  }

  reportError(errorInfo) {
    // Placeholder for error reporting service
    // Example: send to analytics or error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Report to external service
    }
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
  }
}

// Create global error handler instance
export const errorHandler = new ErrorHandler();
