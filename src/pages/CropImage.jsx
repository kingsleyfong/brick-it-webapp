import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImageToCanvas';

export default function CropImage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const url = URL.createObjectURL(croppedImageBlob);
      console.log('Cropped image ready at:', url);
      // You’ll eventually save this blob or display preview
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Crop Your Image</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {imageSrc && (
        <div className="relative w-80 h-80 bg-gray-100 rounded overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      <button
        onClick={showCroppedImage}
        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
      >
        Confirm Crop
      </button>
    </div>
  );
}
