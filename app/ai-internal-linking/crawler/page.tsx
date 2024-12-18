'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';

const CrawlerPage = () => {
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            AI Internal Linking <span role="img" aria-label="robot">🤖</span>
          </h1>
          <p className="text-gray-600 mt-2">
            An innovative, AI-powered, fully automated internal linking solution.
          </p>
        </div>

        {/* Change Project Button */}
        <Link href="/ai-internal-linking">
          <Button className="mb-8 p-3 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
            Change Project
          </Button>
        </Link>

        {/* Progress Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="flex-1 flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold">Step 1</h2>
                <h3 className="text-xl text-gray-500">Crawl & Save Data</h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-lg">1</span>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 font-semibold text-lg">2</span>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 font-semibold text-lg">3</span>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 font-semibold text-lg">4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-400 mb-6 text-lg">
            <div className="flex gap-8">
              <button className="pb-4 px-2 border-b-2 border-purple-600 text-purple-600">
                Crawler
              </button>
              <button className="pb-4 px-2 text-gray-500">
                Collected data
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <p className="text-purple-600 text-lg">
              In this step, we are going to run a crawl on all your WordPress posts to gain a better understanding of your websites structure. 
              The collected data on internal links and anchor texts will be used in future steps. It will assist our algorithms in more accurately 
              selecting keywords for articles and preventing cannibalization.
            </p>
          </div>

          {/* Crawl Settings */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-center mb-4">Crawl Settings</h2>
            <p className="text-gray-600 text-center mb-8">We only crawl WordPress posts and do not include other pages in the crawl.</p>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-700">Crawl pages limit:</span>
                <div className="text-gray-700">
                  50 <Link href="/subscription" className="text-purple-600 underline ml-1">Subscribe for unlimited crawl</Link>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-gray-700 text-lg">Crawl posts from categories</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">0 Categories found</span>
                  <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reload categories
                  </button>
                </div>
              </div>

              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium">
                Start Crawler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CrawlerPage;
