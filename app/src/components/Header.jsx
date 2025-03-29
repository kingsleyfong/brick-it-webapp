import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ColorSetupModal from './ColorSetupModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="mr-2">🧱</span> Brick It
        </Link>
        
        <div className="flex space-x-4">
          {/* Only show navigation when not on home page */}
          {location.pathname !== '/' && (
            <>
              <Link 
                to="/" 
                className="px-3 py-1 rounded hover:bg-red-700 transition-colors"
              >
                Home
              </Link>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1 rounded bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
              >
                Color Setup
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Color Setup Modal */}
      {isModalOpen && (
        <ColorSetupModal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
};

export default Header; 