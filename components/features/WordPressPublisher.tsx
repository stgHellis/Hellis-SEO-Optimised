'use client';

import { useState } from 'react';
import { WordPressIntegration } from '@/lib/services/wordpressIntegration';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function WordPressPublisher() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResults, setPublishResults] = useState<any[]>([]);

  const publishToPosts = async () => {
    setIsPublishing(true);
    try {
      const wp = new WordPressIntegration({
        siteUrl: process.env.NEXT_PUBLIC_WP_SITE_URL!,
        username: process.env.NEXT_PUBLIC_WP_USERNAME!,
        password: process.env.NEXT_PUBLIC_WP_PASSWORD!
      });

      const results = await wp.publishBulkPosts(posts);
      setPublishResults(results);
    } catch (error) {
      console.error('Error publishing to WordPress:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const addNewPost = () => {
    setPosts([...posts, {
      title: '',
      content: '',
      excerpt: '',
      status: 'draft'
    }]);
  };

  const updatePost = (index: number, field: string, value: string) => {
    const newPosts = [...posts];
    newPosts[index] = { ...newPosts[index], [field]: value };
    setPosts(newPosts);
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">WordPress Publisher</h2>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="border p-4 rounded-lg space-y-3">
            <Input
              placeholder="Post Title"
              value={post.title}
              onChange={(e) => updatePost(index, 'title', e.target.value)}
            />
            <Textarea
              placeholder="Post Content"
              value={post.content}
              onChange={(e) => updatePost(index, 'content', e.target.value)}
              rows={10}
            />
            <Textarea
              placeholder="Excerpt"
              value={post.excerpt}
              onChange={(e) => updatePost(index, 'excerpt', e.target.value)}
              rows={3}
            />
            <select
              className="w-full p-2 border rounded"
              value={post.status}
              onChange={(e) => updatePost(index, 'status', e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="publish">Publish</option>
              <option value="private">Private</option>
            </select>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addNewPost}>Add New Post</Button>
        <Button 
          onClick={publishToPosts}
          disabled={isPublishing || posts.length === 0}
        >
          {isPublishing ? 'Publishing...' : 'Publish All'}
        </Button>
      </div>

      {publishResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Publish Results</h3>
          {publishResults.map((result, index) => (
            <div key={index} className="border p-4 rounded-lg">
              {result.error ? (
                <p className="text-red-500">Error publishing: {result.error.message}</p>
              ) : (
                <p className="text-green-500">Successfully published: {result.title}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}