'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard" className="text-purple-600 text-lg hover:text-purple-700">Dashboard</Link>
            <span className="text-lg">/</span>
            <span className="text-lg">Projects</span>
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

        <h1 className="text-3xl font-bold mb-4 mt-12">Projects</h1>
        <p className="text-gray-600 text-lg mb-8">You have 1 project</p>

        <div className="flex items-center gap-4 mt-16">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Create New Project
          </Button>
        </div>

        {/* Search Input */}
        <div className="mt-8 mb-12">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full text-white p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-6 border-b border-gray-100 bg-gray-50">
            <div className="text-lg font-semibold text-gray-600">Project Name</div>
            <div className="text-lg font-semibold text-gray-600">Unpublished Articles</div>
            <div className="text-lg font-semibold text-gray-600">Wordpress</div>
            <div className="text-lg font-semibold text-gray-600">PBN</div>
            <div className="text-lg font-semibold text-gray-600">Delete</div>
          </div>

          {/* Project Row */}
          <div className="grid grid-cols-5 gap-4 p-6 items-center hover:bg-gray-50">
            <div className="text-purple-600 text-lg">stgHellis</div>
            <div>0</div>
            <div>
              <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </div>
            <div>
              <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <Button variant="destructive" size="sm" className="text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700">
                Delete
              </Button>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
