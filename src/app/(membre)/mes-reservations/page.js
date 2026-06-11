// src/app/(membre)/mes-reservations/page.js
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { EmptyState, Badge } from "@/components/ui"
import { formatDate, formatMontant } from "@/lib/utils"

export const metadata = { title:"Mes Réservations | Fitma" }

export default async function MesReservationsPage() {
  const session = await getServerSession(authOptions)
  const reservations = await prisma.reservation.findMany({
    where: { utilisateurId: session.user.id },
    include: { creneau: { include: { espace: true } } },
    orderBy: { createdAt:"desc" },
  })

  const STATUT = { EN_ATTENTE:"cauri", CONFIRME:"savane", ANNULE:"gris" }
  const CRENEAU = { MATIN:"Matin (8h–13h)", APRES_MIDI:"Après-midi (13h–18h)", JOURNEE:"Journée" }

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 md:pt-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Mes Réservations</h1>
        <Link href="/espace" className="btn btn-savane btn-sm">+ Réserver</Link>
      </div>
      {reservations.length === 0 ? (
        <EmptyState icon="🏢" title="Aucune réservation" description="Réservez un espace de coworking, bureau ou salle de réunion."
          action={<Link href="/espace" className="btn btn-savane btn-md">Réserver un espace</Link>}/>
      ) : (
        <div className="space-y-4">
          {reservations.map(r => (
            <div key={r.id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-d font-bold text-base" style={{color:"var(--encre)"}}>{r.creneau.espace.nom}</h3>
                    <Badge variant={STATUT[r.statut]}>{r.statut}</Badge>
                  </div>
                  <p className="text-sm" style={{color:"var(--ardoise)"}}>{formatDate(r.creneau.date)} · {CRENEAU[r.creneau.type]}</p>
                  <p className="text-xs mt-1" style={{color:"var(--brume)"}}>Réservé le {formatDate(r.createdAt)}</p>
                </div>
                <p className="font-d font-black text-lg shrink-0" style={{color:"var(--savane)"}}>{formatMontant(r.montant)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
