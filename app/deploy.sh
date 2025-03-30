#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process for Brick It Web App...${NC}"

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${RED}Netlify CLI is not installed.${NC}"
    echo -e "Installing Netlify CLI globally..."
    npm install -g netlify-cli
fi

# Ensure we're in the app directory
cd "$(dirname "$0")" || { echo -e "${RED}Failed to change to app directory${NC}"; exit 1; }

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install || { echo -e "${RED}Failed to install dependencies${NC}"; exit 1; }
fi

# Build the project
echo -e "${YELLOW}Building the project...${NC}"
npm run build || { echo -e "${RED}Build failed${NC}"; exit 1; }

# Check if user is logged in to Netlify
echo -e "${YELLOW}Checking Netlify login status...${NC}"
netlify status 2>/dev/null

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Please log in to Netlify:${NC}"
    netlify login
fi

# Deploy to Netlify
echo -e "${YELLOW}Deploying to Netlify...${NC}"
netlify deploy --prod

echo -e "${GREEN}Deployment process completed!${NC}" 