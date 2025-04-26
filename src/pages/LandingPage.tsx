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

const LandingPage: React.FC = () => {
  return (
    <Layout showNav={false}>
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-b from-indigo-900 via-brand-indigo to-brand-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fadeIn">
                <span className="block">Optimize and manage your marketing.</span>
              </h1>
              <p className="text-xl mb-8 text-white/90 max-w-xl">
                From zero to hero: Instantly create, optimize, and automate your marketing strategy across all your channels with our AI platform. Perfect for solopreneurs and small teams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                  <Link to="/signup">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-brand-purple/20">
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl transform rotate-1 hover:rotate-0 transition-all duration-300">
                {/* Custom SVG: AI-powered social media dashboard */}
                <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rounded-lg shadow-lg">
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
                <div className="absolute -top-4 -right-4 bg-brand-purple text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-brand-purple/10 to-brand-indigo/10 p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center">
              <div className="bg-brand-purple/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Instagram className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect your channel</h3>
              <p className="text-gray-600 text-center">Easily connect all your marketing channels in one place.</p>
            </div>
            <div className="bg-gradient-to-br from-brand-blue/10 to-brand-indigo/10 p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimize and manage</h3>
              <p className="text-gray-600 text-center">Effortlessly manage, schedule, and optimize your entire marketing strategy across every channel.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Social Media Marketing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build and maintain a powerful Instagram and Facebook presence, without the hassle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-r from-brand-purple to-brand-indigo p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
                <CardTitle>AI Content Generation</CardTitle>
                <CardDescription>Create engaging Instagram and Facebook posts tailored to your brand.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Branded posts in seconds</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Copywriting for posts and captions</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Style matched to your brand</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-r from-brand-indigo to-brand-blue p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Audience Targeting</CardTitle>
                <CardDescription>Reach the right people with smart targeting recommendations.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>AI audience analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Hashtag optimization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Best time to post suggestions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-r from-brand-blue to-brand-purple p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Auto Engagement</CardTitle>
                <CardDescription>Let AI handle comments and messages for you.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Smart comment replies</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Automated message handling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>24/7 engagement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by Entrepreneurs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what solopreneurs and small businesses say about our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <p className="text-gray-700 mb-4">"This platform literally saved me hours every week. The AI content is spot on with our brand voice, and our Instagram engagement has grown by 300%."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-medium">Sara T.</h4>
                  <p className="text-sm text-gray-500">Solopreneur</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <p className="text-gray-700 mb-4">"As a developer, I had no time for marketing. This AI tool handles my Instagram and Facebook marketing while I focus on coding. I'm getting clients from social now!"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-medium">Mike R.</h4>
                  <p className="text-sm text-gray-500">Vibe Coder</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <p className="text-gray-700 mb-4">"Our small coffee shop was struggling with social media. Now we have a consistent Instagram and Facebook presence, and customers mention our posts daily!"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-medium">Jamal K.</h4>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-indigo to-brand-purple py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Social Media?</h2>
              <p className="text-xl opacity-90 mb-6">
                Join thousands of businesses who've simplified their Instagram and Facebook marketing with our AI-powered platform.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-6 w-6 mr-2 text-white" />
                  <span>No marketing experience needed</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 mr-2 text-white" />
                  <span>Set up in under 5 minutes</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 mr-2 text-white" />
                  <span>14-day free trial, no credit card required</span>
                </li>
              </ul>
              <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-center">What You'll Get</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Instagram className="h-5 w-5" />
                    </div>
                    <span>Instagram Content Generation</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Facebook className="h-5 w-5" />
                    </div>
                    <span>Facebook Marketing Automation</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <span>Automated Engagement</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Target className="h-5 w-5" />
                    </div>
                    <span>Smart Audience Targeting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi Channel Marketing (Custom) Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 local-mcm2-header">multi channel marketing</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-4 relative local-mcm2-row">
            {/* Card 1 */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center local-mcm2-card">
              <div className="bg-brand-purple/10 p-4 rounded-full mb-4">
                <Instagram className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">unifying content Management</h3>
              <p className="text-gray-600">Centralize all your social posts in one hub.</p>
            </div>
            {/* Arrow 1 */}
            <div className="hidden md:flex flex-col items-center justify-center local-mcm2-arrow">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="arrow2-gradient-1" x1="0" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#7C3AED" />
                    <stop offset="1" stop-color="#6366F1" />
                  </linearGradient>
                </defs>
                <path d="M8 24H40M40 24L32 16M40 24L32 32" stroke="url(#arrow2-gradient-1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            {/* Card 2 */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center local-mcm2-card">
              <div className="bg-brand-indigo/10 p-4 rounded-full mb-4">
                <Zap className="h-8 w-8 text-brand-indigo" />
              </div>
              <h3 className="text-xl font-bold mb-2">optimizing content</h3>
              <p className="text-gray-600">Auto-tune posts for maximum engagement.</p>
            </div>
            {/* Arrow 2 */}
            <div className="hidden md:flex flex-col items-center justify-center local-mcm2-arrow">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="arrow2-gradient-2" x1="0" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#6366F1" />
                    <stop offset="1" stop-color="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M8 24H40M40 24L32 16M40 24L32 32" stroke="url(#arrow2-gradient-2)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            {/* Card 3 */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center local-mcm2-card">
              <div className="bg-brand-blue/10 p-4 rounded-full mb-4">
                <Target className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Demographic Testing</h3>
              <p className="text-gray-600">Target the right audience with AI-driven tests.</p>
            </div>
          </div>
          {/* Mobile Arrows */}
          <div className="flex flex-col md:hidden items-center gap-0 mt-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-2 rotate-90">
              <defs>
                <linearGradient id="arrow2-gradient-mobile-1" x1="0" y1="16" x2="32" y2="16" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#7C3AED" />
                  <stop offset="1" stop-color="#6366F1" />
                </linearGradient>
              </defs>
              <path d="M4 16H28M28 16L20 8M28 16L20 24" stroke="url(#arrow2-gradient-mobile-1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-2 rotate-90">
              <defs>
                <linearGradient id="arrow2-gradient-mobile-2" x1="0" y1="16" x2="32" y2="16" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#6366F1" />
                  <stop offset="1" stop-color="#3B82F6" />
                </linearGradient>
              </defs>
              <path d="M4 16H28M28 16L20 8M28 16L20 24" stroke="url(#arrow2-gradient-mobile-2)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <style>{`
          /* Scoped styles for Multi Channel Marketing v2 section */
          .local-mcm2-header { letter-spacing: -0.01em; }
          .local-mcm2-card { transition: box-shadow 0.2s; }
          .local-mcm2-card:hover { box-shadow: 0 8px 32px 0 rgba(124,58,237,0.10), 0 1.5px 6px 0 rgba(99,102,241,0.08); }
          .local-mcm2-arrow svg { display: block; }
        `}</style>
      </section>
    </Layout>
  );
};

export default LandingPage;
