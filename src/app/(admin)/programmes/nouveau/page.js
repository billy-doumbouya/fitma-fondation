// src/app/(admin)/programmes/nouveau/page.js
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import { Input, Textarea, Select, Button } from "@/components/ui"

export default function NouveauProgrammePage() {
  const router = useRouter()
  const [loading, setLoading]   = useState(false)
  const [criteres, setCriteres] = useState([""])
  const [avantages, setAvantages] = useState([""])
  const [form, setForm] = useState({ type:"INCUBATION", titre:"", description:"", duree:"", ouvert:true })

  const addItem = (setter) => setter(p => [...p, ""])
  const removeItem = (setter, i) => setter(p => p.filter((_,idx)=>idx!==i))
  const updateItem = (setter, i, v) => setter(p => p.map((x,idx)=>idx===i?v:x))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.titre || !form.description || !form.duree) { toast.error("Remplissez tous les champs obligatoires."); return }
    setLoading(true)
    try {
      const res = await fetch("/api/dashboard/programmes", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...form, criteres: criteres.filter(Boolean), avantages: avantages.filter(Boolean) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success("Programme créé !")
      router.push("/admin/programmes")
    } catch (e) { toast.error(e.message || "Erreur.") }
    finally { setLoading(false) }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/programmes" className="btn btn-ghost btn-sm"><ArrowLeft size={16}/>Retour</Link>
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Nouveau Programme</h1>
      </div>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="card p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select label="Type" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}
              options={[{value:"INCUBATION",label:"Incubation"},{value:"ACCELERATION",label:"Accélération"}]}/>
            <Input label="Durée" placeholder="Ex: 6 mois" value={form.duree} onChange={e=>setForm(p=>({...p,duree:e.target.value}))} required/>
          </div>
          <Input label="Titre du programme" placeholder="Ex: Fitma Incubation — Promotion 2025" value={form.titre} onChange={e=>setForm(p=>({...p,titre:e.target.value}))} required/>
          <Textarea label="Description" rows={3} value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} required/>

          {/* Critères */}
          <div>
            <label className="block font-d font-semibold text-sm mb-2" style={{color:"var(--ardoise)"}}>Critères d'éligibilité</label>
            {criteres.map((c,i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={c} onChange={e=>updateItem(setCriteres,i,e.target.value)} placeholder="Ex: Projet innovant..." className="input-f flex-1"/>
                <button type="button" onClick={()=>removeItem(setCriteres,i)} className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{background:"rgba(198,40,40,.1)",color:"var(--error)"}}><X size={14}/></button>
              </div>
            ))}
            <button type="button" onClick={()=>addItem(setCriteres)} className="btn btn-ghost btn-sm mt-1"><Plus size={14}/>Ajouter un critère</button>
          </div>

          {/* Avantages */}
          <div>
            <label className="block font-d font-semibold text-sm mb-2" style={{color:"var(--ardoise)"}}>Avantages du programme</label>
            {avantages.map((a,i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={a} onChange={e=>updateItem(setAvantages,i,e.target.value)} placeholder="Ex: Espace de travail offert..." className="input-f flex-1"/>
                <button type="button" onClick={()=>removeItem(setAvantages,i)} className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{background:"rgba(198,40,40,.1)",color:"var(--error)"}}><X size={14}/></button>
              </div>
            ))}
            <button type="button" onClick={()=>addItem(setAvantages)} className="btn btn-ghost btn-sm mt-1"><Plus size={14}/>Ajouter un avantage</button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.ouvert} onChange={e=>setForm(p=>({...p,ouvert:e.target.checked}))}/>
            <span className="text-sm font-semibold" style={{color:"var(--ardoise)"}}>Candidatures ouvertes</span>
          </label>
        </div>

        <div className="flex gap-3">
          <Button type="submit" loading={loading} variant="savane" size="lg"><Save size={18}/>Créer le programme</Button>
          <Link href="/admin/programmes" className="btn btn-ghost btn-lg">Annuler</Link>
        </div>
      </form>
    </div>
  )
}
