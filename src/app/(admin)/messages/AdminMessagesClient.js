"use client"
import { useState } from "react"
import { toast } from "sonner"
import { Mail, MailOpen } from "lucide-react"
import { Badge, EmptyState } from "@/components/ui"
import { formatDate } from "@/lib/utils"

export default function AdminMessagesClient({ messages: initial }) {
  const [messages, setMessages] = useState(initial)
  const [selected, setSelected] = useState(null)

  async function markLu(id) {
    await fetch(`/api/dashboard/messages/${id}/lire`, { method:"PUT" })
    setMessages(p => p.map(m => m.id===id ? {...m,lu:true} : m))
    if (selected?.id===id) setSelected(p => ({...p,lu:true}))
  }

  const nonLus = messages.filter(m => !m.lu).length

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Messages</h1>
          <p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>{nonLus} non lu{nonLus!==1?"s":""}</p>
        </div>
      </div>
      {messages.length === 0 ? <EmptyState icon="📬" title="Aucun message"/> : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-2">
            {messages.map(m => (
              <button key={m.id} onClick={() => { setSelected(m); if(!m.lu) markLu(m.id) }}
                className="w-full text-left card p-4 transition-all"
                style={{border: selected?.id===m.id ? "2px solid var(--savane)" : "2px solid transparent", background: !m.lu ? "white" : "var(--sable)"}}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{background:m.lu?"var(--brume)":"var(--savane)"}}>{m.prenom[0]}{m.nom[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm truncate ${!m.lu?"font-bold":"font-medium"}`} style={{color:"var(--encre)"}}>{m.prenom} {m.nom}</p>
                      {!m.lu && <span className="w-2 h-2 rounded-full shrink-0" style={{background:"var(--cauri)"}}/>}
                    </div>
                    <p className="text-xs truncate" style={{color:"var(--ardoise)"}}>{m.sujet}</p>
                    <p className="text-[10px] mt-0.5" style={{color:"var(--brume)"}}>{formatDate(m.createdAt,{day:"2-digit",month:"2-digit"})}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="lg:col-span-3">
            {!selected ? (
              <div className="card p-12 text-center"><Mail size={40} className="mx-auto mb-3" style={{color:"var(--brume)"}}/><p style={{color:"var(--brume)"}}>Sélectionnez un message</p></div>
            ) : (
              <div className="card p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="font-d font-bold text-xl" style={{color:"var(--encre)"}}>{selected.sujet}</h2>
                    <p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>{selected.prenom} {selected.nom} · {selected.email}</p>
                    {selected.telephone && <p className="text-sm" style={{color:"var(--ardoise)"}}>{selected.telephone}</p>}
                    <p className="text-xs mt-1" style={{color:"var(--brume)"}}>{formatDate(selected.createdAt)}</p>
                  </div>
                  <Badge variant={selected.lu?"gris":"cauri"}>{selected.lu?"Lu":"Non lu"}</Badge>
                </div>
                <div className="p-4 rounded-xl text-sm leading-relaxed" style={{background:"var(--sable)",color:"var(--ardoise)"}}>{selected.contenu}</div>
                <div className="mt-4">
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.sujet}`} className="btn btn-savane btn-sm">Répondre par email</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
