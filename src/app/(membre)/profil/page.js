// src/app/(membre)/profil/page.js
"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { User, Save } from "lucide-react"
import { Input, Button } from "@/components/ui"
import { getInitials } from "@/lib/utils"

export default function ProfilPage() {
  const { data: session, update } = useSession()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    defaultValues: {
      nom:       session?.user?.name?.split(" ").slice(1).join(" ") || "",
      prenom:    session?.user?.name?.split(" ")[0] || "",
      email:     session?.user?.email || "",
      telephone: "",
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res  = await fetch("/api/membre/profil", { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data) })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      await update({ name:`${data.prenom} ${data.nom}` })
      toast.success("Profil mis à jour !")
    } catch (e) { toast.error(e.message || "Erreur lors de la mise à jour.") }
    finally { setLoading(false) }
  }

  const initials = getInitials(session?.user?.name?.split(" ")[1]||"", session?.user?.name?.split(" ")[0]||"")

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 md:pt-8 max-w-2xl">
      <h1 className="font-d font-black text-2xl mb-8" style={{color:"var(--encre)"}}>Mon Profil</h1>

      {/* Avatar */}
      <div className="card p-6 mb-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full flex items-center justify-center font-d font-black text-2xl text-white"
          style={{background:"linear-gradient(135deg,var(--savane),var(--cauri))"}}>
          {initials}
        </div>
        <div>
          <p className="font-d font-bold text-xl" style={{color:"var(--encre)"}}>{session?.user?.name}</p>
          <p className="text-sm" style={{color:"var(--ardoise)"}}>{session?.user?.email}</p>
          <span className="badge badge-savane mt-2">Membre Fitma</span>
        </div>
      </div>

      {/* Formulaire */}
      <div className="card p-6">
        <h2 className="font-d font-bold text-lg mb-5" style={{color:"var(--encre)"}}>Modifier mes informations</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Prénom" placeholder="Mamadou" required error={errors.prenom?.message} {...register("prenom")}/>
            <Input label="Nom" placeholder="Diallo" required error={errors.nom?.message} {...register("nom")}/>
          </div>
          <Input label="Email" type="email" disabled value={session?.user?.email||""} helperText="L'email ne peut pas être modifié."/>
          <Input label="Téléphone" type="tel" placeholder="+224 000 00 00 00" {...register("telephone")}/>
          <Button type="submit" loading={loading} variant="savane" size="lg">
            <Save size={18}/>Sauvegarder les modifications
          </Button>
        </form>
      </div>
    </div>
  )
}
