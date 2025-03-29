import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { useImageContext } from '../context/ImageContext';

const CropImage = () => {
  const navigate = useNavigate();
  const { originalImage, setCroppedImage, setCropArea } = useImageContext();
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  // Redirect if no image is available
  useEffect(() => {
    if (!originalImage) {
      navigate('/mosaic');
    }
  }, [originalImage, navigate]);
  
  // Handle crop complete
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  
  // Create a cropped image from the selected area
  const createCroppedImage = useCallback(async () => {
    try {
      const image = new Image();
      image.src = originalImage;
      
      await new Promise((resolve) => {
        image.onload = resolve;
      });
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions to the cropped size
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      
      // Draw the cropped image onto the canvas
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      
      // Convert canvas to data URL
      const croppedImageDataUrl = canvas.toDataURL('image/png');
      setCroppedImage(croppedImageDataUrl);
      setCropArea(croppedAreaPixels);
      
      // Navigate to the next step
      navigate('/mosaic-generator');
    } catch (error) {
      console.error('Error creating cropped image:', error);
    }
  }, [originalImage, croppedAreaPixels, setCroppedImage, setCropArea, navigate]);
  
  return (
    <div className="flex flex-col h-screen">
      {/* Top section with instructions */}
      <div className="bg-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-2">Crop Your Image</h1>
          <p className="text-gray-600 mb-4">
            Ensure your image is cropped to a square for the best results. The selected area will be converted to a 16x16 LEGO mosaic.
          </p>
          
          <div className="flex justify-between items-center">
            <button
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              onClick={() => navigate('/mosaic')}
            >
              Back
            </button>
            
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={createCroppedImage}
              disabled={!croppedAreaPixels}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom section with cropper */}
      <div className="relative flex-grow">
        {originalImage && (
          <Cropper
            image={originalImage}
            crop={crop}
            zoom={zoom}
            aspect={1} // Force square aspect ratio
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            }}
          />
        )}
        
        {/* Zoom control */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-2 flex items-center">
          <span className="text-gray-500">Zoom:</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="mx-2 w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default CropImage; 