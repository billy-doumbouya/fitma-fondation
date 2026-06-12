// src/app/(admin)/galerie/page.js
"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Upload, Trash2 } from "lucide-react"
import { Spinner, EmptyState, ConfirmDialog } from "@/components/ui"

export default function AdminGaleriePage() {
  const [images, setImages]       = useState([])
  const [loading, setLoading]     = useState(true)
  const [uploading, setUploading] = useState(false)
  const [toDelete, setToDelete]   = useState(null)
  const [deleting, setDeleting]   = useState(false)

  async function load() {
    try {
      const res  = await fetch("/api/dashboard/galerie")
      const data = await res.json()
      setImages(data.images || [])
    } catch {} finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    try {
      for (const file of files) {
        const fd = new FormData(); fd.append("file", file); fd.append("folder","fitma/galerie")
        const upRes  = await fetch("/api/upload", { method:"POST", body:fd })
        const upData = await upRes.json()
        if (!upRes.ok) throw new Error(upData.error)
        await fetch("/api/dashboard/galerie", { method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ url:upData.url, publicKey:upData.publicKey }) })
      }
      toast.success(`${files.length} image${files.length>1?"s":""} ajoutée${files.length>1?"s":""}`)
      load()
    } catch (e) { toast.error(e.message || "Erreur upload") }
    finally { setUploading(false) }
  }

  async function handleDelete() {
    if (!toDelete) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/dashboard/galerie/${toDelete.id}`, { method:"DELETE" })
      if (!res.ok) throw new Error()
      setImages(p => p.filter(i => i.id !== toDelete.id))
      toast.success("Image supprimée")
    } catch { toast.error("Erreur lors de la suppression") }
    finally { setDeleting(false); setToDelete(null) }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Galerie</h1><p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>{images.length} photos</p></div>
        <label className={`btn btn-savane btn-md cursor-pointer ${uploading?"opacity-50 cursor-not-allowed":""}`}>
          <Upload size={18}/>{uploading ? "Upload en cours…" : "Ajouter des photos"}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading}/>
        </label>
      </div>
      {loading ? <div className="py-20"><Spinner size="lg"/></div> :
       images.length === 0 ? <EmptyState icon="📷" title="Galerie vide" description="Commencez par ajouter des photos."/> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map(img => (
            <div key={img.id} className="relative group rounded-2xl overflow-hidden aspect-square" style={{boxShadow:"var(--sh-sm)"}}>
              <Image src={img.url} alt={img.legende||"Galerie Fitma"} fill className="object-cover"/>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{background:"rgba(0,0,0,.5)"}}>
                <button onClick={() => setToDelete(img)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{background:"var(--error)"}}>
                  <Trash2 size={16} className="text-white"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={handleDelete} loading={deleting}
        title="Supprimer l'image" message="Cette action est irréversible. L'image sera supprimée de Cloudinary."/>
    </div>
  )
}
