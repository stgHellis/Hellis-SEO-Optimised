'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import { useProjects } from "@/store/useProjects";

const AIInternalLinking = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [project, setProject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { projects } = useProjects();

  // Set the first project as default when projects load
  useEffect(() => {
    if (projects.length > 0 && !project) {
      setProject(projects[0].name);
    }
  }, [projects, project]);

  const handleProjectSelect = (selectedProject: string) => {
    setProject(selectedProject);
    setIsLoading(true);
    // Simulate loading for demonstration
    setTimeout(() => {
      setIsLoading(false);
      router.push('/ai-internal-linking/crawler');
    }, 2000);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Loading Project...</h1>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-purple-600 h-2.5 rounded-full w-3/4 transition-all duration-1000"></div>
          </div>
        </div>
      );
    }

    return null;
  };

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
          <div className="max-w-5xl mx-auto text-center bg-purple-50 border border-purple-200 rounded-lg p-4 mb-12 mt-24">
            <p className="text-purple-600 text-lg">
              This feature works only for WordPress-based sites. Before you begin, make sure that you have added WordPress integration to your project. If you are unsure how to do this, please{' '}
              <a href="#" className="underline">read our guide</a>.
            </p>
          </div>

          {/* Project Selection */}
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto text-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Select project</h2>
              <p className="text-gray-600 mb-10">Choose the project for which you want to implement AI internal linking.</p>
              <select
                value={project}
                onChange={(e) => handleProjectSelect(e.target.value)}
                className="w-full p-2 border rounded bg-gray-100"
              >
                {projects.map((proj) => (
                  <option key={proj.name} value={proj.name}>
                    {proj.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Render dynamic content based on state */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AIInternalLinking;
