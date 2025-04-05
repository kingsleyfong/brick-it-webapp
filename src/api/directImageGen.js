// Direct Image Generation API Handler - for local development
// This bypasses the need for Netlify Functions configuration

// Import fetchWithProxy from corsProxy
import { fetchWithProxy } from './corsProxy.js';

// Hugging Face API configuration
const HF_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1';

// Hardcoded API token for development only
// IMPORTANT: NEVER commit this to a public repository!
const API_TOKEN = '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'; 

// Inference steps configuration
const INFERENCE_STEPS = {
  fast: 20,
  high: 30
};

// Guidance scale configuration
const GUIDANCE_SCALE = 7.5;

// Maximum attempts for generating an image
const MAX_ATTEMPTS = 2;

/**
 * Converts ArrayBuffer to base64 string (browser compatible)
 * @param {ArrayBuffer} buffer - The array buffer to convert
 * @returns {string} - Base64 encoded string
 */
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

/**
 * Checks if the data is a valid image by testing its signature bytes
 * @param {ArrayBuffer} buffer - The array buffer to check
 * @returns {boolean} - Whether the buffer appears to be a valid image
 */
function isValidImage(buffer) {
  if (!buffer || buffer.byteLength < 8) return false;
  
  const arr = new Uint8Array(buffer);
  
  // Check for JPEG header (starts with FF D8)
  if (arr[0] === 0xFF && arr[1] === 0xD8) return true;
  
  // Check for PNG header (starts with 89 50 4E 47)
  if (arr[0] === 0x89 && arr[1] === 0x50 && arr[2] === 0x4E && arr[3] === 0x47) return true;
  
  // If we get here, it's not a recognized image format
  return false;
}

/**
 * Attempts to decode an error message from an API response
 * @param {ArrayBuffer} buffer - The array buffer containing the response
 * @returns {string} - The decoded error message or "Unknown error"
 */
function decodeErrorMessage(buffer) {
  try {
    const text = new TextDecoder().decode(buffer);
    
    // Try to parse as JSON
    try {
      const json = JSON.parse(text);
      if (json.error) return json.error;
    } catch (e) {
      // Not JSON, continue
    }
    
    // Check for common error messages
    if (text.includes('loading') || text.includes('still warming up')) {
      return 'Model is loading, please try again in a few moments';
    }
    
    // Return the text if it's short, or a truncated version
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  } catch (e) {
    return "Unknown error (could not decode response)";
  }
}

/**
 * Direct image generation function - for use during local development
 * @param {string} prompt - The text prompt for image generation
 * @param {string} quality - Quality setting ('fast' or 'high')
 * @param {number} seed - Optional seed value for reproducible results
 * @returns {Promise<Object>} Generated image response
 */
