/**
 * Environment Variables Utility
 * 
 * This module provides a safe way to access environment variables in the browser.
 * It prioritizes runtime environment variables (VITE_*) and falls back to defaults.
 */

// Dictionary of environment variables with fallbacks
const ENV = {
  // API Keys (empty by default for security)
  HUGGINGFACE_API_TOKEN: import.meta.env.VITE_HUGGINGFACE_API_TOKEN || '',
  
  // API URLs
  HF_API_URL: import.meta.env.VITE_HF_API_URL || 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
  
  // Feature flags
  ENABLE_DIRECT_API: import.meta.env.VITE_ENABLE_DIRECT_API === 'true',
  ENABLE_CORS_PROXY: import.meta.env.VITE_ENABLE_CORS_PROXY !== 'false', // Enable by default
  
  // Development flags
  IS_DEVELOPMENT: import.meta.env.DEV || false,
  
  // Returns whether we have a valid API token
  get hasApiToken() {
    return !!this.HUGGINGFACE_API_TOKEN;
  },
  
  // For debugging - redacts sensitive values
  getRedactedEnv() {
    const redacted = { ...this };
    // Redact sensitive values
    if (redacted.HUGGINGFACE_API_TOKEN) {
      redacted.HUGGINGFACE_API_TOKEN = `${redacted.HUGGINGFACE_API_TOKEN.substring(0, 5)}...`;
    }
    return redacted;
  }
};

/**
 * Get an environment variable
 * @param {string} key - The environment variable key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} The environment variable value or default
 */
export function getEnv(key, defaultValue = '') {
  return ENV[key] !== undefined ? ENV[key] : defaultValue;
}

/**
 * Get the Hugging Face API token
 * @returns {string} The API token or empty string
 */
export function getHuggingFaceApiToken() {
  return ENV.HUGGINGFACE_API_TOKEN || '';
}

/**
 * Get the Hugging Face API URL
 * @returns {string} The API URL
 */
export function getHuggingFaceApiUrl() {
  return ENV.HF_API_URL;
}

/**
 * Check if we have a valid API token
 * @returns {boolean} True if we have an API token
 */
export function hasApiToken() {
  return ENV.hasApiToken;
}

/**
 * Get a redacted version of the environment for debugging
 * @returns {Object} Redacted environment object
 */
export function getDebugInfo() {
  return ENV.getRedactedEnv();
}

export default {
  getEnv,
  getHuggingFaceApiToken,
  getHuggingFaceApiUrl,
  hasApiToken,
  getDebugInfo
}; 