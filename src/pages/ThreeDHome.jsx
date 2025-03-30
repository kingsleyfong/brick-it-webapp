import { useState, useEffect, useRef, useCallback } from 'react';
import { useImageContext } from '../context/ImageContext';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { voxelizeMesh, generateTxtFileContent } from '../utils/voxelization';

const ThreeDHome = () => {
  const { 
    modelFile, 
    setModelFile, 
    colorConfig, 
    modelColor, 
    setModelColor, 
    supportColor, 
    setSupportColor,
    saveProject
  } = useImageContext();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');
  const [modelStats, setModelStats] = useState({
    totalBricks: 0,
    modelBricks: 0,
    supportBricks: 0
  });
  const [exportSuccess, setExportSuccess] = useState(false);
  const [voxelData, setVoxelData] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [defaultModelAvailable, setDefaultModelAvailable] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(null);
  const [maxLayer, setMaxLayer] = useState(0);
  const [layerViewMode, setLayerViewMode] = useState(false);
  
  // Three.js references for triple viewport
  // Original STL model viewport (left)
  const originalModelRef = useRef(null);
  const originalSceneRef = useRef(null);
  const originalCameraRef = useRef(null);
  const originalRendererRef = useRef(null);
  const originalControlsRef = useRef(null);
  
  // Voxelized model viewport (middle)
  const voxelModelRef = useRef(null);
  const voxelSceneRef = useRef(null);
  const voxelCameraRef = useRef(null);
  const voxelRendererRef = useRef(null);
  const voxelControlsRef = useRef(null);
  
  // LEGO brick model viewport (right)
  const legoModelRef = useRef(null);
  const legoSceneRef = useRef(null);
  const legoCameraRef = useRef(null);
  const legoRendererRef = useRef(null);
  const legoControlsRef = useRef(null);
  
  // Common refs
  const fileInputRef = useRef(null);
  
  // Keep track of linked camera positions
  const [cameraPosition, setCameraPosition] = useState({ x: 15, y: 15, z: 15 });
  const [cameraTarget, setCameraTarget] = useState({ x: 0, y: 0, z: 0 });
  
  // Add a new state variable for showing performance tips
  const [showPerformanceTips, setShowPerformanceTips] = useState(false);
  
  // Initialize three.js scenes
  useEffect(() => {
    if (!originalModelRef.current || !voxelModelRef.current || !legoModelRef.current) return;
    
    // Get the container dimensions for proper sizing
    const containerWidth = originalModelRef.current.parentElement.clientWidth;
    const containerHeight = originalModelRef.current.clientHeight;
    
    // Create scenes for each viewport
    const originalScene = new THREE.Scene();
    const voxelScene = new THREE.Scene();
    const legoScene = new THREE.Scene();
    
    // Set background color for all scenes
    originalScene.background = new THREE.Color(0xf0f0f0);
    voxelScene.background = new THREE.Color(0xf0f0f0);
    legoScene.background = new THREE.Color(0xf0f0f0);
    
    // Calculate aspect ratio for each viewport
    // Each viewport takes up approximately 1/3 of the container width
    const originalViewportWidth = Math.floor(containerWidth / 3);
    const voxelViewportWidth = Math.floor(containerWidth / 3);
    const legoViewportWidth = Math.floor(containerWidth / 3);
    
    const originalAspect = originalViewportWidth / containerHeight;
    const voxelAspect = voxelViewportWidth / containerHeight;
    const legoAspect = legoViewportWidth / containerHeight;
    
    // Create cameras for each viewport
    const originalCamera = new THREE.PerspectiveCamera(
      75,
      originalAspect,
      0.1,
      1000
    );
    originalCamera.position.set(12, 10, 12);
    originalCamera.lookAt(0, 2, 0);
    
    const voxelCamera = new THREE.PerspectiveCamera(
      75,
      voxelAspect,
      0.1,
      1000
    );
    voxelCamera.position.set(12, 10, 12);
    voxelCamera.lookAt(0, 2, 0);
    
    const legoCamera = new THREE.PerspectiveCamera(
      75,
      legoAspect,
      0.1,
      1000
    );
    legoCamera.position.set(12, 10, 12);
    legoCamera.lookAt(0, 2, 0);
    
    // Create renderers for each viewport
    const originalRenderer = new THREE.WebGLRenderer({ antialias: true });
    originalRenderer.setSize(originalViewportWidth, containerHeight);
    originalRenderer.setPixelRatio(window.devicePixelRatio);
    
    const voxelRenderer = new THREE.WebGLRenderer({ antialias: true });
    voxelRenderer.setSize(voxelViewportWidth, containerHeight);
    voxelRenderer.setPixelRatio(window.devicePixelRatio);
    
    const legoRenderer = new THREE.WebGLRenderer({ antialias: true });
    legoRenderer.setSize(legoViewportWidth, containerHeight);
    legoRenderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear any existing renderers
    while (originalModelRef.current.firstChild) {
      originalModelRef.current.removeChild(originalModelRef.current.firstChild);
    }
    
    while (voxelModelRef.current.firstChild) {
      voxelModelRef.current.removeChild(voxelModelRef.current.firstChild);
    }
    
    while (legoModelRef.current.firstChild) {
      legoModelRef.current.removeChild(legoModelRef.current.firstChild);
    }
    
    // Append renderers to DOM
    originalModelRef.current.appendChild(originalRenderer.domElement);
    voxelModelRef.current.appendChild(voxelRenderer.domElement);
    legoModelRef.current.appendChild(legoRenderer.domElement);
    
    // Create controls for each viewport
    const originalControls = new OrbitControls(originalCamera, originalRenderer.domElement);
    originalControls.enableDamping = true;
    originalControls.dampingFactor = 0.25;
    
    const voxelControls = new OrbitControls(voxelCamera, voxelRenderer.domElement);
    voxelControls.enableDamping = true;
    voxelControls.dampingFactor = 0.25;
    
    const legoControls = new OrbitControls(legoCamera, legoRenderer.domElement);
    legoControls.enableDamping = true;
    legoControls.dampingFactor = 0.25;
    
    // Linked camera controls
    // When one control updates, update the camera position of the others
    let syncingControls = false;
    
    // Function to sync camera positions and targets
    const syncCameraPosition = (sourceCamera, targetCamera, targetControls) => {
      if (syncingControls) return;
      
      syncingControls = true;
      
      // Copy position and rotation
      targetCamera.position.copy(sourceCamera.position);
      targetCamera.rotation.copy(sourceCamera.rotation);
      
      // Update controls target
      targetControls.target.copy(originalControls.target);
      targetControls.update();
      
      syncingControls = false;
    };
    
    // Add change event listeners for the controls
    originalControls.addEventListener('change', () => {
      if (!syncingControls) {
        syncCameraPosition(originalCamera, voxelCamera, voxelControls);
        syncCameraPosition(originalCamera, legoCamera, legoControls);
      }
    });
    
    voxelControls.addEventListener('change', () => {
      if (!syncingControls) {
        syncCameraPosition(voxelCamera, originalCamera, originalControls);
        syncCameraPosition(voxelCamera, legoCamera, legoControls);
      }
    });
    
    legoControls.addEventListener('change', () => {
      if (!syncingControls) {
        syncCameraPosition(legoCamera, originalCamera, originalControls);
        syncCameraPosition(legoCamera, voxelCamera, voxelControls);
      }
    });
    
    // Add lighting to scenes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    originalScene.add(ambientLight.clone());
    voxelScene.add(ambientLight.clone());
    legoScene.add(ambientLight.clone());
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    originalScene.add(directionalLight.clone());
    voxelScene.add(directionalLight.clone());
    legoScene.add(directionalLight.clone());
    
    // Add grid and axes helpers to scenes
    const gridHelper = new THREE.GridHelper(16, 16, 0x888888, 0xcccccc);
    // Position the grid at Y=0 (ground level)
    originalScene.add(gridHelper.clone());
    voxelScene.add(gridHelper.clone());
    legoScene.add(gridHelper.clone());
    
    const axesHelper = new THREE.AxesHelper(8);
    originalScene.add(axesHelper.clone());
    voxelScene.add(axesHelper.clone());
    legoScene.add(axesHelper.clone());
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls
      originalControls.update();
      voxelControls.update();
      legoControls.update();
      
      // Render scenes
      originalRenderer.render(originalScene, originalCamera);
      voxelRenderer.render(voxelScene, voxelCamera);
      legoRenderer.render(legoScene, legoCamera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!originalModelRef.current) return;
      
      // Get the updated container dimensions
      const newContainerWidth = originalModelRef.current.parentElement.clientWidth;
      const newContainerHeight = originalModelRef.current.clientHeight;
      
      // Update viewport dimensions
      const newOriginalViewportWidth = Math.floor(newContainerWidth / 3);
      const newVoxelViewportWidth = Math.floor(newContainerWidth / 3);
      const newLegoViewportWidth = Math.floor(newContainerWidth / 3);
      
      // Update camera aspect ratios
      originalCamera.aspect = newOriginalViewportWidth / newContainerHeight;
      originalCamera.updateProjectionMatrix();
      
      voxelCamera.aspect = newVoxelViewportWidth / newContainerHeight;
      voxelCamera.updateProjectionMatrix();
      
      legoCamera.aspect = newLegoViewportWidth / newContainerHeight;
      legoCamera.updateProjectionMatrix();
      
      // Update renderer sizes
      originalRenderer.setSize(newOriginalViewportWidth, newContainerHeight);
      voxelRenderer.setSize(newVoxelViewportWidth, newContainerHeight);
      legoRenderer.setSize(newLegoViewportWidth, newContainerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Save references
    originalSceneRef.current = originalScene;
    originalCameraRef.current = originalCamera;
    originalRendererRef.current = originalRenderer;
    originalControlsRef.current = originalControls;
    
    voxelSceneRef.current = voxelScene;
    voxelCameraRef.current = voxelCamera;
    voxelRendererRef.current = voxelRenderer;
    voxelControlsRef.current = voxelControls;
    
    legoSceneRef.current = legoScene;
    legoCameraRef.current = legoCamera;
    legoRendererRef.current = legoRenderer;
    legoControlsRef.current = legoControls;
    
    // Update camera position state for UI controls
    setCameraPosition({
      x: originalCamera.position.x.toFixed(2),
      y: originalCamera.position.y.toFixed(2),
      z: originalCamera.position.z.toFixed(2)
    });
    
    setCameraTarget({
      x: originalControls.target.x.toFixed(2),
      y: originalControls.target.y.toFixed(2),
      z: originalControls.target.z.toFixed(2)
    });
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Dispose of renderers
      originalRenderer.dispose();
      voxelRenderer.dispose();
      legoRenderer.dispose();
      
      // Remove event listeners on controls
      originalControls.removeEventListener('change', syncCameraPosition);
      voxelControls.removeEventListener('change', syncCameraPosition);
      legoControls.removeEventListener('change', syncCameraPosition);
      
      // Clear references
      originalSceneRef.current = null;
      originalCameraRef.current = null;
      originalRendererRef.current = null;
      originalControlsRef.current = null;
      
      voxelSceneRef.current = null;
      voxelCameraRef.current = null;
      voxelRendererRef.current = null;
      voxelControlsRef.current = null;
      
      legoSceneRef.current = null;
      legoCameraRef.current = null;
      legoRendererRef.current = null;
      legoControlsRef.current = null;
    };
  }, []);
  
  // Load default model
  useEffect(() => {
    const loadDefaultModel = async () => {
      try {
        // Check if the gengar.stl file exists
        const defaultModelPath = '/gengar.stl';
        const response = await fetch(defaultModelPath);
        
        if (response.ok) {
          setDefaultModelAvailable(true);
          console.log('Default model available');
        } else {
          console.error('Default model not available:', response.statusText);
        }
      } catch (error) {
        console.error('Error checking default model:', error);
      }
    };
    
    loadDefaultModel();
  }, []);
  
  // Initialize filename with current date/time
  useEffect(() => {
    const now = new Date();
    const formattedDate = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    setFileName(formattedDate);
  }, []);
  
  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setError(null);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setModelFile(event.target.result);
      processSTLFile(event.target.result);
    };
    reader.onerror = () => {
      setError('Error reading file');
    };
    reader.readAsArrayBuffer(file);
  };
  
  // Handle default model load
  const handleDefaultModel = async () => {
    try {
      setIsProcessing(true);
      setProgress(10);
      setProcessingMessage("Loading default model...");
      
      const defaultModelPath = '/gengar.stl';
      const response = await fetch(defaultModelPath);
      
      if (!response.ok) {
        throw new Error(`Failed to load default model: ${response.statusText}`);
      }
      
      setProgress(30);
      setProcessingMessage("Processing STL data...");
      
      const arrayBuffer = await response.arrayBuffer();
      setModelFile(arrayBuffer);
      processSTLFile(arrayBuffer);
    } catch (error) {
      console.error('Error loading default model:', error);
      setError(`Error loading default model: ${error.message}`);
      setIsProcessing(false);
    }
  };
  
  // Debug helper to visualize bounding boxes and model center points
  const addDebugVisualization = (model, scene) => {
    // Create a Box3 from the model
    const boundingBox = new THREE.Box3().setFromObject(model);
    
    // Create a Box3Helper with a distinctive color
    const boxHelper = new THREE.Box3Helper(boundingBox, 0xff0000);
    boxHelper.name = 'debugBoxHelper';
    
    // Create marker for the ground level
    const groundMarkerGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMarkerMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff, 
      transparent: true, 
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const groundMarker = new THREE.Mesh(groundMarkerGeometry, groundMarkerMaterial);
    groundMarker.position.set(0, 0, 0);
    groundMarker.rotation.x = Math.PI / 2;
    groundMarker.name = 'debugGroundMarker';
    
    // Create a sphere for the center point
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    const centerMarkerGeometry = new THREE.SphereGeometry(0.2);
    const centerMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const centerMarker = new THREE.Mesh(centerMarkerGeometry, centerMarkerMaterial);
    centerMarker.position.copy(center);
    centerMarker.name = 'debugCenterMarker';
    
    // Add all debug helpers
    scene.add(boxHelper);
    scene.add(groundMarker);
    scene.add(centerMarker);
    
    // Log bounding box info to console
    console.log('Debug - Model Bounding Box:', {
      min: boundingBox.min,
      max: boundingBox.max,
      center,
      size: new THREE.Vector3().subVectors(boundingBox.max, boundingBox.min)
    });
  };

  // Helper to orient the model correctly (make it stand upright)
  const orientModelUpright = (mesh) => {
    console.log("Starting model orientation process");
    
    // STEP 1: First, reset the mesh to a known state
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.updateMatrix();
    mesh.geometry.applyMatrix4(mesh.matrix);
    mesh.matrix.identity();
    
    // STEP 2: Get the current bounding box to analyze dimensions
    const bbox = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    
    console.log("Original dimensions:", size);
    
    // STEP 3: Always make the Y-axis the height by default
    // Force rotation around X-axis by 90 degrees to ensure the model stands upright
    // This is a reliable approach based on the Python implementation
    const rotationMatrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
    mesh.geometry.applyMatrix4(rotationMatrix);
    
    // Reset mesh transforms after applying the rotation to geometry
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.updateMatrix();
    
    // STEP 4: Verify the new dimensions
    const newBbox = new THREE.Box3().setFromObject(mesh);
    const newSize = new THREE.Vector3();
    newBbox.getSize(newSize);
    console.log("After rotation dimensions:", newSize);
    
    // STEP 5: Ensure the y-dimension is properly upright by checking
    // if we need to flip it another 90 degrees around Z-axis
    if (newSize.x > newSize.y && newSize.x > newSize.z) {
      console.log("Additional rotation needed - X axis is still dominant");
      const additionalRotation = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
      mesh.geometry.applyMatrix4(additionalRotation);
      
      // Reset mesh transforms after applying the rotation to geometry
      mesh.position.set(0, 0, 0);
      mesh.rotation.set(0, 0, 0);
      mesh.updateMatrix();
      
      const finalBbox = new THREE.Box3().setFromObject(mesh);
      const finalSize = new THREE.Vector3();
      finalBbox.getSize(finalSize);
      console.log("Final dimensions after correction:", finalSize);
    }
    
    // STEP 6: Final position correction - ensure bottom is at Y=0
    // and model is centered on X and Z axes
    const finalBbox = new THREE.Box3().setFromObject(mesh);
    
    // Center the model on X and Z axes and ensure it sits on Y=0
    const correction = new THREE.Vector3();
    finalBbox.getCenter(correction);
    correction.y = finalBbox.min.y; // We want to translate up by the minimum Y value
    
    mesh.geometry.translate(-correction.x, -correction.y, -correction.z);
    mesh.position.set(0, 0, 0);
    mesh.updateMatrix();
    
    console.log("Model orientation complete");
    
    return mesh;
  };

  // Process STL file
  const processSTLFile = (fileData) => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Define processing steps for better user feedback
      const processingSteps = [
        { progress: 0, message: "Starting STL processing..." },
        { progress: 10, message: "Clearing previous models..." },
        { progress: 20, message: "Loading STL data..." },
        { progress: 40, message: "Voxelizing model..." },
        { progress: 70, message: "Creating visualizations..." },
        { progress: 90, message: "Finalizing..." },
        { progress: 100, message: "Complete!" }
      ];
      
      // Helper to update both progress and message
      const updateProgressWithInfo = (stepIndex) => {
        const step = processingSteps[stepIndex];
        setProgress(step.progress);
        setProcessingMessage(step.message);
      };
      
      // Start processing
      updateProgressWithInfo(0);
      
      // Clear ALL previous content from the scenes
      const clearAllScenes = () => {
        [originalSceneRef, voxelSceneRef, legoSceneRef].forEach(sceneRef => {
          if (!sceneRef.current) return;
          
          // Remove all objects except lights
          const objectsToRemove = [];
          sceneRef.current.traverse((object) => {
            // Don't remove lights, we need them
            if (!(object instanceof THREE.Light) && object !== sceneRef.current) {
              objectsToRemove.push(object);
            }
          });
          
          objectsToRemove.forEach(object => {
            sceneRef.current.remove(object);
          });
        });
      };
      
      clearAllScenes();
      updateProgressWithInfo(1);
      
      // Create the grid helpers for all viewports
      const createGridsAndAxes = () => {
        // Create a grid helper - make it large enough to be visible
        const gridHelper = new THREE.GridHelper(16, 16, 0x888888, 0xcccccc);
        // Position the grid exactly at the origin (Y=0)
        gridHelper.position.set(0, 0, 0);
        
        // Create axes helper
        const axesHelper = new THREE.AxesHelper(8);
        
        // Add to all scenes
        if (originalSceneRef.current) {
          originalSceneRef.current.add(gridHelper.clone());
          originalSceneRef.current.add(axesHelper.clone());
        }
        
        if (voxelSceneRef.current) {
          voxelSceneRef.current.add(gridHelper.clone());
          voxelSceneRef.current.add(axesHelper.clone());
        }
        
        if (legoSceneRef.current) {
          legoSceneRef.current.add(gridHelper.clone());
          legoSceneRef.current.add(axesHelper.clone());
        }
      };
      
      createGridsAndAxes();
      
      // Load STL file
      const loader = new STLLoader();
      const geometry = loader.parse(fileData);
      updateProgressWithInfo(2);
      
      // --- VIEWPORT 1: ORIGINAL STL MODEL ---
      
      // Create a standard material for the original model
      const originalMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e90ff,
        metalness: 0.1,
        roughness: 0.5
      });
      
      const originalMesh = new THREE.Mesh(geometry, originalMaterial);
      
      // STEP 1: Reset model position and scale to start fresh
      originalMesh.position.set(0, 0, 0); 
      originalMesh.scale.set(1, 1, 1);
      originalMesh.rotation.set(0, 0, 0);
      originalMesh.updateMatrix();
      
      // STEP 2: Orient the model to stand upright
      orientModelUpright(originalMesh);
      
      // STEP 3: Recalculate the bounding box after orientation
      const orientedBox = new THREE.Box3().setFromObject(originalMesh);
      const orientedSize = new THREE.Vector3();
      orientedBox.getSize(orientedSize);
      
      // STEP 4: Determine the scaling factor to fit the model within our grid
      // We want to leave some margin on all sides of the grid
      const maxDimension = Math.max(orientedSize.x, orientedSize.z);
      const targetGridSize = 14; // 14 units out of 16 to leave a margin
      const scaleFactor = targetGridSize / maxDimension * scale;
      
      console.log("Applying scale factor:", scaleFactor);
      originalMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
      
      // STEP 5: After scaling, recalculate the bounding box and center
      const scaledBox = new THREE.Box3().setFromObject(originalMesh);
      const scaledSize = new THREE.Vector3();
      scaledBox.getSize(scaledSize);
      console.log("Scaled dimensions:", scaledSize);
      
      // STEP 6: CRITICAL - Position the model so its bottom sits exactly on the grid (Y=0)
      // and it's centered in the XZ plane
      const offset = new THREE.Vector3();
      scaledBox.getCenter(offset);
      
      originalMesh.position.set(
        -offset.x,                 // Center on X
        -scaledBox.min.y,          // Bottom at Y=0
        -offset.z                  // Center on Z
      );
      
      console.log("Final position:", originalMesh.position);
      
      // STEP 7: Create a group for the model and add it to the scene
      const originalModelGroup = new THREE.Group();
      originalModelGroup.name = 'modelGroup';
      originalModelGroup.add(originalMesh);
      originalSceneRef.current.add(originalModelGroup);
      
      // Add debug visualization to see the bounding box
      addDebugVisualization(originalModelGroup, originalSceneRef.current);
      
      setTimeout(() => {
        updateProgressWithInfo(3);
        
        // Create a mesh for voxelization that maintains the same position and scale
        const voxelizationMesh = originalMesh.clone();
        
        // Voxelize the model using our utility - clone to avoid modifying original
        const voxelResult = voxelizeMesh(voxelizationMesh, 16, 16, scaleFactor);
        setVoxelData(voxelResult);
        setModelStats(voxelResult.stats);
        
        // Set the maximum layer for layer view mode
        setMaxLayer(voxelResult.voxels.length - 1);
        
        setTimeout(() => {
          updateProgressWithInfo(4);
          
          // Visualize voxels in the other two viewports
          visualizeVoxels(voxelResult.voxels, voxelResult.supportVoxels);
          
          // Set camera positions to ensure the model is visible in all viewports
          resetView();
          
          updateProgressWithInfo(5);
          
          // Small delay to finalize UI updates
          setTimeout(() => {
            updateProgressWithInfo(6);
            setIsProcessing(false);
          }, 500);
        }, 100); // Small delay to prevent UI freezing
      }, 100); // Small delay to prevent UI freezing
    } catch (error) {
      console.error('Error processing STL file:', error);
      setError('Error processing STL file: ' + error.message);
      setIsProcessing(false);
      
      // Show performance tips modal if the error seems to be performance-related
      if (error.message.includes('out of memory') || 
          error.message.includes('allocation failed') ||
          fileData.byteLength > 10000000) { // Show for files larger than 10MB
        setShowPerformanceTips(true);
      }
    }
  };
  
  // Create a box geometry for the brick body
  const createCachedGeometries = (() => {
    // Cache geometries to avoid creating new ones for each brick
    let brickGeometry = null;
    let studGeometry = null;
    let wireframeGeometry = null;

    return () => {
      if (!brickGeometry) {
        brickGeometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);
      }
      if (!studGeometry) {
        studGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 16);
      }
      if (!wireframeGeometry) {
        wireframeGeometry = new THREE.BoxGeometry(1, 1, 1);
      }
      return { brickGeometry, studGeometry, wireframeGeometry };
    };
  })();

  // Visualize voxels in the scenes
  const visualizeVoxels = (voxels, supportVoxels) => {
    // First clear any existing voxel visualizations
    const clearVoxelVisualizations = (scene) => {
      const voxelGroup = scene.getObjectByName('voxelGroup');
      if (voxelGroup) {
        scene.remove(voxelGroup);
      }
    };
    
    if (voxelSceneRef.current) clearVoxelVisualizations(voxelSceneRef.current);
    if (legoSceneRef.current) clearVoxelVisualizations(legoSceneRef.current);
    
    // --- VIEWPORT 2: VOXEL VISUALIZATION ---
    
    // Get color values from context
    const modelRgb = colorConfig[modelColor]?.rgb || [255, 0, 0]; // Default to red
    const supportRgb = colorConfig[supportColor]?.rgb || [128, 128, 128]; // Default to gray
    
    // Create materials for voxel grid overlay
    const voxelWireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(
        modelRgb[0] / 255,
        modelRgb[1] / 255,
        modelRgb[2] / 255
      ),
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    
    const voxelSolidMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(
        modelRgb[0] / 255,
        modelRgb[1] / 255,
        modelRgb[2] / 255
      ),
      transparent: true,
      opacity: 0.3
    });
    
    const supportVoxelWireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(
        supportRgb[0] / 255,
        supportRgb[1] / 255,
        supportRgb[2] / 255
      ),
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    
    const supportVoxelSolidMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(
        supportRgb[0] / 255,
        supportRgb[1] / 255,
        supportRgb[2] / 255
      ),
      transparent: true,
      opacity: 0.3
    });
    
    // Count voxels for instanced meshes
    const countModelVoxels = voxels.reduce((count, layer) => 
      count + layer.reduce((layerCount, row) => 
        layerCount + row.filter(voxel => voxel === 1).length, 0
      ), 0
    );
    
    const countSupportVoxels = supportVoxels.reduce((count, layer) => 
      count + layer.reduce((layerCount, row) => 
        layerCount + row.filter(voxel => voxel === 1).length, 0
      ), 0
    );
    
    // Create voxel group for the second viewport
    const voxelGroup = new THREE.Group();
    voxelGroup.name = 'voxelGroup';
    
    // Create box geometry for voxels
    const voxelGeometry = new THREE.BoxGeometry(1, 1, 1);
    
    // Use instanced meshes for better performance
    const modelVoxelMesh = new THREE.InstancedMesh(
      voxelGeometry, 
      voxelSolidMaterial, 
      countModelVoxels
    );
    
    const modelVoxelWireframeMesh = new THREE.InstancedMesh(
      voxelGeometry, 
      voxelWireframeMaterial, 
      countModelVoxels
    );
    
    const supportVoxelMesh = new THREE.InstancedMesh(
      voxelGeometry, 
      supportVoxelSolidMaterial, 
      countSupportVoxels
    );
    
    const supportVoxelWireframeMesh = new THREE.InstancedMesh(
      voxelGeometry, 
      supportVoxelWireframeMaterial, 
      countSupportVoxels
    );
    
    // Calculate the grid offset to center voxels at origin
    const gridOffset = 8; // Half of the 16x16 grid size
    
    // Use matrices for setting instances
    const matrix = new THREE.Matrix4();
    
    // Add model voxels
    let modelInstanceIndex = 0;
    let supportInstanceIndex = 0;
    
    // Iterate through the voxel grid and add voxels to the scene
    for (let y = 0; y < voxels.length; y++) {
      // Skip this layer if layer view is enabled and it's not the current layer
      if (layerViewMode && currentLayer !== y) continue;
      
      for (let z = 0; z < voxels[y].length; z++) {
        for (let x = 0; x < voxels[y][z].length; x++) {
          if (voxels[y][z][x] === 1) {
            // Position the voxel - center the grid by subtracting gridOffset
            // x and z are centered at origin, y starts at ground level (Y=0)
            const position = new THREE.Vector3(
              x - gridOffset + 0.5, // Center of voxel + offset to center the grid
              y + 0.5,              // Center of voxel + start at Y=0
              z - gridOffset + 0.5  // Center of voxel + offset to center the grid
            );
            
            // Set the matrix for this instance
            matrix.makeTranslation(position.x, position.y, position.z);
            modelVoxelMesh.setMatrixAt(modelInstanceIndex, matrix);
            modelVoxelWireframeMesh.setMatrixAt(modelInstanceIndex, matrix);
            modelInstanceIndex++;
          }
        }
      }
    }
    
    // Add support voxels
    for (let y = 0; y < supportVoxels.length; y++) {
      // Skip this layer if layer view is enabled and it's not the current layer
      if (layerViewMode && currentLayer !== y) continue;
      
      for (let z = 0; z < supportVoxels[y].length; z++) {
        for (let x = 0; x < supportVoxels[y][z].length; x++) {
          // Only add support bricks where there's a support voxel AND NOT a model voxel
          // This prevents overlapping bricks
          if (supportVoxels[y][z][x] === 1 && voxels[y][z][x] !== 1) {
            // Position the brick - center the grid by subtracting gridOffset
            // x and z are centered at origin, y starts at ground level (Y=0)
            const position = new THREE.Vector3(
              x - gridOffset + 0.5, // Center of brick + offset to center the grid
              y + 0.5,             // Center of brick + start at Y=0
              z - gridOffset + 0.5  // Center of brick + offset to center the grid
            );
            
            // Set the matrix for the brick
            matrix.makeTranslation(position.x, position.y, position.z);
            supportVoxelMesh.setMatrixAt(supportInstanceIndex, matrix);
            supportVoxelWireframeMesh.setMatrixAt(supportInstanceIndex, matrix);
            supportInstanceIndex++;
          }
        }
      }
    }
    
    // Add all voxel meshes to the group
    voxelGroup.add(modelVoxelMesh);
    voxelGroup.add(modelVoxelWireframeMesh);
    voxelGroup.add(supportVoxelMesh);
    voxelGroup.add(supportVoxelWireframeMesh);
    
    // Add voxel group to the voxel scene
    voxelSceneRef.current.add(voxelGroup);
    
    // Add debug visualization to voxel scene
    addDebugVisualization(voxelGroup, voxelSceneRef.current);
    
    // --- VIEWPORT 3: LEGO BRICK VISUALIZATION ---
    
    // Create a copy of the voxel group for the LEGO scene
    const legoGroup = new THREE.Group();
    legoGroup.name = 'voxelGroup'; // Keep same name for consistency
    
    // Define brick and stud geometries
    const brickGeometry = new THREE.BoxGeometry(1, 0.5, 1); // Half height for proper brick proportions
    const studGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16);
    
    // Define brick materials - use the actual colors from the context
    const modelBrickMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(
        modelRgb[0] / 255,
        modelRgb[1] / 255,
        modelRgb[2] / 255
      ),
      metalness: 0.1,
      roughness: 0.3
    });
    
    const supportBrickMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(
        supportRgb[0] / 255,
        supportRgb[1] / 255,
        supportRgb[2] / 255
      ),
      metalness: 0.1,
      roughness: 0.3
    });
    
    // Create instanced meshes for bricks and studs
    const modelBrickMesh = new THREE.InstancedMesh(
      brickGeometry,
      modelBrickMaterial,
      countModelVoxels
    );
    
    const modelStudMesh = new THREE.InstancedMesh(
      studGeometry,
      modelBrickMaterial,
      countModelVoxels
    );
    
    const supportBrickMesh = new THREE.InstancedMesh(
      brickGeometry,
      supportBrickMaterial,
      countSupportVoxels
    );
    
    const supportStudMesh = new THREE.InstancedMesh(
      studGeometry,
      supportBrickMaterial,
      countSupportVoxels
    );
    
    // Temporary matrices for setting instances
    const brickMatrix = new THREE.Matrix4();
    const studMatrix = new THREE.Matrix4();
    
    // Reset instance counters
    modelInstanceIndex = 0;
    supportInstanceIndex = 0;
    
    // Add model bricks
    for (let y = 0; y < voxels.length; y++) {
      // Skip this layer if layer view is enabled and it's not the current layer
      if (layerViewMode && currentLayer !== y) continue;
      
      for (let z = 0; z < voxels[y].length; z++) {
        for (let x = 0; x < voxels[y][z].length; x++) {
          if (voxels[y][z][x] === 1) {
            // Position the brick - center the grid by subtracting gridOffset
            // x and z are centered at origin, y starts at ground level (Y=0)
            const position = new THREE.Vector3(
              x - gridOffset + 0.5, // Center of brick + offset to center the grid
              y + 0.25,            // Center of brick (reduced height) + start at Y=0
              z - gridOffset + 0.5  // Center of brick + offset to center the grid
            );
            
            // Set the matrix for the brick
            brickMatrix.makeTranslation(position.x, position.y, position.z);
            modelBrickMesh.setMatrixAt(modelInstanceIndex, brickMatrix);
            
            // Add a stud on top of the brick (properly oriented upwards)
            // Create a combined matrix that places the stud correctly
            // First create an identity matrix
            studMatrix.identity();
            
            // Then apply cylinder rotation to orient it upward along Y axis
            // No need to rotate as cylinder is already up
            
            // Then translate to the correct position
            studMatrix.setPosition(
              position.x,           // Same X as brick
              position.y + 0.3,     // Stud is at top of brick (0.5 height / 2 + 0.05 stud offset)
              position.z            // Same Z as brick
            );
            
            modelStudMesh.setMatrixAt(modelInstanceIndex, studMatrix);
            modelInstanceIndex++;
          }
        }
      }
    }
    
    // Add support bricks
    for (let y = 0; y < supportVoxels.length; y++) {
      // Skip this layer if layer view is enabled and it's not the current layer
      if (layerViewMode && currentLayer !== y) continue;
      
      for (let z = 0; z < supportVoxels[y].length; z++) {
        for (let x = 0; x < supportVoxels[y][z].length; x++) {
          // Only add support bricks where there's a support voxel AND NOT a model voxel
          // This prevents overlapping bricks
          if (supportVoxels[y][z][x] === 1 && voxels[y][z][x] !== 1) {
            // Position the brick - center the grid by subtracting gridOffset
            // x and z are centered at origin, y starts at ground level (Y=0)
            const position = new THREE.Vector3(
              x - gridOffset + 0.5, // Center of brick + offset to center the grid
              y + 0.25,            // Center of brick (reduced height) + start at Y=0
              z - gridOffset + 0.5  // Center of brick + offset to center the grid
            );
            
            // Set the matrix for the brick
            brickMatrix.makeTranslation(position.x, position.y, position.z);
            supportBrickMesh.setMatrixAt(supportInstanceIndex, brickMatrix);
            
            // Add a stud on top of the support brick (properly oriented upwards)
            studMatrix.identity();
            
            // No need to rotate as cylinder is already up
            
            // Then translate to the correct position
            studMatrix.setPosition(
              position.x,           // Same X as brick
              position.y + 0.3,     // Stud is at top of brick (0.5 height / 2 + 0.05 stud offset)
              position.z            // Same Z as brick
            );
            
            supportStudMesh.setMatrixAt(supportInstanceIndex, studMatrix);
            supportInstanceIndex++;
          }
        }
      }
    }
    
    // Add brick meshes to the LEGO group
    legoGroup.add(modelBrickMesh);
    legoGroup.add(modelStudMesh);
    legoGroup.add(supportBrickMesh);
    legoGroup.add(supportStudMesh);
    
    // Add LEGO group to the scene
    legoSceneRef.current.add(legoGroup);
    
    // Add debug visualization to LEGO scene
    addDebugVisualization(legoGroup, legoSceneRef.current);
  };
  
  // Toggle layer view mode
  const toggleLayerViewMode = () => {
    const newMode = !layerViewMode;
    setLayerViewMode(newMode);
    
    // Reset to max layer when toggling on
    if (newMode) {
      setCurrentLayer(maxLayer);
    }
    
    // Update the visualization in all viewports
    if (voxelData) {
      visualizeVoxels(voxelData.voxels, voxelData.supportVoxels);
    }
  };
  
  // Handle layer change
  const handleLayerChange = (e) => {
    const newLayer = parseInt(e.target.value, 10);
    setCurrentLayer(newLayer);
    
    // Update the visualization in all viewports
    if (voxelData) {
      visualizeVoxels(voxelData.voxels, voxelData.supportVoxels);
    }
  };
  
  // Move layer up
  const moveLayerUp = () => {
    if (currentLayer < maxLayer) {
      const newLayer = currentLayer + 1;
      setCurrentLayer(newLayer);
      
      // Update the visualization in all viewports
      if (voxelData) {
        visualizeVoxels(voxelData.voxels, voxelData.supportVoxels);
      }
    }
  };
  
  // Move layer down
  const moveLayerDown = () => {
    if (currentLayer > 0) {
      const newLayer = currentLayer - 1;
      setCurrentLayer(newLayer);
      
      // Update the visualization in all viewports
      if (voxelData) {
        visualizeVoxels(voxelData.voxels, voxelData.supportVoxels);
      }
    }
  };
  
  // Apply scale changes
  const applyScale = () => {
    if (modelFile) {
      console.log("Applying scale factor:", scale);
      setProcessingMessage("Updating model with new scale...");
      setIsProcessing(true);
      setProgress(10);
      
      // Short delay to allow UI to update before reprocessing the STL file
      setTimeout(() => {
        // Reprocess the STL file with the new scale
        processSTLFile(modelFile);
      }, 100);
    }
  };
  
  // Reset camera views for all viewports
  const resetView = () => {
    // Set camera to a good position for viewing the model
    if (originalControlsRef.current) {
      // Position the camera at a 45-degree angle for a good view of the buildplate and model
      originalCameraRef.current.position.set(12, 12, 12);
      
      // Look at a point slightly above the buildplate for a better view
      originalControlsRef.current.target.set(0, 4, 0);
      originalControlsRef.current.update();
    }
    
    // Sync the other cameras to match the first viewport
    if (voxelControlsRef.current) {
      voxelCameraRef.current.position.copy(originalCameraRef.current.position);
      voxelControlsRef.current.target.copy(originalControlsRef.current.target);
      voxelControlsRef.current.update();
    }
    
    if (legoControlsRef.current) {
      legoCameraRef.current.position.copy(originalCameraRef.current.position);
      legoControlsRef.current.target.copy(originalControlsRef.current.target);
      legoControlsRef.current.update();
    }
  };
  
  // Export as TXT
  const exportAsTXT = useCallback(() => {
    if (!voxelData) {
      setError('No model data to export. Please load an STL file first.');
      setTimeout(() => setError(null), 5000);
      return;
    }
    
    // Validate filename
    if (!fileName.trim()) {
      setError('Please enter a file name.');
      setTimeout(() => setError(null), 5000);
      return;
    }
    
    // Replace invalid filename characters
    const sanitizedFileName = fileName
      .trim()
      .replace(/[\\/:*?"<>|]/g, '_'); // Replace invalid file characters
    
    // Ensure .txt is not already included
    const finalFileName = sanitizedFileName.endsWith('.txt') 
      ? sanitizedFileName.slice(0, -4) 
      : sanitizedFileName;
    
    setIsProcessing(true);
    setProcessingMessage('Generating TXT file...');
    setProgress(30);
    
    try {
      // Generate TXT content using our utility
      const txtContent = generateTxtFileContent(
        voxelData.voxels,
        voxelData.supportVoxels,
        colorConfig,
        modelColor,
        supportColor
      );
      
      setProgress(60);
      setProcessingMessage('Creating thumbnail...');
      
      // Create a download link
      const blob = new Blob([txtContent], { type: 'text/plain' });
      const downloadUrl = URL.createObjectURL(blob);
      
      // Create a high-quality thumbnail from the current 3D view
      if (originalRendererRef.current) {
        // Force a render to ensure the current state is captured
        originalSceneRef.current && originalCameraRef.current && 
          originalRendererRef.current.render(originalSceneRef.current, originalCameraRef.current);
        
        // Get thumbnail as data URL
        const thumbnailDataUrl = originalRendererRef.current.domElement.toDataURL('image/png');
        
        setProgress(80);
        setProcessingMessage('Saving project...');
        
        // Save to recent projects
        const projectId = saveProject(finalFileName, '3d', thumbnailDataUrl);
        
        if (projectId) {
          setProgress(90);
          setProcessingMessage('Finalizing export...');
          
          // Trigger download
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `${finalFileName}.txt`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the URL object
          URL.revokeObjectURL(downloadUrl);
          
          setProgress(100);
          setProcessingMessage('Export complete!');
          setExportSuccess(true);
          setTimeout(() => setExportSuccess(false), 5000);
        } else {
          throw new Error('Failed to save project.');
        }
      } else {
        throw new Error('Could not create thumbnail: renderer not available.');
      }
    } catch (error) {
      console.error('Error exporting TXT:', error);
      setError('Error exporting TXT: ' + error.message);
      setTimeout(() => setError(null), 7000);
    } finally {
      // Clean up
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingMessage('');
      }, 1000);
    }
  }, [voxelData, fileName, colorConfig, modelColor, supportColor, saveProject, originalRendererRef, originalSceneRef, originalCameraRef]);
  
  // Handle color change and update visualization
  useEffect(() => {
    if (voxelData) {
      visualizeVoxels(voxelData.voxels, voxelData.supportVoxels);
    }
  }, [modelColor, supportColor, voxelData]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        LEGO 3D Model Creator
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Controls */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Model Options</h2>
            
            {/* STL Upload */}
            <div className="mb-4">
              <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => fileInputRef.current.click()}
              >
                Upload STL File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".stl"
                onChange={handleFileUpload}
              />
              <p className="text-sm text-gray-500 mt-1">
                Select an .stl file to convert to LEGO bricks
              </p>
            </div>
            
            {/* Default Model Button */}
            {defaultModelAvailable && (
              <div className="mb-4">
                <button
                  className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={handleDefaultModel}
                >
                  Use Default Model (Gengar)
                </button>
              </div>
            )}
            
            {/* Scale Controls */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Scale: {scale.toFixed(1)}x
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="flex-grow mr-2"
                />
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={applyScale}
                >
                  Apply
                </button>
              </div>
            </div>
            
            {/* Layer View Controls */}
            {voxelData && (
              <div className="mb-4 border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-800">
                    Layer View:
                  </label>
                  <button
                    className={`px-3 py-1 rounded ${
                      layerViewMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={toggleLayerViewMode}
                  >
                    {layerViewMode ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
                
                {layerViewMode && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        onClick={() => moveLayerDown()}
                        disabled={currentLayer === 0}
                      >
                        -
                      </button>
                      <span className="font-medium text-gray-800">Layer {currentLayer + 1} of {maxLayer + 1}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        onClick={() => moveLayerUp()}
                        disabled={currentLayer === maxLayer}
                      >
                        +
                      </button>
                    </div>
                    
                    <input
                      type="range"
                      min="0"
                      max={maxLayer}
                      step="1"
                      value={currentLayer}
                      onChange={handleLayerChange}
                      className="w-full"
                    />
                  </>
                )}
              </div>
            )}
            
            {/* View Controls */}
            <div className="mb-4">
              <button
                className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={resetView}
              >
                Reset View
              </button>
            </div>
            
            {/* Color Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Model Brick Color
              </label>
              <select
                value={modelColor}
                onChange={(e) => setModelColor(e.target.value)}
                className="w-full p-2 border rounded text-gray-800 bg-white"
              >
                {Object.entries(colorConfig).map(([colorName, colorData]) => (
                  <option key={colorName} value={colorName}>
                    {colorName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Support Brick Color
              </label>
              <select
                value={supportColor}
                onChange={(e) => setSupportColor(e.target.value)}
                className="w-full p-2 border rounded text-gray-800 bg-white"
              >
                {Object.entries(colorConfig).map(([colorName, colorData]) => (
                  <option key={colorName} value={colorName}>
                    {colorName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Export Section */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Export</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                File Name
              </label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full rounded border p-2 text-gray-800"
              />
            </div>
            
            <button
              className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 mb-4"
              onClick={exportAsTXT}
              disabled={!voxelData}
            >
              Export for LEGO Printer (.txt)
            </button>
            
            {/* Brick Stats */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Brick Statistics</h3>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-800">Total Bricks:</span>
                  <span className="font-medium text-gray-800">{modelStats.totalBricks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Model Bricks:</span>
                  <span className="font-medium text-gray-800">{modelStats.modelBricks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Support Bricks:</span>
                  <span className="font-medium text-gray-800">{modelStats.supportBricks}</span>
                </div>
              </div>
            </div>
            
            {/* Success message */}
            {exportSuccess && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
                Export successful!
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
        
        {/* 3D Viewports */}
        <div className="lg:col-span-3">
          {/* Viewport Headers */}
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div className="text-center viewport-label">Original STL Model</div>
            <div className="text-center viewport-label">Voxelized Grid</div>
            <div className="text-center viewport-label">LEGO Brick Render</div>
          </div>
          
          {/* Triple Viewport Container */}
          <div className="grid grid-cols-3 gap-4">
            {/* Left Viewport - Original STL */}
            <div 
              className="bg-white rounded-lg shadow-md p-2 h-[500px] relative"
              ref={originalModelRef}
            >
              {isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                  <div className="animate-pulse text-high-contrast">Processing...</div>
                </div>
              )}
            </div>
            
            {/* Middle Viewport - Voxelized Grid */}
            <div 
              className="bg-white rounded-lg shadow-md p-2 h-[500px] relative"
              ref={voxelModelRef}
            >
              {isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                  <div className="animate-pulse text-high-contrast">Processing...</div>
                </div>
              )}
            </div>
            
            {/* Right Viewport - LEGO Bricks */}
            <div 
              className="bg-white rounded-lg shadow-md p-2 h-[500px] relative"
              ref={legoModelRef}
            >
              {isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                  <div className="animate-pulse text-high-contrast">Processing...</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Processing Overlay */}
          {isProcessing && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Processing Model</h3>
                
                <div className="w-full bg-gray-200 rounded-full h-6 mb-3">
                  <div 
                    className="bg-blue-600 h-6 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <p className="text-center text-gray-800 font-medium mb-2">
                  {progress}% Complete
                </p>
                
                <p className="text-center text-gray-700">
                  {processingMessage}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Performance Tips Modal */}
      {showPerformanceTips && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Performance Tips</h2>
              <button 
                onClick={() => setShowPerformanceTips(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="prose prose-lg">
              <p className="text-yellow-600 font-medium">
                Your STL file appears to be quite large. Here are some tips to improve performance:
              </p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>Try reducing the polygon count of your STL file before uploading</li>
                <li>Use the scale slider to create a smaller model</li>
                <li>Modern browsers work best (Chrome, Firefox, Edge)</li>
                <li>Close other tabs and applications to free up memory</li>
                <li>If your device has a dedicated GPU, make sure your browser is using it</li>
              </ul>
              
              <p className="mt-4">
                If you continue to experience issues, you might need to use a computer with more RAM and a better GPU.
              </p>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowPerformanceTips(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success message */}
      {exportSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded shadow-md z-50">
          <span className="font-medium">Export successful!</span>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded shadow-md z-50">
          <span className="font-medium">{error}</span>
        </div>
      )}
    </div>
  );
};

export default ThreeDHome; 