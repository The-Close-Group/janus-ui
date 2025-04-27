import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ThumbsUp, MessageSquare, Instagram } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    image: '',
    caption: 'A beautiful sunset over the city.',
    likes: 317,
    comments: 44,
    platform: 'Instagram',
  },
  {
    id: 2,
    image: '',
    caption: 'Exploring the mountains!',
    likes: 323,
    comments: 19,
    platform: 'Instagram',
  },
  {
    id: 3,
    image: '',
    caption: 'Coffee break vibes.',
    likes: 388,
    comments: 37,
    platform: 'Instagram',
  },
];

const Library: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Library</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
        {mockPosts.map((post) => (
          <Card key={post.id} className="relative group overflow-hidden rounded-2xl shadow-md border border-gray-200 bg-white">
            <div className="aspect-square bg-gray-100 flex items-center justify-center relative cursor-pointer" onClick={() => setSelectedPost(post)}>
              <Instagram className="h-16 w-16 text-gray-300 group-hover:opacity-30 transition-opacity duration-200" />
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
                <div>
                  <div className="font-bold text-lg mb-2">{selectedPost.caption}</div>
                  <div className="flex gap-4 text-gray-500 text-base mb-4">
                    <span className="flex items-center gap-1"><ThumbsUp className="h-5 w-5" /> {selectedPost.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-5 w-5" /> {selectedPost.comments}</span>
                  </div>
                  <div className="text-sm text-gray-400">Platform: {selectedPost.platform}</div>
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
  );
};

export default Library; 