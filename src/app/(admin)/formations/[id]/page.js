// src/app/(admin)/formations/[id]/page.js
"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import { Input, Textarea, Select, Button, Spinner } from "@/components/ui"
import TipTapEditor from "@/components/tiptap/TipTapEditor"

export default function EditFormationPage({ params }) {
  const [formation, setFormation] = useState(null)
  const [contenu, setContenu]     = useState("")
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [lecons, setLecons]       = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/formations/${params.id}/admin`).then(r=>r.json()).then(d => {
      if (d.formation) {
        setFormation(d.formation)
        setContenu(d.formation.contenuLong || "")
        setLecons(d.formation.lecons || [])
      }
      setLoading(false)
    })
  }, [params.id])

  const { register, handleSubmit, formState:{ errors } } = useForm()

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/formations/${params.id}`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...data, publie: data.publie === "true" || data.publie === true }),
      })
      if (!res.ok) throw new Error()
      toast.success("Formation mise à jour !")
      router.push("/admin/formations")
    } catch { toast.error("Erreur lors de la mise à jour.") }
    finally { setSaving(false) }
  }

  async function addLecon() {
    try {
      const res = await fetch(`/api/formations/${params.id}/lecons`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ titre:"Nouvelle leçon", ordre: lecons.length }),
      })
      const data = await res.json()
      setLecons(p => [...p, data])
      toast.success("Leçon ajoutée")
    } catch { toast.error("Erreur") }
  }

  async function deleteLecon(leconId) {
    await fetch(`/api/formations/${params.id}/lecons/${leconId}`, { method:"DELETE" })
    setLecons(p => p.filter(l => l.id !== leconId))
    toast.success("Leçon supprimée")
  }

  if (loading) return <div className="p-8 flex justify-center"><Spinner size="lg"/></div>
  if (!formation) return <div className="p-8 text-center">Formation introuvable</div>

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/formations" className="btn btn-ghost btn-sm"><ArrowLeft size={16}/>Retour</Link>
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Modifier : {formation.titre}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="card p-6 space-y-4">
          <h2 className="font-d font-bold text-lg" style={{color:"var(--encre)"}}>Informations générales</h2>
          <Input label="Titre" defaultValue={formation.titre} required error={errors.titre?.message} {...register("titre")}/>
          <Textarea label="Description" defaultValue={formation.description} rows={3} {...register("description")}/>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Select label="Format" defaultValue={formation.format}
              options={[{value:"PRESENTIEL",label:"Présentiel"},{value:"EN_LIGNE",label:"En ligne"},{value:"HYBRIDE",label:"Hybride"}]}
              {...register("format")}/>
            <Select label="Niveau" defaultValue={formation.niveau}
              options={[{value:"DEBUTANT",label:"Débutant"},{value:"INTERMEDIAIRE",label:"Intermédiaire"},{value:"AVANCE",label:"Avancé"}]}
              {...register("niveau")}/>
            <Input label="Prix" type="number" defaultValue={formation.prix} {...register("prix",{valueAsNumber:true})}/>
            <Input label="Durée" defaultValue={formation.duree} {...register("duree")}/>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked={formation.gratuit} {...register("gratuit")}/>
              <span className="text-sm font-semibold" style={{color:"var(--ardoise)"}}>Gratuit</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked={formation.publie} {...register("publie")}/>
              <span className="text-sm font-semibold" style={{color:"var(--ardoise)"}}>Publié</span>
            </label>
          </div>
        </div>

        {/* Leçons */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-d font-bold text-lg" style={{color:"var(--encre)"}}>Leçons ({lecons.length})</h2>
            <button type="button" onClick={addLecon} className="btn btn-savane btn-sm"><Plus size={15}/>Ajouter une leçon</button>
          </div>
          {lecons.length === 0 ? (
            <p className="text-sm text-center py-4" style={{color:"var(--brume)"}}>Aucune leçon. Ajoutez la première leçon.</p>
          ) : (
            <div className="space-y-2">
              {lecons.map((l,i) => (
                <div key={l.id} className="flex items-center gap-3 p-3 rounded-xl" style={{background:"var(--sable)"}}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{background:"var(--savane)"}}>{i+1}</span>
                  <p className="flex-1 text-sm font-medium" style={{color:"var(--encre)"}}>{l.titre}</p>
                  {l.videoUrl && <span className="badge badge-savane text-[10px]">Vidéo</span>}
                  <button type="button" onClick={() => deleteLecon(l.id)} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{color:"var(--error)"}}>
                    <Trash2 size={13}/>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button type="submit" loading={saving} variant="savane" size="lg"><Save size={18}/>Sauvegarder</Button>
          <Link href="/admin/formations" className="btn btn-ghost btn-lg">Annuler</Link>
        </div>
      </form>
    </div>
  )
}
