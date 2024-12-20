'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Download } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Image from 'next/image';

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Array<{ url: string }>>([]);
  const { toast } = useToast();

  const generateImages = async () => {
    if (!prompt) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate images');
      }

      const data = await response.json();
      setGeneratedImages(data.images);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to generate images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = async (imageUrl: string) => {
    try {
      // Open image in new tab
      window.open(imageUrl, '_blank');
      
      toast({
        title: "Success",
        description: "Image opened in new tab",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard" className="text-purple-600 text-lg hover:text-purple-700">Dashboard</Link>
            <span className="text-lg">/</span>
            <span className="text-lg">Image Generator</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-semibold">3 Articles left (15 tokens)</span>
            <Link href="/subscription">
              <Button variant="outline" className="border-2 border-gray-800 hover:bg-purple-200">
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

        {/* Title and Description */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Image Generator</h1>
          <p className="text-gray-500 text-lg">
            Transform ideas into images effortlessly with our Image Generator, powered by DALL-E 3.
          </p>
        </div>

        {/* Info Box */}
        <div className="mx-auto max-w-5xl bg-purple-50 border border-purple-200 rounded-lg p-4 mb-12">
          <p className="text-purple-600 text-lg text-center">
            Submit your idea below and watch as DALL-E 3 produces three unique variations based on your prompt.
          </p>
        </div>

        {/* Image Generation Form */}
        <div className="bg-white rounded-lg p-8 max-w-5xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-lg font-medium text-gray-700">Prompt:</label>
              <span className="text-gray-500">Cost: 2 tokens</span>
            </div>
            <Textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A photograph of a white Siamese cat."
              className="w-full p-4 h-32 border border-gray-300 rounded-lg"
            />
          </div>
          
          <Button 
            onClick={generateImages}
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Images...
              </>
            ) : (
              'Generate Images'
            )}
          </Button>

          {/* Generated Images Display */}
          {generatedImages.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Generated Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {generatedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="relative group aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={`Generated image ${index + 1}`}
                        width={1024}
                        height={1024}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white hover:bg-gray-100"
                          onClick={() => downloadImage(image.url)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View Image
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <span className="text-gray-600">Variation {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
