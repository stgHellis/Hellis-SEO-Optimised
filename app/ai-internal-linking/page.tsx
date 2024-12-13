import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';

const AIInternalLinking = () => {
  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <div className="container mx-auto px-4 py-8">
          {/* Header Navigation */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard" className="text-purple-600 text-lg hover:text-purple-700">Dashboard</Link>
            <span className="text-lg">/</span>
            <span className="text-lg">AI Internal Linking</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-semibold">3 Articles left (15 tokens)</span>
            <Button variant="outline" className="border-2 border-gray-800 hover:bg-gray-100">
              Upgrade Plan
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Create Content
            </Button>
          </div>
        </div>
          {/* Header with Buttons*/}
          <div className="flex justify-between items-center mb-8 mt-12">
            <div className="flex-1">
              <h1 className="text-4xl font-bold flex items-center gap-2">
                AI Internal Linking <span role="img" aria-label="robot">🤖</span>
              </h1>
              <p className="text-gray-500 mt-2">
            An innovative, AI-powered, fully automated internal linking solution.
          </p>
        </div>        
      </div> 

      {/* Warning Box */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-12 mt-24">
        <p className="text-purple-600 text-lg">
          This feature works only for WordPress-based sites. Before you begin, make sure that you have added WordPress integration to your project. If you are unsure how to do this, please{' '}
          <a href="#" className="underline">read our guide</a>.
        </p>
      </div>

      {/* Project Selection */}
      <div className="bg-white border-radus-lg rounded-lg p-6 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-4 mt-12">Select project</h2>
        <p className="text-gray-500 mb-8 text-lg mt-12">
          Choose the project for which you want to implement AI internal linking. (WordPress integration required)
        </p>
        <select className="w-full p-3 border border-gray-300 rounded-lg bg-white mb-12">
          <option value="">Select...</option>
        </select>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AIInternalLinking;
