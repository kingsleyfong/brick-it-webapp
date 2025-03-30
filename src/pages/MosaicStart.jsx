import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import { generateImageFromPrompt, checkOnnxAvailability } from '../utils/imageGeneration';

const MosaicStart = () => {
  const navigate = useNavigate();
  const { setOriginalImage, aiPrompt, setAiPrompt, clearMosaicData } = useImageContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [uploadMode, setUploadMode] = useState('upload'); // 'upload' or 'ai'
  const fileInputRef = useRef(null);
  const [generationStatus, setGenerationStatus] = useState('');
  const [modelAvailability, setModelAvailability] = useState(null);
  
  // Example prompts for inspiration
  const examplePrompts = [
    "a cute cat wearing a hat",
    "sunset over mountains",
    "lego minifigure astronaut",
    "pixel art landscape"
  ];
  
  // Default example image
  const [usingDefaultImage, setUsingDefaultImage] = useState(false);
  
  // Check model availability when changing to AI mode
  useEffect(() => {
    if (uploadMode === 'ai') {
      checkModelAvailability();
    }
  }, [uploadMode]);
  
  // Check if the ONNX model is available
  const checkModelAvailability = async () => {
    try {
      const isOnnxAvailable = checkOnnxAvailability();
      setModelAvailability(isOnnxAvailable);
      
      // Check if model files exist
      try {
        const modelResponse = await fetch('/models/tiny-stable-diffusion.onnx');
        const vocabResponse = await fetch('/models/vocab.json');
        
        if (modelResponse.ok && vocabResponse.ok) {
          setModelAvailability('full');
        } else {
          setModelAvailability('fallback');
        }
      } catch (error) {
        setModelAvailability('fallback');
      }
    } catch (error) {
      setModelAvailability(false);
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
  const handleAIGeneration = async () => {
    if (!aiPrompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setError(null);
    setIsGenerating(true);
    setGenerationStatus('Initializing AI model...');
    
    try {
      // Check if ONNX would be available
      const isOnnxAvailable = checkOnnxAvailability();
      
      if (!isOnnxAvailable) {
        setError('Your browser may not support AI image generation. Please try on a desktop Chrome browser.');
        setIsGenerating(false);
        return;
      }
      
      // Update status
      setGenerationStatus('Processing your prompt...');
      
      // Generate image using our utility
      const generatedImageUrl = await generateImageFromPrompt(aiPrompt);
      
      // Update status
      setGenerationStatus('Finalizing image...');
      
      // Set the generated image and navigate to crop page
      setOriginalImage(generatedImageUrl);
      setIsGenerating(false);
      navigate('/crop');
    } catch (error) {
      setError('Error generating image: ' + error.message);
      setIsGenerating(false);
      setGenerationStatus('');
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
                <p className="text-sm font-medium">✅ Full AI model available</p>
                <p className="text-xs">Your browser will use the installed ONNX model for high-quality generation.</p>
              </div>
            )}
            
            {modelAvailability === 'fallback' && (
              <div className="mb-4 p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                <p className="text-sm font-medium">ℹ️ Using fallback generator</p>
                <p className="text-xs">The full AI model is not installed. A simple placeholder generator will be used instead.</p>
              </div>
            )}
            
            {modelAvailability === false && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg">
                <p className="text-sm font-medium">⚠️ AI generation may not work</p>
                <p className="text-xs">Your browser might not support WebAssembly, which is required for AI image generation.</p>
              </div>
            )}
            
            <p className="text-gray-800 mb-2">
              Enter a description of the image you'd like to create:
            </p>
            <textarea
              className="w-full p-3 border rounded-lg mb-3 h-24"
              placeholder="e.g., A cute cat wearing a hat"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={isGenerating}
            />
            
            {/* Example prompts */}
            <div className="mb-4">
              <p className="text-sm text-gray-800 mb-2">Try an example prompt:</p>
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
              onClick={handleAIGeneration}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Image'}
            </button>
            
            {/* Generation status */}
            {isGenerating && generationStatus && (
              <div className="mt-3 text-center">
                <div className="animate-pulse">
                  <p className="text-sm text-blue-600">{generationStatus}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-blue-600 h-1.5 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '50%' }}></div>
                </div>
              </div>
            )}
            
            <p className="text-sm text-gray-700 mt-3">
              The image generation runs entirely in your browser and may take a few moments.
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