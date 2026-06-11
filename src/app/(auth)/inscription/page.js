// src/app/(auth)/inscription/page.js
"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "sonner"
import { UserPlus } from "lucide-react"
import { Input, Button } from "@/components/ui"
import { inscriptionSchema } from "@/schemas"

export default function InscriptionPage() {
  const router = useRouter()
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({ resolver: yupResolver(inscriptionSchema) })

  const onSubmit = async (data) => {
    try {
      const res  = await fetch("/api/auth/register", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data) })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      const login = await signIn("credentials", { email: data.email, motDePasse: data.motDePasse, redirect: false })
      if (login?.ok) { toast.success("Compte créé avec succès !"); router.push("/membre/dashboard") }
    } catch (e) { toast.error(e.message || "Erreur lors de la création du compte.") }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{background:"linear-gradient(135deg,var(--savane-pale),var(--cauri-pale))"}}>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/"><Image src="/logo/fitma-logo.svg" alt="Fitma" width={56} height={56} className="mx-auto mb-4"/></Link>
          <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Créer un compte</h1>
          <p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>Rejoignez la communauté Fitma</p>
        </div>
        <div className="card p-6 sm:p-8">
          <Button onClick={() => signIn("google",{callbackUrl:"/membre/dashboard"})} variant="ghost" fullWidth className="border mb-5" style={{borderColor:"#E0E0E0"}}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            S'inscrire avec Google
          </Button>
          <div className="flex items-center gap-3 mb-5"><div className="flex-1 h-px" style={{background:"#E0E0E0"}}/><span className="text-xs" style={{color:"var(--brume)"}}>ou</span><div className="flex-1 h-px" style={{background:"#E0E0E0"}}/></div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Prénom" placeholder="Mamadou" required error={errors.prenom?.message} {...register("prenom")}/>
              <Input label="Nom" placeholder="Diallo" required error={errors.nom?.message} {...register("nom")}/>
            </div>
            <Input label="Email" type="email" placeholder="mamadou@email.com" required error={errors.email?.message} {...register("email")}/>
            <Input label="Téléphone" type="tel" placeholder="+224 000 00 00 00" {...register("telephone")}/>
            <Input label="Mot de passe" type="password" placeholder="Minimum 8 caractères" required error={errors.motDePasse?.message} {...register("motDePasse")}/>
            <Input label="Confirmer le mot de passe" type="password" placeholder="••••••••" required error={errors.confirmerMdp?.message} {...register("confirmerMdp")}/>
            <Button type="submit" loading={isSubmitting} variant="savane" fullWidth size="lg"><UserPlus size={18}/>Créer mon compte</Button>
          </form>
          <p className="text-center text-sm mt-5" style={{color:"var(--ardoise)"}}>
            Déjà un compte ? <Link href="/login" className="font-semibold" style={{color:"var(--savane)"}}>Se connecter</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
