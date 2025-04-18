import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MosaicHome() {
  const [imageFile, setImageFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleContinueToCrop = () => {
    if (!imageFile) {
      alert('Please upload an image before continuing.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      navigate('/crop', {
        state: {
          imageSrc: reader.result,
        },
      });
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h2 className="text-2xl font-semibold">Start Your Mosaic</h2>

      <input
        type="text"
        placeholder="Enter AI prompt (optional)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border p-2 w-full max-w-md"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 w-full max-w-md"
      />

      <button
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded"
        onClick={handleContinueToCrop}
      >
        Continue to Crop
      </button>

      {imageFile && (
        <div className="mt-4 text-sm text-gray-600">
          Selected: <strong>{imageFile.name}</strong>
        </div>
      )}
    </div>
  );
}
