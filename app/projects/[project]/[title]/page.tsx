'use client';

import { useArticles } from '@/store/useArticles';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { RichTextEditor } from '@/components/RichTextEditor';
import Image from 'next/image';

export default function EditArticlePage({
  params,
}: {
  params: { project: string; title: string };
}) {
  const [activeTab, setActiveTab] = useState<'Edit' | 'HTML'>('Edit');
  const [articleStatus, setArticleStatus] = useState<'Used' | 'Unused'>('Unused');
  const { articles } = useArticles();
  
  const [decodedProject, setDecodedProject] = useState<string>('');
  const [decodedTitle, setDecodedTitle] = useState<string>('');

  useEffect(() => {
    setDecodedProject(decodeURIComponent(params.project));
    setDecodedTitle(decodeURIComponent(params.title));
  }, [params.project, params.title]);

  const article = articles.find(
    (a) => a.project === decodedProject && a.title === decodedTitle
  );

  const [content, setContent] = useState(article?.content || '');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(article?.title || '');
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [showGenerateImageModal, setShowGenerateImageModal] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Utility functions for word and character count
  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharacterCount = (text: string) => {
    return text.length;
  };

  // Function to export article as a text file
  const handleExport = () => {
    if (!article) return; // Add guard clause
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Function to copy share link
  const handleCopyLink = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
      alert('Failed to copy link');
    }
  };

  // Function to save article
  const handleSave = async () => {
    if (!article) {
      console.error('No article found to save');
      setSaveStatus('error');
      return;
    }

    setSaveStatus('saving');
    try {
      // Update the article in your store
      await useArticles.getState().updateArticle(article.id, {
        ...article,
        content,
        lastModified: new Date().toISOString(),
      });
      setSaveStatus('saved');
    } catch (error) {
      console.error('Failed to save:', error);
      setSaveStatus('error');
    }
  };

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [dialogInput, setDialogInput] = useState('');

  // Editor toolbar functions
  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleSubscript = () => handleFormat('subscript');
  const handleSuperscript = () => handleFormat('superscript');

  const handleImage = () => {
    setShowImageDialog(true);
  };

  const handleImageInsert = () => {
    if (dialogInput) {
      handleFormat('insertImage', dialogInput);
      setDialogInput('');
      setShowImageDialog(false);
    }
  };

  const handleFontSize = (increase: boolean) => {
    // const sizes = ['1', '2', '3', '4', '5', '6', '7'];
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = increase ? 'larger' : 'smaller';
      range.surroundContents(span);
    }
  };

  const handleAlignment = (align: 'left' | 'center' | 'right') => {
    handleFormat('justify' + align.charAt(0).toUpperCase() + align.slice(1));
  };

  const handleHorizontalRule = () => {
    handleFormat('insertHorizontalRule');
  };

  const handleList = (type: 'ordered' | 'unordered') => {
    handleFormat(type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList');
  };

  const [isExternalLink, setIsExternalLink] = useState(false);

  const handleLink = (external: boolean = false) => {
    setIsExternalLink(external);
    setShowLinkDialog(true);
  };

  const handleLinkInsert = () => {
    if (dialogInput) {
      const url = isExternalLink ? (dialogInput.startsWith('http') ? dialogInput : `https://${dialogInput}`) : dialogInput;
      handleFormat('createLink', url);
      setDialogInput('');
      setShowLinkDialog(false);
    }
  };

  const handlePrint = (preview: boolean = false) => {
    if (preview) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>Print Preview</title></head>
            <body>${content}</body>
          </html>
        `);
        printWindow.document.close();
      }
    } else {
      window.print();
    }
  };

  const handleMention = () => {
    const mention = '@';
    handleFormat('insertText', mention);
  };

  const generateImage = async (prompt: string) => {
    try {
      setIsGeneratingImage(true);
      setGenerationError(null);

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate image');
      }

      const data = await response.json();
      setPreviewImage(data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      setGenerationError(error instanceof Error ? error.message : 'Failed to generate image');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleGenerateImage = () => {
    generateImage(imagePrompt);
  };

  if (!article) return <div>Article not found</div>;

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
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
            <Link href={`/projects/${decodedProject}`} className="text-purple-600 hover:text-purple-700">
              {decodedProject}
            </Link>
            <span>/</span>
            <span>{decodedTitle}</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2 mt-12">Edit article</h1>
        <p className="text-gray-600 mb-8">You can preview and edit your article here.</p>

        {/* Article Editor Section */}
        <div className="max-w-6xl bg-white rounded-lg p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            {isEditingTitle ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => {
                  setEditedTitle(e.target.value);
                  if (article) {
                    const updatedArticle = { ...article, title: e.target.value };
                    useArticles.getState().updateArticle(article.id, updatedArticle);
                  }
                }}
                onBlur={() => setIsEditingTitle(false)}
                autoFocus
                className="text-2xl font-semibold w-full border-b border-purple-600 focus:outline-none focus:border-purple-800"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{article?.title}</h2>
            )}
            <button 
              className="text-purple-600 hover:text-purple-800"
              onClick={() => setIsEditingTitle(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              title
            </button>
          </div>

          {/* Article Stats */}
          <div className="flex gap-4 mb-6">
            <span className="bg-purple-100 px-4 py-1 rounded-lg">Model: hellis-seo-01</span>
            <span className="bg-purple-100 px-4 py-1 rounded-lg">Words: {getWordCount(content)}</span>
            <span className="bg-purple-100 px-4 py-1 rounded-lg">Characters: {getCharacterCount(content)}</span>
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
              <Button 
                variant="outline" 
                className="border-gray-800"
                onClick={handleExport}
              >
                Export Article
              </Button>
              <Button 
                variant="outline" 
                className="bg-purple-100 text-purple-600"
                onClick={handleCopyLink}
              >
                Copy share link
              </Button>
              <Button 
                className="bg-purple-100 text-purple-600"
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Saving...' : 
                saveStatus === 'error' ? 'Retry Save' : 'Save'}
              </Button>
            </div>
          </div>

          {/* Editor Toolbar */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2 p-2 border rounded-lg">
              <select className="border-none bg-transparent">
                <option value="">Font</option>
                <option value="arial">Arial</option>
                <option value="helvetica">Helvetica</option>
                <option value="times">Times New Roman</option>
                <option value="georgia">Georgia</option>
                <option value="verdana">Verdana</option>
                <option value="roboto">Roboto</option>
              </select>
              <select className="border-none bg-transparent">
                <option value="">Size</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="32">32</option>
              </select>
              <button className="p-1 hover:text-purple-600" onClick={handleSubscript} title="Subscript">X₂</button>
              <button className="p-1 hover:text-purple-600" onClick={handleSuperscript} title="Superscript">X²</button>
              <button className="p-1 hover:text-purple-600" onClick={handleImage} title="Insert Image">⬙</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handleFontSize(false)} title="Decrease Font Size">A</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handleFontSize(true)} title="Increase Font Size">A</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handleAlignment('left')} title="Align Left">≡</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handleAlignment('center')} title="Align Center">≡</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handleAlignment('right')} title="Align Right">≡</button>
              <button className="p-1 hover:text-purple-600" onClick={handleHorizontalRule} title="Insert Horizontal Line">—</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handleList('unordered')} title="Bullet List">⋮</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handleList('ordered')} title="Numbered List">⋮⋮</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handleLink(false)} title="Insert Link">🔗</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handleLink(true)} title="Insert External Link">↗</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handlePrint(true)} title="Print Preview">⎙</button>
              <button className="p-1 hover:text-purple-600" onClick={() => setActiveTab(activeTab === 'HTML' ? 'Edit' : 'HTML')} title="Toggle HTML View">&lt;/&gt;</button>
              <button className="p-1 hover:text-purple-600" onClick={handleMention} title="Insert Mention">@</button>
              <button className="p-1 hover:text-purple-600" onClick={() => handlePrint()} title="Print">🖨</button>
            </div>
          </div>

          {/* Dialog for Image Insert */}
          {showImageDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
                <input
                  type="text"
                  value={dialogInput}
                  onChange={(e) => setDialogInput(e.target.value)}
                  placeholder="Enter image URL"
                  className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setDialogInput('');
                      setShowImageDialog(false);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImageInsert}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Insert
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dialog for Link Insert */}
          {showLinkDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
                <input
                  type="text"
                  value={dialogInput}
                  onChange={(e) => setDialogInput(e.target.value)}
                  placeholder="Enter URL"
                  className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setDialogInput('');
                      setShowLinkDialog(false);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLinkInsert}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Insert
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Editor Content */}
          {activeTab === 'Edit' ? (
            <RichTextEditor 
              content={content} 
              onChange={(newContent) => setContent(newContent)}
            />
          ) : (
            <pre className="w-full p-4 bg-gray-50 rounded-lg font-mono text-sm overflow-auto">
              {content}
            </pre>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="fixed right-12 top-52 w-96">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-2xl text-center font-semibold mb-4">Featured Image</h3>
            <div className="border-2 bg-gray-100 border-dashed rounded-lg p-8 flex items-center justify-center mb-4 relative group cursor-pointer hover:bg-gray-200 transition-all duration-200 overflow-hidden h-48">
              {featuredImage ? (
                <>
                  <Image 
                    src={featuredImage} 
                    alt="Featured" 
                    className="object-cover w-full h-full absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={() => setFeaturedImage(null)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <span className="text-gray-500">No image</span>
              )}
            </div>
            <Button 
              className="w-full bg-purple-100 text-purple-600 hover:bg-purple-200 relative"
              onClick={() => setShowGenerateImageModal(true)}
              disabled={isGeneratingImage}
            >
              Generate Image
            </Button>

            {/* Image Generation Modal */}
            {showGenerateImageModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Generate Image with AI</h3>
                    <button 
                      onClick={() => {
                        setShowGenerateImageModal(false);
                        setPreviewImage(null);
                        setImagePrompt('');
                        setIsGeneratingImage(false);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Prompt Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe the image you want to generate
                    </label>
                    <textarea
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter a detailed description of the image you want to generate..."
                      rows={4}
                      disabled={isGeneratingImage}
                    />
                  </div>

                  {/* Preview Area */}
                  <div className="mb-4">
                    <div className="border-2 border-dashed rounded-lg p-4 bg-gray-50 h-[300px] flex items-center justify-center">
                      {isGeneratingImage ? (
                        <div className="flex flex-col items-center gap-3">
                          <svg className="animate-spin h-8 w-8 text-purple-600" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span className="text-sm text-gray-500">Generating your image...</span>
                        </div>
                      ) : previewImage ? (
                        <Image 
                          src={previewImage} 
                          alt="AI Generated Preview" 
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="text-center text-gray-500">
                          <p>Preview will appear here</p>
                          <p className="text-sm">Enter a prompt and click generate</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3">
                    {generationError && (
                      <p className="text-red-500 text-sm mb-4">{generationError}</p>
                    )}
                    {previewImage ? (
                      <div className="flex gap-2">
                        <Button
                          className="bg-green-100 text-green-600 hover:bg-green-200"
                          onClick={() => {
                            setFeaturedImage(previewImage);
                            setShowGenerateImageModal(false);
                            setPreviewImage(null);
                            setImagePrompt('');
                            setGenerationError(null);
                          }}
                        >
                          Use This Image
                        </Button>
                        <Button
                          className="bg-blue-100 text-blue-600 hover:bg-blue-200"
                          onClick={() => {
                            handleGenerateImage();
                          }}
                        >
                          Generate Another
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="bg-purple-100 text-purple-600 hover:bg-purple-200"
                        onClick={() => generateImage(imagePrompt)}
                        disabled={isGeneratingImage || !imagePrompt.trim()}
                      >
                        {isGeneratingImage ? 'Generating...' : 'Generate'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
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
}
