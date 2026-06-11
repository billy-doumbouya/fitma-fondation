"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "sonner"
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react"
import { Input, Textarea, Button } from "@/components/ui"
import { contactSchema } from "@/schemas"
import { CONTACT_DEFAULT } from "@/constants"
import { useAnalytics } from "@/hooks"

export default function ContactPage() {
  useAnalytics("/contact")
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm({ resolver: yupResolver(contactSchema) })

  const onSubmit = async (data) => {
    try {
      const res  = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data) })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setSent(true); reset()
    } catch (e) { toast.error(e.message || "Erreur lors de l'envoi.") }
  }

  return (
    <main className="pt-20">
      <section className="section section-savane">
        <div className="container-fitma text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h1 className="text-h1 text-white mb-4">Contactez-Nous</h1>
            <p className="text-white/75 max-w-xl mx-auto">Une question, un partenariat ou une visite ? Notre équipe est là pour vous.</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Coordonnées */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-d font-bold text-xl mb-5" style={{color:"var(--encre)"}}>Nos coordonnées</h2>
              {[
                { Icon:MapPin,  label:"Adresse",   val:CONTACT_DEFAULT.adresse },
                { Icon:Phone,   label:"Téléphone",  val:CONTACT_DEFAULT.telephone, href:`tel:${CONTACT_DEFAULT.telephone}` },
                { Icon:Mail,    label:"Email",      val:CONTACT_DEFAULT.email, href:`mailto:${CONTACT_DEFAULT.email}` },
                { Icon:Mail,    label:"Academy",    val:CONTACT_DEFAULT.emailAcademy, href:`mailto:${CONTACT_DEFAULT.emailAcademy}` },
                { Icon:Mail,    label:"Espace",     val:CONTACT_DEFAULT.emailEspace, href:`mailto:${CONTACT_DEFAULT.emailEspace}` },
                { Icon:Clock,   label:"Horaires",   val:CONTACT_DEFAULT.horaires },
              ].map(({ Icon, label, val, href }) => (
                <a key={label} href={href || "#"} className="flex items-start gap-4 p-4 rounded-2xl transition-colors" style={{background:"var(--sable)"}}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:"var(--savane-pale)"}}>
                    <Icon size={18} style={{color:"var(--savane)"}}/>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{color:"var(--brume)",fontFamily:"var(--font-d)"}}>{label}</p>
                    <p className="text-sm" style={{color:"var(--ardoise)"}}>{val}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-3">
              <div className="card p-6 sm:p-8">
                {sent ? (
                  <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} className="text-center py-10">
                    <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-5" style={{background:"var(--savane-pale)"}}>
                      <CheckCircle size={40} style={{color:"var(--savane)"}}/>
                    </div>
                    <h3 className="font-d font-bold text-2xl mb-3" style={{color:"var(--encre)"}}>Message envoyé !</h3>
                    <p className="text-sm mb-6" style={{color:"var(--ardoise)"}}>Nous vous répondrons sous 24 à 48 heures ouvrables.</p>
                    <Button variant="outline" onClick={() => setSent(false)}>Envoyer un autre message</Button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-d font-bold text-xl mb-6" style={{color:"var(--encre)"}}>Envoyez-nous un message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Prénom" placeholder="Mamadou" required error={errors.prenom?.message} {...register("prenom")}/>
                        <Input label="Nom" placeholder="Diallo" required error={errors.nom?.message} {...register("nom")}/>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Email" type="email" placeholder="mamadou@email.com" required error={errors.email?.message} {...register("email")}/>
                        <Input label="Téléphone" type="tel" placeholder="+224 000 00 00 00" {...register("telephone")}/>
                      </div>
                      <Input label="Sujet" placeholder="Objet de votre message" required error={errors.sujet?.message} {...register("sujet")}/>
                      <Textarea label="Message" placeholder="Décrivez votre demande..." required rows={5} error={errors.contenu?.message} {...register("contenu")}/>
                      <Button type="submit" loading={isSubmitting} variant="savane" fullWidth size="lg">
                        Envoyer le message
                      </Button>
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
