"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "sonner"
import { Heart, CheckCircle, Shield } from "lucide-react"
import { SectionTitle, Input, Button, Badge } from "@/components/ui"
import { donSchema } from "@/schemas"
import { MONTANTS_DONS } from "@/constants"
import { formatMontant } from "@/lib/utils"

export default function DonsPage() {
  const [montantSelect, setMontantSelect] = useState(100000)
  const [montantCustom, setMontantCustom] = useState("")
  const [typeDon, setTypeDon]             = useState("UNIQUE")
  const [loading, setLoading]             = useState(false)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(donSchema),
    defaultValues: { montant: 100000, type: "UNIQUE", accepteConditions: false },
  })

  const montantFinal = montantCustom ? parseInt(montantCustom) : montantSelect

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res  = await fetch("/api/payment/initiate", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ type:"don", montant: montantFinal, prenom: data.prenom, nom: data.nom, email: data.email, telephone: data.telephone, donType: typeDon }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      window.location.href = json.url
    } catch (e) { toast.error(e.message || "Erreur lors du paiement.") }
    finally { setLoading(false) }
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section section-savane relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage:"url('/images/pattern-african.svg')",backgroundSize:"200px"}}/>
        <div className="container-fitma relative z-10 text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <span className="text-5xl mb-4 block">🙏</span>
            <h1 className="text-h1 text-white mb-4">Soutenir la Fondation</h1>
            <p className="text-white/75 max-w-xl mx-auto">Votre don permet à des jeunes africains d'accéder à des formations de qualité et de concrétiser leurs projets entrepreneuriaux.</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Formulaire don */}
            <div className="lg:col-span-3">
              <div className="card p-6 sm:p-8">
                <h2 className="font-d font-bold text-xl mb-6" style={{color:"var(--encre)"}}>Faire un don</h2>

                {/* Type de don */}
                <div className="flex gap-3 mb-6">
                  {[["UNIQUE","Don unique"],["MENSUEL","Don mensuel"]].map(([v,l]) => (
                    <button key={v} onClick={() => setTypeDon(v)}
                      className="flex-1 py-3 rounded-xl font-d font-semibold text-sm transition-all"
                      style={{background:typeDon===v?"var(--savane)":"var(--sable)",color:typeDon===v?"white":"var(--ardoise)",border:`2px solid ${typeDon===v?"var(--savane)":"transparent"}`}}>
                      {l}
                    </button>
                  ))}
                </div>

                {/* Montants suggérés */}
                <p className="font-d font-semibold text-sm mb-3" style={{color:"var(--ardoise)"}}>Choisissez un montant</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {MONTANTS_DONS.map(m => (
                    <button key={m.valeur} onClick={() => { setMontantSelect(m.valeur); setMontantCustom("") }}
                      className="p-3 rounded-xl text-left transition-all"
                      style={{
                        background: !montantCustom && montantSelect===m.valeur ? "var(--savane)" : "var(--sable)",
                        color: !montantCustom && montantSelect===m.valeur ? "white" : "var(--ardoise)",
                        border:`2px solid ${!montantCustom && montantSelect===m.valeur ? "var(--savane)" : "transparent"}`,
                      }}>
                      <p className="font-d font-bold text-sm">{m.label}</p>
                      <p className="text-xs opacity-75 mt-0.5">{m.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Montant libre */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-1.5" style={{color:"var(--ardoise)",fontFamily:"var(--font-d)"}}>Ou saisissez un montant libre (GNF)</label>
                  <input type="number" value={montantCustom} onChange={e => { setMontantCustom(e.target.value); setMontantSelect(0) }}
                    placeholder="Ex: 75000" className="input-f" min="10000"/>
                </div>

                {/* Montant final */}
                <div className="p-4 rounded-xl mb-6 flex justify-between items-center" style={{background:"var(--savane-pale)"}}>
                  <span className="font-d font-semibold text-sm" style={{color:"var(--savane-d)"}}>Votre don {typeDon==="MENSUEL"?"mensuel":""}</span>
                  <span className="font-d font-black text-xl" style={{color:"var(--savane-d)"}}>{formatMontant(montantFinal)}</span>
                </div>

                {/* Infos personnelles */}
                <h3 className="font-d font-semibold text-base mb-4" style={{color:"var(--encre)"}}>Vos informations</h3>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input label="Prénom" placeholder="Mamadou" required error={errors.prenom?.message} {...register("prenom")}/>
                    <Input label="Nom" placeholder="Diallo" required error={errors.nom?.message} {...register("nom")}/>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input label="Email" type="email" placeholder="mamadou@email.com" required error={errors.email?.message} {...register("email")}/>
                    <Input label="Téléphone" type="tel" placeholder="+224 000 00 00 00" {...register("telephone")}/>
                  </div>
                  <label className="flex items-start gap-3 mb-6 cursor-pointer">
                    <input type="checkbox" className="mt-0.5" {...register("accepteConditions")}/>
                    <span className="text-xs" style={{color:"var(--ardoise)"}}>J'accepte que la Fondation Fitma conserve mes informations pour l'envoi du reçu et des communications liées à mon don.</span>
                  </label>
                  {errors.accepteConditions && <p className="text-xs mb-4" style={{color:"var(--error)"}}>⚠ {errors.accepteConditions.message}</p>}

                  <Button type="submit" loading={loading} variant="savane" fullWidth size="lg">
                    <Heart size={18}/>Faire un don de {formatMontant(montantFinal)}
                  </Button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs" style={{color:"var(--brume)"}}>
                    <Shield size={13}/>Paiement 100% sécurisé — Reçu envoyé par email
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar impact */}
            <div className="lg:col-span-2 space-y-5">
              <div className="card p-6">
                <h3 className="font-d font-bold text-lg mb-4" style={{color:"var(--encre)"}}>Votre impact</h3>
                <div className="space-y-4">
                  {MONTANTS_DONS.map(m => (
                    <div key={m.valeur} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
                        style={{background:"var(--savane)"}}>✓</div>
                      <div>
                        <p className="font-d font-bold text-sm" style={{color:"var(--encre)"}}>{m.label}</p>
                        <p className="text-xs" style={{color:"var(--ardoise)"}}>{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6" style={{background:"linear-gradient(135deg,var(--savane-d),var(--savane))"}}>
                <h3 className="font-d font-bold text-lg text-white mb-3">Transparence financière</h3>
                <p className="text-sm text-white/80 mb-4">100% de votre don va directement aux programmes de formation et d'accompagnement.</p>
                <div className="space-y-2">
                  {[["Formations & bourses","60%"],["Incubation & accompagnement","25%"],["Frais administratifs","15%"]].map(([l,v]) => (
                    <div key={l}>
                      <div className="flex justify-between text-xs text-white/80 mb-1"><span>{l}</span><span className="font-bold text-white">{v}</span></div>
                      <div className="w-full rounded-full h-1.5" style={{background:"rgba(255,255,255,.2)"}}>
                        <div className="h-1.5 rounded-full" style={{background:"var(--cauri-l)",width:v}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
