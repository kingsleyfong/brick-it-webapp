/**
 * Image generation utilities for LEGO Brick-It App
 * 
 * This module implements 100% browser-based image generation for LEGO
 * minifigures and scenes using Transformers.js.
 */

import { pipeline, env, AutoProcessor, RawImage } from '@xenova/transformers';

// ===== CONFIGURATION =====
// Configure optimal settings for browser-based generation
env.allowLocalModels = false;        // Always load from HF Hub
env.useBrowserCache = true;          // Use browser cache for faster loading
env.cacheDir = './models';           // Set cache directory
env.useCustomCache = true;           // Enable custom cache handler
env.localURL = undefined;            // Don't use local models
env.useAliasPath = false;            // Don't use alias paths
env.backends.onnx.wasm.numThreads = 1;  // Single thread for better reliability
env.backends.onnx.wasm.simd = true;  // Enable SIMD if available
env.backends.onnx.wasm.proxy = false;  // Don't use proxy
env.backends.onnx.format = 'uint8';  // Use quantized models when available

// ===== MODEL CONFIGURATION =====
// Fast model - works in nearly all browsers
const FAST_MODEL = {
  id: 'Xenova/tiny-stable-diffusion',
  pipeline: 'text-to-image',
  steps: 2,
  guidance: 3.0,
  negative_prompt: 'blurry, bad quality, weird colors',
  width: 256,
  height: 256
};

// Medium model - good quality and still quite reliable
const MEDIUM_MODEL = {
  id: 'Xenova/sdxl-turbo-small',
  pipeline: 'text-to-image',
  steps: 3,
  guidance: 0,  // SDXL Turbo works best with 0 guidance
  negative_prompt: 'blurry, low quality, distorted, bad anatomy',
  width: 512,
  height: 512
};

// ===== PIPELINE CACHE =====
// Cache for pipelines so we only load once
const pipelineCache = new Map();

/**
 * Main function to generate an image from a prompt
 * @param {Object} options - Generation options
 * @returns {Promise<Object>} Generated image data
 */
async function generateImageFromPrompt({
  prompt,
  quality = 'fast',
  onProgress = () => {},
  seed = Math.floor(Math.random() * 2147483647)
}) {
  // Start progress tracking
  onProgress({ status: 'starting', message: 'Starting image generation...', progress: 0 });
  
  // Choose the right model configuration based on quality setting
  const modelConfig = quality === 'high' ? MEDIUM_MODEL : FAST_MODEL;
  console.log(`Using model: ${modelConfig.id} for quality setting: ${quality}`);
  
  try {
    // Update with loading message
    onProgress({ 
      status: 'loading', 
      message: `Loading ${modelConfig.id.split('/').pop()} model...`, 
      progress: 5 
    });

    // Enhance the prompt for better LEGO-specific results
    const enhancedPrompt = enhancePromptForLego(prompt);
    console.log(`Enhanced prompt: ${enhancedPrompt}`);
    
    // Get the pipeline
    const generator = await initializeTextToImagePipeline(modelConfig.id, onProgress);
    
    // Generation parameters
    const params = {
      prompt: enhancedPrompt,
      negative_prompt: modelConfig.negative_prompt,
      num_inference_steps: modelConfig.steps,
      guidance_scale: modelConfig.guidance,
      width: modelConfig.width,
      height: modelConfig.height,
      seed: seed
    };
    
    // Progress step callback
    const stepsCallback = ({ step, steps }) => {
      const progress = 30 + Math.floor((step / steps) * 65);
      onProgress({ 
        status: 'generating', 
        message: `Generating image: step ${step}/${steps}`, 
        progress
      });
    };
    
    // Add the callback to params
    params.callback_steps = 1;
    params.callback = stepsCallback;
    
    // Start generation
    onProgress({ status: 'generating', message: 'Creating your image...', progress: 30 });
    console.log(`Starting generation with params:`, params);
    
    // Run the generator
    const result = await generator(params);
    console.log('Generation complete, processing result');
    
    // Finalize the image
    onProgress({ status: 'finishing', message: 'Finalizing image...', progress: 95 });
    
    // Get the image URL
    let imageUrl;
    if (result && result.length > 0) {
      if (result[0].data_url) {
        imageUrl = result[0].data_url;
      } else {
        imageUrl = URL.createObjectURL(result[0].blob || result[0]);
      }
    } else {
      throw new Error('No image was generated');
    }
    
    // Return the result
    onProgress({ status: 'complete', message: 'Image generation complete!', progress: 100 });
    return {
      imageUrl,
      seed,
      modelId: modelConfig.id,
      isPremium: true,
      isAI: true
    };
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error(`Failed to generate image: ${error.message}`);
  }
}

