"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CheckCircle, Calendar, Clock } from "lucide-react"
import { Badge, Button, EmptyState } from "@/components/ui"
import { formatMontant, formatDate } from "@/lib/utils"

const CRENEAU_LABEL = { MATIN:"Matin (8h–13h)", APRES_MIDI:"Après-midi (13h–18h)", JOURNEE:"Journée complète" }

export default function EspaceDetailClient({ espaces, type, titre, desc, emoji }) {
  const [selectedEspace, setSelectedEspace]   = useState(espaces[0] || null)
  const [selectedCreneau, setSelectedCreneau] = useState(null)
  const [loading, setLoading]                 = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  async function handleReservation() {
    if (!session) { router.push("/login"); return }
    if (!selectedCreneau) { toast.error("Veuillez sélectionner un créneau."); return }
    setLoading(true)
    try {
      const res  = await fetch("/api/reservations", { method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ creneauId: selectedCreneau.id }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success("Réservation confirmée ! Vérifiez votre email.")
      setSelectedCreneau(null)
      router.refresh()
    } catch (e) { toast.error(e.message || "Erreur lors de la réservation.") }
    finally { setLoading(false) }
  }

  const montant = selectedCreneau
    ? selectedCreneau.type === "JOURNEE" ? selectedEspace?.prixJour : selectedEspace?.prixDemi
    : null

  return (
    <main className="pt-20">
      <section className="section section-nuit">
        <div className="container-fitma text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <span className="text-6xl mb-4 block">{emoji}</span>
            <h1 className="text-h1 text-white mb-4">Fitma Espace — {titre}</h1>
            <p className="text-white/75 max-w-xl mx-auto">{desc}</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-fitma">
          {espaces.length === 0 ? (
            <EmptyState icon="🏢" title="Aucun espace disponible" description="Revenez bientôt ou contactez-nous."/>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sélection espace */}
              <div className="lg:col-span-1 space-y-4">
                <h2 className="font-d font-bold text-lg mb-4" style={{color:"var(--encre)"}}>Choisir un espace</h2>
                {espaces.map(e => (
                  <button key={e.id} onClick={() => { setSelectedEspace(e); setSelectedCreneau(null) }}
                    className="w-full text-left card p-4 transition-all"
                    style={{border: selectedEspace?.id===e.id ? "2px solid var(--savane)" : "2px solid transparent"}}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-d font-bold text-sm" style={{color:"var(--encre)"}}>{e.nom}</h3>
                      <Badge variant="savane" className="text-[10px]">{e.capacite} pers.</Badge>
                    </div>
                    <p className="text-xs mb-3" style={{color:"var(--ardoise)"}}>{e.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {e.equipements?.slice(0,3).map(eq => <span key={eq} className="badge badge-gris text-[9px]">{eq}</span>)}
                    </div>
                    {e.prixJour && <p className="text-xs font-semibold" style={{color:"var(--savane)"}}>{formatMontant(e.prixJour)} / jour</p>}
                    {e.prixDemi && <p className="text-xs" style={{color:"var(--brume)"}}>{formatMontant(e.prixDemi)} / demi-journée</p>}
                  </button>
                ))}
              </div>

              {/* Sélection créneau */}
              <div className="lg:col-span-2">
                <h2 className="font-d font-bold text-lg mb-4" style={{color:"var(--encre)"}}>
                  <Calendar size={18} className="inline mr-2" style={{color:"var(--savane)"}}/>
                  Choisir un créneau
                </h2>
                {!selectedEspace ? (
                  <div className="card p-8 text-center">
                    <p style={{color:"var(--brume)"}}>Sélectionnez un espace pour voir les disponibilités.</p>
                  </div>
                ) : selectedEspace.creneaux?.length === 0 ? (
                  <div className="card p-8 text-center">
                    <p style={{color:"var(--brume)"}}>Aucun créneau disponible actuellement.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                      {selectedEspace.creneaux?.map(c => (
                        <button key={c.id} onClick={() => setSelectedCreneau(c)}
                          className="p-4 rounded-2xl text-left transition-all"
                          style={{
                            background: selectedCreneau?.id===c.id ? "var(--savane)" : "white",
                            color: selectedCreneau?.id===c.id ? "white" : "var(--ardoise)",
                            border: `2px solid ${selectedCreneau?.id===c.id ? "var(--savane)" : "#F5F0E8"}`,
                            boxShadow: "var(--sh-sm)",
                          }}>
                          <p className="font-d font-bold text-xs mb-1">{formatDate(c.date, {weekday:"short",day:"numeric",month:"short"})}</p>
                          <p className="text-xs">{CRENEAU_LABEL[c.type]}</p>
                          <p className="text-xs mt-1 font-semibold">
                            {formatMontant(c.type==="JOURNEE" ? selectedEspace.prixJour : selectedEspace.prixDemi)}
                          </p>
                        </button>
                      ))}
                    </div>

                    {selectedCreneau && (
                      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                        className="card p-5 border-2" style={{borderColor:"var(--savane)"}}>
                        <h3 className="font-d font-bold mb-3" style={{color:"var(--encre)"}}>Récapitulatif</h3>
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex justify-between"><span style={{color:"var(--ardoise)"}}>Espace</span><span className="font-semibold">{selectedEspace.nom}</span></div>
                          <div className="flex justify-between"><span style={{color:"var(--ardoise)"}}>Date</span><span className="font-semibold">{formatDate(selectedCreneau.date)}</span></div>
                          <div className="flex justify-between"><span style={{color:"var(--ardoise)"}}>Créneau</span><span className="font-semibold">{CRENEAU_LABEL[selectedCreneau.type]}</span></div>
                          <div className="flex justify-between text-base"><span style={{color:"var(--ardoise)"}}>Total</span><span className="font-black" style={{color:"var(--savane)"}}>{formatMontant(montant)}</span></div>
                        </div>
                        <Button onClick={handleReservation} loading={loading} variant="savane" fullWidth size="lg">
                          Confirmer la réservation
                        </Button>
                        {!session && <p className="text-xs text-center mt-2" style={{color:"var(--brume)"}}>Connexion requise. <a href="/login" style={{color:"var(--savane)"}}>Se connecter</a></p>}
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
