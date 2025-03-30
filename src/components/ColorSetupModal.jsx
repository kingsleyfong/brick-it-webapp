import { useState, useEffect } from 'react';
import { useImageContext } from '../context/ImageContext';

const ColorSetupModal = ({ onClose }) => {
  const { colorConfig, setColorConfig } = useImageContext();
  const [localColorConfig, setLocalColorConfig] = useState({ ...colorConfig });
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  // Update a color in the local state
  const updateColor = (colorName, field, value) => {
    setLocalColorConfig(prevConfig => ({
      ...prevConfig,
      [colorName]: {
        ...prevConfig[colorName],
        [field]: value
      }
    }));
  };
  
  // Save the color configuration
  const saveConfig = () => {
    setColorConfig(localColorConfig);
    onClose();
  };
  
  // Convert RGB array to hex string
  const rgbToHex = ([r, g, b]) => {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  
  // Convert hex string to RGB array
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">LEGO Color Setup</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        
        <p className="mb-4 text-gray-800">
          Configure the colors for each dispenser in your LEGO machine.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.entries(localColorConfig).map(([colorName, colorData]) => (
            <div 
              key={colorName}
              className="border rounded-lg p-4 flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 rounded-full border" 
                  style={{ backgroundColor: rgbToHex(colorData.rgb) }}
                />
                <h3 className="font-medium text-gray-800">
                  {colorName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
              </div>
              
              <div>
                <label className="block text-sm text-gray-800 mb-1">
                  Color (HEX)
                </label>
                <input
                  type="color"
                  value={rgbToHex(colorData.rgb)}
                  onChange={(e) => updateColor(colorName, 'rgb', hexToRgb(e.target.value))}
                  className="w-full rounded border p-1 h-10"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-800 mb-1">
                  Dispenser Number
                </label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={colorData.dispenser}
                  onChange={(e) => updateColor(colorName, 'dispenser', parseInt(e.target.value))}
                  className="w-full rounded border p-2 bg-white text-gray-800"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={saveConfig}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSetupModal; 