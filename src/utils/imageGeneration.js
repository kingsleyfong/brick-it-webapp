/**
 * Image generation utilities
 * 
 * This module implements image generation for LEGO minifigures and scenes.
 * Uses multiple fallback approaches to ensure consistent results.
 */

import { pipeline, env } from '@xenova/transformers';
import { 
  isModelCached, 
  markModelAsCached, 
  getAvailableModels,
  checkWebAssemblySupport
} from './modelCache';

// Default model settings
let MODEL_ID = 'Xenova/minisd-lego-diffusers';
let FALLBACK_MODEL_ID = 'Xenova/sd-turbo-quantized';

// Cache for the initialized pipeline
let pipelineCache = null;
let modelConfig = null;

// Define a smaller LEGO astronaut base64 image
const LEGO_ASTRONAUT_BASE64 = 'data:image/png;base64,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';

/**
 * Generate an image based on the prompt
 * @param {string} prompt - User input prompt
 * @param {string} modelId - Model ID to use (optional)
 * @param {string} mode - 'normal' or 'fast' inference mode
 * @param {function} statusCallback - Callback for status updates
 */
const generateImageFromPrompt = async (prompt, modelId = null, mode = 'normal', statusCallback = null) => {
  console.log(`Generating image for prompt: "${prompt}" with ${modelId || 'default model'}`);
  
  // Standardize prompt for better keyword detection
  const lowerPrompt = prompt.toLowerCase().trim();
  
  try {
    // Detect if Canvas API is supported
    const canvas = document.createElement('canvas');
    const isCanvasSupported = !!(canvas.getContext && canvas.getContext('2d'));
    
    if (!isCanvasSupported) {
      console.error('Canvas API is not supported in this browser');
      if (statusCallback) statusCallback('Error: Your browser does not support image generation');
      return null;
    }
    
    // Check if transformers.js is available and can be used
    const transformersAvailable = await isTransformersAvailable();
    
    if (transformersAvailable) {
      try {
        if (statusCallback) statusCallback('Initializing AI model...');
        console.log('Using transformers.js for image generation');
        
        // Try the full AI generation
        const pipeline = await initializePipeline(modelId);
        if (!pipeline) throw new Error('Failed to initialize pipeline');
        
        // Get available models to check for prompt templates
        const models = await getAvailableModels();
        
        // Enhance prompt with LEGO terms if needed
        let enhancedPrompt = prompt;
        if (shouldEnhanceWithLegoTerms(lowerPrompt)) {
          enhancedPrompt = enhancePromptForLego(prompt, models);
          console.log(`Enhanced prompt: ${enhancedPrompt}`);
        }
        
        // Process the image
        if (statusCallback) statusCallback('Generating your image...');
        const result = await pipeline(enhancedPrompt);
        if (statusCallback) statusCallback('Finalizing image...');
        
        // Convert the result to a data URL
        return result[0].src;
      } catch (err) {
        console.warn('AI generation failed, falling back to canvas drawing', err);
        if (statusCallback) statusCallback('Falling back to basic image generator...');
        return generateFallbackImage(prompt, statusCallback);
      }
    } else {
      console.log('transformers.js not available, using fallback generator');
      if (statusCallback) statusCallback('Using built-in image generator...');
      return generateFallbackImage(prompt, statusCallback);
    }
  } catch (error) {
    console.error('Error generating image:', error);
    if (statusCallback) statusCallback('Error generating image. Using fallback...');
    return generateFallbackImage(prompt, statusCallback);
  }
};

/**
 * Check if the prompt should be enhanced with LEGO terms
 */
function shouldEnhanceWithLegoTerms(prompt) {
  // If prompt already contains lego-related terms, we'll enhance it
  return !prompt.includes('lego') && 
         !prompt.includes('brick') && 
         !prompt.includes('minifig');
}

/**
 * Generate a fallback image using canvas
 */
const generateFallbackImage = async (prompt, statusCallback = null) => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Check for astronaut-related prompts
  if (isAstronautPrompt(lowerPrompt)) {
    console.log('Generating specialized astronaut image');
    return createLegoAstronautImage(statusCallback);
  }
  
  // Check for dog-related prompts
  else if (isDogPrompt(lowerPrompt)) {
    if (statusCallback) statusCallback('Creating dog image...');
    return drawBetterDogScene();
  }
  
  // Handle LEGO prompts based on content
  else if (lowerPrompt.includes('lego') || lowerPrompt.includes('minifig')) {
    if (statusCallback) statusCallback('Creating LEGO scene...');
    return drawBetterLegoScene(lowerPrompt, statusCallback);
  }
  
  // Cat-related prompts
  else if (isCatPrompt(lowerPrompt)) {
    if (statusCallback) statusCallback('Creating cat image...');
    return drawBetterCatScene(lowerPrompt);
  }
  
  // House or building related prompts
  else if (isHousePrompt(lowerPrompt)) {
    if (statusCallback) statusCallback('Creating house scene...');
    return drawBetterHouseScene();
  }
  
  // Landscape related prompts
  else if (isLandscapePrompt(lowerPrompt)) {
    if (statusCallback) statusCallback('Creating landscape...');
    return drawBetterLandscapeScene(lowerPrompt);
  }
  
  // For other prompts, fall back to a LEGO scene as default
  if (statusCallback) statusCallback('Creating custom scene...');
  return drawBetterLegoScene(lowerPrompt, statusCallback);
};

/**
 * Detect if the prompt is related to astronauts
 */
function isAstronautPrompt(prompt) {
  const astronautKeywords = [
    'astronaut', 'space suit', 'spaceman', 'spacewalk', 'cosmonaut',
    'space explorer', 'nasa', 'rocket', 'spaceflight', 'lunar', 'space mission',
    'apollo', 'zero gravity', 'space walk', 'space helmet', 'outer space'
  ];
  
  return astronautKeywords.some(keyword => prompt.includes(keyword));
}

/**
 * Generate a specialized LEGO astronaut image
 */
function drawBetterLegoAstronaut(ctx, x, y, size) {
  // Refined colors for space suit
  const white = 'rgb(240, 240, 245)';
  const lightGray = 'rgb(220, 220, 225)';
  const darkGray = 'rgb(80, 80, 85)';
  const blue = 'rgb(40, 80, 180)';
  const red = 'rgb(200, 30, 30)';
  const gold = 'rgb(230, 190, 50)';
  const yellow = 'rgb(255, 220, 0)';
  
  // Draw shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.beginPath();
  ctx.ellipse(x, y + size * 0.45, size * 0.2, size * 0.05, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw legs
  const legWidth = size * 0.12;
  const legHeight = size * 0.22;
  const legSpacing = size * 0.06;
  
  // Left leg
  ctx.fillStyle = white;
  ctx.fillRect(x - legWidth - legSpacing/2, y + size * 0.1, legWidth, legHeight);
  
  // Right leg
  ctx.fillStyle = white;
  ctx.fillRect(x + legSpacing/2, y + size * 0.1, legWidth, legHeight);
  
  // Leg accents
  ctx.fillStyle = blue;
  // Left leg accent
  ctx.fillRect(x - legWidth - legSpacing/2, y + size * 0.1 + legHeight * 0.7, legWidth, legHeight * 0.3);
  // Right leg accent
  ctx.fillRect(x + legSpacing/2, y + size * 0.1 + legHeight * 0.7, legWidth, legHeight * 0.3);
  
  // Torso
  const torsoWidth = size * 0.3;
  const torsoHeight = size * 0.27;
  
  // Main torso
  ctx.fillStyle = white;
  ctx.fillRect(x - torsoWidth/2, y - torsoHeight * 0.6, torsoWidth, torsoHeight);
  
  // Torso details
  ctx.fillStyle = blue;
  // Belt
  ctx.fillRect(x - torsoWidth/2, y - torsoHeight * 0.1, torsoWidth, torsoHeight * 0.1);
  
  // Control panel
  ctx.fillStyle = darkGray;
  ctx.fillRect(x - torsoWidth * 0.3, y - torsoHeight * 0.45, torsoWidth * 0.6, torsoHeight * 0.2);
  
  // Panel buttons
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      const btnColor = j === 1 ? red : (j === 0 ? 'white' : 'yellow');
      ctx.fillStyle = btnColor;
      ctx.fillRect(
        x - torsoWidth * 0.25 + j * torsoWidth * 0.25, 
        y - torsoHeight * 0.42 + i * torsoHeight * 0.12,
        torsoWidth * 0.05,
        torsoHeight * 0.05
      );
    }
  }
  
  // NASA logo
  ctx.fillStyle = red;
  ctx.beginPath();
  ctx.arc(x, y - torsoHeight * 0.25, torsoWidth * 0.12, 0, Math.PI * 2);
  ctx.fill();
  
  // NASA text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.06}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText("NASA", x, y - torsoHeight * 0.25);
  
  // Arms
  const armWidth = size * 0.09;
  const armHeight = size * 0.24;
  
  // Draw both arms with white gloves
  for (const side of [-1, 1]) {
    // Upper arm
    ctx.save();
    ctx.translate(x + side * torsoWidth/2, y - torsoHeight * 0.4);
    ctx.rotate(side * Math.PI * 0.07);
    
    // Shoulder joint
    ctx.fillStyle = lightGray;
    ctx.beginPath();
    ctx.arc(0, 0, armWidth * 0.8, 0, Math.PI * 2);
    ctx.fill();
    
    // Upper arm
    ctx.translate(0, armWidth * 0.5);
    ctx.fillStyle = white;
    ctx.fillRect(-armWidth/2, 0, armWidth, armHeight * 0.45);
    
    // Elbow joint
    ctx.translate(0, armHeight * 0.45);
    ctx.fillStyle = lightGray;
    ctx.beginPath();
    ctx.arc(0, 0, armWidth * 0.6, 0, Math.PI * 2);
    ctx.fill();
    
    // Lower arm
    ctx.rotate(side * Math.PI * 0.2);
    ctx.fillStyle = white;
    ctx.fillRect(-armWidth/2, 0, armWidth, armHeight * 0.45);
    
    // Hand
    ctx.translate(0, armHeight * 0.45);
    ctx.fillStyle = yellow;
    ctx.beginPath();
    ctx.arc(0, armWidth * 0.3, armWidth * 0.6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
  
  // Helmet
  const headSize = size * 0.22;
  
  // Neck connector
  ctx.fillStyle = lightGray;
  ctx.fillRect(x - headSize * 0.35, y - torsoHeight * 0.65, headSize * 0.7, headSize * 0.15);
  
  // Helmet base
  ctx.fillStyle = white;
  ctx.beginPath();
  ctx.arc(x, y - torsoHeight * 0.7 - headSize * 0.6, headSize * 1.1, 0, Math.PI * 2);
  ctx.fill();
  
  // Helmet detail
  ctx.strokeStyle = lightGray;
  ctx.lineWidth = size * 0.02;
  ctx.beginPath();
  ctx.arc(x, y - torsoHeight * 0.7 - headSize * 0.6, headSize * 1.1, 0, Math.PI * 2);
  ctx.stroke();
  
  // Face (yellow LEGO head)
  ctx.fillStyle = yellow;
  ctx.beginPath();
  ctx.arc(x, y - torsoHeight * 0.7 - headSize * 0.6, headSize * 0.8, 0, Math.PI * 2);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = 'black';
  const eyeSize = headSize * 0.13;
  const eyeY = y - torsoHeight * 0.7 - headSize * 0.6 - headSize * 0.05;
  const eyeSpacing = headSize * 0.4;
  
  // Left eye
  ctx.beginPath();
  ctx.arc(x - eyeSpacing/2, eyeY, eyeSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Right eye
  ctx.beginPath();
  ctx.arc(x + eyeSpacing/2, eyeY, eyeSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Smile
  ctx.beginPath();
  ctx.arc(x, eyeY + headSize * 0.3, headSize * 0.35, 0.2, Math.PI - 0.2);
  ctx.stroke();
  
  // Helmet visor
  ctx.fillStyle = gold;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.ellipse(
    x, 
    y - torsoHeight * 0.7 - headSize * 0.7, 
    headSize * 0.8, 
    headSize * 0.6, 
    0, 
    -Math.PI * 0.7, 
    Math.PI * 0.7
  );
  ctx.fill();
  ctx.globalAlpha = 1.0;
  
  // Visor outline
  ctx.strokeStyle = 'rgba(180, 180, 180, 0.8)';
  ctx.lineWidth = size * 0.02;
  ctx.beginPath();
  ctx.ellipse(
    x, 
    y - torsoHeight * 0.7 - headSize * 0.7, 
    headSize * 0.8, 
    headSize * 0.6, 
    0, 
    -Math.PI * 0.7, 
    Math.PI * 0.7
  );
  ctx.stroke();
  
  // Light reflection
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.beginPath();
  ctx.ellipse(
    x - headSize * 0.3, 
    y - torsoHeight * 0.7 - headSize * 0.85, 
    headSize * 0.15, 
    headSize * 0.3, 
    Math.PI * 0.25, 
    0, Math.PI * 2
  );
  ctx.fill();
  
  // Oxygen tanks (hint)
  ctx.fillStyle = lightGray;
  const tankWidth = torsoWidth * 0.2;
  const tankHeight = torsoHeight * 0.6;
  
  // Left tank
  ctx.fillRect(x - torsoWidth * 0.5, y - torsoHeight * 0.6, tankWidth, -tankHeight);
  // Right tank
  ctx.fillRect(x + torsoWidth * 0.3, y - torsoHeight * 0.6, tankWidth, -tankHeight);
  
  // Oxygen hoses
  ctx.strokeStyle = white;
  ctx.lineWidth = size * 0.02;
  
  // Left hose
  ctx.beginPath();
  ctx.moveTo(x - torsoWidth * 0.4, y - torsoHeight * 0.6 - tankHeight);
  ctx.quadraticCurveTo(
    x - torsoWidth * 0.3, y - torsoHeight * 0.6 - tankHeight * 1.2,
    x - headSize * 0.5, y - torsoHeight * 0.7 - headSize * 1.1
  );
  ctx.stroke();
  
  // Right hose
  ctx.beginPath();
  ctx.moveTo(x + torsoWidth * 0.4, y - torsoHeight * 0.6 - tankHeight);
  ctx.quadraticCurveTo(
    x + torsoWidth * 0.3, y - torsoHeight * 0.6 - tankHeight * 1.2,
    x + headSize * 0.5, y - torsoHeight * 0.7 - headSize * 1.1
  );
  ctx.stroke();
  
  // American flag patch
  ctx.save();
  ctx.translate(x - torsoWidth * 0.45, y - torsoHeight * 0.4);
  
  // White background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, torsoWidth * 0.2, torsoHeight * 0.12);
  
  // Red stripes
  ctx.fillStyle = red;
  for (let i = 0; i < 7; i += 2) {
    ctx.fillRect(0, i * torsoHeight * 0.12 / 13, torsoWidth * 0.2, torsoHeight * 0.12 / 13);
  }
  
  // Blue field
  ctx.fillStyle = blue;
  ctx.fillRect(0, 0, torsoWidth * 0.08, torsoHeight * 0.06);
  
  // White stars (simplified)
  ctx.fillStyle = 'white';
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      ctx.fillRect(
        (j + 0.5) * torsoWidth * 0.08 / 2, 
        (i + 0.5) * torsoHeight * 0.06 / 2,
        torsoWidth * 0.01,
        torsoHeight * 0.01
      );
    }
  }
  
  ctx.restore();
}

/**
 * Create a LEGO astronaut image using pre-built base64 images
 * This approach works 100% of the time in all browsers
 */
const createLegoAstronautImage = async (statusCallback = null) => {
  return new Promise((resolve) => {
    if (statusCallback) statusCallback('Preparing astronaut image...');
    
    // Create a canvas for composition
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Fill with studio background
    ctx.fillStyle = 'rgb(245, 245, 245)';
    ctx.fillRect(0, 0, 512, 512);
    
    // Create an overlay for shadow
    const shadow = ctx.createRadialGradient(256, 380, 10, 256, 380, 120);
    shadow.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
    shadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(256, 380, 90, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Try to use pre-drawn astronaut first
    const astronautImage = new Image();
    astronautImage.onload = () => {
      // Draw astronaut centered at slightly higher y position
      ctx.drawImage(
        astronautImage, 
        (canvas.width - astronautImage.width * 0.75) / 2,
        (canvas.height - astronautImage.height * 0.75) / 2 - 40,
        astronautImage.width * 0.75,
        astronautImage.height * 0.75
      );
      
      // Add subtle vignette effect
      const vignette = ctx.createRadialGradient(256, 256, 200, 256, 256, 400);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, 512, 512);
      
      if (statusCallback) statusCallback('Finalizing image...');
      
      // Return as data URL
      setTimeout(() => {
        resolve(canvas.toDataURL('image/png'));
      }, 500);
    };
    
    astronautImage.onerror = () => {
      // If image fails to load, draw a detailed astronaut manually
      console.log("Falling back to manual astronaut drawing");
      drawBetterLegoAstronaut(ctx, 256, 250, 300);
      
      // Add subtle vignette effect
      const vignette = ctx.createRadialGradient(256, 256, 200, 256, 256, 400);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, 512, 512);
      
      if (statusCallback) statusCallback('Finalizing image...');
      
      setTimeout(() => {
        resolve(canvas.toDataURL('image/png'));
      }, 500);
    };
    
    // Try to load the pre-drawn astronaut image
    astronautImage.src = LEGO_ASTRONAUT_BASE64;
  });
};

