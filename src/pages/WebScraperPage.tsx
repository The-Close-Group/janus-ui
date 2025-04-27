import { useState, useEffect } from 'react';
import { WebsiteForm } from '../components/WebsiteForm';
import { toast } from 'react-hot-toast';

const MAX_RETRIES = 3;
const TIMEOUT_MS = 30000; // 30 seconds

export function WebScraperPage() {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<{ title?: string; description?: string } | null>(null);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check if backend is accessible on component mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        console.log('%c🔍 Checking backend status...', 'color: #2563eb');
        const response = await fetch('http://localhost:4000/scrape?url=https://example.com', { 
          method: 'GET',
          headers: { 'Accept': 'text/html,application/json' },
          signal: AbortSignal.timeout(5000) // 5 second timeout for just the check
        });
        
        if (response.ok) {
          console.log('%c✅ Backend is accessible!', 'color: #059669; font-weight: bold;');
          setBackendStatus('online');
        } else {
          console.log('%c⚠️ Backend returned non-OK status:', 'color: #d97706', response.status);
          setBackendStatus('offline');
        }
      } catch (err) {
        console.error('%c❌ Backend check failed:', 'color: #dc2626', err);
        setBackendStatus('offline');
      }
    };
    
    checkBackend();
  }, []);

  const fetchWithTimeout = async (url: string, options = {}) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  };

  const handleSubmit = async (url: string, retryCount = 0) => {
    console.log('%c🚀 Starting request to scrape URL: ' + url, 'font-size: 14px; color: #6366f1; font-weight: bold;');
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('%c📤 Sending request to backend...', 'color: #2563eb');
      
      // Use the URL parameter approach as specified in the requirements
      // Try using the full URL to the backend server
      const backendUrl = 'http://localhost:4000/scrape';
      console.log('%c🔗 Full request URL:', 'color: #2563eb', `${backendUrl}?url=${encodeURIComponent(url)}`);
      
      const response = await fetchWithTimeout(`${backendUrl}?url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/json',
        }
      });

      console.log('%c📥 Received response:', 'color: #059669', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        // Retry on 5xx server errors
        if (response.status >= 500 && retryCount < MAX_RETRIES) {
          console.log(`Retrying request (attempt ${retryCount + 1} of ${MAX_RETRIES})...`);
          setIsLoading(false);
          return handleSubmit(url, retryCount + 1);
        }
        
        let errorMessage = `Failed to fetch website data: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch {
          // If we can't parse the error JSON, use the default message
        }
        throw new Error(errorMessage);
      }

      // Get response as text as per requirements
      const htmlText = await response.text();
      
      // Log the HTML to console as per requirements
      console.log('%c🌐 Scraped HTML Content:', 'background:#f0f0f0; color:#333; font-size:14px; padding:5px;');
      console.log(htmlText);
      
      setHtml(htmlText);
      setError(null);
      
      // Show success toast
      toast.success('Website scraped successfully!', {
        duration: 5000,
        position: 'top-right'
      });
      
      console.log('%c✅ Successfully updated state with scraped data', 'color: #059669; font-weight: bold;');
    } catch (err) {
      console.group('%c❌ Error Details', 'color: #dc2626; font-weight: bold;');
      console.error('Error object:', err);
      console.error('Error message:', err instanceof Error ? err.message : 'Unknown error');
      console.error('Stack trace:', err instanceof Error ? err.stack : 'No stack trace');
      console.groupEnd();
      
      let errorMessage = 'An error occurred';
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Request timed out. Please try again.';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Could not connect to the server. Please check if the backend is running.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setHtml(null);
      setMetadata(null);
      
      // Show error toast
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-right'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {backendStatus === 'checking' && (
          <div className="mb-6 bg-blue-50 p-4 rounded-md">
            <p className="text-blue-700 flex items-center">
              <span className="animate-spin inline-block mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></span>
              Checking connection to backend server...
            </p>
          </div>
        )}
        
        {backendStatus === 'offline' && (
          <div className="mb-6 bg-red-50 p-4 rounded-md">
            <p className="text-red-700">
              ⚠️ Backend server appears to be offline. Make sure it's running at http://localhost:4000.
            </p>
            <p className="text-xs text-red-600 mt-2">
              Run <code className="bg-red-100 px-1 py-0.5 rounded">cd backend && python main.py</code> to start the server.
            </p>
          </div>
        )}
      
        <WebsiteForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        {error && (
          <div className="mt-8 bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-3 text-gray-700">Loading...</span>
          </div>
        )}

        {html && !isLoading && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scraped HTML:</h2>
            <div id="preview" className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[500px] text-sm font-mono">
              <pre>{html}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}