import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';

const Dashboard = () => {
  const { clearMosaicData, clear3DData } = useImageContext();
  const [recentProjects, setRecentProjects] = useState([]);
  const [stats, setStats] = useState({ mosaics: 0, models: 0 });
  
  // Load recent projects on component mount
  useEffect(() => {
    loadRecentProjects();
  }, []);
  
  // Function to load recent projects from localStorage
  const loadRecentProjects = () => {
    try {
      // Get recent projects from localStorage
      const recentProjectsData = localStorage.getItem('recentProjects');
      
      if (recentProjectsData) {
        const projects = JSON.parse(recentProjectsData);
        setRecentProjects(projects);
        
        // Calculate stats
        const mosaicCount = projects.filter(p => p.type === 'mosaic').length;
        const modelCount = projects.filter(p => p.type === '3d').length;
        
        setStats({
          mosaics: mosaicCount,
          models: modelCount
        });
      }
    } catch (error) {
      console.error('Error loading recent projects:', error);
    }
  };
  
  // Function to clear all saved data
  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all saved data? This action cannot be undone.')) {
      try {
        // Clear context data
        clearMosaicData();
        clear3DData();
        
        // Clear localStorage
        localStorage.clear();
        
        // Reset recent projects
        setRecentProjects([]);
        setStats({ mosaics: 0, models: 0 });
        
        alert('All data cleared successfully.');
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('Error clearing data: ' + error.message);
      }
    }
  };
  
  // Function to delete a specific project
  const handleDeleteProject = (id) => {
    try {
      // Filter out the project with the given id
      const updatedProjects = recentProjects.filter(p => p.id !== id);
      
      // Update localStorage
      localStorage.setItem('recentProjects', JSON.stringify(updatedProjects));
      
      // Update state
      setRecentProjects(updatedProjects);
      
      // Recalculate stats
      const mosaicCount = updatedProjects.filter(p => p.type === 'mosaic').length;
      const modelCount = updatedProjects.filter(p => p.type === '3d').length;
      
      setStats({
        mosaics: mosaicCount,
        models: modelCount
      });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Your Brick It Dashboard
      </h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Total Projects</h2>
          <p className="text-4xl font-bold text-blue-600">{recentProjects.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Mosaic Projects</h2>
          <p className="text-4xl font-bold text-red-600">{stats.mosaics}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">3D Model Projects</h2>
          <p className="text-4xl font-bold text-green-600">{stats.models}</p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Start a New Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/mosaic" 
            onClick={clearMosaicData}
            className="block w-full py-3 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition text-center"
          >
            New Mosaic Project
          </Link>
          <Link 
            to="/3d" 
            onClick={clear3DData}
            className="block w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
          >
            New 3D Model Project
          </Link>
        </div>
      </div>
      
      {/* Recent Projects */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Projects</h2>
          {recentProjects.length > 0 && (
            <button 
              onClick={handleClearAllData}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear All Data
            </button>
          )}
        </div>
        
        {recentProjects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">No recent projects found.</p>
            <p className="text-gray-500 text-sm mt-2">
              Projects will appear here after you save them.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {project.thumbnail ? (
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <img 
                      src={project.thumbnail} 
                      alt={project.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl">
                      {project.type === 'mosaic' ? '🎨' : '🧊'}
                    </span>
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold truncate">{project.name}</h3>
                    <span className="px-2 py-1 text-xs rounded bg-gray-200">
                      {project.type === 'mosaic' ? 'Mosaic' : '3D Model'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {new Date(project.date).toLocaleDateString()}
                  </p>
                  
                  <div className="flex justify-between">
                    <Link
                      to={project.type === 'mosaic' ? "/mosaic" : "/3d"}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Open
                    </Link>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Settings */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Storage Usage</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(recentProjects.length * 10, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Using approximately {Math.round(recentProjects.length * 1.2 * 100) / 100} MB of localStorage space.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Browser Compatibility</h3>
            <p className="text-sm text-gray-600">
              {typeof WebAssembly === 'object' 
                ? '✅ Your browser fully supports all Brick It features, including AI image generation.'
                : '⚠️ Your browser may not support the AI image generation feature. Consider using Chrome or Edge for full functionality.'}
            </p>
          </div>
          
          <div>
            <button 
              onClick={handleClearAllData}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear All Data
            </button>
            <p className="text-xs text-gray-500 mt-1">
              This will clear all saved projects and settings. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 