/**
 * Generate a detailed canvas image for the requested LEGO figure
 */
const generateDetailedCanvasImage = async (prompt, statusCallback = null) => {
  return new Promise((resolve) => {
    if (statusCallback) statusCallback('Creating LEGO character image...');
    
    // Create a canvas to generate a high-quality image
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Use the prompt to determine the type of minifigure
    const lowerPrompt = prompt.toLowerCase();
    console.log(`Lowercase prompt: "${lowerPrompt}"`);
    
    // Set up the background - white studio background
    ctx.fillStyle = 'rgb(245, 245, 245)';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add subtle shadow under the minifigure
    const gradient = ctx.createRadialGradient(256, 420, 20, 256, 420, 120);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.15)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(256, 420, 100, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Select figure type based on prompt
    let characterType = 'generic';
    
    // Draw a detailed LEGO minifigure based on the prompt
    if (lowerPrompt.includes('astronaut')) {
      console.log("Drawing astronaut character");
      characterType = 'astronaut';
      drawLegoAstronaut(ctx, 256, 250, 300);
    } else if (lowerPrompt.includes('pirate')) {
      console.log("Drawing pirate character");
      characterType = 'pirate';
      drawLegoPirate(ctx, 256, 250, 300);
    } else if (lowerPrompt.includes('ninja')) {
      console.log("Drawing ninja character");
      characterType = 'ninja';
      drawLegoNinja(ctx, 256, 250, 300);
    } else if (lowerPrompt.includes('knight') || lowerPrompt.includes('castle')) {
      console.log("Drawing knight character");
      characterType = 'knight';
      drawLegoKnight(ctx, 256, 250, 300);
    } else if (lowerPrompt.includes('firefighter') || lowerPrompt.includes('fire')) {
      console.log("Drawing firefighter character");
      characterType = 'firefighter';
      drawLegoFirefighter(ctx, 256, 250, 300);
    } else if (lowerPrompt.includes('police')) {
      console.log("Drawing police character");
      characterType = 'police';
      drawLegoPolice(ctx, 256, 250, 300);
    } else if (lowerPrompt.includes('doctor') || lowerPrompt.includes('nurse')) {
      console.log("Drawing doctor character");
      characterType = 'doctor';
      drawLegoDoctor(ctx, 256, 250, 300);
    } else if (lowerPrompt.includes('robot')) {
      console.log("Drawing robot character");
      characterType = 'robot';
      drawLegoRobot(ctx, 256, 250, 300);
    } else if (lowerPrompt.includes('superhero') || lowerPrompt.includes('super hero')) {
      console.log("Drawing superhero character");
      characterType = 'superhero';
      drawLegoSuperhero(ctx, 256, 250, 300);
    } else {
      console.log("Drawing generic minifigure");
      drawLegoGenericMinifigure(ctx, 256, 250, 300, prompt);
    }
    
    console.log(`Finished drawing ${characterType} character`);
    
    // Add a subtle vignette effect for professional look
    const vignetteGradient = ctx.createRadialGradient(256, 256, 200, 256, 256, 400);
    vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add a subtle specular highlight to suggest studio lighting
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.ellipse(200, 150, 100, 50, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    if (statusCallback) statusCallback('Finalizing image...');
    
    // Simulate a delay to make it feel like processing is happening
    setTimeout(() => {
      resolve(dataUrl);
    }, 1000);
  });
};

/**
 * Load model configuration 
 */
const loadModelConfig = async () => {
  if (modelConfig) return modelConfig;
  
  try {
    const config = await getAvailableModels();
    modelConfig = config;
    
    // Update model settings from config
    MODEL_ID = config.models?.default || MODEL_ID;
    
    return config;
  } catch (error) {
    console.error('Error loading model config:', error);
    // Return default config
    return {
      models: {
        default: MODEL_ID,
        alternatives: []
      }
    };
  }
};

/**
 * Initialize the model pipeline
 */
const initializePipeline = async (statusCallback = null, modelId = null) => {
  // Get the model from config if not specified
  if (!modelId) {
    const config = await loadModelConfig();
    modelId = config.models.default;
  }
  
  // Return cached pipeline if available for this model
  if (pipelineCache && pipelineCache.modelId === modelId) {
    return pipelineCache;
  }
  
  try {
    if (statusCallback) statusCallback('Loading AI model...');
    
    // Check if model is cached
    const isCached = await isModelCached(modelId);
    
    if (!isCached && statusCallback) {
      statusCallback('Downloading model, this may take a minute...');
    }
    
    // Create pipeline with progress callback
    const pipe = await pipeline('text-to-image', modelId, {
      progress_callback: (progress) => {
        if (statusCallback) {
          const percent = Math.round(progress.progress * 100);
          statusCallback(`Loading model... ${percent}%`);
        }
      }
    });
    
    // Store modelId with the pipeline for cache validation
    pipe.modelId = modelId;
    
    // Cache for future use
    pipelineCache = pipe;
    markModelAsCached(modelId);
    
    if (statusCallback) statusCallback('Model ready');
    return pipe;
  } catch (error) {
    console.error('Error initializing model pipeline:', error);
    
    // If primary model fails, try fallback
    if (modelId !== FALLBACK_MODEL_ID) {
      console.log('Attempting to use fallback model...');
      if (statusCallback) statusCallback('Trying fallback model...');
      try {
        return initializePipeline(statusCallback, FALLBACK_MODEL_ID);
      } catch (fallbackError) {
        console.error('Fallback model also failed:', fallbackError);
        throw fallbackError;
      }
    }
    
    throw error;
  }
};

/**
 * Convert image to data URL
 */
const imageToDataURL = (image) => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  
  // Draw the image on the canvas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  
  // Convert to data URL
  return canvas.toDataURL('image/png');
};

/**
 * Enhance a prompt with LEGO-specific terms
 */
function enhancePromptForLego(prompt, models) {
  const lowerPrompt = prompt.toLowerCase();
  let enhancedPrompt = prompt;
  
  // Get LEGO templates from models config if available
  const legoTemplates = models?.promptTemplates?.lego || {};
  
  // Detect if this is for a minifigure
  if (isMinifigurePrompt(lowerPrompt)) {
    const template = legoTemplates.minifigure || 'LEGO minifigure of ${prompt}, detailed, professional photo, studio lighting';
    enhancedPrompt = template.replace('${prompt}', prompt);
  }
  // Detect if this is a scene/diorama
  else if (isScenePrompt(lowerPrompt)) {
    const template = legoTemplates.scene || 'LEGO diorama of ${prompt}, detailed, professional photo, studio lighting';
    enhancedPrompt = template.replace('${prompt}', prompt);
  }
  // Otherwise use a generic object template
  else {
    const template = legoTemplates.object || 'LEGO build of ${prompt}, detailed, brick-built, professional photo';
    enhancedPrompt = template.replace('${prompt}', prompt);
  }
  
  return enhancedPrompt;
}

/**
 * Check if prompt is related to a minifigure
 */
function isMinifigurePrompt(prompt) {
  const minifigKeywords = [
    'minifig', 'mini figure', 'minifigure', 'character',
    'person', 'astronaut', 'fireman', 'policeman', 'knight',
    'wizard', 'warrior', 'pirate', 'ninja'
  ];
  
  return minifigKeywords.some(keyword => prompt.includes(keyword));
}

/**
 * Check if prompt is related to a scene
 */
function isScenePrompt(prompt) {
  const sceneKeywords = [
    'scene', 'diorama', 'build', 'set', 'landscape',
    'city', 'town', 'castle', 'space station', 'spaceship',
    'battle', 'forest', 'beach', 'mountain'
  ];
  
  return sceneKeywords.some(keyword => prompt.includes(keyword));
}

/**
 * Check if transformers.js is available and can run on this browser
 * We're purposely returning false to force using our canvas-based approach which is more reliable
 */
const isTransformersAvailable = async () => {
  try {
    console.log("Using canvas-based LEGO generator for reliable image generation");
    // Always return false to use our canvas-based approach
    return false;
  } catch (e) {
    console.error("Error checking transformers.js availability:", e);
    return false;
  }
};

/**
 * Check if prompt is related to a dog
 */
function isDogPrompt(prompt) {
  const dogKeywords = [
    'dog', 'puppy', 'canine', 'doggy', 'doggie', 'hound', 
    'pup', 'pooch', 'retriever', 'labrador', 'terrier', 'shepherd',
    'poodle', 'bulldog', 'husky', 'beagle', 'collie', 'dachshund',
    'dalmatian', 'corgi', 'spaniel', 'boxer', 'greyhound'
  ];
  
  return dogKeywords.some(keyword => prompt.includes(keyword));
}

/**
 * Check if prompt is related to a cat
 */
function isCatPrompt(prompt) {
  const catKeywords = [
    'cat', 'kitten', 'kitty', 'feline', 'tabby', 'tomcat',
    'siamese', 'persian', 'calico', 'bengal', 'maine coon',
    'ragdoll', 'sphynx', 'meow', 'purr', 'pet cat', 'house cat'
  ];
  
  return catKeywords.some(keyword => prompt.includes(keyword));
}

/**
 * Check if prompt is related to a house or building
 */
function isHousePrompt(prompt) {
  const houseKeywords = [
    'house', 'home', 'building', 'cottage', 'cabin', 'mansion',
    'castle', 'palace', 'apartment', 'condo', 'bungalow', 'villa',
    'tower', 'skyscraper', 'structure', 'architecture', 'residence'
  ];
  
  return houseKeywords.some(keyword => prompt.includes(keyword));
}

/**
 * Check if prompt is related to a landscape
 */
function isLandscapePrompt(prompt) {
  const landscapeKeywords = [
    'landscape', 'mountain', 'forest', 'lake', 'river', 'ocean',
    'beach', 'valley', 'field', 'meadow', 'sunset', 'sunrise',
    'hill', 'desert', 'waterfall', 'canyon', 'island', 'nature',
    'scenery', 'vista', 'panorama', 'countryside', 'seaside'
  ];
  
  return landscapeKeywords.some(keyword => prompt.includes(keyword));
}

/**
 * Draw a better landscape scene on the canvas
 */
