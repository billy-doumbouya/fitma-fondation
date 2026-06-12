// src/app/(admin)/actualites/nouveau/page.js
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Input, Textarea, Select, Button } from "@/components/ui"
import { articleAdminSchema } from "@/schemas"
import TipTapEditor from "@/components/tiptap/TipTapEditor"
import { slugify } from "@/lib/utils"

export default function NouvelArticlePage() {
  const [contenu, setContenu] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const router = useRouter()

  const { register, handleSubmit, watch, formState:{ errors, isSubmitting } } = useForm({
    resolver: yupResolver(articleAdminSchema),
    defaultValues:{ type:"ARTICLE", publie:false },
  })

  const onSubmit = async (data) => {
    try {
      let imageUrl = null, publicKey = null
      if (imageFile) {
        const fd = new FormData(); fd.append("file", imageFile); fd.append("folder","fitma/actualites")
        const upRes = await fetch("/api/upload", { method:"POST", body:fd })
        const upData = await upRes.json()
        if (!upRes.ok) throw new Error(upData.error)
        imageUrl = upData.url; publicKey = upData.publicKey
      }
      const slug = slugify(data.titre) + "-" + Date.now()
      const res = await fetch("/api/dashboard/actualites", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...data, contenu, slug, imageUrl, publicKey }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      toast.success("Article créé !")
      router.push("/admin/actualites")
    } catch (e) { toast.error(e.message || "Erreur lors de la création.") }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/actualites" className="btn btn-ghost btn-sm"><ArrowLeft size={16}/>Retour</Link>
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Nouvel Article</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="card p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input label="Titre" placeholder="Titre de l'article" required error={errors.titre?.message} {...register("titre")}/>
            </div>
            <Select label="Type" options={[{value:"ARTICLE",label:"Article"},{value:"COMMUNIQUE",label:"Communiqué de presse"}]} {...register("type")}/>
          </div>
          <Textarea label="Extrait" placeholder="Résumé court affiché dans la liste..." required rows={3} error={errors.extrait?.message} {...register("extrait")}/>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:"var(--ardoise)",fontFamily:"var(--font-d)"}}>Image de couverture</label>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0]||null)} className="input-f"/>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register("publie")}/>
            <span className="text-sm font-semibold" style={{color:"var(--ardoise)"}}>Publier immédiatement</span>
          </label>
        </div>

        <div className="card p-6">
          <h2 className="font-d font-bold text-lg mb-4" style={{color:"var(--encre)"}}>Contenu de l'article</h2>
          <TipTapEditor content={contenu} onChange={setContenu}/>
          {!contenu && <p className="text-xs mt-1" style={{color:"var(--error)"}}>⚠ Le contenu est obligatoire</p>}
        </div>

        <div className="flex gap-3">
          <Button type="submit" loading={isSubmitting} variant="savane" size="lg"><Save size={18}/>Publier l'article</Button>
          <Link href="/admin/actualites" className="btn btn-ghost btn-lg">Annuler</Link>
        </div>
      </form>
    </div>
  )
}
