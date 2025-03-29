import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';

const MosaicStart = () => {
  const navigate = useNavigate();
  const { setOriginalImage, aiPrompt, setAiPrompt, clearMosaicData } = useImageContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [uploadMode, setUploadMode] = useState('upload'); // 'upload' or 'ai'
  const fileInputRef = useRef(null);
  
  // Default example image
  const [usingDefaultImage, setUsingDefaultImage] = useState(false);
  
  // Load default image on first render
  useEffect(() => {
    const loadDefaultImage = async () => {
      try {
        // In a real implementation, you would load the actual pikachu.png file
        // For now, we'll just set a placeholder URL
        const defaultImagePath = '/pikachu.png';
        setUsingDefaultImage(true);
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
    
    try {
      // In the real implementation, this is where we would call
      // the ONNX model to generate an image from the prompt
      // For now, we'll just simulate it with a timeout
      
      setTimeout(() => {
        // This would be replaced with actual image generation
        // For now, we'll use a placeholder
        const placeholderImageURL = 'https://via.placeholder.com/512';
        setOriginalImage(placeholderImageURL);
        setIsGenerating(false);
        navigate('/crop');
      }, 2000);
    } catch (error) {
      setError('Error generating image: ' + error.message);
      setIsGenerating(false);
    }
  };

  // Handle use of default image
  const handleUseDefaultImage = () => {
    // In real implementation, you would use the actual loaded default image
    // For now, we'll use a placeholder
    const placeholderImageURL = 'https://via.placeholder.com/512';
    setOriginalImage(placeholderImageURL);
    navigate('/crop');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        LEGO Mosaic Creator
      </h1>
      
      <div className="max-w-lg mx-auto">
        {/* Mode Selection Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-3 ${uploadMode === 'upload' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
            onClick={() => setUploadMode('upload')}
          >
            Upload Image
          </button>
          <button
            className={`flex-1 py-3 ${uploadMode === 'ai' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
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
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M24 8l-4 4h-8v24h32v-24h-8l-4-4h-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 32l8-8 4 4 8-8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Click to select an image, or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
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
            <p className="text-gray-700 mb-4">
              Enter a description of the image you'd like to create:
            </p>
            <textarea
              className="w-full p-3 border rounded-lg mb-4 h-24"
              placeholder="e.g., A cute cat wearing a hat"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={isGenerating}
            />
            
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
            
            <p className="text-sm text-gray-500 mt-3">
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