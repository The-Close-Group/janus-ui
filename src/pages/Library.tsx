import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ThumbsUp, MessageSquare, Instagram, LineChart, ArrowLeft, BarChart, TrendingUp, Users, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockPosts = [
  {
    id: 0,
    image: '/ads/taxwire-ad-1.png',
    caption: 'Sponsored: Stay Ahead of the Curve. Your Taxes, Simplified.',
    likes: 120,
    comments: 8,
    platform: 'Advertisement',
    cpc: '$1.23',
    cr: '7.8%',
    ir: '24,500',
    lg: '312',
  },
  {
    id: 1,
    image: '',
    caption: 'A beautiful sunset over the city.',
    likes: 317,
    comments: 44,
    platform: 'Instagram',
    cpc: '$0.98',
    cr: '6.2%',
    ir: '18,200',
    lg: '210',
  },
  {
    id: 2,
    image: '',
    caption: 'Exploring the mountains!',
    likes: 323,
    comments: 19,
    platform: 'Instagram',
    cpc: '$1.10',
    cr: '8.1%',
    ir: '21,700',
    lg: '275',
  },
  {
    id: 3,
    image: '',
    caption: 'Coffee break vibes.',
    likes: 388,
    comments: 37,
    platform: 'Instagram',
    cpc: '$1.35',
    cr: '5.9%',
    ir: '16,900',
    lg: '198',
  },
];

const DashboardMetricCard = ({ title, value, icon: Icon, className }: {
  title: string;
  value: string;
  icon: React.ElementType;
  className?: string;
}) => (
  <div className={`bg-gradient-to-br from-brand-indigo to-brand-purple text-white rounded-2xl border-2 border-brand-purple/40 shadow-lg flex items-center gap-4 p-4 ${className || ''}`}>
    <Icon className="h-6 w-6 text-white" />
    <div>
      <div className="text-xs font-medium text-white/80">{title}</div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  </div>
);

const sidebarOptions = [
  { label: 'All Posts', value: 'all' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Ads', value: 'ads' },
  { label: 'Saved', value: 'saved' },
];

const Library: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white p-8 flex">
      {/* Sidebar */}
      <div className="flex flex-col items-start mr-8 min-w-[160px]">
        <button
          className="flex items-center gap-2 px-4 py-2 mb-8 rounded-lg bg-gradient-to-br from-brand-indigo to-brand-purple text-white font-semibold hover:from-brand-indigo/90 hover:to-brand-purple/90 transition"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>
        {/* Filter button */}
        <button
          className="flex items-center gap-2 px-4 py-2 mb-2 rounded-full bg-gray-100 text-brand-purple font-semibold hover:bg-brand-purple/10 transition w-full justify-between"
          onClick={() => setShowFilters(v => !v)}
        >
          Filter
          <ChevronDown className={`h-5 w-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        {showFilters && (
          <div className="flex flex-col gap-2 w-full mt-2 bg-white rounded-2xl shadow-lg p-2 z-10">
            {sidebarOptions.map(opt => (
              <button
                key={opt.value}
                className={`w-full px-4 py-2 rounded-full font-semibold text-left transition ${selectedFilter === opt.value ? 'bg-brand-purple text-white' : 'bg-gray-100 text-brand-purple hover:bg-brand-purple/10'}`}
                onClick={() => { setSelectedFilter(opt.value); setShowFilters(false); }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Main content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-center mb-8">Library</h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
          {mockPosts
            .filter(post => selectedFilter === 'all' ||
              (selectedFilter === 'ads' && post.platform === 'Advertisement') ||
              (selectedFilter === 'instagram' && post.platform === 'Instagram') ||
              (selectedFilter === 'facebook' && post.platform === 'Facebook') ||
              (selectedFilter === 'linkedin' && post.platform === 'LinkedIn'))
            .map((post) => (
              <Card key={post.id} className="relative group overflow-hidden rounded-2xl shadow-md border border-gray-200 bg-white">
                <div className="aspect-square bg-gray-100 flex items-center justify-center relative cursor-pointer" onClick={() => setSelectedPost(post)}>
                  {post.image ? (
                    <img src={post.image} alt={post.caption} className="object-contain h-32 w-32" />
                  ) : (
                    <Instagram className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
                    <span className="text-white text-2xl font-bold">&#x1F50D;</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-2 truncate">{post.caption}</div>
                  <div className="flex gap-4 text-gray-500 text-sm">
                    <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {post.comments}</span>
                  </div>
                </div>
              </Card>
            ))}
        </div>
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-3xl p-0 flex flex-row overflow-hidden">
            {selectedPost && (
              <>
                <div className="flex-1 bg-gray-100 flex items-center justify-center min-h-[400px]">
                  <Instagram className="h-40 w-40 text-gray-300" />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div className="font-bold text-lg mb-4">{selectedPost.caption}</div>
                  <div className="space-y-4 mb-6">
                    <DashboardMetricCard title="Cost Per Click (CPC)" value={selectedPost.cpc} icon={BarChart} />
                    <DashboardMetricCard title="Conversion Rate (CR)" value={selectedPost.cr} icon={TrendingUp} />
                    <DashboardMetricCard title="Impressions (IR)" value={selectedPost.ir} icon={LineChart} />
                    <DashboardMetricCard title="Leads Generated (LG)" value={selectedPost.lg} icon={Users} />
                  </div>
                  <div className="text-sm text-gray-400 mb-2">Platforms Posted:</div>
                  <div className="flex gap-3 mb-2">
                    <Instagram className="h-6 w-6 bg-gradient-to-br from-brand-indigo to-brand-purple bg-clip-text text-transparent" />
                    {/* Facebook icon as SVG for demo */}
                    <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.326v-21.349c0-.734-.593-1.326-1.324-1.326z"/></svg>
                  </div>
                  <button className="mt-8 px-4 py-2 rounded-lg bg-brand-purple text-white font-semibold hover:bg-brand-purple/90" onClick={() => setSelectedPost(null)}>
                    Close
                  </button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Library; 