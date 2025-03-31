/**
 * Model caching utilities
 * 
 * Helps manage model caching and provides hooks for UI feedback
 */

const MODEL_CACHE_KEY = 'transformers_model_cache';
const MODEL_VERSION_KEY = 'model_version';
const CURRENT_VERSION = '1.0.0';

/**
 * Check if the model is already cached in browser storage
 * @param {string} modelId - The model identifier
 * @returns {Promise<boolean>} - True if the model is cached
 */
export const isModelCached = async (modelId) => {
  try {
    // Check if we have a record of this model in the cache
    const cache = JSON.parse(localStorage.getItem(MODEL_CACHE_KEY) || '{}');
    
    if (!cache[modelId]) {
      return false;
    }
    
    // Check if the cached model version matches the current version
    const cachedVersion = localStorage.getItem(MODEL_VERSION_KEY);
    if (cachedVersion !== CURRENT_VERSION) {
      // Clear cache if version mismatch
      localStorage.removeItem(MODEL_CACHE_KEY);
      localStorage.setItem(MODEL_VERSION_KEY, CURRENT_VERSION);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking model cache:', error);
    return false;
  }
};

/**
 * Mark a model as cached for future reference
 * @param {string} modelId - The model identifier
 */
export const markModelAsCached = (modelId) => {
  try {
    // Update the cache record
    const cache = JSON.parse(localStorage.getItem(MODEL_CACHE_KEY) || '{}');
    cache[modelId] = {
      timestamp: Date.now(),
      version: CURRENT_VERSION
    };
    
    localStorage.setItem(MODEL_CACHE_KEY, JSON.stringify(cache));
    localStorage.setItem(MODEL_VERSION_KEY, CURRENT_VERSION);
  } catch (error) {
    console.error('Error marking model as cached:', error);
  }
};

/**
 * Estimate download size for a model
 * @param {string} modelId - The model identifier
 * @returns {number} - Estimated download size in MB
 */
export const estimateModelSize = (modelId) => {
  if (modelId.includes('sdxl-turbo')) {
    return 250; // SDXL models are larger
  } else if (modelId.includes('sd-turbo-quantized')) {
    return 120; // Quantized models are smaller
  } else if (modelId.includes('lego-diffusion')) {
    return 220; // LEGO specific model size estimate
  } else if (modelId.includes('prompthero')) {
    return 160; // PromptHero models estimate
  } else {
    return 200; // Default estimate
  }
};

/**
 * Get available models from configuration
 * @returns {Promise<Object>} - Available models configuration
 */
export const getAvailableModels = async () => {
  try {
    const response = await fetch('/models/models.json');
    if (!response.ok) {
      throw new Error('Failed to load models configuration');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error loading models configuration:', error);
    // Return default models if configuration loading fails
    return {
      models: {
        default: "Xenova/minisd-lego-diffusers",
        alternatives: [
          {
            id: "Xenova/sd-turbo-quantized",
            name: "Stable Diffusion Turbo (Quantized)",
            description: "Smaller model, faster generation, lower quality"
          }
        ]
      }
    };
  }
};

/**
 * Check if the browser's WebAssembly implementation supports the features
 * needed for transformers.js
 */
export const checkWebAssemblySupport = () => {
  try {
    console.log("🔍 Checking WebAssembly support...");
    
    // First verify if WebAssembly is available in the browser
    if (typeof WebAssembly !== 'object') {
      console.log("❌ WebAssembly is not an object");
      return false;
    }
    console.log("✅ WebAssembly is an object");
    
    // Basic check for WebAssembly instantiate function
    if (typeof WebAssembly.instantiate !== 'function') {
      console.log("❌ WebAssembly.instantiate is not a function");
      return false;
    }
    console.log("✅ WebAssembly.instantiate is a function");
    
    // For this specific application in modern browsers, we'll force enable
    // most Chrome/Edge browsers since they're known to work with transformers.js
    const userAgent = navigator.userAgent.toLowerCase();
    console.log("🔍 User agent:", userAgent);
    
    // Chrome or Edge?
    const isChrome = userAgent.includes('chrome');
    const isEdge = userAgent.includes('edg');
    // Firefox?
    const isFirefox = userAgent.includes('firefox') && !userAgent.includes('mobile');
    // Safari?
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
    
    console.log("Browser detection:", { isChrome, isEdge, isFirefox, isSafari });
    
    // Hard override for Chrome and Edge - they generally support WASM features we need
    if (isChrome || isEdge) {
      console.log("✅ Chrome or Edge detected, enabling WebAssembly support");
      return true;
    }
    
    // Firefox and Safari also generally support what we need
    if (isFirefox || isSafari) {
      console.log("✅ Firefox or Safari detected, enabling WebAssembly support");
      return true;
    }
    
    // For all other browsers, continue with more detailed checks
    
    // Check for SharedArrayBuffer support (needed for threading)
    const hasSharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined';
    console.log("🔍 SharedArrayBuffer support:", hasSharedArrayBuffer);
    
    // Check for WebAssembly.Memory with shared flag
    let hasSharedMemory = false;
    try {
      hasSharedMemory = !!new WebAssembly.Memory({initial: 1, maximum: 1, shared: true});
      console.log("✅ WebAssembly shared memory is supported");
    } catch (e) {
      console.log("❌ WebAssembly shared memory is not supported:", e.message);
      hasSharedMemory = false;
    }
    
    // In some environments, we might be fine without shared memory
    // but in that case, we'll check a minimal WebAssembly module can load
    if (hasSharedArrayBuffer || hasSharedMemory) {
      return true;
    }
    
    // Final fallback test - try to instantiate a simple WebAssembly module
    console.log("🔍 Attempting to instantiate a simple WebAssembly module...");
    const bytes = new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,7,8,1,4,109,97,105,110,0,0,10,3,1,1,0,11]);
    
    // For async instantiation, we'll return a promise that resolves to true if successful
    return WebAssembly.instantiate(bytes)
      .then(result => {
        console.log("✅ Successfully instantiated WebAssembly module");
        return true;
      })
      .catch(error => {
        console.log("❌ Failed to instantiate WebAssembly module:", error);
        return false;
      });
  } catch (error) {
    console.error("❌ Error checking WebAssembly support:", error);
    return false;
  }
}; 