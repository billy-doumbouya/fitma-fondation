"use client"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Link2, Image as ImgIcon, Quote, Undo, Redo } from "lucide-react"

export default function TipTapEditor({ content = "", onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
    ],
    content,
    onUpdate: ({ editor }) => onChange && onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose-fitma min-h-[300px] p-4 outline-none",
      },
    },
  })

  if (!editor) return <div className="input-f min-h-[300px] shimmer"/>

  const btn = (action, active, title, Icon) => (
    <button type="button" onClick={action} title={title}
      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
      style={{ background: active ? "var(--savane)" : "transparent", color: active ? "white" : "var(--ardoise)" }}>
      <Icon size={15}/>
    </button>
  )

  const addImage = () => {
    const url = prompt("URL de l'image :")
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const addLink = () => {
    const url = prompt("URL du lien :")
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#E0E0E0" }}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2" style={{ background: "var(--sable)", borderBottom: "1px solid #E0E0E0" }}>
        {btn(() => editor.chain().focus().toggleBold().run(),         editor.isActive("bold"),          "Gras",          Bold)}
        {btn(() => editor.chain().focus().toggleItalic().run(),       editor.isActive("italic"),        "Italique",      Italic)}
        {btn(() => editor.chain().focus().toggleHeading({level:2}).run(), editor.isActive("heading",{level:2}), "Titre 2", Heading2)}
        {btn(() => editor.chain().focus().toggleHeading({level:3}).run(), editor.isActive("heading",{level:3}), "Titre 3", Heading3)}
        {btn(() => editor.chain().focus().toggleBulletList().run(),   editor.isActive("bulletList"),    "Liste",         List)}
        {btn(() => editor.chain().focus().toggleOrderedList().run(),  editor.isActive("orderedList"),   "Liste numérotée", ListOrdered)}
        {btn(() => editor.chain().focus().toggleBlockquote().run(),   editor.isActive("blockquote"),    "Citation",      Quote)}
        {btn(addLink,                                                  editor.isActive("link"),          "Lien",          Link2)}
        {btn(addImage,                                                 false,                            "Image",         ImgIcon)}
        <div className="w-px h-5 mx-1" style={{ background: "#E0E0E0" }}/>
        {btn(() => editor.chain().focus().undo().run(), false, "Annuler", Undo)}
        {btn(() => editor.chain().focus().redo().run(), false, "Refaire", Redo)}
      </div>
      {/* Editor */}
      <div style={{ background: "white", minHeight: "300px" }}>
        <EditorContent editor={editor}/>
      </div>
    </div>
  )
}
