/**
 * Pre-build security check script
 * 
 * This script runs before the build process to ensure no real API tokens
 * are being bundled into the JavaScript.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Patterns that might indicate API tokens
const TOKEN_PATTERNS = [
  /hf_[a-zA-Z0-9]{30,}/g,  // Hugging Face token pattern
  /sk-[a-zA-Z0-9]{30,}/g,  // OpenAI token pattern
  /ghp_[a-zA-Z0-9]{30,}/g, // GitHub token pattern
  /[a-zA-Z0-9_-]{30,}\.[a-zA-Z0-9_-]{50,}/g, // JWT-like tokens
];

// Files to check (source files that might contain tokens)
const CRITICAL_FILES = [
  'src/utils/env.js',
  'src/api/directImageGen.js',
  'src/api/huggingFaceDirect.js',
  'src/api/testHuggingFace.js',
  'src/components/ApiTester.jsx',
  'src/components/ApiDebugger.jsx',
];

// Environment variable names to check
const ENV_VARS_TO_CHECK = [
  'VITE_HUGGINGFACE_API_TOKEN',
  'HUGGINGFACE_API_TOKEN',
];

console.log('🔒 Running pre-build security check...');

// Check for API tokens in critical files
let foundIssues = false;

for (const filePath of CRITICAL_FILES) {
  const fullPath = path.join(rootDir, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️ File not found: ${filePath} - skipping check`);
    continue;
  }
  
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  
  // Check for token patterns
  for (const pattern of TOKEN_PATTERNS) {
    const matches = fileContent.match(pattern);
    if (matches) {
      console.error(`❌ Possible API token found in ${filePath}:`, matches);
      foundIssues = true;
    }
  }
  
  // Check for environment variables
  const envFileContent = fs.readFileSync(path.join(rootDir, '.env'), 'utf8');
  for (const envVar of ENV_VARS_TO_CHECK) {
    // Extract the value from .env file
    const envMatch = envFileContent.match(new RegExp(`${envVar}=(.+)`));
    
    if (envMatch && envMatch[1] !== 'your_huggingface_api_token_here') {
      console.error(`❌ Real API token found in .env file for ${envVar}`);
      foundIssues = true;
    }
  }
}

// Safety check for environment variables
console.log('✅ Checking environment variables in .env file...');
const envContent = fs.readFileSync(path.join(rootDir, '.env'), 'utf8');

for (const envVar of ENV_VARS_TO_CHECK) {
  if (process.env[envVar] && process.env[envVar].length > 20) {
    console.warn(`⚠️ Warning: ${envVar} is set in process.env but will not be used for build`);
  }
}

// Remind about the proper way to set variables for Netlify
console.log('\n🔧 DEPLOYMENT REMINDER:');
console.log('- For local development, use .env.local file (do not commit)');
console.log('- For Netlify, set your API token in the Netlify dashboard');
console.log('  Site settings > Build & deploy > Environment > Environment variables\n');

if (foundIssues) {
  console.error('❌ Security issues found. Build will not proceed.');
  console.error('Please fix the issues above before building.');
  process.exit(1);
}

console.log('✅ Security check passed. Proceeding with build...\n'); 