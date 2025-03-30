import { createContext, useState, useEffect, useContext } from 'react';

const ImageContext = createContext();

export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  // Image states
  const [originalImage, setOriginalImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [pixelatedImage, setPixelatedImage] = useState(null);
  const [legoImage, setLegoImage] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [cropArea, setCropArea] = useState(null);
  
  // 3D model states
  const [modelFile, setModelFile] = useState(null);
  const [voxelizedModel, setVoxelizedModel] = useState(null);
  
  // Recent projects
  const [recentProjects, setRecentProjects] = useState([]);
  
  // Color configuration
  const [colorConfig, setColorConfig] = useState({
    'yellow': { rgb: [255, 204, 0], dispenser: 1 },
    'red': { rgb: [237, 28, 36], dispenser: 2 },
    'blue': { rgb: [0, 114, 206], dispenser: 3 },
    'green': { rgb: [0, 158, 73], dispenser: 4 },
    'orange': { rgb: [243, 112, 33], dispenser: 5 },
    'light_gray': { rgb: [178, 178, 178], dispenser: 6 },
    'dark_gray': { rgb: [77, 77, 77], dispenser: 7 },
  });
  
  // 3D model color settings
  const [modelColor, setModelColor] = useState('yellow');
  const [supportColor, setSupportColor] = useState('dark_gray');

  // Load state from localStorage on component mount
  useEffect(() => {
    const loadState = () => {
      try {
        // Only load state if we're in the same mode
        const currentPath = window.location.pathname;
        
        // Load color config
        const savedColorConfig = localStorage.getItem('colorConfig');
        if (savedColorConfig) {
          setColorConfig(JSON.parse(savedColorConfig));
        }
        
        // Load recent projects
        const savedRecentProjects = localStorage.getItem('recentProjects');
        if (savedRecentProjects) {
          setRecentProjects(JSON.parse(savedRecentProjects));
        }
        
        // Only load mosaic data if we're in mosaic mode
        if (currentPath.includes('mosaic') || currentPath.includes('crop') || currentPath.includes('preview')) {
          const savedOriginalImage = localStorage.getItem('originalImage');
          const savedCroppedImage = localStorage.getItem('croppedImage');
          const savedPixelatedImage = localStorage.getItem('pixelatedImage');
          const savedLegoImage = localStorage.getItem('legoImage');
          const savedAiPrompt = localStorage.getItem('aiPrompt');
          const savedCropArea = localStorage.getItem('cropArea');
          
          if (savedOriginalImage) setOriginalImage(savedOriginalImage);
          if (savedCroppedImage) setCroppedImage(savedCroppedImage);
          if (savedPixelatedImage) setPixelatedImage(savedPixelatedImage);
          if (savedLegoImage) setLegoImage(savedLegoImage);
          if (savedAiPrompt) setAiPrompt(savedAiPrompt);
          if (savedCropArea) setCropArea(JSON.parse(savedCropArea));
        }
        
        // Only load 3D data if we're in 3D mode
        if (currentPath.includes('3d')) {
          const savedModelFile = localStorage.getItem('modelFile');
          const savedVoxelizedModel = localStorage.getItem('voxelizedModel');
          const savedModelColor = localStorage.getItem('modelColor');
          const savedSupportColor = localStorage.getItem('supportColor');
          
          if (savedModelFile) setModelFile(savedModelFile);
          if (savedVoxelizedModel) setVoxelizedModel(JSON.parse(savedVoxelizedModel));
          if (savedModelColor) setModelColor(savedModelColor);
          if (savedSupportColor) setSupportColor(savedSupportColor);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    };
    
    loadState();
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    // Only save if there's data to save
    if (colorConfig) {
      localStorage.setItem('colorConfig', JSON.stringify(colorConfig));
    }
    
    // Save recent projects
    if (recentProjects.length > 0) {
      localStorage.setItem('recentProjects', JSON.stringify(recentProjects));
    }
    
    // Only save mosaic data if there's data to save
    if (originalImage || croppedImage || pixelatedImage || legoImage || aiPrompt || cropArea) {
      if (originalImage) localStorage.setItem('originalImage', originalImage);
      if (croppedImage) localStorage.setItem('croppedImage', croppedImage);
      if (pixelatedImage) localStorage.setItem('pixelatedImage', pixelatedImage);
      if (legoImage) localStorage.setItem('legoImage', legoImage);
      if (aiPrompt) localStorage.setItem('aiPrompt', aiPrompt);
      if (cropArea) localStorage.setItem('cropArea', JSON.stringify(cropArea));
    }
    
    // Only save 3D data if there's data to save
    if (modelFile || voxelizedModel || modelColor || supportColor) {
      if (modelFile) localStorage.setItem('modelFile', modelFile);
      if (voxelizedModel) localStorage.setItem('voxelizedModel', JSON.stringify(voxelizedModel));
      if (modelColor) localStorage.setItem('modelColor', modelColor);
      if (supportColor) localStorage.setItem('supportColor', supportColor);
    }
  }, [originalImage, croppedImage, pixelatedImage, legoImage, aiPrompt, cropArea, 
      modelFile, voxelizedModel, colorConfig, modelColor, supportColor, recentProjects]);

  // Save a new project to the recent projects list
  const saveProject = (name, type, thumbnail = null) => {
    try {
      const newProject = {
        id: Date.now().toString(),
        name: name || `Untitled ${type === 'mosaic' ? 'Mosaic' : '3D Model'}`,
        type,
        thumbnail,
        date: new Date().toISOString()
      };
      
      // Add to beginning of recent projects list, limit to 10 projects
      const updatedProjects = [newProject, ...recentProjects].slice(0, 10);
      setRecentProjects(updatedProjects);
      
      return newProject.id;
    } catch (error) {
      console.error('Error saving project:', error);
      return null;
    }
  };
  
  // Delete a project from the recent projects list
  const deleteProject = (projectId) => {
    try {
      const updatedProjects = recentProjects.filter(project => project.id !== projectId);
      setRecentProjects(updatedProjects);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Clear mosaic data
  const clearMosaicData = () => {
    setOriginalImage(null);
    setCroppedImage(null);
    setPixelatedImage(null);
    setLegoImage(null);
    setAiPrompt('');
    setCropArea(null);
    
    localStorage.removeItem('originalImage');
    localStorage.removeItem('croppedImage');
    localStorage.removeItem('pixelatedImage');
    localStorage.removeItem('legoImage');
    localStorage.removeItem('aiPrompt');
    localStorage.removeItem('cropArea');
  };

  // Clear 3D model data
  const clear3DData = () => {
    setModelFile(null);
    setVoxelizedModel(null);
    
    localStorage.removeItem('modelFile');
    localStorage.removeItem('voxelizedModel');
  };

  return (
    <ImageContext.Provider
      value={{
        // Mosaic states
        originalImage,
        setOriginalImage,
        croppedImage,
        setCroppedImage,
        pixelatedImage,
        setPixelatedImage,
        legoImage,
        setLegoImage,
        aiPrompt,
        setAiPrompt,
        cropArea,
        setCropArea,
        clearMosaicData,
        
        // 3D model states
        modelFile,
        setModelFile,
        voxelizedModel,
        setVoxelizedModel,
        clear3DData,
        
        // Color configuration
        colorConfig,
        setColorConfig,
        
        // 3D model color settings
        modelColor,
        setModelColor,
        supportColor,
        setSupportColor,
        
        // Recent projects
        recentProjects,
        saveProject,
        deleteProject
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}; 