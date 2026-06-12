"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Clock, Users, Award, CheckCircle, PlayCircle, Lock, ChevronDown, ChevronUp } from "lucide-react"
import { Badge, Button, ProgressBar } from "@/components/ui"
import { formatMontant, calcProgression } from "@/lib/utils"

const NV = { DEBUTANT:"Débutant", INTERMEDIAIRE:"Intermédiaire", AVANCE:"Avancé" }
const FMT = { EN_LIGNE:"En ligne", PRESENTIEL:"Présentiel", HYBRIDE:"Hybride" }

export default function FormationDetailClient({ formation, inscription, session }) {
  const [inscLoading, setInscLoading] = useState(false)
  const [openLecon, setOpenLecon]     = useState(null)
  const router = useRouter()

  const progression = calcProgression(inscription?.progressions || [], formation.lecons?.length || 0)
  const isInscrit   = inscription?.statut === "CONFIRME"

  async function handleInscription() {
    if (!session) { router.push("/login?redirect=/academy/formations/" + formation.slug); return }
    setInscLoading(true)
    try {
      if (formation.gratuit) {
        const res  = await fetch("/api/formations/" + formation.id + "/inscrire", { method:"POST" })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        toast.success("Inscription confirmée !")
        router.refresh()
      } else {
        const res  = await fetch("/api/payment/initiate", { method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ type:"formation", itemId: formation.id, email: session.user.email }) })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        window.location.href = data.url
      }
    } catch (e) { toast.error(e.message || "Erreur lors de l'inscription.") }
    finally { setInscLoading(false) }
  }

  async function markLecon(leconId, complete) {
    if (!inscription) return
    await fetch("/api/lms/progression", { method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ inscriptionId: inscription.id, leconId, complete }) })
    router.refresh()
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-16" style={{background:"linear-gradient(135deg,var(--savane-d),var(--nuit))"}}>
        <div className="container-fitma">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}}>
              <div className="flex gap-2 mb-4">
                <Badge variant="cauri">{NV[formation.niveau]}</Badge>
                <Badge variant="savane">{FMT[formation.format]}</Badge>
                {formation.gratuit && <Badge variant="cauri">Gratuit</Badge>}
              </div>
              <h1 className="text-h1 text-white mb-4">{formation.titre}</h1>
              <p className="text-white/75 mb-6 leading-relaxed">{formation.description}</p>
              <div className="flex flex-wrap gap-5 text-sm text-white/70 mb-6">
                <span className="flex items-center gap-1.5"><Clock size={15}/>{formation.duree}</span>
                <span className="flex items-center gap-1.5"><Users size={15}/>{formation._count?.inscriptions||0} inscrits</span>
                {formation.attestation && <span className="flex items-center gap-1.5"><Award size={15}/>Attestation délivrée</span>}
              </div>

              {isInscrit ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl" style={{background:"rgba(255,255,255,.1)"}}>
                    <p className="text-white text-sm font-semibold mb-2">Votre progression</p>
                    <ProgressBar value={progression}/>
                  </div>
                  <Link href="/membre/mes-formations" className="btn btn-cauri btn-lg">Accéder à mes formations</Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleInscription} loading={inscLoading} variant="cauri" size="lg">
                    {formation.gratuit ? "S'inscrire gratuitement" : `S'inscrire — ${formatMontant(formation.prix)}`}
                  </Button>
                  {!session && <Link href="/login" className="btn btn-outline-white btn-lg">Se connecter</Link>}
                </div>
              )}
            </motion.div>

            <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:.2}}
              className="relative h-72 lg:h-80 rounded-3xl overflow-hidden" style={{boxShadow:"var(--sh-lg)"}}>
              {formation.imageUrl
                ? <Image src={formation.imageUrl} alt={formation.titre} fill className="object-cover"/>
                : <div className="w-full h-full flex items-center justify-center text-8xl" style={{background:"rgba(255,255,255,.1)"}}>📚</div>
              }
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container-fitma py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Objectifs */}
            {formation.objectifs?.length > 0 && (
              <div className="card p-6">
                <h2 className="font-d font-bold text-lg mb-4" style={{color:"var(--encre)"}}>Ce que vous apprendrez</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formation.objectifs.map((o,i) => (
                    <div key={i} className="flex items-start gap-2 text-sm" style={{color:"var(--ardoise)"}}>
                      <CheckCircle size={16} className="mt-0.5 shrink-0" style={{color:"var(--savane)"}}/>
                      {o}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Programme / Leçons */}
            {formation.lecons?.length > 0 && (
              <div className="card p-6">
                <h2 className="font-d font-bold text-lg mb-4" style={{color:"var(--encre)"}}>
                  Programme — {formation.lecons.length} leçon{formation.lecons.length>1?"s":""}
                </h2>
                <div className="space-y-2">
                  {formation.lecons.map((lecon,i) => {
                    const done = inscription?.progressions?.find(p => p.leconId===lecon.id)?.complete
                    const isOpen = openLecon === lecon.id
                    return (
                      <div key={lecon.id} className="border rounded-xl overflow-hidden" style={{borderColor:"#F5F0E8"}}>
                        <button onClick={() => isInscrit && setOpenLecon(isOpen ? null : lecon.id)}
                          className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-sable">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                            style={{background: done?"var(--savane)":"var(--sable)",color:done?"white":"var(--ardoise)"}}>
                            {done ? <CheckCircle size={14}/> : i+1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm" style={{color:"var(--encre)"}}>{lecon.titre}</p>
                            {lecon.dureeMin && <p className="text-xs" style={{color:"var(--brume)"}}>{lecon.dureeMin} min</p>}
                          </div>
                          {!isInscrit ? <Lock size={14} style={{color:"var(--brume)"}}/> : isOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                        </button>
                        {isOpen && isInscrit && (
                          <div className="p-4 border-t" style={{borderColor:"#F5F0E8",background:"var(--sable)"}}>
                            {lecon.videoUrl && (
                              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                                <iframe src={lecon.videoUrl} className="w-full h-full" allowFullScreen/>
                              </div>
                            )}
                            {lecon.contenu && <div className="prose-fitma text-sm" dangerouslySetInnerHTML={{__html:lecon.contenu}}/>}
                            <Button onClick={() => markLecon(lecon.id, !done)} variant={done?"ghost":"savane"} size="sm" className="mt-4">
                              {done ? "Marquer comme non terminé" : "Marquer comme terminé"}
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card p-6 sticky top-24">
              <div className="text-center mb-5">
                <p className="font-d font-black text-3xl" style={{color: formation.gratuit?"var(--savane)":"var(--encre)"}}>
                  {formation.gratuit ? "Gratuit" : formatMontant(formation.prix)}
                </p>
              </div>
              {isInscrit ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl text-center" style={{background:"var(--savane-pale)"}}>
                    <CheckCircle size={20} className="mx-auto mb-1" style={{color:"var(--savane)"}}/>
                    <p className="text-xs font-semibold" style={{color:"var(--savane-d)"}}>Vous êtes inscrit</p>
                  </div>
                  <ProgressBar value={progression} label="Progression"/>
                </div>
              ) : (
                <Button onClick={handleInscription} loading={inscLoading} variant="savane" fullWidth size="lg">
                  {formation.gratuit ? "S'inscrire gratuitement" : "S'inscrire maintenant"}
                </Button>
              )}
              <div className="mt-5 space-y-2">
                {[
                  ["Durée", formation.duree],
                  ["Format", FMT[formation.format]],
                  ["Niveau", NV[formation.niveau]],
                  formation.formateur && ["Formateur", formation.formateur],
                  formation.placesMax && ["Places", `${formation.placesMax} max`],
                  formation.attestation && ["Attestation", "Incluse"],
                ].filter(Boolean).map(([k,v]) => (
                  <div key={k} className="flex justify-between text-xs py-1" style={{borderBottom:"1px solid #F5F0E8"}}>
                    <span style={{color:"var(--brume)"}}>{k}</span>
                    <span className="font-semibold" style={{color:"var(--ardoise)"}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
