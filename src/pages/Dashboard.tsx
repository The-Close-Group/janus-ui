import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWebsite } from '@/contexts/WebsiteContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, BarChart, Users, MessageSquare, ThumbsUp, TrendingUp, Instagram, Facebook, FileText } from 'lucide-react';
import Layout from '@/components/Layout';

// Interface for the scraper response
interface ScraperResponse {
  url: string;
  title: string;
  description?: string;
  html: string;
  markdown: string;
  related_pages: Array<{
    url: string;
    title: string;
    markdown: string;
  }>;
}

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
  const [scraperData, setScraperData] = useState<ScraperResponse | null>(null);
  const [selectedRelatedPage, setSelectedRelatedPage] = useState<number | null>(null);
  
  useEffect(() => {
    console.log('%c📄 Dashboard: Component mounted', 'color: #6366f1; font-weight: bold;');
    console.log('%c🔍 Dashboard: User data loaded', 'color: #059669;', user);
    console.log('%c🌐 Dashboard: Website data loaded', 'color: #059669;', website);
    
    // Load scraper data from localStorage if available
    const storedScraperData = localStorage.getItem('scraperResult');
    if (storedScraperData) {
      try {
        const parsedData = JSON.parse(storedScraperData) as ScraperResponse;
        console.log('%c📋 Dashboard: Loaded scraper data from localStorage', 'color: #059669;', {
          url: parsedData.url,
          title: parsedData.title,
          markdownLength: parsedData.markdown?.length || 0,
          relatedPages: parsedData.related_pages?.length || 0
        });
        setScraperData(parsedData);
      } catch (error) {
        console.error('%c❌ Dashboard: Error parsing stored scraper data', 'color: #dc2626;', error);
      }
    } else {
      console.log('%c❓ Dashboard: No scraper data found in localStorage', 'color: #d97706;');
    }
    
    return () => {
      console.log('%c📄 Dashboard: Component unmounted', 'color: #6366f1; font-weight: bold;');
    };
  }, [user, website]);

  const handleTabChange = (value: string) => {
    console.log('%c🔄 Dashboard: Tab changed', 'color: #8b5cf6;', { tab: value });
  };
  
  return (
    <Layout showNav>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-gray-500">
            Here's how your social media marketing is performing
          </p>
        </div>
        
        {/* Scraped Website Content Section */}
        {scraperData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" /> 
                Scraped Website Content: {scraperData.title}
              </CardTitle>
              <CardDescription>
                {scraperData.description || 'Content from your website scraping request'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="markdown">
                <TabsList className="mb-4">
                  <TabsTrigger value="markdown">Markdown</TabsTrigger>
                  <TabsTrigger value="related">Related Pages ({scraperData.related_pages.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="markdown">
                  <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[300px]">
                    <pre className="text-xs font-mono whitespace-pre-wrap">{scraperData.markdown}</pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="related">
                  {scraperData.related_pages.length === 0 ? (
                    <p className="text-gray-500">No related pages found.</p>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="lg:col-span-1 border-r border-gray-200 pr-4">
                        <ul className="space-y-2 max-h-[300px] overflow-auto">
                          {scraperData.related_pages.map((page, index) => (
                            <li key={index}>
                              <button
                                onClick={() => {
                                  console.log('%c🔗 Dashboard: Related page selected', 'color: #8b5cf6;', {
                                    index,
                                    title: page.title,
                                    url: page.url
                                  });
                                  setSelectedRelatedPage(index);
                                }}
                                className={`w-full text-left p-3 rounded-md ${
                                  selectedRelatedPage === index
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                <h3 className="font-medium truncate">{page.title || 'Untitled Page'}</h3>
                                <p className="text-xs text-gray-500 truncate">{page.url}</p>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="lg:col-span-2">
                        {selectedRelatedPage !== null ? (
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-medium">{scraperData.related_pages[selectedRelatedPage]?.title || 'Untitled Page'}</h3>
                              <a
                                href={scraperData.related_pages[selectedRelatedPage]?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-purple-600 hover:underline"
                              >
                                Visit Page ↗
                              </a>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[300px] text-xs font-mono">
                              <pre className="whitespace-pre-wrap">{scraperData.related_pages[selectedRelatedPage]?.markdown || ''}</pre>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            Select a page from the left to view its content
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
        
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
            icon={ThumbsUp}
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
        
        <Tabs 
          defaultValue="overview" 
          className="mb-6"
          onValueChange={handleTabChange}
        >
          <TabsList className="mb-4">
            <TabsTrigger 
              value="overview"
              onClick={() => console.log('%c🔄 Dashboard: Overview tab clicked', 'color: #8b5cf6;')}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="instagram"
              onClick={() => console.log('%c🔄 Dashboard: Instagram tab clicked', 'color: #8b5cf6;')}
            >
              Instagram
            </TabsTrigger>
            <TabsTrigger 
              value="facebook"
              onClick={() => console.log('%c🔄 Dashboard: Facebook tab clicked', 'color: #8b5cf6;')}
            >
              Facebook
            </TabsTrigger>
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
                      <div 
                        key={i} 
                        className="flex items-center gap-4 p-3 rounded-lg border bg-gray-50"
                        onClick={() => console.log('%c📊 Dashboard: Top post clicked', 'color: #8b5cf6;', { postId: i })}
                      >
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Instagram className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Post Caption #{i}</p>
                          <div className="flex gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" /> {Math.floor(Math.random() * 500) + 100}
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
                    <div 
                      className="p-4 rounded-lg border"
                      onClick={() => console.log('%c📊 Dashboard: Instagram platform clicked', 'color: #8b5cf6;')}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Instagram className="h-5 w-5" />
                        <span className="font-medium">Instagram</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>2.4k followers</span>
                        <span className="text-green-500">+5.2% growth</span>
                      </div>
                    </div>
                    <div 
                      className="p-4 rounded-lg border"
                      onClick={() => console.log('%c📊 Dashboard: Facebook platform clicked', 'color: #8b5cf6;')}
                    >
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
