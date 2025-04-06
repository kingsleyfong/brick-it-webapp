import { useState, useEffect } from 'react';
import { getProxyStatus } from '../api/corsProxy';
import { generateImageDirect } from '../api/huggingFaceDirect';
import { getHuggingFaceApiToken, hasApiToken } from '../utils/env';

/**
 * API Debugger component - provides detailed API debugging information
 * and tools to diagnose issues with the Hugging Face API
 */
const ApiDebugger = () => {
  const [apiStatus, setApiStatus] = useState('unknown');
  const [apiToken, setApiToken] = useState('');
  const [corsStatus, setCorsStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [proxyStats, setProxyStats] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [testImage, setTestImage] = useState(null);
  const [directTestResult, setDirectTestResult] = useState(null);
  
  useEffect(() => {
    // Get API token from environment variable
    const token = getHuggingFaceApiToken();
    setApiToken(token ? (token.substring(0, 5) + '...') : 'Not set');
    
    // Update proxy stats periodically
    const updateProxyStats = () => {
      try {
        setProxyStats(getProxyStatus());
      } catch (error) {
        console.error('Error getting proxy status:', error);
      }
    };
    
    updateProxyStats();
    const interval = setInterval(updateProxyStats, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Add a function to fix CORS issues
  const fixCorsAnywhere = () => {
    window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank');
  };
  
  // Test the API token with a simple request
  const checkApiToken = async () => {
    setIsChecking(true);
    setApiStatus('checking');
    try {
      // Get API token from environment
      const token = getHuggingFaceApiToken();
      
      if (!token) {
        setApiStatus('error');
        return;
      }
      
      const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const status = response.status;
      const text = await response.text();
      
      setApiStatus({
        status,
        isValid: response.ok,
        response: text,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error checking API token:', error);
      setApiStatus('error');
    } finally {
      setIsChecking(false);
    }
  };
  
  // Test the direct API methods
  const testDirectMethods = async () => {
    setIsChecking(true);
    setDirectTestResult("Testing direct methods...");
    setTestImage(null);
    
    try {
      const result = await generateImageDirect("a simple red circle on white background", { quality: 'fast' });
      
      if (result.success) {
        setDirectTestResult(`✅ Direct generation successful using method: ${result.method}`);
        setTestImage(result.image);
      } else {
        setDirectTestResult(`❌ Direct generation failed: ${result.error}`);
      }
    } catch (error) {
      setDirectTestResult(`❌ Error during direct test: ${error.message}`);
    } finally {
      setIsChecking(false);
    }
  };
  
  // Test CORS connectivity
  const checkCorsConnectivity = async () => {
    setIsChecking(true);
    
    try {
      // Try using fetch directly to test CORS
      const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1', {
        method: 'GET'
      });
      
      setCorsStatus({
        success: true,
        message: `Direct fetch successful with status ${response.status}`
      });
    } catch (error) {
      setCorsStatus({
        success: false,
        message: `CORS error: ${error.message}`
      });
      
      // Try using each CORS proxy
      const proxies = [
        'https://corsproxy.io/?',
        'https://api.allorigins.win/raw?url=',
        'https://thingproxy.freeboard.io/fetch/',
        'https://cors.bridged.cc/',
        'https://proxy.cors.sh/',
        'https://corsproxy.server.tld/'
      ];
      
      for (const proxy of proxies) {
        try {
          let proxyUrl;
          if (proxy === 'https://api.allorigins.win/raw?url=' || proxy === 'https://corsproxy.io/?') {
            proxyUrl = `${proxy}${encodeURIComponent('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1')}`;
          } else {
            proxyUrl = `${proxy}https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1`;
          }
          
          await fetch(proxyUrl);
          
          setCorsStatus(prev => ({
            ...prev,
            proxyResults: {
              ...(prev?.proxyResults || {}),
              [proxy]: 'Working'
            }
          }));
        } catch (proxyError) {
          setCorsStatus(prev => ({
            ...prev,
            proxyResults: {
              ...(prev?.proxyResults || {}),
              [proxy]: `Failed: ${proxyError.message}`
            }
          }));
        }
      }
    } finally {
      setIsChecking(false);
    }
  };
  
  // Get the best proxy based on success rate
  const getBestProxy = () => {
    if (!proxyStats) return "Unknown";
    
    let bestProxy = null;
    let bestRate = -1;
    
    Object.entries(proxyStats).forEach(([proxy, stats]) => {
      if (proxy === 'direct') return; // Skip direct
      
      const total = stats.success + stats.failure;
      if (total === 0) return; // Skip unused
      
      const rate = stats.success / total;
      if (rate > bestRate) {
        bestRate = rate;
        bestProxy = proxy;
      }
    });
    
    return bestProxy ? `${bestProxy} (${Math.round(bestRate * 100)}%)` : "None working";
  };
  
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">API Debugger</h3>
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          {showHelp ? 'Hide Help' : 'Show Help'}
        </button>
      </div>
      
      {showHelp && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md text-sm">
          <h4 className="font-medium text-blue-800 mb-1">Troubleshooting CORS Issues</h4>
          <p className="mb-2">CORS (Cross-Origin Resource Sharing) issues occur when your browser blocks API requests from different domains.</p>
          <ul className="list-disc list-inside text-blue-800 space-y-1 mb-2">
            <li>Try using "Fast" quality instead of "High"</li>
            <li>Try a simpler prompt (like "red circle")</li>
            <li>Check the console for detailed error messages</li>
            <li>Make sure no browser extensions are blocking requests</li>
            <li>Try the "Test Direct Methods" button for alternate approaches</li>
          </ul>
          <button
            onClick={fixCorsAnywhere}
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Fix CORS-Anywhere Access
          </button>
        </div>
      )}
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full mr-2" 
               style={{ backgroundColor: apiStatus === 'error' ? '#EF4444' : apiStatus === 'checking' ? '#F59E0B' : '#10B981' }}></div>
          <span className="text-sm font-medium">
            API Token: {apiToken || 'Not set'} {hasApiToken() ? '(Valid format)' : '(Invalid)'}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={checkApiToken}
            disabled={isChecking}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Check API Token
          </button>
          
          <button
            onClick={checkCorsConnectivity}
            disabled={isChecking}
            className="px-3 py-1 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
          >
            Test CORS
          </button>
          
          <button
            onClick={testDirectMethods}
            disabled={isChecking}
            className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:opacity-50"
          >
            Test Direct Methods
          </button>
          
          <button
            onClick={fixCorsAnywhere}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Fix CORS Access
          </button>
        </div>
      </div>
      
      {isChecking && (
        <div className="flex items-center justify-center p-3 mb-3 bg-gray-100 rounded-md">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
          <p className="text-sm">Testing...</p>
        </div>
      )}
      
      {/* Best proxy info */}
      {proxyStats && Object.keys(proxyStats).length > 0 && (
        <div className="bg-green-50 p-2 rounded-md text-sm mb-3">
          <p className="font-medium text-green-800">Best working proxy: {getBestProxy()}</p>
          <p className="text-xs text-green-700 mt-1">
            The app will automatically use the best performing proxy for image generation
          </p>
        </div>
      )}
      
      {/* API Status Results */}
      {apiStatus === 'error' && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">API Token Status:</h4>
          <div className="bg-gray-100 p-2 rounded-md text-xs font-mono">
            <p>Status: {apiStatus}</p>
          </div>
        </div>
      )}
      
      {apiStatus === 'checking' && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">API Token Status:</h4>
          <div className="bg-gray-100 p-2 rounded-md text-xs font-mono">
            <p>Checking...</p>
          </div>
        </div>
      )}
      
      {apiStatus !== 'error' && apiStatus !== 'checking' && apiStatus.timestamp && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">API Token Status:</h4>
          <div className="bg-gray-100 p-2 rounded-md text-xs font-mono">
            <p>Status: {apiStatus.status} ({apiStatus.isValid ? 'Valid' : 'Invalid'})</p>
            <p>Last Checked: {apiStatus.timestamp}</p>
            <div className="mt-1 max-h-20 overflow-y-auto">
              <p className="whitespace-pre-wrap">{apiStatus.response}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Direct Test Results */}
      {directTestResult && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">Direct Methods Test:</h4>
          <div className="bg-gray-100 p-2 rounded-md text-xs font-mono">
            <p className={directTestResult.includes('✅') ? 'text-green-600' : (directTestResult.includes('❌') ? 'text-red-600' : 'text-gray-600')}>
              {directTestResult}
            </p>
          </div>
          {testImage && (
            <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
              <img 
                src={testImage} 
                alt="Test generated" 
                className="w-full h-auto max-h-40 object-contain"
              />
            </div>
          )}
        </div>
      )}
      
      {/* CORS Status Results */}
      {corsStatus && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">CORS Status:</h4>
          <div className="bg-gray-100 p-2 rounded-md text-xs font-mono">
            <p className={corsStatus.success ? 'text-green-600' : 'text-red-600'}>
              {corsStatus.message}
            </p>
            
            {corsStatus.proxyResults && (
              <>
                <p className="mt-1 font-medium">Proxy Results:</p>
                <ul className="list-disc list-inside">
                  {Object.entries(corsStatus.proxyResults).map(([proxy, result]) => (
                    <li key={proxy} className={result.includes('Working') ? 'text-green-600' : 'text-red-600'}>
                      {proxy.substring(0, 20)}...: {result}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Proxy Statistics */}
      {proxyStats && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">Proxy Statistics:</h4>
          <div className="bg-gray-100 p-2 rounded-md text-xs font-mono">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="pr-2">Proxy</th>
                  <th className="px-2">Success</th>
                  <th className="px-2">Failure</th>
                  <th className="pl-2">Last Used</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(proxyStats).map(([proxy, stats]) => (
                  <tr key={proxy} className="border-t border-gray-200">
                    <td className="pr-2 py-1">{proxy === 'direct' ? 'Direct' : proxy.substring(0, 15) + '...'}</td>
                    <td className="px-2 py-1 text-green-600">{stats.success}</td>
                    <td className="px-2 py-1 text-red-600">{stats.failure}</td>
                    <td className="pl-2 py-1">
                      {stats.lastAttempt ? new Date(stats.lastAttempt).toLocaleTimeString() : 'Never'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Having issues? Try:</p>
        <ul className="list-disc list-inside">
          <li>Checking if API token is valid</li>
          <li>Using a different browser</li>
          <li>Verifying CORS proxies are working</li>
          <li>Using the "Fast" quality setting for image generation</li>
          <li>Temporarily disabling browser extensions (ad blockers, etc.)</li>
          <li>Using the "Test Direct Methods" option</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiDebugger; 