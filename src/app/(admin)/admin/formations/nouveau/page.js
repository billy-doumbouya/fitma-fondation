// src/app/(admin)/formations/nouveau/page.js
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "sonner"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { Input, Textarea, Select, Button } from "@/components/ui"
import { formationAdminSchema } from "@/schemas"
import TipTapEditor from "@/components/tiptap/TipTapEditor"

export default function NouvelleFormationPage() {
  const [contenu, setContenu] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const router = useRouter()

  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({
    resolver: yupResolver(formationAdminSchema),
    defaultValues:{ format:"PRESENTIEL", niveau:"DEBUTANT", prix:0, gratuit:false, publie:false },
  })

  const onSubmit = async (data) => {
    try {
      let imageUrl = null, publicKey = null
      if (imageFile) {
        const fd = new FormData(); fd.append("file", imageFile); fd.append("folder","fitma/formations")
        const upRes = await fetch("/api/upload", { method:"POST", body:fd })
        const upData = await upRes.json()
        if (!upRes.ok) throw new Error(upData.error)
        imageUrl = upData.url; publicKey = upData.publicKey
      }
      const res  = await fetch("/api/formations", { method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...data, contenu, imageUrl, publicKey }) })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      toast.success("Formation créée !")
      router.push("/admin/formations")
    } catch (e) { toast.error(e.message || "Erreur lors de la création.") }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/formations" className="btn btn-ghost btn-sm"><ArrowLeft size={16}/>Retour</Link>
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Nouvelle Formation</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="card p-6 space-y-4">
          <h2 className="font-d font-bold text-lg" style={{color:"var(--encre)"}}>Informations générales</h2>
          <Input label="Titre" placeholder="Ex: Marketing Digital en Afrique" required error={errors.titre?.message} {...register("titre")}/>
          <Textarea label="Description" placeholder="Description de la formation..." required rows={3} error={errors.description?.message} {...register("description")}/>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Input label="Catégorie" placeholder="Ex: Marketing" required error={errors.categorie?.message} {...register("categorie")}/>
            <Input label="Durée" placeholder="Ex: 3 jours" required error={errors.duree?.message} {...register("duree")}/>
            <Input label="Formateur" placeholder="Nom du formateur" {...register("formateur")}/>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Select label="Format" required error={errors.format?.message}
              options={[{value:"PRESENTIEL",label:"Présentiel"},{value:"EN_LIGNE",label:"En ligne"},{value:"HYBRIDE",label:"Hybride"}]}
              {...register("format")}/>
            <Select label="Niveau" required error={errors.niveau?.message}
              options={[{value:"DEBUTANT",label:"Débutant"},{value:"INTERMEDIAIRE",label:"Intermédiaire"},{value:"AVANCE",label:"Avancé"}]}
              {...register("niveau")}/>
            <Input label="Prix (GNF)" type="number" min="0" error={errors.prix?.message} {...register("prix",{valueAsNumber:true})}/>
            <Input label="Places max" type="number" min="1" {...register("placesMax",{valueAsNumber:true})}/>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register("gratuit")}/><span className="text-sm font-semibold" style={{color:"var(--ardoise)"}}>Formation gratuite</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register("publie")}/><span className="text-sm font-semibold" style={{color:"var(--ardoise)"}}>Publier immédiatement</span></label>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-d font-bold text-lg mb-4" style={{color:"var(--encre)"}}>Image de couverture</h2>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0]||null)} className="input-f"/>
        </div>

        <div className="card p-6">
          <h2 className="font-d font-bold text-lg mb-4" style={{color:"var(--encre)"}}>Contenu / Description longue</h2>
          <TipTapEditor content={contenu} onChange={setContenu}/>
        </div>

        <div className="flex gap-3">
          <Button type="submit" loading={isSubmitting} variant="savane" size="lg"><Save size={18}/>Créer la formation</Button>
          <Link href="/admin/formations" className="btn btn-ghost btn-lg">Annuler</Link>
        </div>
      </form>
    </div>
  )
}
