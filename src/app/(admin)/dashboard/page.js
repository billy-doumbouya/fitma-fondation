// src/app/(admin)/dashboard/page.js
import { prisma } from "@/lib/prisma"
import { Users, GraduationCap, Building2, Heart, Mail, FileCheck } from "lucide-react"
import { StatCard } from "@/components/ui"
import { formatMontant, formatDate } from "@/lib/utils"
import AdminDashboardCharts from "./AdminDashboardCharts"

export const metadata = { title:"Dashboard Admin | Fondation Fitma" }

async function getStats() {
  const debut = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const [
    totalUsers, totalFormations, totalInscriptions, totalReservations,
    totalCandidatures, totalDons, donsMois, messagesNonLus,
    visiteurs7j, donsMensuels, derniersMessages, derniersDons,
  ] = await Promise.all([
    prisma.utilisateur.count(),
    prisma.formation.count({ where:{ publie:true } }),
    prisma.inscription.count({ where:{ statut:"CONFIRME" } }),
    prisma.reservation.count({ where:{ statut:"CONFIRME" } }),
    prisma.candidature.count({ where:{ statut:{ in:["SOUMISE","EN_EVALUATION"] } } }),
    prisma.don.aggregate({ where:{ statut:"CONFIRME" }, _sum:{ montant:true }, _count:true }),
    prisma.don.aggregate({ where:{ statut:"CONFIRME", createdAt:{ gte:debut } }, _sum:{ montant:true }, _count:true }),
    prisma.message.count({ where:{ lu:false } }),
    prisma.$queryRaw`SELECT DATE(created_at)::text as date, COUNT(*)::int as count FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days' GROUP BY DATE(created_at) ORDER BY date ASC`,
    prisma.$queryRaw`SELECT TO_CHAR(created_at,'YYYY-MM') as mois, COALESCE(SUM(montant),0)::float as total FROM dons WHERE statut='CONFIRME' AND created_at >= NOW() - INTERVAL '6 months' GROUP BY TO_CHAR(created_at,'YYYY-MM') ORDER BY mois ASC`,
    prisma.message.findMany({ orderBy:{ createdAt:"desc" }, take:5, select:{ id:true, prenom:true, nom:true, sujet:true, lu:true, createdAt:true } }),
    prisma.don.findMany({ where:{ statut:"CONFIRME" }, orderBy:{ createdAt:"desc" }, take:5, select:{ id:true, prenom:true, nom:true, montant:true, devise:true, createdAt:true } }),
  ])
  return { totalUsers, totalFormations, totalInscriptions, totalReservations, totalCandidatures,
    totalDons:{ montant:totalDons._sum.montant||0, count:totalDons._count },
    donsMois:{ montant:donsMois._sum.montant||0, count:donsMois._count },
    messagesNonLus, visiteurs7j, donsMensuels, derniersMessages, derniersDons }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="font-d font-black text-2xl sm:text-3xl" style={{color:"var(--encre)"}}>Vue d'ensemble</h1>
        <p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>Tableau de bord Fondation Fitma</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon={Users}       label="Membres"       value={stats.totalUsers}          couleur="var(--nuit)"       bg="rgba(26,35,126,.1)"      href="/admin/utilisateurs"/>
        <StatCard icon={GraduationCap} label="Formations"  value={stats.totalFormations}     couleur="var(--savane)"     bg="var(--savane-pale)"      href="/admin/formations"/>
        <StatCard icon={GraduationCap} label="Inscrits"    value={stats.totalInscriptions}   couleur="var(--savane-l)"   bg="var(--savane-pale)"      href="/admin/formations"/>
        <StatCard icon={Building2}   label="Réservations"  value={stats.totalReservations}   couleur="var(--cauri-d)"    bg="var(--cauri-pale)"       href="/admin/reservations"/>
        <StatCard icon={FileCheck}   label="Candidatures"  value={stats.totalCandidatures}   sub="à traiter" couleur="var(--nuit)" bg="rgba(26,35,126,.1)" href="/admin/candidatures"/>
        <StatCard icon={Mail}        label="Messages"      value={stats.messagesNonLus}      sub="non lus"  couleur="var(--cauri-d)" bg="var(--cauri-pale)" href="/admin/messages"/>
      </div>

      {/* Dons highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-5" style={{background:"linear-gradient(135deg,var(--savane-d),var(--savane))"}}>
          <Heart size={20} className="text-white/70 mb-3"/>
          <p className="font-d font-black text-3xl text-white">{formatMontant(stats.totalDons.montant)}</p>
          <p className="text-white/70 text-sm mt-1">Total dons reçus ({stats.totalDons.count})</p>
        </div>
        <div className="card p-5" style={{background:"linear-gradient(135deg,var(--nuit),var(--nuit-l))"}}>
          <Heart size={20} className="text-white/70 mb-3"/>
          <p className="font-d font-black text-3xl text-white">{formatMontant(stats.donsMois.montant)}</p>
          <p className="text-white/70 text-sm mt-1">Dons ce mois ({stats.donsMois.count})</p>
        </div>
      </div>

      <AdminDashboardCharts visiteurs={stats.visiteurs7j} donsMensuels={stats.donsMensuels} derniersMessages={stats.derniersMessages} derniersDons={stats.derniersDons}/>
    </div>
  )
}