export async function generateImage(prompt, quality = 'high', seed = null) {
  let attemptCount = 0;
  
  while (attemptCount < MAX_ATTEMPTS) {
    attemptCount++;
    console.log(`Attempt ${attemptCount}/${MAX_ATTEMPTS} to generate image`);
    
    try {
      if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
        throw new Error('A text prompt is required');
      }

      // Use the original prompt without LEGO-specific modifications
      // This allows creating regular images that will later be converted to LEGO mosaics
      const enhancedPrompt = prompt;

      // Determine inference steps based on quality setting
      let steps = INFERENCE_STEPS.high; // Default to high quality
      
      if (quality === 'fast') {
        steps = INFERENCE_STEPS.fast;
      }

      console.log(`Generating image for prompt: "${enhancedPrompt}", quality: ${quality}, steps: ${steps}, seed: ${seed || 'random'}`);

      // Generate a random seed if not provided
      const usedSeed = seed ? parseInt(seed) : Math.floor(Math.random() * 2147483647);

      // Configure the request options
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'image/jpeg,image/png,image/*'
        },
        body: JSON.stringify({ 
          inputs: enhancedPrompt,
          parameters: {
            seed: usedSeed,
            guidance_scale: GUIDANCE_SCALE,
            num_inference_steps: steps
          }
        }),
      };

      // Make multiple attempts with different methods
      let response = null;
      let lastError = null;
      
      // Try our CORS proxy approach
      try {
        console.log("About to call API with fetchWithProxy");
        response = await fetchWithProxy(HF_API_URL, requestOptions);
        console.log("API response received:", { status: response.status, ok: response.ok });
      } catch (error) {
        console.error("CORS proxy request failed:", error);
        lastError = error;
      }
      
      // If we still don't have a successful response, give up
      if (!response || !response.ok) {
        let errorMessage = 'Failed to connect to Hugging Face API';
        let errorDetails = '';
        
        // Try to extract helpful error information
        if (response) {
          try {
            const errorText = await response.text();
            if (errorText.includes('/corsdemo')) {
              errorMessage = 'CORS proxy requires demo completion';
              errorDetails = 'The CORS proxy needs authorization. Please try again or use a different quality setting.';
            } else if (response.status === 503) {
              errorMessage = 'Model is still loading';
              errorDetails = 'The AI model is warming up. Please try again in a few moments.';
              
              return {
                success: false,
                isLoading: true,
                error: errorMessage,
                details: errorDetails
              };
            } else {
              errorDetails = errorText;
            }
          } catch (textError) {
            errorDetails = `Error status: ${response.status}`;
          }
        } else if (lastError) {
          errorDetails = lastError.message;
        }
        
        // If we've tried multiple times, give up
        if (attemptCount >= MAX_ATTEMPTS) {
          throw new Error(`${errorMessage}: ${errorDetails}`);
        } else {
          console.warn(`Attempt ${attemptCount} failed: ${errorMessage}: ${errorDetails}`);
          // Continue to next attempt
          continue;
        }
      }

      // Get image as ArrayBuffer and convert to base64
      const imageArrayBuffer = await response.arrayBuffer();
      console.log("Received image data of size:", imageArrayBuffer.byteLength);
      
      // Validate that we received actual image data, not an error response
      if (imageArrayBuffer.byteLength < 1000 || !isValidImage(imageArrayBuffer)) {
        // Small responses are likely error messages, not images
        const errorMsg = decodeErrorMessage(imageArrayBuffer);
        
        if (errorMsg.includes("loading") || errorMsg.includes("warming up") || errorMsg.includes("still warming")) {
          return {
            success: false,
            isLoading: true,
            error: 'Model is loading, please try again in a few moments',
          };
        }
        
        // If the response is corrupt or invalid and we haven't tried enough times, try again
        if (attemptCount < MAX_ATTEMPTS) {
          console.warn(`Received invalid data (${imageArrayBuffer.byteLength} bytes), retrying...`);
          continue;
        }
        
        throw new Error(`API returned invalid data: ${errorMsg}`);
      }
      
      // Validate one more time that this looks like an image
      if (!isValidImage(imageArrayBuffer)) {
        if (attemptCount < MAX_ATTEMPTS) {
          console.warn(`Response doesn't appear to be a valid image, retrying...`);
          continue;
        }
        throw new Error(`API returned data that doesn't appear to be a valid image`);
      }
      
      // Convert the ArrayBuffer to a base64 string
      const base64Image = arrayBufferToBase64(imageArrayBuffer);
      
      // Return the base64-encoded image with metadata
      return {
        success: true,
        image: `data:image/jpeg;base64,${base64Image}`,
        quality: quality,
        steps: steps,
        seed: usedSeed,
      };
    } catch (error) {
      // If we've tried enough times, give up
      if (attemptCount >= MAX_ATTEMPTS) {
        console.error('Error generating image after multiple attempts:', error);
        return { 
          success: false,
          error: `Failed to generate image: ${error.message}`,
        };
      }
      
      // Otherwise continue to next attempt
      console.warn(`Attempt ${attemptCount} failed:`, error);
    }
  }
  
  // If we get here, all attempts failed
  return {
    success: false,
    error: `Failed to generate image after ${MAX_ATTEMPTS} attempts`,
  };
} 