import { useState, useEffect } from 'react';
import { generateImage } from '../api/directImageGen';
import { fetchWithProxy } from '../api/corsProxy';

/**
 * ApiTester component - provides a UI for testing the Hugging Face API
 * This can be added to any page for debugging purposes
 */
const ApiTester = () => {
  const [testResults, setTestResults] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testImage, setTestImage] = useState(null);
  const [prompt, setPrompt] = useState('A cat wearing a hat');
  const [testFunctions, setTestFunctions] = useState(null);
  const [testMethod, setTestMethod] = useState('direct'); // 'direct', 'proxy', or 'both'
  const [proxyMethod, setProxyMethod] = useState('multiple'); // 'multiple', 'corsproxy.io', 'allorigins', etc.
  const [useCustomPrompt, setUseCustomPrompt] = useState(true);
  
  // Load test functions dynamically to avoid breaking imports
  useEffect(() => {
    async function loadTestFunctions() {
      try {
        const module = await import('../api/testHuggingFace');
        setTestFunctions(module);
        setTestResults('✅ API test functions loaded successfully');
      } catch (error) {
        console.error('Failed to load API test functions:', error);
        setTestResults('❌ Failed to load API test functions: ' + error.message);
      }
    }
    
    loadTestFunctions();
  }, []);

  // Helper to use a preset prompt for faster testing
  const usePresetPrompt = (preset) => {
    setUseCustomPrompt(false);
    switch(preset) {
      case 'cat':
        setPrompt('A cat wearing a hat');
        break;
      case 'dog':
        setPrompt('A dog playing fetch in a park');
        break;
      case 'landscape':
        setPrompt('A beautiful mountain landscape with a lake');
        break;
      case 'simple':
        setPrompt('A red circle on a white background');
        break;
      default:
        setPrompt('A cat wearing a hat');
    }
  };
  
  // Test the connection
  const handleTestConnection = async () => {
    setIsLoading(true);
    setTestResults('Testing API connection...');
    try {
      if (!testFunctions || !testFunctions.testHuggingFaceAPI) {
        throw new Error('Test functions not available');
      }
      
      const connectionWorks = await testFunctions.testHuggingFaceAPI();
      if (connectionWorks) {
        setTestResults(prevResults => prevResults + '\n✅ API connection successful!');
      } else {
        setTestResults(prevResults => prevResults + '\n❌ API connection failed. See console for details.');
      }
    } catch (error) {
      setTestResults(prevResults => prevResults + `\n❌ Error during test: ${error.message}`);
      console.error('Test error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Test the models endpoint
  const handleCheckModels = async () => {
    setIsLoading(true);
    setTestResults('Checking models endpoint...');
    try {
      if (!testFunctions || !testFunctions.checkModelsEndpoint) {
        throw new Error('Test functions not available');
      }
      
      const modelsWork = await testFunctions.checkModelsEndpoint();
      if (modelsWork) {
        setTestResults(prevResults => prevResults + '\n✅ Models endpoint successful!');
      } else {
        setTestResults(prevResults => prevResults + '\n❌ Models endpoint failed. See console for details.');
      }
    } catch (error) {
      setTestResults(prevResults => prevResults + `\n❌ Error checking models: ${error.message}`);
      console.error('Models check error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Test image generation
  const handleTestGeneration = async () => {
    setIsLoading(true);
    setTestImage(null);
    setTestResults('Testing image generation...');
    setTestResults(prevResults => prevResults + `\nPrompt: "${prompt}"`);
    setTestResults(prevResults => prevResults + `\nMethod: ${testMethod}, Proxy: ${proxyMethod}`);
    
    try {
      let result;
      
      if (testMethod === 'proxy' || testMethod === 'both') {
        setTestResults(prevResults => prevResults + '\nTesting with CORS proxy...');
        try {
          // Test using our CORS proxy directly
          const API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1';
          const API_TOKEN = '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';
          
          // If a specific proxy is selected
          let specificProxyUrl = null;
          if (proxyMethod !== 'multiple') {
            if (proxyMethod === 'corsproxy.io') {
              specificProxyUrl = 'https://corsproxy.io/?';
            } else if (proxyMethod === 'allorigins') {
              specificProxyUrl = 'https://api.allorigins.win/raw?url=';
            } else if (proxyMethod === 'thingproxy') {
              specificProxyUrl = 'https://thingproxy.freeboard.io/fetch/';
            } else if (proxyMethod === 'bridged') {
              specificProxyUrl = 'https://cors.bridged.cc/';
            }
          }
          
          // Custom fetch if specific proxy
          let response;
          if (specificProxyUrl) {
            setTestResults(prevResults => prevResults + `\nTrying specific proxy: ${specificProxyUrl}`);
            
            let proxyUrl;
            if (proxyMethod === 'corsproxy.io' || proxyMethod === 'allorigins') {
              proxyUrl = `${specificProxyUrl}${encodeURIComponent(API_URL)}`;
            } else {
              proxyUrl = `${specificProxyUrl}${API_URL}`;
            }
            
            response = await fetch(proxyUrl, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
                ...(proxyMethod === 'bridged' ? { 'origin': 'https://cors.bridged.cc' } : {})
              },
              body: JSON.stringify({ 
                inputs: prompt,
                parameters: {
                  seed: 42, // Fixed seed for testing
                  guidance_scale: 7.5,
                  num_inference_steps: 10 // Fewer steps for testing
                }
              }),
            });
          } else {
            // Use the standard proxy approach
            response = await fetchWithProxy(API_URL, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                inputs: prompt,
                parameters: {
                  seed: 42, // Fixed seed for testing
                  guidance_scale: 7.5,
                  num_inference_steps: 10 // Fewer steps for testing
                }
              }),
            });
          }
          
          if (response.ok) {
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            
            setTestResults(prevResults => prevResults + '\n✅ CORS proxy image generation successful!');
            
            if (testMethod === 'proxy') {
              setTestImage(imageUrl);
              result = { success: true };
            }
          } else {
            const errorText = await response.text();
            setTestResults(prevResults => prevResults + `\n❌ CORS proxy request failed: ${response.status} - ${errorText}`);
            
            if (response.status === 503) {
              setTestResults(prevResults => prevResults + '\n⚠️ Model is still loading. Try again in a few moments.');
            }
          }
        } catch (proxyError) {
          setTestResults(prevResults => prevResults + `\n❌ CORS proxy error: ${proxyError.message}`);
        }
      }
      
      if (testMethod === 'direct' || (testMethod === 'both' && !result?.success)) {
        setTestResults(prevResults => prevResults + '\nTesting with direct image generation...');
        
        result = await generateImage(prompt, 'fast');
        
        if (result.success) {
          setTestResults(prevResults => prevResults + '\n✅ Direct image generation successful!');
          setTestImage(result.image);
        } else {
          setTestResults(prevResults => prevResults + `\n❌ Direct image generation failed: ${result.error}`);
          
          if (result.isLoading) {
            setTestResults(prevResults => prevResults + '\n⚠️ Model is still loading. Try again in a few moments.');
          }
          
          if (result.details) {
            setTestResults(prevResults => prevResults + `\nDetails: ${result.details}`);
          }
        }
      }
    } catch (error) {
      setTestResults(prevResults => prevResults + `\n❌ Error generating image: ${error.message}`);
      console.error('Generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clear test results
  const handleClearResults = () => {
    setTestResults('');
    setTestImage(null);
  };
  
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">API Tester</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Test Prompt
        </label>
        <div className="flex space-x-2 mb-2">
          <button 
            className={`px-2 py-1 text-xs rounded ${!useCustomPrompt && prompt === 'A cat wearing a hat' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => usePresetPrompt('cat')}
          >
            Cat
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded ${!useCustomPrompt && prompt === 'A dog playing fetch in a park' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => usePresetPrompt('dog')}
          >
            Dog
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded ${!useCustomPrompt && prompt === 'A beautiful mountain landscape with a lake' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => usePresetPrompt('landscape')}
          >
            Landscape
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded ${!useCustomPrompt && prompt === 'A red circle on a white background' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => usePresetPrompt('simple')}
          >
            Simple
          </button>
        </div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setUseCustomPrompt(true);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Test Method
          </label>
          <div className="space-y-1">
            <label className="block items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="testMethod"
                value="direct"
                checked={testMethod === 'direct'}
                onChange={() => setTestMethod('direct')}
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-700">Direct API</span>
            </label>
            <label className="block items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="testMethod"
                value="proxy"
                checked={testMethod === 'proxy'}
                onChange={() => setTestMethod('proxy')}
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-700">CORS Proxy</span>
            </label>
            <label className="block items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="testMethod"
                value="both"
                checked={testMethod === 'both'}
                onChange={() => setTestMethod('both')}
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-700">Try Both</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proxy Selection
          </label>
          <div className="space-y-1">
            <label className="block items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="proxyMethod"
                value="multiple"
                checked={proxyMethod === 'multiple'}
                onChange={() => setProxyMethod('multiple')}
                disabled={isLoading || testMethod === 'direct'}
              />
              <span className="ml-2 text-sm text-gray-700">Try All Proxies</span>
            </label>
            <label className="block items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="proxyMethod"
                value="corsproxy.io"
                checked={proxyMethod === 'corsproxy.io'}
                onChange={() => setProxyMethod('corsproxy.io')}
                disabled={isLoading || testMethod === 'direct'}
              />
              <span className="ml-2 text-sm text-gray-700">corsproxy.io</span>
            </label>
            <label className="block items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="proxyMethod"
                value="thingproxy"
                checked={proxyMethod === 'thingproxy'}
                onChange={() => setProxyMethod('thingproxy')}
                disabled={isLoading || testMethod === 'direct'}
              />
              <span className="ml-2 text-sm text-gray-700">thingproxy.freeboard.io</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleTestConnection}
          disabled={isLoading || !testFunctions}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Test Connection
        </button>
        
        <button
          onClick={handleCheckModels}
          disabled={isLoading || !testFunctions}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
        >
          Check Models
        </button>
        
        <button
          onClick={handleTestGeneration}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
        >
          Test Generation
        </button>
        
        <button
          onClick={handleClearResults}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Clear Results
        </button>
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center p-4 mb-4 bg-gray-100 rounded-md">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
          <p>Processing...</p>
        </div>
      )}
      
      {testResults && (
        <div className="mb-4 mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Test Results
          </label>
          <pre className="bg-gray-100 p-3 rounded-md whitespace-pre-wrap text-sm font-mono h-32 overflow-y-auto">
            {testResults}
          </pre>
        </div>
      )}
      
      {testImage && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Generated Test Image
          </label>
          <div className="border border-gray-300 rounded-md p-2">
            <img 
              src={testImage} 
              alt="Test generated" 
              className="max-w-full h-auto"
              style={{ maxHeight: '300px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTester; 