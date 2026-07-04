import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

if (typeof window !== 'undefined') {
  const store = {};
  
  Storage.prototype.getItem = vi.fn(function(key) {
    return key in store ? store[key] : null;
  });
  
  Storage.prototype.setItem = vi.fn(function(key, value) {
    store[key] = String(value);
  });
  
  Storage.prototype.removeItem = vi.fn(function(key) {
    delete store[key];
  });
  
  Storage.prototype.clear = vi.fn(function() {
    for (const key in store) {
      delete store[key];
    }
  });

  // Ensure window.localStorage inherits from Storage.prototype
  if (!window.localStorage || typeof window.localStorage.clear !== 'function') {
    Object.defineProperty(window, 'localStorage', {
      value: Object.create(Storage.prototype),
      configurable: true,
      writable: true
    });
  }
}
