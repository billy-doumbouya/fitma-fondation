"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CheckCircle, Clock, Star, Upload } from "lucide-react"
import { SectionTitle, Input, Textarea, Button } from "@/components/ui"
import { candidatureSchema } from "@/schemas"

export default function ProgrammePageClient({ programme, type }) {
  const [submitted, setSubmitted] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const isIncubation = type === "INCUBATION"

  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({
    resolver: yupResolver(candidatureSchema),
  })

  const onSubmit = async (data) => {
    if (!session) { router.push("/login"); return }
    if (!programme) { toast.error("Aucun programme ouvert actuellement."); return }
    try {
      const res  = await fetch("/api/candidatures", { method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...data, programmeId: programme.id }) })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setSubmitted(true)
      toast.success("Candidature soumise avec succès !")
    } catch (e) { toast.error(e.message || "Erreur lors de la soumission.") }
  }

  const info = isIncubation ? {
    badge:"Fitma Academy — Incubation",
    titre: programme?.titre || "Programme d'Incubation",
    desc: programme?.description || "6 mois d'accompagnement intensif pour transformer votre idée en startup viable.",
    duree: programme?.duree || "6 mois",
    avantages: programme?.avantages || ["Espace de travail offert","Mentorat personnalisé","Accès réseau Fitma","Mise en relation investisseurs"],
    criteres: programme?.criteres || ["Projet innovant","Équipe motivée","Disponibilité temps plein"],
    emoji:"🌱",
  } : {
    badge:"Fitma Academy — Accélération",
    titre: programme?.titre || "Programme d'Accélération",
    desc: programme?.description || "3 mois pour faire passer votre startup au niveau supérieur.",
    duree: programme?.duree || "3 mois",
    avantages: programme?.avantages || ["Investissement potentiel","Coaching intensif","Visibilité médiatique","Réseau d'experts"],
    criteres: programme?.criteres || ["Startup existante","Revenus validés","Ambition de croissance"],
    emoji:"🚀",
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section section-savane relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage:"url('/images/pattern-african.svg')",backgroundSize:"200px"}}/>
        <div className="container-fitma relative z-10 text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
              style={{background:"rgba(249,168,37,.25)",color:"var(--cauri-l)",fontFamily:"var(--font-d)"}}>
              {info.badge}
            </span>
            <div className="text-6xl mb-4">{info.emoji}</div>
            <h1 className="text-h1 text-white mb-4">{info.titre}</h1>
            <p className="text-white/75 max-w-xl mx-auto">{info.desc}</p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{background:"rgba(249,168,37,.2)"}}>
              <Clock size={14} style={{color:"var(--cauri-l)"}}/>
              <span className="text-sm text-white/80">Durée : <strong className="text-white">{info.duree}</strong></span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Infos */}
            <div className="space-y-8">
              <div>
                <h2 className="font-d font-bold text-xl mb-5" style={{color:"var(--encre)"}}>Ce que vous obtenez</h2>
                <div className="space-y-3">
                  {info.avantages.map((a,i) => (
                    <motion.div key={i} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.08}}
                      className="flex items-start gap-3 p-4 rounded-xl" style={{background:"var(--savane-pale)"}}>
                      <Star size={18} className="shrink-0 mt-0.5" style={{color:"var(--savane)"}}/>
                      <p className="text-sm" style={{color:"var(--ardoise)"}}>{a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-d font-bold text-xl mb-5" style={{color:"var(--encre)"}}>Critères d'éligibilité</h2>
                <div className="space-y-2">
                  {info.criteres.map((c,i) => (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{color:"var(--ardoise)"}}>
                      <CheckCircle size={15} style={{color:"var(--savane)"}}/>{c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulaire candidature */}
            <div>
              <div className="card p-6 sm:p-8">
                {submitted ? (
                  <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} className="text-center py-8">
                    <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{background:"var(--savane-pale)"}}>
                      <CheckCircle size={40} style={{color:"var(--savane)"}}/>
                    </div>
                    <h3 className="font-d font-bold text-xl mb-2" style={{color:"var(--encre)"}}>Candidature soumise !</h3>
                    <p className="text-sm" style={{color:"var(--ardoise)"}}>Notre équipe vous contactera sous 5 jours ouvrables.</p>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-d font-bold text-xl mb-6" style={{color:"var(--encre)"}}>Postuler au programme</h2>
                    {!programme?.ouvert && (
                      <div className="p-4 rounded-xl mb-6 text-sm" style={{background:"var(--cauri-pale)",color:"var(--cauri-d)"}}>
                        ⚠️ Aucune session ouverte actuellement. Laissez vos coordonnées pour être notifié.
                      </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                      <Input label="Nom du projet" placeholder="Ex: AgriTech GN" required error={errors.nomProjet?.message} {...register("nomProjet")}/>
                      <Textarea label="Description du projet" placeholder="Décrivez votre projet, le problème résolu et votre solution..." required rows={4} error={errors.descriptionProjet?.message} {...register("descriptionProjet")}/>
                      <div>
                        <label className="block text-sm font-semibold mb-1.5" style={{color:"var(--ardoise)",fontFamily:"var(--font-d)"}}>Stade d'avancement *</label>
                        <select className="input-f" {...register("stadeAvancement")}>
                          <option value="">Choisir...</option>
                          <option value="idee">Idée (pas encore de produit)</option>
                          <option value="prototype">Prototype / MVP en cours</option>
                          <option value="mvp">MVP lancé (premiers utilisateurs)</option>
                          <option value="traction">Traction (revenus ou utilisateurs actifs)</option>
                        </select>
                        {errors.stadeAvancement && <p className="text-xs mt-1" style={{color:"var(--error)"}}>{errors.stadeAvancement.message}</p>}
                      </div>
                      <Textarea label="Composition de l'équipe" placeholder="Présentez les membres de votre équipe et leurs rôles..." rows={3} {...register("equipe")}/>
                      <Button type="submit" loading={isSubmitting} variant="savane" fullWidth size="lg">
                        Soumettre ma candidature
                      </Button>
                      {!session && <p className="text-xs text-center" style={{color:"var(--brume)"}}>Vous devez être connecté pour postuler. <a href="/login" style={{color:"var(--savane)"}}>Se connecter</a></p>}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
