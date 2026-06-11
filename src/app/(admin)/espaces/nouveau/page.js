// src/app/(admin)/espaces/nouveau/page.js
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Input, Textarea, Select, Button } from "@/components/ui"
import { espaceAdminSchema } from "@/schemas"

export default function NouvelEspacePage() {
  const router = useRouter()
  const [imageFile, setImageFile] = useState(null)

  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({
    resolver: yupResolver(espaceAdminSchema),
    defaultValues:{ type:"COWORKING", disponible:true, devise:"GNF", ville:"Conakry" },
  })

  const onSubmit = async (data) => {
    try {
      let imageUrl = null, publicKey = null
      if (imageFile) {
        const fd = new FormData(); fd.append("file", imageFile); fd.append("folder","fitma/espaces")
        const upRes = await fetch("/api/upload", { method:"POST", body:fd })
        const upData = await upRes.json()
        if (!upRes.ok) throw new Error(upData.error)
        imageUrl = upData.url; publicKey = upData.publicKey
      }
      const res = await fetch("/api/dashboard/espaces", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...data, imageUrl, publicKey }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      toast.success("Espace créé !")
      router.push("/admin/espaces")
    } catch (e) { toast.error(e.message || "Erreur lors de la création.") }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/espaces" className="btn btn-ghost btn-sm"><ArrowLeft size={16}/>Retour</Link>
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Nouvel Espace</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="card p-5 space-y-4">
          <Input label="Nom de l'espace" placeholder="Ex: Open Space Coworking" required error={errors.nom?.message} {...register("nom")}/>
          <Select label="Type" required error={errors.type?.message}
            options={[{value:"COWORKING",label:"Coworking"},{value:"BUREAU",label:"Bureau privé"},{value:"SALLE",label:"Salle de réunion"}]}
            {...register("type")}/>
          <Textarea label="Description" placeholder="Décrivez l'espace..." required rows={3} error={errors.description?.message} {...register("description")}/>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Capacité (personnes)" type="number" min="1" {...register("capacite",{valueAsNumber:true})}/>
            <Input label="Superficie (m²)" type="number" min="1" {...register("superficie",{valueAsNumber:true})}/>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Prix / jour (GNF)" type="number" min="0" {...register("prixJour",{valueAsNumber:true})}/>
            <Input label="Prix demi-journée" type="number" min="0" {...register("prixDemi",{valueAsNumber:true})}/>
            <Input label="Prix / mois" type="number" min="0" {...register("prixMois",{valueAsNumber:true})}/>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:"var(--ardoise)",fontFamily:"var(--font-d)"}}>Photo de l'espace</label>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0]||null)} className="input-f"/>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked {...register("disponible")}/>
            <span className="text-sm font-semibold" style={{color:"var(--ardoise)"}}>Disponible à la réservation</span>
          </label>
        </div>
        <div className="flex gap-3">
          <Button type="submit" loading={isSubmitting} variant="savane" size="lg"><Save size={18}/>Créer l'espace</Button>
          <Link href="/admin/espaces" className="btn btn-ghost btn-lg">Annuler</Link>
        </div>
      </form>
    </div>
  )
}
