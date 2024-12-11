'use client';

import { useState } from 'react';
import { ContentGenerator } from '@/lib/services/contentGenerator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContentRequest {
  topic: string;
  keywords: string[];
  wordCount: number;
  tone: 'professional' | 'casual' | 'academic';
}

export default function BulkContentGenerator() {
  const [requests, setRequests] = useState<ContentRequest[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const addNewRequest = () => {
    setRequests([...requests, {
      topic: '',
      keywords: [],
      wordCount: 1000,
      tone: 'professional'
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
      const generator = new ContentGenerator(process.env.NEXT_PUBLIC_OPENAI_API_KEY!);
      const generatedContent = await generator.generateBulkContent(requests);
      setResults(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">Bulk Content Generator</h2>
      
      <div className="space-y-4">
        {requests.map((request, index) => (
          <div key={index} className="border p-4 rounded-lg space-y-3">
            <Input
              placeholder="Topic"
              value={request.topic}
              onChange={(e) => updateRequest(index, 'topic', e.target.value)}
            />
            <Input
              placeholder="Keywords (comma separated)"
              value={request.keywords.join(', ')}
              onChange={(e) => updateRequest(index, 'keywords', e.target.value.split(',').map(k => k.trim()))}
            />
            <Input
              type="number"
              placeholder="Word Count"
              value={request.wordCount}
              onChange={(e) => updateRequest(index, 'wordCount', parseInt(e.target.value))}
            />
            <select
              className="w-full p-2 border rounded"
              value={request.tone}
              onChange={(e) => updateRequest(index, 'tone', e.target.value)}
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="academic">Academic</option>
            </select>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addNewRequest}>Add New Article</Button>
        <Button 
          onClick={generateContent} 
          disabled={isGenerating || requests.length === 0}
        >
          {isGenerating ? 'Generating...' : 'Generate All'}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Generated Content</h3>
          {results.map((result, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h4 className="font-bold">{result.title}</h4>
              <p className="text-sm text-gray-600">{result.metaDescription}</p>
              <Textarea 
                className="mt-2" 
                value={result.content} 
                readOnly 
                rows={10}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}