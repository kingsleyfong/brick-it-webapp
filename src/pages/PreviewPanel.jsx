import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';

const PreviewPanel = () => {
  const navigate = useNavigate();
  const { legoImage, pixelatedImage, colorConfig, originalImage, croppedImage, setOriginalImage, setCroppedImage, saveProject } = useImageContext();
  
  const fileInputRef = useRef(null);
  const [showGrid, setShowGrid] = useState(true);
  const [fileName, setFileName] = useState('');
  const [exportError, setExportError] = useState(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [colorCounts, setColorCounts] = useState({});
  
  // Initialize filename with current date/time
  useEffect(() => {
    const now = new Date();
    const formattedDate = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    setFileName(formattedDate);
  }, []);
  
  // Redirect if no LEGO image
  useEffect(() => {
    if (!legoImage) {
      navigate('/mosaic');
    }
  }, [legoImage, navigate]);
  
  // Generate color counts from the image
  useEffect(() => {
    if (!pixelatedImage) return;
    
    const countColors = async () => {
      try {
        // Load the pixelated image
        const image = new Image();
        image.src = pixelatedImage;
        
        await new Promise((resolve) => {
          image.onload = resolve;
        });
        
        // Create a canvas
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        
        // Draw the image at original size
        ctx.drawImage(image, 0, 0, 16, 16);
        
        // Get the pixel data
        const pixelData = ctx.getImageData(0, 0, 16, 16);
        const { data } = pixelData;
        
        // Count colors
        const counts = {};
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Find closest LEGO color
          let minDistance = Infinity;
          let closestColorName = null;
          
          Object.entries(colorConfig).forEach(([colorName, colorData]) => {
            const [lr, lg, lb] = colorData.rgb;
            
            // Calculate Euclidean distance in RGB space
            const distance = Math.sqrt(
              Math.pow(r - lr, 2) + Math.pow(g - lg, 2) + Math.pow(b - lb, 2)
            );
            
            if (distance < minDistance) {
              minDistance = distance;
              closestColorName = colorName;
            }
          });
          
          if (closestColorName) {
            counts[closestColorName] = (counts[closestColorName] || 0) + 1;
          }
        }
        
        setColorCounts(counts);
      } catch (error) {
        console.error('Error counting colors:', error);
      }
    };
    
    countColors();
  }, [pixelatedImage, colorConfig]);
  
  // Export as PNG
  const exportAsPNG = useCallback(() => {
    try {
      // Create a download link
      const link = document.createElement('a');
      link.href = legoImage;
      link.download = `${fileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Error exporting PNG:', error);
      setExportError('Error exporting PNG: ' + error.message);
    }
  }, [legoImage, fileName]);
  
  // Export as TXT
  const exportAsTXT = useCallback(() => {
    // Validate filename
    if (!fileName.trim()) {
      setExportError('Please enter a file name.');
      setTimeout(() => setExportError(null), 5000);
      return;
    }
    
    // Replace invalid filename characters
    const sanitizedFileName = fileName
      .trim()
      .replace(/[\\/:*?"<>|]/g, '_'); // Replace invalid file characters
    
    // Ensure .txt is not already included
    const finalFileName = sanitizedFileName.endsWith('.txt') 
      ? sanitizedFileName.slice(0, -4) 
      : sanitizedFileName;
    
    try {
      // Generate high-quality thumbnail first
      const generateHighQualityThumbnail = () => {
        // Create a canvas that matches the aspect ratio of the LEGO image
        const img = new Image();
        img.src = legoImage;
        
        // Create a canvas for the thumbnail
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set thumbnail size (256x256 max)
        const maxSize = 256;
        const thumbnailWidth = maxSize;
        const thumbnailHeight = maxSize;
        
        canvas.width = thumbnailWidth;
        canvas.height = thumbnailHeight;
        
        // Draw a background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, thumbnailWidth, thumbnailHeight);
        
        // When image loads, draw it centered on the canvas
        return new Promise((resolve) => {
          img.onload = () => {
            // Calculate the scaling and positioning to center the image
            const scale = Math.min(
              thumbnailWidth / img.width,
              thumbnailHeight / img.height
            );
            
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;
            const offsetX = (thumbnailWidth - scaledWidth) / 2;
            const offsetY = (thumbnailHeight - scaledHeight) / 2;
            
            // Draw the image centered on the canvas
            ctx.drawImage(
              img,
              0, 0, img.width, img.height,
              offsetX, offsetY, scaledWidth, scaledHeight
            );
            
            // Draw a border
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 4;
            ctx.strokeRect(offsetX, offsetY, scaledWidth, scaledHeight);
            
            // Add a LEGO-style label at the bottom
            ctx.fillStyle = '#e00025';  // LEGO red
            ctx.fillRect(0, thumbnailHeight - 30, thumbnailWidth, 30);
            
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('BRICK IT MOSAIC', thumbnailWidth / 2, thumbnailHeight - 15);
            
            // Convert to data URL
            const thumbnailDataUrl = canvas.toDataURL('image/png', 0.9);
            resolve(thumbnailDataUrl);
          };
          
          // Handle load errors
          img.onerror = () => {
            // Fallback to the original image if there's an error
            resolve(legoImage);
          };
        });
      };
      
      // Generate the TXT content
      const generateTxtContent = () => {
        return new Promise((resolve, reject) => {
          try {
            let txtContent = '';
            
            // Create a canvas to read the LEGO image pixel data
            const image = new Image();
            image.src = legoImage;
            
            const canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;
            const ctx = canvas.getContext('2d');
            
            // Wait for image to load
            image.onload = () => {
              // Draw the image at original size
              ctx.drawImage(image, 0, 0, 16, 16);
              
              // Get the pixel data
              const pixelData = ctx.getImageData(0, 0, 16, 16);
              const { data } = pixelData;
              
              // Generate TXT content
              for (let y = 0; y < 16; y++) {
                for (let x = 0; x < 16; x++) {
                  const i = (y * 16 + x) * 4;
                  const r = data[i];
                  const g = data[i + 1];
                  const b = data[i + 2];
                  
                  // Find closest LEGO color
                  let minDistance = Infinity;
                  let closestColorDispenser = 0;
                  
                  Object.entries(colorConfig).forEach(([colorName, colorData]) => {
                    const [lr, lg, lb] = colorData.rgb;
                    
                    // Calculate Euclidean distance in RGB space
                    const distance = Math.sqrt(
                      Math.pow(r - lr, 2) + Math.pow(g - lg, 2) + Math.pow(b - lb, 2)
                    );
                    
                    if (distance < minDistance) {
                      minDistance = distance;
                      closestColorDispenser = colorData.dispenser;
                    }
                  });
                  
                  // Add to TXT content (x, y, z, color_index)
                  // z is always 1 for mosaic
                  txtContent += `${x + 1} ${y + 1} 1 ${closestColorDispenser}\n`;
                }
              }
              
              resolve(txtContent);
            };
            
            // Handle load errors
            image.onerror = () => {
              reject(new Error('Failed to load the LEGO image'));
            };
          } catch (error) {
            reject(error);
          }
        });
      };
      
      // Execute both operations in parallel
      Promise.all([generateHighQualityThumbnail(), generateTxtContent()])
        .then(([thumbnailDataUrl, txtContent]) => {
          // Add -1 at the end of the TXT content for LEGO EV3 printer
          txtContent = txtContent + '-1';
          
          // Create a download link for the TXT file
          const blob = new Blob([txtContent], { type: 'text/plain' });
          const downloadUrl = URL.createObjectURL(blob);
          
          // Trigger download
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `${finalFileName}.txt`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the URL object
          URL.revokeObjectURL(downloadUrl);
          
          // Save to recent projects with the high-quality thumbnail
          saveProject(finalFileName, 'mosaic', thumbnailDataUrl);
          
          setExportSuccess(true);
          setTimeout(() => setExportSuccess(false), 5000);
        })
        .catch(error => {
          console.error('Error exporting TXT:', error);
          setExportError('Error exporting TXT: ' + error.message);
          setTimeout(() => setExportError(null), 7000);
        });
    } catch (error) {
      console.error('Error in exportAsTXT:', error);
      setExportError('Error exporting TXT: ' + error.message);
      setTimeout(() => setExportError(null), 7000);
    }
  }, [legoImage, fileName, colorConfig, saveProject]);
  
  // Export as JSON project
  const exportAsJSON = useCallback(() => {
    try {
      // Generate high-quality thumbnail
      const generateHighQualityThumbnail = () => {
        // Create a canvas that matches the aspect ratio of the LEGO image
        const img = new Image();
        img.src = legoImage;
        
        // Create a canvas for the thumbnail
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set thumbnail size (256x256 max)
        const maxSize = 256;
        const thumbnailWidth = maxSize;
        const thumbnailHeight = maxSize;
        
        canvas.width = thumbnailWidth;
        canvas.height = thumbnailHeight;
        
        // Draw a background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, thumbnailWidth, thumbnailHeight);
        
        // When image loads, draw it centered on the canvas
        return new Promise((resolve) => {
          img.onload = () => {
            // Calculate the scaling and positioning to center the image
            const scale = Math.min(
              thumbnailWidth / img.width,
              thumbnailHeight / img.height
            );
            
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;
            const offsetX = (thumbnailWidth - scaledWidth) / 2;
            const offsetY = (thumbnailHeight - scaledHeight) / 2;
            
            // Draw the image centered on the canvas
            ctx.drawImage(
              img,
              0, 0, img.width, img.height,
              offsetX, offsetY, scaledWidth, scaledHeight
            );
            
            // Draw a border
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 4;
            ctx.strokeRect(offsetX, offsetY, scaledWidth, scaledHeight);
            
            // Add a LEGO-style label at the bottom
            ctx.fillStyle = '#e00025';  // LEGO red
            ctx.fillRect(0, thumbnailHeight - 30, thumbnailWidth, 30);
            
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('BRICK IT MOSAIC', thumbnailWidth / 2, thumbnailHeight - 15);
            
            // Convert to data URL
            const thumbnailDataUrl = canvas.toDataURL('image/png', 0.9);
            resolve(thumbnailDataUrl);
          };
          
          // Handle load errors
          img.onerror = () => {
            // Fallback to the original image if there's an error
            resolve(legoImage);
          };
        });
      };
      
      // Generate the thumbnail and then export
      generateHighQualityThumbnail().then(thumbnailDataUrl => {
        const projectData = {
          originalImage,
          croppedImage,
          pixelatedImage,
          legoImage,
          colorConfig,
          version: "1.0", // For future compatibility
          dateCreated: new Date().toISOString()
        };
        
        // Create a download link
        const blob = new Blob([JSON.stringify(projectData)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Save to recent projects with the high-quality thumbnail
        saveProject(fileName, 'mosaic', thumbnailDataUrl);
        
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
      }).catch(error => {
        console.error('Error generating thumbnail:', error);
        setExportError('Error generating thumbnail: ' + error.message);
      });
    } catch (error) {
      console.error('Error exporting JSON:', error);
      setExportError('Error exporting JSON: ' + error.message);
    }
  }, [originalImage, croppedImage, pixelatedImage, legoImage, colorConfig, fileName, saveProject]);
  
  // Import JSON project
  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setExportError(null);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const projectData = JSON.parse(event.target.result);
        
        // Validate project data
        if (!projectData.originalImage || !projectData.croppedImage || !projectData.legoImage) {
          throw new Error('Invalid project file format');
        }
        
        // Load the images into the context
        setOriginalImage(projectData.originalImage);
        setCroppedImage(projectData.croppedImage);
        
        // Show success message
        setExportSuccess(true);
        setTimeout(() => {
          setExportSuccess(false);
          // Redirect to a proper page to show the loaded project
          navigate('/mosaic-generator');
        }, 2000);
      } catch (error) {
        console.error('Error importing project:', error);
        setExportError('Error importing project: ' + error.message);
      }
    };
    reader.onerror = () => {
      setExportError('Error reading file');
    };
    reader.readAsText(file);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your LEGO Mosaic
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-center mb-4 relative">
            {legoImage && (
              <div className="relative inline-block border border-gray-300">
                <img 
                  src={legoImage} 
                  alt="LEGO Mosaic" 
                  className="w-auto max-h-[50vh]"
                />
                
                {showGrid && (
                  <div className="absolute inset-0 grid grid-cols-16 grid-rows-16 pointer-events-none">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div 
                        key={`col-${i}`} 
                        className="border-r border-black border-opacity-10"
                        style={{ gridColumn: i + 1, gridRow: 'span 16' }}
                      ></div>
                    ))}
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div 
                        key={`row-${i}`} 
                        className="border-b border-black border-opacity-10"
                        style={{ gridRow: i + 1, gridColumn: 'span 16' }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-center mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-800 font-medium">Show Grid</span>
            </label>
          </div>
          
          <div className="flex space-x-4">
            <button
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => navigate('/mosaic')}
            >
              Create New
            </button>
            
            <button
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={exportAsPNG}
            >
              Export PNG
            </button>
          </div>
        </div>
        
        {/* Right Column - Export */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Export for LEGO Printer</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full rounded border p-2 text-gray-800"
            />
          </div>
          
          <button
            className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 mb-4"
            onClick={exportAsTXT}
          >
            Export for LEGO Printer (.txt)
          </button>
          
          <div className="flex space-x-4 mb-6">
            <button
              className="flex-1 py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={exportAsJSON}
            >
              Save Project (.json)
            </button>
            
            <button
              className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              onClick={() => fileInputRef.current.click()}
            >
              Load Project
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".json"
              onChange={importJSON}
            />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Brick Count</h3>
          <div className="max-h-[200px] overflow-y-auto border rounded-lg p-3 bg-gray-50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1 text-gray-800">Color</th>
                  <th className="text-right py-1 text-gray-800">Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(colorCounts).map(([colorName, count]) => (
                  <tr key={colorName} className="border-b border-gray-200">
                    <td className="py-1 flex items-center text-gray-800">
                      <div 
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ 
                          backgroundColor: `rgb(${colorConfig[colorName].rgb.join(',')})` 
                        }}
                      ></div>
                      {colorName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </td>
                    <td className="text-right py-1 text-gray-800">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Success message */}
          {exportSuccess && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded-lg shadow-md">
              <span className="font-medium">
                {exportSuccess === true ? 'Operation successful!' : exportSuccess}
              </span>
            </div>
          )}
          
          {/* Error message */}
          {exportError && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-800 rounded-lg shadow-md">
              <span className="font-medium">{exportError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel; 