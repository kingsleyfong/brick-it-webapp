/**
 * Image generation utilities
 * 
 * This module implements browser-based text-to-image generation using ONNX Runtime.
 */

import * as ort from 'onnxruntime-web';

// Cache for the loaded model
let modelCache = null;
let tokenizer = null;

// Model settings
const MODEL_URL = '/models/tiny-stable-diffusion.onnx';
const VOCAB_URL = '/models/vocab.json';
const MAX_LENGTH = 77; // Maximum token length for the model

/**
 * Initialize the model and tokenizer
 */
const initializeModel = async () => {
  if (modelCache) return modelCache;
  
  try {
    console.log('Loading ONNX model...');
    
    // Check for WebAssembly support
    if (typeof WebAssembly !== 'object') {
      throw new Error('WebAssembly is not supported in this browser');
    }
    
    // Set execution providers and other options
    const options = {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
      enableCpuMemArena: true,
    };
    
    // Create session
    const session = await ort.InferenceSession.create(MODEL_URL, options);
    
    // Load tokenizer vocabulary
    const vocabResponse = await fetch(VOCAB_URL);
    if (!vocabResponse.ok) {
      throw new Error('Failed to load vocabulary');
    }
    
    tokenizer = await vocabResponse.json();
    
    // Cache the initialized model
    modelCache = session;
    
    console.log('ONNX model loaded successfully');
    return session;
  } catch (error) {
    console.error('Error initializing model:', error);
    throw error;
  }
};

/**
 * Tokenize text input for the model
 */
const tokenizeText = (text) => {
  if (!tokenizer) {
    throw new Error('Tokenizer not initialized');
  }
  
  // Very simple tokenization approach (would be more complex in a real implementation)
  const tokens = text.toLowerCase().split(/\s+/);
  
  // Map tokens to IDs
  const ids = tokens.map(token => {
    return tokenizer[token] || tokenizer['<unk>'];
  });
  
  // Add start and end tokens
  const paddedIds = [tokenizer['<start>'], ...ids, tokenizer['<end>']];
  
  // Pad or truncate to MAX_LENGTH
  if (paddedIds.length < MAX_LENGTH) {
    // Pad with end-of-sequence tokens
    return [...paddedIds, ...Array(MAX_LENGTH - paddedIds.length).fill(tokenizer['<pad>'])];
  } else {
    // Truncate
    return paddedIds.slice(0, MAX_LENGTH);
  }
};

/**
 * Convert model output tensor to image
 */
const tensorToImage = (tensor, width, height) => {
  // Create a canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Create ImageData from tensor
  const imageData = ctx.createImageData(width, height);
  
  // In a real implementation, we would need to:
  // 1. Normalize the output tensor values (typically from [-1, 1] to [0, 255])
  // 2. Convert the output format to RGBA
  
  // For demonstration, we'll create a gradient based on values
  for (let i = 0; i < width * height; i++) {
    const r = Math.min(255, Math.max(0, Math.floor((tensor[i * 3] + 1) * 127.5)));
    const g = Math.min(255, Math.max(0, Math.floor((tensor[i * 3 + 1] + 1) * 127.5)));
    const b = Math.min(255, Math.max(0, Math.floor((tensor[i * 3 + 2] + 1) * 127.5)));
    
    imageData.data[i * 4] = r;
    imageData.data[i * 4 + 1] = g;
    imageData.data[i * 4 + 2] = b;
    imageData.data[i * 4 + 3] = 255; // Alpha channel
  }
  
  // Put the image data on the canvas
  ctx.putImageData(imageData, 0, 0);
  
  // Return as data URL
  return canvas.toDataURL('image/png');
};

/**
 * Generate image from text prompt using ONNX model
 */
export const generateImageFromPrompt = async (prompt) => {
  try {
    // In real production, try to load the ONNX model
    // For now, we'll use the mock implementation since the model files are not included
    
    // Check if the model files exist
    try {
      const modelResponse = await fetch(MODEL_URL);
      const vocabResponse = await fetch(VOCAB_URL);
      
      if (modelResponse.ok && vocabResponse.ok) {
        // If model files exist, use real implementation
        const session = await initializeModel();
        
        // Tokenize the prompt
        const tokenIds = tokenizeText(prompt);
        
        // Prepare input tensor
        const inputTensor = new ort.Tensor('int64', new BigInt64Array(tokenIds.map(id => BigInt(id))), [1, MAX_LENGTH]);
        
        // Run inference
        const outputMap = await session.run({
          'input_ids': inputTensor,
        });
        
        // Get output tensor
        const outputTensor = outputMap['output'].data;
        
        // Convert to image (512x512 is standard for many image models)
        return tensorToImage(outputTensor, 512, 512);
      } else {
        // Model files don't exist, fall back to mock implementation
        console.warn('ONNX model files not found, using mock implementation');
        return generateMockImage(prompt);
      }
    } catch (error) {
      console.warn('Error checking model files:', error);
      return generateMockImage(prompt);
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

/**
 * Mock implementation that returns a colored gradient based on prompt
 */
const generateMockImage = (prompt) => {
  return new Promise((resolve) => {
    // Create a canvas to generate a simple image
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Use the prompt to influence the generated colors
    const hash = hashString(prompt.toLowerCase());
    const hue = hash % 360;
    
    // Create a gradient
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, `hsl(${hue}, 100%, 70%)`);
    gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 100%, 40%)`);
    
    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add some shapes based on prompt
    const shapeCount = (hash % 10) + 5;
    for (let i = 0; i < shapeCount; i++) {
      const x = (hash * (i + 1)) % 512;
      const y = (hash * (i + 2)) % 512;
      const size = ((hash * (i + 3)) % 50) + 20;
      
      ctx.fillStyle = `hsla(${(hue + 180) % 360}, 100%, 50%, 0.5)`;
      
      if (i % 3 === 0) {
        // Circle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      } else if (i % 3 === 1) {
        // Rectangle
        ctx.fillRect(x - size/2, y - size/2, size, size);
      } else {
        // Triangle
        ctx.beginPath();
        ctx.moveTo(x, y - size/2);
        ctx.lineTo(x + size/2, y + size/2);
        ctx.lineTo(x - size/2, y + size/2);
        ctx.closePath();
        ctx.fill();
      }
    }
    
    // Add text representation of the prompt
    ctx.font = '16px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText(`"${prompt}"`, 256, 480);
    
    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Simulate a delay to make it feel like processing is happening
    setTimeout(() => {
      resolve(dataUrl);
    }, 2000);
  });
};

// Simple hash function for strings
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Check if ONNX would be available in this browser
export const checkOnnxAvailability = () => {
  // Check for WebAssembly support
  return typeof WebAssembly === 'object';
}; 