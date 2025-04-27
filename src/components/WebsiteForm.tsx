import { useState } from 'react';

interface WebsiteFormProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export function WebsiteForm({ onSubmit, isLoading = false }: WebsiteFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-center mb-8">
        <div className="p-4 bg-purple-100 rounded-full">
          <svg
            className="w-8 h-8 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">Add your website</h2>
      <p className="text-gray-600 text-center mb-8">
        Enter your website URL to start scraping
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="website-url" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Website URL
          </label>
          <input
            type="url"
            id="website-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://example.com"
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter the full URL including https://
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Scraping...
            </div>
          ) : (
            'Scrape Website'
          )}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        Check the browser console to see the scraped HTML
      </p>
    </div>
  );
} 