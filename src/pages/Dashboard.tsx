
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWebsite } from '@/contexts/WebsiteContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, BarChart, Users, Globe, Eye, Clock, MousePointerClick, ArrowUpRight } from 'lucide-react';
import Layout from '@/components/Layout';

// Mock data for charts
const generateMockData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2025, 3, i + 1).toLocaleDateString(),
    visitors: Math.floor(Math.random() * 200) + 100,
    pageviews: Math.floor(Math.random() * 500) + 200,
    bounceRate: Math.floor(Math.random() * 30) + 40,
    avgTime: Math.floor(Math.random() * 120) + 60,
  }));
};

const DashboardMetricCard = ({ title, value, change, icon: Icon }: { 
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <Icon className="h-4 w-4 text-gray-500" />
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold">{value}</h3>
        <div className="flex items-center text-sm">
          <span className={`flex items-center ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {change.startsWith('+') ? 
              <ArrowUpRight className="h-4 w-4 mr-1" /> : 
              <ArrowUpRight className="h-4 w-4 mr-1 rotate-180" />
            }
            {change}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { website } = useWebsite();
  
  // Format the website URL for display
  const formattedWebsite = website ? new URL(website).hostname : '';
  
  return (
    <Layout showNav>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-gray-500">
            Here's what's happening with {formattedWebsite} today.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <DashboardMetricCard
            title="Unique Visitors"
            value="2,853"
            change="+14.2%"
            icon={Users}
          />
          <DashboardMetricCard
            title="Page Views"
            value="7,249"
            change="+5.7%"
            icon={Eye}
          />
          <DashboardMetricCard
            title="Bounce Rate"
            value="42.3%"
            change="-2.1%"
            icon={MousePointerClick}
          />
          <DashboardMetricCard
            title="Avg. Session"
            value="3m 12s"
            change="+12.3%"
            icon={Clock}
          />
        </div>
        
        <Tabs defaultValue="traffic" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="traffic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>
                  Daily visitors and pageviews for the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <p>Traffic chart visualization would appear here</p>
                    <p className="text-sm text-gray-400">
                      (Actual chart implementation would use recharts)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <BarChart className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>Traffic sources chart would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                  <CardDescription>Most visited pages on your website</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-t">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <Globe className="h-4 w-4 text-gray-500" />
                          </div>
                          <span className="text-sm font-medium">
                            {i === 1 ? '/' : i === 2 ? '/products' : i === 3 ? '/blog' : i === 4 ? '/about' : '/contact'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 1000) + 500} views
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="behavior" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Behavior</CardTitle>
                <CardDescription>
                  How users interact with your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">Behavior data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="conversions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Tracking</CardTitle>
                <CardDescription>
                  Track goals and conversion rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center p-6">
                    <h3 className="text-lg font-medium mb-2">Set up conversion tracking</h3>
                    <p className="text-gray-500 mb-4">
                      Track form submissions, button clicks, and other important actions
                    </p>
                    <Button>Configure goals</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
