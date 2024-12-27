"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sidebar } from "@/components/Sidebar";
import Link from "next/link";
import OpenAI from "openai";
import { Card } from "@/components/ui/card";
import { useProjects } from "@/store/useProjects";
import { useRouter } from "next/navigation";
import { SEO_CONTENT_PROMPT } from "@/app/prompt";

interface Step {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
}

const CategoryDescriptionPage = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [category, setCategory] = useState("");
  const [project, setProject] = useState("");
  const [language, setLanguage] = useState("French");
  const { projects } = useProjects();
  const [currentStep, setCurrentStep] = useState(1);
  const [storeName, setStoreName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generatedFeatures, setGeneratedFeatures] = useState<string[]>([]);
  const [selectedFeature, setSelectedFeature] = useState("");
  const [savedKeyFeatures, setSavedKeyFeatures] = useState<string[]>([]);
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  const [isGeneratingFeatures, setIsGeneratingFeatures] = useState(false);
  const router = useRouter();

  // Update steps based on current progress
  const steps: Step[] = [
    {
      id: 1,
      name: "Select Project",
      completed: currentStep > 1,
      current: currentStep === 1,
    },
    {
      id: 2,
      name: "Select Language",
      completed: currentStep > 2,
      current: currentStep === 2,
    },
    {
      id: 3,
      name: "Add Categories",
      completed: currentStep > 3,
      current: currentStep === 3,
    },
    {
      id: 4,
      name: "Review",
      completed: currentStep > 4,
      current: currentStep === 4,
    },
    {
      id: 5,
      name: "Done",
      completed: currentStep === 5,
      current: currentStep === 5,
    },
  ];

  const handleStepChange = (step: number) => {
    // Validate if we can move to the next step
    if (step > currentStep) {
      if (currentStep === 1 && !project) return;
      if (currentStep === 2 && !language) return;
      if (currentStep === 3 && category.length === 0) return;
      if (currentStep === 5) return;
    }
    
    // Validate if we can move back
    if (step < currentStep && step < 1) return;
    
    setCurrentStep(step);
  };

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleGenerateKeywords = async () => {
    if (!categoryName) {
      alert("Please enter a category name first");
      return;
    }

    setIsGeneratingKeywords(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a SEO expert. Generate 6 relevant keywords for an e-commerce category. Return only the keywords separated by commas, without any additional text.",
          },
          {
            role: "user",
            content: `Generate 6 SEO keywords for this e-commerce category: ${categoryName}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const generatedKeywords = completion.choices[0].message.content;
      setKeywords(generatedKeywords || "");
    } catch (error) {
      console.error("Error generating keywords:", error);
      alert("Error generating keywords. Please try again.");
    } finally {
      setIsGeneratingKeywords(false);
    }
  };

  const handleGenerateKeyFeatures = async () => {
    if (!keywords.trim()) {
      alert("Please generate keywords first");
      return;
    }

    setIsGeneratingFeatures(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a professional e-commerce SEO expert. Generate 10 key features or selling points for a product category. Each feature should be SEO-optimized and start with a clear title followed by a brief description. Format each feature on a new line with a title in bold followed by a colon and description.",
          },
          {
            role: "user",
            content: `Generate 10 SEO-optimized key features for an e-commerce category using these keywords: ${keywords}. Make them professional and compelling for online shoppers.`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const features = completion.choices[0].message.content?.split('\n').filter(f => f.trim()) || [];
      setGeneratedFeatures(features);
      setSelectedFeature("");
    } catch (error) {
      console.error("Error generating key features:", error);
      alert("Error generating key features. Please try again.");
    } finally {
      setIsGeneratingFeatures(false);
    }
  };

  const handleAddFeature = () => {
    if (selectedFeature) {
      setSavedKeyFeatures([...savedKeyFeatures, selectedFeature]);
      setSelectedFeature("");
    }
  };

  const handleDeleteFeature = (index: number) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      const newFeatures = savedKeyFeatures.filter((_, i) => i !== index);
      setSavedKeyFeatures(newFeatures);
    }
  };

  const handleNext = async () => {
    if (currentStep === 3) {
      try {
        const response = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: categoryName,
            keywords: keywords,
            keyFeatures: savedKeyFeatures,
            language: language
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save category");
        }

        setCurrentStep(currentStep + 1);
      } catch (error) {
        console.error("Error saving category:", error);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  if (!isClient) {
    return null; // ou un loader/skeleton
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link
              href="/dashboard"
              className="text-purple-600 text-lg hover:text-purple-700"
            >
              Dashboard
            </Link>
            <span className="text-lg">/</span>
            <span className="text-lg">Articles</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-semibold">
              3 Articles left (15 tokens)
            </span>
            <Link href="/subscription">
              <Button
                variant="outline"
                className="border-2 border-gray-800 hover:bg-purple-200"
              >
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

        {/* Stepper */}
        <div className="max-w-5xl mx-auto flex justify-between items-center mt-24 mb-24">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className="flex items-center">
                <div
                  className={`rounded-full w-16 h-16 flex items-center justify-center text-lg cursor-pointer transition-colors duration-200 ${
                    step.completed
                      ? "bg-purple-600 text-white"
                      : step.current
                      ? "bg-purple-600 text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => handleStepChange(step.id)}
                >
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-40 mx-2 transition-colors duration-200 ${
                      step.completed ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  />
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
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-semibold mt-2">Select project</h2>
                </div>
                <p className="text-gray-600 mb-4 text-center">
                  Select Project where you want to create content.
                </p>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-100 mt-10 mx-auto"
                >
                  <option value="">Select a project</option>
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
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-semibold mt-2">Select language</h2>
                </div>
                <p className="text-gray-600 mb-12 text-center">
                  Choose the language in which you want to write your content.
                </p>
                <div className="flex items-center space-x-2 p-2 bg-purple-100 rounded">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded">
                    {language}
                  </span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="flex-1 p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mx-auto"
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
                <div className="container mx-auto p-6 max-w-7xl">
                  <div className="flex">
                    {/* Main Form Section */}
                    <div className="flex-1 pr-6 bg-white p-6 rounded-lg mr-10">
                      <div className="text-center mb-8">                        
                        <h1 className="text-4xl font-semibold mt-2">Add Categories</h1>
                      </div>
                      <p className="text-gray-600 mb-12 text-center">
                        Add your category here. Each category will have own
                        desription.
                      </p>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-gray-700 mb-2">
                            Store Name:
                          </label>
                          <Input
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            placeholder="Zalando"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">
                            Category Name:
                          </label>
                          <Input
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Women's dresses"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-700">
                              Keywords:
                            </label>
                            <button
                              onClick={handleGenerateKeywords}
                              className="text-purple-500 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={isGeneratingKeywords || !categoryName}
                            >
                              {isGeneratingKeywords
                                ? "Generating..."
                                : "Generate by AI"}
                            </button>
                          </div>
                          <Input
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Women's Dresses, Ladies' Dresses, Fashionable Dresses for Women"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-700">
                              Key Features:
                            </label>
                            <button
                              onClick={handleGenerateKeyFeatures}
                              className="text-purple-500 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={!keywords.trim() || isGeneratingFeatures}
                            >
                              {isGeneratingFeatures ? "Generating..." : "Generate by AI"}
                            </button>
                          </div>
                          {generatedFeatures.length > 0 ? (
                            <div className="space-y-4">
                              <div className="border rounded-lg overflow-hidden">
                                <div className="max-h-60 overflow-y-auto">
                                  {generatedFeatures.map((feature, index) => (
                                    <div
                                      key={index}
                                      onClick={() => setSelectedFeature(feature)}
                                      className={`p-3 cursor-pointer hover:bg-gray-50 ${
                                        selectedFeature === feature ? 'bg-purple-50 border-l-4 border-purple-500' : ''
                                      }`}
                                    >
                                      {feature}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {selectedFeature && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <h3 className="font-medium mb-2">Selected Feature Preview:</h3>
                                  <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                      <span className="font-medium">Category:</span>
                                      <p className="mt-1">{categoryName}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium">Keywords:</span>
                                      <p className="mt-1">{keywords}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium">Selected Feature:</span>
                                      <p className="mt-1">{selectedFeature}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <Button
                                onClick={handleAddFeature}
                                disabled={!selectedFeature}
                                className="w-full bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50"
                              >
                                Add Selected Feature
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center p-8 bg-gray-50 rounded-lg">
                              <p className="text-gray-600">Click "Generate by AI" to get key features suggestions</p>
                            </div>
                          )}
                        </div>

                        {savedKeyFeatures.length > 0 && (
                          <div className="mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead>
                                <tr>
                                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                  </th>
                                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Keywords
                                  </th>
                                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Key Features
                                  </th>
                                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {savedKeyFeatures.map((feature, index) => (
                                  <tr key={index}>
                                    <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                                      {categoryName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                                      {keywords}
                                    </td>
                                    <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                                      {feature}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm">
                                      <button
                                        onClick={() => handleDeleteFeature(index)}
                                        className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-red-600 bg-white hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                      >
                                        <svg
                                          className="h-4 w-4 mr-1.5"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                          />
                                        </svg>
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-semibold mt-2">Review</h2>
                </div>
                <p className="text-gray-600 mb-12 text-center">
                  Check if everything is ok before describing your categories!
                </p>
                <div className="space-y-6">
                  <div className="flex justify-center mb-10">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                      GPT-4
                    </div>
                  </div>
                  {savedKeyFeatures.length > 0 && (
                    <div className="mt-4">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Keywords
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Key Features
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {savedKeyFeatures.map((feature, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                                {categoryName}
                              </td>
                              <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                                {keywords}
                              </td>
                              <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                                {feature}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-semibold mt-2">Done</h2>
                </div>
                <p className="text-gray-600 mb-12 text-center">
                  Your content is being created. It will take a few minutes
                  depending on the amount of text to write.
                </p>
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={() => (window.location.href = "/projects")}
                    className="px-6 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
                  >
                    Go to projects
                  </button>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Write more content
                  </button>
                </div>
              </div>
            )}
          </Card>

          {/* Summary Panel Section */}
          <Card className="w-96 p-4 h-fit">
            <div className="p-3 rounded-lg text-lg text-center">
              <h2 className="text-3xl font-semibold mb-4">Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Articles:</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span>Language:</span>
                  <span className="text-gray-600">{language}</span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2 mt-8">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleStepChange(currentStep - 1)}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-purple-500 hover:bg-purple-600"
                  onClick={() => {
                    if (currentStep === 3) {
                      handleNext();
                    } else {
                      handleStepChange(currentStep + 1);
                    }
                  }}
                  disabled={
                    (currentStep === 1 && !project) ||
                    (currentStep === 2 && !language) ||
                    (currentStep === 3 && !categoryName) ||
                    currentStep === 5
                  }
                >
                  {currentStep === 4 ? "Create Content" : "Next"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryDescriptionPage;
