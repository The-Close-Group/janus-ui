import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CampaignControls: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      <div className="w-full flex justify-start mb-4">
        <Button className="bg-gradient-to-br from-brand-indigo to-brand-purple text-white" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </Button>
      </div>
      <Card className="max-w-2xl w-full mb-8">
        <CardHeader>
          <CardTitle>Campaign Controls</CardTitle>
          <CardDescription>Manage your campaign settings below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label className="block font-semibold mb-1">Budget ($)</label>
              <input type="number" className="w-full border rounded-lg px-3 py-2" placeholder="Enter budget" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Duration (days)</label>
              <input type="number" className="w-full border rounded-lg px-3 py-2" placeholder="Enter duration" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Target Audience</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="e.g., Age, Location, Interests" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Platforms</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>Instagram</option>
                <option>Facebook</option>
                <option>LinkedIn</option>
                <option>Google Ads</option>
                <option>Amazon Ads</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Objective</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>Brand Awareness</option>
                <option>Lead Generation</option>
                <option>Conversions</option>
                <option>Traffic</option>
              </select>
            </div>
            <Button className="w-full bg-gradient-to-br from-brand-indigo to-brand-purple text-white">Save Campaign Settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignControls; 