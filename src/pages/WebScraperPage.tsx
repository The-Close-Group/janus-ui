import { useState, useEffect } from 'react';
import { WebsiteForm } from '../components/WebsiteForm';
import { toast } from 'react-hot-toast';

const MAX_RETRIES = 3;
const TIMEOUT_MS = 30000; // 30 seconds

interface RelatedPage {
  url: string;
  title: string;
  markdown: string;
}

interface ScrapingResult {
  url: string;
  title: string;
  description?: string;
  html: string;
  markdown: string;
  related_pages: RelatedPage[];
}

export function WebScraperPage() {
  const [html, setHtml] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [relatedPages, setRelatedPages] = useState<RelatedPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<{ title?: string; description?: string } | null>(null);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [activeTab, setActiveTab] = useState<'markdown' | 'html' | 'related'>('markdown');
  const [selectedRelatedPage, setSelectedRelatedPage] = useState<number | null>(null);

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
    setHtml(null);
    setMarkdown(null);
    setRelatedPages([]);
    setMetadata(null);
    setSelectedRelatedPage(null);
    setActiveTab('markdown');
    
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
        const errorText = await response.text();
        console.error('%c❌ Error from backend:', 'color: #dc2626', errorText);
        
        if (retryCount < MAX_RETRIES) {
          console.log(`%c🔄 Retry attempt ${retryCount + 1}/${MAX_RETRIES}...`, 'color: #d97706');
          toast.error(`Request failed. Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
          return handleSubmit(url, retryCount + 1);
        }
        
        setError(`Failed to scrape the website. Server responded with: ${response.status} ${response.statusText}`);
        toast.error('Failed to scrape website after multiple attempts.');
        setIsLoading(false);
        return;
      }

      // Try to parse as JSON first
      let data: ScrapingResult;
      try {
        data = await response.json();
        console.log('%c📊 Parsed JSON response:', 'color: #059669');
        
        // Set HTML and metadata
        setHtml(data.html);
        setMarkdown(data.markdown);
        setRelatedPages(data.related_pages || []);
        setMetadata({
          title: data.title,
          description: data.description
        });
        
        toast.success('Website scraped successfully!');
      } catch (jsonError) {
        // If not JSON, treat as plain HTML
        console.log('%c📄 Treating response as plain HTML (non-JSON)...', 'color: #2563eb');
        const htmlText = await response.text();
        setHtml(htmlText);
        toast.success('Website scraped (raw HTML only).');
      }
      
      setIsLoading(false);
    } catch (err: any) {
      console.error('%c❌ Error during fetch:', 'color: #dc2626', err);
      
      if (err.name === 'AbortError') {
        setError('Request timed out. The website might be too large or slow to respond.');
        toast.error('Request timed out.');
      } else if (retryCount < MAX_RETRIES) {
        console.log(`%c🔄 Retry attempt ${retryCount + 1}/${MAX_RETRIES}...`, 'color: #d97706');
        toast.error(`Connection error. Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
        return handleSubmit(url, retryCount + 1);
      } else {
        setError(`Network error: ${err.message}`);
        toast.error('Failed to connect after multiple attempts.');
      }
      
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
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

        {(html || markdown || relatedPages.length > 0) && !isLoading && (
          <div className="mt-8 bg-white rounded-lg shadow-md">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('markdown')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'markdown'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Markdown
                </button>
                <button
                  onClick={() => setActiveTab('html')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'html'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  HTML
                </button>
                <button
                  onClick={() => setActiveTab('related')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center ${
                    activeTab === 'related'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Related Pages
                  {relatedPages.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {relatedPages.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'markdown' && markdown && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Markdown Content:</h2>
                  <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[600px] text-sm font-mono">
                    <pre>{markdown}</pre>
                  </div>
                </div>
              )}

              {activeTab === 'html' && html && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">HTML Content:</h2>
                  <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[600px] text-sm font-mono">
                    <pre>{html}</pre>
                  </div>
                </div>
              )}

              {activeTab === 'related' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Pages ({relatedPages.length}):</h2>
                  {relatedPages.length === 0 ? (
                    <p className="text-gray-500">No related pages found.</p>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="lg:col-span-1 border-r border-gray-200 pr-4">
                        <ul className="space-y-2">
                          {relatedPages.map((page, index) => (
                            <li key={index}>
                              <button
                                onClick={() => setSelectedRelatedPage(index)}
                                className={`w-full text-left p-3 rounded-md ${
                                  selectedRelatedPage === index
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                <h3 className="font-medium truncate">{page.title || 'Untitled Page'}</h3>
                                <p className="text-xs text-gray-500 truncate">{page.url}</p>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="lg:col-span-2">
                        {selectedRelatedPage !== null ? (
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-medium">{relatedPages[selectedRelatedPage]?.title || 'Untitled Page'}</h3>
                              <a
                                href={relatedPages[selectedRelatedPage]?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-purple-600 hover:underline"
                              >
                                Visit Page ↗
                              </a>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[500px] text-sm font-mono">
                              <pre>{relatedPages[selectedRelatedPage]?.markdown || ''}</pre>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            Select a page from the left to view its content
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}