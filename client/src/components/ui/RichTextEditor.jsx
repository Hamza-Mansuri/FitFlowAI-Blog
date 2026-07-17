import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Extension } from "@tiptap/core";

import { useEffect } from "react";

function RichTextEditor({ value, onChange }) {

  // const KeepMarksOnEnter = Extension.create({
  //   name: "keepMarksOnEnter",

  //   addKeyboardShortcuts() {
  //     return {
  //       Enter: () => {
  //         const { editor } = this;

  //         const activeMarks =
  //           editor.state.storedMarks ||
  //           editor.state.selection.$from.marks();

  //         editor.commands.splitBlock();

  //         if (activeMarks?.length) {
  //           activeMarks.forEach((mark) => {
  //             editor.commands.setMark(mark.type.name, mark.attrs);
  //           });
  //         }

  //         return true;
  //       },
  //     };
  //   },
  // });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
        },
        orderedList: {
          keepMarks: true,
        },
      }),

    ],
    content: value,
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) {
        return {
          bold: false,
          italic: false,
          h1: false,
          h2: false,
          bullet: false,
          ordered: false,
        };
      }

      return {
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        h1: editor.isActive("heading", { level: 1 }),
        h2: editor.isActive("heading", { level: 2 }),
        bullet: editor.isActive("bulletList"),
        ordered: editor.isActive("orderedList"),
      };
    },
  });



  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);



  if (!editor) return null;

  return (
    <div className="rounded-2xl border border-slate-300 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 p-3 dark:border-slate-800">

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded-lg px-3 py-2 font-semibold transition ${editorState.bold
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/20"
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200"
            }`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded-lg px-3 py-2 italic transition ${editorState.italic
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/20"
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200"
            }`}
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`rounded-lg px-3 py-2 transition ${editorState.h1
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/20"
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200"
            }`}
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`rounded-lg px-3 py-2 transition ${editorState.h2
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/20"
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200"
            }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded-lg px-3 py-2 transition ${editorState.bullet
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/20"
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200"
            }`}
        >
          • List
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={`rounded-lg px-3 py-2 transition ${editorState.ordered
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/20"
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200"
            }`}
        >
          1. List
        </button>

      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="
    min-h-[320px]
    p-5
    focus:outline-none

    prose
    prose-slate
    max-w-none

    prose-headings:font-bold
    prose-headings:text-slate-900

    prose-h1:text-4xl
    prose-h2:text-3xl
    prose-h3:text-2xl

    prose-p:text-slate-700

    prose-ul:list-disc
    prose-ul:pl-6

    prose-ol:list-decimal
    prose-ol:pl-6

    prose-li:my-1

    dark:prose-invert
  "
      />

    </div>
  );
}

export default RichTextEditor;