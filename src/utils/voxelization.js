/**
 * 3D model voxelization utilities
 * 
 * This file contains utilities for converting 3D models (meshes) into voxel representations
 * for creating LEGO-compatible models.
 */

import * as THREE from 'three';

/**
 * Voxelizes a Three.js mesh
 * 
 * @param {THREE.Mesh} mesh - The mesh to voxelize
 * @param {number} gridSize - The size of the voxel grid (e.g., 16 for a 16x16x16 grid)
 * @param {number} maxHeight - The maximum height of the voxel grid
 * @param {number} modelScale - The scale factor applied to the model
 * @return {object} The voxel data including voxels, supportVoxels, and stats
 */
export function voxelizeMesh(mesh, gridSize = 16, maxHeight = 16, modelScale = 1) {
  console.time('voxelization');
  
  // STEP 1: Setup the voxel grid and spacing
  // Initialize with y first for easier column-based operations (y, x, z)
  const grid = Array(maxHeight).fill().map(() => 
    Array(gridSize).fill().map(() => 
      Array(gridSize).fill(0)
    )
  );
  
  const supportGrid = Array(maxHeight).fill().map(() => 
    Array(gridSize).fill().map(() => 
      Array(gridSize).fill(0)
    )
  );
  
  // STEP 2: Get the mesh's bounding box to determine voxel size 
  const boundingBox = new THREE.Box3().setFromObject(mesh);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);
  
  console.log("Model size:", size);
  console.log("Bounding box:", boundingBox);
  
  // Calculate voxel spacing based on the grid size and bounding box
  // Use the maximum of X and Z dimensions to maintain proportions
  const voxelSpacing = Math.max(size.x, size.z) / gridSize;
  const halfGrid = gridSize / 2;
  
  // STEP 3: Prepare for raycasting
  const raycaster = new THREE.Raycaster();
  // Define ray directions for better filling
  const rayDirections = [
    new THREE.Vector3(0, -1, 0),  // Down (primary direction for voxelization)
    new THREE.Vector3(0, 1, 0),   // Up
    new THREE.Vector3(1, 0, 0),   // Right
    new THREE.Vector3(-1, 0, 0),  // Left
    new THREE.Vector3(0, 0, 1),   // Forward
    new THREE.Vector3(0, 0, -1)   // Back
  ];
  
  // STEP 4: Create a temporary clone of the mesh for raycasting
  // to avoid modifying the original mesh
  const tempMesh = mesh.clone();
  
  console.log("Starting raycasting voxelization");
  
  // STEP 5: Cast rays to determine which voxels are inside the mesh
  // Use primarily top-down rays for consistent voxelization
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      // Calculate the world position for this voxel's X,Z coordinates
      // Centered on the grid by subtracting halfGrid
      const worldX = (x - halfGrid + 0.5) * voxelSpacing;
      const worldZ = (z - halfGrid + 0.5) * voxelSpacing;
      
      // Raycast from directly above the voxel
      const rayOrigin = new THREE.Vector3(worldX, boundingBox.max.y + 1, worldZ);
      raycaster.set(rayOrigin, rayDirections[0]); // Ray pointing down
      
      const intersects = raycaster.intersectObject(tempMesh, true);
      
      if (intersects.length > 0) {
        // Sort intersections by distance (closest first)
        intersects.sort((a, b) => a.distance - b.distance);
        
        // Process intersections in pairs - entering and exiting the mesh
        for (let i = 0; i < intersects.length; i += 2) {
          if (i + 1 >= intersects.length) {
            // We have an odd number of intersections
            // For the last unpaired intersection, assume it's the top of the model
            const entryPoint = intersects[i].point;
            
            // Calculate voxel Y coordinate
            const entryY = Math.floor((entryPoint.y - boundingBox.min.y) / voxelSpacing);
            
            // Ensure we're within grid bounds
            if (entryY >= 0 && entryY < maxHeight) {
              // Mark this voxel as filled
              grid[entryY][x][z] = 1;
            }
            
            continue;
          }
          
          // Get entry and exit points
          const entryPoint = intersects[i].point;
          const exitPoint = intersects[i + 1].point;
          
          // Calculate voxel Y coordinates
          const entryY = Math.floor((entryPoint.y - boundingBox.min.y) / voxelSpacing);
          const exitY = Math.floor((exitPoint.y - boundingBox.min.y) / voxelSpacing);
          
          // Fill all voxels between entry and exit points
          // Note: entry will be higher than exit when ray is going down
          const minY = Math.max(0, Math.min(entryY, exitY));
          const maxY = Math.min(maxHeight - 1, Math.max(entryY, exitY));
          
          for (let y = minY; y <= maxY; y++) {
            // Ensure we're within grid bounds
            if (y >= 0 && y < maxHeight) {
              grid[y][x][z] = 1;
            }
          }
        }
      }
    }
  }
  
  console.log("Raycasting complete");
  
  // STEP 6: Fill isolated empty voxels (surrounded by filled voxels)
  // Helpful for models with thin walls or holes
  for (let y = 1; y < maxHeight - 1; y++) {
    for (let x = 1; x < gridSize - 1; x++) {
      for (let z = 1; z < gridSize - 1; z++) {
        // If the voxel is empty...
        if (grid[y][x][z] === 0) {
          // Check the six adjacent voxels
          let surroundedCount = 0;
          if (grid[y][x+1][z] === 1) surroundedCount++;
          if (grid[y][x-1][z] === 1) surroundedCount++;
          if (grid[y][x][z+1] === 1) surroundedCount++;
          if (grid[y][x][z-1] === 1) surroundedCount++;
          if (grid[y+1][x][z] === 1) surroundedCount++;
          if (grid[y-1][x][z] === 1) surroundedCount++;
          
          // If at least 5 surrounding voxels are filled, fill this one too
          if (surroundedCount >= 5) {
            grid[y][x][z] = 1;
          }
        }
      }
    }
  }
  
  console.log("Starting support structure generation");
  
  // STEP 7: Create support structure
  // Every model voxel must have continuous support down to the build plate
  let totalModelVoxels = 0;
  let totalSupportVoxels = 0;
  
  // First pass: Count model voxels
  for (let y = 0; y < maxHeight; y++) {
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        if (grid[y][x][z] === 1) {
          totalModelVoxels++;
        }
      }
    }
  }
  
  // Second pass: Create support columns
  // For each x,z position, identify if there are any model voxels in the column
  // Create a continuous support column from the lowest model voxel down to the ground
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      // Find the highest model voxel in this column (from top down)
      let highestModelY = -1;
      for (let y = maxHeight - 1; y >= 0; y--) {
        if (grid[y][x][z] === 1) {
          highestModelY = y;
          break;
        }
      }
      
      // If we found a model voxel in this column
      if (highestModelY >= 0) {
        // Now scan from bottom up to find all gaps that need support
        let inSupportRegion = true; // Start assuming we need support (at ground level)
        
        for (let y = 0; y <= highestModelY; y++) {
          if (grid[y][x][z] === 1) {
            // We found a model voxel - we don't need support at this exact position
            inSupportRegion = false;
          } else if (inSupportRegion) {
            // This is a gap below a model voxel or the bottom of the column
            // Add a support voxel
            supportGrid[y][x][z] = 1;
            totalSupportVoxels++;
          } else {
            // We found a gap above a model voxel - this means we need
            // to start a new support region from here up to the next model voxel
            inSupportRegion = true;
            supportGrid[y][x][z] = 1;
            totalSupportVoxels++;
          }
        }
      }
    }
  }
  
  // Third pass: Connect all disconnected floating support regions
  // Ensure every support voxel has support underneath it
  let supportAdded;
  do {
    supportAdded = false;
    
    // Check each column from bottom to top
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        let hasSupport = false; // Track if we have support at Y=0
        
        // For each column, start at ground level
        if (supportGrid[0][x][z] === 1 || grid[0][x][z] === 1) {
          hasSupport = true; // Either support or model voxel at ground level
        }
        
        // Check each voxel in the column
        for (let y = 1; y < maxHeight; y++) {
          // If we have a support or model voxel at this level
          if (supportGrid[y][x][z] === 1 || grid[y][x][z] === 1) {
            // But there's no support below it
            if (!hasSupport) {
              // Add support voxel below
              supportGrid[y-1][x][z] = 1;
              totalSupportVoxels++;
              supportAdded = true;
            }
            
            hasSupport = true; // We now have support at this level
          } else {
            hasSupport = false; // No support at this level
          }
        }
      }
    }
  } while (supportAdded); // Continue until no more support voxels are added
  
  console.log("Support structure generated:", totalSupportVoxels, "support voxels");
  console.timeEnd('voxelization');
  
  // Return the voxelized data with statistics
  return {
    voxels: grid,
    supportVoxels: supportGrid,
    stats: {
      modelBricks: totalModelVoxels,
      supportBricks: totalSupportVoxels,
      totalBricks: totalModelVoxels + totalSupportVoxels,
      dimensions: {
        width: gridSize,
        depth: gridSize,
        height: maxHeight
      }
    }
  };
}

