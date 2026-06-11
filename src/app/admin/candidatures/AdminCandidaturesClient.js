"use client"
import { useState } from "react"
import { toast } from "sonner"
import { Badge, Button, Modal, Textarea } from "@/components/ui"
import { formatDate } from "@/lib/utils"

const STATUT_V = { SOUMISE:"cauri", EN_EVALUATION:"nuit", ACCEPTEE:"savane", REFUSEE:"gris" }
const STATUT_L = { SOUMISE:"Soumise", EN_EVALUATION:"En évaluation", ACCEPTEE:"Acceptée", REFUSEE:"Refusée" }

export default function AdminCandidaturesClient({ candidatures: initial }) {
  const [candidatures, setCandidatures] = useState(initial)
  const [selected, setSelected]         = useState(null)
  const [comment, setComment]           = useState("")
  const [loading, setLoading]           = useState(false)
  const [modalOpen, setModalOpen]       = useState(false)
  const [newStatut, setNewStatut]       = useState("")

  async function updateStatut() {
    if (!selected || !newStatut) return
    setLoading(true)
    try {
      const res = await fetch(`/api/candidatures/${selected.id}/statut`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ statut:newStatut, commentaire:comment }),
      })
      if (!res.ok) throw new Error()
      setCandidatures(p => p.map(c => c.id===selected.id ? {...c,statut:newStatut,commentaireAdmin:comment} : c))
      toast.success("Statut mis à jour !")
      setModalOpen(false); setSelected(null); setComment("")
    } catch { toast.error("Erreur lors de la mise à jour.") }
    finally { setLoading(false) }
  }

  function openModal(c, s) { setSelected(c); setNewStatut(s); setComment(c.commentaireAdmin||""); setModalOpen(true) }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Candidatures</h1>
        <p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>{candidatures.length} candidatures reçues</p>
      </div>
      <div className="space-y-4">
        {candidatures.map(c => (
          <div key={c.id} className="card p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-d font-bold text-base" style={{color:"var(--encre)"}}>{c.nomProjet}</h3>
                  <Badge variant={STATUT_V[c.statut]}>{STATUT_L[c.statut]}</Badge>
                </div>
                <p className="text-sm" style={{color:"var(--ardoise)"}}>{c.utilisateur.prenom} {c.utilisateur.nom} · {c.utilisateur.email}</p>
                <p className="text-xs mt-0.5" style={{color:"var(--brume)"}}>{c.programme.type} · {c.programme.titre} · {formatDate(c.createdAt)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openModal(c,"ACCEPTEE")} className="btn btn-savane btn-sm">✅ Accepter</button>
                <button onClick={() => openModal(c,"EN_EVALUATION")} className="btn btn-ghost btn-sm" style={{border:"1px solid #E0E0E0"}}>⏳ Évaluer</button>
                <button onClick={() => openModal(c,"REFUSEE")} className="text-xs px-3 py-1.5 rounded-xl" style={{background:"rgba(198,40,40,.1)",color:"var(--error)"}}>❌ Refuser</button>
              </div>
            </div>
            <p className="text-sm" style={{color:"var(--ardoise)"}}>{c.descriptionProjet.slice(0,200)}...</p>
            {c.commentaireAdmin && (
              <div className="mt-3 p-3 rounded-xl text-xs" style={{background:"var(--savane-pale)",color:"var(--savane-d)"}}>
                💬 {c.commentaireAdmin}
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`Changer le statut : ${newStatut}`}>
        <Textarea label="Commentaire pour le candidat (optionnel)" value={comment} onChange={e=>setComment(e.target.value)} rows={3}/>
        <div className="flex gap-3 mt-4">
          <Button onClick={updateStatut} loading={loading} variant="savane" fullWidth>Confirmer</Button>
          <Button onClick={() => setModalOpen(false)} variant="ghost">Annuler</Button>
        </div>
      </Modal>
    </div>
  )
}
