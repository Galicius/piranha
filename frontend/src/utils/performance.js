// Performance optimization utilities

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
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
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize images for different screen sizes
export const getOptimizedImageUrl = (url, width = 800) => {
  // For Unsplash images, add width parameter
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=80&fm=webp`;
  }
  // For Pexels images, add width parameter
  if (url.includes('pexels.com')) {
    return `${url}?w=${width}&h=${Math.round(width * 0.75)}&fit=crop&auto=compress&cs=tinysrgb`;
  }
  return url;
};

// Preload critical images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

// Batch DOM updates
export const batchDOMUpdates = (callback) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
};