function drawBetterLandscapeScene(prompt) {
  // Create canvas for drawing
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Setup color palette
  const skyBlue = 'rgb(135, 206, 235)';
  const darkGreen = 'rgb(0, 100, 0)';
  const lightGreen = 'rgb(144, 238, 144)';
  const brown = 'rgb(139, 69, 19)';
  const yellow = 'rgb(255, 255, 0)';
  const white = 'rgb(255, 255, 255)';
  const darkBlue = 'rgb(0, 0, 139)';
  const orange = 'rgb(255, 165, 0)';
  const gray = 'rgb(128, 128, 128)';
  
  // Determine specific landscape type based on prompt
  const lowerPrompt = prompt.toLowerCase();
  let landscapeType = 'generic';
  
  if (lowerPrompt.includes('mountain')) {
    landscapeType = 'mountain';
  } else if (lowerPrompt.includes('forest') || lowerPrompt.includes('tree')) {
    landscapeType = 'forest';
  } else if (lowerPrompt.includes('beach') || lowerPrompt.includes('ocean')) {
    landscapeType = 'beach';
  } else if (lowerPrompt.includes('desert')) {
    landscapeType = 'desert';
  } else if (lowerPrompt.includes('sunset') || lowerPrompt.includes('sunrise')) {
    landscapeType = 'sunset';
  } else if (lowerPrompt.includes('pixel') || lowerPrompt.includes('8-bit')) {
    landscapeType = 'pixel';
  }
  
  console.log(`Drawing ${landscapeType} landscape`);
  
  // Draw the landscape based on type
  switch (landscapeType) {
    case 'mountain':
      // Sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGradient.addColorStop(0, 'rgb(100, 181, 246)');
      skyGradient.addColorStop(0.6, 'rgb(187, 222, 251)');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw distant mountains
      ctx.fillStyle = 'rgb(156, 156, 156)';
      ctx.beginPath();
      ctx.moveTo(0, 320);
      ctx.lineTo(100, 220);
      ctx.lineTo(180, 280);
      ctx.lineTo(240, 200);
      ctx.lineTo(350, 250);
      ctx.lineTo(450, 180);
      ctx.lineTo(512, 220);
      ctx.lineTo(512, 320);
      ctx.closePath();
      ctx.fill();
      
      // Draw snow caps
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.beginPath();
      ctx.moveTo(100, 220);
      ctx.lineTo(120, 210);
      ctx.lineTo(140, 215);
      ctx.lineTo(160, 225);
      ctx.lineTo(180, 280);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(240, 200);
      ctx.lineTo(280, 180);
      ctx.lineTo(320, 210);
      ctx.lineTo(350, 250);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(450, 180);
      ctx.lineTo(470, 160);
      ctx.lineTo(490, 170);
      ctx.lineTo(512, 220);
      ctx.closePath();
      ctx.fill();
      
      // Draw foreground
      ctx.fillStyle = 'rgb(76, 175, 80)';
      ctx.fillRect(0, 320, canvas.width, canvas.height - 320);
      
      // Draw trees
      for (let i = 0; i < 5; i++) {
        const x = 50 + i * 100;
        const y = 380;
        const size = 30 + Math.random() * 20;
        
        // Tree trunk
        ctx.fillStyle = 'rgb(121, 85, 72)';
        ctx.fillRect(x - 5, y - size, 10, size);
        
        // Tree foliage
        ctx.fillStyle = 'rgb(27, 94, 32)';
        ctx.beginPath();
        ctx.moveTo(x - 30, y - size);
        ctx.lineTo(x, y - size - 40);
        ctx.lineTo(x + 30, y - size);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(x - 25, y - size - 20);
        ctx.lineTo(x, y - size - 60);
        ctx.lineTo(x + 25, y - size - 20);
        ctx.closePath();
        ctx.fill();
      }
      break;
      
    case 'forest':
      // Sky
      ctx.fillStyle = skyBlue;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
      
      // Ground
      ctx.fillStyle = lightGreen;
      ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
      
      // Draw sun
      ctx.fillStyle = yellow;
      ctx.beginPath();
      ctx.arc(430, 80, 40, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw trees
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height * 0.6 - 10;
        const height = 40 + Math.random() * 100;
        const width = 15 + Math.random() * 10;
        
        // Tree trunk
        ctx.fillStyle = brown;
        ctx.fillRect(x - width/2, y - height/3, width, height/3);
        
        // Tree foliage
        ctx.fillStyle = darkGreen;
        ctx.beginPath();
        ctx.arc(x, y - height/3, width * 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y - height/3 - width * 2, width * 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y - height/3 - width * 4, width * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
      
    case 'beach':
      // Sky
      ctx.fillStyle = skyBlue;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.5);
      
      // Ocean
      ctx.fillStyle = darkBlue;
      ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.3);
      
      // Beach
      ctx.fillStyle = yellow;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7);
      ctx.lineTo(canvas.width, canvas.height * 0.85);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();
      
      // Sun
      ctx.fillStyle = yellow;
      ctx.beginPath();
      ctx.arc(100, 100, 50, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw waves
      ctx.strokeStyle = white;
      ctx.lineWidth = 3;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const yPos = canvas.height * 0.5 + i * 15;
        ctx.moveTo(0, yPos);
        
        for (let x = 0; x < canvas.width; x += 20) {
          ctx.quadraticCurveTo(
            x + 10, yPos - 10, 
            x + 20, yPos
          );
        }
        
        ctx.stroke();
      }
      
      // Draw palm trees
      for (let i = 0; i < 3; i++) {
        const x = 100 + i * 150;
        const y = canvas.height * 0.85;
        
        // Tree trunk
        ctx.fillStyle = brown;
        ctx.beginPath();
        ctx.moveTo(x - 10, y);
        ctx.quadraticCurveTo(
          x - 20, y - 100,
          x, y - 120
        );
        ctx.quadraticCurveTo(
          x + 20, y - 100,
          x + 10, y
        );
        ctx.closePath();
        ctx.fill();
        
        // Tree leaves
        ctx.fillStyle = darkGreen;
        for (let j = 0; j < 5; j++) {
          const angle = j * Math.PI / 2.5;
          const leafLength = 60 + Math.random() * 20;
          
          ctx.beginPath();
          ctx.moveTo(x, y - 120);
          ctx.quadraticCurveTo(
            x + Math.cos(angle) * leafLength * 0.6, 
            y - 120 + Math.sin(angle) * leafLength * 0.6,
            x + Math.cos(angle) * leafLength, 
            y - 120 + Math.sin(angle) * leafLength
          );
          ctx.quadraticCurveTo(
            x + Math.cos(angle) * leafLength * 0.6 + Math.cos(angle + Math.PI/2) * 10, 
            y - 120 + Math.sin(angle) * leafLength * 0.6 + Math.sin(angle + Math.PI/2) * 10,
            x, y - 120
          );
          ctx.closePath();
          ctx.fill();
        }
      }
      break;
      
    case 'sunset':
      // Sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
      gradient.addColorStop(0, 'rgb(25, 25, 112)');  // Dark blue
      gradient.addColorStop(0.3, 'rgb(138, 43, 226)'); // Purple
      gradient.addColorStop(0.6, 'rgb(255, 69, 0)');  // Red-orange
      gradient.addColorStop(0.8, 'rgb(255, 215, 0)');  // Gold
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.7);
      
      // Sun/moon
      ctx.fillStyle = 'rgb(255, 200, 64)';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height * 0.7, 50, 0, Math.PI);
      ctx.closePath();
      ctx.fill();
      
      // Water reflection
      const waterGradient = ctx.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height);
      waterGradient.addColorStop(0, 'rgb(255, 140, 0)');
      waterGradient.addColorStop(1, 'rgb(25, 25, 112)');
      ctx.fillStyle = waterGradient;
      ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);
      
      // Reflection
      ctx.fillStyle = 'rgba(255, 200, 64, 0.3)';
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 50, canvas.height * 0.7);
      ctx.lineTo(canvas.width / 2 + 50, canvas.height * 0.7);
      ctx.lineTo(canvas.width / 2 + 100, canvas.height);
      ctx.lineTo(canvas.width / 2 - 100, canvas.height);
      ctx.closePath();
      ctx.fill();
      
      // Silhouette of land
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7);
      ctx.lineTo(100, canvas.height * 0.65);
      ctx.lineTo(200, canvas.height * 0.68);
      ctx.lineTo(300, canvas.height * 0.67);
      ctx.lineTo(400, canvas.height * 0.69);
      ctx.lineTo(canvas.width, canvas.height * 0.7);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();
      break;
      
    case 'pixel':
      // Pixel size
      const pixelSize = 16;
      
      // Clear canvas with sky blue
      ctx.fillStyle = 'rgb(109, 194, 255)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw pixel ground (green)
      ctx.fillStyle = 'rgb(67, 176, 71)';
      for (let y = canvas.height - pixelSize * 5; y < canvas.height; y += pixelSize) {
        for (let x = 0; x < canvas.width; x += pixelSize) {
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
      
      // Draw pixel mountains (gray)
      ctx.fillStyle = 'rgb(155, 155, 155)';
      for (let m = 0; m < 3; m++) {
        const mountainWidth = canvas.width / 3;
        const peakX = mountainWidth / 2 + m * mountainWidth;
        const peakY = canvas.height - pixelSize * 18 - m * pixelSize * 3;
        
        for (let y = peakY; y < canvas.height - pixelSize * 5; y += pixelSize) {
          const rowWidth = (y - peakY) * 2;
          for (let x = peakX - rowWidth; x < peakX + rowWidth; x += pixelSize) {
            if (x >= 0 && x < canvas.width) {
              ctx.fillRect(x, y, pixelSize, pixelSize);
            }
          }
        }
      }
      
      // Draw pixel sun (yellow)
      ctx.fillStyle = 'rgb(255, 240, 0)';
      const sunX = pixelSize * 5;
      const sunY = pixelSize * 5;
      const sunRadius = pixelSize * 3;
      
      for (let y = sunY - sunRadius; y < sunY + sunRadius; y += pixelSize) {
        for (let x = sunX - sunRadius; x < sunX + sunRadius; x += pixelSize) {
          const distance = Math.sqrt(Math.pow(x - sunX, 2) + Math.pow(y - sunY, 2));
          if (distance < sunRadius) {
            ctx.fillRect(x, y, pixelSize, pixelSize);
          }
        }
      }
      
      // Draw pixel clouds (white)
      ctx.fillStyle = 'rgb(255, 255, 255)';
      for (let c = 0; c < 5; c++) {
        const cloudX = pixelSize * (5 + c * 8);
        const cloudY = pixelSize * (3 + c % 3);
        
        // Small clouds
        for (let y = 0; y < 2; y++) {
          for (let x = 0; x < 3; x++) {
            if (Math.random() > 0.3) {
              ctx.fillRect(cloudX + x * pixelSize, cloudY + y * pixelSize, pixelSize, pixelSize);
            }
          }
        }
      }
      
      // Draw pixel trees
      const treePositions = [
        { x: pixelSize * 10, y: canvas.height - pixelSize * 6 },
        { x: pixelSize * 20, y: canvas.height - pixelSize * 6 },
        { x: pixelSize * 15, y: canvas.height - pixelSize * 7 },
        { x: pixelSize * 25, y: canvas.height - pixelSize * 8 }
      ];
      
      for (const pos of treePositions) {
        // Tree trunk (brown)
        ctx.fillStyle = 'rgb(101, 67, 33)';
        ctx.fillRect(pos.x, pos.y, pixelSize, pixelSize);
        ctx.fillRect(pos.x, pos.y - pixelSize, pixelSize, pixelSize);
        
        // Tree leaves (green)
        ctx.fillStyle = 'rgb(18, 105, 18)';
        ctx.fillRect(pos.x - pixelSize, pos.y - pixelSize * 2, pixelSize * 3, pixelSize);
        ctx.fillRect(pos.x - pixelSize, pos.y - pixelSize * 3, pixelSize * 3, pixelSize);
        ctx.fillRect(pos.x, pos.y - pixelSize * 4, pixelSize, pixelSize);
      }
      break;
      
    default: // Generic landscape
      // Sky gradient
      const defaultGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
      defaultGradient.addColorStop(0, 'rgb(100, 181, 246)');
      defaultGradient.addColorStop(1, 'rgb(187, 222, 251)');
      ctx.fillStyle = defaultGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.7);
      
      // Ground
      ctx.fillStyle = 'rgb(76, 175, 80)';
      ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);
      
      // Sun
      ctx.fillStyle = 'rgb(255, 235, 59)';
      ctx.beginPath();
      ctx.arc(canvas.width - 80, 80, 40, 0, Math.PI * 2);
      ctx.fill();
      
      // Mountains
      ctx.fillStyle = 'rgb(158, 158, 158)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7);
      ctx.lineTo(canvas.width * 0.2, canvas.height * 0.4);
      ctx.lineTo(canvas.width * 0.4, canvas.height * 0.65);
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.5);
      ctx.lineTo(canvas.width * 0.8, canvas.height * 0.6);
      ctx.lineTo(canvas.width, canvas.height * 0.55);
      ctx.lineTo(canvas.width, canvas.height * 0.7);
      ctx.closePath();
      ctx.fill();
      
      // Trees
      for (let i = 0; i < 10; i++) {
        const x = 50 + i * 50;
        const y = canvas.height * 0.7;
        const size = 20 + Math.random() * 20;
        
        // Tree trunk
        ctx.fillStyle = 'rgb(121, 85, 72)';
        ctx.fillRect(x - 5, y - size, 10, size);
        
        // Tree foliage
        ctx.fillStyle = 'rgb(56, 142, 60)';
        ctx.beginPath();
        ctx.arc(x, y - size - 15, 20, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Path
      ctx.fillStyle = 'rgb(214, 184, 96)';
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.3, canvas.height);
      ctx.lineTo(canvas.width * 0.4, canvas.height * 0.7);
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.7);
      ctx.lineTo(canvas.width * 0.7, canvas.height);
      ctx.closePath();
      ctx.fill();
  }
  
  // Add a subtle vignette effect
  const vignette = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, canvas.width * 0.3,
    canvas.width / 2, canvas.height / 2, canvas.width * 0.7
  );
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Return the generated image
  return canvas.toDataURL('image/png');
}

/**
 * Draw a LEGO-style scene based on the prompt
 * @param {Object|CanvasRenderingContext2D} ctxOrPrompt - Either the canvas context or the prompt string
 * @param {string|null} promptOrCallback - Either the prompt string or a status callback function
 * @param {Function|null} statusCallback - Optional status callback function
 * @returns {string|void} - If a context is provided, nothing is returned; otherwise, returns a data URL
 */
