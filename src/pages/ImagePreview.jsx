import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import { generateImageFromAPI } from '../utils/apiService';
import ApiTester from '../components/ApiTester';
import ApiDebugger from '../components/ApiDebugger';

const ImagePreview = () => {
  const navigate = useNavigate();
  const { originalImage, setOriginalImage, aiPrompt } = useImageContext();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [error, setError] = useState(null);
  const [regenerationCount, setRegenerationCount] = useState(0);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [qualitySetting, setQualitySetting] = useState('high'); // 'fast' or 'high'
  const [lastUsedSeed, setLastUsedSeed] = useState(null);
  const [showApiTester, setShowApiTester] = useState(false);
  
  // Check if we have an image to display
  useEffect(() => {
    // If no image is available, redirect to the mosaic start page
    if (!originalImage) {
      navigate('/mosaic');
    }
  }, [originalImage, navigate]);
  
  // Function to handle image regeneration
  const handleRegenerateImage = async () => {
    if (!aiPrompt) {
      navigate('/mosaic');
      return;
    }
    
    setIsRegenerating(true);
    setGenerationStatus('Preparing to regenerate image...');
    setGenerationProgress(10);
    setError(null);
    setIsModelLoading(false);
    
    // Track regeneration attempts
    const newRegenerationCount = regenerationCount + 1;
    setRegenerationCount(newRegenerationCount);
    
    try {
      // Generate a random seed for variety
      const seed = Math.floor(Math.random() * 2147483647);
      setLastUsedSeed(seed);
      
      // Update progress
      setGenerationStatus(`Sending request to Stable Diffusion model (${qualitySetting} quality)...`);
      setGenerationProgress(30);
      
      console.log(`Regenerating image with prompt: "${aiPrompt}", quality: ${qualitySetting}, seed: ${seed}`);
      
      // Generate new image with the API service
      const result = await generateImageFromAPI(aiPrompt, qualitySetting, seed);
      
      // Check for loading state (model is still warming up)
      if (!result.success && result.isLoading) {
        setIsModelLoading(true);
        setError('The AI model is currently warming up. Please try again in a few moments.');
        setIsRegenerating(false);
        setGenerationStatus('');
        setGenerationProgress(0);
        return;
      }
      
      // Check for errors
      if (!result.success) {
        throw new Error(result.error || 'Failed to generate image');
      }
      
      // Update the image
      setOriginalImage(result.imageUrl);
      setIsRegenerating(false);
      setGenerationStatus('Image regenerated successfully!');
      setGenerationProgress(100);
      
    } catch (error) {
      console.error('Error regenerating image:', error);
      setError(`Unable to regenerate image: ${error.message}. Please try again with a different prompt.`);
      setGenerationStatus('Failed to regenerate image');
      setIsRegenerating(false);
      setGenerationProgress(0);
    }
  };
  
  // Function to proceed to crop page
  const handleProceedToCrop = () => {
    navigate('/crop');
  };
  
  // Function to go back to the mosaic start page
  const handleGoBack = () => {
    navigate('/mosaic');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Debug button - API Tester Toggle */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowApiTester(!showApiTester)}
          className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          {showApiTester ? 'Hide API Debug' : 'API Debug'}
        </button>
      </div>
      
      {/* API Debugging Components */}
      {showApiTester && (
        <div className="mb-6">
          <ApiDebugger />
          <ApiTester />
        </div>
      )}
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Image Preview
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600 mb-6">
            This is the image that will be converted to a LEGO mosaic. You can regenerate it or proceed to crop it.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Display the original prompt */}
            <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500">
              <h3 className="font-medium text-blue-800">Your Prompt:</h3>
              <p className="text-blue-700">{aiPrompt}</p>
            </div>
            
            {/* Model loading warning */}
            {isModelLoading && (
              <div className="mb-4 p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                <p className="text-sm font-medium">⚠️ AI Model is Warming Up</p>
                <p className="text-xs">The AI model is initializing. Your request will be processed shortly. Please try again in a few moments.</p>
              </div>
            )}
            
            {/* Quality setting options */}
            <div className="mb-4">
              <p className="text-sm text-gray-800 mb-2">Quality Setting for Regeneration:</p>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="quality"
                    value="fast"
                    checked={qualitySetting === 'fast'}
                    onChange={() => setQualitySetting('fast')}
                    disabled={isRegenerating}
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
                    disabled={isRegenerating}
                  />
                  <span className="ml-2 text-sm text-gray-700">High quality (slower)</span>
                </label>
              </div>
            </div>
            
            {/* Display the AI-generated image */}
            <div className="flex justify-center mb-6">
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-300">
                {originalImage && (
                  <img 
                    src={originalImage} 
                    alt="AI Generated" 
                    className="max-w-full h-auto" 
                    style={{ maxHeight: '70vh' }}
                  />
                )}
                
                {/* Overlay for regenerating */}
                {isRegenerating && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center px-4">
                    <p className="text-white text-lg mb-3">{generationStatus}</p>
                    <div className="w-3/4 bg-gray-700 rounded-full h-2.5 mb-3">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-white text-sm">Please wait, this may take a moment...</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Display any errors */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                <h3 className="font-medium">Error:</h3>
                <p>{error}</p>
                {regenerationCount > 1 && (
                  <p className="text-xs mt-1">
                    Having trouble? Try changing to "Fast" quality setting or uploading your own image instead.
                  </p>
                )}
              </div>
            )}
            
            {/* Display seed information if available */}
            {lastUsedSeed && (
              <div className="mb-4 p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
                <p>Image seed: {lastUsedSeed} (Each regeneration uses a different random seed for variety)</p>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleGoBack}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                disabled={isRegenerating}
              >
                Back to Prompts
              </button>
              
              <button
                onClick={handleRegenerateImage}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex-grow sm:flex-grow-0"
                disabled={isRegenerating}
              >
                {isRegenerating ? 'Regenerating...' : 'Regenerate Image'}
              </button>
              
              <button
                onClick={handleProceedToCrop}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex-grow"
                disabled={isRegenerating}
              >
                Continue to Crop & Create LEGO Mosaic
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Tip: Each regeneration creates a unique image with the same prompt.
              Try adjusting your prompt to be more specific for better results or change the quality setting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview; 