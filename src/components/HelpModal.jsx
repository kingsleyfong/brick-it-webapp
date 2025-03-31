import { useState, useEffect } from 'react';

const HelpModal = ({ onClose }) => {
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

  // Track which section is expanded for mobile view
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Help & Information</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        
        <div className="prose prose-lg dark:prose-invert">
          <h3>About Brick It</h3>
          <p>
            Brick It is a web application that transforms images and 3D models into LEGO-compatible instructions.
            The app runs entirely in your browser - no data is sent to any server.
          </p>
          
          <h3>Mosaic Mode</h3>
          <p>
            <strong>Step 1:</strong> Upload an image or generate one with AI
          </p>
          <p>
            <strong>Step 2:</strong> Crop the image to your preferred composition (it will be converted to a 16x16 grid)
          </p>
          <p>
            <strong>Step 3:</strong> The app will automatically convert your image to a LEGO mosaic using the color configuration set
          </p>
          <p>
            <strong>Step 4:</strong> Export as PNG for reference, or as a .txt file for use with LEGO building machines
          </p>
          <p>
            <strong>Step 5:</strong> Optionally save your project as JSON to continue working on it later
          </p>
          
          <h3>3D Model Mode</h3>
          <p>
            <strong>Step 1:</strong> Upload an STL file (3D model)
          </p>
          <p>
            <strong>Step 2:</strong> The app will automatically voxelize the model (convert it to LEGO bricks)
          </p>
          <p>
            <strong>Step 3:</strong> View the model in 3D and adjust settings
          </p>
          <p>
            <strong>Step 4:</strong> Use layer-by-layer viewing to see detailed construction steps
          </p>
          <p>
            <strong>Step 5:</strong> Export as a .txt file for use with LEGO building machines
          </p>
          
          <h3>Color Configuration</h3>
          <p>
            You can configure the colors for each dispenser in your LEGO machine by clicking the "Color Setup" 
            button in the header. Each color can be assigned to a specific dispenser number.
          </p>
          
          <h3>Mobile Usage Tips</h3>
          <p>
            Brick It is fully optimized for mobile devices. Here are some tips for the best experience:
          </p>
          <ul>
            <li><strong>Orientation:</strong> Landscape mode works best for the 3D viewer</li>
            <li><strong>Pinch to zoom:</strong> Use pinch gestures to zoom in/out of the 3D model</li>
            <li><strong>Long press:</strong> Long press on bricks for additional options</li>
            <li><strong>Save often:</strong> Use the save feature to avoid losing work</li>
            <li><strong>Layer navigation:</strong> Swipe left/right to navigate 3D model layers</li>
          </ul>
          
          <h3>Output Format</h3>
          <p>
            The .txt output is in a simple format that can be used with LEGO building machines:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
            &lt;x&gt; &lt;y&gt; &lt;z&gt; &lt;color index&gt;
          </pre>
          <p>
            Where:
          </p>
          <ul>
            <li><strong>x, y, z</strong> are coordinates (1-based)</li>
            <li><strong>color index</strong> is the dispenser number</li>
          </ul>
          
          <h3>Credits</h3>
          <p>
            Brick It was created by <a href="https://www.linkedin.com/in/kingsley-fong/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Kingsley Fong</a> at the University of Waterloo. Mechanical Engineer.
          </p>
          <p>
            LEGO® is a trademark of the LEGO Group, which does not sponsor, authorize or endorse this web app.
          </p>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal; 