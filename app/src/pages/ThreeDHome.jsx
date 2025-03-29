import { useState, useEffect, useRef, useCallback } from 'react';
import { useImageContext } from '../context/ImageContext';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDHome = () => {
  const { modelFile, setModelFile, colorConfig, modelColor, setModelColor, supportColor, setSupportColor } = useImageContext();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
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
  
  // Three.js references
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Initialize three.js scene
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(15, 15, 15);
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controlsRef.current = controls;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(16, 16);
    scene.add(gridHelper);
    
    // Add axes helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    
    // Create animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
  
  // Load default model
  useEffect(() => {
    const loadDefaultModel = async () => {
      try {
        // In a real implementation, you would load the actual gengar.stl file
        // For now, we'll just simulate it
        // In the future, you should place the gengar.stl file in the public folder
        console.log('Default model would be loaded here');
      } catch (error) {
        console.error('Error loading default model:', error);
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
  
  // Process STL file
  const processSTLFile = (fileData) => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Clear previous model
      if (sceneRef.current) {
        const modelGroup = sceneRef.current.getObjectByName('modelGroup');
        if (modelGroup) {
          sceneRef.current.remove(modelGroup);
        }
      }
      
      setProgress(10);
      
      // Load STL file
      const loader = new STLLoader();
      const geometry = loader.parse(fileData);
      
      setProgress(30);
      
      // Create mesh
      const material = new THREE.MeshStandardMaterial({
        color: 0x1e90ff,
        metalness: 0.1,
        roughness: 0.5
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      // Center the mesh
      geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      geometry.boundingBox.getCenter(center);
      mesh.position.sub(center);
      
      // Scale mesh to fit in the grid
      const box = new THREE.Box3().setFromObject(mesh);
      const size = box.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scaleFactor = 10 / maxDimension;
      mesh.scale.multiplyScalar(scaleFactor * scale);
      
      setProgress(50);
      
      // Create a group for the model
      const modelGroup = new THREE.Group();
      modelGroup.name = 'modelGroup';
      modelGroup.add(mesh);
      
      // Add to scene
      sceneRef.current.add(modelGroup);
      
      // Reset camera view
      controlsRef.current.reset();
      
      setProgress(70);
      
      // Voxelize the model (simplified version for now)
      voxelizeModel(mesh);
      
      setProgress(100);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error processing STL file:', error);
      setError('Error processing STL file: ' + error.message);
      setIsProcessing(false);
    }
  };
  
  // Simplified voxelization (in a real implementation, this would be more complex)
  const voxelizeModel = (mesh) => {
    try {
      // Get bounding box
      const box = new THREE.Box3().setFromObject(mesh);
      
      // Define grid size
      const gridSize = 16;
      
      // Create a simple 3D grid
      const voxels = Array(gridSize).fill().map(() => 
        Array(gridSize).fill().map(() => 
          Array(10).fill(false)
        )
      );
      
      // Mark voxels as filled (very simplified version)
      // This is a placeholder - in a real application, you would use
      // proper voxelization algorithms to determine which voxels are filled
      
      // For now, we'll just fill a simple shape
      for (let x = 4; x < 12; x++) {
        for (let y = 4; y < 12; y++) {
          for (let z = 0; z < 6; z++) {
            // Skip some voxels to create a more interesting shape
            if (x === 4 || x === 11 || y === 4 || y === 11 || z === 0) {
              voxels[x][y][z] = true;
            }
          }
        }
      }
      
      // Create support voxels (simplified)
      const supportVoxels = Array(gridSize).fill().map(() => 
        Array(gridSize).fill().map(() => 
          Array(10).fill(false)
        )
      );
      
      // Add support under model voxels
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          let foundModelVoxel = false;
          let supportHeight = 0;
          
          // Scan from bottom to top
          for (let z = 0; z < 10; z++) {
            if (voxels[x][y][z]) {
              foundModelVoxel = true;
              break;
            }
            supportHeight = z;
          }
          
          // If we found a model voxel, add support voxels below it
          if (foundModelVoxel) {
            for (let z = 0; z <= supportHeight; z++) {
              supportVoxels[x][y][z] = true;
            }
          }
        }
      }
      
      // Store voxel data
      setVoxelData({ voxels, supportVoxels });
      
      // Count model and support bricks
      let modelCount = 0;
      let supportCount = 0;
      
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          for (let z = 0; z < 10; z++) {
            if (voxels[x][y][z]) {
              modelCount++;
            }
            if (supportVoxels[x][y][z] && !voxels[x][y][z]) {
              supportCount++;
            }
          }
        }
      }
      
      setModelStats({
        totalBricks: modelCount + supportCount,
        modelBricks: modelCount,
        supportBricks: supportCount
      });
      
      // Visualize voxels
      visualizeVoxels(voxels, supportVoxels);
    } catch (error) {
      console.error('Error voxelizing model:', error);
    }
  };
  
  // Visualize voxels in the scene
  const visualizeVoxels = (voxels, supportVoxels) => {
    try {
      // Remove previous voxel visualization
      if (sceneRef.current) {
        const voxelGroup = sceneRef.current.getObjectByName('voxelGroup');
        if (voxelGroup) {
          sceneRef.current.remove(voxelGroup);
        }
      }
      
      // Create a group for the voxels
      const voxelGroup = new THREE.Group();
      voxelGroup.name = 'voxelGroup';
      
      // Create a box geometry for the voxels
      const boxGeometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);
      
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
      
      // Add model voxels
      for (let x = 0; x < voxels.length; x++) {
        for (let y = 0; y < voxels[x].length; y++) {
          for (let z = 0; z < voxels[x][y].length; z++) {
            if (voxels[x][y][z]) {
              const voxel = new THREE.Mesh(boxGeometry, modelMaterial);
              voxel.position.set(x - 8 + 0.5, z + 0.5, y - 8 + 0.5);
              voxelGroup.add(voxel);
            }
          }
        }
      }
      
      // Add support voxels
      for (let x = 0; x < supportVoxels.length; x++) {
        for (let y = 0; y < supportVoxels[x].length; y++) {
          for (let z = 0; z < supportVoxels[x][y].length; z++) {
            if (supportVoxels[x][y][z] && !voxels[x][y][z]) {
              const voxel = new THREE.Mesh(boxGeometry, supportMaterial);
              voxel.position.set(x - 8 + 0.5, z + 0.5, y - 8 + 0.5);
              voxelGroup.add(voxel);
            }
          }
        }
      }
      
      // Add voxel group to scene
      sceneRef.current.add(voxelGroup);
    } catch (error) {
      console.error('Error visualizing voxels:', error);
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
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };
  
  // Export as TXT
  const exportAsTXT = useCallback(() => {
    if (!voxelData) {
      setError('No model data to export');
      return;
    }
    
    try {
      const { voxels, supportVoxels } = voxelData;
      let txtContent = '';
      
      // Process model voxels
      for (let x = 0; x < voxels.length; x++) {
        for (let y = 0; y < voxels[x].length; y++) {
          for (let z = 0; z < voxels[x][y].length; z++) {
            if (voxels[x][y][z]) {
              // Get model color dispenser
              const colorDispenser = colorConfig[modelColor]?.dispenser || 1;
              
              // Add to TXT content (x, y, z, color_index)
              txtContent += `${x + 1} ${y + 1} ${z + 1} ${colorDispenser}\n`;
            }
          }
        }
      }
      
      // Process support voxels
      for (let x = 0; x < supportVoxels.length; x++) {
        for (let y = 0; y < supportVoxels[x].length; y++) {
          for (let z = 0; z < supportVoxels[x][y].length; z++) {
            if (supportVoxels[x][y][z] && !voxels[x][y][z]) {
              // Get support color dispenser
              const colorDispenser = colorConfig[supportColor]?.dispenser || 7;
              
              // Add to TXT content (x, y, z, color_index)
              txtContent += `${x + 1} ${y + 1} ${z + 1} ${colorDispenser}\n`;
            }
          }
        }
      }
      
      // Create a download link
      const blob = new Blob([txtContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Error exporting TXT:', error);
      setError('Error exporting TXT: ' + error.message);
    }
  }, [voxelData, fileName, colorConfig, modelColor, supportColor]);
  
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              <label className="block text-sm text-gray-600 mb-1">
                Model Brick Color
              </label>
              <select
                value={modelColor}
                onChange={(e) => setModelColor(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {Object.entries(colorConfig).map(([colorName, colorData]) => (
                  <option key={colorName} value={colorName}>
                    {colorName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Support Brick Color
              </label>
              <select
                value={supportColor}
                onChange={(e) => setSupportColor(e.target.value)}
                className="w-full p-2 border rounded"
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
            <h2 className="text-xl font-bold mb-4">Export</h2>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                File Name
              </label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full rounded border p-2"
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
              <h3 className="font-semibold mb-2">Brick Statistics</h3>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Total Bricks:</span>
                  <span className="font-medium">{modelStats.totalBricks}</span>
                </div>
                <div className="flex justify-between">
                  <span>Model Bricks:</span>
                  <span className="font-medium">{modelStats.modelBricks}</span>
                </div>
                <div className="flex justify-between">
                  <span>Support Bricks:</span>
                  <span className="font-medium">{modelStats.supportBricks}</span>
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
        
        {/* Right Column - 3D Viewer */}
        <div className="lg:col-span-2">
          <div 
            className="bg-white rounded-lg shadow-md p-4 h-[600px] relative"
            ref={mountRef}
          >
            {/* Processing Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-10">
                <div className="bg-white rounded-lg p-6 w-64">
                  <p className="text-center text-gray-700 mb-4">
                    Processing Model...
                  </p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div 
                      className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-center text-sm text-gray-500">
                    {progress}% Complete
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDHome; 