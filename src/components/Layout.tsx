
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, BarChart2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNav = false }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {isAuthenticated && showNav && (
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <BarChart2 className="h-8 w-8 text-brand-purple" />
                <span className="ml-2 text-xl font-bold text-gray-900">LinkAnalytics</span>
              </div>
              {user && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="flex items-center gap-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </header>
      )}
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 LinkAnalytics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
