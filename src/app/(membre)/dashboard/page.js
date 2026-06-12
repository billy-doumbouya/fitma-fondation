// src/app/(membre)/dashboard/page.js
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { GraduationCap, Calendar, FileCheck, Heart } from "lucide-react"
import { StatCard } from "@/components/ui"
import { formatDate, formatMontant, calcProgression } from "@/lib/utils"

export const metadata = { title:"Mon Dashboard | Fitma" }

export default async function MembreDashboard() {
  const session = await getServerSession(authOptions)
  const userId  = session.user.id

  const [inscriptions, reservations, candidatures, dons] = await Promise.all([
    prisma.inscription.findMany({ where:{ utilisateurId:userId, statut:"CONFIRME" }, include:{ formation:{ select:{ titre:true, slug:true } }, progressions:true }, orderBy:{ createdAt:"desc" }, take:3 }),
    prisma.reservation.findMany({ where:{ utilisateurId:userId }, include:{ creneau:{ include:{ espace:{ select:{ nom:true } } } } }, orderBy:{ createdAt:"desc" }, take:3 }),
    prisma.candidature.findMany({ where:{ utilisateurId:userId }, include:{ programme:{ select:{ titre:true, type:true } } }, orderBy:{ createdAt:"desc" }, take:3 }),
    prisma.don.aggregate({ where:{ utilisateurId:userId, statut:"CONFIRME" }, _sum:{ montant:true }, _count:true }),
  ])

  const STATUT_COLORS = { SOUMISE:"cauri", EN_EVALUATION:"nuit", ACCEPTEE:"savane", REFUSEE:"gris" }
  const STATUT_LABELS = { SOUMISE:"Soumise", EN_EVALUATION:"En évaluation", ACCEPTEE:"✅ Acceptée", REFUSEE:"❌ Refusée" }

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 md:pt-8 space-y-8">
      <div>
        <h1 className="font-d font-black text-2xl sm:text-3xl" style={{color:"var(--encre)"}}>
          Bonjour, {session.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>Bienvenue dans votre espace personnel Fitma.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Formations" value={inscriptions.length} sub="actives" couleur="var(--savane)" bg="var(--savane-pale)" href="/membre/mes-formations"/>
        <StatCard icon={Calendar}     label="Réservations" value={reservations.length} sub="récentes" couleur="var(--nuit)" bg="rgba(26,35,126,.1)" href="/membre/mes-reservations"/>
        <StatCard icon={FileCheck}    label="Candidatures" value={candidatures.length} sub="soumises" couleur="var(--cauri-d)" bg="var(--cauri-pale)" href="/membre/mes-candidatures"/>
        <StatCard icon={Heart}        label="Dons" value={formatMontant(dons._sum.montant||0)} sub={`${dons._count} don${dons._count!==1?"s":""}`} couleur="var(--savane)" bg="var(--savane-pale)" href="/membre/mes-dons"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mes formations */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5" style={{borderBottom:"1px solid #F5F0E8"}}>
            <h2 className="font-d font-bold text-base" style={{color:"var(--encre)"}}>Mes Formations</h2>
            <Link href="/membre/mes-formations" className="text-xs font-semibold" style={{color:"var(--savane)"}}>Voir tout →</Link>
          </div>
          {inscriptions.length === 0 ? (
            <div className="p-8 text-center"><p className="text-sm" style={{color:"var(--brume)"}}>Aucune formation. <Link href="/academy/formations" style={{color:"var(--savane)"}}>Explorer le catalogue</Link></p></div>
          ) : inscriptions.map(insc => {
            const prog = calcProgression(insc.progressions, 0)
            return (
              <Link key={insc.id} href={`/membre/mes-formations/${insc.formation.slug}`} className="flex items-center gap-4 p-4 hover:bg-sable transition-colors" style={{borderBottom:"1px solid #F5F0E8"}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:"var(--savane-pale)"}}><GraduationCap size={18} style={{color:"var(--savane)"}}/></div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{color:"var(--encre)"}}>{insc.formation.titre}</p>
                  <div className="mt-1.5 w-full rounded-full h-1.5" style={{background:"#E0E0E0"}}>
                    <div className="h-1.5 rounded-full transition-all" style={{background:"var(--savane)",width:`${prog}%`}}/>
                  </div>
                </div>
                <span className="text-xs font-bold shrink-0" style={{color:"var(--savane)"}}>{prog}%</span>
              </Link>
            )
          })}
        </div>

        {/* Mes candidatures */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5" style={{borderBottom:"1px solid #F5F0E8"}}>
            <h2 className="font-d font-bold text-base" style={{color:"var(--encre)"}}>Mes Candidatures</h2>
            <Link href="/membre/mes-candidatures" className="text-xs font-semibold" style={{color:"var(--savane)"}}>Voir tout →</Link>
          </div>
          {candidatures.length === 0 ? (
            <div className="p-8 text-center"><p className="text-sm" style={{color:"var(--brume)"}}>Aucune candidature. <Link href="/academy/incubation" style={{color:"var(--savane)"}}>Postuler à un programme</Link></p></div>
          ) : candidatures.map(c => (
            <div key={c.id} className="flex items-center gap-4 p-4" style={{borderBottom:"1px solid #F5F0E8"}}>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{color:"var(--encre)"}}>{c.nomProjet}</p>
                <p className="text-xs" style={{color:"var(--ardoise)"}}>{c.programme.titre}</p>
              </div>
              <span className={`badge badge-${STATUT_COLORS[c.statut]}`}>{STATUT_LABELS[c.statut]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
