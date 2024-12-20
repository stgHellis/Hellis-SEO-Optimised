"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";

export default function CreateContentPage() {
  const [activeTab, setActiveTab] = useState<'blog' | 'ecommerce'>('blog');

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard" className="text-purple-600 text-lg hover:text-purple-700">Dashboard</Link>
            <span className="text-lg">/</span>
            <span className="text-lg">Create Content</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-semibold">3 Articles left (15 tokens)</span>
            <Link href="/subscription">
              <Button variant="outline" className="border-2 border-gray-800 hover:bg-purple-200">
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 rounded-xl bg-[#F5F5DC]">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Let's write some content</h2>
          <p className="text-gray-600 text-xl mb-6">Choose one of our models and create outstanding articles.</p>
          
          <div className="flex gap-2 mb-10 mt-16 border-b-2 border-gray-400">
            <button 
              className={`pb-2 ${activeTab === 'blog' ? 'text-purple-600 text-lg font-semibold border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('blog')}
            >
              Blog Articles
            </button>
            <button 
              className={`pb-2 ${activeTab === 'ecommerce' ? 'text-purple-600 text-lg font-semibold border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('ecommerce')}
            >
              E-commerce
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {activeTab === 'blog' ? (
              <>
                {/* Fast Writer Card */}
                <Link href="/create-content/hellis-seo-01" className="block">
                  <div className="bg-white border rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
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

                    <Link href="/create-content/hellis-seo-01" className="w-full">
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                        Create Content
                      </button>
                    </Link>
                  </div>
                </Link>

                {/* Advanced Writer Card */}
                <Link href="/subscription" className="block">
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
                    <Link href="/subscription" className="w-full">
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                        Subscribe to use Advanced Writer
                      </button>
                    </Link>
                  </div>
                </Link>

                {/* Neuron Writer Card */}
                <Link href="/create" className="block">
                  <div className="bg-white border rounded-xl p-6 relative transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
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
                  <div className="bg-white border rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
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
                    <Link href="/create-content/category-description">
                      <Button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                        Create Description Content
                      </Button>
                    </Link>
                  </div>
                </Link>

                {/* Product Description Card */}
                <Link href="/create" className="block">
                  <div className="bg-white border rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
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
                  <div className="bg-white border rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
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