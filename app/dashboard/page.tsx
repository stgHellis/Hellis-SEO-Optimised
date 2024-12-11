'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'blog' | 'ecommerce'>('blog');

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white h-screen fixed p-5 border-r border-gray-200">
        <div className="text-2xl font-semibold mb-10">Hellis SEO</div>
        
        <nav className="space-y-2">
          <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg bg-gray-100">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>
          <Link href="/projects" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Projects
          </Link>
          <Link href="/articles" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Articles
          </Link>
        </nav>

        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            TOOLS
          </div>
          <Link href="/create" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Content
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

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
            Create Content
          </Button>
        </div>

        <div className="bg-purple-600 p-4 rounded-xl text-white flex justify-between items-center mb-8">
          <span>⚡ Special Offer: Get 40% off on all plans!</span>
          <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
            Upgrade Now
          </Button>
        </div>

        <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
        <p className="text-gray-600 mb-8">Here's an overview of your content performance</p>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl">
            <div className="text-3xl font-bold">0</div>
            <div className="text-gray-500">Total Articles</div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="text-3xl font-bold">0</div>
            <div className="text-gray-500">Unpublished</div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="text-3xl font-bold">0</div>
            <div className="text-gray-500">In Progress</div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="text-3xl font-bold">1</div>
            <div className="text-gray-500">Projects</div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Let's write some content</h2>
          <p className="text-gray-600 text-xl mb-6">Choose one of our models and create outstanding articles.</p>
          
          <div className="flex gap-2 mb-8">
            <button 
              className={`pb-2 ${activeTab === 'blog' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('blog')}
            >
              Blog Articles
            </button>
            <button 
              className={`pb-2 ${activeTab === 'ecommerce' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('ecommerce')}
            >
              E-commerce
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {activeTab === 'blog' ? (
              <>
                {/* Fast Writer Card */}
                <Link href="/create" className="block">
                  <div className="border rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
                    <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-4">
                      Smart text formatting
                    </span>
                    <h3 className="text-2xl font-semibold mb-2">Fast Writer</h3>
                    <p className="text-gray-600 text-lg font-bold mb-6 mt-6">Advanced model with user-friendly text formatting.</p>
                    <p className="text-gray-600 text-lg mb-6">Create a fully formatted article ready for publication on your website.</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Headings</span>
                        <span className="text-gray-600">AI generated / manually</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="text-gray-600">Blog article</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost</span>
                        <span className="text-gray-600">1 Article (5 tokens)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Feature</span>
                        <span className="text-gray-600">Bulk generator</span>
                      </div>
                    </div>

                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                      Create Content
                    </button>
                  </div>
                </Link>

                {/* Advanced Writer Card */}
                <Link href="/create" className="block">
                  <div className="border-2 border-purple-300 rounded-xl p-6 relative transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-500 cursor-pointer bg-white shadow-md">
                    <div className="absolute -top-3 -right-3 bg-purple-600 text-white px-4 py-1 rounded-full transform rotate-12 shadow-md">
                      Recommended
                    </div>
                    <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-4">
                      SERP Analysis
                    </span>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500">⚡</span>
                      <h3 className="text-2xl font-semibold">Advanced Writer</h3>
                    </div>
                    <p className="text-gray-600 text-lg font-bold mb-6 mt-6">The most advanced model using competitor analysis from SERP.</p>
                    <p className="text-gray-600 text-lg mb-6">Create content based on an advanced competitor analysis from the SERP.</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Headings</span>
                        <span className="text-gray-600">AI generated</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="text-gray-600">Based on source</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost</span>
                        <span className="text-gray-600">1 Article (5 tokens)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Feature</span>
                        <span className="text-gray-600">SERP Analysis</span>
                      </div>
                    </div>

                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                      Subscribe to use Advanced Writer
                    </button>
                  </div>
                </Link>

                {/* Neuron Writer Card */}
                <Link href="/create" className="block">
                  <div className="border rounded-xl p-6 relative transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
                    <div className="absolute -top-3 -right-3 bg-gray-800 text-white px-4 py-1 rounded-full transform rotate-12">
                      NEURON
                    </div>
                    <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-4">
                      Advanced SEO optimization
                    </span>
                    <h3 className="text-2xl font-semibold mb-2">Neuron & Contadu Writer</h3>
                    <p className="text-gray-600 text-lg font-bold mb-6 mt-6">Advanced SEO optimization through integration with Neuron Writer.</p>
                    <p className="text-gray-600 text-lg mb-6">Create a perfectly SEO-optimized article ready for publication on your website.</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Headings</span>
                        <span className="text-gray-600">AI generated</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="text-gray-600">Based on keywords</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost</span>
                        <span className="text-gray-600">1 Article (5 tokens)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Feature</span>
                        <span className="text-gray-600">NeuronWriter Integration</span>
                      </div>
                    </div>

                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                      Create Content
                    </button>
                  </div>
                </Link>
              </>
            ) : (
              <>
                {/* E-commerce Card */}
                <Link href="/create" className="block">
                  <div className="border rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
                    <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-4">
                      E-commerce
                    </span>
                    <h3 className="text-3xl font-semibold mb-2">Copy-commerce-001</h3>
                    <p className="text-gray-600 text-lg font-bold mb-6 mt-6">Advanced model designed for online stores.</p>
                    <p className="text-gray-600 text-lg mb-6">Create category descriptions that are uniquely customized for your store.</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Headings</span>
                        <span className="text-gray-600">AI generated</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="text-gray-600">Category description</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost</span>
                        <span className="text-gray-600">1 Article (5 tokens)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Feature</span>
                        <span className="text-gray-600">Personalization</span>
                      </div>
                    </div>

                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                      Create Content
                    </button>
                  </div>
                </Link>

                {/* Product Description Card */}
                <Link href="/create" className="block">
                  <div className="border rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
                    <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-4">
                      Product Descriptions
                    </span>
                    <h3 className="text-3xl font-semibold mb-2">Product Writer</h3>
                    <p className="text-gray-600 text-lg font-bold mb-6 mt-6">Specialized in product descriptions.</p>
                    <p className="text-gray-600 text-lg mb-6">Create compelling product descriptions that convert.</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Headings</span>
                        <span className="text-gray-600">AI generated</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="text-gray-600">Product description</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost</span>
                        <span className="text-gray-600">1 Article (5 tokens)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Feature</span>
                        <span className="text-gray-600">SEO Optimization</span>
                      </div>
                    </div>

                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                      Create Content
                    </button>
                  </div>
                </Link>

                {/* Meta Description Card */}
                <Link href="/create" className="block">
                  <div className="border rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
                    <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-4">
                      Meta Content
                    </span>
                    <h3 className="text-3xl font-semibold mb-2">Meta Writer</h3>
                    <p className="text-gray-600 text-lg font-bold mb-6 mt-6">Optimized meta descriptions and titles.</p>
                    <p className="text-gray-600 text-lg mb-6">Create SEO-friendly meta content for your products.</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Headings</span>
                        <span className="text-gray-600">AI generated</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="text-gray-600">Meta content</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost</span>
                        <span className="text-gray-600">1 Article (5 tokens)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Feature</span>
                        <span className="text-gray-600">Meta Optimization</span>
                      </div>
                    </div>

                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                      Create Content
                    </button>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}