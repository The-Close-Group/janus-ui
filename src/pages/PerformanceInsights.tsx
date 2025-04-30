import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, BarChart, Users, ThumbsUp, MessageSquare, TrendingUp, Instagram, Facebook, Loader } from 'lucide-react';

const PerformanceInsights: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      <div className="w-full flex justify-start mb-4">
        <Button className="bg-gradient-to-br from-brand-indigo to-brand-purple text-white" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </Button>
      </div>
      <Card className="max-w-4xl w-full mb-8">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Review your campaign's performance metrics and actionable insights by platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="instagram" className="w-full">
            <TabsList className="w-full bg-brand-purple/10 rounded-2xl flex mb-4 overflow-x-auto scrollbar-hide p-1">
              <TabsTrigger value="instagram" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Instagram</TabsTrigger>
              <TabsTrigger value="facebook" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Facebook</TabsTrigger>
              <TabsTrigger value="linkedin" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">LinkedIn</TabsTrigger>
              <TabsTrigger value="youtube" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">YouTube</TabsTrigger>
              <TabsTrigger value="googleads" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Google Ads</TabsTrigger>
              <TabsTrigger value="amazonads" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Amazon Ads</TabsTrigger>
              <TabsTrigger value="other" className="flex-1 min-w-max text-brand-purple data-[state=active]:bg-gradient-to-br data-[state=active]:from-brand-indigo data-[state=active]:to-brand-purple data-[state=active]:text-white rounded-xl px-6 py-2 transition">Other</TabsTrigger>
            </TabsList>
            {/* Instagram Tab */}
            <TabsContent value="instagram">
              <h3 className="font-semibold mb-2 text-brand-purple flex items-center"><Instagram className="mr-2" /> Instagram</h3>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Impressions: <span className="font-mono">24,500</span></li>
                <li>Engagement Rate: <span className="font-mono">4.8%</span></li>
                <li>Followers: <span className="font-mono">2,400</span></li>
                <li>Top Performing Post: "Spring Launch"</li>
                <li>Peak Engagement: 6-9pm</li>
              </ul>
              <div className="text-gray-700">Your Instagram engagement is up 5.2% this week. Carousel posts and Reels are driving the most interactions. Consider posting more video content during peak hours.</div>
            </TabsContent>
            {/* Facebook Tab */}
            <TabsContent value="facebook">
              <h3 className="font-semibold mb-2 text-brand-purple flex items-center"><Facebook className="mr-2" /> Facebook</h3>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Impressions: <span className="font-mono">18,000</span></li>
                <li>Page Likes: <span className="font-mono">1,800</span></li>
                <li>Engagement Rate: <span className="font-mono">3.7%</span></li>
                <li>Top Performing Post: "Giveaway Announcement"</li>
                <li>Website Clicks: <span className="font-mono">98</span></li>
              </ul>
              <div className="text-gray-700">Facebook engagement is steady. Posts with images and contests are performing best. Try boosting top posts for more reach.</div>
            </TabsContent>
            {/* LinkedIn Tab */}
            <TabsContent value="linkedin">
              <h3 className="font-semibold mb-2 text-brand-purple flex items-center"><Users className="mr-2" /> LinkedIn</h3>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Impressions: <span className="font-mono">8,900</span></li>
                <li>Followers: <span className="font-mono">3,800</span></li>
                <li>Engagement Rate: <span className="font-mono">5.2%</span></li>
                <li>Top Performing Post: "Industry Insights"</li>
                <li>Peak Engagement: 9am-12pm</li>
              </ul>
              <div className="text-gray-700">LinkedIn posts with thought leadership and industry news are driving the most engagement. Consider sharing more articles and insights.</div>
            </TabsContent>
            {/* YouTube Tab */}
            <TabsContent value="youtube">
              <h3 className="font-semibold mb-2 text-brand-purple flex items-center"><LineChart className="mr-2" /> YouTube</h3>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Views: <span className="font-mono">12,000</span></li>
                <li>Watch Time: <span className="font-mono">1,200 hrs</span></li>
                <li>Subscribers: <span className="font-mono">2,100</span></li>
                <li>Top Performing Video: "Product Demo"</li>
                <li>Avg View Duration: <span className="font-mono">3:45</span></li>
              </ul>
              <div className="text-gray-700">YouTube channel is growing. Product demos and tutorials have the highest retention. Try adding more how-to content.</div>
            </TabsContent>
            {/* Google Ads Tab */}
            <TabsContent value="googleads">
              <h3 className="font-semibold mb-2 text-brand-purple flex items-center"><BarChart className="mr-2" /> Google Ads</h3>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Impressions: <span className="font-mono">45,000</span></li>
                <li>Clicks: <span className="font-mono">2,300</span></li>
                <li>CTR: <span className="font-mono">5.1%</span></li>
                <li>Avg CPC: <span className="font-mono">$1.23</span></li>
                <li>Conversions: <span className="font-mono">320</span></li>
              </ul>
              <div className="text-gray-700">Google Ads are performing well. Consider increasing budget on high-CTR campaigns and refining keywords for better conversion rates.</div>
            </TabsContent>
            {/* Amazon Ads Tab */}
            <TabsContent value="amazonads">
              <h3 className="font-semibold mb-2 text-brand-purple flex items-center"><TrendingUp className="mr-2" /> Amazon Ads</h3>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Impressions: <span className="font-mono">22,000</span></li>
                <li>Clicks: <span className="font-mono">1,100</span></li>
                <li>CTR: <span className="font-mono">4.2%</span></li>
                <li>ACoS: <span className="font-mono">18%</span></li>
                <li>Sales: <span className="font-mono">$4,500</span></li>
              </ul>
              <div className="text-gray-700">Amazon Ads are generating steady sales. Optimize product listings and test new keywords for improved results.</div>
            </TabsContent>
            {/* Other Tab */}
            <TabsContent value="other">
              <h3 className="font-semibold mb-2 text-brand-purple flex items-center"><ThumbsUp className="mr-2" /> Other Platforms</h3>
              <div className="text-gray-700">Detailed analytics for other platforms will be displayed here as they are integrated.</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceInsights; 