import { Navbar } from '@/components/shared/navbar';
import React from 'react';

const Features = () => {
  return (
    <div>
      <Navbar />
    <div className="min-h-screen py-24 sm:py-32">      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div>
            <p className="text-4xl font-semibold leading-7 text-indigo-600 mb-16">Features</p>
          </div>          
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">
            Everything you need for SEO optimization
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-500">
            Discover our powerful features designed to boost your website's visibility and ranking.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-100 group-hover:bg-indigo-600 transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.name}
                  </h3>
                  <p className="mt-4 text-gray-600">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const features = [
  {
    name: 'Keyword Analysis',
    description: 'Advanced keyword research and analysis to target the right audience and improve your search rankings.',
  },
  {
    name: 'Content Optimization',
    description: 'AI-powered content suggestions and optimization to make your content more engaging and SEO-friendly.',
  },
  {
    name: 'Performance Tracking',
    description: 'Real-time tracking and analytics to monitor your website SEO performance and rankings.',
  },
  {
    name: 'Technical SEO',
    description: 'Comprehensive technical SEO audits and recommendations to improve your website structure.',
  },
  {
    name: 'Competitor Analysis',
    description: 'Detailed competitor analysis to understand and outperform your competition in search results.',
  },
  {
    name: 'Mobile Optimization',
    description: 'Ensure your website is fully optimized for mobile devices and responsive across all platforms.',
  },
];

export default Features;
