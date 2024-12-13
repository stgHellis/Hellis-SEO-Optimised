'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white h-screen fixed p-5 border-r border-gray-200">
      <div className="text-2xl font-semibold mb-10 mt-8">Hellis SEO</div>
      
      <nav className="space-y-2">
        <Link 
          href="/dashboard" 
          className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg ${
            pathname === '/dashboard' ? 'bg-gray-100 text-gray-700' : ''
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </Link>
        <Link 
          href="/projects" 
          className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg ${
            pathname === '/projects' ? 'bg-gray-100 text-gray-700' : ''
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Projects
        </Link>
        <Link 
          href="/articles" 
          className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg ${
            pathname === '/articles' ? 'bg-gray-100 text-gray-700' : ''
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Articles
        </Link>
        <Link 
          href="/create-content" 
          className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg ${
            pathname === '/create-content' ? 'bg-gray-100 text-gray-700' : ''
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Content
        </Link>
        <Link href="/ai-internal-linking" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          AI Internal Linking
        </Link>
      </nav>

      <div className="space-y-1">
      <div className="text-lg font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-3">
        TOOLS
      </div>
        <Link href="/image-generator" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          Image Generator
        </Link>
        <Link href="/indexing-api" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          Indexing API
        </Link>
        <Link href="/pbn-management" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          PBN Management
        </Link>
        <Link href="/settings" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </Link>
      </div>

      {/* User Info */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center px-4 py-3 bg-gray-100 rounded-lg">
        <svg className="w-8 h-8 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">user@example.com</span>
        </div>
      </div>
    </div>
  );
}
