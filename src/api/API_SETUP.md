# API Setup Guide for Brick-It Web App

This document provides detailed instructions for setting up the Hugging Face API integration for the Brick-It web application.

## API Access Options

The application offers multiple methods to connect to the Hugging Face API for image generation:

1. **Direct Browser-to-API Connection** (Default)
   - Makes calls directly from the browser to the Hugging Face API
   - Requires an API token in the code
   - May encounter CORS issues depending on browser settings

2. **CORS Proxy** (Fallback)
   - Uses public CORS proxies to route API requests
   - Attempts multiple proxies in succession if one fails
   - More reliable than direct connection for browser environments

3. **Netlify Functions** (Production)
   - Server-side API calls via Netlify Functions
   - Most secure way to protect your API token
   - Requires Netlify deployment setup

## Setting Up Your API Token

### Option 1: Direct Browser Implementation

1. Get a Hugging Face API token from [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

2. Open the file `app/src/api/directImageGen.js` and replace the placeholder API token:

   ```javascript
   // Replace this with your actual token
   const API_TOKEN = 'your_api_token_here';
   ```

3. Open the file `app/src/api/testHuggingFace.js` and also replace the API token there:

   ```javascript
   // Your Hugging Face API token
   const API_TOKEN = 'your_api_token_here';
   ```

### Option 2: Netlify Functions (Recommended for Production)

1. Create a `.env` file in the root directory:

   ```
   HUGGINGFACE_API_TOKEN=your_api_token_here
   ```

2. For local development with Netlify Functions, create a `functions-dev.env` file:

   ```
   HUGGINGFACE_API_TOKEN=your_api_token_here
   MODEL_ID=stabilityai/stable-diffusion-2-1
   INFERENCE_STEPS_FAST=20
   INFERENCE_STEPS_HIGH=30
   GUIDANCE_SCALE=7.5
   ```

3. Install the Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

4. Run the application with Netlify Functions:

   ```bash
   npm run netlify:dev
   ```

## API Testing

The application includes a built-in API tester to help debug connection issues:

1. Go to the Mosaic Start or Image Preview page

2. Click the "API Debug" button in the top-right corner

3. Use the API tester interface to:
   - Test basic API connection
   - Check the models endpoint
   - Try generating a test image

## Troubleshooting

### CORS Issues

If you encounter CORS errors with the direct implementation:

1. The application will automatically attempt to use the CORS proxy
2. The CORS proxy may be blocked by some corporate firewalls
3. Try using a different browser or network connection

### API Token Not Working

If your API token is rejected:

1. Verify your token is still valid on the Hugging Face website
2. Ensure you have access to the Stable Diffusion model
3. Check for typos when copying the token

### Model Loading Errors

If you see "model is loading" errors:

1. This is normal the first time you use a model
2. Wait 1-2 minutes and try again
3. Try using a smaller/faster model if problems persist

## API Implementation Files

The key files involved in the API implementation are:

- `app/src/api/directImageGen.js` - Direct API implementation
- `app/src/api/corsProxy.js` - CORS proxy implementation
- `app/src/api/testHuggingFace.js` - API testing utilities
- `app/src/utils/apiService.js` - Main service that coordinates API calls
- `netlify/functions/generateImage.js` - Netlify serverless function

## Modifying the API Configuration

To change the model or generation parameters:

1. Open `app/src/api/directImageGen.js` to modify:
   - The model ID (HF_API_URL)
   - Inference steps
   - Guidance scale

2. If using Netlify Functions, also update:
   - `functions-dev.env` for local development
   - Environment variables in your Netlify dashboard for production 