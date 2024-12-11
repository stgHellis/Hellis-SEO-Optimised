'use client';

import { useState } from 'react';
import { SEOOptimizer } from '@/lib/services/seoOptimizer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function SEOAnalyzer() {
  const [content, setContent] = useState({
    title: '',
    content: '',
    targetKeywords: [] as string[]
  });
  const [seoResults, setSeoResults] = useState<any>(null);

  const analyzeSEO = () => {
    const optimizer = new SEOOptimizer();
    const results = optimizer.analyzeSEO({
      title: content.title,
      content: content.content,
      targetKeywords: content.targetKeywords
    });
    setSeoResults(results);
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">SEO Analyzer</h2>

      <div className="space-y-4">
        <Input
          placeholder="Title"
          value={content.title}
          onChange={(e) => setContent({ ...content, title: e.target.value })}
        />
        
        <Input
          placeholder="Target Keywords (comma separated)"
          value={content.targetKeywords.join(', ')}
          onChange={(e) => setContent({ 
            ...content, 
            targetKeywords: e.target.value.split(',').map(k => k.trim())
          })}
        />

        <Textarea
          placeholder="Content"
          value={content.content}
          onChange={(e) => setContent({ ...content, content: e.target.value })}
          rows={10}
        />

        <Button onClick={analyzeSEO}>Analyze SEO</Button>
      </div>

      {seoResults && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">SEO Analysis Results</h3>
          
          <div className="space-y-2">
            <h4 className="font-bold">Keyword Density</h4>
            {Object.entries(seoResults.keywordDensity).map(([keyword, density]) => (
              <div key={keyword} className="flex justify-between">
                <span>{keyword}</span>
                <span>{(Number(density) * 100).toFixed(2)}%</span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-bold">Readability Score</h4>
            <p>{seoResults.readabilityScore}/100</p>
          </div>

          <div>
            <h4 className="font-bold">Title Suggestions</h4>
            <ul className="list-disc pl-4">
              {seoResults.titleSuggestions.map((suggestion: string, index: number) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold">Content Improvements</h4>
            <ul className="list-disc pl-4">
              {seoResults.contentImprovements.map((improvement: string, index: number) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold">Generated Meta Description</h4>
            <p className="text-sm text-gray-600">{seoResults.metaDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}