/**
 * Initialize a text-to-image pipeline
 * @param {string} modelId - Model ID to use
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Function>} The pipeline function
 */
async function initializeTextToImagePipeline(modelId, onProgress) {
  // Check if pipeline is cached
  const cacheKey = `${modelId}:text-to-image`;
  if (pipelineCache.has(cacheKey)) {
    console.log(`Using cached pipeline for ${modelId}`);
    return pipelineCache.get(cacheKey);
  }
  
  try {
    // Configure progress callback
    env.progressCallback = (data) => {
      if (data.status === 'progress') {
        console.log(`Model loading progress: ${data.file} - ${Math.round(data.progress * 100)}%`);
        onProgress({ 
          status: 'loading', 
          message: `Loading model: ${data.file} (${Math.round(data.progress * 100)}%)`, 
          progress: 5 + Math.round(data.progress * 20)
        });
      } else if (data.status === 'init') {
        console.log('Initializing pipeline');
        onProgress({ 
          status: 'initializing', 
          message: 'Initializing pipeline...', 
          progress: 25 
        });
      }
    };
    
    console.log(`Creating text-to-image pipeline for ${modelId}`);
    
    // Force-configure environment options for reliability
    const pipelinePromise = pipeline('text-to-image', modelId, {
      cache_dir: env.cacheDir,
      local_files_only: false,
      quantized: true
    });
    
    // Add a timeout to prevent infinite loading
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Pipeline initialization timed out')), 60000);
    });
    
    // Race between pipeline creation and timeout
    const pipe = await Promise.race([pipelinePromise, timeoutPromise]);
    
    // Cache the pipeline
    pipelineCache.set(cacheKey, pipe);
    console.log(`Successfully created pipeline for ${modelId}`);
    
    return pipe;
  } catch (error) {
    console.error(`Failed to create pipeline for ${modelId}:`, error);
    throw error;
  }
}

/**
 * Enhance a prompt to be more LEGO-specific
 * @param {string} prompt - The original prompt
 * @returns {string} The unmodified prompt
 */
function enhancePromptForLego(prompt) {
  // Return the unmodified prompt to generate regular images
  // These images will later be converted to LEGO mosaics by the application
  return prompt;
}

/**
 * Check if WebAssembly is supported in this browser
 * @returns {Promise<boolean>} Whether WebAssembly is supported
 */
async function checkWebAssemblySupport() {
  try {
    // Basic WebAssembly object check
    if (typeof WebAssembly !== 'object') {
      return false;
    }
    
    // Basic instantiate function check
    if (typeof WebAssembly.instantiate !== 'function') {
      return false;
    }
    
    // Test a small module
    const bytes = new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,7,8,1,4,116,101,115,116,0,0,10,4,1,2,0,11]);
    const module = await WebAssembly.compile(bytes);
    const instance = await WebAssembly.instantiate(module);
    
    return typeof instance.exports.test === 'function';
  } catch (error) {
    console.warn('WebAssembly support check failed:', error);
    return false;
  }
}

/**
 * Get available model info from the model config
 */
async function getAvailableModels() {
  try {
    const response = await fetch('/models/models.json');
    if (!response.ok) {
      throw new Error('Failed to load models configuration');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error loading models configuration:', error);
    // Return basic default models
    return {
      models: {
        default: FAST_MODEL.id,
        alternatives: [
          {
            id: FAST_MODEL.id,
            name: "Tiny Stable Diffusion",
            description: "Fast, reliable image generation"
          },
          {
            id: MEDIUM_MODEL.id,
            name: "SDXL Turbo Small",
            description: "Better quality, still fast"
          }
        ]
      }
    };
  }
}

// ===== EXPORTS =====
export {
  generateImageFromPrompt,
  initializeTextToImagePipeline,
  enhancePromptForLego,
  checkWebAssemblySupport,
  getAvailableModels
};




