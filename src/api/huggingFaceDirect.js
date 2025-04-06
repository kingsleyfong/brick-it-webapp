/**
 * HuggingFace Direct API caller
 * 
 * This implementation attempts to connect directly to the Hugging Face API
 * using various fetch configurations that might bypass CORS issues.
 */

import { getHuggingFaceApiToken, getHuggingFaceApiUrl } from '../utils/env';

// Configuration options for direct API calls
const CONFIG = {
  STEPS_FAST: 20,
  STEPS_HIGH: 30,
  GUIDANCE_SCALE: 7.5
};

/**
 * Attempts to convert a blob to base64
 * @param {Blob} blob - The blob to convert
 * @returns {Promise<string>} - Base64-encoded data URL
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Attempts to generate an image using direct methods that may bypass CORS
 * @param {string} prompt - The text prompt for image generation
 * @param {Object} options - Generation options
 * @returns {Promise<Object>} - The generation result
 */
export async function generateImageDirect(prompt, options = {}) {
  const quality = options.quality || 'high';
  const seed = options.seed || Math.floor(Math.random() * 2147483647);
  
  // Get API configuration from environment
  const HF_API_URL = getHuggingFaceApiUrl();
  const API_TOKEN = getHuggingFaceApiToken();
  
  if (!API_TOKEN) {
    console.error('[HF Direct] No API token found in environment variables');
    return {
      success: false,
      error: 'No API token configured. Please set VITE_HUGGINGFACE_API_TOKEN in your environment.',
      seed
    };
  }
  
  // Determine inference steps
  const steps = quality === 'fast' ? CONFIG.STEPS_FAST : CONFIG.STEPS_HIGH;
  
  console.log(`[HF Direct] Attempting direct generation for prompt: "${prompt}"`);
  
  // Create the request payload
  const payload = {
    inputs: prompt,
    parameters: {
      seed: seed,
      guidance_scale: CONFIG.GUIDANCE_SCALE,
      num_inference_steps: steps
    }
  };
  
  // Try different approaches
  const approaches = [
    // Approach 1: Standard fetch with credentials
    async () => {
      console.log('[HF Direct] Trying standard fetch with credentials');
      const response = await fetch(HF_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'image/jpeg,image/png,*/*'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error: ${response.status} - ${text}`);
      }
      
      const blob = await response.blob();
      return {
        success: true,
        image: await blobToBase64(blob),
        method: 'standard'
      };
    },
    
    // Approach 2: Using no-cors mode (limited but might work for images)
    async () => {
      console.log('[HF Direct] Trying no-cors mode');
      const response = await fetch(HF_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'image/jpeg,image/png,*/*'
        },
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });
      
      // With no-cors, we can't check response.ok, so we'll try to get the blob
      const blob = await response.blob();
      
      // If the blob is too small, it's probably an error
      if (blob.size < 1000) {
        throw new Error('Response too small, likely an error');
      }
      
      return {
        success: true,
        image: await blobToBase64(blob),
        method: 'no-cors'
      };
    },
    
    // Approach 3: Using the FormData API (sometimes avoids CORS in browsers)
    async () => {
      console.log('[HF Direct] Trying FormData approach');
      const formData = new FormData();
      formData.append('inputs', prompt);
      formData.append('parameters', JSON.stringify({
        seed: seed,
        guidance_scale: CONFIG.GUIDANCE_SCALE,
        num_inference_steps: steps
      }));
      
      const response = await fetch(HF_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'image/jpeg,image/png,*/*'
        },
        body: formData
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error: ${response.status} - ${text}`);
      }
      
      const blob = await response.blob();
      return {
        success: true,
        image: await blobToBase64(blob),
        method: 'formdata'
      };
    }
  ];
  
  // Try each approach, collecting errors
  const errors = [];
  
  for (const approach of approaches) {
    try {
      return await approach();
    } catch (error) {
      console.warn('[HF Direct] Approach failed:', error);
      errors.push(error.message);
    }
  }
  
  // If we get here, all approaches failed
  console.error('[HF Direct] All direct approaches failed');
  return {
    success: false,
    error: `All direct approaches failed: ${errors.join(' | ')}`,
    seed
  };
} 