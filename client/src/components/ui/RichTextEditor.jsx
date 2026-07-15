import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { useEffect } from "react";

function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
  extensions: [StarterKit],
  content: value,
  immediatelyRender: false,

  onUpdate: ({ editor }) => {
    onChange(editor.getHTML());
  },
});

useEffect(() => {
  if (editor && value !== editor.getHTML()) {
    editor.commands.setContent(value || "", false);
  }
}, [editor, value]);

if (!editor) return null;

  return (
    <div className="rounded-2xl border border-slate-300 bg-white shadow-sm">

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 p-3">

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded-lg px-3 py-2 font-semibold transition ${
            editor.isActive("bold")
              ? "bg-green-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded-lg px-3 py-2 italic transition ${
            editor.isActive("italic")
              ? "bg-green-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`rounded-lg px-3 py-2 transition ${
            editor.isActive("heading", { level: 1 })
              ? "bg-green-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          H1
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded-lg px-3 py-2 transition ${
            editor.isActive("bulletList")
              ? "bg-green-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          • List
        </button>

      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[320px] p-5"
      />

    </div>
  );
}

export default RichTextEditor;