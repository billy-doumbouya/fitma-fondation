// src/app/(membre)/mes-candidatures/page.js
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { EmptyState, Badge } from "@/components/ui"
import { formatDate } from "@/lib/utils"

export const metadata = { title:"Mes Candidatures | Fitma" }

export default async function MesCandidaturesPage() {
  const session = await getServerSession(authOptions)
  const candidatures = await prisma.candidature.findMany({
    where: { utilisateurId: session.user.id },
    include: { programme:{ select:{ titre:true, type:true } } },
    orderBy: { createdAt:"desc" },
  })

  const STATUT_V = { SOUMISE:"cauri", EN_EVALUATION:"nuit", ACCEPTEE:"savane", REFUSEE:"gris" }
  const STATUT_L = { SOUMISE:"Soumise", EN_EVALUATION:"En évaluation", ACCEPTEE:"✅ Acceptée", REFUSEE:"❌ Refusée" }
  const TYPE_L   = { INCUBATION:"🌱 Incubation", ACCELERATION:"🚀 Accélération" }

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 md:pt-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Mes Candidatures</h1>
        <Link href="/academy/incubation" className="btn btn-savane btn-sm">+ Postuler</Link>
      </div>
      {candidatures.length === 0 ? (
        <EmptyState icon="🚀" title="Aucune candidature" description="Postulez à nos programmes d'incubation ou d'accélération."
          action={<div className="flex gap-3"><Link href="/academy/incubation" className="btn btn-savane btn-md">Incubation</Link><Link href="/academy/acceleration" className="btn btn-outline btn-md">Accélération</Link></div>}/>
      ) : (
        <div className="space-y-4">
          {candidatures.map(c => (
            <div key={c.id} className="card p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-d font-bold text-base" style={{color:"var(--encre)"}}>{c.nomProjet}</h3>
                    <Badge variant={STATUT_V[c.statut]}>{STATUT_L[c.statut]}</Badge>
                  </div>
                  <p className="text-sm" style={{color:"var(--ardoise)"}}>{TYPE_L[c.programme.type]} · {c.programme.titre}</p>
                  <p className="text-xs mt-1" style={{color:"var(--brume)"}}>Soumise le {formatDate(c.createdAt)}</p>
                </div>
              </div>
              <p className="text-sm" style={{color:"var(--ardoise)"}}>{c.descriptionProjet.slice(0,150)}...</p>
              {c.commentaireAdmin && (
                <div className="mt-3 p-3 rounded-xl text-sm" style={{background:"var(--savane-pale)",color:"var(--savane-d)"}}>
                  💬 Commentaire de l'équipe : {c.commentaireAdmin}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
