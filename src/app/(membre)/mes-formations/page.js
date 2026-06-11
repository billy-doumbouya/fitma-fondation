// src/app/(membre)/mes-formations/page.js
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { EmptyState, ProgressBar } from "@/components/ui"
import { calcProgression } from "@/lib/utils"

export const metadata = { title:"Mes Formations | Fitma" }

export default async function MesFormationsPage() {
  const session = await getServerSession(authOptions)
  const inscriptions = await prisma.inscription.findMany({
    where: { utilisateurId:session.user.id, statut:"CONFIRME" },
    include: { formation:{ include:{ lecons:{ select:{ id:true } } } }, progressions:true },
    orderBy: { createdAt:"desc" },
  })

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 md:pt-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Mes Formations</h1>
        <Link href="/academy/formations" className="btn btn-savane btn-sm">+ Découvrir</Link>
      </div>
      {inscriptions.length === 0 ? (
        <EmptyState icon="📚" title="Aucune formation" description="Inscrivez-vous à une formation pour commencer votre apprentissage."
          action={<Link href="/academy/formations" className="btn btn-savane btn-md">Explorer le catalogue</Link>}/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {inscriptions.map(insc => {
            const prog = calcProgression(insc.progressions, insc.formation.lecons.length)
            return (
              <Link key={insc.id} href={`/academy/formations/${insc.formation.slug}`} className="card card-hover p-5 block">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{background:"var(--savane-pale)"}}>
                  <GraduationCap size={22} style={{color:"var(--savane)"}}/>
                </div>
                <h3 className="font-d font-bold text-base mb-1" style={{color:"var(--encre)"}}>{insc.formation.titre}</h3>
                <p className="text-xs mb-4" style={{color:"var(--ardoise)"}}>{insc.formation.lecons.length} leçon{insc.formation.lecons.length!==1?"s":""}</p>
                <ProgressBar value={prog} label="Progression"/>
                {prog===100 && <div className="mt-3 text-xs font-semibold" style={{color:"var(--savane)"}}>✅ Formation terminée !</div>}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
