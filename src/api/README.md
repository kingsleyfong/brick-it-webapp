# API Integration Guide

This directory contains the API integration code for Brick It's image generation features.

## API Token Setup

For the image generation features to work, you need a Hugging Face API token:

1. Create an account at [Hugging Face](https://huggingface.co/)
2. Get your API token from [Settings/Tokens](https://huggingface.co/settings/tokens)
3. Add your token to your environment:

   **For local development:**
   - Create a `.env.local` file in the app directory with:
     ```
     VITE_HUGGINGFACE_API_TOKEN=your_actual_token_here
     ```

   **For Netlify deployment:**
   - Add the environment variable in the Netlify dashboard
   - Site settings > Build & deploy > Environment variables
   - Add `HUGGINGFACE_API_TOKEN` with your actual token

## Security Best Practices

- NEVER commit real API tokens to Git
- Always use environment variables for sensitive information
- Use `.env.local` files for local development (these are git-ignored)
- For production, use Netlify environment variables

## API Implementation Details

This directory contains multiple approaches to API integration:

- `corsProxy.js` - CORS proxy implementation to bypass browser restrictions
- `directImageGen.js` - Direct API implementation for browsers
- `huggingFaceDirect.js` - Alternative approaches to API calls
- `testHuggingFace.js` - Testing utilities for the API

## Troubleshooting

If image generation isn't working:

1. Check your API token is correctly set up
2. Test the connection with the API debugger
3. Try the "fast" quality setting first
4. Try a simple prompt like "red square"

For CORS issues, try:
- Using the API debugger to test different proxies
- Temporarily disabling browser extensions
- Using the "Fix CORS Access" button to whitelist the CORS Anywhere proxy

See `API_SETUP.md` for more detailed configuration instructions. 