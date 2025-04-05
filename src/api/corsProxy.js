// Enhanced CORS proxy for making cross-origin requests
// This helps bypass CORS restrictions when calling external APIs directly from the browser

// Keep track of which proxies are working
const proxyStatus = {
  direct: { success: 0, failure: 0, lastAttempt: 0 },
  // The following proxies require a demo first, so we're not using them by default:
  // 'https://cors-anywhere.herokuapp.com/': { success: 0, failure: 0, lastAttempt: 0 },
  
  // Alternative proxies that don't require demo:
  'https://api.allorigins.win/raw?url=': { success: 0, failure: 0, lastAttempt: 0 },
  'https://corsproxy.io/?': { success: 0, failure: 0, lastAttempt: 0 },
  // Disabling crossorigin.me as it seems to be down frequently
  // 'https://crossorigin.me/': { success: 0, failure: 0, lastAttempt: 0 },
  'https://cors.bridged.cc/': { success: 0, failure: 0, lastAttempt: 0 },
  'https://thingproxy.freeboard.io/fetch/': { success: 0, failure: 0, lastAttempt: 0 },
  // Adding CORS.SH proxy which supports POST
  'https://proxy.cors.sh/': { success: 0, failure: 0, lastAttempt: 0 },
  // Adding corsproxy.server.tld which supports various methods
  'https://corsproxy.server.tld/': { success: 0, failure: 0, lastAttempt: 0 },
};

// Debug mode
const DEBUG = true;

// Check if a proxy is suitable for the request type
function isProxySuitable(proxy, method) {
  // POST-capable proxies
  const postCapableProxies = [
    'https://cors.bridged.cc/', 
    'https://thingproxy.freeboard.io/fetch/',
    'https://proxy.cors.sh/',
    'https://corsproxy.server.tld/'
  ];
  
  if (method && method.toUpperCase() === 'POST') {
    return postCapableProxies.includes(proxy);
  }
  
  return true;
}

/**
 * Makes a request through a CORS proxy
 * @param {string} url - The target URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} - The fetch response
 */
