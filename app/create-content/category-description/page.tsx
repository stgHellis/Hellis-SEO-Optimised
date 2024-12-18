"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sidebar } from "@/components/Sidebar";
import Link from "next/link";
import OpenAI from "openai";
import { Card } from "@/components/ui/card";

interface Step {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
}

const steps: Step[] = [
  {
    id: 1,
    name: "Select Project",
    completed: true,
    current: true,
  },
  {
    id: 2,
    name: "Select Language",
    completed: false,
    current: false,
  },
  {
    id: 3,
    name: "Add Categories",
    completed: false,
    current: false,
  },
  {
    id: 4,
    name: "Review",
    completed: false,
    current: false,
  },
  {
    id: 5,
    name: "Done",
    completed: false,
    current: false,
  },
];

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const CategoryDescriptionPage = () => {
  const [category, setCategory] = useState("");
  const [project, setProject] = useState("");
  const [language, setLanguage] = useState("French");
  const [projects] = useState([
    { name: "Project 1" },
    { name: "Project 2" },
    { name: "Project 3" },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [storeName, setStoreName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [keyFeatures, setKeyFeatures] = useState("");
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);

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

  const handleGenerateKeyFeatures = () => {
    // TODO: Implement AI generation for key features
  };

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
                className="border-2 border-gray-800 hover:bg-gray-100"
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
                  className={`rounded-full w-16 h-16 flex items-center justify-center text-lg ${
                    step.completed
                      ? "bg-purple-600 text-white"
                      : step.current
                      ? "bg-purple-600 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-40 mx-2 ${
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
                <h2 className="text-4xl font-semibold mb-4 text-center">
                  Select project
                </h2>
                <p className="text-gray-600 mb-4 text-center">
                  Select Project where you want to create content.
                </p>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-100 mt-10 mx-auto"
                >
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
                <h2 className="text-4xl font-semibold mb-4 text-center">
                  Select language
                </h2>
                <p className="text-gray-600 mb-14 text-center">
                  Choose the language in which you want to write your content.
                </p>
                <div className="flex items-center space-x-2 p-2 bg-purple-100 rounded">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded">
                    {language}
                  </span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="flex-1 p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 mx-auto"
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
                      <h1 className="text-4xl font-semibold mb-6 text-center">
                        Add Categories
                      </h1>
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
                              className="text-purple-500 hover:text-purple-600"
                            >
                              Generate by AI
                            </button>
                          </div>
                          <Textarea
                            value={keyFeatures}
                            onChange={(e) => setKeyFeatures(e.target.value)}
                            placeholder="Wide Range of Styles: This category embraces a variety of styles..."
                            className="h-32"
                          />
                        </div>

                        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div>
                <h2 className="text-4xl font-semibold mb-4 text-center">Review</h2>
                <p className="text-gray-600 mb-12 text-center">
                  Check if everything is ok before describing your categories!
                </p>
                <div className="space-y-6">
                    <div className="flex justify-center mb-10">
                      <div className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                        GPT-4
                      </div>
                    </div>
                  <div className="bg-purple-100 p-4 rounded-lg">                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Category</h3>
                        <p>{category}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Keywords</h3>
                        <p>{keywords}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Key Features</h3>
                        <p>{keyFeatures}</p>
                      </div>
                    </div>
                  </div>                  
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <h2 className="text-4xl font-semibold mb-4 text-center">Well done !</h2>
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
              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    setCurrentStep(currentStep > 1 ? currentStep - 1 : 1)
                  }
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-purple-500 hover:bg-purple-600"
                  onClick={() =>
                    setCurrentStep(currentStep < 5 ? currentStep + 1 : 5)
                  }
                >
                  Next
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