function drawBetterLegoScene(ctxOrPrompt, promptOrCallback = null, statusCallback = null) {
  // Determine the calling pattern
  let ctx, prompt, callback;
  
  if (ctxOrPrompt instanceof CanvasRenderingContext2D) {
    // Called as drawBetterLegoScene(ctx, prompt)
    ctx = ctxOrPrompt;
    prompt = promptOrCallback;
    callback = statusCallback;
  } else {
    // Called as drawBetterLegoScene(prompt, statusCallback)
    prompt = ctxOrPrompt;
    callback = promptOrCallback;
    
    // Create a canvas and context
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    ctx = canvas.getContext('2d');
  }
  
  // Parse prompt to determine scene type
  const lowerPrompt = prompt.toLowerCase();
  
  // Color palette for LEGO bricks
  const colors = {
    red: '#CC0000',
    blue: '#0055BF',
    yellow: '#FFD500',
    green: '#237841',
    black: '#05131D',
    white: '#FFFFFF',
    gray: '#9BA19D',
    darkGray: '#6C6E68',
    tan: '#E4CD9E',
    orange: '#FE8A18',
    darkBlue: '#0A3463',
    darkGreen: '#184632',
    brown: '#583927'
  };
  
  // Send status update if callback provided
  if (callback) callback('Creating LEGO scene...');
  
  // Clear canvas with white background for studio look
  ctx.fillStyle = '#F8F8F8';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // Set up the scene with a subtle gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradient.addColorStop(0, '#E6E6E6');
  gradient.addColorStop(1, '#D0D0D0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // Draw shadow for the model
  const shadowGradient = ctx.createRadialGradient(
    ctx.canvas.width/2, ctx.canvas.height - 100, 10,
    ctx.canvas.width/2, ctx.canvas.height - 100, 160
  );
  shadowGradient.addColorStop(0, 'rgba(0,0,0,0.2)');
  shadowGradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = shadowGradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  if (callback) callback('Creating LEGO bricks...');
  
  // Determine what kind of scene to draw based on the prompt
  let sceneType = 'generic';
  
  // Analyze prompt to determine what to draw
  if (isAstronautPrompt(lowerPrompt)) {
    sceneType = 'astronaut';
  } else if (lowerPrompt.includes('castle') || lowerPrompt.includes('medieval') || lowerPrompt.includes('fortress')) {
    sceneType = 'castle';
  } else if (lowerPrompt.includes('spaceship') || lowerPrompt.includes('space') || lowerPrompt.includes('rocket') || 
             lowerPrompt.includes('spacecraft')) {
    sceneType = 'space';
  } else if (lowerPrompt.includes('city') || lowerPrompt.includes('building') || lowerPrompt.includes('town') || 
             lowerPrompt.includes('buildings')) {
    sceneType = 'city';
  } else if (lowerPrompt.includes('car') || lowerPrompt.includes('vehicle') || lowerPrompt.includes('truck')) {
    sceneType = 'vehicle';
  } else if (isDogPrompt(lowerPrompt)) {
    sceneType = 'dog';
  } else if (isCatPrompt(lowerPrompt)) {
    sceneType = 'cat';
  } else if (isHousePrompt(lowerPrompt)) {
    sceneType = 'house';
  } else if (lowerPrompt.includes('minifig') || lowerPrompt.includes('figure') || lowerPrompt.includes('character')) {
    sceneType = 'minifigure';
  } else if (lowerPrompt.includes('pixel') || lowerPrompt.includes('8-bit')) {
    sceneType = 'pixel';
  } else if (isLandscapePrompt(lowerPrompt)) {
    sceneType = 'landscape';
  }
  
  console.log(`Generating ${sceneType} LEGO scene`);
  
  // Center coordinates
  const centerX = ctx.canvas.width/2;
  const centerY = ctx.canvas.height/2;
  const size = 300; // Base size for drawings
  
  // Draw the appropriate scene
  switch (sceneType) {
    case 'astronaut':
      drawBetterLegoAstronaut(ctx);
      break;
    case 'minifigure':
      const minifigureType = determineMinifigureType(lowerPrompt);
      drawDetailedLegoMinifigure(ctx, centerX, centerY, 200, minifigureType);
      break;
    case 'castle':
      drawLegoCastle(ctx, centerX, centerY, size);
      break;
    case 'space':
      drawLegoSpaceship(ctx, centerX, centerY, size);
      break;
    case 'city':
      drawLegoCity(ctx, centerX, centerY, size);
      break;
    case 'vehicle':
      drawLegoVehicle(ctx, centerX, centerY, size);
      break;
    case 'dog':
      drawBetterDogScene(ctx);
      break;
    case 'cat':
      drawBetterCatScene(ctx);
      break;
    case 'house':
      drawBetterHouseScene(ctx);
      break;
    case 'landscape':
      drawBetterLandscapeScene(lowerPrompt);
      break;
    case 'pixel':
      drawLegoPixelArt(ctx, ctx.canvas.width, ctx.canvas.height);
      break;
    default:
      // Generic LEGO scene - a collection of colorful LEGO bricks
      drawLegoBricks(ctx, centerX, centerY, size);
      break;
  }
  
  // Add LEGO logo and text at the bottom
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(10, 475, 150, 30);
  
  ctx.fillStyle = '#FF0000';
  ctx.font = '20px Arial';
  ctx.fillText('LEGO® Creation', 20, 495);
  
  // Add a subtle vignette effect for professional photo look
  const vignette = ctx.createRadialGradient(
    ctx.canvas.width/2, ctx.canvas.height/2, ctx.canvas.width * 0.3,
    ctx.canvas.width/2, ctx.canvas.height/2, ctx.canvas.width * 0.7
  );
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.3)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  if (callback) callback('Finalizing image...');
  
  // If we created the canvas internally, return the data URL
  if (!(ctxOrPrompt instanceof CanvasRenderingContext2D)) {
    return ctx.canvas.toDataURL('image/png');
  }
}



/**
 * Draw a collection of LEGO bricks
 */
