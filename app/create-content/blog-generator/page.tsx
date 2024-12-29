'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import BulkContentGenerator from '@/components/features/BulkContentGenerator';
import { useArticles } from '@/store/useArticles';
import { Button } from '@/components/ui/button';

export default function BlogGeneratorPage() {
  const { addArticle } = useArticles();
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);

  const handleContentGenerated = (content: any[]) => {
    setGeneratedContent(content);
    
    // Add each generated article to the store
    content.forEach(article => {
      addArticle({
        id: Math.random().toString(36).substr(2, 9),
        project: 'blog',
        title: article.title,
        content: article.content,
        words: article.content.split(/\s+/).length,
        characters: article.content.length,
        status: 'completed'
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/dashboard" className="text-purple-600 text-lg hover:text-purple-700">
              Dashboard
            </a>
            <span className="text-lg">/</span>
            <span className="text-lg">Blog Generator</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-8">Professional Blog Article Generator</h1>
          
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Guidelines for Professional Blog Articles</h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Minimum word count: 1500 words</li>
                <li>Include relevant keywords for SEO optimization</li>
                <li>Structure with clear H1, H2 headings</li>
                <li>Write in a professional tone</li>
                <li>Include introduction and conclusion sections</li>
              </ul>
            </div>

            <BulkContentGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}