export async function fetchWithProxy(url, options = {}) {
  // List of public CORS proxies to try, prioritizing POST-compatible ones if needed
  const method = options.method || 'GET';
  
  // We'll try direct first for GET but not for POST (since those will likely fail with CORS)
  const tryDirect = method.toUpperCase() === 'GET';
  
  // Order proxies differently based on the request method
  let proxies = [];
  if (method.toUpperCase() === 'POST') {
    // For POST requests, prioritize proxies that handle POST well
    proxies = [
      'https://proxy.cors.sh/',
      'https://corsproxy.server.tld/',
      'https://thingproxy.freeboard.io/fetch/',
      'https://cors.bridged.cc/',
    ];
  } else {
    // For GET requests, use a wider range of proxies
    proxies = [
      'https://corsproxy.io/?',
      'https://api.allorigins.win/raw?url=',
      'https://cors.bridged.cc/',
      'https://thingproxy.freeboard.io/fetch/',
      'https://proxy.cors.sh/',
      'https://corsproxy.server.tld/',
    ];
  }
  
  const now = Date.now();
  
  // Log fetch attempt in debug mode
  if (DEBUG) {
    console.log(`[CORS Proxy] Attempting to fetch ${url}`, { 
      method: method,
      proxyStatus
    });
  }
  
  // Try direct fetch first for GET requests
  if (tryDirect) {
    try {
      if (DEBUG) console.log('[CORS Proxy] Trying direct fetch...');
      proxyStatus.direct.lastAttempt = now;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for direct
      
      const directOptions = { ...options, signal: controller.signal };
      
      const response = await fetch(url, directOptions);
      clearTimeout(timeoutId);
      
      proxyStatus.direct.success++;
      if (DEBUG) console.log('[CORS Proxy] Direct fetch succeeded!');
      return response;
    } catch (directError) {
      proxyStatus.direct.failure++;
      console.warn('[CORS Proxy] Direct fetch failed:', directError);
      // Continue to try proxies
    }
  } else {
    if (DEBUG) console.log('[CORS Proxy] Skipping direct fetch for POST request (CORS would block it)');
  }
  
  // Try direct fetch with no-cors mode for POST requests
  // This creates an "opaque" response but sometimes can work for image responses
  if (method.toUpperCase() === 'POST' && options.body && url.includes('huggingface')) {
    try {
      if (DEBUG) console.log('[CORS Proxy] Trying direct fetch with no-cors mode...');
      
      // Clone options and set mode to no-cors
      const noCorsOptions = { 
        ...options,
        mode: 'no-cors',
        headers: {
          ...options.headers,
          'Accept': 'image/jpeg,image/png,image/*'
        }
      };
      
      // This will return an opaque response
      const response = await fetch(url, noCorsOptions);
      
      // For opaque responses, we can't check status or body, but we can use it
      if (DEBUG) console.log('[CORS Proxy] Direct no-cors fetch returned (opaque response)');
      
      // This doesn't update success counters as we can't verify it worked
      // But it might work for image responses
      return response;
    } catch (noCorsError) {
      console.warn('[CORS Proxy] Direct no-cors fetch failed:', noCorsError);
      // Continue to try proxies
    }
  }
  
  // Try each proxy in order, with most successful ones first
  const sortedProxies = [...proxies].sort((a, b) => {
    // Calculate success rate for each proxy
    const aRate = proxyStatus[a] ? proxyStatus[a].success / (proxyStatus[a].success + proxyStatus[a].failure + 0.1) : 0;
    const bRate = proxyStatus[b] ? proxyStatus[b].success / (proxyStatus[b].success + proxyStatus[b].failure + 0.1) : 0;
    return bRate - aRate;
  }).filter(proxy => isProxySuitable(proxy, method)); // Only use suitable proxies
  
  if (DEBUG) console.log('[CORS Proxy] Trying proxies in order:', sortedProxies);
  
  // Array to store errors for better diagnostics
  const errors = [];
  
  // Try each proxy
  for (const proxy of sortedProxies) {
    try {
      if (DEBUG) console.log(`[CORS Proxy] Trying proxy: ${proxy}`);
      
      // Initialize proxy status if it doesn't exist
      if (!proxyStatus[proxy]) {
        proxyStatus[proxy] = { success: 0, failure: 0, lastAttempt: 0 };
      }
      
      proxyStatus[proxy].lastAttempt = now;
      
      // Format the URL differently based on the proxy
      let proxyUrl;
      if (proxy === 'https://api.allorigins.win/raw?url=' || 
          proxy === 'https://corsproxy.io/?') {
        proxyUrl = `${proxy}${encodeURIComponent(url)}`;
      } else {
        proxyUrl = `${proxy}${url}`;
      }
      
      // Clone the options object to avoid modifying the original
      const proxyOptions = { ...options };
      
      // Add custom headers for specific proxies
      if (proxy === 'https://cors.bridged.cc/') {
        proxyOptions.headers = {
          ...proxyOptions.headers,
          'origin': 'https://cors.bridged.cc'
        };
      } else if (proxy === 'https://proxy.cors.sh/') {
        proxyOptions.headers = {
          ...proxyOptions.headers,
          'x-cors-api-key': 'temp_' + Math.random().toString(36).substring(2),
        };
      }
      
      // Tracking the specific proxy we're using
      if (DEBUG) console.log(`[CORS Proxy] Fetching from ${proxyUrl}`);
      
      // Set longer timeout for proxy requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      proxyOptions.signal = controller.signal;
      
      // For form data or similar, we need to handle POST differently
      const response = await fetch(proxyUrl, proxyOptions);
      clearTimeout(timeoutId);
      
      // Check the response for proxy-specific errors
      if (response.status === 403 && proxy === 'https://cors-anywhere.herokuapp.com/') {
        throw new Error('CORS Anywhere requires demo completion at https://cors-anywhere.herokuapp.com/corsdemo');
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Proxy responded with status ${response.status}: ${errorText}`);
      }
      
      // For binary data (images), validate the response is actually valid
      // Some proxies return success but corrupted data
      if (url.includes('huggingface')) {
        try {
          const arrayBuffer = await response.clone().arrayBuffer();
          if (arrayBuffer.byteLength < 1000) {
            // Small responses for image generation are likely errors
            const text = new TextDecoder().decode(arrayBuffer);
            if (text.includes('loading') || text.includes('warming up')) {
              // This is a valid response (model loading)
              if (DEBUG) console.log(`[CORS Proxy] ${proxy} returned loading message`);
            } else {
              // This is likely corrupted/invalid data
              throw new Error(`Proxy returned invalid data: received only ${arrayBuffer.byteLength} bytes`);
            }
          }
        } catch (validationError) {
          // We'll just log this but still use the response
          console.warn(`[CORS Proxy] Response validation warning:`, validationError);
        }
      }
      
      proxyStatus[proxy].success++;
      if (DEBUG) console.log(`[CORS Proxy] ${proxy} succeeded!`);
      return response;
    } catch (proxyError) {
      proxyStatus[proxy].failure++;
      errors.push(`${proxy}: ${proxyError.message}`);
      console.warn(`[CORS Proxy] ${proxy} failed:`, proxyError);
      // Continue to the next proxy
    }
  }
  
  // If all proxies fail, throw a more informative error with all collected errors
  throw new Error(`All CORS proxies failed. Errors: ${errors.join(' | ')}`);
}

// Export proxy status for debugging
export const getProxyStatus = () => ({ ...proxyStatus }); 