// src/app/(admin)/documents/page.js
"use client"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Upload, Trash2, FileText, ExternalLink } from "lucide-react"
import { Spinner, EmptyState, ConfirmDialog, Input, Button } from "@/components/ui"
import { formatDate } from "@/lib/utils"

export default function AdminDocumentsPage() {
  const [docs, setDocs]           = useState([])
  const [loading, setLoading]     = useState(true)
  const [uploading, setUploading] = useState(false)
  const [toDelete, setToDelete]   = useState(null)
  const [deleting, setDeleting]   = useState(false)
  const [titre, setTitre]         = useState("")
  const [categorie, setCategorie] = useState("")
  const [file, setFile]           = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    try {
      const res  = await fetch("/api/dashboard/documents")
      const data = await res.json()
      setDocs(data.documents || [])
    } catch {} finally { setLoading(false) }
  }

  async function handleUpload() {
    if (!file || !titre.trim()) { toast.error("Titre et fichier requis."); return }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("folder", "fitma/documents")
      const upRes  = await fetch("/api/upload", { method:"POST", body:fd })
      const upData = await upRes.json()
      if (!upRes.ok) throw new Error(upData.error)

      const res = await fetch("/api/dashboard/documents", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ titre, categorie: categorie||null, url:upData.url, publicKey:upData.publicKey }),
      })
      if (!res.ok) throw new Error()
      toast.success("Document ajouté !")
      setTitre(""); setCategorie(""); setFile(null)
      load()
    } catch (e) { toast.error(e.message || "Erreur upload") }
    finally { setUploading(false) }
  }

  async function handleDelete() {
    if (!toDelete) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/dashboard/documents/${toDelete.id}`, { method:"DELETE" })
      if (!res.ok) throw new Error()
      setDocs(p => p.filter(d => d.id !== toDelete.id))
      toast.success("Document supprimé")
    } catch { toast.error("Erreur suppression") }
    finally { setDeleting(false); setToDelete(null) }
  }

  if (loading) return <div className="p-8 flex justify-center"><Spinner/></div>

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <h1 className="font-d font-black text-2xl mb-8" style={{color:"var(--encre)"}}>Documents Juridiques</h1>

      {/* Upload */}
      <div className="card p-5 mb-6 space-y-4">
        <h2 className="font-d font-bold text-base" style={{color:"var(--encre)"}}>Ajouter un document</h2>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Titre du document" placeholder="Ex: Statuts de la fondation" value={titre} onChange={e=>setTitre(e.target.value)} required/>
          <Input label="Catégorie (optionnel)" placeholder="Ex: Légal, Rapport..." value={categorie} onChange={e=>setCategorie(e.target.value)}/>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{color:"var(--ardoise)",fontFamily:"var(--font-d)"}}>Fichier PDF *</label>
          <input type="file" accept=".pdf,application/pdf" onChange={e => setFile(e.target.files?.[0]||null)} className="input-f"/>
          {file && <p className="text-xs mt-1" style={{color:"var(--savane)"}}>✓ {file.name}</p>}
        </div>
        <Button onClick={handleUpload} loading={uploading} variant="savane" size="sm">
          <Upload size={15}/>Ajouter le document
        </Button>
      </div>

      {/* Liste */}
      {docs.length === 0 ? (
        <EmptyState icon="📄" title="Aucun document" description="Ajoutez vos documents juridiques et officiels."/>
      ) : (
        <div className="space-y-3">
          {docs.map(doc => (
            <div key={doc.id} className="card p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:"rgba(198,40,40,.1)"}}>
                <FileText size={18} style={{color:"var(--error)"}}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{color:"var(--encre)"}}>{doc.titre}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  {doc.categorie && <span className="text-xs" style={{color:"var(--ardoise)"}}>{doc.categorie}</span>}
                  <span className="text-xs" style={{color:"var(--brume)"}}>{formatDate(doc.createdAt,{day:"2-digit",month:"2-digit",year:"numeric"})}</span>
                </div>
              </div>
              <a href={doc.url} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{background:"var(--savane-pale)"}}>
                <ExternalLink size={15} style={{color:"var(--savane)"}}/>
              </a>
              <button onClick={() => setToDelete(doc)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{background:"rgba(198,40,40,.1)"}}>
                <Trash2 size={15} style={{color:"var(--error)"}}/>
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={handleDelete} loading={deleting}
        title="Supprimer le document" message={`Voulez-vous supprimer "${toDelete?.titre}" ? Cette action est irréversible.`}/>
    </div>
  )
}
