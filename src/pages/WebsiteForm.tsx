
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebsite } from '@/contexts/WebsiteContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const WebsiteForm: React.FC = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setWebsiteUrl: saveWebsiteUrl } = useWebsite();
  const navigate = useNavigate();

  const isValidUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return ['http:', 'https:'].includes(parsedUrl.protocol);
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!websiteUrl.trim()) {
      toast.error('Please enter a website URL');
      return;
    }
    
    // Add http:// prefix if missing
    let formattedUrl = websiteUrl;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    if (!isValidUrl(formattedUrl)) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to validate the URL
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      saveWebsiteUrl(formattedUrl);
      toast.success('Website added successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('An error occurred while adding the website');
      console.error(error);
    } finally {
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
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">Enter the full URL including https://</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-brand-purple hover:bg-brand-purple/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding website...
                    </>
                  ) : 'Continue to dashboard'}
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
