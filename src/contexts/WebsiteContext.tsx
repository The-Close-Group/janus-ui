
import React, { createContext, useContext, useState, useEffect } from 'react';

interface WebsiteContextType {
  website: string | null;
  setWebsiteUrl: (url: string) => void;
  hasWebsite: boolean;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export function WebsiteProvider({ children }: { children: React.ReactNode }) {
  const [website, setWebsite] = useState<string | null>(null);

  useEffect(() => {
    // Check if website URL is stored in localStorage
    const storedWebsite = localStorage.getItem('website');
    if (storedWebsite) {
      setWebsite(storedWebsite);
    }
  }, []);

  const setWebsiteUrl = (url: string) => {
    setWebsite(url);
    localStorage.setItem('website', url);
  };

  return (
    <WebsiteContext.Provider value={{ 
      website,
      setWebsiteUrl,
      hasWebsite: !!website
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
