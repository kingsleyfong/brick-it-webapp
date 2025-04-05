/**
 * API Service for Hugging Face image generation
 * 
 * Handles communication with the Hugging Face API through our direct implementation
 * and fallback mechanisms
 */

import { generateImage } from '../api/directImageGen';
import { generateImageDirect } from '../api/huggingFaceDirect';

/**
 * Generate a fallback image when API is not available
 * Creates a simple colorful pattern based on the prompt's hash
 * @param {string} prompt - The text prompt
 * @param {number} seed - Seed for reproducibility
 * @returns {Promise<Object>} A data URL of the generated image
 */
const generateFallbackImage = async (prompt, seed = null) => {
  try {
    // Use seed if provided, otherwise generate from prompt
    const usedSeed = seed || Array.from(prompt).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Create a canvas
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Generate a pseudorandom but deterministic pattern
    const rng = (n) => {
      return (Math.sin(n * usedSeed) * 10000) % 1;
    };

    // Fill background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add "LEGO" text
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e02020';
    ctx.fillText('LEGO', canvas.width / 2, 70);
    
    // Add the prompt as text
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    
    // Word wrap the prompt text
    const words = prompt.split(' ');
    let line = '';
    let y = 120;
    words.forEach((word) => {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > canvas.width - 40) {
        ctx.fillText(line, canvas.width / 2, y);
        line = word + ' ';
        y += 25;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, canvas.width / 2, y);
    
    // Draw some colorful blocks in a grid
    const blockSize = 40;
    const gridSize = Math.floor(canvas.width / blockSize);
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Only fill some blocks based on the seed
        if (rng(i * gridSize + j) > 0.7) {
          // Generate a color based on position and seed
          const r = Math.floor(rng(i) * 255);
          const g = Math.floor(rng(j) * 255);
          const b = Math.floor(rng(i + j) * 255);
          
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(
            i * blockSize + 5, 
            j * blockSize + 170, 
            blockSize - 10, 
            blockSize - 10
          );
        }
      }
    }
    
    // Add "Fallback Image" text at the bottom
    ctx.font = '16px Arial';
    ctx.fillStyle = '#555';
    ctx.fillText('Generated Fallback Image', canvas.width / 2, canvas.height - 20);
    
    // Convert to data URL
    const imageUrl = canvas.toDataURL('image/png');
    
    // Return the image URL as a fallback
    return {
      success: true,
      imageUrl,
      isFallback: true,
      seed: seed || 0
    };
  } catch (err) {
    console.error("Error generating fallback image:", err);
    return {
      success: false,
      error: "Failed to generate even a fallback image",
      isFallback: true
    };
  }
};

/**
 * Generate an image using the Hugging Face API
 * Uses multiple methods to ensure high success rate
 * @param {string} prompt - The text prompt to generate an image from
 * @param {string} quality - Quality setting ('fast' or 'high')
 * @param {number} seed - Optional seed for reproducible generation
 * @returns {Promise<Object>} The generated image data
 */
export const generateImageFromAPI = async (prompt, quality = 'high', seed = null) => {
  try {
    console.log(`Generating image for prompt: "${prompt}", quality: ${quality}, seed: ${seed || 'random'}`);
    
    // Try all available methods in sequence
    
    // Method 1: Direct methods that might bypass CORS completely
    try {
      console.log("Trying huggingFaceDirect methods");
      const directResult = await generateImageDirect(prompt, { quality, seed });
      
      if (directResult.success) {
        console.log("huggingFaceDirect succeeded using method:", directResult.method);
        return {
          success: true,
          imageUrl: directResult.image,
          isAI: true,
          seed: directResult.seed || seed,
          method: `direct-${directResult.method}`
        };
      } else {
        console.warn("huggingFaceDirect failed:", directResult.error);
      }
    } catch (directError) {
      console.warn("Error in huggingFaceDirect:", directError);
    }
    
    // Method 2: Our CORS proxy approach
    try {
      console.log("Trying CORS proxy method via directImageGen");
      const proxyResult = await generateImage(prompt, quality, seed);
      
      if (proxyResult.success) {
        console.log("CORS proxy approach succeeded");
        return {
          success: true,
          imageUrl: proxyResult.image,
          isAI: true,
          seed: proxyResult.seed || seed,
          method: "cors-proxy"
        };
      } else {
        // Check if the model is loading
        if (proxyResult.isLoading) {
          return {
            success: false,
            isLoading: true,
            error: proxyResult.error || 'Model is loading, please try again shortly',
          };
        }
        
        console.warn("CORS proxy approach failed:", proxyResult.error);
      }
    } catch (proxyError) {
      console.warn("Error in CORS proxy approach:", proxyError);
    }
    
    // If we get here, all API methods failed
    console.warn('All API methods failed, using fallback image generator');
    console.log('Generating fallback image instead...');
    
    // Use the fallback generator
    return await generateFallbackImage(prompt, seed);
  } catch (error) {
    console.error('Error in image generation process:', error);
    // Ultimate fallback in case of any unexpected errors
    return await generateFallbackImage(prompt, seed);
  }
};

export default {
  generateImageFromAPI,
  generateFallbackImage
}; 