"use client"
import Link from "next/link"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Eye, Heart, Mail } from "lucide-react"
import { formatDate, formatMontant } from "@/lib/utils"

export default function AdminDashboardCharts({ visiteurs, donsMensuels, derniersMessages, derniersDons }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visiteurs 7j */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-5">
            <Eye size={18} style={{color:"var(--savane)"}}/>
            <h2 className="font-d font-bold text-sm" style={{color:"var(--encre)"}}>Visiteurs — 7 derniers jours</h2>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={visiteurs}>
              <defs>
                <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E8"/>
              <XAxis dataKey="date" tick={{fontSize:11,fill:"#9E9E9E"}}
                tickFormatter={v => new Date(v).toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"})}/>
              <YAxis tick={{fontSize:11,fill:"#9E9E9E"}}/>
              <Tooltip contentStyle={{borderRadius:"12px",border:"none",boxShadow:"var(--sh-md)",fontSize:"12px"}}
                labelFormatter={v => formatDate(v)} formatter={v => [`${v} visiteurs`,""]}/>
              <Area type="monotone" dataKey="count" stroke="#2E7D32" strokeWidth={2} fill="url(#colorVis)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dons 6 mois */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-5">
            <Heart size={18} style={{color:"var(--savane)"}}/>
            <h2 className="font-d font-bold text-sm" style={{color:"var(--encre)"}}>Dons — 6 derniers mois</h2>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={donsMensuels}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E8"/>
              <XAxis dataKey="mois" tick={{fontSize:11,fill:"#9E9E9E"}}/>
              <YAxis tick={{fontSize:11,fill:"#9E9E9E"}} tickFormatter={v => `${(v/1000).toFixed(0)}k`}/>
              <Tooltip contentStyle={{borderRadius:"12px",border:"none",boxShadow:"var(--sh-md)",fontSize:"12px"}}
                formatter={v => [formatMontant(v),"Total"]}/>
              <Bar dataKey="total" fill="#2E7D32" radius={[6,6,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Derniers messages */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5" style={{borderBottom:"1px solid #F5F0E8"}}>
            <div className="flex items-center gap-2"><Mail size={16} style={{color:"var(--savane)"}}/><h2 className="font-d font-bold text-sm" style={{color:"var(--encre)"}}>Derniers messages</h2></div>
            <Link href="/admin/messages" className="text-xs font-semibold" style={{color:"var(--savane)"}}>Voir tout →</Link>
          </div>
          {derniersMessages.length === 0 ? <p className="p-5 text-sm text-center" style={{color:"var(--brume)"}}>Aucun message</p> :
            derniersMessages.map(m => (
              <Link key={m.id} href="/admin/messages" className="flex items-start gap-3 p-4 hover:bg-sable transition-colors" style={{borderBottom:"1px solid #F5F0E8"}}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{background:"var(--savane)"}}>
                  {m.prenom[0]}{m.nom[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{color:"var(--encre)"}}>{m.prenom} {m.nom} {!m.lu && <span className="inline-block w-2 h-2 rounded-full ml-1" style={{background:"var(--cauri)"}}/>}</p>
                  <p className="text-xs truncate" style={{color:"var(--ardoise)"}}>{m.sujet}</p>
                </div>
                <span className="text-[10px] shrink-0" style={{color:"var(--brume)"}}>{formatDate(m.createdAt,{day:"2-digit",month:"2-digit"})}</span>
              </Link>
            ))
          }
        </div>

        {/* Derniers dons */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5" style={{borderBottom:"1px solid #F5F0E8"}}>
            <div className="flex items-center gap-2"><Heart size={16} style={{color:"var(--savane)"}}/><h2 className="font-d font-bold text-sm" style={{color:"var(--encre)"}}>Derniers dons</h2></div>
            <Link href="/admin/dons" className="text-xs font-semibold" style={{color:"var(--savane)"}}>Voir tout →</Link>
          </div>
          {derniersDons.length === 0 ? <p className="p-5 text-sm text-center" style={{color:"var(--brume)"}}>Aucun don</p> :
            derniersDons.map(d => (
              <div key={d.id} className="flex items-center gap-3 p-4" style={{borderBottom:"1px solid #F5F0E8"}}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{background:"var(--savane-pale)"}}>💚</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{color:"var(--encre)"}}>{d.prenom} {d.nom}</p>
                  <p className="text-xs" style={{color:"var(--brume)"}}>{formatDate(d.createdAt,{day:"2-digit",month:"2-digit"})}</p>
                </div>
                <p className="font-d font-bold text-sm shrink-0" style={{color:"var(--savane)"}}>{formatMontant(d.montant,d.devise)}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
