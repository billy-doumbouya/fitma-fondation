// src/app/(admin)/utilisateurs/page.js
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui"
import { formatDate } from "@/lib/utils"
export const metadata = { title:"Utilisateurs | Admin Fitma" }
export default async function UtilisateursPage({ searchParams }) {
  const page = parseInt(searchParams?.page||"1"), limit = 20
  const [users, total] = await Promise.all([
    prisma.utilisateur.findMany({ orderBy:{ createdAt:"desc" }, skip:(page-1)*limit, take:limit }),
    prisma.utilisateur.count(),
  ])
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Utilisateurs</h1><p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>{total} membres inscrits</p></div>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{background:"var(--sable)"}}>
              <tr>
                {["Membre","Email","Téléphone","Rôle","Inscrit le","Statut"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{color:"var(--ardoise)",fontFamily:"var(--font-d)"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u,i) => (
                <tr key={u.id} style={{borderBottom:"1px solid #F5F0E8",background:i%2===0?"white":"var(--sable)"}}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{background:"var(--savane)"}}>
                        {u.prenom[0]}{u.nom[0]}
                      </div>
                      <span className="font-semibold" style={{color:"var(--encre)"}}>{u.prenom} {u.nom}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{color:"var(--ardoise)"}}>{u.email}</td>
                  <td className="px-4 py-3" style={{color:"var(--ardoise)"}}>{u.telephone||"—"}</td>
                  <td className="px-4 py-3"><Badge variant={u.role==="ADMIN"?"nuit":"savane"}>{u.role}</Badge></td>
                  <td className="px-4 py-3 text-xs" style={{color:"var(--brume)"}}>{formatDate(u.createdAt,{day:"2-digit",month:"2-digit",year:"numeric"})}</td>
                  <td className="px-4 py-3"><Badge variant={u.actif?"savane":"gris"}>{u.actif?"Actif":"Inactif"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
