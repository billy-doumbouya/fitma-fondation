// src/app/(admin)/faq/page.js
"use client"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Plus, Trash2, Save } from "lucide-react"
import { Spinner, Input, Textarea, Button } from "@/components/ui"

export default function AdminFaqPage() {
  const [faqs, setFaqs]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(null)
  const [newQ, setNewQ]         = useState("")
  const [newR, setNewR]         = useState("")
  const [adding, setAdding]     = useState(false)

  useEffect(() => {
    fetch("/api/dashboard/faq").then(r=>r.json()).then(d=>{ setFaqs(d.faqs||[]); setLoading(false) })
  }, [])

  async function addFaq() {
    if (!newQ.trim() || !newR.trim()) return
    setAdding(true)
    try {
      const res  = await fetch("/api/dashboard/faq", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ question:newQ, reponse:newR }) })
      const data = await res.json()
      setFaqs(p => [...p, data])
      setNewQ(""); setNewR("")
      toast.success("FAQ ajoutée !")
    } catch { toast.error("Erreur") }
    finally { setAdding(false) }
  }

  async function deleteFaq(id) {
    await fetch(`/api/dashboard/faq/${id}`, { method:"DELETE" })
    setFaqs(p => p.filter(f => f.id !== id))
    toast.success("FAQ supprimée")
  }

  if (loading) return <div className="p-8 flex justify-center"><Spinner/></div>

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <h1 className="font-d font-black text-2xl mb-8" style={{color:"var(--encre)"}}>FAQ</h1>

      {/* Ajouter */}
      <div className="card p-5 mb-6 space-y-3">
        <h2 className="font-d font-bold text-base" style={{color:"var(--encre)"}}>Ajouter une question</h2>
        <Input label="Question" placeholder="Comment s'inscrire à une formation ?" value={newQ} onChange={e=>setNewQ(e.target.value)}/>
        <Textarea label="Réponse" placeholder="La réponse détaillée..." rows={3} value={newR} onChange={e=>setNewR(e.target.value)}/>
        <Button onClick={addFaq} loading={adding} variant="savane" size="sm"><Plus size={15}/>Ajouter</Button>
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {faqs.map(f => (
          <div key={f.id} className="card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-d font-bold text-sm mb-1" style={{color:"var(--encre)"}}>{f.question}</p>
                <p className="text-xs leading-relaxed" style={{color:"var(--ardoise)"}}>{f.reponse}</p>
              </div>
              <button onClick={() => deleteFaq(f.id)} className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{color:"var(--error)"}}>
                <Trash2 size={15}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
