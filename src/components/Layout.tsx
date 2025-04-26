
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, BarChart2, Zap } from 'lucide-react';

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
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-brand-purple" />
                <span className="ml-2 text-xl font-bold text-gray-900">VibeMarketing</span>
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
      
      {!isAuthenticated && !showNav && (
        <header className="bg-transparent absolute top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">VibeMarketing</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <a href="/login">Log in</a>
                </Button>
                <Button asChild size="sm" className="bg-white text-brand-purple hover:bg-white/90">
                  <a href="/signup">Sign up</a>
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-brand-purple" />
                <span className="ml-2 text-lg font-bold">VibeMarketing</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered marketing automation for solopreneurs and small businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-400">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-400">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Marketing Guide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-400">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 VibeMarketing. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
