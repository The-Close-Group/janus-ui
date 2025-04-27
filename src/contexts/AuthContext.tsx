import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  email: string;
  name: string;
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('%c🔍 AuthContext: Provider mounted', 'color: #6366f1; font-weight: bold;');
    
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('%c💾 AuthContext: Found stored user data', 'color: #059669;');
      setUser(JSON.parse(storedUser));
    } else {
      console.log('%c❓ AuthContext: No stored user data found', 'color: #d97706;');
    }
    
    setIsLoading(false);
    console.log('%c⏳ AuthContext: Initial loading completed', 'color: #d97706;');
    
    return () => {
      console.log('%c🔍 AuthContext: Provider unmounted', 'color: #6366f1; font-weight: bold;');
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you would validate with a backend
    // This is a mock implementation
    console.log('%c🔒 AuthContext: Login attempt', 'color: #2563eb; font-weight: bold;', { email });
    
    try {
      console.log('%c⏳ AuthContext: Setting isLoading to true', 'color: #d97706;');
      setIsLoading(true);
      
      // Simulate API call
      console.log('%c⏱️ AuthContext: Simulating API call for login', 'color: #0ea5e9;');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (email && password.length >= 6) {
        const newUser = { email, name: email.split('@')[0] };
        console.log('%c✅ AuthContext: Login successful', 'color: #059669; font-weight: bold;', newUser);
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      }
      
      console.log('%c❌ AuthContext: Login validation failed', 'color: #dc2626;', 
        { validEmail: !!email, validPassword: password.length >= 6 });
      return false;
    } finally {
      console.log('%c⏳ AuthContext: Setting isLoading to false', 'color: #d97706;');
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    console.log('%c🔒 AuthContext: Signup attempt', 'color: #2563eb; font-weight: bold;', { name, email });
    
    try {
      console.log('%c⏳ AuthContext: Setting isLoading to true', 'color: #d97706;');
      setIsLoading(true);
      
      // Simulate API call
      console.log('%c⏱️ AuthContext: Simulating API call for signup', 'color: #0ea5e9;');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (name && email && password.length >= 6) {
        const newUser = { email, name };
        console.log('%c✅ AuthContext: Signup successful', 'color: #059669; font-weight: bold;', newUser);
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      }
      
      console.log('%c❌ AuthContext: Signup validation failed', 'color: #dc2626;', 
        { validName: !!name, validEmail: !!email, validPassword: password.length >= 6 });
      return false;
    } finally {
      console.log('%c⏳ AuthContext: Setting isLoading to false', 'color: #d97706;');
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('%c🚪 AuthContext: Logging out user', 'color: #dc2626; font-weight: bold;', user);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('website');
    console.log('%c🗑️ AuthContext: User and website data cleared from storage', 'color: #dc2626;');
  };

  const contextValue = {
    user, 
    login, 
    signup,
    logout, 
    isAuthenticated: !!user,
    isLoading
  };

  console.log('%c🔄 AuthContext: Context value updated', 'color: #8b5cf6;', {
    isAuthenticated: !!user, 
    isLoading,
    userEmail: user?.email
  });

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error('%c❌ AuthContext: useAuth called outside of AuthProvider', 'color: #dc2626; font-weight: bold;');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
