import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';

const MosaicGenerator = () => {
  const navigate = useNavigate();
  const { croppedImage, setPixelatedImage, setLegoImage, colorConfig } = useImageContext();
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  
  // Grid size for the LEGO mosaic
  const gridSize = 16;
  
  // Redirect if no cropped image
  useEffect(() => {
    if (!croppedImage) {
      navigate('/mosaic');
    }
  }, [croppedImage, navigate]);
  
  // Find the closest LEGO color for a pixel
  const findClosestLegoColor = useCallback((r, g, b) => {
    let minDistance = Infinity;
    let closestColor = null;
    let closestColorName = null;
    
    Object.entries(colorConfig).forEach(([colorName, colorData]) => {
      const [lr, lg, lb] = colorData.rgb;
      
      // Calculate Euclidean distance in RGB space
      const distance = Math.sqrt(
        Math.pow(r - lr, 2) + Math.pow(g - lg, 2) + Math.pow(b - lb, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = colorData.rgb;
        closestColorName = colorName;
      }
    });
    
    return { rgb: closestColor, name: closestColorName };
  }, [colorConfig]);
  
  // Process the image to create LEGO mosaic
  useEffect(() => {
    const processImage = async () => {
      if (!croppedImage) return;
      
      try {
        setIsProcessing(true);
        setProgress(10);
        
        // Load the cropped image
        const image = new Image();
        image.src = croppedImage;
        
        await new Promise((resolve) => {
          image.onload = resolve;
        });
        
        setProgress(30);
        
        // Create a canvas for downscaling
        const canvas = document.createElement('canvas');
        canvas.width = gridSize;
        canvas.height = gridSize;
        const ctx = canvas.getContext('2d');
        
        // Draw the image downscaled to our grid size
        ctx.drawImage(image, 0, 0, gridSize, gridSize);
        
        // Get the pixel data
        const pixelData = ctx.getImageData(0, 0, gridSize, gridSize);
        const { data } = pixelData;
        
        setProgress(50);
        
        // Create a canvas for the pixelated preview
        const pixelatedCanvas = document.createElement('canvas');
        pixelatedCanvas.width = gridSize * 16; // Scale up for preview
        pixelatedCanvas.height = gridSize * 16;
        const pixelatedCtx = pixelatedCanvas.getContext('2d');
        
        // Create a canvas for the LEGO version
        const legoCanvas = document.createElement('canvas');
        legoCanvas.width = gridSize * 16;
        legoCanvas.height = gridSize * 16;
        const legoCtx = legoCanvas.getContext('2d');
        
        setProgress(70);
        
        // Process each pixel
        for (let y = 0; y < gridSize; y++) {
          for (let x = 0; x < gridSize; x++) {
            const i = (y * gridSize + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Draw pixel in pixelated view
            pixelatedCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            pixelatedCtx.fillRect(x * 16, y * 16, 16, 16);
            
            // Find closest LEGO color
            const closestColor = findClosestLegoColor(r, g, b);
            const [lr, lg, lb] = closestColor.rgb;
            
            // Draw pixel in LEGO view
            legoCtx.fillStyle = `rgb(${lr}, ${lg}, ${lb})`;
            legoCtx.fillRect(x * 16, y * 16, 16, 16);
            
            // Draw LEGO stud
            legoCtx.beginPath();
            legoCtx.arc(x * 16 + 8, y * 16 + 8, 4, 0, Math.PI * 2);
            legoCtx.fillStyle = `rgba(255, 255, 255, 0.3)`;
            legoCtx.fill();
            legoCtx.strokeStyle = `rgba(0, 0, 0, 0.2)`;
            legoCtx.lineWidth = 1;
            legoCtx.stroke();
          }
        }
        
        setProgress(90);
        
        // Convert to data URLs
        const pixelatedImageDataUrl = pixelatedCanvas.toDataURL('image/png');
        const legoImageDataUrl = legoCanvas.toDataURL('image/png');
        
        setPixelatedImage(pixelatedImageDataUrl);
        setLegoImage(legoImageDataUrl);
        
        setProgress(100);
        setIsProcessing(false);
        
        // Navigate to preview
        navigate('/preview');
      } catch (error) {
        console.error('Error processing image:', error);
        setError('Error processing image: ' + error.message);
        setIsProcessing(false);
      }
    };
    
    processImage();
  }, [croppedImage, gridSize, findClosestLegoColor, setPixelatedImage, setLegoImage, navigate]);
  
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Creating Your LEGO Mosaic
      </h1>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {isProcessing ? (
          <>
            <p className="text-center text-gray-700 mb-4">
              Please wait while we process your image...
            </p>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <p className="text-center text-sm text-gray-500">
              Converting your image to a 16x16 LEGO mosaic
            </p>
          </>
        ) : error ? (
          <>
            <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg mb-4">
              {error}
            </div>
            
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => navigate('/mosaic')}
            >
              Start Over
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MosaicGenerator; 