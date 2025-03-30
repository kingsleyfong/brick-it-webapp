import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const publicDir = path.join(__dirname, '../../public');
const pikachuSvgPath = path.join(publicDir, 'pikachu.svg');
const pikachuPngPath = path.join(publicDir, 'pikachu.png');
const gengarStlPath = path.join(publicDir, 'gengar.stl');

// Pikachu SVG content - simplified Pikachu representation
const pikachuSvgContent = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#FFDE00" />
  <circle cx="180" cy="180" r="30" fill="#000000" />
  <circle cx="330" cy="180" r="30" fill="#000000" />
  <path d="M 256 280 Q 306 320 256 360 Q 206 320 256 280" fill="#C03028" />
  <path d="M 120 100 L 150 150 L 90 180 Z" fill="#000000" />
  <path d="M 392 100 L 362 150 L 422 180 Z" fill="#000000" />
  <path d="M 60 300 C 60 300 120 350 190 350 C 240 350 250 330 250 280 L 262 280 C 262 330 272 350 322 350 C 392 350 452 300 452 300 L 440 400 C 440 400 350 450 256 450 C 162 450 72 400 72 400 Z" fill="#956F29" />
</svg>`;

// Simple cube STL content - ASCII STL file for a cube
const cubeStlContent = `solid Cube
  facet normal 0 0 -1
    outer loop
      vertex 0 0 0
      vertex 1 0 0
      vertex 1 1 0
    endloop
  endfacet
  facet normal 0 0 -1
    outer loop
      vertex 0 0 0
      vertex 1 1 0
      vertex 0 1 0
    endloop
  endfacet
  facet normal 0 0 1
    outer loop
      vertex 0 0 1
      vertex 1 1 1
      vertex 1 0 1
    endloop
  endfacet
  facet normal 0 0 1
    outer loop
      vertex 0 0 1
      vertex 0 1 1
      vertex 1 1 1
    endloop
  endfacet
  facet normal 0 -1 0
    outer loop
      vertex 0 0 0
      vertex 1 0 1
      vertex 1 0 0
    endloop
  endfacet
  facet normal 0 -1 0
    outer loop
      vertex 0 0 0
      vertex 0 0 1
      vertex 1 0 1
    endloop
  endfacet
  facet normal 1 0 0
    outer loop
      vertex 1 0 0
      vertex 1 0 1
      vertex 1 1 1
    endloop
  endfacet
  facet normal 1 0 0
    outer loop
      vertex 1 0 0
      vertex 1 1 1
      vertex 1 1 0
    endloop
  endfacet
  facet normal 0 1 0
    outer loop
      vertex 1 1 0
      vertex 1 1 1
      vertex 0 1 1
    endloop
  endfacet
  facet normal 0 1 0
    outer loop
      vertex 1 1 0
      vertex 0 1 1
      vertex 0 1 0
    endloop
  endfacet
  facet normal -1 0 0
    outer loop
      vertex 0 0 0
      vertex 0 1 0
      vertex 0 1 1
    endloop
  endfacet
  facet normal -1 0 0
    outer loop
      vertex 0 0 0
      vertex 0 1 1
      vertex 0 0 1
    endloop
  endfacet
endsolid Cube`;

// Create directories if they don't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate Pikachu PNG
console.log('Creating Pikachu SVG file...');
fs.writeFileSync(pikachuSvgPath, pikachuSvgContent);

console.log('Converting Pikachu SVG to PNG...');
sharp(pikachuSvgPath)
  .png()
  .toFile(pikachuPngPath)
  .then(() => {
    console.log('Successfully created pikachu.png');
    // Remove the temporary SVG file
    fs.unlinkSync(pikachuSvgPath);
  })
  .catch(err => {
    console.error('Error converting SVG to PNG:', err);
  });

// Generate Gengar STL (simple cube for testing)
console.log('Creating Gengar STL file (cube)...');
fs.writeFileSync(gengarStlPath, cubeStlContent);
console.log('Successfully created gengar.stl');

console.log('All test files generated successfully!'); 