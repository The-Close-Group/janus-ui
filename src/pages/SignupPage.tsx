import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('%c📄 SignupPage: Component mounted', 'color: #6366f1; font-weight: bold;');
    return () => {
      console.log('%c📄 SignupPage: Component unmounted', 'color: #6366f1; font-weight: bold;');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('%c🔒 SignupPage: Form submitted', 'color: #2563eb; font-weight: bold;', { name, email });
    setIsSubmitting(true);
    console.log('%c⏳ SignupPage: Setting isSubmitting to true', 'color: #d97706;');
    
    try {
      console.log('%c🔄 SignupPage: Calling signup function', 'color: #2563eb;');
      const success = await signup(name, email, password);
      console.log('%c✅ SignupPage: Signup result', 'color: #059669;', { success });
      
      if (success) {
        console.log('%c✅ SignupPage: Signup successful, navigating to /website', 'color: #059669; font-weight: bold;');
        toast.success('Account created successfully');
        navigate('/website');
      } else {
        console.log('%c❌ SignupPage: Signup failed', 'color: #dc2626;');
        toast.error('Failed to create account');
      }
    } catch (error) {
      console.error('%c❌ SignupPage: Error during signup', 'color: #dc2626; font-weight: bold;', error);
      toast.error('An error occurred during signup');
    } finally {
      console.log('%c⏳ SignupPage: Setting isSubmitting to false', 'color: #d97706;');
      setIsSubmitting(false);
    }
  };

  // Form field change handlers with logging
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('%c🔤 SignupPage: Name field changed', 'color: #8b5cf6;', e.target.value);
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('%c📧 SignupPage: Email field changed', 'color: #8b5cf6;', e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('%c🔑 SignupPage: Password field changed', 'color: #8b5cf6;', 
      { length: e.target.value.length, isValid: e.target.value.length >= 6 });
    setPassword(e.target.value);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center"
              onClick={() => console.log('%c🔗 SignupPage: Logo link clicked', 'color: #ec4899;')}
            >
              <BarChart2 className="h-10 w-10 text-brand-purple" />
              <span className="ml-2 text-2xl font-bold">LinkAnalytics</span>
            </Link>
          </div>
          
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-brand-purple hover:bg-brand-purple/90"
                  disabled={isSubmitting}
                  onClick={() => console.log('%c🔘 SignupPage: Submit button clicked', 'color: #8b5cf6;')}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : 'Sign up'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-sm text-center text-gray-500 mt-2">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-brand-purple hover:underline"
                  onClick={() => console.log('%c🔗 SignupPage: Login link clicked', 'color: #ec4899;')}
                >
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
