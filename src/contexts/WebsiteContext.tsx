
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface WebsiteContextType {
  website: string | null;
  setWebsiteUrl: (url: string) => void;
  hasWebsite: boolean;
  clearWebsite: () => void;
  isAnalyzing: boolean;
  analyzingProgress: number;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export function WebsiteProvider({ children }: { children: React.ReactNode }) {
  const [website, setWebsite] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);

  useEffect(() => {
    // Check if website URL is stored in localStorage
    const storedWebsite = localStorage.getItem('website');
    if (storedWebsite) {
      setWebsite(storedWebsite);
    }
  }, []);

  const setWebsiteUrl = (url: string) => {
    // Start analyzing animation
    setIsAnalyzing(true);
    setAnalyzingProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalyzingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Store website and show success message after analysis
          setWebsite(url);
          localStorage.setItem('website', url);
          toast({
            title: "Website successfully analyzed!",
            description: "Your marketing strategy is being created.",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    
    // Clean up interval if component unmounts during analysis
    return () => clearInterval(interval);
  };
  
  const clearWebsite = () => {
    setWebsite(null);
    localStorage.removeItem('website');
  };

  return (
    <WebsiteContext.Provider value={{ 
      website,
      setWebsiteUrl,
      hasWebsite: !!website,
      clearWebsite,
      isAnalyzing,
      analyzingProgress
    }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}
