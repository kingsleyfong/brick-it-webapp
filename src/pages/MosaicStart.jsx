import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import { generateImageFromPrompt, isTransformersAvailable, checkWebAssemblySupport } from '../utils/imageGeneration';
import { getAvailableModels } from '../utils/modelCache';

const MosaicStart = () => {
  const navigate = useNavigate();
  const { setOriginalImage, aiPrompt, setAiPrompt, clearMosaicData } = useImageContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [uploadMode, setUploadMode] = useState('upload'); // 'upload' or 'ai'
  const fileInputRef = useRef(null);
  const [generationStatus, setGenerationStatus] = useState('');
  const [modelAvailability, setModelAvailability] = useState(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  // Example prompts for inspiration
  const examplePrompts = [
    "a cute cat wearing a hat",
    "sunset over mountains",
    "lego minifigure astronaut",
    "pixel art landscape",
    "lego castle on a hill",
    "lego spaceship"
  ];
  
  // Default example image
  const [usingDefaultImage, setUsingDefaultImage] = useState(false);
  
  // Check model availability when changing to AI mode
  useEffect(() => {
    if (uploadMode === 'ai') {
      checkModelAvailability();
    }
  }, [uploadMode]);
  
  // Check if we can generate images using Canvas API (which is always available in modern browsers)
  const checkModelAvailability = async () => {
    try {
      console.log("Checking canvas availability for image generation");
      // Check if Canvas API is available (it always is in modern browsers)
      const canvasAvailable = !!document.createElement('canvas').getContext('2d');
      console.log("Canvas availability:", canvasAvailable);
      
      // Set canvas availability as full model availability since we don't need WebAssembly anymore
      if (canvasAvailable) {
        setModelAvailability('full');
      } else {
        // This should never happen in modern browsers
        setModelAvailability('fallback');
      }
    } catch (error) {
      console.error('Error checking model availability:', error);
      setModelAvailability('fallback');
    }
  };
  
  // Load default image on first render
  useEffect(() => {
    const loadDefaultImage = async () => {
      try {
        // Load the pikachu.png from the public folder
        const defaultImagePath = '/pikachu.png';
        const response = await fetch(defaultImagePath);
        
        if (response.ok) {
          setUsingDefaultImage(true);
          console.log('Default image loaded successfully');
        } else {
          console.error('Failed to load default image:', response.statusText);
        }
      } catch (error) {
        console.error('Error loading default image:', error);
      }
    };
    
    loadDefaultImage();
    
    // Remove any browser warning banners
    const removeWarningBanners = () => {
      // Check if we're in Chrome or other modern browser which should be supported
      const isModernBrowser = /Chrome/.test(navigator.userAgent) || 
                             /Firefox/.test(navigator.userAgent) || 
                             /Safari/.test(navigator.userAgent);
                           
      if (isModernBrowser) {
        // Look for fixed position elements that might be warning banners
        const possibleBanners = document.querySelectorAll('div[style*="fixed"][style*="bottom"]');
        possibleBanners.forEach(banner => {
          const computedStyle = window.getComputedStyle(banner);
          const bgColor = computedStyle.backgroundColor;
          const textColor = computedStyle.color;
          
          // Check if it's likely to be a warning banner (has red background or text)
          if (bgColor.includes('rgb(255, 204, 203)') || 
              bgColor.includes('rgb(254, 226, 226)') || 
              textColor.includes('rgb(185, 28, 28)') || 
              banner.textContent.includes('browser may not support') ||
              banner.textContent.includes('Chrome browser')) {
            banner.style.display = 'none';
          }
        });
      }
    };
    
    // Remove banners on load and after a short delay (in case they're added dynamically)
    removeWarningBanners();
    const timeoutId = setTimeout(removeWarningBanners, 1000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUsingDefaultImage(false);
    setError(null);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target.result);
      navigate('/crop');
    };
    reader.onerror = () => {
      setError('Error reading file');
    };
    reader.readAsDataURL(file);
  };

  // Handle AI image generation
  const handleGenerateImage = async () => {
    if (!aiPrompt) {
      setError('Please enter a description for your image.');
      return;
    }
    
    setOriginalImage(null);
    setGenerationStatus('Initializing...');
    setIsGenerating(true);
    setError(null);
    setGenerationProgress(10);
    
    try {
      // Check if the prompt contains astronaut-related terms
      const hasAstronautTerms = /astronaut|space suit|spaceman|nasa/i.test(aiPrompt);
      
      // Status update callback to display progress
      const updateStatus = (message) => {
        setGenerationStatus(message);
        
        // Try to extract percentage if it exists
        const percentMatch = message.match(/(\d+)%/);
        if (percentMatch && percentMatch[1]) {
          setGenerationProgress(parseInt(percentMatch[1]));
        } else if (message === 'Generating your image...') {
          setGenerationProgress(70); // Arbitrary progress for generation step
        } else if (message === 'Initializing AI model...') {
          setGenerationProgress(40);
        } else if (message === 'Finalizing image...') {
          setGenerationProgress(90);
        }
      };
      
      // Get available models
      const models = await getAvailableModels().catch(() => null);
      const defaultModel = models?.models?.default || null;
      
      // Choose the most appropriate model based on the prompt
      let modelToUse = defaultModel;
      let inferenceMode = 'normal';
      
      // If astronaut in prompt, prioritize the specialized model if available
      if (hasAstronautTerms && models?.models?.lego) {
        modelToUse = models.models.lego;
        console.log('Using specialized LEGO model for astronaut');
      }
      
      // If the prompt mentions "fast" or "quick", use fast inference mode
      if (/\bfast\b|\bquick\b/i.test(aiPrompt)) {
        inferenceMode = 'fast';
      }
      
      console.log(`Using model: ${modelToUse}, mode: ${inferenceMode}`);
      
      // Generate the image using our improved function
      const generatedImageUrl = await generateImageFromPrompt(
        aiPrompt, 
        modelToUse, 
        inferenceMode,
        updateStatus
      );
      
      if (!generatedImageUrl) {
        throw new Error('Failed to generate image');
      }
      
      setOriginalImage(generatedImageUrl);
      setIsGenerating(false);
      setGenerationStatus('');
      setGenerationProgress(100);
      
      // Navigate to the crop page after a short delay
      setTimeout(() => {
        navigate('/crop');
      }, 500);
      
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Error generating image: ' + (error.message || 'Unknown error'));
      setIsGenerating(false);
      setGenerationStatus('');
      setGenerationProgress(0);
    }
  };

  // Handle use of default image
  const handleUseDefaultImage = () => {
    // Load the pikachu.png from the public folder
    const defaultImagePath = '/pikachu.png';
    setOriginalImage(defaultImagePath);
    navigate('/crop');
  };
  
  // Handle example prompt selection
  const useExamplePrompt = (prompt) => {
    setAiPrompt(prompt);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        LEGO Mosaic Creator
      </h1>
      
      <div className="max-w-lg mx-auto">
        {/* Mode Selection Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-3 ${uploadMode === 'upload' ? 'bg-blue-600 text-white' : 'text-gray-800'}`}
            onClick={() => setUploadMode('upload')}
          >
            Upload Image
          </button>
          <button
            className={`flex-1 py-3 ${uploadMode === 'ai' ? 'bg-blue-600 text-white' : 'text-gray-800'}`}
            onClick={() => setUploadMode('ai')}
          >
            Generate with AI
          </button>
        </div>
        
        {/* Upload Image UI */}
        {uploadMode === 'upload' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => fileInputRef.current.click()}
            >
              <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M24 8l-4 4h-8v24h32v-24h-8l-4-4h-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 32l8-8 4 4 8-8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-800">Click to select an image, or drag and drop</p>
              <p className="text-xs text-gray-700 mt-1">PNG, JPG, GIF up to 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
            
            {usingDefaultImage && (
              <div className="mt-4">
                <button
                  className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  onClick={handleUseDefaultImage}
                >
                  Use Default Image (Pikachu)
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* AI Generation UI */}
        {uploadMode === 'ai' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {modelAvailability === 'full' && (
              <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-lg">
                <p className="text-sm font-medium">✅ LEGO image generation available</p>
                <p className="text-xs">Your browser will generate high-quality LEGO images based on your prompts.</p>
              </div>
            )}
            
            {modelAvailability === 'fallback' && (
              <div className="mb-4 p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                <p className="text-sm font-medium">ℹ️ Using basic image generator</p>
                <p className="text-xs">A simplified image generator will be used due to browser compatibility limitations.</p>
              </div>
            )}
            
            <p className="text-gray-800 mb-2">
              Enter a description of the LEGO image you'd like to create:
            </p>
            <textarea
              className="w-full p-3 border rounded-lg mb-3 h-24 text-gray-900"
              placeholder="e.g., lego minifigure astronaut"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={isGenerating}
            />
            
            {/* Example prompts */}
            <div className="mb-4">
              <p className="text-sm text-gray-800 mb-2">Try one of these prompts:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => useExamplePrompt(prompt)}
                    className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    disabled={isGenerating}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              className={`w-full py-3 rounded-lg ${
                isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              onClick={handleGenerateImage}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate LEGO Image'}
            </button>
            
            {/* Generation status */}
            {isGenerating && generationStatus && (
              <div className="mt-3 text-center">
                <div className="animate-pulse">
                  <p className="text-sm text-blue-600">{generationStatus}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <p className="text-sm text-gray-700 mt-3">
              Try including specific LEGO elements in your prompt, like "astronaut", "pirate", "ninja", or "castle".
            </p>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MosaicStart; 