
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWebsite } from '@/contexts/WebsiteContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, BarChart, Users, MessageSquare, Like, TrendingUp, Instagram, Facebook } from 'lucide-react';
import Layout from '@/components/Layout';

// Mock data for the social analytics
const generateMockData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2025, 3, i + 1).toLocaleDateString(),
    followers: Math.floor(Math.random() * 100) + 500,
    engagement: (Math.random() * 5 + 2).toFixed(2),
    likes: Math.floor(Math.random() * 300) + 100,
    comments: Math.floor(Math.random() * 50) + 10,
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
            <TrendingUp className={`h-4 w-4 mr-1 ${!change.startsWith('+') && 'rotate-180'}`} />
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
  
  return (
    <Layout showNav>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-gray-500">
            Here's how your social media marketing is performing
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <DashboardMetricCard
            title="Total Followers"
            value="3,842"
            change="+12.3%"
            icon={Users}
          />
          <DashboardMetricCard
            title="Post Engagement"
            value="4.8%"
            change="+2.1%"
            icon={Like}
          />
          <DashboardMetricCard
            title="Total Comments"
            value="928"
            change="+18.4%"
            icon={MessageSquare}
          />
          <DashboardMetricCard
            title="Recent Posts"
            value="24"
            change="+4"
            icon={Instagram}
          />
        </div>
        
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Growth</CardTitle>
                <CardDescription>
                  Followers and engagement rate over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <p>Growth analytics visualization would appear here</p>
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
                  <CardTitle>Top Performing Posts</CardTitle>
                  <CardDescription>Posts with highest engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-gray-50">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Instagram className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Post Caption #{i}</p>
                          <div className="flex gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Like className="h-4 w-4" /> {Math.floor(Math.random() * 500) + 100}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" /> {Math.floor(Math.random() * 50) + 10}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Platform Breakdown</CardTitle>
                  <CardDescription>Engagement by social platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-2">
                        <Instagram className="h-5 w-5" />
                        <span className="font-medium">Instagram</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>2.4k followers</span>
                        <span className="text-green-500">+5.2% growth</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-2">
                        <Facebook className="h-5 w-5" />
                        <span className="font-medium">Facebook</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>1.8k followers</span>
                        <span className="text-green-500">+3.8% growth</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="instagram" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Instagram Analytics</CardTitle>
                <CardDescription>
                  Detailed metrics for your Instagram account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">Detailed Instagram analytics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="facebook" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Facebook Analytics</CardTitle>
                <CardDescription>
                  Detailed metrics for your Facebook account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">Detailed Facebook analytics will be displayed here</p>
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
