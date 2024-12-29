'use client';

import { useState } from 'react';
import { ContentGenerator } from '@/lib/services/contentGenerator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useArticles } from '@/store/useArticles';
import { useToast } from '@/components/ui/use-toast';

interface ContentRequest {
  topic: string;
  keywords: string[];
  wordCount: number;
  tone: 'professional' | 'casual' | 'academic';
  structure: {
    includeIntro: boolean;
    includeConclusion: boolean;
    includeH2Sections: boolean;
    includeBulletPoints: boolean;
  };
}

// Mock function to simulate content generation
const mockGenerateContent = async (requests: ContentRequest[]) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return requests.map(request => ({
    title: `Article about ${request.topic}`,
    content: `
      <h1>${request.topic}</h1>
      ${request.structure.includeIntro ? '<h2>Introduction</h2><p>This is an introduction to the topic...</p>' : ''}
      <h2>Main Content</h2>
      <p>This is the main content about ${request.topic}. Keywords: ${request.keywords.join(', ')}</p>
      ${request.structure.includeBulletPoints ? `
        <ul>
          <li>Key point 1</li>
          <li>Key point 2</li>
          <li>Key point 3</li>
        </ul>
      ` : ''}
      ${request.structure.includeConclusion ? '<h2>Conclusion</h2><p>This concludes our discussion...</p>' : ''}
    `,
    metaDescription: `A comprehensive guide about ${request.topic} covering key aspects and best practices.`
  }));
};

export default function BulkContentGenerator() {
  const [requests, setRequests] = useState<ContentRequest[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const { addArticle } = useArticles();
  const { toast } = useToast();
  const [savedArticles, setSavedArticles] = useState<Set<number>>(new Set());

  const addNewRequest = () => {
    setRequests([...requests, {
      topic: '',
      keywords: [],
      wordCount: 1500,
      tone: 'professional',
      structure: {
        includeIntro: true,
        includeConclusion: true,
        includeH2Sections: true,
        includeBulletPoints: true
      }
    }]);
  };

  const updateRequest = (index: number, field: keyof ContentRequest, value: any) => {
    const newRequests = [...requests];
    newRequests[index] = { ...newRequests[index], [field]: value };
    setRequests(newRequests);
  };

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      // Use mock function instead of actual API call for now
      const generatedContent = await mockGenerateContent(requests);
      setResults(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du contenu",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveArticle = (result: any, index: number) => {
    try {
      const article = {
        id: Math.random().toString(36).substr(2, 9),
        project: requests[index]?.topic.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'blog',
        title: result.title,
        content: result.content,
        words: result.content.split(/\s+/).length,
        characters: result.content.length,
        status: 'completed'
      };

      addArticle(article);
      
      // Mark this article as saved
      setSavedArticles(prev => new Set([...prev, index]));
      
      toast({
        title: "Article sauvegardé",
        description: "L'article a été ajouté à votre bibliothèque",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">Blog Article Generator</h2>
      
      <div className="space-y-4">
        {requests.map((request, index) => (
          <div key={index} className="border p-6 rounded-lg space-y-4 bg-white shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Topic</label>
                <Input
                  placeholder="e.g., Best Practices for Content Marketing"
                  value={request.topic}
                  onChange={(e) => updateRequest(index, 'topic', e.target.value)}
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Keywords (comma separated)</label>
                <Input
                  placeholder="e.g., content marketing, SEO, strategy"
                  value={request.keywords.join(', ')}
                  onChange={(e) => updateRequest(index, 'keywords', e.target.value.split(',').map(k => k.trim()))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Word Count</label>
                <Input
                  type="number"
                  min="1500"
                  placeholder="Minimum 1500 words"
                  value={request.wordCount}
                  onChange={(e) => updateRequest(index, 'wordCount', Math.max(1500, parseInt(e.target.value)))}
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Tone</label>
                <select
                  className="bg-gray-100 w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                  value={request.tone}
                  onChange={(e) => updateRequest(index, 'tone', e.target.value)}
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="academic">Academic</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-3">Article Structure</h4>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={request.structure.includeIntro}
                    onChange={(e) => updateRequest(index, 'structure', {
                      ...request.structure,
                      includeIntro: e.target.checked
                    })}
                    className="rounded text-purple-600"
                  />
                  <span className="text-sm">Include Introduction</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={request.structure.includeConclusion}
                    onChange={(e) => updateRequest(index, 'structure', {
                      ...request.structure,
                      includeConclusion: e.target.checked
                    })}
                    className="rounded text-purple-600"
                  />
                  <span className="text-sm">Include Conclusion</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={request.structure.includeH2Sections}
                    onChange={(e) => updateRequest(index, 'structure', {
                      ...request.structure,
                      includeH2Sections: e.target.checked
                    })}
                    className="rounded text-purple-600"
                  />
                  <span className="text-sm">Include H2 Sections</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={request.structure.includeBulletPoints}
                    onChange={(e) => updateRequest(index, 'structure', {
                      ...request.structure,
                      includeBulletPoints: e.target.checked
                    })}
                    className="rounded text-purple-600"
                  />
                  <span className="text-sm">Include Bullet Points</span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button 
          onClick={addNewRequest}
          className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300"
        >
          Add New Article
        </Button>
        <Button 
          onClick={generateContent} 
          disabled={isGenerating || requests.length === 0}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isGenerating ? 'Generating...' : 'Generate Articles'}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Generated Articles</h3>
          {results.map((result, index) => (
            <div key={index} className="border p-6 rounded-lg bg-white shadow-sm">
              <h4 className="text-lg font-bold mb-2">{result.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{result.metaDescription}</p>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: result.content }} />
              </div>
              <div className="mt-4 pt-4 border-t flex justify-end">
                <Button 
                  onClick={() => handleSaveArticle(result, index)}
                  disabled={savedArticles.has(index)}
                  className={`${
                    savedArticles.has(index)
                      ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {savedArticles.has(index) ? 'Article sauvegardé' : 'Sauvegarder l\'article'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}