// src/app/(admin)/dons/page.js
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui"
import { formatDate, formatMontant } from "@/lib/utils"
export const metadata = { title:"Dons | Admin Fitma" }
export default async function AdminDonsPage() {
  const [dons, stats] = await Promise.all([
    prisma.don.findMany({ orderBy:{ createdAt:"desc" }, take:100 }),
    prisma.don.aggregate({ where:{ statut:"CONFIRME" }, _sum:{ montant:true }, _count:true }),
  ])
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Dons reçus</h1>
        <div className="flex gap-6 mt-3">
          <p className="text-sm" style={{color:"var(--ardoise)"}}>Total : <strong style={{color:"var(--savane)"}}>{formatMontant(stats._sum.montant||0)}</strong></p>
          <p className="text-sm" style={{color:"var(--ardoise)"}}>Nombre : <strong>{stats._count}</strong></p>
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{background:"var(--sable)"}}><tr>{["Donateur","Email","Montant","Type","Statut","Référence","Date"].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{color:"var(--ardoise)",fontFamily:"var(--font-d)"}}>{h}</th>)}</tr></thead>
            <tbody>
              {dons.map((d,i) => (
                <tr key={d.id} style={{borderBottom:"1px solid #F5F0E8",background:i%2===0?"white":"var(--sable)"}}>
                  <td className="px-4 py-3 font-semibold" style={{color:"var(--encre)"}}>{d.prenom} {d.nom}</td>
                  <td className="px-4 py-3" style={{color:"var(--ardoise)"}}>{d.email}</td>
                  <td className="px-4 py-3 font-bold" style={{color:"var(--savane)"}}>{formatMontant(d.montant,d.devise)}</td>
                  <td className="px-4 py-3"><Badge variant={d.type==="MENSUEL"?"nuit":"gris"}>{d.type}</Badge></td>
                  <td className="px-4 py-3"><Badge variant={d.statut==="CONFIRME"?"savane":d.statut==="EN_ATTENTE"?"cauri":"gris"}>{d.statut}</Badge></td>
                  <td className="px-4 py-3 text-xs font-mono" style={{color:"var(--ardoise)"}}>{d.reference||"—"}</td>
                  <td className="px-4 py-3 text-xs" style={{color:"var(--brume)"}}>{formatDate(d.createdAt,{day:"2-digit",month:"2-digit",year:"numeric"})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
