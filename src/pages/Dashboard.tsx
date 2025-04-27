import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWebsite } from '@/contexts/WebsiteContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, BarChart, Users, MessageSquare, ThumbsUp, TrendingUp, Instagram, Facebook, MessageCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import WeeklyCalendar, { TimelineView } from '@/components/WeeklyCalendar';

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

const DashboardMetricCard = ({ title, value, change, icon: Icon, className }: { 
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  className?: string;
}) => (
  <Card className={`bg-gradient-to-br from-brand-indigo to-brand-purple text-white rounded-3xl border-2 border-brand-purple/40 shadow-lg ${className || ''}`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-white">{title}</p>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <div className="flex items-center text-sm">
          <span className={`flex items-center ${change.startsWith('+') ? 'text-green-300' : 'text-red-300'}`}>
            <TrendingUp className={`h-4 w-4 mr-1 text-white ${!change.startsWith('+') && 'rotate-180'}`} />
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
  const navigate = useNavigate();
  
  // Chatbot state
  const [chatOpen, setChatOpen] = React.useState(false);
  const [chatInput, setChatInput] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState([
    { sender: 'manager', text: 'Hi! I am your Campaign Manager. How can I help you today?' },
  ]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setChatHistory((h) => [
      ...h,
      { sender: 'user', text: chatInput },
      { sender: 'manager', text: 'This is a mock response from your Campaign Manager.' },
    ]);
    setChatInput('');
  };

  const chatScrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Layout showNav>
      <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-gray-500">
            Here's how your marketing is performing
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <DashboardMetricCard
            title="Cost Per Click (CPC)"
            value="$1.23"
            change="-4.2%"
            icon={BarChart}
            className="bg-gradient-to-br from-brand-indigo to-brand-purple text-white rounded-3xl border-2 border-brand-purple/40 shadow-lg"
          />
          <DashboardMetricCard
            title="Conversion Rate (CR)"
            value="7.8%"
            change="+1.5%"
            icon={TrendingUp}
            className="bg-gradient-to-br from-brand-indigo to-brand-purple text-white rounded-3xl border-2 border-brand-purple/40 shadow-lg"
          />
          <DashboardMetricCard
            title="Impressions (IR)"
            value="24,500"
            change="+8.9%"
            icon={LineChart}
            className="bg-gradient-to-br from-brand-indigo to-brand-purple text-white rounded-3xl border-2 border-brand-purple/40 shadow-lg"
          />
          <DashboardMetricCard
            title="Leads Generated (LG)"
            value="312"
            change="+3.2%"
            icon={Users}
            className="bg-gradient-to-br from-brand-indigo to-brand-purple text-white rounded-3xl border-2 border-brand-purple/40 shadow-lg"
          />
        </div>
        {/* Chatbot as a core dashboard feature */}
        <div className="mb-8">
          <div className="w-full rounded-3xl border-2 border-gray-200 shadow-lg bg-white flex flex-col">
            <div className="bg-brand-purple text-white px-6 py-3 font-semibold rounded-t-3xl text-lg">Campaign Manager</div>
            <div ref={chatScrollRef} className="flex-1 p-6 space-y-3 overflow-y-auto max-h-80 bg-white rounded-b-none">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-2xl text-base ${msg.sender === 'user' ? 'bg-brand-purple/10 text-brand-purple' : 'bg-gray-100 text-gray-800'}`}>{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="flex border-t-2 border-gray-200 bg-white rounded-b-3xl overflow-hidden">
              <input
                className="flex-1 px-4 py-3 text-base outline-none bg-white text-gray-900 placeholder:text-gray-400 rounded-bl-3xl"
                placeholder="Type your message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              />
              <button
                className="px-6 py-3 bg-brand-purple text-white font-bold rounded-br-3xl hover:bg-brand-purple/90 transition"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4 bg-brand-purple rounded-2xl">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-brand-purple data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="instagram" className="text-white data-[state=active]:bg-brand-purple data-[state=active]:text-white">Instagram</TabsTrigger>
            <TabsTrigger value="facebook" className="text-white data-[state=active]:bg-brand-purple data-[state=active]:text-white">Facebook</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle>Marketing Growth</CardTitle>
                <CardDescription className="text-gray-500">
                  Followers and engagement rate over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                    <p>Growth analytics visualization would appear here</p>
                    <p className="text-sm text-gray-300">
                      (Actual chart implementation would use recharts)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Calendar/Timeline Widget - now full width above the two widgets */}
            <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md mb-6">
              <CardHeader>
                <div className="w-full">
                  <Tabs defaultValue="calendar">
                    <TabsList className="w-full bg-brand-purple/10 rounded-xl flex mb-2">
                      <TabsTrigger value="calendar" className="flex-1 text-brand-purple data-[state=active]:bg-brand-purple data-[state=active]:text-white rounded-xl">Calendar</TabsTrigger>
                      <TabsTrigger value="timeline" className="flex-1 text-brand-purple data-[state=active]:bg-brand-purple data-[state=active]:text-white rounded-xl">Timeline</TabsTrigger>
                    </TabsList>
                    <TabsContent value="calendar">
                      <WeeklyCalendar />
                    </TabsContent>
                    <TabsContent value="timeline">
                      <TimelineView />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardHeader>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Top Performing Posts</CardTitle>
                  <CardDescription className="text-gray-500">Posts with highest engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-gray-200 bg-white">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Instagram className="h-6 w-6 text-gray-300" />
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
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Platform Breakdown</CardTitle>
                  <CardDescription className="text-gray-500">Engagement by platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-gray-200 bg-white">
                      <div className="flex items-center gap-3 mb-2">
                        <Instagram className="h-5 w-5" />
                        <span className="font-medium">Instagram</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>2.4k followers</span>
                        <span className="text-green-500">+5.2% growth</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200 bg-white">
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
          <TabsContent value="instagram" className="space-y-6">
            <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle>Instagram Analytics</CardTitle>
                <CardDescription className="text-gray-500">
                  Detailed metrics for your Instagram account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
                  <p className="text-gray-500">Detailed Instagram analytics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="facebook" className="space-y-6">
            <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle>Facebook Analytics</CardTitle>
                <CardDescription className="text-gray-500">
                  Detailed metrics for your Facebook account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
                  <p className="text-gray-500">Detailed Facebook analytics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Library Widget */}
        <div className="mt-12 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Library</h2>
          <Card className="w-full bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Post Library Preview</CardTitle>
                <CardDescription className="text-gray-500">Preview your saved and generated posts</CardDescription>
              </div>
              <Button asChild size="sm" className="bg-brand-purple text-white hover:bg-brand-purple/90">
                <a href="/library">Go to Library</a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-gray-200 bg-white">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Instagram className="h-6 w-6 text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Library Post #{i}</p>
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
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
