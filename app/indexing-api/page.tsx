import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';

export default function IndexingAPIPage() {
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
            <span className="text-lg">Indexing API</span>
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
          <h1 className="text-4xl font-bold mb-4">Indexing API</h1>
          <p className="text-gray-500 text-lg">
            The Indexing API allows speeding up the indexing of pages in the Google search engine. More informations{' '}
            <Link href="#" className="text-purple-600 hover:text-purple-700">here</Link>.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-12">
          <div className="flex justify-between items-center">
            <p className="text-purple-600 text-lg">
              Setup your first Indexing API project to start using the tool.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white ml-4 whitespace-nowrap">
              Create project
            </Button>
          </div>
        </div>

        {/* Content area - will be populated once a project is created */}
        <div className="bg-white rounded-lg p-8">
          {/* Project configuration and indexing tools will appear here */}
        </div>
      </div>
    </div>
  );
}
