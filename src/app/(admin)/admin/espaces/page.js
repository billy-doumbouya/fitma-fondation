// src/app/(admin)/espaces/page.js
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui"
import { formatMontant } from "@/lib/utils"
export const metadata = { title:"Espaces | Admin Fitma" }
const TYPE_L = { COWORKING:"Coworking", BUREAU:"Bureau", SALLE:"Salle" }
export default async function AdminEspacesPage() {
  const espaces = await prisma.espace.findMany({ orderBy:{ ordre:"asc" }, include:{ _count:{ select:{ creneaux:true, reservations:true } } } })
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Espaces</h1>
        <Link href="/admin/espaces/nouveau" className="btn btn-savane btn-md">+ Nouvel espace</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {espaces.map(e => (
          <div key={e.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <Badge variant={e.type==="COWORKING"?"savane":e.type==="BUREAU"?"nuit":"cauri"}>{TYPE_L[e.type]}</Badge>
              <Badge variant={e.disponible?"savane":"gris"}>{e.disponible?"Disponible":"Indisponible"}</Badge>
            </div>
            <h3 className="font-d font-bold text-base mb-1" style={{color:"var(--encre)"}}>{e.nom}</h3>
            {e.capacite && <p className="text-xs mb-2" style={{color:"var(--ardoise)"}}>{e.capacite} personnes · {e.superficie||"—"} m²</p>}
            <div className="space-y-1 mb-4">
              {e.prixJour && <p className="text-xs" style={{color:"var(--savane)"}}>Jour : {formatMontant(e.prixJour)}</p>}
              {e.prixDemi && <p className="text-xs" style={{color:"var(--ardoise)"}}>Demi-journée : {formatMontant(e.prixDemi)}</p>}
              {e.prixMois && <p className="text-xs" style={{color:"var(--ardoise)"}}>Mois : {formatMontant(e.prixMois)}</p>}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs" style={{color:"var(--brume)"}}>{e._count.reservations} réservation{e._count.reservations!==1?"s":""}</p>
              <Link href={`/admin/espaces/${e.id}`} className="btn btn-ghost btn-sm" style={{border:"1px solid #E0E0E0"}}>Modifier</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