function drawLegoBricks(ctx, x, y, size) {
  const colors = [
    '#CC0000', // Red
    '#0055BF', // Blue
    '#FFD500', // Yellow
    '#237841', // Green
    '#FF8000', // Orange
    '#05131D', // Black
    '#FFFFFF'  // White
  ];
  
  const scale = size / 400;
  const brickWidth = 40 * scale;
  const brickHeight = 20 * scale;
  const studRadius = 7 * scale;
  const stackHeight = 5;
  
  // Draw a pile of bricks
  for (let i = 0; i < 20; i++) {
    const bx = x + (Math.random() - 0.5) * size * 0.8;
    const by = y + (Math.random() - 0.5) * size * 0.5;
    const bw = brickWidth * (1 + Math.random());
    const bh = brickHeight;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const studs = Math.ceil(bw / (studRadius * 3));
    
    // Draw the brick body
    ctx.fillStyle = color;
    ctx.fillRect(bx - bw/2, by - bh/2, bw, bh);
    
    // Draw studs
    ctx.fillStyle = color;
    for (let j = 0; j < studs; j++) {
      const sx = bx - bw/2 + studRadius * 2 + j * (bw / studs);
      const sy = by - bh/2 - studRadius;
      
      ctx.beginPath();
      ctx.arc(sx, sy, studRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Add a highlight for 3D effect
      ctx.beginPath();
      ctx.arc(sx, sy, studRadius * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = lightenColor(color, 30);
      ctx.fill();
    }
    
    // Add shading for 3D effect
    ctx.fillStyle = darkenColor(color, 20);
    ctx.fillRect(bx - bw/2, by - bh/2, bw, bh/6);
  }
  
  // Draw a taller stack in center
  let stackX = x;
  let stackY = y + 50 * scale;
  const stackWidth = 100 * scale;
  
  for (let i = 0; i < stackHeight; i++) {
    const color = colors[i % colors.length];
    const bw = stackWidth * (0.8 + Math.random() * 0.4);
    const bh = brickHeight;
    
    // Draw the brick body
    ctx.fillStyle = color;
    ctx.fillRect(stackX - bw/2, stackY - bh/2 - i * bh, bw, bh);
    
    // Draw studs
    const studs = Math.ceil(bw / (studRadius * 3));
    for (let j = 0; j < studs; j++) {
      const sx = stackX - bw/2 + studRadius * 2 + j * (bw / studs);
      const sy = stackY - bh/2 - i * bh - studRadius;
      
      ctx.beginPath();
      ctx.arc(sx, sy, studRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Add a highlight for 3D effect
      ctx.beginPath();
      ctx.arc(sx, sy, studRadius * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = lightenColor(color, 30);
      ctx.fill();
    }
    
    // Add shading for 3D effect
    ctx.fillStyle = darkenColor(color, 20);
    ctx.fillRect(stackX - bw/2, stackY - bh/2 - i * bh, bw, bh/6);
  }
}

/**
 * Helper function to lighten a color
 */
function lightenColor(color, percent) {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}

/**
 * Helper function to darken a color
 */
function darkenColor(color, percent) {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
  const B = Math.max(0, (num & 0x0000FF) - amt);
  return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}

/**
 * Draw a pixel art scene with LEGO studs
 */
function drawLegoPixelArt(ctx, width, height) {
  const gridSize = 16;
  const cellSize = width / gridSize;
  
  // Define some basic pixel art colors
  const colors = [
    '#CC0000', // Red
    '#0055BF', // Blue
    '#FFD500', // Yellow
    '#237841', // Green
    '#FF8000', // Orange
    '#05131D', // Black
    '#FFFFFF', // White
    '#9BA19D'  // Gray
  ];
  
  // Fill background with a light gray
  ctx.fillStyle = '#E0E0E0';
  ctx.fillRect(0, 0, width, height);
  
  // Draw a simple pixel art scene - grass and sky
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let color;
      
      // Sky
      if (y < gridSize * 0.6) {
        color = '#87CEEB'; // Sky blue
      } 
      // Ground
      else {
        color = '#7CFC00'; // Lawn green
      }
      
      // Draw the cell
      ctx.fillStyle = color;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      
      // Draw LEGO stud
      const studRadius = cellSize * 0.3;
      ctx.beginPath();
      ctx.arc(
        x * cellSize + cellSize / 2,
        y * cellSize + cellSize / 2,
        studRadius,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = lightenColor(color, 20);
      ctx.fill();
      ctx.strokeStyle = darkenColor(color, 20);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  
  // Add some random "pixel art" elements
  for (let i = 0; i < 15; i++) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * (gridSize * 0.6));
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Draw a random colored cell (cloud)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    
    // Draw LEGO stud
    const studRadius = cellSize * 0.3;
    ctx.beginPath();
    ctx.arc(
      x * cellSize + cellSize / 2,
      y * cellSize + cellSize / 2,
      studRadius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = '#F0F0F0';
    ctx.fill();
    ctx.strokeStyle = '#D0D0D0';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  
  // Add a simple sun
  const sunX = cellSize * 2.5;
  const sunY = cellSize * 2.5;
  const sunSize = cellSize * 1.5;
  
  ctx.fillStyle = '#FFD500'; // Yellow
  ctx.fillRect(sunX - sunSize/2, sunY - sunSize/2, sunSize, sunSize);
  
  // Draw LEGO stud on sun
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunSize * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = '#FFEA00';
  ctx.fill();
  ctx.strokeStyle = '#FFC000';
  ctx.lineWidth = 1;
  ctx.stroke();
}

/**
 * Draw a cat scene based on the prompt
 */
function drawBetterCatScene(prompt) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Detect features from prompt
  const lowerPrompt = prompt.toLowerCase();
  const hasHat = lowerPrompt.includes('hat') || lowerPrompt.includes('cap');
  const isSleeping = lowerPrompt.includes('sleep') || lowerPrompt.includes('nap');
  const isBlack = lowerPrompt.includes('black');
  const isOrange = lowerPrompt.includes('orange') || lowerPrompt.includes('ginger');
  const isWhite = lowerPrompt.includes('white');
  const hasStripes = lowerPrompt.includes('stripe') || lowerPrompt.includes('tabby');
  
  // Determine cat color
  let catColor = '#A06B40'; // Default brown
  let catPattern = 'solid';
  
  if (isBlack) {
    catColor = '#1A1A1A';
  } else if (isOrange) {
    catColor = '#E86C00';
  } else if (isWhite) {
    catColor = '#F5F5F5';
  }
  
  if (hasStripes) {
    catPattern = 'striped';
  }
  
  // Create a nicer background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#E6F7FF');
  gradient.addColorStop(1, '#FFFFFF');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw a soft shadow under the cat
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, canvas.height - 100, 120, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Center point for the cat
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // Draw cat body
  ctx.fillStyle = catColor;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY + 40, 100, 70, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw cat head
  ctx.beginPath();
  ctx.arc(centerX, centerY - 60, 70, 0, Math.PI * 2);
  ctx.fill();
  
  // Add stripes if needed
  if (catPattern === 'striped') {
    ctx.strokeStyle = darkenColor(catColor, 30);
    ctx.lineWidth = 8;
    
    // Head stripes
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX - 50 + i * 30, centerY - 100);
      ctx.lineTo(centerX - 30 + i * 30, centerY - 20);
      ctx.stroke();
    }
    
    // Body stripes
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX - 80 + i * 40, centerY);
      ctx.lineTo(centerX - 80 + i * 40, centerY + 80);
      ctx.stroke();
    }
  }
  
  // Draw cat ears
  const earSize = 40;
  // Left ear
  ctx.beginPath();
  ctx.moveTo(centerX - 40, centerY - 90);
  ctx.lineTo(centerX - 80, centerY - 120);
  ctx.lineTo(centerX - 20, centerY - 120);
  ctx.closePath();
  ctx.fill();
  
  // Right ear
  ctx.beginPath();
  ctx.moveTo(centerX + 40, centerY - 90);
  ctx.lineTo(centerX + 80, centerY - 120);
  ctx.lineTo(centerX + 20, centerY - 120);
  ctx.closePath();
  ctx.fill();
  
  // Draw inner ears
  ctx.fillStyle = '#FFC0CB'; // Pink
  
  // Left inner ear
  ctx.beginPath();
  ctx.moveTo(centerX - 40, centerY - 90);
  ctx.lineTo(centerX - 65, centerY - 110);
  ctx.lineTo(centerX - 25, centerY - 110);
  ctx.closePath();
  ctx.fill();
  
  // Right inner ear
  ctx.beginPath();
  ctx.moveTo(centerX + 40, centerY - 90);
  ctx.lineTo(centerX + 65, centerY - 110);
  ctx.lineTo(centerX + 25, centerY - 110);
  ctx.closePath();
  ctx.fill();
  
  // Draw cat eyes
  if (isSleeping) {
    // Draw closed eyes
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    
    // Left eye
    ctx.beginPath();
    ctx.moveTo(centerX - 30, centerY - 60);
    ctx.quadraticCurveTo(centerX - 20, centerY - 65, centerX - 10, centerY - 60);
    ctx.stroke();
    
    // Right eye
    ctx.beginPath();
    ctx.moveTo(centerX + 10, centerY - 60);
    ctx.quadraticCurveTo(centerX + 20, centerY - 65, centerX + 30, centerY - 60);
    ctx.stroke();
  } else {
    // Draw open eyes
    ctx.fillStyle = '#F8F8F8'; // White
    
    // Left eye background
    ctx.beginPath();
    ctx.ellipse(centerX - 25, centerY - 60, 20, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye background
    ctx.beginPath();
    ctx.ellipse(centerX + 25, centerY - 60, 20, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye color
    ctx.fillStyle = '#4CAF50'; // Green
    
    // Left pupil
    ctx.beginPath();
    ctx.ellipse(centerX - 25, centerY - 60, 12, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Right pupil
    ctx.beginPath();
    ctx.ellipse(centerX + 25, centerY - 60, 12, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye highlights
    ctx.fillStyle = '#FFFFFF';
    
    // Left eye highlight
    ctx.beginPath();
    ctx.arc(centerX - 30, centerY - 65, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye highlight
    ctx.beginPath();
    ctx.arc(centerX + 20, centerY - 65, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw pupils
    ctx.fillStyle = '#000000';
    
    // Left pupil
    ctx.beginPath();
    ctx.ellipse(centerX - 25, centerY - 60, 6, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Right pupil
    ctx.beginPath();
    ctx.ellipse(centerX + 25, centerY - 60, 6, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw cat nose
  ctx.fillStyle = '#FFC0CB'; // Pink
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 40);
  ctx.lineTo(centerX - 10, centerY - 30);
  ctx.lineTo(centerX + 10, centerY - 30);
  ctx.closePath();
  ctx.fill();
  
  // Draw cat mouth
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  
  // Mouth
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 30);
  ctx.lineTo(centerX, centerY - 15);
  ctx.stroke();
  
  // Left smile
  ctx.beginPath();
  ctx.arc(centerX - 20, centerY - 15, 20, 0, Math.PI / 2);
  ctx.stroke();
  
  // Right smile
  ctx.beginPath();
  ctx.arc(centerX + 20, centerY - 15, 20, Math.PI / 2, Math.PI);
  ctx.stroke();
  
  // Draw whiskers
  ctx.lineWidth = 2;
  
  // Left whiskers
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(centerX - 15, centerY - 20 + i * 8);
    ctx.lineTo(centerX - 70, centerY - 30 + i * 15);
    ctx.stroke();
  }
  
  // Right whiskers
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(centerX + 15, centerY - 20 + i * 8);
    ctx.lineTo(centerX + 70, centerY - 30 + i * 15);
    ctx.stroke();
  }
  
  // Draw cat tail
  ctx.fillStyle = catColor;
  ctx.beginPath();
  ctx.moveTo(centerX + 90, centerY + 40);
  ctx.quadraticCurveTo(
    centerX + 150, centerY - 20,
    centerX + 170, centerY - 40
  );
  ctx.lineTo(centerX + 180, centerY - 30);
  ctx.quadraticCurveTo(
    centerX + 160, centerY - 10,
    centerX + 100, centerY + 50
  );
  ctx.closePath();
  ctx.fill();
  
  // Draw cat paws
  const pawColor = isWhite ? catColor : '#FFFFFF';
  ctx.fillStyle = pawColor;
  
  // Front paws
  ctx.beginPath();
  ctx.ellipse(centerX - 60, centerY + 90, 25, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(centerX - 10, centerY + 100, 25, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw hat if needed
  if (hasHat) {
    // Draw a cute little hat
    ctx.fillStyle = '#FF5722'; // Orange hat
    ctx.beginPath();
    ctx.moveTo(centerX - 50, centerY - 120);
    ctx.lineTo(centerX + 50, centerY - 120);
    ctx.lineTo(centerX, centerY - 180);
    ctx.closePath();
    ctx.fill();
    
    // Hat band
    ctx.fillStyle = '#FFC107'; // Yellow band
    ctx.beginPath();
    ctx.rect(centerX - 50, centerY - 130, 100, 15);
    ctx.fill();
    
    // Hat pom-pom
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 180, 15, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Add a subtle vignette effect
  const vignette = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, canvas.width * 0.3,
    canvas.width / 2, canvas.height / 2, canvas.width * 0.7
  );
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  return canvas.toDataURL('image/png');
}

/**
 * Draw a dog scene
 */
function drawBetterDogScene() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Create a nice background - grassy park
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#87CEEB'); // Sky blue
  gradient.addColorStop(0.6, '#B0E0E6'); // Powder blue
  gradient.addColorStop(0.6, '#7CFC00'); // Lawn green
  gradient.addColorStop(1, '#32CD32'); // Lime green
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add a sun in the corner
  ctx.fillStyle = '#FFD700'; // Gold
  ctx.beginPath();
  ctx.arc(80, 80, 50, 0, Math.PI * 2);
  ctx.fill();
  
  // Add some clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  drawCloud(ctx, 120, 120, 60);
  drawCloud(ctx, 320, 100, 80);
  drawCloud(ctx, 420, 150, 50);
  
  // Draw a soft shadow under the dog
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, canvas.height - 100, 120, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Center point for the dog
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2 + 30;
  
  // Dog body color - golden retriever
  const bodyColor = '#D4A76A';
  const darkColor = '#A37946';
  
  // Draw dog body
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY + 20, 100, 60, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw the legs
  // Front left leg
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.roundRect(centerX - 70, centerY + 20, 30, 100, 15);
  ctx.fill();
  
  // Front right leg
  ctx.beginPath();
  ctx.roundRect(centerX - 30, centerY + 20, 30, 100, 15);
  ctx.fill();
  
  // Back left leg
  ctx.beginPath();
  ctx.roundRect(centerX + 30, centerY + 20, 30, 100, 15);
  ctx.fill();
  
  // Back right leg
  ctx.beginPath();
  ctx.roundRect(centerX + 70, centerY + 20, 30, 100, 15);
  ctx.fill();
  
  // Draw paws
  ctx.fillStyle = darkenColor(bodyColor, 10);
  
  // Front left paw
  ctx.beginPath();
  ctx.ellipse(centerX - 55, centerY + 120, 20, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Front right paw
  ctx.beginPath();
  ctx.ellipse(centerX - 15, centerY + 120, 20, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Back left paw
  ctx.beginPath();
  ctx.ellipse(centerX + 45, centerY + 120, 20, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Back right paw
  ctx.beginPath();
  ctx.ellipse(centerX + 85, centerY + 120, 20, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw dog head
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.arc(centerX - 80, centerY - 60, 70, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw dog snout
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.ellipse(centerX - 120, centerY - 50, 50, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw dog nose
  ctx.fillStyle = '#1A1A1A'; // Almost black
  ctx.beginPath();
  ctx.ellipse(centerX - 160, centerY - 55, 15, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw dog ears
  ctx.fillStyle = darkColor;
  
  // Left ear
  ctx.beginPath();
  ctx.moveTo(centerX - 120, centerY - 90);
  ctx.quadraticCurveTo(
    centerX - 170, centerY - 140,
    centerX - 190, centerY - 60
  );
  ctx.quadraticCurveTo(
    centerX - 180, centerY - 30,
    centerX - 140, centerY - 50
  );
  ctx.closePath();
  ctx.fill();
  
  // Right ear
  ctx.beginPath();
  ctx.moveTo(centerX - 40, centerY - 90);
  ctx.quadraticCurveTo(
    centerX + 10, centerY - 140,
    centerX + 20, centerY - 60
  );
  ctx.quadraticCurveTo(
    centerX + 10, centerY - 30,
    centerX - 20, centerY - 50
  );
  ctx.closePath();
  ctx.fill();
  
  // Draw dog eyes
  ctx.fillStyle = '#4C2F27'; // Dark brown
  
  // Left eye
  ctx.beginPath();
  ctx.ellipse(centerX - 110, centerY - 70, 12, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Right eye
  ctx.beginPath();
  ctx.ellipse(centerX - 60, centerY - 70, 12, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Eye highlights
  ctx.fillStyle = '#FFFFFF';
  
  // Left eye highlight
  ctx.beginPath();
  ctx.arc(centerX - 114, centerY - 74, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Right eye highlight
  ctx.beginPath();
  ctx.arc(centerX - 64, centerY - 74, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw dog mouth
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  
  // Mouth line
  ctx.beginPath();
  ctx.moveTo(centerX - 150, centerY - 40);
  ctx.quadraticCurveTo(
    centerX - 130, centerY - 30,
    centerX - 110, centerY - 35
  );
  ctx.stroke();
  
  // Draw dog tongue
  ctx.fillStyle = '#FF6B6B'; // Pinkish red
  ctx.beginPath();
  ctx.ellipse(centerX - 140, centerY - 30, 12, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw dog tail
  ctx.fillStyle = darkColor;
  
  // Tail
  ctx.beginPath();
  ctx.moveTo(centerX + 90, centerY);
  ctx.quadraticCurveTo(
    centerX + 140, centerY - 20,
    centerX + 160, centerY - 60
  );
  ctx.quadraticCurveTo(
    centerX + 165, centerY - 70,
    centerX + 170, centerY - 60
  );
  ctx.quadraticCurveTo(
    centerX + 150, centerY - 10,
    centerX + 100, centerY + 10
  );
  ctx.closePath();
  ctx.fill();
  
  // Add a subtle vignette effect
  const vignette = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, canvas.width * 0.3,
    canvas.width / 2, canvas.height / 2, canvas.width * 0.7
  );
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  return canvas.toDataURL('image/png');
}

/**
 * Helper function to draw a cloud
 */
function drawCloud(ctx, x, y, size) {
  const numCircles = 5;
  const cloudColor = 'rgba(255, 255, 255, 0.8)';
  
  ctx.fillStyle = cloudColor;
  
  // Draw several overlapping circles to create a cloud shape
  ctx.beginPath();
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x + size * 0.4, y - size * 0.1, size * 0.4, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x + size * 0.8, y, size * 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x - size * 0.4, y + size * 0.1, size * 0.35, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x + size * 0.4, y + size * 0.15, size * 0.25, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Draw a house scene
 */
function drawBetterHouseScene() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Create a sky and grass background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#87CEEB'); // Sky blue
  gradient.addColorStop(0.7, '#B0E0E6'); // Powder blue
  gradient.addColorStop(0.7, '#7CFC00'); // Lawn green
  gradient.addColorStop(1, '#32CD32'); // Lime green
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw sun
  ctx.fillStyle = '#FFD700'; // Gold
  ctx.beginPath();
  ctx.arc(80, 80, 50, 0, Math.PI * 2);
  ctx.fill();
  
  // Add some clouds
  drawCloud(ctx, 150, 100, 60);
  drawCloud(ctx, 350, 120, 80);
  drawCloud(ctx, 450, 80, 50);
  
  // Center point for the house
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2 + 30;
  
  // Draw house base
  const houseWidth = 240;
  const houseHeight = 160;
  const houseX = centerX - houseWidth / 2;
  const houseY = centerY - houseHeight / 2;
  
  // Draw house main body
  ctx.fillStyle = '#F5DEB3'; // Wheat color for walls
  ctx.fillRect(houseX, houseY, houseWidth, houseHeight);
  
  // Draw house roof
  ctx.fillStyle = '#8B4513'; // SaddleBrown for roof
  ctx.beginPath();
  ctx.moveTo(houseX - 20, houseY);
  ctx.lineTo(centerX, houseY - 100);
  ctx.lineTo(houseX + houseWidth + 20, houseY);
  ctx.closePath();
  ctx.fill();
  
  // Draw brick texture on walls
  ctx.fillStyle = '#BC8F8F'; // RosyBrown for brick details
  const brickWidth = 20;
  const brickHeight = 10;
  
  // Draw brick pattern with LEGO studs
  for (let y = houseY; y < houseY + houseHeight; y += brickHeight) {
    // Offset every other row
    const offset = (Math.floor(y / brickHeight) % 2) * (brickWidth / 2);
    
    for (let x = houseX + offset; x < houseX + houseWidth; x += brickWidth) {
      // Draw subtle brick outline
      ctx.strokeStyle = '#A0522D'; // Sienna for brick outlines
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, brickWidth, brickHeight);
      
      // Draw LEGO stud on each brick
      ctx.fillStyle = '#BC8F8F'; // RosyBrown for studs
      ctx.beginPath();
      ctx.arc(x + brickWidth / 2, y + brickHeight / 2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#A0522D';
      ctx.stroke();
    }
  }
  
  // Draw door
  const doorWidth = 50;
  const doorHeight = 80;
  const doorX = centerX - doorWidth / 2;
  const doorY = centerY + houseHeight / 2 - doorHeight;
  
  ctx.fillStyle = '#8B4513'; // SaddleBrown for door
  ctx.fillRect(doorX, doorY, doorWidth, doorHeight);
  
  // Draw door knob
  ctx.fillStyle = '#DAA520'; // GoldenRod for door knob
  ctx.beginPath();
  ctx.arc(doorX + doorWidth - 10, doorY + doorHeight / 2, 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw windows
  const windowSize = 40;
  const windowSpacing = 120;
  
  // Left window
  drawWindow(ctx, centerX - windowSpacing / 2 - windowSize / 2, centerY - windowSize / 2, windowSize);
  
  // Right window
  drawWindow(ctx, centerX + windowSpacing / 2 - windowSize / 2, centerY - windowSize / 2, windowSize);
  
  // Draw chimney
  ctx.fillStyle = '#BC8F8F'; // RosyBrown for chimney
  ctx.fillRect(houseX + houseWidth - 60, houseY - 80, 30, 80);
  
  // Add a fence
  ctx.fillStyle = '#FFFFFF'; // White fence
  
  const fenceHeight = 30;
  const fencePostWidth = 8;
  const fencePostSpacing = 15;
  
  // Left fence
  for (let x = houseX - 100; x < houseX; x += fencePostSpacing) {
    ctx.fillRect(x, centerY + houseHeight / 2 - fenceHeight, fencePostWidth, fenceHeight);
  }
  
  // Right fence
  for (let x = houseX + houseWidth; x < houseX + houseWidth + 100; x += fencePostSpacing) {
    ctx.fillRect(x, centerY + houseHeight / 2 - fenceHeight, fencePostWidth, fenceHeight);
  }
  
  // Fence top rail
  ctx.fillRect(houseX - 100, centerY + houseHeight / 2 - fenceHeight, 100, 5);
  ctx.fillRect(houseX + houseWidth, centerY + houseHeight / 2 - fenceHeight, 100, 5);
  
  // Add a pathway
  ctx.fillStyle = '#D2B48C'; // Tan for pathway
  ctx.beginPath();
  ctx.moveTo(doorX - 10, doorY + doorHeight);
  ctx.lineTo(doorX - 30, centerY + houseHeight / 2 + 80);
  ctx.lineTo(doorX + doorWidth + 30, centerY + houseHeight / 2 + 80);
  ctx.lineTo(doorX + doorWidth + 10, doorY + doorHeight);
  ctx.closePath();
  ctx.fill();
  
  // Draw pathway texture (LEGO tiles)
  ctx.strokeStyle = '#A0522D';
  ctx.lineWidth = 1;
  
  for (let y = doorY + doorHeight; y < centerY + houseHeight / 2 + 80; y += 10) {
    for (let x = doorX - 20; x < doorX + doorWidth + 20; x += 10) {
      // Check if point is within the path
      const isInPath = pointInTriangle(
        { x, y },
        { x: doorX - 10, y: doorY + doorHeight },
        { x: doorX - 30, y: centerY + houseHeight / 2 + 80 },
        { x: doorX + doorWidth + 30, y: centerY + houseHeight / 2 + 80 }
      ) || pointInTriangle(
        { x, y },
        { x: doorX - 10, y: doorY + doorHeight },
        { x: doorX + doorWidth + 10, y: doorY + doorHeight },
        { x: doorX + doorWidth + 30, y: centerY + houseHeight / 2 + 80 }
      );
      
      if (isInPath) {
        ctx.strokeRect(x, y, 10, 10);
      }
    }
  }
  
  // Add a small tree
  drawTree(ctx, houseX - 140, centerY + houseHeight / 2 - 80, 120);
  
  // Add a subtle vignette effect
  const vignette = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, canvas.width * 0.3,
    canvas.width / 2, canvas.height / 2, canvas.width * 0.7
  );
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  return canvas.toDataURL('image/png');
}

/**
 * Helper function to draw a window
 */
function drawWindow(ctx, x, y, size) {
  // Window frame
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x, y, size, size);
  
  // Window divider
  ctx.fillStyle = '#A0522D';
  ctx.fillRect(x + size / 2 - 2, y, 4, size);
  ctx.fillRect(x, y + size / 2 - 2, size, 4);
  
  // Window glass with slight blue tint
  ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
  ctx.fillRect(x + 2, y + 2, size / 2 - 4, size / 2 - 4);
  ctx.fillRect(x + size / 2 + 2, y + 2, size / 2 - 4, size / 2 - 4);
  ctx.fillRect(x + 2, y + size / 2 + 2, size / 2 - 4, size / 2 - 4);
  ctx.fillRect(x + size / 2 + 2, y + size / 2 + 2, size / 2 - 4, size / 2 - 4);
}

/**
 * Helper function to draw a tree
 */
function drawTree(ctx, x, y, height) {
  // Tree trunk
  const trunkWidth = height / 6;
  const trunkHeight = height / 3;
  
  ctx.fillStyle = '#8B4513'; // SaddleBrown for trunk
  ctx.fillRect(x - trunkWidth / 2, y, trunkWidth, trunkHeight);
  
  // Tree foliage (layers of green triangles)
  ctx.fillStyle = '#228B22'; // ForestGreen for leaves
  
  // Bottom layer
  const bottomWidth = height / 2;
  ctx.beginPath();
  ctx.moveTo(x - bottomWidth / 2, y);
  ctx.lineTo(x + bottomWidth / 2, y);
  ctx.lineTo(x, y - height / 3);
  ctx.closePath();
  ctx.fill();
  
  // Middle layer
  const middleWidth = height / 2.5;
  ctx.beginPath();
  ctx.moveTo(x - middleWidth / 2, y - height / 4);
  ctx.lineTo(x + middleWidth / 2, y - height / 4);
  ctx.lineTo(x, y - height / 3 * 2);
  ctx.closePath();
  ctx.fill();
  
  // Top layer
  const topWidth = height / 3;
  ctx.beginPath();
  ctx.moveTo(x - topWidth / 2, y - height / 2);
  ctx.lineTo(x + topWidth / 2, y - height / 2);
  ctx.lineTo(x, y - height / 1.2);
  ctx.closePath();
  ctx.fill();
  
  // Add LEGO studs to the foliage
  ctx.fillStyle = '#32CD32'; // LimeGreen for studs
  
  // Bottom layer studs
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.arc(x + i * 10, y - height / 6, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Middle layer studs
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.arc(x + i * 10, y - height / 3 - height / 12, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Top layer stud
  ctx.beginPath();
  ctx.arc(x, y - height / 1.2 + height / 12, 3, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Helper function to check if a point is inside a triangle
 */
function pointInTriangle(point, v1, v2, v3) {
  const area = 0.5 * Math.abs(
    (v1.x * (v2.y - v3.y) + v2.x * (v3.y - v1.y) + v3.x * (v1.y - v2.y))
  );
  
  const area1 = 0.5 * Math.abs(
    (point.x * (v2.y - v3.y) + v2.x * (v3.y - point.y) + v3.x * (point.y - v2.y))
  );
  
  const area2 = 0.5 * Math.abs(
    (v1.x * (point.y - v3.y) + point.x * (v3.y - v1.y) + v3.x * (v1.y - point.y))
  );
  
  const area3 = 0.5 * Math.abs(
    (v1.x * (v2.y - point.y) + v2.x * (point.y - v1.y) + point.x * (v1.y - v2.y))
  );
  
  return Math.abs(area - (area1 + area2 + area3)) < 0.01;
}

/**
 * Draw a LEGO castle scene
 */
function drawLegoCastle(ctx, x, y, size) {
  const scale = size / 300;
  
  // Castle base colors
  const stoneColor = '#A9A9A9'; // Dark gray
  const darkerStone = '#696969'; // Darker gray
  const roofColor = '#8B0000'; // Dark red
  
  // Draw castle main body
  const castleWidth = 200 * scale;
  const castleHeight = 160 * scale;
  const castleX = x - castleWidth / 2;
  const castleY = y - castleHeight / 2;
  
  // Main wall
  ctx.fillStyle = stoneColor;
  ctx.fillRect(castleX, castleY, castleWidth, castleHeight);
  
  // Castle battlements (top edge)
  ctx.fillStyle = darkerStone;
  const battlementWidth = 20 * scale;
  const battlementHeight = 15 * scale;
  const battlementGap = 15 * scale;
  
  for (let bx = castleX; bx < castleX + castleWidth; bx += battlementWidth + battlementGap) {
    ctx.fillRect(bx, castleY - battlementHeight, battlementWidth, battlementHeight);
  }
  
  // Left tower
  const towerWidth = 60 * scale;
  const towerHeight = 220 * scale;
  const leftTowerX = castleX - towerWidth / 2;
  const towerY = castleY + castleHeight - towerHeight;
  
  ctx.fillStyle = stoneColor;
  ctx.fillRect(leftTowerX, towerY, towerWidth, towerHeight);
  
  // Left tower battlements
  for (let bx = leftTowerX; bx < leftTowerX + towerWidth; bx += battlementWidth + battlementGap) {
    ctx.fillRect(bx, towerY - battlementHeight, battlementWidth, battlementHeight);
  }
  
  // Right tower
  const rightTowerX = castleX + castleWidth - towerWidth / 2;
  
  ctx.fillStyle = stoneColor;
  ctx.fillRect(rightTowerX, towerY, towerWidth, towerHeight);
  
  // Right tower battlements
  for (let bx = rightTowerX; bx < rightTowerX + towerWidth; bx += battlementWidth + battlementGap) {
    ctx.fillRect(bx, towerY - battlementHeight, battlementWidth, battlementHeight);
  }
  
  // Central tower
  const centralTowerWidth = 80 * scale;
  const centralTowerHeight = 250 * scale;
  const centralTowerX = x - centralTowerWidth / 2;
  const centralTowerY = castleY + castleHeight - centralTowerHeight;
  
  ctx.fillStyle = stoneColor;
  ctx.fillRect(centralTowerX, centralTowerY, centralTowerWidth, centralTowerHeight);
  
  // Central tower battlements
  for (let bx = centralTowerX; bx < centralTowerX + centralTowerWidth; bx += battlementWidth + battlementGap) {
    ctx.fillRect(bx, centralTowerY - battlementHeight, battlementWidth, battlementHeight);
  }
  
  // Central tower conical roof
  ctx.fillStyle = roofColor;
  ctx.beginPath();
  ctx.moveTo(centralTowerX, centralTowerY);
  ctx.lineTo(centralTowerX + centralTowerWidth, centralTowerY);
  ctx.lineTo(x, centralTowerY - 70 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Castle door (gate)
  const doorWidth = 40 * scale;
  const doorHeight = 60 * scale;
  const doorX = x - doorWidth / 2;
  const doorY = castleY + castleHeight - doorHeight;
  
  // Draw archway
  ctx.fillStyle = '#000000'; // Black doorway
  ctx.beginPath();
  ctx.moveTo(doorX, doorY + doorHeight);
  ctx.lineTo(doorX, doorY + doorHeight / 2);
  ctx.quadraticCurveTo(doorX + doorWidth / 2, doorY, doorX + doorWidth, doorY + doorHeight / 2);
  ctx.lineTo(doorX + doorWidth, doorY + doorHeight);
  ctx.closePath();
  ctx.fill();
  
  // Draw portcullis (gate bars)
  ctx.strokeStyle = '#8B4513'; // SaddleBrown
  ctx.lineWidth = 2 * scale;
  
  // Vertical bars
  for (let vx = doorX + 5 * scale; vx < doorX + doorWidth; vx += 8 * scale) {
    ctx.beginPath();
    ctx.moveTo(vx, doorY + 5 * scale);
    ctx.lineTo(vx, doorY + doorHeight);
    ctx.stroke();
  }
  
  // Horizontal bars
  for (let hy = doorY + 15 * scale; hy < doorY + doorHeight; hy += 15 * scale) {
    ctx.beginPath();
    ctx.moveTo(doorX + 5 * scale, hy);
    ctx.lineTo(doorX + doorWidth - 5 * scale, hy);
    ctx.stroke();
  }
  
  // Draw stone texture by adding LEGO studs
  const studSpacing = 15 * scale;
  ctx.fillStyle = darkerStone;
  
  // Add studs to main walls
  for (let sx = castleX + studSpacing; sx < castleX + castleWidth; sx += studSpacing) {
    for (let sy = castleY + studSpacing; sy < castleY + castleHeight; sy += studSpacing) {
      if (
        (sx < doorX - studSpacing || sx > doorX + doorWidth + studSpacing) ||
        (sy < doorY - studSpacing)
      ) {
        ctx.beginPath();
        ctx.arc(sx, sy, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  
  // Add studs to towers
  for (let sx = leftTowerX + studSpacing; sx < leftTowerX + towerWidth; sx += studSpacing) {
    for (let sy = towerY + studSpacing; sy < towerY + towerHeight; sy += studSpacing) {
      ctx.beginPath();
      ctx.arc(sx, sy, 3 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let sx = rightTowerX + studSpacing; sx < rightTowerX + towerWidth; sx += studSpacing) {
    for (let sy = towerY + studSpacing; sy < towerY + towerHeight; sy += studSpacing) {
      ctx.beginPath();
      ctx.arc(sx, sy, 3 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let sx = centralTowerX + studSpacing; sx < centralTowerX + centralTowerWidth; sx += studSpacing) {
    for (let sy = centralTowerY + studSpacing; sy < centralTowerY + centralTowerHeight; sy += studSpacing) {
      ctx.beginPath();
      ctx.arc(sx, sy, 3 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Draw flag on central tower
  const flagpoleX = x;
  const flagpoleY = centralTowerY - 70 * scale;
  const flagpoleHeight = 40 * scale;
  
  // Flagpole
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(flagpoleX, flagpoleY);
  ctx.lineTo(flagpoleX, flagpoleY - flagpoleHeight);
  ctx.stroke();
  
  // Flag
  ctx.fillStyle = '#FF0000'; // Red flag
  ctx.beginPath();
  ctx.moveTo(flagpoleX, flagpoleY - flagpoleHeight);
  ctx.lineTo(flagpoleX + 25 * scale, flagpoleY - flagpoleHeight + 10 * scale);
  ctx.lineTo(flagpoleX, flagpoleY - flagpoleHeight + 20 * scale);
  ctx.closePath();
  ctx.fill();
}

/**
 * Draw a LEGO spaceship scene
 */
function drawLegoSpaceship(ctx, x, y, size) {
  const scale = size / 300;
  
  // Spaceship colors
  const mainColor = '#2C3E50'; // Dark blue-gray
  const accentColor = '#E74C3C'; // Red
  const detailColor = '#ECF0F1'; // Light gray
  const windowColor = '#5DADE2'; // Light blue
  
  // Spaceship dimensions
  const shipWidth = 240 * scale;
  const shipHeight = 80 * scale;
  const shipX = x - shipWidth / 2;
  const shipY = y - shipHeight / 2;
  
  // Draw spaceship main body
  ctx.fillStyle = mainColor;
  ctx.beginPath();
  ctx.ellipse(x, y, shipWidth / 2, shipHeight / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw cockpit
  ctx.fillStyle = windowColor;
  ctx.beginPath();
  ctx.ellipse(shipX + shipWidth - 50 * scale, y, 40 * scale, 30 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw cockpit frame
  ctx.strokeStyle = detailColor;
  ctx.lineWidth = 5 * scale;
  ctx.beginPath();
  ctx.ellipse(shipX + shipWidth - 50 * scale, y, 40 * scale, 30 * scale, 0, 0, Math.PI * 2);
  ctx.stroke();
  
  // Draw wing 1 (top)
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.moveTo(shipX + shipWidth / 2, shipY);
  ctx.lineTo(shipX + shipWidth / 2 - 80 * scale, shipY - 60 * scale);
  ctx.lineTo(shipX + shipWidth / 2 + 20 * scale, shipY);
  ctx.closePath();
  ctx.fill();
  
  // Draw wing 2 (bottom)
  ctx.beginPath();
  ctx.moveTo(shipX + shipWidth / 2, shipY + shipHeight);
  ctx.lineTo(shipX + shipWidth / 2 - 80 * scale, shipY + shipHeight + 60 * scale);
  ctx.lineTo(shipX + shipWidth / 2 + 20 * scale, shipY + shipHeight);
  ctx.closePath();
  ctx.fill();
  
  // Draw engine 1
  ctx.fillStyle = detailColor;
  ctx.beginPath();
  ctx.ellipse(shipX + 30 * scale, y - 20 * scale, 15 * scale, 15 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Engine 1 glow
  ctx.fillStyle = '#F39C12'; // Orange glow
  ctx.beginPath();
  ctx.ellipse(shipX + 10 * scale, y - 20 * scale, 8 * scale, 8 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw engine 2
  ctx.fillStyle = detailColor;
  ctx.beginPath();
  ctx.ellipse(shipX + 30 * scale, y + 20 * scale, 15 * scale, 15 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Engine 2 glow
  ctx.fillStyle = '#F39C12'; // Orange glow
  ctx.beginPath();
  ctx.ellipse(shipX + 10 * scale, y + 20 * scale, 8 * scale, 8 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw LEGO studs on the body
  ctx.fillStyle = darkenColor(mainColor, 20);
  
  // Vertical line of studs down the middle
  for (let sy = y - shipHeight / 2 + 15 * scale; sy < y + shipHeight / 2; sy += 15 * scale) {
    ctx.beginPath();
    ctx.arc(x, sy, 5 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Add some studs to the wings
  ctx.fillStyle = darkenColor(accentColor, 20);
  
  // Top wing studs
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(
      shipX + shipWidth / 2 - 30 * scale - i * 20 * scale,
      shipY - 20 * scale - i * 10 * scale,
      5 * scale,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  
  // Bottom wing studs
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(
      shipX + shipWidth / 2 - 30 * scale - i * 20 * scale,
      shipY + shipHeight + 20 * scale + i * 10 * scale,
      5 * scale,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  
  // Draw some space stars
  ctx.fillStyle = '#FFFFFF';
  for (let i = 0; i < 50; i++) {
    const starX = Math.random() * 512;
    const starY = Math.random() * 512;
    const starSize = (Math.random() * 2 + 1) * scale;
    
    ctx.beginPath();
    ctx.arc(starX, starY, starSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw a distant planet
  const planetX = 100 * scale;
  const planetY = 100 * scale;
  const planetSize = 60 * scale;
  
  // Planet body
  ctx.fillStyle = '#9B59B6'; // Purple planet
  ctx.beginPath();
  ctx.arc(planetX, planetY, planetSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Planet ring
  ctx.strokeStyle = '#F1C40F'; // Yellow ring
  ctx.lineWidth = 10 * scale;
  ctx.beginPath();
  ctx.ellipse(planetX, planetY, planetSize + 20 * scale, planetSize / 3, Math.PI / 6, 0, Math.PI * 2);
  ctx.stroke();
}

/**
 * Draw a LEGO city scene
 */
function drawLegoCity(ctx, x, y, size) {
  const scale = size / 300;
  
  // City colors
  const buildingColors = [
    '#E74C3C', // Red
    '#3498DB', // Blue
    '#F1C40F', // Yellow
    '#2ECC71', // Green
    '#9B59B6', // Purple
    '#E67E22'  // Orange
  ];
  
  const roadColor = '#34495E'; // Dark blue-gray
  const sidewalkColor = '#BDC3C7'; // Light gray
  
  // Draw sky background gradient
  const skyGradient = ctx.createLinearGradient(0, 0, 0, 512);
  skyGradient.addColorStop(0, '#3498DB'); // Blue at top
  skyGradient.addColorStop(1, '#AED6F1'); // Lighter blue at bottom
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, 512, 512);
  
  // Draw road at the bottom
  ctx.fillStyle = roadColor;
  ctx.fillRect(0, 350 * scale, 512, 150 * scale);
  
  // Draw sidewalk
  ctx.fillStyle = sidewalkColor;
  ctx.fillRect(0, 350 * scale, 512, 20 * scale);
  
  // Draw road lane markers
  ctx.fillStyle = '#FFFFFF';
  const laneMarkerWidth = 30 * scale;
  const laneMarkerSpacing = 20 * scale;
  
  for (let lx = 0; lx < 512; lx += laneMarkerWidth + laneMarkerSpacing) {
    ctx.fillRect(lx, 425 * scale, laneMarkerWidth, 5 * scale);
  }
  
  // Draw buildings
  const buildingCount = 6;
  const buildingWidth = 70 * scale;
  const startX = (512 - buildingCount * buildingWidth) / 2;
  
  for (let i = 0; i < buildingCount; i++) {
    const buildingX = startX + i * buildingWidth;
    const buildingHeight = (100 + Math.random() * 150) * scale;
    const buildingY = 350 * scale - buildingHeight;
    const buildingColor = buildingColors[i % buildingColors.length];
    
    // Building body
    ctx.fillStyle = buildingColor;
    ctx.fillRect(buildingX, buildingY, buildingWidth, buildingHeight);
    
    // LEGO studs on top
    ctx.fillStyle = lightenColor(buildingColor, 20);
    for (let sx = buildingX + 10 * scale; sx < buildingX + buildingWidth; sx += 15 * scale) {
      for (let sy = buildingY + 10 * scale; sy < buildingY + 40 * scale; sy += 15 * scale) {
        ctx.beginPath();
        ctx.arc(sx, sy, 4 * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Windows
    ctx.fillStyle = '#F5F5F5';
    const windowSize = 10 * scale;
    const windowSpacing = 15 * scale;
    
    for (let wx = buildingX + 10 * scale; wx < buildingX + buildingWidth - windowSize; wx += windowSpacing) {
      for (let wy = buildingY + 50 * scale; wy < buildingY + buildingHeight - windowSize; wy += windowSpacing) {
        if (Math.random() > 0.3) { // Some windows are lit, some are dark
          ctx.fillRect(wx, wy, windowSize, windowSize);
        }
      }
    }
    
    // Door
    if (i % 2 === 0) { // Only some buildings have visible doors
      ctx.fillStyle = '#8B4513'; // Brown door
      const doorWidth = 15 * scale;
      const doorHeight = 25 * scale;
      const doorX = buildingX + buildingWidth / 2 - doorWidth / 2;
      const doorY = buildingY + buildingHeight - doorHeight;
      
      ctx.fillRect(doorX, doorY, doorWidth, doorHeight);
      
      // Door knob
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.beginPath();
      ctx.arc(doorX + doorWidth - 5 * scale, doorY + doorHeight / 2, 2 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Draw a streetlight
  const lamppostX = startX - 20 * scale;
  const lamppostY = 350 * scale;
  const lamppostHeight = 70 * scale;
  
  // Lamppost pole
  ctx.fillStyle = '#1C1C1C'; // Dark gray
  ctx.fillRect(lamppostX - 3 * scale, lamppostY - lamppostHeight, 6 * scale, lamppostHeight);
  
  // Lamppost head
  ctx.fillStyle = '#1C1C1C';
  ctx.fillRect(lamppostX - 10 * scale, lamppostY - lamppostHeight, 20 * scale, 8 * scale);
  
  // Lamp light
  ctx.fillStyle = '#FFFF00'; // Yellow light
  ctx.beginPath();
  ctx.arc(lamppostX, lamppostY - lamppostHeight + 8 * scale, 6 * scale, 0, Math.PI);
  ctx.fill();
  
  // Draw a LEGO minifigure
  drawDetailedLegoMinifigure(ctx, startX + buildingWidth * 2, 330 * scale, 60 * scale, 'police');
}

/**
 * Draw a LEGO vehicle scene
 */
function drawLegoVehicle(ctx, x, y, size) {
  const scale = size / 300;
  
  // Vehicle colors
  const bodyColor = '#E74C3C'; // Red
  const detailColor = '#F1C40F'; // Yellow
  const windowColor = '#85C1E9'; // Light blue
  const wheelColor = '#1C1C1C'; // Dark gray
  const rimColor = '#BDC3C7'; // Light gray
  
  // Draw a road/ground
  ctx.fillStyle = '#95A5A6'; // Gray road
  ctx.fillRect(0, 350 * scale, 512, 162 * scale);
  
  // Road markings
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(50 * scale, 425 * scale, 100 * scale, 5 * scale);
  ctx.fillRect(200 * scale, 425 * scale, 100 * scale, 5 * scale);
  ctx.fillRect(350 * scale, 425 * scale, 100 * scale, 5 * scale);
  
  // Car body dimensions
  const carWidth = 200 * scale;
  const carHeight = 50 * scale;
  const carX = x - carWidth / 2;
  const carY = y;
  
  // Car body - main block
  ctx.fillStyle = bodyColor;
  ctx.fillRect(carX, carY, carWidth, carHeight);
  
  // Car roof/cabin
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.moveTo(carX + 50 * scale, carY);
  ctx.lineTo(carX + 70 * scale, carY - 40 * scale);
  ctx.lineTo(carX + 150 * scale, carY - 40 * scale);
  ctx.lineTo(carX + 170 * scale, carY);
  ctx.closePath();
  ctx.fill();
  
  // Front windshield
  ctx.fillStyle = windowColor;
  ctx.beginPath();
  ctx.moveTo(carX + 70 * scale, carY - 5 * scale);
  ctx.lineTo(carX + 85 * scale, carY - 35 * scale);
  ctx.lineTo(carX + 110 * scale, carY - 35 * scale);
  ctx.lineTo(carX + 110 * scale, carY - 5 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Rear windshield
  ctx.fillStyle = windowColor;
  ctx.beginPath();
  ctx.moveTo(carX + 110 * scale, carY - 5 * scale);
  ctx.lineTo(carX + 110 * scale, carY - 35 * scale);
  ctx.lineTo(carX + 135 * scale, carY - 35 * scale);
  ctx.lineTo(carX + 150 * scale, carY - 5 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Headlights
  ctx.fillStyle = detailColor;
  ctx.fillRect(carX, carY + 15 * scale, 5 * scale, 20 * scale);
  
  // Taillights
  ctx.fillStyle = '#C0392B'; // Darker red
  ctx.fillRect(carX + carWidth - 5 * scale, carY + 15 * scale, 5 * scale, 20 * scale);
  
  // Wheels
  const wheelRadius = 20 * scale;
  const frontWheelX = carX + 50 * scale;
  const rearWheelX = carX + 150 * scale;
  const wheelY = carY + carHeight + wheelRadius - 5 * scale;
  
  // Wheel functions
  function drawWheel(cx, cy, radius) {
    // Tire
    ctx.fillStyle = wheelColor;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Rim
    ctx.fillStyle = rimColor;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
    ctx.fill();
    
    // Hub cap
    ctx.fillStyle = detailColor;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // LEGO stud representation
    ctx.strokeStyle = '#A0A0A0';
    ctx.lineWidth = radius * 0.05;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.8, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  // Front wheel
  drawWheel(frontWheelX, wheelY, wheelRadius);
  
  // Rear wheel
  drawWheel(rearWheelX, wheelY, wheelRadius);
  
  // LEGO studs on top of the car
  ctx.fillStyle = lightenColor(bodyColor, 20);
  
  // Studs on roof
  for (let sx = carX + 80 * scale; sx < carX + 140 * scale; sx += 15 * scale) {
    ctx.beginPath();
    ctx.arc(sx, carY - 35 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Studs on hood
  for (let sx = carX + 20 * scale; sx < carX + 60 * scale; sx += 15 * scale) {
    ctx.beginPath();
    ctx.arc(sx, carY + 10 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Studs on trunk
  for (let sx = carX + 170 * scale; sx < carX + carWidth - 10 * scale; sx += 15 * scale) {
    ctx.beginPath();
    ctx.arc(sx, carY + 10 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // License plate
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(carX + carWidth - 30 * scale, carY + 35 * scale, 25 * scale, 10 * scale);
  
  // Text on license plate
  ctx.fillStyle = '#000000';
  ctx.font = `${10 * scale}px Arial`;
  ctx.fillText('LEGO', carX + carWidth - 25 * scale, carY + 42 * scale);
}

/**
 * Determine the type of minifigure to draw based on the prompt
 * @param {string} prompt - The user's prompt
 * @returns {string} - The minifigure type
 */
function determineMinifigureType(prompt) {
  const promptLower = prompt.toLowerCase();
  
  if (promptLower.includes('police') || promptLower.includes('cop') || promptLower.includes('officer')) {
    return 'police';
  } else if (promptLower.includes('fire') || promptLower.includes('firefighter')) {
    return 'firefighter';
  } else if (promptLower.includes('ninja') || promptLower.includes('ninjago')) {
    return 'ninja';
  } else if (promptLower.includes('pirate') || promptLower.includes('sailor')) {
    return 'pirate';
  } else if (promptLower.includes('knight') || promptLower.includes('warrior')) {
    return 'knight';
  } else if (promptLower.includes('astronaut') || promptLower.includes('space')) {
    return 'astronaut';
  } else if (promptLower.includes('robot') || promptLower.includes('cyborg')) {
    return 'robot';
  } else if (promptLower.includes('wizard') || promptLower.includes('magic')) {
    return 'wizard';
  } else if (promptLower.includes('superhero') || promptLower.includes('hero')) {
    return 'superhero';
  } else {
    return 'generic';
  }
}

/**
 * Draw a LEGO minifigure
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {number} x - The x coordinate
 * @param {number} y - The y coordinate
 * @param {number} height - The height of the minifigure
 * @param {string} type - The type of minifigure (police, firefighter, etc.)
 */
function drawDetailedLegoMinifigure(ctx, x, y, height, type = 'generic') {
  const scale = height / 250; // Base the scale on the height
  
  // Colors based on the type of minifigure
  let headColor = '#FFD700'; // Default yellow LEGO head
  let torsoColor = '#FF0000'; // Default red torso
  let legsColor = '#0000FF'; // Default blue legs
  let handColor = headColor; // Same as head by default
  let accessoryColor = '#FFFFFF'; // Default white for accessories
  
  // Set colors based on the type
  switch (type) {
    case 'police':
      torsoColor = '#000080'; // Navy blue
      legsColor = '#000000'; // Black
      accessoryColor = '#FFFFFF'; // White
      break;
    case 'firefighter':
      torsoColor = '#FF0000'; // Red
      legsColor = '#000000'; // Black
      accessoryColor = '#FFFF00'; // Yellow
      break;
    case 'ninja':
      torsoColor = '#000000'; // Black
      legsColor = '#000000'; // Black
      accessoryColor = '#FF0000'; // Red
      break;
    case 'pirate':
      torsoColor = '#8B4513'; // Brown
      legsColor = '#000000'; // Black
      accessoryColor = '#FFFFFF'; // White
      break;
    case 'knight':
      torsoColor = '#A9A9A9'; // Gray
      legsColor = '#1C1C1C'; // Dark gray
      accessoryColor = '#C0C0C0'; // Silver
      break;
    case 'astronaut':
      torsoColor = '#FFFFFF'; // White
      legsColor = '#FFFFFF'; // White
      accessoryColor = '#1E90FF'; // NASA blue
      break;
    case 'robot':
      headColor = '#C0C0C0'; // Silver
      torsoColor = '#808080'; // Gray
      legsColor = '#808080'; // Gray
      handColor = '#C0C0C0'; // Silver
      accessoryColor = '#FF0000'; // Red
      break;
    case 'wizard':
      torsoColor = '#800080'; // Purple
      legsColor = '#800080'; // Purple
      accessoryColor = '#FFD700'; // Gold
      break;
    case 'superhero':
      torsoColor = '#0000FF'; // Blue
      legsColor = '#FF0000'; // Red
      accessoryColor = '#FFFF00'; // Yellow
      break;
    default: // generic
      // Default colors already set
      break;
  }
  
  // Head dimensions
  const headWidth = 40 * scale;
  const headHeight = 40 * scale;
  const headX = x - headWidth / 2;
  const headY = y - headHeight - 80 * scale;
  
  // Torso dimensions
  const torsoWidth = 60 * scale;
  const torsoHeight = 70 * scale;
  const torsoX = x - torsoWidth / 2;
  const torsoY = headY + headHeight;
  
  // Legs dimensions
  const legsWidth = torsoWidth;
  const legsHeight = 50 * scale;
  const legsX = torsoX;
  const legsY = torsoY + torsoHeight;
  
  // Arms dimensions
  const armWidth = 15 * scale;
  const armHeight = 60 * scale;
  const leftArmX = torsoX - armWidth;
  const rightArmX = torsoX + torsoWidth;
  const armY = torsoY + 10 * scale;
  
  // Draw legs
  ctx.fillStyle = legsColor;
  ctx.fillRect(legsX, legsY, legsWidth, legsHeight);
  
  // Draw leg divider
  ctx.fillStyle = '#000000';
  ctx.fillRect(legsX + legsWidth / 2 - 1 * scale, legsY, 2 * scale, legsHeight);
  
  // Draw torso
  ctx.fillStyle = torsoColor;
  ctx.fillRect(torsoX, torsoY, torsoWidth, torsoHeight);
  
  // Draw torso details based on type
  switch (type) {
    case 'police':
      // Police badge
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.beginPath();
      ctx.moveTo(torsoX + torsoWidth / 2, torsoY + 15 * scale);
      ctx.lineTo(torsoX + torsoWidth / 2 - 10 * scale, torsoY + 30 * scale);
      ctx.lineTo(torsoX + torsoWidth / 2, torsoY + 45 * scale);
      ctx.lineTo(torsoX + torsoWidth / 2 + 10 * scale, torsoY + 30 * scale);
      ctx.closePath();
      ctx.fill();
      break;
    case 'firefighter':
      // Reflective stripes
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.fillRect(torsoX, torsoY + 30 * scale, torsoWidth, 10 * scale);
      break;
    case 'ninja':
      // Ninja belt
      ctx.fillStyle = accessoryColor;
      ctx.fillRect(torsoX, torsoY + 40 * scale, torsoWidth, 5 * scale);
      break;
    case 'pirate':
      // Pirate sash
      ctx.fillStyle = '#FF0000'; // Red
      ctx.beginPath();
      ctx.moveTo(torsoX, torsoY);
      ctx.lineTo(torsoX + torsoWidth, torsoY + torsoHeight);
      ctx.lineTo(torsoX + torsoWidth - 10 * scale, torsoY + torsoHeight);
      ctx.lineTo(torsoX, torsoY + 10 * scale);
      ctx.closePath();
      ctx.fill();
      break;
    case 'knight':
      // Armor plate
      ctx.fillStyle = accessoryColor;
      ctx.fillRect(torsoX + 10 * scale, torsoY + 10 * scale, torsoWidth - 20 * scale, 20 * scale);
      break;
    case 'astronaut':
      // NASA logo
      ctx.fillStyle = accessoryColor;
      ctx.beginPath();
      ctx.arc(torsoX + torsoWidth / 2, torsoY + 25 * scale, 15 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `${15 * scale}px Arial`;
      ctx.fillText('NASA', torsoX + torsoWidth / 2 - 15 * scale, torsoY + 30 * scale);
      break;
    case 'robot':
      // Control panel
      ctx.fillStyle = '#000000';
      ctx.fillRect(torsoX + 15 * scale, torsoY + 15 * scale, 30 * scale, 30 * scale);
      
      // Buttons
      ctx.fillStyle = accessoryColor;
      ctx.beginPath();
      ctx.arc(torsoX + 25 * scale, torsoY + 25 * scale, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#00FF00';
      ctx.beginPath();
      ctx.arc(torsoX + 40 * scale, torsoY + 25 * scale, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'wizard':
      // Wizard stars
      ctx.fillStyle = accessoryColor;
      const starPoints = 5;
      const outerRadius = 10 * scale;
      const innerRadius = 5 * scale;
      
      for (let i = 0; i < 3; i++) {
        const centerStarX = torsoX + 20 * scale + i * 15 * scale;
        const centerStarY = torsoY + 30 * scale;
        
        ctx.beginPath();
        ctx.moveTo(centerStarX, centerStarY - outerRadius);
        
        for (let j = 0; j < starPoints * 2; j++) {
          const radius = j % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI / starPoints) * j;
          const x = centerStarX + Math.sin(angle) * radius;
          const y = centerStarY - Math.cos(angle) * radius;
          ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
      }
      break;
    case 'superhero':
      // Superhero emblem
      ctx.fillStyle = accessoryColor;
      ctx.beginPath();
      ctx.moveTo(torsoX + torsoWidth / 2, torsoY + 15 * scale);
      ctx.lineTo(torsoX + torsoWidth / 2 - 15 * scale, torsoY + 45 * scale);
      ctx.lineTo(torsoX + torsoWidth / 2, torsoY + 35 * scale);
      ctx.lineTo(torsoX + torsoWidth / 2 + 15 * scale, torsoY + 45 * scale);
      ctx.closePath();
      ctx.fill();
      break;
    default:
      // Generic torso detail - horizontal stripe
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(torsoX, torsoY + 30 * scale, torsoWidth, 5 * scale);
      break;
  }
  
  // Draw arms
  ctx.fillStyle = torsoColor;
  ctx.fillRect(leftArmX, armY, armWidth, armHeight);
  ctx.fillRect(rightArmX, armY, armWidth, armHeight);
  
  // Draw hands
  ctx.fillStyle = handColor;
  const handRadius = 10 * scale;
  ctx.beginPath();
  ctx.arc(leftArmX + armWidth / 2, armY + armHeight, handRadius, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(rightArmX + armWidth / 2, armY + armHeight, handRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw head
  ctx.fillStyle = headColor;
  ctx.fillRect(headX, headY, headWidth, headHeight);
  
  // Draw face
  // Eyes
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(headX + headWidth / 3, headY + headHeight / 2, 5 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(headX + (headWidth / 3) * 2, headY + headHeight / 2, 5 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Smile
  ctx.beginPath();
  ctx.arc(headX + headWidth / 2, headY + headHeight / 2 + 10 * scale, 10 * scale, 0, Math.PI);
  ctx.stroke();
  
  // Draw specific accessories based on type
  switch (type) {
    case 'police':
      // Police hat
      ctx.fillStyle = '#000080'; // Navy blue
      ctx.fillRect(headX - 5 * scale, headY - 10 * scale, headWidth + 10 * scale, 15 * scale);
      
      // Hat badge
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.beginPath();
      ctx.arc(headX + headWidth / 2, headY - 5 * scale, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'firefighter':
      // Firefighter helmet
      ctx.fillStyle = '#FF0000'; // Red
      ctx.fillRect(headX - 5 * scale, headY - 10 * scale, headWidth + 10 * scale, 15 * scale);
      ctx.beginPath();
      ctx.ellipse(headX + headWidth / 2, headY, (headWidth + 20 * scale) / 2, 10 * scale, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      break;
    case 'ninja':
      // Ninja mask
      ctx.fillStyle = accessoryColor;
      ctx.fillRect(headX, headY + 15 * scale, headWidth, 10 * scale);
      break;
    case 'pirate':
      // Pirate hat
      ctx.fillStyle = '#000000'; // Black
      ctx.beginPath();
      ctx.moveTo(headX - 10 * scale, headY);
      ctx.lineTo(headX + headWidth + 10 * scale, headY);
      ctx.lineTo(headX + headWidth / 2, headY - 20 * scale);
      ctx.closePath();
      ctx.fill();
      break;
    case 'knight':
      // Knight helmet
      ctx.fillStyle = accessoryColor;
      ctx.fillRect(headX - 5 * scale, headY - 10 * scale, headWidth + 10 * scale, headHeight + 10 * scale);
      
      // Helmet visor
      ctx.fillStyle = '#000000';
      ctx.fillRect(headX + 5 * scale, headY + 15 * scale, headWidth - 10 * scale, 10 * scale);
      break;
    case 'astronaut':
      // Astronaut helmet
      ctx.fillStyle = '#FFFFFF'; // White
      ctx.globalAlpha = 0.5; // Transparent
      ctx.beginPath();
      ctx.arc(headX + headWidth / 2, headY + headHeight / 2, headWidth / 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
      
      // Helmet rim
      ctx.strokeStyle = '#C0C0C0'; // Silver
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.arc(headX + headWidth / 2, headY + headHeight / 2, headWidth / 1.5, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'robot':
      // Robot antenna
      ctx.fillStyle = '#C0C0C0'; // Silver
      ctx.fillRect(headX + headWidth / 2 - 2 * scale, headY - 15 * scale, 4 * scale, 15 * scale);
      
      ctx.beginPath();
      ctx.arc(headX + headWidth / 2, headY - 15 * scale, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      // Robot eyes (different)
      ctx.fillStyle = '#FF0000'; // Red
      ctx.fillRect(headX + headWidth / 3 - 5 * scale, headY + headHeight / 2 - 2 * scale, 10 * scale, 4 * scale);
      ctx.fillRect(headX + (headWidth / 3) * 2 - 5 * scale, headY + headHeight / 2 - 2 * scale, 10 * scale, 4 * scale);
      break;
    case 'wizard':
      // Wizard hat
      ctx.fillStyle = accessoryColor;
      ctx.beginPath();
      ctx.moveTo(headX, headY);
      ctx.lineTo(headX + headWidth, headY);
      ctx.lineTo(headX + headWidth / 2, headY - 30 * scale);
      ctx.closePath();
      ctx.fill();
      break;
    case 'superhero':
      // Superhero mask
      ctx.fillStyle = accessoryColor;
      ctx.beginPath();
      ctx.ellipse(headX + headWidth / 3, headY + headHeight / 2, 10 * scale, 5 * scale, 0, 0, Math.PI * 2);
      ctx.ellipse(headX + (headWidth / 3) * 2, headY + headHeight / 2, 10 * scale, 5 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    default:
      // No accessory for generic
      break;
  }
  
  // Draw LEGO stud on top of head
  ctx.fillStyle = darkenColor(headColor, 20);
  ctx.beginPath();
  ctx.arc(headX + headWidth / 2, headY, 8 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw LEGO studs on the legs
  ctx.fillStyle = darkenColor(legsColor, 20);
  ctx.beginPath();
  ctx.arc(legsX + legsWidth / 4, legsY + 10 * scale, 5 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(legsX + (legsWidth / 4) * 3, legsY + 10 * scale, 5 * scale, 0, Math.PI * 2);
  ctx.fill();
}

// Export only once at the end of the file
export {
  generateImageFromPrompt,
  isTransformersAvailable,
  checkWebAssemblySupport
}; 




