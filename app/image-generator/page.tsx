import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import { Textarea } from '@/components/ui/textarea';

export default function ImageGeneratorPage() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard" className="text-purple-600 text-lg hover:text-purple-700">Dashboard</Link>
            <span className="text-lg">/</span>
            <span className="text-lg">Image Generator</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-semibold">3 Articles left (15 tokens)</span>
            <Link href="/subscription">
              <Button variant="outline" className="border-2 border-gray-800 hover:bg-gray-100">
                Upgrade Plan
              </Button>
            </Link>
            <Link href="/create-content">
              <Button className="p-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                Create Content
              </Button>
            </Link>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Image Generator</h1>
          <p className="text-gray-500 text-lg">
            Transform ideas into images effortlessly with our Image Generator, powered by DALL-E 3.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-12">
          <p className="text-purple-600 text-lg text-center">
            Submit your idea below and watch as DALL-E 3 produces three images based on your prompt.
          </p>
        </div>

        {/* Image Generation Form */}
        <div className="bg-white rounded-lg p-8 max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-lg font-medium text-gray-700">Prompt:</label>
              <span className="text-gray-500">Cost: 2 tokens</span>
            </div>
            <Textarea 
              placeholder="A photograph of a white Siamese cat."
              className="w-full p-4 h-32 border border-gray-300 rounded-lg"
            />
          </div>
          
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4">
            Generate Images
          </Button>

          {/* Images will be displayed here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Image placeholders */}
          </div>
        </div>
      </div>
    </div>
  );
}
