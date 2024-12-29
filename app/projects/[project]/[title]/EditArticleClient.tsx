'use client';

import { useArticles } from '@/store/useArticles';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { RichTextEditor } from '@/components/RichTextEditor';

interface EditArticleClientProps {
  project: string;
  title: string;
}

const EditArticleClient = ({ project, title }: EditArticleClientProps) => {
  const [activeTab, setActiveTab] = useState<'Edit' | 'HTML'>('Edit');
  const [articleStatus, setArticleStatus] = useState<'Used' | 'Unused'>('Unused');
  const { articles } = useArticles();
  const editorRef = useRef<any>(null);
  
  const article = articles.find(
    (a) => a.project === project && a.title === title
  );

  const [content, setContent] = useState(article?.content || '');

  useEffect(() => {
    if (article?.content && editorRef.current) {
      // Format the content with proper HTML structure
      const formattedContent = `
        <h1>${article.title}</h1>
        ${article.content}
      `;
      editorRef.current.innerHTML = formattedContent;
      setContent(formattedContent);
    }
  }, [article]);

  if (!article) return <div>Article not found</div>;

  const handleFormat = (command: string, value?: string) => {
    if (!editorRef.current) return;
    
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFormat('fontName', e.target.value);
  };

  const handleFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFormat('fontSize', e.target.value);
  };

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
            <Link href={`/projects/${project}`} className="text-purple-600 hover:text-purple-700">
              {project}
            </Link>
            <span>/</span>
            <span>{title}</span>
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
              <select 
                className="border-none bg-transparent" 
                onChange={handleFontChange}
                defaultValue=""
              >
                <option value="" disabled>Font</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Courier New">Courier New</option>
              </select>
              <select 
                className="border-none bg-transparent"
                onChange={handleFontSize}
                defaultValue=""
              >
                <option value="" disabled>Size</option>
                <option value="1">Small</option>
                <option value="3">Normal</option>
                <option value="5">Large</option>
                <option value="7">Huge</option>
              </select>
              <select 
                className="border-none bg-transparent"
                onChange={(e) => handleFormat('formatBlock', e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Formats</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="p">Paragraph</option>
              </select>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('bold')} title="Bold">
                <span className="font-bold">B</span>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('underline')} title="Underline">
                <span className="underline">U</span>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('italic')} title="Italic">
                <span className="italic">I</span>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('strikeThrough')} title="Strike">
                <span className="line-through">S</span>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('subscript')} title="Subscript">X₂</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('superscript')} title="Superscript">X²</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('justifyFull')} title="Justify">⬙</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('fontSize', '7')} title="Increase Font">A</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('fontSize', '1')} title="Decrease Font">A</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('justifyLeft')} title="Align Left">≡</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('justifyCenter')} title="Center">≡</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('justifyRight')} title="Align Right">≡</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('insertHorizontalRule')} title="Horizontal Rule">—</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('insertOrderedList')} title="Numbered List">⋮</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleFormat('insertUnorderedList')} title="Bullet List">⋮⋮</button>
              <button 
                className="p-1 hover:bg-gray-100 rounded" 
                onClick={() => {
                  const url = prompt('Enter URL:');
                  if (url) handleFormat('createLink', url);
                }} 
                title="Insert Link"
              >
                🔗
              </button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => window.open(content, '_blank')} title="Open in New Tab">↗</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => window.print()} title="Print">⎙</button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => setActiveTab(activeTab === 'HTML' ? 'Edit' : 'HTML')} title="View HTML">&lt;/&gt;</button>
              <button 
                className="p-1 hover:bg-gray-100 rounded" 
                onClick={() => {
                  const mention = prompt('Enter username to mention:');
                  if (mention) handleFormat('insertText', `@${mention}`);
                }} 
                title="Mention User"
              >
                @
              </button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => window.print()} title="Print">🖨</button>
            </div>
          </div>

          {/* Editor Content */}
          <div 
            ref={editorRef}
            className="prose prose-lg max-w-none min-h-[300px] p-4 border rounded-lg focus:outline-none" 
            contentEditable
            onInput={(e) => {
              const newContent = e.currentTarget.innerHTML;
              setContent(newContent);
              // Update article content in store if needed
            }}
          />
        </div>

        {/* Right Sidebar */}
        <div className="fixed right-12 top-52 w-96">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-2xl text-center font-semibold mb-4">Featured Image</h3>
            <div className="border-2 bg-gray-100 border-dashed rounded-lg p-8 flex items-center justify-center mb-4">
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
              className="w-full bg-gray-100 h-32 p-2 border rounded-lg"
              placeholder="Add notes here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticleClient;
