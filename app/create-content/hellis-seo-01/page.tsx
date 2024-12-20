'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Sidebar } from '@/components/Sidebar';
import Link from 'next/link';
import { useProjects } from "@/store/useProjects";
import { SEO_CONTENT_PROMPT } from '@/prompt';

interface Step {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
}

const HellisSeoPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [project, setProject] = useState("");
  const [language, setLanguage] = useState('French');
  const [topics, setTopics] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>(['sac en bandoulière']);
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'ai' | 'csv'>('manual');
  const [selectedOptions, setSelectedOptions] = useState({
    h2: false,
    faq: false,
    toc: true,
    image: false
  });
  const [selectedTitleOptions, setSelectedTitleOptions] = useState<{
    [key: string]: {
      h2: boolean;
      faq: boolean;
      toc: boolean;
      image: boolean;
    };
  }>({});

  const { projects } = useProjects();

  useEffect(() => {
    if (projects.length > 0 && !project) {
      setProject(projects[0].name);
    }
  }, [projects, project]);

  const steps: Step[] = [
    { id: 1, name: 'Select Project', completed: currentStep > 1, current: currentStep === 1 },
    { id: 2, name: 'Select language', completed: currentStep > 2, current: currentStep === 2 },
    { id: 3, name: 'Add topics', completed: currentStep > 3, current: currentStep === 3 },
    { id: 4, name: 'Review', completed: currentStep > 4, current: currentStep === 4 },
    { id: 5, name: 'Done', completed: currentStep > 5, current: currentStep === 5 },
  ];

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      <Sidebar />    
      <div className="flex-1 ml-64 p-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard" className="text-purple-600 text-lg hover:text-purple-700">Dashboard</Link>
            <span className="text-lg">/</span>
            <Link href="/create-content" className="text-purple-600 text-lg hover:text-purple-700">Create Content</Link>
            <span className="text-lg">/</span>
            <span className="text-lg">Hellis-seo-01</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-semibold">3 Articles left (15 tokens)</span>
            <Button variant="outline" className="border-2 border-gray-800 hover:bg-purple-200">
              Upgrade Plan
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Create Content
            </Button>
          </div>
        </div>

        {/* Stepper */}
        <div className="max-w-5xl mx-auto flex justify-between items-center mt-24 mb-24">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className="flex items-center">
                <div className={`rounded-full w-16 h-16 flex items-center justify-center text-lg ${
                  step.completed ? 'bg-purple-600 text-white' :
                  step.current ? 'bg-purple-600 text-white' :
                  'bg-gray-300'
                }`}>
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-40 mx-2 ${
                    step.completed ? 'bg-purple-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
              <span className="mt-2 text-base font-medium">{step.name}</span>
            </div>
          ))}
        </div>
        
        {/* Content Layout */}
        <div className="max-w-7xl mx-auto flex gap-6 mt-8">
          {/* Main Content Card */}
          <Card className="flex-1 p-8">
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Select project</h2>
                <p className="text-gray-600 mb-4">Choose the project for which you want to implement AI internal linking.</p>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-100"
                >
                  <option value="">Select project</option>
                  {projects.map((proj) => (
                    <option key={proj.name} value={proj.name}>
                      {proj.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Select language</h2>
                <p className="text-gray-600 mb-4">Choose the language in which you want to write your content.</p>
                <div className="flex items-center space-x-2 p-2 bg-purple-100 rounded">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded">{language}</span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="flex-1 p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Italian">Italian</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="Dutch">Dutch</option>
                    <option value="Polish">Polish</option>
                    <option value="Russian">Russian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Korean">Korean</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Turkish">Turkish</option>
                    <option value="Vietnamese">Vietnamese</option>
                    <option value="Thai">Thai</option>
                    <option value="Indonesian">Indonesian</option>
                    <option value="Greek">Greek</option>
                    <option value="Swedish">Swedish</option>
                    <option value="Danish">Danish</option>
                    <option value="Finnish">Finnish</option>
                    <option value="Norwegian">Norwegian</option>
                    <option value="Czech">Czech</option>
                    <option value="Hungarian">Hungarian</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Add topics</h2>
                {/* Tabs */}
                <div className="flex space-x-4 mb-6 border-b">
                  <button
                    onClick={() => setActiveTab('manual')}
                    className={`pb-2 px-4 ${
                      activeTab === 'manual'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600'
                    }`}
                  >
                    Add manually
                  </button>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`pb-2 px-4 flex items-center gap-2 ${
                      activeTab === 'ai'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600'
                    }`}
                  >
                    Keywords AI
                    <span className="text-yellow-500">✨</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('csv')}
                    className={`pb-2 px-4 ${
                      activeTab === 'csv'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600'
                    }`}
                  >
                    Upload CSV
                  </button>
                </div>

                {/* Manual Tab Content */}
                {activeTab === 'manual' && (
                  <div>
                    <p className="text-gray-600 mb-4">Add topics for your articles manually. Each topic is one article.</p>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Topic:</label>
                      <Input 
                        placeholder="How To Improve Productivity In My Business?"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="mb-4"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedOptions.h2}
                            onCheckedChange={(checked) => 
                              setSelectedOptions(prev => ({ ...prev, h2: checked === true }))
                            }
                          />
                          <span>Add H2 headings manually</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedOptions.faq}
                            onCheckedChange={(checked) => 
                              setSelectedOptions(prev => ({ ...prev, faq: checked === true }))
                            }
                          />
                          <span>FAQ</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedOptions.toc}
                            onCheckedChange={(checked) => 
                              setSelectedOptions(prev => ({ ...prev, toc: checked === true }))
                            }
                          />
                          <span>Table of Contents</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedOptions.image}
                            onCheckedChange={(checked) => 
                              setSelectedOptions(prev => ({ ...prev, image: checked === true }))
                            }
                          />
                          <span>Generate Image</span>
                        </label>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-100 text-purple-600 hover:bg-purple-200">
                      Add
                    </Button>
                  </div>
                )}

                {/* AI Tab Content */}
                {activeTab === 'ai' && (
                  <div>
                    <p className="text-gray-600 mb-4 text-center">
                      Provide the keywords related to the article topics you're interested in. 
                      Based on them, Hellis SEO will generate 10 topic suggestions.
                    </p>
                    <p className="text-gray-900 text-lg font-semibold text-center my-8">This option is free.</p>
                    <div className="flex gap-2 mb-8">
                      <Input 
                        placeholder="employee productivity"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                      <Button 
                        className="bg-purple-100 text-purple-600 hover:bg-purple-200 px-8 rounded-lg"
                        onClick={() => {
                          if (keyword.trim()) {
                            setKeywords(prev => [...prev, keyword.trim()]);
                            setKeyword('');
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>

                    {keywords.length > 0 && (
                      <>
                        <div className="mb-4">
                          <h3 className="text-gray-700 mb-2 flex items-center gap-2">
                            List of your keywords
                            <span className="cursor-pointer">➜</span>
                          </h3>
                          <div className="space-y-2">
                            {keywords.map((kw, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg">
                                  {kw}
                                </span>
                                <button
                                  onClick={() => setKeywords(keywords.filter((_, i) => i !== index))}
                                  className="text-red-500 px-4 py-1 hover:text-red-600"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Button 
                            className="bg-purple-100 text-purple-600 hover:bg-purple-200 px-8 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                            onClick={async () => {
                              try {
                                setIsGenerating(true);
                                const response = await fetch('/api/generate-titles', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    keywords,
                                    language
                                  }),
                                });

                                if (!response.ok) {
                                  throw new Error('Failed to generate titles');
                                }

                                const data = await response.json();
                                setGeneratedTitles(data.titles);
                              } catch (error) {
                                console.error('Error:', error);
                                // You might want to show an error message to the user here
                              } finally {
                                setIsGenerating(false);
                              }
                            }}
                            disabled={isGenerating || keywords.length === 0}
                          >
                            {isGenerating ? 'Generating...' : 'Generate'}
                            <span className="text-yellow-500">✨</span>
                          </Button>
                        </div>

                        {/* Display generated titles */}
                        {generatedTitles.length > 0 && (
                          <div className="mt-8 space-y-2">
                            <h3 className="text-lg font-semibold mb-4">Generated Titles:</h3>
                            {generatedTitles.map((title, index) => (
                              <div key={index} className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                                {title}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* CSV Tab Content */}
                {activeTab === 'csv' && (
                  <div>
                    <p className="text-gray-600 mb-4">Upload your CSV file containing the topics.</p>
                    <label className="block">
                      <Button
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = '.csv';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              // Handle the CSV file
                              console.log('CSV file selected:', file);
                            }
                          };
                          input.click();
                        }}
                        className="w-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                      >
                        Choose CSV File
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="p-6 pr-14">
                <h2 className="text-4xl font-semibold mb-4 text-center">Review</h2>
                <p className="text-gray-600 text-lg font-semibold text-center">Select Model and check if everything is ok and create your content!</p>
                <Button className="bg-purple-600 text-white mt-10 mb-10 items-center hover:bg-purple-700">Latest GPT</Button>

                {/* Table Header */}
                <div className="grid grid-cols-6 gap-4 mb-5 text-gray-600">
                  <div className="text-center col-span-2">Topics</div>
                  <div className="text-center">H2s</div>
                  <div className="text-center">FAQ</div>
                  <div className="text-center">TOC</div>
                  <div>Image</div>
                </div>

                {/* Table Content */}
                <div className="space-y-4">
                  {generatedTitles.map((title, index) => {
                    // Initialize options for this title if they don't exist
                    if (!selectedTitleOptions[title]) {
                      setSelectedTitleOptions(prev => ({
                        ...prev,
                        [title]: {
                          h2: false,
                          faq: false,
                          toc: true,
                          image: false
                        }
                      }));
                    }

                    return (
                      <div key={index} className="grid grid-cols-6 gap-4 items-center">
                        <div className="col-span-2">
                          <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg">
                            {title}
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-600">auto generated</span>
                        </div>
                        <div className="flex justify-center">
                          <Checkbox
                            checked={selectedTitleOptions[title]?.faq || false}
                            onCheckedChange={(checked) => 
                              setSelectedTitleOptions(prev => ({
                                ...prev,
                                [title]: { ...prev[title], faq: checked === true }
                              }))
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Checkbox
                            checked={selectedTitleOptions[title]?.toc || false}
                            onCheckedChange={(checked) => 
                              setSelectedTitleOptions(prev => ({
                                ...prev,
                                [title]: { ...prev[title], toc: checked === true }
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="flex justify-center">
                              <Checkbox
                                checked={selectedTitleOptions[title]?.image || false}
                                onCheckedChange={(checked) => 
                                  setSelectedTitleOptions(prev => ({
                                    ...prev,
                                    [title]: { ...prev[title], image: checked === true }
                                  }))
                                }
                              />
                            </div>
                            <span className="text-gray-600 text-sm">prompt</span>
                          </div>
                          <button
                            onClick={() => {
                              setGeneratedTitles(prev => prev.filter(t => t !== title));
                              setSelectedTitleOptions(prev => {
                                const newOptions = { ...prev };
                                delete newOptions[title];
                                return newOptions;
                              });
                            }}
                            className="text-red-500 hover:text-red-600 px-4 py-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add button */}
                <button className="w-full bg-purple-100 text-purple-600 py-2 rounded-lg mt-4 hover:bg-purple-200">
                  Add
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <Button
                  onClick={handlePrevious}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={currentStep === 1 && !project}
                className={`px-6 py-2 rounded ${
                  currentStep === 1 && !project
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {currentStep === steps.length ? 'Finish' : 'Next'}
              </Button>
            </div>
          </Card>

          {/* Summary Panel */}
          <Card className="w-96 p-4 h-fit">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Project:</span>
                <span>{project}</span>
              </div>
              <div className="flex justify-between">
                <span>Articles to write:</span>
                <span>{topics.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Image cost:</span>
                <span>{topics.length || 0} Tokens</span>
              </div>
              <div className="flex justify-between">
                <span>Language:</span>
                <span>{language}</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2 mt-8">
              <Button
                variant="outline"
                className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-300"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-300"
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !project) ||
                  (currentStep === 2 && !language) ||
                  (currentStep === 3 && topics.length === 0) ||
                  currentStep === 5
                }
              >
                Next
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HellisSeoPage;