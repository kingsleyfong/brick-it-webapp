import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import { generateImageFromAPI } from '../utils/apiService';
import ApiTester from '../components/ApiTester';

const MosaicStart = () => {
  const navigate = useNavigate();
  const { setOriginalImage, aiPrompt, setAiPrompt, clearMosaicData } = useImageContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [uploadMode, setUploadMode] = useState('upload'); // 'upload' or 'ai'
  const fileInputRef = useRef(null);
  const [generationStatus, setGenerationStatus] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isModelLoading, setIsModelLoading] = useState(false);
  // Add quality setting state
  const [qualitySetting, setQualitySetting] = useState('high'); // 'fast' or 'high'
  
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
  
  // Add debug mode state
  const [showApiTester, setShowApiTester] = useState(false);
  
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
      navigate('/image-preview');
    };
    reader.onerror = () => {
      setError('Error reading file');
    };
    reader.readAsDataURL(file);
  };

  // Handle AI image generation
  const handleGenerateImage = async () => {
    if (!aiPrompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    
    // Clear previous error and set status
    setError('');
    setIsGenerating(true);
    setGenerationStatus('Initializing image generation...');
    setGenerationProgress(15);
    
    try {
      // Generate a random seed for variety
      const seed = Math.floor(Math.random() * 2147483647);
      console.log(`Generating image with prompt: "${aiPrompt}", quality: ${qualitySetting}, seed: ${seed}`);
      
      // Update progress stages
      setGenerationStatus(`Sending request to Stable Diffusion model (${qualitySetting} quality)...`);
      setGenerationProgress(30);
      
      // Generate the image using our API service with quality setting
      const result = await generateImageFromAPI(aiPrompt, qualitySetting, seed);
      
      // Check for loading state (model is still warming up)
      if (!result.success && result.isLoading) {
        setIsModelLoading(true);
        setError('The AI model is currently warming up. Please try again in a few moments.');
        setIsGenerating(false);
        setGenerationStatus('');
        setGenerationProgress(0);
        return;
      }
      
      // Check for generation errors
      if (!result.success) {
        throw new Error(result.error || 'Failed to generate image');
      }
      
      // Set the generated image
      setOriginalImage(result.imageUrl);
      setIsGenerating(false);
      setGenerationStatus('Image generated successfully!');
      setGenerationProgress(100);
      
      // Navigate to the image preview page
      setTimeout(() => {
        navigate('/image-preview');
      }, 500);
      
    } catch (error) {
      console.error('Error generating image:', error);
      setError(`Unable to generate image: ${error.message}. Please try again with a different prompt.`);
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
    navigate('/image-preview');
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
      
      {/* Debug button - API Tester Toggle */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowApiTester(!showApiTester)}
          className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          {showApiTester ? 'Hide API Tester' : 'API Debug'}
        </button>
      </div>
      
      {/* API Tester Component */}
      {showApiTester && (
        <div className="mb-6">
          <ApiTester />
        </div>
      )}
      
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
            
            <div className="mt-4">
              <button
                className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={handleUseDefaultImage}
              >
                Use Default Image (Pikachu)
              </button>
              <p className="text-xs text-gray-600 mt-1 text-center">
                Don't have an image? Use our Pikachu sample image
              </p>
            </div>
          </div>
        )}
        
        {/* AI Generation UI */}
        {uploadMode === 'ai' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {isModelLoading && (
              <div className="mb-4 p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                <p className="text-sm font-medium">⚠️ AI Model is Warming Up</p>
                <p className="text-xs">The AI model is initializing. Your request will be processed shortly. Please try again in a few moments.</p>
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
            
            {/* Quality setting options */}
            <div className="mb-4">
              <p className="text-sm text-gray-800 mb-2">Quality Setting:</p>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="quality"
                    value="fast"
                    checked={qualitySetting === 'fast'}
                    onChange={() => setQualitySetting('fast')}
                    disabled={isGenerating}
                  />
                  <span className="ml-2 text-sm text-gray-700">Fast (lower quality)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="quality"
                    value="high"
                    checked={qualitySetting === 'high'}
                    onChange={() => setQualitySetting('high')}
                    disabled={isGenerating}
                  />
                  <span className="ml-2 text-sm text-gray-700">High quality (slower)</span>
                </label>
              </div>
            </div>
            
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
            {isGenerating && (
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
              Try to be specific in your prompt with details like colors, style, and objects. For example: "a blue lego castle with a red dragon" will give better results than just "castle".
            </p>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300 shadow-sm">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Error</span>
            </div>
            <p>{error}</p>
            <div className="mt-2 text-sm">
              <p>Suggestions:</p>
              <ul className="list-disc list-inside mt-1">
                <li>Try a simpler prompt</li>
                <li>Be more specific (color, shape, style)</li>
                <li>Wait a few moments if the model is loading</li>
                <li>Or upload an image instead</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MosaicStart; 