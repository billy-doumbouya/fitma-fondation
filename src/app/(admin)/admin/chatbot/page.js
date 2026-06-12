// src/app/(admin)/chatbot/page.js
"use client"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Save, Bot } from "lucide-react"
import { Spinner, Button } from "@/components/ui"

export default function AdminChatbotPage() {
  const [config, setConfig]     = useState(null)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)

  useEffect(() => {
    fetch("/api/dashboard/chatbot").then(r=>r.json()).then(d=>{ setConfig(d.config); setLoading(false) })
  }, [])

  async function save() {
    setSaving(true)
    try {
      const res = await fetch("/api/dashboard/chatbot", { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(config) })
      if (!res.ok) throw new Error()
      toast.success("Configuration sauvegardée !")
    } catch { toast.error("Erreur lors de la sauvegarde.") }
    finally { setSaving(false) }
  }

  if (loading) return <div className="p-8 flex justify-center"><Spinner/></div>

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:"var(--savane-pale)"}}><Bot size={20} style={{color:"var(--savane)"}}/></div>
        <div><h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Configuration Chatbot</h1><p className="text-sm mt-0.5" style={{color:"var(--ardoise)"}}>OpenRouter · Gemini Flash</p></div>
      </div>

      <div className="card p-6 space-y-5">
        <div>
          <label className="block font-d font-semibold text-sm mb-2" style={{color:"var(--ardoise)"}}>System Prompt</label>
          <p className="text-xs mb-3" style={{color:"var(--brume)"}}>Ce prompt définit le comportement et les connaissances de l'assistant. Il est envoyé au modèle à chaque conversation.</p>
          <textarea rows={14} value={config?.systemPrompt||""} onChange={e => setConfig(p=>({...p,systemPrompt:e.target.value}))}
            className="input-f font-mono text-xs resize-y" style={{fontFamily:"monospace"}}/>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="actif" checked={config?.actif||false} onChange={e=>setConfig(p=>({...p,actif:e.target.checked}))}/>
          <label htmlFor="actif" className="text-sm font-semibold cursor-pointer" style={{color:"var(--ardoise)"}}>Chatbot activé sur le site</label>
        </div>

        <div className="p-4 rounded-xl text-sm" style={{background:"var(--savane-pale)",color:"var(--savane-d)"}}>
          💡 <strong>Conseils :</strong> Mentionnez les services (Academy, Espace, Dons), les contacts, les horaires et les programmes disponibles. Le modèle répond en français par défaut.
        </div>

        <Button onClick={save} loading={saving} variant="savane" size="lg"><Save size={18}/>Sauvegarder la configuration</Button>
      </div>
    </div>
  )
}
