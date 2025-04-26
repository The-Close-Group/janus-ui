
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { BarChart2, LineChart, PieChart, TrendingUp, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          {/* Hero Section */}
          <header className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <BarChart2 className="h-16 w-16 text-brand-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Unlock Your Website's <span className="text-brand-purple">Full Potential</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get detailed analytics and insights to optimize your website performance, increase conversions, and grow your online presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
                <Link to="/signup">Start for free <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          </header>

          {/* Features Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-brand-blue/10 p-3 rounded-full w-fit mb-4">
                <LineChart className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-gray-600">Monitor your website traffic and user behavior in real-time with our intuitive dashboard.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-brand-purple/10 p-3 rounded-full w-fit mb-4">
                <PieChart className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Audience Insights</h3>
              <p className="text-gray-600">Understand your audience with detailed demographics, interests, and behavior patterns.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-brand-indigo/10 p-3 rounded-full w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-brand-indigo" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Optimization</h3>
              <p className="text-gray-600">Get actionable recommendations to improve your website performance and user experience.</p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-brand-indigo to-brand-purple rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to supercharge your website?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">Join thousands of website owners who have transformed their online presence with our analytics platform.</p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-brand-purple hover:bg-gray-100">
              <Link to="/signup">Get started today</Link>
            </Button>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
