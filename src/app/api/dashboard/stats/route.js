// src/app/api/dashboard/stats/route.js
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const debut = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

    const [
      totalUsers, totalFormations, totalInscriptions, totalReservations,
      totalCandidatures, totalDons, donsMois, messagesNonLus,
      visiteurs7j, donsMensuels,
    ] = await Promise.all([
      prisma.utilisateur.count(),
      prisma.formation.count({ where: { publie: true } }),
      prisma.inscription.count({ where: { statut: "CONFIRME" } }),
      prisma.reservation.count({ where: { statut: "CONFIRME" } }),
      prisma.candidature.count(),
      prisma.don.aggregate({ where: { statut: "CONFIRME" }, _sum: { montant: true }, _count: true }),
      prisma.don.aggregate({ where: { statut: "CONFIRME", createdAt: { gte: debut } }, _sum: { montant: true }, _count: true }),
      prisma.message.count({ where: { lu: false } }),
      prisma.$queryRaw`SELECT DATE(created_at)::text as date, COUNT(*)::int as count FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days' GROUP BY DATE(created_at) ORDER BY date ASC`,
      prisma.$queryRaw`SELECT TO_CHAR(created_at,'YYYY-MM') as mois, SUM(montant)::float as total, COUNT(*)::int as nombre FROM dons WHERE statut='CONFIRME' AND created_at >= NOW() - INTERVAL '6 months' GROUP BY TO_CHAR(created_at,'YYYY-MM') ORDER BY mois ASC`,
    ])

    return NextResponse.json({
      totalUsers,
      totalFormations,
      totalInscriptions,
      totalReservations,
      totalCandidatures,
      totalDons:    { montant: totalDons._sum.montant || 0, count: totalDons._count },
      donsMois:     { montant: donsMois._sum.montant  || 0, count: donsMois._count  },
      messagesNonLus,
      visiteurs7j,
      donsMensuels,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
