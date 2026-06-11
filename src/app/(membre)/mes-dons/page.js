// src/app/(membre)/mes-dons/page.js
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { EmptyState, Badge } from "@/components/ui"
import { formatDate, formatMontant } from "@/lib/utils"

export const metadata = { title:"Mes Dons | Fitma" }

export default async function MesDonsPage() {
  const session = await getServerSession(authOptions)
  const [dons, total] = await Promise.all([
    prisma.don.findMany({ where:{ utilisateurId:session.user.id }, orderBy:{ createdAt:"desc" } }),
    prisma.don.aggregate({ where:{ utilisateurId:session.user.id, statut:"CONFIRME" }, _sum:{ montant:true }, _count:true }),
  ])

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 md:pt-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Mes Dons</h1>
        <Link href="/soutenir/dons" className="btn btn-savane btn-sm">+ Faire un don</Link>
      </div>
      {total._count > 0 && (
        <div className="card p-5 mb-6 flex items-center gap-5" style={{background:"linear-gradient(135deg,var(--savane-d),var(--savane))"}}>
          <div className="text-4xl">🙏</div>
          <div>
            <p className="font-d font-black text-2xl text-white">{formatMontant(total._sum.montant||0)}</p>
            <p className="text-white/75 text-sm">Total de vos dons ({total._count} don{total._count!==1?"s":""})</p>
          </div>
        </div>
      )}
      {dons.length === 0 ? (
        <EmptyState icon="💚" title="Aucun don" description="Votre générosité aide les entrepreneurs africains à réaliser leurs rêves."
          action={<Link href="/soutenir/dons" className="btn btn-savane btn-md">Faire un don</Link>}/>
      ) : (
        <div className="space-y-3">
          {dons.map(d => (
            <div key={d.id} className="card p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:"var(--savane-pale)"}}>
                <span className="text-lg">💚</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{color:"var(--encre)"}}>{formatMontant(d.montant)}</p>
                <p className="text-xs" style={{color:"var(--ardoise)"}}>{formatDate(d.createdAt)} · {d.type==="MENSUEL"?"Don mensuel":"Don unique"}</p>
              </div>
              <Badge variant={d.statut==="CONFIRME"?"savane":d.statut==="EN_ATTENTE"?"cauri":"gris"}>{d.statut}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
