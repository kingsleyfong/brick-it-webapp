import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';

const Home = () => {
  const { clearMosaicData, clear3DData } = useImageContext();
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  
  // Check if this is the user's first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);
  
  // Function to close the welcome message
  const closeWelcomeMessage = () => {
    setIsFirstVisit(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="/scrapbook.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20" 
        />
      </div>

      {/* First-time user welcome message */}
      {isFirstVisit && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 relative">
          <button 
            onClick={closeWelcomeMessage}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold text-blue-700 mb-2">👋 Welcome to Brick It!</h2>
          <p className="text-blue-600 mb-2">
            Brick It helps you transform your images and 3D models into LEGO-compatible instructions.
          </p>
          <p className="text-sm text-blue-600">
            <strong>Getting Started:</strong> Choose either Mosaic Mode to create LEGO pixel art, or 
            3D Model Mode to convert your 3D models (.stl files) into buildable LEGO structures.
          </p>
        </div>
      )}
      
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to <span className="text-red-600">Brick It</span>
      </h1>
      
      <div className="text-center text-lg max-w-4xl mx-auto mb-10">
        <p className="mb-4">
          Transform your images and 3D models into LEGO-compatible instructions.
        </p>
        <p className="mb-6">
          Built with React, Tailwind CSS, Three.js, and WebAssembly, this app processes everything in your browser without server uploads. 
          The Mosaic Mode uses AI-generation and color-matching algorithms, while the 3D Model Mode employs voxelization techniques to transform STL files into LEGO bricks.
        </p>
        <p className="mb-4">
          Choose a mode to get started, or visit our <Link to="/learn-more" className="text-blue-600 font-semibold hover:underline">Learn More</Link> page to discover the full story behind this engineering project.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
        {/* Mosaic Mode Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
            <img src="/mosaic.png" alt="Mosaic Mode" className="h-full w-full object-cover" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Mosaic Mode</h2>
            <p className="text-gray-600 mb-4">
              Generate or upload an image, crop it, and convert it to a LEGO mosaic.
            </p>
            <Link 
              to="/mosaic" 
              onClick={clearMosaicData}
              className="block w-full text-center py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Start Mosaic
            </Link>
          </div>
        </div>
        
        {/* 3D Model Mode Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
            <img src="/3dModel.png" alt="3D Model Mode" className="h-full w-full object-cover" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">3D Model Mode</h2>
            <p className="text-gray-600 mb-4">
              Upload a 3D model (.stl file) and convert it to LEGO instructions.
            </p>
            <Link 
              to="/3d" 
              onClick={clear3DData}
              className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Start 3D Model
            </Link>
          </div>
        </div>
      </div>
      
      {/* Dashboard Link */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link 
          to="/dashboard" 
          className="block w-full text-center py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          View Your Dashboard
        </Link>
        <p className="text-center text-sm text-gray-500 mt-2">
          Access your recent projects, settings, and app statistics
        </p>
      </div>
    </div>
  );
};

export default Home; 