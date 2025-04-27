import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebsite } from '@/contexts/WebsiteContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

// Define interface for the scraper response
interface ScraperResponse {
  url: string;
  title: string;
  description?: string;
  html: string;
  markdown: string;
  related_pages: Array<{
    url: string;
    title: string;
    markdown: string;
  }>;
}

const WebsiteForm: React.FC = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setWebsiteUrl: saveWebsiteUrl } = useWebsite();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('%c📄 WebsiteForm: Component mounted', 'color: #6366f1; font-weight: bold;');
    return () => {
      console.log('%c📄 WebsiteForm: Component unmounted', 'color: #6366f1; font-weight: bold;');
    };
  }, []);

  const isValidUrl = (url: string) => {
    console.log('%c🔍 WebsiteForm: Validating URL', 'color: #8b5cf6;', url);
    try {
      const parsedUrl = new URL(url);
      const isValid = ['http:', 'https:'].includes(parsedUrl.protocol);
      console.log('%c🔍 WebsiteForm: URL validation result', 'color: #8b5cf6;', { isValid, protocol: parsedUrl.protocol });
      return isValid;
    } catch (error) {
      console.log('%c❌ WebsiteForm: URL validation failed', 'color: #dc2626;', error);
      return false;
    }
  };

  const handleWebsiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    console.log('%c🔤 WebsiteForm: URL field changed', 'color: #8b5cf6;', newUrl);
    setWebsiteUrl(newUrl);
  };

  const callBackendScraper = async (url: string): Promise<ScraperResponse | null> => {
    console.log('%c🔄 WebsiteForm: Calling backend scraper API', 'color: #2563eb; font-weight: bold;', url);
    try {
      const backendUrl = 'http://localhost:4000/scrape';
      const encodedUrl = encodeURIComponent(url);
      const fullUrl = `${backendUrl}?url=${encodedUrl}`;
      
      console.log('%c🌐 WebsiteForm: Making API request to', 'color: #2563eb;', fullUrl);
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('%c❌ WebsiteForm: Backend API error', 'color: #dc2626;', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Backend error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('%c✅ WebsiteForm: Received scraper response', 'color: #059669;', {
        title: data.title,
        markdownLength: data.markdown?.length || 0,
        relatedPagesCount: data.related_pages?.length || 0
      });
      
      return data as ScraperResponse;
    } catch (error) {
      console.error('%c❌ WebsiteForm: Failed to call backend scraper', 'color: #dc2626; font-weight: bold;', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('%c🚀 WebsiteForm: Form submitted', 'color: #2563eb; font-weight: bold;', { websiteUrl });
    
    if (!websiteUrl.trim()) {
      console.log('%c❌ WebsiteForm: Empty URL submitted', 'color: #dc2626;');
      toast.error('Please enter a website URL');
      return;
    }
    
    // Add http:// prefix if missing
    let formattedUrl = websiteUrl;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      console.log('%c🔄 WebsiteForm: Adding https:// prefix to URL', 'color: #8b5cf6;', 
        { before: formattedUrl, after: 'https://' + formattedUrl });
      formattedUrl = 'https://' + formattedUrl;
    }
    
    if (!isValidUrl(formattedUrl)) {
      console.log('%c❌ WebsiteForm: Invalid URL format', 'color: #dc2626;', formattedUrl);
      toast.error('Please enter a valid URL');
      return;
    }
    
    setIsSubmitting(true);
    console.log('%c⏳ WebsiteForm: Setting isSubmitting to true', 'color: #d97706;');
    
    try {
      // Call the backend scraper API first
      console.log('%c🔍 WebsiteForm: Starting backend scraping process', 'color: #0ea5e9;');
      const scraperResponse = await callBackendScraper(formattedUrl);
      
      if (scraperResponse) {
        console.log('%c📋 WebsiteForm: Scraper response details', 'color: #059669;', {
          url: scraperResponse.url,
          title: scraperResponse.title,
          markdownLength: scraperResponse.markdown.length,
          relatedPages: scraperResponse.related_pages.length
        });
        
        // Store the full response in localStorage for reference in the dashboard
        localStorage.setItem('scraperResult', JSON.stringify(scraperResponse));
        
        console.log('%c💾 WebsiteForm: Saving website URL and scraper data', 'color: #059669;', formattedUrl);
        saveWebsiteUrl(formattedUrl);
        
        toast.success('Website scraped and analyzed successfully!');
      } else {
        // If the scraper failed, we'll still continue but with a warning
        console.warn('%c⚠️ WebsiteForm: Proceeding without scraper data', 'color: #d97706;');
        saveWebsiteUrl(formattedUrl);
        toast.warning('Website added but scraping failed. Some features may be limited.');
      }
      
      console.log('%c🔄 WebsiteForm: Navigating to dashboard', 'color: #059669; font-weight: bold;');
      navigate('/dashboard');
    } catch (error) {
      console.error('%c❌ WebsiteForm: Error processing website', 'color: #dc2626; font-weight: bold;', error);
      toast.error('An error occurred while processing the website');
    } finally {
      console.log('%c⏳ WebsiteForm: Setting isSubmitting to false', 'color: #d97706;');
      setIsSubmitting(false);
    }
  };

  return (
    <Layout showNav>
      <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <div className="bg-brand-purple/10 p-4 rounded-full">
                  <Globe className="h-8 w-8 text-brand-purple" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Add your website</CardTitle>
              <CardDescription className="text-center">
                Enter your website URL to start tracking analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input 
                    id="website" 
                    type="text"
                    placeholder="e.g., https://example.com" 
                    value={websiteUrl}
                    onChange={handleWebsiteUrlChange}
                    onFocus={() => console.log('%c🔍 WebsiteForm: URL field focused', 'color: #8b5cf6;')}
                    onBlur={() => console.log('%c🔍 WebsiteForm: URL field blurred', 'color: #8b5cf6;', websiteUrl)}
                    required
                  />
                  <p className="text-xs text-gray-500">Enter the full URL including https://</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-brand-purple hover:bg-brand-purple/90"
                  disabled={isSubmitting}
                  onClick={() => console.log('%c🔘 WebsiteForm: Submit button clicked', 'color: #8b5cf6;')}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Scraping website...
                    </>
                  ) : 'Scrape & Analyze Website'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-xs text-gray-500">
                We'll analyze your website and provide detailed analytics on the dashboard
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default WebsiteForm;
