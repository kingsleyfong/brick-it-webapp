import { Link } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';

const Home = () => {
  const { clearMosaicData, clear3DData } = useImageContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to <span className="text-red-600">Brick It</span>
      </h1>
      
      <p className="text-center text-lg max-w-2xl mx-auto mb-12">
        Transform your images and 3D models into LEGO-compatible instructions.
        Choose a mode to get started.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Mosaic Mode Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
            <span className="text-6xl">🎨</span>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Mosaic Mode</h2>
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
            <span className="text-6xl">🧊</span>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">3D Model Mode</h2>
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
      
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>LEGO® is a trademark of the LEGO Group, which does not sponsor, authorize or endorse this web app.</p>
        <p>Built by Kingsley Fong at the University of Washington.</p>
      </div>
    </div>
  );
};

export default Home; 