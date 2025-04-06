# API Setup Guide for Brick-It Web App

This document provides detailed instructions for setting up the Hugging Face API integration for the Brick-It web application.

## API Access Options

The application offers multiple methods to connect to the Hugging Face API for image generation:

1. **Direct Browser-to-API Connection** (Default)
   - Makes calls directly from the browser to the Hugging Face API
   - Uses environment variables for API token
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

### Option 1: Local Development with Environment Variables

1. Get a Hugging Face API token from [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

2. Create a `.env.local` file in the root directory (this file will not be committed to the repository):

   ```
   # API Keys
   VITE_HUGGINGFACE_API_TOKEN=your_actual_token_here
   
   # For serverless functions
   HUGGINGFACE_API_TOKEN=your_actual_token_here
   ```

3. The application will automatically pick up these environment variables during development.

### Option 2: Netlify Deployment (Recommended for Production)

1. In your Netlify dashboard, go to Site settings > Build & deploy > Environment

2. Add these environment variables:
   - `VITE_HUGGINGFACE_API_TOKEN` (for browser code)
   - `HUGGINGFACE_API_TOKEN` (for serverless functions)

3. Set each variable to your actual Hugging Face API token

4. For local development with Netlify Functions, create a `functions-dev.env.local` file (not committed to the repository):

   ```
   HUGGINGFACE_API_TOKEN=your_actual_token_here
   MODEL_ID=stabilityai/stable-diffusion-2-1
   INFERENCE_STEPS_FAST=20
   INFERENCE_STEPS_HIGH=30
   GUIDANCE_SCALE=7.5
   ```

5. Install the Netlify CLI for local function testing:

   ```bash
   npm install -g netlify-cli
   ```

6. Run the application with Netlify Functions:

   ```bash
   npm run netlify:dev
   ```

## IMPORTANT: Security Notes

1. **NEVER hardcode API tokens in your source code**
2. **NEVER commit `.env.local` or any files with real API tokens to your repository**
3. Always use environment variables for sensitive information
4. The `.env` and `.env.example` files should contain only placeholders, not real tokens

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
3. Check that your environment variables are set correctly
4. For Netlify, check that your environment variables are configured in the dashboard

### Model Loading Errors

If you see "model is loading" errors:

1. This is normal the first time you use a model
2. Wait 1-2 minutes and try again
3. Try using a smaller/faster model if problems persist

## API Implementation Files

The key files involved in the API implementation are:

- `app/src/utils/env.js` - Environment variable management
- `app/src/api/directImageGen.js` - Direct API implementation
- `app/src/api/corsProxy.js` - CORS proxy implementation
- `app/src/api/testHuggingFace.js` - API testing utilities
- `app/src/utils/apiService.js` - Main service that coordinates API calls
- `netlify/functions/generateImage.js` - Netlify serverless function

## Modifying the API Configuration

To change the model or generation parameters:

1. Update your environment variables:
   - `VITE_HF_API_URL` - The model endpoint URL
   - `VITE_INFERENCE_STEPS_FAST` - Steps for fast generation
   - `VITE_INFERENCE_STEPS_HIGH` - Steps for high quality generation
   - `VITE_GUIDANCE_SCALE` - Guidance scale value

2. If using Netlify Functions, also update:
   - `functions-dev.env.local` for local development
   - Environment variables in your Netlify dashboard for production 