/**
 * Generate a TXT file content for the LEGO printer
 * 
 * @param {Array} voxels - 3D array representing model voxels
 * @param {Array} supportVoxels - 3D array representing support voxels
 * @param {Object} colorConfig - Color configuration object
 * @param {string} modelColor - Key of the model color in colorConfig
 * @param {string} supportColor - Key of the support color in colorConfig
 * @returns {string} Text content for the LEGO printer
 */
export const generateTxtFileContent = (voxels, supportVoxels, colorConfig, modelColor, supportColor) => {
  let txtContent = '';
  
  const modelColorDispenser = colorConfig[modelColor]?.dispenser || 1;
  const supportColorDispenser = colorConfig[supportColor]?.dispenser || 7;
  
  // Process model voxels
  for (let y = 0; y < voxels.length; y++) {
    for (let x = 0; x < voxels[y].length; x++) {
      for (let z = 0; z < voxels[y][x].length; z++) {
        if (voxels[y][x][z]) {
          // Add to TXT content (x, y, z, color_index)
          txtContent += `${x + 1} ${z + 1} ${y + 1} ${modelColorDispenser}\n`;
        }
      }
    }
  }
  
  // Process support voxels
  for (let y = 0; y < supportVoxels.length; y++) {
    for (let x = 0; x < supportVoxels[y].length; x++) {
      for (let z = 0; z < supportVoxels[y][x].length; z++) {
        if (supportVoxels[y][x][z] && !voxels[y][x][z]) {
          // Add to TXT content (x, y, z, color_index)
          txtContent += `${x + 1} ${z + 1} ${y + 1} ${supportColorDispenser}\n`;
        }
      }
    }
  }
  
  return txtContent;
}; 