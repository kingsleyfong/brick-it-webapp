/**
 * Model caching utilities
 * 
 * This is a simplified version of the model cache that focuses on reliability
 */

// Cache keys for localStorage
const MODEL_CACHE_KEY = 'transformers_model_cache_v2';
const MODEL_VERSION_KEY = 'transformers_model_version';
const CURRENT_VERSION = '2.0.0';

/**
 * Check if a model is already cached
 * @param {string} modelId - The model identifier
 * @returns {boolean} - Whether the model is cached
 */
export const isModelCached = (modelId) => {
  try {
    const cache = JSON.parse(localStorage.getItem(MODEL_CACHE_KEY) || '{}');
    return !!cache[modelId];
  } catch (error) {
    console.error('Error checking model cache:', error);
    return false;
  }
};

/**
 * Mark a model as cached
 * @param {string} modelId - The model identifier
 */
export const markModelAsCached = (modelId) => {
  try {
    // Get existing cache
    const cache = JSON.parse(localStorage.getItem(MODEL_CACHE_KEY) || '{}');
    
    // Add this model
    cache[modelId] = {
      timestamp: Date.now(),
      version: CURRENT_VERSION
    };
    
    // Save to localStorage
    localStorage.setItem(MODEL_CACHE_KEY, JSON.stringify(cache));
    localStorage.setItem(MODEL_VERSION_KEY, CURRENT_VERSION);
  } catch (error) {
    console.error('Error marking model as cached:', error);
  }
};

/**
 * Clear the model cache
 */
export const clearModelCache = () => {
  try {
    localStorage.removeItem(MODEL_CACHE_KEY);
    localStorage.setItem(MODEL_VERSION_KEY, CURRENT_VERSION);
  } catch (error) {
    console.error('Error clearing model cache:', error);
  }
};

/**
 * Get the list of cached models
 * @returns {string[]} - Array of cached model IDs
 */
export const getCachedModels = () => {
  try {
    const cache = JSON.parse(localStorage.getItem(MODEL_CACHE_KEY) || '{}');
    return Object.keys(cache);
  } catch (error) {
    console.error('Error getting cached models:', error);
    return [];
  }
};

/**
 * Check if WebAssembly is supported in this browser
 * @returns {Promise<boolean>} - Whether WebAssembly is supported
 */
export const checkWebAssemblySupport = async () => {
  try {
    // Basic WebAssembly checks
    if (typeof WebAssembly !== 'object') {
      console.log("WebAssembly is not supported as an object");
      return false;
    }
    
    if (typeof WebAssembly.instantiate !== 'function') {
      console.log("WebAssembly.instantiate is not a function");
      return false;
    }
    
    // Test a minimal WebAssembly module
    const bytes = new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,7,8,1,4,116,101,115,116,0,0,10,4,1,2,0,11]);
    const module = await WebAssembly.compile(bytes);
    const instance = await WebAssembly.instantiate(module);
    
    return true;
  } catch (error) {
    console.warn('WebAssembly support test failed:', error);
    return false;
  }
};

export default {
  isModelCached,
  markModelAsCached,
  clearModelCache,
  getCachedModels,
  checkWebAssemblySupport
}; 