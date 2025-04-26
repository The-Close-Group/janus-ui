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
                <span className="block">AI-Powered</span>
                <span className="text-brand-purple bg-white rounded-lg px-3 py-1 inline-block">Social Media</span>
                <span className="block mt-2">Marketing Automation</span>
              </h1>
              <p className="text-xl mb-8 text-white/90 max-w-xl">
                From zero to hero: Instantly create, optimize, and automate your Instagram and Facebook marketing strategy with our AI platform. Perfect for solopreneurs and small teams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                  <Link to="/signup">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl transform rotate-1 hover:rotate-0 transition-all duration-300">
                <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rounded-lg shadow-lg">
                  <rect x="30" y="40" width="340" height="200" rx="24" fill="#fff" fillOpacity="0.9"/>
                  <rect x="60" y="70" width="280" height="40" rx="10" fill="#7C3AED" fillOpacity="0.15"/>
                  <rect x="60" y="120" width="180" height="20" rx="6" fill="#6366F1" fillOpacity="0.2"/>
                  <rect x="60" y="150" width="120" height="20" rx="6" fill="#A78BFA" fillOpacity="0.2"/>
                  <rect x="60" y="180" width="80" height="20" rx="6" fill="#C4B5FD" fillOpacity="0.2"/>
                  <circle cx="320" cy="180" r="28" fill="#7C3AED" fillOpacity="0.15"/>
                  <g>
                    <circle cx="320" cy="180" r="18" fill="#fff"/>
                    <path d="M320 170v20M310 180h20" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round"/>
                  </g>
                  <g>
                    <rect x="90" y="200" width="40" height="40" rx="12" fill="#fff"/>
                    <g>
                      <circle cx="110" cy="220" r="10" fill="#E1306C"/>
                      <rect x="105" y="215" width="10" height="10" rx="2" fill="#fff"/>
                    </g>
                  </g>
                  <g>
                    <rect x="140" y="200" width="40" height="40" rx="12" fill="#fff"/>
                    <g>
                      <rect x="155" y="215" width="10" height="10" rx="2" fill="#1877F3"/>
                      <rect x="160" y="220" width="5" height="10" rx="2" fill="#fff"/>
                    </g>
                  </g>
                  <g>
                    <rect x="190" y="200" width="40" height="40" rx="12" fill="#fff"/>
                    <g>
                      <circle cx="210" cy="220" r="10" fill="#6366F1"/>
                      <path d="M210 215v10M205 220h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </g>
                  </g>
                  <g>
                    <rect x="240" y="200" width="40" height="40" rx="12" fill="#fff"/>
                    <g>
                      <circle cx="260" cy="220" r="10" fill="#10B981"/>
                      <path d="M255 220l5 5 5-10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </g>
                  </g>
                  <g>
                    <circle cx="200" cy="100" r="16" fill="#A78BFA" fillOpacity="0.3"/>
                    <path d="M200 90v20M190 100h20" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
                  </g>
                </svg>
                <div className="absolute -top-4 -right-4 bg-brand-purple text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  AI-Powered
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="w-full overflow-hidden leading-none">
          <svg className="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Three Simple Steps to Social Media Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform handles everything from content creation to engagement and optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-md border border-gray-100 transform transition-all duration-300 hover:translate-y-[-8px]">
              <div className="bg-brand-purple/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Instagram className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Connect Your Social Media</h3>
              <p className="text-gray-600">Connect your Instagram and Facebook accounts seamlessly.</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-md border border-gray-100 transform transition-all duration-300 hover:translate-y-[-8px]">
              <div className="bg-brand-indigo/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-brand-indigo" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. AI Content Generation</h3>
              <p className="text-gray-600">Our AI crafts perfectly tailored posts for your brand and audience.</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-md border border-gray-100 transform transition-all duration-300 hover:translate-y-[-8px]">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Rocket className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Watch It Grow</h3>
              <p className="text-gray-600">Automated posting, engagement, and growth strategies kick in automatically.</p>
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
    </Layout>
  );
};

export default LandingPage;
