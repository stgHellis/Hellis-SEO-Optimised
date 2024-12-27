import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { Button } from './ui/button'

interface RichTextEditorProps {
  content: string
  onChange?: (content: string) => void
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextStyle,
      Color,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-purple-600 hover:text-purple-700 underline',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your article...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const toggleFormat = (format: string) => {
    switch (format) {
      case 'bold':
        editor.chain().focus().toggleBold().run()
        break
      case 'italic':
        editor.chain().focus().toggleItalic().run()
        break
      case 'underline':
        editor.chain().focus().toggleUnderline().run()
        break
      case 'strike':
        editor.chain().focus().toggleStrike().run()
        break
      case 'code':
        editor.chain().focus().toggleCode().run()
        break
      case 'heading1':
        editor.chain().focus().toggleHeading({ level: 1 }).run()
        break
      case 'heading2':
        editor.chain().focus().toggleHeading({ level: 2 }).run()
        break
      case 'bulletList':
        editor.chain().focus().toggleBulletList().run()
        break
      case 'orderedList':
        editor.chain().focus().toggleOrderedList().run()
        break
      case 'blockquote':
        editor.chain().focus().toggleBlockquote().run()
        break
      case 'highlight':
        editor.chain().focus().toggleHighlight().run()
        break
    }
  }

  const setLink = () => {
    const url = window.prompt('Enter URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const getButtonClass = (format: string) => {
    const isActive = editor.isActive(format)
    return `p-2 rounded hover:bg-gray-100 ${isActive ? 'bg-purple-100 text-purple-600' : ''}`
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2 p-2 border rounded-lg">
          <button
            onClick={() => toggleFormat('heading1')}
            className={getButtonClass('heading1')}
          >
            H1
          </button>
          <button
            onClick={() => toggleFormat('heading2')}
            className={getButtonClass('heading2')}
          >
            H2
          </button>
          <button
            onClick={() => toggleFormat('bold')}
            className={getButtonClass('bold')}
          >
            B
          </button>
          <button
            onClick={() => toggleFormat('italic')}
            className={getButtonClass('italic')}
          >
            I
          </button>
          <button
            onClick={() => toggleFormat('underline')}
            className={getButtonClass('underline')}
          >
            U
          </button>
          <button
            onClick={() => toggleFormat('strike')}
            className={getButtonClass('strike')}
          >
            S
          </button>
          <button
            onClick={() => toggleFormat('highlight')}
            className={getButtonClass('highlight')}
          >
            H
          </button>
          <button
            onClick={() => toggleFormat('code')}
            className={getButtonClass('code')}
          >
            {'</>'}
          </button>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded-lg">
          <button
            onClick={() => toggleFormat('bulletList')}
            className={getButtonClass('bulletList')}
          >
            •
          </button>
          <button
            onClick={() => toggleFormat('orderedList')}
            className={getButtonClass('orderedList')}
          >
            1.
          </button>
          <button
            onClick={() => toggleFormat('blockquote')}
            className={getButtonClass('blockquote')}
          >
            "
          </button>
          <button
            onClick={setLink}
            className={getButtonClass('link')}
          >
            🔗
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            Redo
          </Button>
        </div>
      </div>
      <EditorContent 
        editor={editor} 
        className="min-h-[400px] p-4 border rounded-lg prose max-w-none focus:outline-none"
      />
    </div>
  )
}
