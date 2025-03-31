import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ColorSetupModal from './ColorSetupModal';
import HelpModal from './HelpModal';

const Header = () => {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-red-600 text-white shadow-md fixed top-0 left-0 right-0 z-50 py-2">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        {/* Left section: UW logo and project info */}
        <div className="flex flex-1 items-center justify-start">
          {/* University of Waterloo Section */}
          <a 
            href="https://uwaterloo.ca/mechanical-mechatronics-engineering/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-start hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 flex-shrink-0 mr-2">
              <img 
                src="/uwaterloo_logo.png" 
                alt="University of Waterloo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-xs leading-tight">
              University of Waterloo<br />Winter 2025 ME101<br />Term Design Project
              <div className="font-semibold mt-1">Group 17</div>
            </div>
          </a>
        </div>

        {/* App Title - Center */}
        <div className="flex-1 text-center flex justify-center items-center mx-4">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <div className="font-extrabold text-4xl tracking-wider px-2 py-1" 
                 style={{ 
                   fontFamily: "'Impact', 'Bebas Neue', sans-serif",
                   background: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
                   color: "#e02020",
                   WebkitTextStroke: "1px #900",
                   textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                   transform: "scaleY(1.1)",
                   letterSpacing: "0.05em"
                 }}>
              Brick It
            </div>
          </Link>
        </div>
        
        {/* Creators section and Navigation - Right side */}
        <div className="flex-1 flex flex-col items-end justify-center">
          {/* Creators section */}
          <div className="text-xs mb-1 text-right">
            <div className="font-semibold">Creators: 
              <span className="font-normal ml-1">
                <a href="https://www.linkedin.com/in/kingsley-fong/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Kingsley Fong</a>,&nbsp;
                <a href="https://www.linkedin.com/in/adambenaissa/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Adam Benaissa</a>,&nbsp;
                <a href="https://www.linkedin.com/in/victor-radu-94a577345/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Victor Constantin Radu</a>,&nbsp;
                <a href="https://www.linkedin.com/in/j2schuurman/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Joseph Schuurman</a>
              </span>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex space-x-2">
            {/* Only show navigation when not on home page */}
            {location.pathname !== '/' && (
              <>
                <Link 
                  to="/" 
                  className="px-3 py-1 text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Home
                </Link>
                
                <Link 
                  to="/dashboard" 
                  className="px-3 py-1 text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Dashboard
                </Link>
                
                <button
                  onClick={() => setIsColorModalOpen(true)}
                  className="px-3 py-1 text-sm rounded bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
                >
                  Color Setup
                </button>
              </>
            )}
            
            {/* Always show help button */}
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-400 transition-colors"
            >
              Help
            </button>
          </div>
        </div>
      </div>
      
      {/* Color Setup Modal */}
      {isColorModalOpen && (
        <ColorSetupModal onClose={() => setIsColorModalOpen(false)} />
      )}
      
      {/* Help Modal */}
      {isHelpModalOpen && (
        <HelpModal onClose={() => setIsHelpModalOpen(false)} />
      )}
    </header>
  );
};

export default Header; 