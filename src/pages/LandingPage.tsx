
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { 
  ArrowRight, 
  Zap, 
  Rocket, 
  BarChart2, 
  MessageSquare, 
  Target, 
  Instagram, 
  Facebook,
  Globe,
  Check
} from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-b from-indigo-900 via-brand-indigo to-brand-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fadeIn">
                <span className="block">Transform Your</span>
                <span className="text-brand-purple bg-white rounded-lg px-3 py-1 inline-block">Marketing</span>
                <span className="block mt-2">With AI-Powered Automation</span>
              </h1>
              <p className="text-xl mb-8 text-white/90 max-w-xl">
                From zero to hero: Instantly create, optimize, and automate your entire marketing strategy with our AI platform. Perfect for solopreneurs and small teams.
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
                <img 
                  src="/placeholder.svg" 
                  alt="AI Marketing Dashboard" 
                  className="w-full rounded-lg shadow-lg" 
                />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Three Simple Steps to Marketing Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform handles everything from content creation to optimization and engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-md border border-gray-100 transform transition-all duration-300 hover:translate-y-[-8px]">
              <div className="bg-brand-purple/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Connect Your Website</h3>
              <p className="text-gray-600">We analyze your website to understand your brand voice, audience, and market position.</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-md border border-gray-100 transform transition-all duration-300 hover:translate-y-[-8px]">
              <div className="bg-brand-indigo/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Instagram className="h-8 w-8 text-brand-indigo" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Connect Social Media</h3>
              <p className="text-gray-600">Link your social accounts and our AI will start crafting tailored content for your audience.</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-md border border-gray-100 transform transition-all duration-300 hover:translate-y-[-8px]">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Rocket className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Watch It Grow</h3>
              <p className="text-gray-600">Our AI continuously optimizes your marketing strategy, engaging with followers and improving conversions.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Marketing Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build and maintain a powerful marketing presence, without the hassle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-r from-brand-purple to-brand-indigo p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>AI Content Generation</CardTitle>
                <CardDescription>Create engaging posts and ads tailored to your brand voice.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Branded posts in seconds</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Copywriting for ads and captions</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>SEO optimization included</span>
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
                    <span>Message handling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>24/7 customer engagement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-r from-brand-purple to-brand-blue p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <BarChart2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>Track performance with detailed analytics.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Engagement metrics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Conversion tracking</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Growth analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-r from-brand-indigo to-brand-purple p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <Facebook className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Multi-Platform Support</CardTitle>
                <CardDescription>Manage all your social platforms in one place.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Instagram integration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Facebook management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Cross-platform posting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-r from-brand-blue to-brand-indigo p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Growth Strategy</CardTitle>
                <CardDescription>AI-driven marketing strategies tailored for your business.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Competitor analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Trend identification</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-purple mr-2" />
                    <span>Growth recommendations</span>
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
              See what solopreneurs, vibe coders, and small businesses say about our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <p className="text-gray-700 mb-4">"This platform literally saved me hours every week. The AI content is spot on with our brand voice, and our engagement has grown by 300%."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-medium">Sara T.</h4>
                  <p className="text-sm text-gray-500">Solopreneur</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <p className="text-gray-700 mb-4">"As a developer, I had no time for marketing. This AI tool handles it all for me while I focus on coding. I'm getting clients from social now!"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-medium">Mike R.</h4>
                  <p className="text-sm text-gray-500">Vibe Coder</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <p className="text-gray-700 mb-4">"Our small coffee shop was struggling with social media. Now we have a consistent presence and customers mention our posts daily!"</p>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
              <p className="text-xl opacity-90 mb-6">
                Join thousands of businesses who've simplified their marketing with our AI-powered platform.
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
                      <Zap className="h-5 w-5" />
                    </div>
                    <span>AI Content Creation</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <BarChart2 className="h-5 w-5" />
                    </div>
                    <span>Growth Analytics</span>
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
