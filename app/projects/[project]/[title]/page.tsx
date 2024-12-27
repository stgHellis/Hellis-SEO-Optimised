'use client';

import { useArticles } from '@/store/useArticles';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import Link from 'next/link';
import { useState } from 'react';
import { RichTextEditor } from '@/components/RichTextEditor';

export default function EditArticlePage({
  params,
}: {
  params: { project: string; title: string };
}) {
  const [activeTab, setActiveTab] = useState<'Edit' | 'HTML'>('Edit');
  const [articleStatus, setArticleStatus] = useState<'Used' | 'Unused'>('Unused');
  const { articles } = useArticles();
  
  const article = articles.find(
    (a) => a.project === decodeURIComponent(params.project) && a.title === decodeURIComponent(params.title)
  );

  if (!article) return <div>Article not found</div>;

  const [content, setContent] = useState(article.content);

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard" className="text-purple-600 hover:text-purple-700">
              Dashboard
            </Link>
            <span>/</span>
            <Link href="/projects" className="text-purple-600 hover:text-purple-700">
              Projects
            </Link>
            <span>/</span>
            <Link href={`/projects/${params.project}`} className="text-purple-600 hover:text-purple-700">
              {decodeURIComponent(params.project)}
            </Link>
            <span>/</span>
            <span>{decodeURIComponent(params.title)}</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2 mt-12">Edit article</h1>
        <p className="text-gray-600 mb-8">You can preview and edit your article here.</p>

        {/* Article Editor Section */}
        <div className="max-w-6xl bg-white rounded-lg p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-semibold">{article.title}</h2>
            <button className="text-purple-600">title</button>
          </div>

          {/* Article Stats */}
          <div className="flex gap-4 mb-6">
            <span className="bg-purple-100 px-4 py-1 rounded-lg">Model: hellis-seo-01</span>
            <span className="bg-purple-100 px-4 py-1 rounded-lg">Words: {article.words}</span>
            <span className="bg-purple-100 px-4 py-1 rounded-lg">Characters: {article.characters}</span>
          </div>

          {/* Editor Tabs */}
          <div className="flex items-center gap-8 border-b mb-6">
            <button
              className={`pb-2 ${
                activeTab === 'Edit'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('Edit')}
            >
              Edit
            </button>
            <button
              className={`pb-2 ${
                activeTab === 'HTML'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('HTML')}
            >
              HTML
            </button>

            {/* Right side buttons */}
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" className="border-gray-800">
                Export Article
              </Button>
              <Button variant="outline" className="bg-purple-100 text-purple-600">
                Copy share link
              </Button>
              <Button className="bg-purple-100 text-purple-600">
                Save
              </Button>
            </div>
          </div>

          {/* Editor Toolbar */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2 p-2 border rounded-lg">
              <select className="border-none bg-transparent">
                <option>Font</option>
              </select>
              <select className="border-none bg-transparent">
                <option>Size</option>
              </select>
              <select className="border-none bg-transparent">
                <option>Formats</option>
              </select>
              <button className="p-1">B</button>
              <button className="p-1">U</button>
              <button className="p-1">I</button>
              <button className="p-1">S</button>
              <button className="p-1">X₂</button>
              <button className="p-1">X²</button>
              <button className="p-1">⬙</button>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded-lg">
              <button className="p-1">A</button>
              <button className="p-1">A</button>
              <button className="p-1">≡</button>
              <button className="p-1">≡</button>
              <button className="p-1">≡</button>
              <button className="p-1">—</button>
              <button className="p-1">⋮</button>
              <button className="p-1">⋮⋮</button>
              <button className="p-1">🔗</button>
              <button className="p-1">↗</button>
              <button className="p-1">⎙</button>
              <button className="p-1">&lt;/&gt;</button>
              <button className="p-1">@</button>
              <button className="p-1">🖨</button>
            </div>
          </div>

          {/* Editor Content */}
          <RichTextEditor 
            content={content} 
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        {/* Right Sidebar */}
        <div className="fixed right-12 top-52 w-96">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4">Featured Image</h3>
            <div className="border-2 border-dashed rounded-lg p-8 flex items-center justify-center mb-4">
              No image
            </div>
            <Button className="w-full bg-purple-100 text-purple-600 hover:bg-purple-200">
              Generate Image
            </Button>
            <p className="text-center text-sm text-gray-600 mt-2">
              Generate an image using DALL-E 3.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4">Article Status</h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={articleStatus === 'Used'}
                  onChange={() => setArticleStatus('Used')}
                />
                Used
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={articleStatus === 'Unused'}
                  onChange={() => setArticleStatus('Unused')}
                />
                Unused
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Notes</h3>
            <textarea
              className="w-full h-32 p-2 border rounded-lg"
              placeholder="Add notes here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
