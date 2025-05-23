import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { WebsiteProvider, useWebsite } from "@/contexts/WebsiteContext";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import WebsiteForm from "@/pages/WebsiteForm";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import { WebScraperPage } from './pages/WebScraperPage';
import { Toaster as HotToaster } from 'react-hot-toast';

const queryClient = new QueryClient();

// Protected route that requires authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Route that checks if user has a website, otherwise redirects to the website form
const WebsiteRequiredRoute = ({ children }: { children: React.ReactNode }) => {
  const { hasWebsite } = useWebsite();
  
  if (!hasWebsite) {
    return <Navigate to="/website" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />} />
      
      <Route path="/website" element={
        <ProtectedRoute>
          <WebsiteProvider>
            <WebsiteForm />
          </WebsiteProvider>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <WebsiteProvider>
            <WebsiteRequiredRoute>
              <Dashboard />
            </WebsiteRequiredRoute>
          </WebsiteProvider>
        </ProtectedRoute>
      } />
      
      <Route path="/scraper" element={
        <ProtectedRoute>
          <WebScraperPage />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <HotToaster />
          <AppRoutes />
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
