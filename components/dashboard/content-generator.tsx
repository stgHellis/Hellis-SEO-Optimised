'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'

export function ContentGenerator() {
  const [prompt, setPrompt] = useState('')
  const [contentType, setContentType] = useState('blog-post')
  const [loading, setLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    try {
      // Implement API call here
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, contentType }),
      })
      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (error) {
      console.error('Error generating content:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blog-post">Blog Post</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="product-description">Product Description</SelectItem>
              <SelectItem value="meta-description">Meta Description</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          placeholder="Enter your content brief..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
        />
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Content'}
        </Button>
        {generatedContent && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Generated Content:</h3>
            <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
              {generatedContent}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}