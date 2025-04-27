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
    console.log('%c🔍 WebsiteContext: Provider mounted', 'color: #6366f1; font-weight: bold;');
    
    // Check if website URL is stored in localStorage
    const storedWebsite = localStorage.getItem('website');
    if (storedWebsite) {
      console.log('%c💾 WebsiteContext: Found stored website URL', 'color: #059669;', storedWebsite);
      setWebsite(storedWebsite);
    } else {
      console.log('%c❓ WebsiteContext: No stored website URL found', 'color: #d97706;');
    }
    
    return () => {
      console.log('%c🔍 WebsiteContext: Provider unmounted', 'color: #6366f1; font-weight: bold;');
    };
  }, []);

  // Effect to handle when analysis completes
  useEffect(() => {
    if (analyzingProgress === 100 && isAnalyzing) {
      console.log('%c✅ WebsiteContext: Analysis completed', 'color: #059669; font-weight: bold;');
      setIsAnalyzing(false);
      
      // Show success message after analysis
      toast({
        title: "Website successfully analyzed!",
        description: "Your marketing strategy is being created.",
      });
    }
  }, [analyzingProgress, isAnalyzing]);

  const setWebsiteUrl = (url: string) => {
    console.log('%c🌐 WebsiteContext: setWebsiteUrl called', 'color: #2563eb; font-weight: bold;', url);
    
    // Store website
    console.log('%c💾 WebsiteContext: Saving website URL', 'color: #059669;', url);
    setWebsite(url);
    localStorage.setItem('website', url);
    
    // Start analyzing animation
    console.log('%c⏳ WebsiteContext: Starting analysis simulation', 'color: #d97706;');
    setIsAnalyzing(true);
    setAnalyzingProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalyzingProgress(prev => {
        const newProgress = prev >= 100 ? 100 : prev + 5;
        console.log('%c📊 WebsiteContext: Analysis progress updated', 'color: #8b5cf6;', `${newProgress}%`);
        
        if (newProgress >= 100) {
          console.log('%c🛑 WebsiteContext: Clearing analysis interval', 'color: #dc2626;');
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);
    
    // Clean up interval if component unmounts during analysis
    return () => {
      console.log('%c🛑 WebsiteContext: Clearing analysis interval', 'color: #dc2626;');
      clearInterval(interval);
    };
  };
  
  const clearWebsite = () => {
    console.log('%c🗑️ WebsiteContext: Clearing website data', 'color: #dc2626; font-weight: bold;');
    setWebsite(null);
    localStorage.removeItem('website');
  };

  const contextValue = {
    website,
    setWebsiteUrl,
    hasWebsite: !!website,
    clearWebsite,
    isAnalyzing,
    analyzingProgress
  };

  console.log('%c🔄 WebsiteContext: Context value updated', 'color: #8b5cf6;', {
    website,
    hasWebsite: !!website,
    isAnalyzing,
    analyzingProgress
  });

  return (
    <WebsiteContext.Provider value={contextValue}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    console.error('%c❌ WebsiteContext: useWebsite called outside of WebsiteProvider', 'color: #dc2626; font-weight: bold;');
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}
