/**
 * Test script to verify Hugging Face API access
 * 
 * This can be run in the browser console to test if the API key works
 */

// Your Hugging Face API token
const API_TOKEN = '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';

// API URL
const API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1';

/**
 * Test the Hugging Face API connection
 * @returns {Promise<void>}
 */
export async function testHuggingFaceAPI() {
  console.log('Testing Hugging Face API connection...');
  
  try {
    // Simple test query
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: 'A simple test image of a LEGO brick',
        parameters: {
          seed: 42,
          guidance_scale: 7.5,
          num_inference_steps: 5 // Use minimal steps for a quick test
        }
      }),
    });

    if (response.ok) {
      console.log('✅ SUCCESS: API connection works!');
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries([...response.headers]));
      return true;
    } else {
      console.error('❌ ERROR: API connection failed');
      console.error('Status:', response.status);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return false;
    }
  } catch (error) {
    console.error('❌ ERROR: Exception during API test');
    console.error(error);
    return false;
  }
}

// Function to test models info endpoint
export async function checkModelsEndpoint() {
  console.log('Checking models info endpoint...');
  
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ SUCCESS: Models endpoint works!');
      console.log('Model info:', data);
      return true;
    } else {
      console.error('❌ ERROR: Models endpoint failed');
      console.error('Status:', response.status);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return false;
    }
  } catch (error) {
    console.error('❌ ERROR: Exception during models endpoint test');
    console.error(error);
    return false;
  }
}

// For browser console testing (uncomment to use)
// window.testHuggingFaceAPI = testHuggingFaceAPI;
// window.checkModelsEndpoint = checkModelsEndpoint; 