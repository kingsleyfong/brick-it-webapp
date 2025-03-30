/**
 * 3D model voxelization utilities
 * 
 * This file contains utilities for converting 3D models (meshes) into voxel representations
 * for creating LEGO-compatible models.
 */

import * as THREE from 'three';

/**
 * Voxelize a Three.js mesh
 * 
 * @param {THREE.Mesh} mesh - The mesh to voxelize
 * @param {number} gridSize - The size of the voxel grid (default: 16)
 * @param {number} maxHeight - Maximum height of voxels (default: 10)
 * @param {number} modelScale - Scale factor applied to the original model (for consistent voxelization)
 * @returns {Object} An object containing the voxel data and support structure
 */
export const voxelizeMesh = (mesh, gridSize = 16, maxHeight = 10, modelScale = 1.0) => {
  // Clone the mesh to avoid modifying the original
  const clonedMesh = mesh.clone();
  
  // Get bounding box
  const box = new THREE.Box3().setFromObject(clonedMesh);
  const size = box.getSize(new THREE.Vector3());
  const center = new THREE.Vector3();
  box.getCenter(center);
  
  // Calculate the proper position offset to center in the grid
  // With the LEGO grid centered at 0, we want the model centered at 0 as well
  const halfGridSize = gridSize / 2;
  
  // Voxel positions in the grid (0-15 for a 16x16 grid)
  // need to be properly centered at the origin
  
  // Calculate voxel size based on the grid dimensions
  // The grid spans from -8 to 8 (for a 16x16 grid), which is 16 units
  // To convert model coordinates to voxel coordinates, we need to map sizes
  const gridWorldSize = 16; // Size of the grid in world units (aligned with model size)
  const voxelSize = gridWorldSize / gridSize;
  
  // Adjust the height scale based on the model's height and voxel grid
  const heightScale = Math.min(1.0, (maxHeight * voxelSize) / (size.y * modelScale));
  
  // Use multiple ray directions for better filling
  const rayDirections = [
    new THREE.Vector3(0, -1, 0),   // Top to bottom (primary)
    new THREE.Vector3(0, 1, 0),    // Bottom to top
    new THREE.Vector3(1, 0, 0),    // Left to right
    new THREE.Vector3(-1, 0, 0),   // Right to left
    new THREE.Vector3(0, 0, 1),    // Front to back
    new THREE.Vector3(0, 0, -1)    // Back to front
  ];
  
  // Create a raycaster for voxel detection
  const raycaster = new THREE.Raycaster();
  
  // Initialize voxel grid (filled with false)
  const voxels = Array(gridSize).fill().map(() => 
    Array(gridSize).fill().map(() => 
      Array(maxHeight).fill(false)
    )
  );
  
  // First pass: create a voxel representation from multiple directions
  for (let rayIndex = 0; rayIndex < rayDirections.length; rayIndex++) {
    const rayDirection = rayDirections[rayIndex];
    const isVertical = rayDirection.y !== 0;
    
    // Determine ray origin position based on direction
    let rayOriginBaseX, rayOriginBaseY, rayOriginBaseZ;
    
    if (rayDirection.x < 0) rayOriginBaseX = box.max.x + 1;
    else if (rayDirection.x > 0) rayOriginBaseX = box.min.x - 1;
    else rayOriginBaseX = 0;
    
    if (rayDirection.y < 0) rayOriginBaseY = box.max.y + 1;
    else if (rayDirection.y > 0) rayOriginBaseY = box.min.y - 1;
    else rayOriginBaseY = 0;
    
    if (rayDirection.z < 0) rayOriginBaseZ = box.max.z + 1;
    else if (rayDirection.z > 0) rayOriginBaseZ = box.min.z - 1;
    else rayOriginBaseZ = 0;
    
    // Cast rays for each grid position
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // For horizontal rays, we need to sweep through all heights
        if (!isVertical) {
          for (let y = 0; y < maxHeight; y++) {
            // Calculate the position in 3D space
            const xPos = (x - halfGridSize) * voxelSize + voxelSize / 2;
            const yPos = y * voxelSize * heightScale + voxelSize * heightScale / 2;
            const zPos = (z - halfGridSize) * voxelSize + voxelSize / 2;
            
            // Create ray origin based on direction and position
            const rayOrigin = new THREE.Vector3(
              rayDirection.x !== 0 ? rayOriginBaseX : xPos,
              rayDirection.y !== 0 ? rayOriginBaseY : yPos,
              rayDirection.z !== 0 ? rayOriginBaseZ : zPos
            );
            
            raycaster.set(rayOrigin, rayDirection);
            
            // Check for intersections
            const intersects = raycaster.intersectObject(clonedMesh);
            
            // If there are an odd number of intersections, the point is inside the mesh
            if (intersects.length % 2 === 1) {
              voxels[x][z][y] = true;
            }
          }
        } else { // For vertical rays (primary approach)
          // Calculate the position in 3D space for X and Z
          const xPos = (x - halfGridSize) * voxelSize + voxelSize / 2;
          const zPos = (z - halfGridSize) * voxelSize + voxelSize / 2;
          
          // Create ray origin 
          const rayOrigin = new THREE.Vector3(
            xPos,
            rayDirection.y < 0 ? box.max.y + 1 : box.min.y - 1,
            zPos
          );
          
          raycaster.set(rayOrigin, rayDirection);
          
          // Get all intersections
          const intersects = raycaster.intersectObject(clonedMesh);
          
          // Process all intersections to determine which voxels are inside
          // We sort them by distance from the ray origin
          intersects.sort((a, b) => a.distance - b.distance);
          
          // Track whether we're inside or outside the mesh
          let insideMesh = false;
          let lastY = -1;
          
          for (let i = 0; i < intersects.length; i++) {
            const intersection = intersects[i];
            const yPos = intersection.point.y;
            
            // Toggle inside/outside state with each intersection
            insideMesh = !insideMesh;
            
            // Calculate voxel height
            const relativeHeight = yPos - box.min.y;
            const voxelHeight = Math.floor(relativeHeight / (voxelSize * heightScale));
            
            if (voxelHeight >= 0 && voxelHeight < maxHeight) {
              // If we're entering the mesh, mark voxels from here to next exit
              if (insideMesh) {
                lastY = voxelHeight;
              } else {
                // We're exiting the mesh, fill voxels from lastY to here
                for (let y = lastY; y <= voxelHeight; y++) {
                  if (y >= 0 && y < maxHeight) {
                    voxels[x][z][y] = true;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  // Second pass: fill isolated empty voxels (simple hole filling)
  const filledVoxels = JSON.parse(JSON.stringify(voxels)); // Deep clone
  
  for (let x = 1; x < gridSize - 1; x++) {
    for (let z = 1; z < gridSize - 1; z++) {
      for (let y = 1; y < maxHeight - 1; y++) {
        // If the voxel is empty
        if (!voxels[x][z][y]) {
          // Count filled neighbors
          let filledNeighbors = 0;
          if (voxels[x-1][z][y]) filledNeighbors++;
          if (voxels[x+1][z][y]) filledNeighbors++;
          if (voxels[x][z-1][y]) filledNeighbors++;
          if (voxels[x][z+1][y]) filledNeighbors++;
          if (voxels[x][z][y-1]) filledNeighbors++;
          if (voxels[x][z][y+1]) filledNeighbors++;
          
          // If surrounded by 5+ filled voxels, fill it too
          if (filledNeighbors >= 5) {
            filledVoxels[x][z][y] = true;
          }
        }
      }
    }
  }
  
  // Create enhanced support structure
  // Initialize support voxel grid (filled with false)
  const supportVoxels = Array(gridSize).fill().map(() => 
    Array(gridSize).fill().map(() => 
      Array(maxHeight).fill(false)
    )
  );
  
  // Find the lowest non-floating layer for each column
  const lowestLayerMap = Array(gridSize).fill().map(() => 
    Array(gridSize).fill(maxHeight) // Start with maximum height
  );
  
  // First, find the lowest voxel in each column
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      for (let y = 0; y < maxHeight; y++) {
        if (filledVoxels[x][z][y]) {
          lowestLayerMap[x][z] = y;
          break;
        }
      }
    }
  }
  
  // Create support columns for each model voxel
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      const lowestY = lowestLayerMap[x][z];
      
      // If there's a model voxel in this column
      if (lowestY < maxHeight) {
        // Create support column from ground to lowest voxel
        for (let y = 0; y < lowestY; y++) {
          supportVoxels[x][z][y] = true;
        }
      }
    }
  }
  
  // Third pass: optimize supports by removing unnecessary ones
  // Only keep supports that directly connect to the model or are needed for stability
  const optimizedSupports = Array(gridSize).fill().map(() => 
    Array(gridSize).fill().map(() => 
      Array(maxHeight).fill(false)
    )
  );
  
  // Copy perimeter and model-connected supports
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      // Keep track of whether we're in a support section
      let activeSupport = false;
      
      for (let y = 0; y < maxHeight; y++) {
        // If we're at a model voxel, supports below are needed
        if (filledVoxels[x][z][y]) {
          // Supports below this model voxel are needed
          for (let sy = 0; sy < y; sy++) {
            optimizedSupports[x][z][sy] = true;
          }
          break;
        }
        
        // Perimeter supports are always kept (outer frame)
        if (x === 0 || x === gridSize - 1 || z === 0 || z === gridSize - 1) {
          if (supportVoxels[x][z][y]) {
            optimizedSupports[x][z][y] = true;
          }
        }
      }
    }
  }
  
  // Count voxels
  let modelCount = 0;
  let supportCount = 0;
  
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      for (let y = 0; y < maxHeight; y++) {
        if (filledVoxels[x][z][y]) {
          modelCount++;
        }
        if (optimizedSupports[x][z][y] && !filledVoxels[x][z][y]) {
          supportCount++;
        }
      }
    }
  }
  
  return {
    voxels: filledVoxels,
    supportVoxels: optimizedSupports,
    stats: {
      totalBricks: modelCount + supportCount,
      modelBricks: modelCount,
      supportBricks: supportCount
    }
  };
};

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
  for (let x = 0; x < voxels.length; x++) {
    for (let z = 0; z < voxels[x].length; z++) {
      for (let y = 0; y < voxels[x][z].length; y++) {
        if (voxels[x][z][y]) {
          // Add to TXT content (x, y, z, color_index)
          txtContent += `${x + 1} ${z + 1} ${y + 1} ${modelColorDispenser}\n`;
        }
      }
    }
  }
  
  // Process support voxels
  for (let x = 0; x < supportVoxels.length; x++) {
    for (let z = 0; z < supportVoxels[x].length; z++) {
      for (let y = 0; y < supportVoxels[x][z].length; y++) {
        if (supportVoxels[x][z][y] && !voxels[x][z][y]) {
          // Add to TXT content (x, y, z, color_index)
          txtContent += `${x + 1} ${z + 1} ${y + 1} ${supportColorDispenser}\n`;
        }
      }
    }
  }
  
  return txtContent;
}; 