import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { 
  ArrowRight, 
  Zap, 
  Rocket, 
  Instagram, 
  Facebook,
  MessageSquare,
  Target,
  Check
} from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { useScrollFadeIn } from '@/hooks/use-scroll-fade-in';

const LandingPage: React.FC = () => {
  const fadeCard1 = useScrollFadeIn();
  const fadeCard2 = useScrollFadeIn();
  const fadeCard3 = useScrollFadeIn();
  const fadeMCMRow = useScrollFadeIn();
  const fadeCTA = useScrollFadeIn();

  return (
    <Layout showNav={false}>
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-b from-indigo-900 via-brand-indigo to-brand-purple min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-56 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-20">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 leading-tight animate-fadeIn">
                <span className="block">Optimize and manage your marketing.</span>
              </h1>
              <p className="text-3xl mb-16 text-white/90 max-w-2xl">
                From zero to hero: Instantly create, optimize, and automate your marketing strategy across all your channels with our AI platform. Perfect for solopreneurs and small teams.
              </p>
              <div className="flex flex-wrap gap-8">
                <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                  <Link to="/signup">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-brand-purple/20">
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-16 shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-300">
                {/* Custom SVG: AI-powered social media dashboard */}
                <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rounded-lg shadow-lg" style={{ minHeight: 400 }}>
                  <rect x="30" y="40" width="340" height="200" rx="24" fill="#fff" fillOpacity="0.95"/>
                  <rect x="60" y="70" width="280" height="40" rx="10" fill="#7C3AED" fillOpacity="0.13"/>
                  <rect x="60" y="120" width="180" height="20" rx="6" fill="#6366F1" fillOpacity="0.18"/>
                  <rect x="60" y="150" width="120" height="20" rx="6" fill="#A78BFA" fillOpacity="0.18"/>
                  <rect x="60" y="180" width="80" height="20" rx="6" fill="#C4B5FD" fillOpacity="0.18"/>
                  <g>
                    <circle cx="320" cy="180" r="28" fill="#7C3AED" fillOpacity="0.13"/>
                    <circle cx="320" cy="180" r="18" fill="#fff"/>
                    <path d="M320 170v20M310 180h20" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round"/>
                  </g>
                  {/* Social Media Icons */}
                  <g>
                    <rect x="90" y="200" width="40" height="40" rx="12" fill="#fff"/>
                    <circle cx="110" cy="220" r="10" fill="#E1306C"/>
                    <rect x="105" y="215" width="10" height="10" rx="2" fill="#fff"/>
                  </g>
                  <g>
                    <rect x="140" y="200" width="40" height="40" rx="12" fill="#fff"/>
                    <rect x="155" y="215" width="10" height="10" rx="2" fill="#1877F3"/>
                    <rect x="160" y="220" width="5" height="10" rx="2" fill="#fff"/>
                  </g>
                  <g>
                    <rect x="190" y="200" width="40" height="40" rx="12" fill="#fff"/>
                    <circle cx="210" cy="220" r="10" fill="#6366F1"/>
                    <path d="M210 215v10M205 220h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </g>
                  {/* AI/Automation Sparkles */}
                  <g>
                    <circle cx="200" cy="100" r="16" fill="#A78BFA" fillOpacity="0.3"/>
                    <path d="M200 90v20M190 100h20" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
                  </g>
                  {/* Subtle gear for automation */}
                  <g>
                    <circle cx="320" cy="90" r="10" fill="#C4B5FD" fillOpacity="0.5"/>
                    <path d="M320 85v10M315 90h10" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>
                </svg>
                <div className="absolute -top-4 -right-4 bg-brand-purple text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg">
                  AI-Powered
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tools for Success</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-brand-purple/10 to-brand-indigo/10 p-12 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center">
              <div className="bg-brand-purple/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                <Instagram className="h-12 w-12 text-brand-purple" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Connect your channel</h3>
              <p className="text-lg text-gray-600 text-center">Easily connect all your marketing channels in one place.</p>
            </div>
            <div className="bg-gradient-to-br from-brand-blue/10 to-brand-indigo/10 p-12 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center">
              <div className="bg-brand-blue/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                <Zap className="h-12 w-12 text-brand-blue" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Optimize and manage</h3>
              <p className="text-lg text-gray-600 text-center">Effortlessly manage, schedule, and optimize your entire marketing strategy across every channel.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Multi-Channel Marketing Section (Isolated) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 local-mcm-header">Multi-Channel Marketing</h2>
          <div ref={fadeMCMRow.ref} className={`flex flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-8 relative local-mcm-row ${fadeMCMRow.className}`}>
            {/* Card 1 */}
            <div className="flex-1 bg-white rounded-2xl shadow-2xl p-14 flex flex-col items-center text-center local-mcm-card">
              <div className="bg-brand-purple/10 p-6 rounded-full mb-6">
                <Instagram className="h-12 w-12 text-brand-purple" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Unifying Content Management</h3>
              <p className="text-lg text-gray-600">Centralize all your social posts in one hub.</p>
            </div>
            {/* Arrow 1 */}
            <div className="hidden md:flex flex-col items-center justify-center local-mcm-arrow">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="arrow-gradient-1" x1="0" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7C3AED" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
                <path d="M8 24H40M40 24L32 16M40 24L32 32" stroke="url(#arrow-gradient-1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Card 2 */}
            <div className="flex-1 bg-white rounded-2xl shadow-2xl p-14 flex flex-col items-center text-center local-mcm-card">
              <div className="bg-brand-indigo/10 p-6 rounded-full mb-6">
                <Zap className="h-12 w-12 text-brand-indigo" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Optimizing Content</h3>
              <p className="text-lg text-gray-600">Auto-tune posts for maximum engagement.</p>
            </div>
            {/* Arrow 2 */}
            <div className="hidden md:flex flex-col items-center justify-center local-mcm-arrow">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="arrow-gradient-2" x1="0" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="1" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M8 24H40M40 24L32 16M40 24L32 32" stroke="url(#arrow-gradient-2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Card 3 */}
            <div className="flex-1 bg-white rounded-2xl shadow-2xl p-14 flex flex-col items-center text-center local-mcm-card">
              <div className="bg-brand-blue/10 p-6 rounded-full mb-6">
                <Target className="h-12 w-12 text-brand-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Demographic Testing</h3>
              <p className="text-lg text-gray-600">Target the right audience with AI-driven tests.</p>
            </div>
          </div>
          {/* Mobile Arrows */}
          <div className="flex flex-col md:hidden items-center gap-0 mt-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-2 rotate-90">
              <defs>
                <linearGradient id="arrow-gradient-mobile-1" x1="0" y1="16" x2="32" y2="16" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#6366F1" />
                </linearGradient>
              </defs>
              <path d="M4 16H28M28 16L20 8M28 16L20 24" stroke="url(#arrow-gradient-mobile-1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-2 rotate-90">
              <defs>
                <linearGradient id="arrow-gradient-mobile-2" x1="0" y1="16" x2="32" y2="16" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <path d="M4 16H28M28 16L20 8M28 16L20 24" stroke="url(#arrow-gradient-mobile-2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <style>{`
          /* Scoped styles for Multi-Channel Marketing section */
          .local-mcm-header { letter-spacing: -0.01em; }
          .local-mcm-card { transition: box-shadow 0.2s; }
          .local-mcm-card:hover { box-shadow: 0 8px 32px 0 rgba(124,58,237,0.10), 0 1.5px 6px 0 rgba(99,102,241,0.08); }
          .local-mcm-arrow svg { display: block; }
          .fade-in { opacity: 1; transform: translateY(0); transition: opacity 1.5s, transform 1.5s; }
          .fade-out { opacity: 0; transform: translateY(40px); transition: opacity 1.5s, transform 1.5s; }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-indigo to-brand-purple py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="mb-12 md:mb-0 md:max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Marketing?</h2>
              <p className="text-2xl opacity-90 mb-8 max-w-2xl">
                Unlock the power of AI-driven optimization for your marketing campaigns. Effortlessly reach, engage, and convert large audiences with data-backed strategies.
              </p>
              <ul className="space-y-4 mb-10 text-lg">
                <li className="flex items-center">
                  <Check className="h-7 w-7 mr-3 text-white" />
                  <span>AI-powered campaign optimization</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-7 w-7 mr-3 text-white" />
                  <span>Population-scale targeting & insights</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-7 w-7 mr-3 text-white" />
                  <span>Fast setup, no expertise required</span>
                </li>
              </ul>
              <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            {/* Optimized Campaigns Card with Fade Effect */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div ref={fadeCTA.ref} className={`flex-1 bg-white rounded-2xl shadow-2xl p-14 flex flex-col items-center text-center local-mcm-card ${fadeCTA.className}`}> 
                <h3 className="text-2xl font-bold mb-6 text-brand-purple">What You'll Get</h3>
                <ul className="space-y-6 w-full">
                  <li className="flex items-center justify-center gap-4">
                    <Zap className="h-10 w-10 text-brand-indigo bg-brand-indigo/10 rounded-full p-2" />
                    <span className="text-xl font-medium text-gray-900">Automated Campaign Optimization</span>
                  </li>
                  <li className="flex items-center justify-center gap-4">
                    <Target className="h-10 w-10 text-brand-blue bg-brand-blue/10 rounded-full p-2" />
                    <span className="text-xl font-medium text-gray-900">Advanced Audience Targeting</span>
                  </li>
                  <li className="flex items-center justify-center gap-4">
                    <Rocket className="h-10 w-10 text-brand-purple bg-brand-purple/10 rounded-full p-2" />
                    <span className="text-xl font-medium text-gray-900">Scalable Results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
