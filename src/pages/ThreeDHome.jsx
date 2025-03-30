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
    originalCamera.position.set(10, 10, 10);
    originalCamera.lookAt(0, 0, 0);
    
    const voxelCamera = new THREE.PerspectiveCamera(
      75,
      voxelAspect,
      0.1,
      1000
    );
    voxelCamera.position.set(10, 10, 10);
    voxelCamera.lookAt(0, 0, 0);
    
    const legoCamera = new THREE.PerspectiveCamera(
      75,
      legoAspect,
      0.1,
      1000
    );
    legoCamera.position.set(10, 10, 10);
    legoCamera.lookAt(0, 0, 0);
    
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
    const gridHelper = new THREE.GridHelper(16, 16);
    originalScene.add(gridHelper.clone());
    voxelScene.add(gridHelper.clone());
    legoScene.add(gridHelper.clone());
    
    const axesHelper = new THREE.AxesHelper(5);
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
      
      const defaultModelPath = '/gengar.stl';
      const response = await fetch(defaultModelPath);
      
      if (!response.ok) {
        throw new Error(`Failed to load default model: ${response.statusText}`);
      }
      
      setProgress(30);
      
      const arrayBuffer = await response.arrayBuffer();
      setModelFile(arrayBuffer);
      processSTLFile(arrayBuffer);
    } catch (error) {
      console.error('Error loading default model:', error);
      setError(`Error loading default model: ${error.message}`);
      setIsProcessing(false);
    }
  };
  
  // Process STL file
  const processSTLFile = (fileData) => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Clear previous models from all scenes
      const clearScene = (scene) => {
        const modelGroup = scene.getObjectByName('modelGroup');
        if (modelGroup) {
          scene.remove(modelGroup);
        }
        
        const voxelGroup = scene.getObjectByName('voxelGroup');
        if (voxelGroup) {
          scene.remove(voxelGroup);
        }
      };
      
      if (originalSceneRef.current) clearScene(originalSceneRef.current);
      if (voxelSceneRef.current) clearScene(voxelSceneRef.current);
      if (legoSceneRef.current) clearScene(legoSceneRef.current);
      
      setProgress(10);
      
      // Load STL file
      const loader = new STLLoader();
      const geometry = loader.parse(fileData);
      
      setProgress(20);
      
      // --- VIEWPORT 1: ORIGINAL STL MODEL ---
      
      // Create a standard material for the original model
      const originalMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e90ff,
        metalness: 0.1,
        roughness: 0.5
      });
      
      const originalMesh = new THREE.Mesh(geometry, originalMaterial);
      
      // Center the mesh
      geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      geometry.boundingBox.getCenter(center);
      originalMesh.position.sub(center);
      
      // Scale mesh to fit in the grid - 16x16 LEGO baseplate (12.8cm x 12.8cm)
      const box = new THREE.Box3().setFromObject(originalMesh);
      const size = box.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scaleFactor = 12 / maxDimension; // Slightly smaller than grid to ensure visibility
      originalMesh.scale.multiplyScalar(scaleFactor * scale);
      
      // Create a group for the original model
      const originalModelGroup = new THREE.Group();
      originalModelGroup.name = 'modelGroup';
      originalModelGroup.add(originalMesh);
      
      // Add to original scene
      originalSceneRef.current.add(originalModelGroup);
      
      setProgress(40);
      
      // Create a mesh for voxelization
      const voxelizationMesh = originalMesh.clone();
      
      // Voxelize the model using our utility
      const voxelResult = voxelizeMesh(voxelizationMesh);
      setVoxelData(voxelResult);
      setModelStats(voxelResult.stats);
      
      setProgress(70);
      
      // Visualize voxels in the other two viewports
      visualizeVoxels(voxelResult.voxels, voxelResult.supportVoxels);
      
      // Reset camera views for all viewports
      if (originalControlsRef.current) originalControlsRef.current.reset();
      if (voxelControlsRef.current) voxelControlsRef.current.reset();
      if (legoControlsRef.current) legoControlsRef.current.reset();
      
      setProgress(100);
      setIsProcessing(false);
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
    try {
      const { brickGeometry, studGeometry, wireframeGeometry } = createCachedGeometries();
      
      // --- VIEWPORT 2: VOXELIZED GRID ---
      if (voxelSceneRef.current) {
        // Remove previous voxel visualization
        const voxelGroup = voxelSceneRef.current.getObjectByName('voxelGroup');
        if (voxelGroup) {
          voxelSceneRef.current.remove(voxelGroup);
        }
        
        // Create a group for the voxel grid overlay
        const gridVoxelGroup = new THREE.Group();
        gridVoxelGroup.name = 'voxelGroup';
        
        // Create materials if they don't exist
        const wireMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          wireframe: true,
          transparent: true,
          opacity: 0.5
        });
        
        const modelMaterial = new THREE.MeshBasicMaterial({
          color: 0x0088ff,
          transparent: true,
          opacity: 0.3
        });
        
        const supportMaterial = new THREE.MeshBasicMaterial({
          color: 0xff8800,
          transparent: true,
          opacity: 0.3
        });
        
        // Use instanced mesh for better performance
        const modelWireframeMesh = new THREE.InstancedMesh(
          wireframeGeometry,
          wireMaterial,
          countVoxels(voxels, layerViewMode ? currentLayer : null)
        );
        
        const modelSolidMesh = new THREE.InstancedMesh(
          wireframeGeometry,
          modelMaterial,
          countVoxels(voxels, layerViewMode ? currentLayer : null)
        );
        
        const supportWireframeMesh = new THREE.InstancedMesh(
          wireframeGeometry,
          wireMaterial,
          countSupportVoxels(voxels, supportVoxels, layerViewMode ? currentLayer : null)
        );
        
        const supportSolidMesh = new THREE.InstancedMesh(
          wireframeGeometry,
          supportMaterial,
          countSupportVoxels(voxels, supportVoxels, layerViewMode ? currentLayer : null)
        );
        
        // Temp matrix for setting instances
        const matrix = new THREE.Matrix4();
        let modelInstanceIndex = 0;
        let supportInstanceIndex = 0;
        
        // Add model voxels to grid
        for (let x = 0; x < voxels.length; x++) {
          for (let z = 0; z < voxels[x].length; z++) {
            for (let y = 0; y < voxels[x][z].length; y++) {
              // In layer view mode, only show voxels up to the current layer
              if (layerViewMode && y > currentLayer) continue;
              
              if (voxels[x][z][y]) {
                const position = new THREE.Vector3(x - 8 + 0.5, y + 0.5, z - 8 + 0.5);
                
                // Set matrix for this instance
                matrix.makeTranslation(position.x, position.y, position.z);
                
                // Set the matrix for both model meshes
                modelWireframeMesh.setMatrixAt(modelInstanceIndex, matrix);
                modelSolidMesh.setMatrixAt(modelInstanceIndex, matrix);
                modelInstanceIndex++;
              }
            }
          }
        }
        
        // Add support voxels to grid
        for (let x = 0; x < supportVoxels.length; x++) {
          for (let z = 0; z < supportVoxels[x].length; z++) {
            for (let y = 0; y < supportVoxels[x][z].length; y++) {
              // In layer view mode, only show voxels up to the current layer
              if (layerViewMode && y > currentLayer) continue;
              
              if (supportVoxels[x][z][y] && !voxels[x][z][y]) {
                const position = new THREE.Vector3(x - 8 + 0.5, y + 0.5, z - 8 + 0.5);
                
                // Set matrix for this instance
                matrix.makeTranslation(position.x, position.y, position.z);
                
                // Set the matrix for both support meshes
                supportWireframeMesh.setMatrixAt(supportInstanceIndex, matrix);
                supportSolidMesh.setMatrixAt(supportInstanceIndex, matrix);
                supportInstanceIndex++;
              }
            }
          }
        }
        
        // Add all meshes to the group
        gridVoxelGroup.add(modelWireframeMesh);
        gridVoxelGroup.add(modelSolidMesh);
        gridVoxelGroup.add(supportWireframeMesh);
        gridVoxelGroup.add(supportSolidMesh);
        
        // Add grid overlay to scene
        voxelSceneRef.current.add(gridVoxelGroup);
      }
      
      // --- VIEWPORT 3: LEGO BRICK RENDER ---
      if (legoSceneRef.current) {
        // Remove previous voxel visualization
        const legoGroup = legoSceneRef.current.getObjectByName('voxelGroup');
        if (legoGroup) {
          legoSceneRef.current.remove(legoGroup);
        }
        
        // Create a group for the LEGO bricks
        const legoBrickGroup = new THREE.Group();
        legoBrickGroup.name = 'voxelGroup';
        
        // Get colors from context
        const modelRgb = colorConfig[modelColor]?.rgb || [255, 204, 0];
        const supportRgb = colorConfig[supportColor]?.rgb || [77, 77, 77];
        
        // Create materials
        const modelMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(
            modelRgb[0] / 255,
            modelRgb[1] / 255,
            modelRgb[2] / 255
          ),
          metalness: 0.1,
          roughness: 0.5
        });
        
        const supportMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(
            supportRgb[0] / 255,
            supportRgb[1] / 255,
            supportRgb[2] / 255
          ),
          metalness: 0.1,
          roughness: 0.5,
          transparent: true,
          opacity: 0.7
        });
        
        const studMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.3,
          roughness: 0.3
        });
        
        // Find the maximum layer height
        let maxHeight = 0;
        for (let y = 0; y < voxels[0][0].length; y++) {
          let hasVoxelsInLayer = false;
          
          for (let x = 0; x < voxels.length && !hasVoxelsInLayer; x++) {
            for (let z = 0; z < voxels[x].length && !hasVoxelsInLayer; z++) {
              if (voxels[x][z][y] || (supportVoxels[x][z][y] && !voxels[x][z][y])) {
                hasVoxelsInLayer = true;
                maxHeight = y;
              }
            }
          }
        }
        
        setMaxLayer(maxHeight);
        if (currentLayer === null) {
          setCurrentLayer(maxHeight);
        }
        
        // Count instances for model and support bricks
        const modelBrickCount = countVoxels(voxels, layerViewMode ? currentLayer : null);
        const modelStudCount = countStuds(voxels, layerViewMode ? currentLayer : null);
        const supportBrickCount = countSupportVoxels(voxels, supportVoxels, layerViewMode ? currentLayer : null);
        const supportStudCount = countSupportStuds(voxels, supportVoxels, layerViewMode ? currentLayer : null);
        
        // Create instanced meshes for bricks and studs
        const modelBrickMesh = new THREE.InstancedMesh(brickGeometry, modelMaterial, modelBrickCount);
        const modelStudMesh = new THREE.InstancedMesh(studGeometry, studMaterial, modelStudCount);
        const supportBrickMesh = new THREE.InstancedMesh(brickGeometry, supportMaterial, supportBrickCount);
        const supportStudMesh = new THREE.InstancedMesh(studGeometry, studMaterial, supportStudCount);
        
        // Temp matrix for setting instances
        const brickMatrix = new THREE.Matrix4();
        const studMatrix = new THREE.Matrix4();
        let modelBrickIndex = 0;
        let modelStudIndex = 0;
        let supportBrickIndex = 0;
        let supportStudIndex = 0;
        
        // Add model voxels as LEGO bricks
        for (let x = 0; x < voxels.length; x++) {
          for (let z = 0; z < voxels[x].length; z++) {
            for (let y = 0; y < voxels[x][z].length; y++) {
              // In layer view mode, only show voxels up to the current layer
              if (layerViewMode && y > currentLayer) continue;
              
              if (voxels[x][z][y]) {
                // Create brick body
                const position = new THREE.Vector3(x - 8 + 0.5, y + 0.5, z - 8 + 0.5);
                brickMatrix.makeTranslation(position.x, position.y, position.z);
                modelBrickMesh.setMatrixAt(modelBrickIndex++, brickMatrix);
                
                // Create stud on top (if not in layer view mode or if not the current layer)
                if (!layerViewMode || y < currentLayer) {
                  const studPosition = new THREE.Vector3(x - 8 + 0.5, y + 1.025, z - 8 + 0.5);
                  studMatrix.makeRotationX(Math.PI / 2);
                  studMatrix.setPosition(studPosition.x, studPosition.y, studPosition.z);
                  modelStudMesh.setMatrixAt(modelStudIndex++, studMatrix);
                }
              }
            }
          }
        }
        
        // Add support voxels as LEGO bricks
        for (let x = 0; x < supportVoxels.length; x++) {
          for (let z = 0; z < supportVoxels[x].length; z++) {
            for (let y = 0; y < supportVoxels[x][z].length; y++) {
              // In layer view mode, only show voxels up to the current layer
              if (layerViewMode && y > currentLayer) continue;
              
              if (supportVoxels[x][z][y] && !voxels[x][z][y]) {
                // Create brick body
                const position = new THREE.Vector3(x - 8 + 0.5, y + 0.5, z - 8 + 0.5);
                brickMatrix.makeTranslation(position.x, position.y, position.z);
                supportBrickMesh.setMatrixAt(supportBrickIndex++, brickMatrix);
                
                // Create stud on top (if not in layer view mode or if not the current layer)
                if (!layerViewMode || y < currentLayer) {
                  const studPosition = new THREE.Vector3(x - 8 + 0.5, y + 1.025, z - 8 + 0.5);
                  studMatrix.makeRotationX(Math.PI / 2);
                  studMatrix.setPosition(studPosition.x, studPosition.y, studPosition.z);
                  supportStudMesh.setMatrixAt(supportStudIndex++, studMatrix);
                }
              }
            }
          }
        }
        
        // Add all meshes to the group
        legoBrickGroup.add(modelBrickMesh);
        legoBrickGroup.add(modelStudMesh);
        legoBrickGroup.add(supportBrickMesh);
        legoBrickGroup.add(supportStudMesh);
        
        // Add layer highlight in layer view mode
        if (layerViewMode && currentLayer >= 0 && currentLayer <= maxHeight) {
          // Create a layer highlight material
          const layerHighlightMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
          });
          
          // Create a plane for the layer highlight
          const layerGeometry = new THREE.PlaneGeometry(16, 16);
          const layerPlane = new THREE.Mesh(layerGeometry, layerHighlightMaterial);
          layerPlane.position.set(0, currentLayer + 0.5, 0);
          layerPlane.rotation.x = Math.PI / 2;
          legoBrickGroup.add(layerPlane);
        }
        
        // Add LEGO brick group to scene
        legoSceneRef.current.add(legoBrickGroup);
      }
    } catch (error) {
      console.error('Error visualizing voxels:', error);
    }
  };
  
  // Helper function to count the total number of voxels
  const countVoxels = (voxels, maxLayer = null) => {
    let count = 0;
    for (let x = 0; x < voxels.length; x++) {
      for (let z = 0; z < voxels[x].length; z++) {
        for (let y = 0; y < voxels[x][z].length; y++) {
          if (maxLayer !== null && y > maxLayer) continue;
          if (voxels[x][z][y]) count++;
        }
      }
    }
    return count;
  };

  // Helper function to count the total number of support voxels
  const countSupportVoxels = (voxels, supportVoxels, maxLayer = null) => {
    let count = 0;
    for (let x = 0; x < supportVoxels.length; x++) {
      for (let z = 0; z < supportVoxels[x].length; z++) {
        for (let y = 0; y < supportVoxels[x][z].length; y++) {
          if (maxLayer !== null && y > maxLayer) continue;
          if (supportVoxels[x][z][y] && !voxels[x][z][y]) count++;
        }
      }
    }
    return count;
  };

  // Helper function to count the total number of studs for model voxels
  const countStuds = (voxels, maxLayer = null) => {
    let count = 0;
    for (let x = 0; x < voxels.length; x++) {
      for (let z = 0; z < voxels[x].length; z++) {
        for (let y = 0; y < voxels[x][z].length; y++) {
          if (maxLayer !== null) {
            if (y === maxLayer) continue; // No studs on top layer in layer view mode
            if (y > maxLayer) continue;
          }
          if (voxels[x][z][y]) count++;
        }
      }
    }
    return count;
  };

  // Helper function to count the total number of studs for support voxels
  const countSupportStuds = (voxels, supportVoxels, maxLayer = null) => {
    let count = 0;
    for (let x = 0; x < supportVoxels.length; x++) {
      for (let z = 0; z < supportVoxels[x].length; z++) {
        for (let y = 0; y < supportVoxels[x][z].length; y++) {
          if (maxLayer !== null) {
            if (y === maxLayer) continue; // No studs on top layer in layer view mode
            if (y > maxLayer) continue;
          }
          if (supportVoxels[x][z][y] && !voxels[x][z][y]) count++;
        }
      }
    }
    return count;
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
      processSTLFile(modelFile);
    }
  };
  
  // Reset view
  const resetView = () => {
    if (originalControlsRef.current) {
      originalControlsRef.current.reset();
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