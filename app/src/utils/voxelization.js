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
 * @returns {Object} An object containing the voxel data and support structure
 */
export const voxelizeMesh = (mesh, gridSize = 16, maxHeight = 10) => {
  // Clone the mesh to avoid modifying the original
  const clonedMesh = mesh.clone();
  
  // Get bounding box
  const box = new THREE.Box3().setFromObject(clonedMesh);
  const size = box.getSize(new THREE.Vector3());
  const center = new THREE.Vector3();
  box.getCenter(center);
  
  // Center the mesh at origin for easier voxelization
  clonedMesh.position.sub(center);
  
  // Update the bounding box after centering
  const centeredBox = new THREE.Box3().setFromObject(clonedMesh);
  const centeredSize = centeredBox.getSize(new THREE.Vector3());
  
  // Create a raycaster for voxel detection
  const raycaster = new THREE.Raycaster();
  
  // Initialize voxel grid (filled with false)
  const voxels = Array(gridSize).fill().map(() => 
    Array(gridSize).fill().map(() => 
      Array(maxHeight).fill(false)
    )
  );
  
  // Calculate voxel size based on the largest dimension
  const maxDim = Math.max(centeredSize.x, centeredSize.z);
  const voxelSize = maxDim / gridSize;
  const heightScale = centeredSize.y / (voxelSize * maxHeight);
  
  // Create a grid of rays from the top to detect the model
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      // Calculate the position in 3D space
      const xPos = (x - gridSize / 2) * voxelSize + voxelSize / 2;
      const zPos = (z - gridSize / 2) * voxelSize + voxelSize / 2;
      
      // Create a ray from top to bottom
      const rayOrigin = new THREE.Vector3(xPos, centeredBox.max.y + 1, zPos);
      const rayDirection = new THREE.Vector3(0, -1, 0);
      raycaster.set(rayOrigin, rayDirection);
      
      // Check for intersections
      const intersects = raycaster.intersectObject(clonedMesh);
      
      if (intersects.length > 0) {
        // Get the intersection point
        const intersection = intersects[0];
        const yPos = intersection.point.y;
        
        // Calculate voxel height
        const relativeHeight = yPos - centeredBox.min.y;
        const voxelHeight = Math.floor(relativeHeight / (voxelSize * heightScale));
        
        // Mark voxels from the bottom up to the intersection
        for (let y = 0; y <= Math.min(voxelHeight, maxHeight - 1); y++) {
          voxels[x][z][y] = true;
        }
      }
    }
  }
  
  // Create support structure
  // Initialize support voxel grid (filled with false)
  const supportVoxels = Array(gridSize).fill().map(() => 
    Array(gridSize).fill().map(() => 
      Array(maxHeight).fill(false)
    )
  );
  
  // Simple support algorithm: support everything below the lowest filled voxel
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      let foundModelVoxel = false;
      let lowestY = 0;
      
      // Find the lowest model voxel
      for (let y = 0; y < maxHeight; y++) {
        if (voxels[x][z][y]) {
          foundModelVoxel = true;
          lowestY = y;
          break;
        }
      }
      
      // If we found a model voxel, add support below it
      if (foundModelVoxel) {
        for (let y = 0; y < lowestY; y++) {
          supportVoxels[x][z][y] = true;
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
        if (voxels[x][z][y]) {
          modelCount++;
        }
        if (supportVoxels[x][z][y] && !voxels[x][z][y]) {
          supportCount++;
        }
      }
    }
  }
  
  return {
    voxels,
    supportVoxels,
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