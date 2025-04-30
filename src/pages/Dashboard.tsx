import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWebsite } from '@/contexts/WebsiteContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, BarChart, Users, MessageSquare, ThumbsUp, TrendingUp, Instagram, Facebook, MessageCircle, Loader } from 'lucide-react';
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
          <div className="w-full flex flex-col md:flex-row gap-6">
            {/* Left: Simulator & Management */}
            <div className="flex flex-col gap-6 w-full md:w-1/2">
              <Card className="rounded-3xl border-2 border-gray-200 shadow-lg bg-white flex flex-col items-center justify-center p-8">
                <div className="w-full text-center mb-6">
                  <span className="text-2xl font-bold text-brand-purple">Simulate Campaign</span>
                </div>
                <Button className="bg-gradient-to-br from-brand-indigo to-brand-purple text-white rounded-xl px-8 py-4 font-semibold text-lg shadow hover:from-brand-indigo/90 hover:to-brand-purple/90 transition">
                  Run Simulation
                </Button>
              </Card>
              <Card className="bg-brand-purple/10 rounded-3xl shadow p-4 border-2 border-brand-purple/40 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-brand-purple mb-2 text-base">Campaign Controls</div>
                  <div className="text-gray-700 text-sm">(Budget, Duration, Targeting, etc. controls will appear here)</div>
                </div>
                <button
                  className="ml-4 px-4 py-2 bg-gradient-to-br from-brand-indigo to-brand-purple text-white rounded-xl font-semibold shadow hover:from-brand-indigo/90 hover:to-brand-purple/90 transition"
                  onClick={() => navigate('/campaign-controls')}
                >
                  Expand
                </button>
              </Card>
              <Card className="bg-brand-purple/10 rounded-3xl shadow p-4 border-2 border-brand-purple/40 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-brand-purple mb-2 text-base">Performance Insights</div>
                  <div className="text-gray-700 text-sm">(Campaign performance summary, projections, and insights will appear here)</div>
                </div>
                <button
                  className="ml-4 px-4 py-2 bg-gradient-to-br from-brand-indigo to-brand-purple text-white rounded-xl font-semibold shadow hover:from-brand-indigo/90 hover:to-brand-purple/90 transition"
                  onClick={() => navigate('/performance-insights')}
                >
                  Expand
                </button>
              </Card>
            </div>
            {/* Right: Chat Section */}
            <Card className="flex-1 flex flex-col min-w-0 rounded-3xl shadow-lg border-2 border-gray-200">
              <div className="bg-gradient-to-br from-brand-indigo to-brand-purple text-white px-6 py-3 font-semibold rounded-t-3xl text-lg">Campaign Manager</div>
              <div ref={chatScrollRef} className="flex-1 p-6 space-y-3 overflow-y-auto bg-white">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}> 
                    <div className={`px-4 py-2 rounded-2xl text-base ${msg.sender === 'user' ? 'bg-brand-purple/10 text-brand-purple' : 'bg-gray-100 text-gray-800'}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <div className="flex border-t-2 border-brand-purple/20 bg-white rounded-b-3xl overflow-hidden">
                <input
                  className="flex-1 px-4 py-3 text-base outline-none bg-white text-gray-900 placeholder:text-gray-400 rounded-bl-3xl"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                />
                <button
                  className="px-6 py-3 bg-gradient-to-br from-brand-indigo to-brand-purple text-white font-bold rounded-br-3xl hover:from-brand-indigo/90 hover:to-brand-purple/90 transition"
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            </Card>
          </div>
        </div>
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="w-full bg-brand-purple/10 rounded-2xl flex mb-4 overflow-x-auto scrollbar-hide p-1">
            <TabsTrigger value="overview" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Overview</TabsTrigger>
            <TabsTrigger value="instagram" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Instagram</TabsTrigger>
            <TabsTrigger value="facebook" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Facebook</TabsTrigger>
            <TabsTrigger value="linkedin" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">LinkedIn</TabsTrigger>
            <TabsTrigger value="youtube" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">YouTube</TabsTrigger>
            <TabsTrigger value="googleads" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Google Ads</TabsTrigger>
            <TabsTrigger value="amazonads" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Amazon Ads</TabsTrigger>
            <TabsTrigger value="other" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            {/* Insights Summary Widget */}
            <Card className="bg-white rounded-2xl border-2 border-brand-purple/20 shadow-md p-6">
              <CardHeader>
                <CardTitle>Platform Metrics Summary</CardTitle>
                <CardDescription className="text-gray-500">A summary of the most important metrics from all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Instagram */}
                  <div className="bg-brand-purple/10 rounded-xl p-4 border-2 border-brand-purple/30 flex flex-col gap-2 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400"></span>
                      <span className="font-bold text-brand-purple">Instagram</span>
                    </div>
                    <div className="text-sm text-gray-700">Engagement up <span className='font-semibold'>5.2%</span>. Carousel posts and Reels drive most interactions. Peak: 6-9pm.</div>
                  </div>
                  {/* Facebook */}
                  <div className="bg-blue-100 rounded-xl p-4 border-2 border-blue-300 flex flex-col gap-2 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span className="font-bold text-blue-700">Facebook</span>
                    </div>
                    <div className="text-sm text-gray-700">Contests and image posts perform best. Try boosting top posts for more reach.</div>
                  </div>
                  {/* LinkedIn */}
                  <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200 flex flex-col gap-2 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                      <span className="font-bold text-blue-800">LinkedIn</span>
                    </div>
                    <div className="text-sm text-gray-700">Thought leadership posts have highest engagement. Peak: 9am-12pm.</div>
                  </div>
                  {/* YouTube */}
                  <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200 flex flex-col gap-2 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="font-bold text-red-700">YouTube</span>
                    </div>
                    <div className="text-sm text-gray-700">Product demos and tutorials have highest retention. Avg view duration: <span className='font-semibold'>3:45</span>.</div>
                  </div>
                  {/* Google Ads */}
                  <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200 flex flex-col gap-2 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="font-bold text-green-700">Google Ads</span>
                    </div>
                    <div className="text-sm text-gray-700">CTR <span className='font-semibold'>5.1%</span>. High-CTR campaigns should get more budget. Avg CPC: <span className='font-semibold'>$1.23</span>.</div>
                  </div>
                  {/* Amazon Ads */}
                  <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200 flex flex-col gap-2 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="font-bold text-yellow-700">Amazon Ads</span>
                    </div>
                    <div className="text-sm text-gray-700">Steady sales. Optimize listings and test new keywords. ACoS: <span className='font-semibold'>18%</span>.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Value Growth Graph Widget */}
            <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle>Value Growth</CardTitle>
                <CardDescription className="text-gray-500">
                  Combined value growth across all platforms (mock data)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
                  <div className="text-center">
                    <svg width="320" height="120" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline
                        fill="none"
                        stroke="#7C3AED"
                        strokeWidth="4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        points="0,100 40,90 80,80 120,60 160,50 200,40 240,30 280,20 320,10"
                      />
                      <circle cx="320" cy="10" r="6" fill="#7C3AED" />
                    </svg>
                    <p className="mt-4 text-lg text-brand-purple font-semibold">Steady Value Growth</p>
                    <p className="text-sm text-gray-400">
                      (Mock graph: upward trend in combined value across platforms)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Existing Marketing Growth Widget */}
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
                      <TabsTrigger value="calendar" className="flex-1 text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl">Calendar</TabsTrigger>
                      <TabsTrigger value="timeline" className="flex-1 text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl">Timeline</TabsTrigger>
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
            <div className="grid gap-6 md:grid-cols-2">
              {/* Reach & Impressions */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Reach & Impressions</CardTitle>
                  <CardDescription className="text-gray-500">How many people saw your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <LineChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Impressions</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total times your posts/stories were seen</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <Users className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Reach</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Unique accounts that saw your content</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Engagement */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Engagement</CardTitle>
                  <CardDescription className="text-gray-500">Likes, Comments, Saves, Shares, Engagement Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="flex flex-col items-center">
                      <ThumbsUp className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-bold text-lg">317</div>
                      <div className="text-xs text-gray-500">Likes</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageSquare className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-bold text-lg">44</div>
                      <div className="text-xs text-gray-500">Comments</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
                      <div className="font-bold text-lg">62</div>
                      <div className="text-xs text-gray-500">Saves</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v16h16V4H4zm4 4h8v8H8V8z" /></svg>
                      <div className="font-bold text-lg">21</div>
                      <div className="text-xs text-gray-500">Shares</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <TrendingUp className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                    <div className="font-bold text-lg">4.8%</div>
                    <div className="text-xs text-gray-500">Engagement Rate</div>
                  </div>
                </CardContent>
              </Card>
              {/* Content Breakdown */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Content Breakdown</CardTitle>
                  <CardDescription className="text-gray-500">Feed, Stories, Reels & IGTV</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-semibold">Feed Posts</div>
                      <div className="text-sm text-gray-500">Carousel Interactions: <span className="font-bold">38</span></div>
                      <div className="text-sm text-gray-500">Video Plays: <span className="font-bold">120</span></div>
                    </div>
                    <div>
                      <div className="font-semibold">Stories</div>
                      <div className="text-sm text-gray-500">Exits: <span className="font-bold">12</span></div>
                      <div className="text-sm text-gray-500">Replies: <span className="font-bold">7</span></div>
                      <div className="text-sm text-gray-500">Forward/Back: <span className="font-bold">23/15</span></div>
                    </div>
                    <div>
                      <div className="font-semibold">Reels & IGTV</div>
                      <div className="text-sm text-gray-500">Plays: <span className="font-bold">210</span></div>
                      <div className="text-sm text-gray-500">Likes: <span className="font-bold">32</span></div>
                      <div className="text-sm text-gray-500">Comments: <span className="font-bold">5</span></div>
                      <div className="text-sm text-gray-500">Saves: <span className="font-bold">9</span></div>
                      <div className="text-sm text-gray-500">Shares: <span className="font-bold">4</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Actions on Profile */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Actions on Profile</CardTitle>
                  <CardDescription className="text-gray-500">Profile visits, website clicks, call/email taps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <Users className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-semibold">Profile Visits: <span className="font-bold">1,200</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm1 17.93c-2.83.48-5.48-1.51-5.96-4.34-.07-.39.25-.75.65-.75.31 0 .58.23.64.54.36 2.09 2.37 3.5 4.46 3.14 2.09-.36 3.5-2.37 3.14-4.46-.36-2.09-2.37-3.5-4.46-3.14-.39.07-.75-.25-.75-.65 0-.31.23-.58.54-.64 2.83-.48 5.48 1.51 5.96 4.34.07.39-.25.75-.65.75-.31 0-.58-.23-.64-.54z" /></svg>
                      <div className="font-semibold">Website Clicks: <span className="font-bold">320</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5a8.38 8.38 0 01-1.9.5 4.48 4.48 0 00-7.6 3v1a4.5 4.5 0 004.5 4.5c1.61 0 3.09-.77 4-2" /></svg>
                      <div className="font-semibold">Call/Email Taps: <span className="font-bold">45</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Audience */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md md:col-span-2">
                <CardHeader>
                  <CardTitle>Audience</CardTitle>
                  <CardDescription className="text-gray-500">Follower growth, demographics, active times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Follower Growth */}
                    <div>
                      <div className="font-semibold mb-1">Follower Growth</div>
                      <div className="h-24 flex items-end gap-1">
                        {/* Mock bar chart */}
                        {[10, 14, 18, 22, 19, 25, 30].map((v, i) => (
                          <div key={i} className="w-3 bg-brand-purple rounded-t" style={{ height: `${v * 2}px` }} />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Last 7 days</div>
                    </div>
                    {/* Demographics */}
                    <div>
                      <div className="font-semibold mb-1">Demographics</div>
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-500">Age: <span className="font-bold">25-34</span></div>
                        <div className="text-xs text-gray-500">Gender: <span className="font-bold">54% Female, 46% Male</span></div>
                        <div className="text-xs text-gray-500">Top Locations: <span className="font-bold">NYC, LA, London</span></div>
                      </div>
                    </div>
                    {/* Active Times */}
                    <div>
                      <div className="font-semibold mb-1">Active Times</div>
                      <div className="flex gap-1 items-end h-24">
                        {/* Mock active hours bar chart */}
                        {[8, 12, 18, 22, 16, 10, 6].map((v, i) => (
                          <div key={i} className="w-2 bg-brand-purple/70 rounded-t" style={{ height: `${v * 2}px` }} />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Most active hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="facebook" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Page & Post Reach */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Page & Post Reach</CardTitle>
                  <CardDescription className="text-gray-500">Organic vs Paid Reach, Total Impressions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <LineChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Total Impressions</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total times your posts were seen</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <Users className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Organic Reach</div>
                        <div className="text-lg font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      </div>
                      <div>
                        <div className="font-semibold">Paid Reach</div>
                        <div className="text-lg font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Engagement */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Engagement</CardTitle>
                  <CardDescription className="text-gray-500">Reactions, Comments, Shares, Post Clicks, Engagement Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="flex flex-col items-center">
                      <ThumbsUp className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-bold text-lg">210</div>
                      <div className="text-xs text-gray-500">Reactions</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageSquare className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-bold text-lg">38</div>
                      <div className="text-xs text-gray-500">Comments</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v16h16V4H4zm4 4h8v8H8V8z" /></svg>
                      <div className="font-bold text-lg">19</div>
                      <div className="text-xs text-gray-500">Shares</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                      <div className="font-bold text-lg">142</div>
                      <div className="text-xs text-gray-500">Post Clicks</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <TrendingUp className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                    <div className="font-bold text-lg">3.7%</div>
                    <div className="text-xs text-gray-500">Engagement Rate</div>
                  </div>
                </CardContent>
              </Card>
              {/* Actions on Page */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Actions on Page</CardTitle>
                  <CardDescription className="text-gray-500">CTA clicks, page views & previews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm1 17.93c-2.83.48-5.48-1.51-5.96-4.34-.07-.39.25-.75.65-.75.31 0 .58.23.64.54.36 2.09 2.37 3.5 4.46 3.14 2.09-.36 3.5-2.37 3.14-4.46-.36-2.09-2.37-3.5-4.46-3.14-.39.07-.75-.25-.75-.65 0-.31.23-.58.54-.64 2.83-.48 5.48 1.51 5.96 4.34.07.39-.25.75-.65.75-.31 0-.58-.23-.64-.54z" /></svg>
                      <div className="font-semibold">Website Clicks: <span className="font-bold">98</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5a8.38 8.38 0 01-1.9.5 4.48 4.48 0 00-7.6 3v1a4.5 4.5 0 004.5 4.5c1.61 0 3.09-.77 4-2" /></svg>
                      <div className="font-semibold">Call/Direction Taps: <span className="font-bold">27</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Users className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-semibold">Page Views: <span className="font-bold">2,340</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></svg>
                      <div className="font-semibold">Page Previews: <span className="font-bold">410</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Video Metrics */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Video Metrics</CardTitle>
                  <CardDescription className="text-gray-500">3s/10s views, ThruPlays, Avg Watch Time, Retention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M10 8l6 4-6 4V8z" /></svg>
                      <div className="font-semibold">3s Views: <span className="font-bold">1,120</span></div>
                      <div className="font-semibold">10s Views: <span className="font-bold">870</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M10 8l6 4-6 4V8z" /></svg>
                      <div className="font-semibold">ThruPlays: <span className="font-bold">540</span></div>
                      <div className="font-semibold">Avg Watch Time: <span className="font-bold">00:18</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <TrendingUp className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-semibold">Audience Retention: <span className="font-bold">62%</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* People */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md md:col-span-2">
                <CardHeader>
                  <CardTitle>People</CardTitle>
                  <CardDescription className="text-gray-500">Demographics of people who like/follow/engage with your page</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Demographics */}
                    <div>
                      <div className="font-semibold mb-1">Demographics</div>
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-500">Age: <span className="font-bold">25-44</span></div>
                        <div className="text-xs text-gray-500">Gender: <span className="font-bold">51% Female, 49% Male</span></div>
                        <div className="text-xs text-gray-500">Top Locations: <span className="font-bold">NYC, Chicago, London</span></div>
                      </div>
                    </div>
                    {/* Follower Growth (mock bar chart) */}
                    <div>
                      <div className="font-semibold mb-1">Follower Growth</div>
                      <div className="h-24 flex items-end gap-1">
                        {[12, 16, 20, 18, 22, 28, 24].map((v, i) => (
                          <div key={i} className="w-3 bg-brand-purple rounded-t" style={{ height: `${v * 2}px` }} />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Last 7 days</div>
                    </div>
                    {/* Engagement by Demographic (mock bar chart) */}
                    <div>
                      <div className="font-semibold mb-1">Engagement by Demographic</div>
                      <div className="h-24 flex items-end gap-1">
                        {[8, 14, 10, 18, 12, 16, 20].map((v, i) => (
                          <div key={i} className="w-2 bg-brand-purple/70 rounded-t" style={{ height: `${v * 2}px` }} />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Engagement by age group</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="linkedin" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Visitor Analytics */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Visitor Analytics</CardTitle>
                  <CardDescription className="text-gray-500">Page views & Unique visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <Users className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Page Views</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      </div>
                      <div>
                        <div className="font-semibold">Unique Visitors</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Update Analytics */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Update Analytics</CardTitle>
                  <CardDescription className="text-gray-500">Impressions, Clicks, Reactions, Comments, Shares, Engagement Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="flex flex-col items-center">
                      <LineChart className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-bold text-lg">8,900</div>
                      <div className="text-xs text-gray-500">Impressions</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                      <div className="font-bold text-lg">1,120</div>
                      <div className="text-xs text-gray-500">Clicks</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <ThumbsUp className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-bold text-lg">320</div>
                      <div className="text-xs text-gray-500">Reactions</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageSquare className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-bold text-lg">44</div>
                      <div className="text-xs text-gray-500">Comments</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v16h16V4H4zm4 4h8v8H8V8z" /></svg>
                      <div className="font-bold text-lg">19</div>
                      <div className="text-xs text-gray-500">Shares</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <TrendingUp className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                    <div className="font-bold text-lg">5.2%</div>
                    <div className="text-xs text-gray-500">Engagement Rate</div>
                  </div>
                </CardContent>
              </Card>
              {/* Follower Analytics */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Follower Analytics</CardTitle>
                  <CardDescription className="text-gray-500">Total followers & Net follower growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <Users className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-semibold">Total Followers: <span className="font-bold">3,800</span></div>
                      <div className="font-semibold">Net Growth: <span className="font-bold">+120</span></div>
                    </div>
                    <div className="h-20 flex items-end gap-1 mt-2">
                      {/* Mock follower growth bar chart */}
                      {[8, 12, 16, 14, 18, 22, 20].map((v, i) => (
                        <div key={i} className="w-3 bg-brand-purple rounded-t" style={{ height: `${v * 2}px` }} />
                      ))}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Last 7 days</div>
                  </div>
                </CardContent>
              </Card>
              {/* Demographics */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Demographics</CardTitle>
                  <CardDescription className="text-gray-500">Industry, Job Function, Seniority, Location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="text-xs text-gray-500">Industry: <span className="font-bold">Tech, Finance, Marketing</span></div>
                    <div className="text-xs text-gray-500">Job Function: <span className="font-bold">Engineering, Sales, HR</span></div>
                    <div className="text-xs text-gray-500">Seniority: <span className="font-bold">Entry, Manager, Director</span></div>
                    <div className="text-xs text-gray-500">Top Locations: <span className="font-bold">NYC, SF, London</span></div>
                  </div>
                </CardContent>
              </Card>
              {/* Visitor Demographics */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md md:col-span-2">
                <CardHeader>
                  <CardTitle>Visitor Demographics</CardTitle>
                  <CardDescription className="text-gray-500">Comparison of page visitors vs followers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-brand-purple rounded" /> <span className="text-xs text-gray-700">Followers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-brand-purple/70 rounded" /> <span className="text-xs text-gray-700">Visitors</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Industry Table */}
                    <div className="col-span-2">
                      <div className="font-semibold mb-1">By Industry</div>
                      <table className="w-full text-xs text-left border-separate border-spacing-y-1">
                        <thead>
                          <tr>
                            <th className="pr-2">Industry</th>
                            <th className="pr-2 text-brand-purple/70">Visitors (%)</th>
                            <th className="pr-2 text-brand-purple">Followers (%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { label: 'Tech', v: 35, f: 40 },
                            { label: 'Finance', v: 25, f: 30 },
                            { label: 'Marketing', v: 20, f: 15 },
                            { label: 'Healthcare', v: 20, f: 15 },
                          ].map((d, i) => (
                            <tr key={i}>
                              <td className="pr-2 font-medium text-gray-700">{d.label}</td>
                              <td className="pr-2 text-brand-purple/70 font-semibold">{d.v}%</td>
                              <td className="pr-2 text-brand-purple font-semibold">{d.f}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="text-xs text-gray-400 mt-1">Percent of total by industry</div>
                    </div>
                    {/* Location Table */}
                    <div className="col-span-2">
                      <div className="font-semibold mb-1">By Location</div>
                      <table className="w-full text-xs text-left border-separate border-spacing-y-1">
                        <thead>
                          <tr>
                            <th className="pr-2">Location</th>
                            <th className="pr-2 text-brand-purple/70">Visitors (%)</th>
                            <th className="pr-2 text-brand-purple">Followers (%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { label: 'NYC', v: 30, f: 35 },
                            { label: 'SF', v: 25, f: 25 },
                            { label: 'London', v: 25, f: 20 },
                            { label: 'Berlin', v: 20, f: 20 },
                          ].map((d, i) => (
                            <tr key={i}>
                              <td className="pr-2 font-medium text-gray-700">{d.label}</td>
                              <td className="pr-2 text-brand-purple/70 font-semibold">{d.v}%</td>
                              <td className="pr-2 text-brand-purple font-semibold">{d.f}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="text-xs text-gray-400 mt-1">Percent of total by location</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="youtube" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Overview */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription className="text-gray-500">Views, Watch Time, Avg View Duration, Subscribers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <LineChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Views</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total video views</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <BarChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Watch Time (hrs)</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total hours watched</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Avg View Duration</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Average time watched per view</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <Users className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Subscribers Gained</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Last 28 days</div>
                      </div>
                      <div>
                        <div className="font-semibold">Subscribers Lost</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Last 28 days</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Reach */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Reach</CardTitle>
                  <CardDescription className="text-gray-500">Impressions, CTR, Traffic Sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <LineChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Impressions</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">How many times thumbnails were shown</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Impression CTR</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Click-through rate from impressions</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="font-semibold mb-1">Traffic Sources</div>
                      <div className="flex flex-col gap-1 text-xs text-gray-500">
                        <div>Suggested Videos: <span className="font-bold">38%</span></div>
                        <div>YouTube Search: <span className="font-bold">27%</span></div>
                        <div>External: <span className="font-bold">19%</span></div>
                        <div>Browse Features: <span className="font-bold">11%</span></div>
                        <div>Other: <span className="font-bold">5%</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Engagement */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Engagement</CardTitle>
                  <CardDescription className="text-gray-500">Likes, Comments, Shares, Playlist Additions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="flex flex-col items-center">
                      <ThumbsUp className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-bold text-lg">1,120</div>
                      <div className="text-xs text-gray-500">Likes</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageSquare className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div className="font-bold text-lg">210</div>
                      <div className="text-xs text-gray-500">Comments</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v16h16V4H4zm4 4h8v8H8V8z" /></svg>
                      <div className="font-bold text-lg">98</div>
                      <div className="text-xs text-gray-500">Shares</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="h-6 w-6 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                      <div className="font-bold text-lg">54</div>
                      <div className="text-xs text-gray-500">Playlist Additions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Audience Retention */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Audience Retention</CardTitle>
                  <CardDescription className="text-gray-500">Absolute & Relative Retention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Absolute Retention</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Avg % of video watched</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Relative Retention</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Compared to similar videos</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Audience */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md md:col-span-2">
                <CardHeader>
                  <CardTitle>Audience</CardTitle>
                  <CardDescription className="text-gray-500">Unique Viewers, Returning vs New, Demographics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Unique Viewers */}
                    <div>
                      <div className="font-semibold mb-1">Unique Viewers</div>
                      <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      <div className="text-xs text-gray-400 mt-1">Last 28 days</div>
                    </div>
                    {/* Returning vs New */}
                    <div>
                      <div className="font-semibold mb-1">Returning vs New</div>
                      <div className="flex gap-2 items-end">
                        <div className="w-8 h-16 bg-brand-purple rounded-t flex flex-col items-center justify-end">
                          <span className="text-xs text-white">Returning</span>
                          <span className="font-bold text-white">2,300</span>
                        </div>
                        <div className="w-8 h-12 bg-brand-purple/60 rounded-t flex flex-col items-center justify-end">
                          <span className="text-xs text-white">New</span>
                          <span className="font-bold text-white">6,600</span>
                        </div>
                      </div>
                    </div>
                    {/* Demographics */}
                    <div>
                      <div className="font-semibold mb-1">Demographics</div>
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-500">Age: <span className="font-bold">18-24, 25-34</span></div>
                        <div className="text-xs text-gray-500">Gender: <span className="font-bold">58% Male, 42% Female</span></div>
                        <div className="text-xs text-gray-500">Top Countries: <span className="font-bold">US, UK, India</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Revenue */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription className="text-gray-500">Estimated Revenue, RPM, Playback-based CPM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <BarChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Estimated Revenue</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Last 28 days</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">RPM</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Revenue per 1,000 views</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Playback-based CPM</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Cost per 1,000 playbacks</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="googleads" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Delivery & Volume */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Delivery & Volume</CardTitle>
                  <CardDescription className="text-gray-500">Impressions, Clicks, CTR, Avg CPC, Cost</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <LineChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Impressions</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total ad impressions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <BarChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Clicks</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total ad clicks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">CTR</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Click-through rate</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <BarChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Avg CPC</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Average cost per click</div>
                      </div>
                      <div>
                        <div className="font-semibold">Cost</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total ad spend</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Quality & Share */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Quality & Share</CardTitle>
                  <CardDescription className="text-gray-500">Quality Score, Impression Share, Lost-IS</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Quality Score</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Ad relevance, expected CTR, landing page exp.</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <LineChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Impression Share</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Share of total possible impressions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <BarChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Lost-IS (Budget)</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Lost due to budget</div>
                      </div>
                      <div>
                        <div className="font-semibold">Lost-IS (Rank)</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Lost due to ad rank</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Conversion Metrics */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Conversion Metrics</CardTitle>
                  <CardDescription className="text-gray-500">Conversions, Conv. Rate, Cost/Conv.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Conversions</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total conversions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Conversion Rate</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">% of clicks that converted</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <BarChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Cost/Conversion</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Average cost per conversion</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Return Metrics */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Return Metrics</CardTitle>
                  <CardDescription className="text-gray-500">ROAS, Value/Conversion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">ROAS</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Return on ad spend</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <BarChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Value/Conversion</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Avg value per conversion</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Auction Insights */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md md:col-span-2">
                <CardHeader>
                  <CardTitle>Auction Insights</CardTitle>
                  <CardDescription className="text-gray-500">Overlap Rate, Position Above Rate, Top of Page Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="font-semibold mb-1">Overlap Rate</div>
                      <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      <div className="text-xs text-gray-400 mt-1">How often another advertiser's ad received an impression in the same auction as yours</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Position Above Rate</div>
                      <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      <div className="text-xs text-gray-400 mt-1">How often another advertiser's ad was shown above yours</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Top of Page Rate</div>
                      <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      <div className="text-xs text-gray-400 mt-1">How often your ad was shown at the top of the page</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="amazonads" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Ad Performance */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Ad Performance</CardTitle>
                  <CardDescription className="text-gray-500">Impressions, Clicks, CTR, Cost, Avg CPC</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <LineChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Impressions</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total ad impressions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <BarChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Clicks</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total ad clicks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">CTR</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Click-through rate</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <BarChart className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Cost</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total ad spend</div>
                      </div>
                      <div>
                        <div className="font-semibold">Avg CPC</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Average cost per click</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Sales & Conversion */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Sales & Conversion</CardTitle>
                  <CardDescription className="text-gray-500">Attributed Sales, Orders, Units Sold, Conv. Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Attributed Sales</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Sales attributed to ads</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <Users className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Orders</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total orders from ads</div>
                      </div>
                      <div>
                        <div className="font-semibold">Units Sold</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total units sold</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">Conversion Rate</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Orders ÷ Clicks</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Efficiency Metrics */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Efficiency Metrics</CardTitle>
                  <CardDescription className="text-gray-500">ACoS, TACoS</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">ACoS</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Ad spend ÷ sales</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <TrendingUp className="h-8 w-8 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                      <div>
                        <div className="font-semibold">TACoS</div>
                        <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                        <div className="text-xs text-gray-400">Total ACoS (including organic sales)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Audience & Placement */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>Audience & Placement</CardTitle>
                  <CardDescription className="text-gray-500">Top Queries, Placement Performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="font-semibold mb-1">Top Search Terms</div>
                      <div className="flex flex-col gap-1 text-xs text-gray-500">
                        <div>"wireless earbuds" <span className="font-bold">1,200 clicks</span></div>
                        <div>"bluetooth headphones" <span className="font-bold">950 clicks</span></div>
                        <div>"noise cancelling" <span className="font-bold">720 clicks</span></div>
                        <div>"sports headphones" <span className="font-bold">610 clicks</span></div>
                        <div>"in-ear headphones" <span className="font-bold">540 clicks</span></div>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Placement Performance</div>
                      <div className="flex flex-col gap-1 text-xs text-gray-500">
                        <div>Top of Search: <span className="font-bold">62%</span></div>
                        <div>Product Pages: <span className="font-bold">31%</span></div>
                        <div>Other: <span className="font-bold">7%</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Share of Voice */}
              <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md md:col-span-2">
                <CardHeader>
                  <CardTitle>Share of Voice</CardTitle>
                  <CardDescription className="text-gray-500">Impression Share, Lost-IS (Budget/Rank)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-semibold mb-1">Impression Share</div>
                      <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      <div className="text-xs text-gray-400 mt-1">Share of total possible impressions</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Lost-IS (Budget)</div>
                      <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      <div className="text-xs text-gray-400 mt-1">Lost due to budget</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Lost-IS (Rank)</div>
                      <div className="text-2xl font-bold"><span className="text-gray-400 italic flex items-center gap-2"><Loader className="animate-spin h-4 w-4 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" /> Pending API integration</span></div>
                      <div className="text-xs text-gray-400 mt-1">Lost due to ad rank</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="other" className="space-y-6">
            <Card className="bg-gray-50 rounded-2xl text-gray-900 border-2 border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle>Other Platform Analytics</CardTitle>
                <CardDescription className="text-gray-500">
                  Detailed metrics for your other integrated platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
                  <p className="text-gray-500">Detailed analytics for other platforms will be displayed here</p>
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
              <Button asChild size="sm" className="bg-gradient-to-br from-brand-indigo to-brand-purple text-white hover:from-brand-indigo/90 hover:to-brand-purple/90">
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
