'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { useProjects } from "@/store/useProjects";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'blog' | 'ecommerce'>('blog');
  const [currentTime, setCurrentTime] = useState('');
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    setProjectCount(useProjects.getState().projects.length);
    
    // Subscribe to store changes
    const unsubscribe = useProjects.subscribe(
      state => setProjectCount(state.projects.length)
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-semibold">3 Articles left ( 15 tokens )</span>
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

        <div className="bg-purple-600 p-4 rounded-xl text-white flex justify-between items-center mb-16 mt-20">
          <span>⚡ Special Offer: Get 40% off on all plans!</span>
          <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
            Upgrade Now
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-2 mt-8">Welcome back!</h2>
        <p className="text-gray-600 mb-8">Here's an overview of your content performance</p>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[40px] font-bold">0</div>
                <div className="text-gray-600">Total</div>
              </div>
              <div className="bg-[#F8F5FF] p-3 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#7C3AED" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <Link href="/articles" className="block w-full">
              <button className="w-full text-[#6366F1] bg-[#F8F5FF] py-2 rounded-lg text-center">Go to articles</button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[40px] font-bold">0</div>
                <div className="text-gray-600">Unpublished</div>
              </div>
              <div className="bg-[#F8F5FF] p-3 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V13M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.995 16H12.004" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <Link href="/publish" className="block w-full">
              <button className="w-full text-[#6366F1] bg-[#F8F5FF] py-2 rounded-lg text-center">Publish articles</button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[40px] font-bold">0</div>
                <div className="text-gray-600">In progress</div>
              </div>
              <div className="bg-[#F8F5FF] p-3 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.9965 12H16.0054M11.9955 12H12.0045M8.00439 12H8.01339" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <Link href="/status" className="block w-full">
              <button className="w-full text-[#6366F1] bg-[#F8F5FF] py-2 rounded-lg text-center">View status</button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[40px] font-bold">{projectCount}</div>
                <div className="text-gray-600">Project{projectCount !== 1 ? 's' : ''}</div>
              </div>
              <div className="bg-[#F8F5FF] p-3 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.6001 9H20.4001" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.6001 15H20.4001" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20.7C13.6569 20.7 15 16.9706 15 12C15 7.02944 13.6569 3.3 12 3.3C10.3431 3.3 9 7.02944 9 12C9 16.9706 10.3431 20.7 12 20.7Z" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <Link href="/projects" className="block w-full">
              <button className="w-full text-[#6366F1] bg-[#F8F5FF] py-2 rounded-lg text-center">Go to projects</button>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-[#F5F5DC] p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Let's write some content</h2>
          <p className="text-gray-600 text-xl mb-6">Choose one of our models and create outstanding articles.</p>
          
          <div className="flex gap-2 mb-8">
            <button 
              className={`pb-2 ${activeTab === 'blog' ? 'text-lg font-semibold text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('blog')}
            >
              Blog Articles
            </button>
            <button 
              className={`pb-2 ${activeTab === 'ecommerce' ? 'text-lg font-semibold text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
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

                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                      Create Content
                    </button>
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
                      <Button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                        Subscribe to use Advanced Writer
                      </Button>
                    </Link>
                  </div>
                </Link>

                {/* Neuron Writer Card */}
                <Link href="/create" className="block">
                  <div className="bg-white shadow-md border rounded-xl p-6 relative transition duration-300 ease-in-out hover:shadow-lg hover:border-purple-300 cursor-pointer">
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

                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                      Create Content
                    </button>
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