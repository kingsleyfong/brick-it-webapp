import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';

const Dashboard = () => {
  const { clearMosaicData, clear3DData } = useImageContext();
  const [recentProjects, setRecentProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [stats, setStats] = useState({ mosaics: 0, models: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  
  // Load recent projects on component mount
  useEffect(() => {
    loadRecentProjects();
  }, []);
  
  // Apply filters and search when any filter criteria changes
  useEffect(() => {
    applyFiltersAndSearch();
  }, [recentProjects, searchTerm, filterType, sortOption]);
  
  // Function to load recent projects from localStorage
  const loadRecentProjects = () => {
    try {
      // Get recent projects from localStorage
      const recentProjectsData = localStorage.getItem('recentProjects');
      
      if (recentProjectsData) {
        const projects = JSON.parse(recentProjectsData);
        setRecentProjects(projects);
        setFilteredProjects(projects);
        
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
  
  // Apply filters and search
  const applyFiltersAndSearch = () => {
    let result = [...recentProjects];
    
    // Apply type filter
    if (filterType !== 'all') {
      result = result.filter(project => project.type === filterType);
    }
    
    // Apply search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.name.toLowerCase().includes(term) || 
        project.type.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    if (sortOption === 'newest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === 'oldest') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredProjects(result);
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
        setFilteredProjects([]);
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
  
  // Add a new component for users with no projects
  const NoProjectsWelcome = ({ clearMosaicData, clear3DData }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
        <div className="text-6xl mb-4">🧱</div>
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard!</h2>
        <p className="text-gray-600 mb-6">
          This is where all your projects will be saved for easy access. 
          Start creating your first project to see it here!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
          <Link 
            to="/mosaic" 
            onClick={clearMosaicData}
            className="flex items-center justify-center py-3 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            <span className="mr-2">🎨</span> Create Mosaic
          </Link>
          <Link 
            to="/3d" 
            onClick={clear3DData}
            className="flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <span className="mr-2">🧊</span> Create 3D Model
          </Link>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg max-w-md mx-auto">
          <h3 className="font-semibold mb-2">Quick Tips</h3>
          <ul className="text-sm text-left text-gray-700 space-y-1">
            <li>• For Mosaics: Upload an image or use AI generation</li>
            <li>• For 3D Models: Upload an STL file</li>
            <li>• Projects are saved automatically when you export</li>
            <li>• All processing happens in your browser - your data stays private</li>
          </ul>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Your Brick It Dashboard
      </h1>
      
      {recentProjects.length > 0 ? (
        <>
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
              <button 
                onClick={handleClearAllData}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Clear All Data
              </button>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search Projects
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* Filter */}
                <div>
                  <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Type
                  </label>
                  <select
                    id="filter"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Projects</option>
                    <option value="mosaic">Mosaics Only</option>
                    <option value="3d">3D Models Only</option>
                  </select>
                </div>
                
                {/* Sort */}
                <div>
                  <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>
            
            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No projects match your search criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setSortOption('newest');
                  }}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map(project => (
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
                        <span className={`px-2 py-1 text-xs rounded ${
                          project.type === 'mosaic' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
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
        </>
      ) : (
        <NoProjectsWelcome clearMosaicData={clearMosaicData} clear3DData={clear3DData} />
      )}
    </div>
  );
};

export default Dashboard; 