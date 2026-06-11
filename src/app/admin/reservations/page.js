// src/app/(admin)/reservations/page.js
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui"
import { formatDate, formatMontant } from "@/lib/utils"
export const metadata = { title:"Réservations | Admin Fitma" }
const CRENEAU_L = { MATIN:"Matin", APRES_MIDI:"Après-midi", JOURNEE:"Journée" }
export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy:{ createdAt:"desc" },
    include:{
      creneau:{ include:{ espace:{ select:{ nom:true } } } },
      utilisateur:{ select:{ prenom:true, nom:true, email:true } },
    },
  })
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Réservations</h1>
        <p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>{reservations.length} réservations au total</p>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{background:"var(--sable)"}}>
              <tr>{["Membre","Espace","Date","Créneau","Montant","Statut","Réservé le"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{color:"var(--ardoise)",fontFamily:"var(--font-d)"}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {reservations.map((r,i) => (
                <tr key={r.id} style={{borderBottom:"1px solid #F5F0E8",background:i%2===0?"white":"var(--sable)"}}>
                  <td className="px-4 py-3">
                    <p className="font-semibold" style={{color:"var(--encre)"}}>{r.utilisateur.prenom} {r.utilisateur.nom}</p>
                    <p className="text-xs" style={{color:"var(--brume)"}}>{r.utilisateur.email}</p>
                  </td>
                  <td className="px-4 py-3" style={{color:"var(--ardoise)"}}>{r.creneau.espace.nom}</td>
                  <td className="px-4 py-3 text-xs" style={{color:"var(--ardoise)"}}>{formatDate(r.creneau.date,{day:"2-digit",month:"2-digit",year:"numeric"})}</td>
                  <td className="px-4 py-3"><Badge variant="gris">{CRENEAU_L[r.creneau.type]}</Badge></td>
                  <td className="px-4 py-3 font-bold" style={{color:"var(--savane)"}}>{formatMontant(r.montant)}</td>
                  <td className="px-4 py-3"><Badge variant={r.statut==="CONFIRME"?"savane":r.statut==="EN_ATTENTE"?"cauri":"gris"}>{r.statut}</Badge></td>
                  <td className="px-4 py-3 text-xs" style={{color:"var(--brume)"}}>{formatDate(r.createdAt,{day:"2-digit",month:"2-digit"})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
