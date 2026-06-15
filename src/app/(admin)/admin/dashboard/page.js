// src/app/(admin)/dashboard/page.js
// ✅ Server Component pur — zéro fonction/JSX passé aux Client Components

import { prisma } from "@/lib/prisma";
import { Heart } from "lucide-react";
import { formatMontant, formatDate } from "@/lib/utils";
import AdminDashboardCharts from "./AdminDashboardCharts";
import AdminStatsGrid from "./AdminStatsGrid"; // ← Client Component pour les StatCards

export const metadata = { title: "Dashboard Admin | Fondation Fitma" };

async function getStats() {
  const debut = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const [
    totalUsers,
    totalFormations,
    totalInscriptions,
    totalReservations,
    totalCandidatures,
    totalDons,
    donsMois,
    messagesNonLus,
    visiteurs7j,
    donsMensuels,
    derniersMessages,
    derniersDons,
  ] = await Promise.all([
    prisma.utilisateur.count(),
    prisma.formation.count({ where: { publie: true } }),
    prisma.inscription.count({ where: { statut: "CONFIRME" } }),
    prisma.reservation.count({ where: { statut: "CONFIRME" } }),
    prisma.candidature.count({
      where: { statut: { in: ["SOUMISE", "EN_EVALUATION"] } },
    }),
    prisma.don.aggregate({
      where: { statut: "CONFIRME" },
      _sum: { montant: true },
      _count: true,
    }),
    prisma.don.aggregate({
      where: { statut: "CONFIRME", createdAt: { gte: debut } },
      _sum: { montant: true },
      _count: true,
    }),
    prisma.message.count({ where: { lu: false } }),

    // ✅ "createdAt" entre guillemets — colonne camelCase en DB (pas de @map)
    prisma.$queryRaw`
      SELECT DATE("createdAt")::text AS date, COUNT(*)::int AS count
      FROM page_views
      WHERE "createdAt" >= NOW() - INTERVAL '7 days'
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
    prisma.$queryRaw`
      SELECT
        TO_CHAR("createdAt", 'Mon YY') AS mois,
        COALESCE(SUM(montant), 0)::float AS total
      FROM dons
      WHERE statut = 'CONFIRME'
        AND "createdAt" >= NOW() - INTERVAL '6 months'
      GROUP BY TO_CHAR("createdAt", 'Mon YY'), DATE_TRUNC('month', "createdAt")
      ORDER BY DATE_TRUNC('month', "createdAt") ASC
    `,
    prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        prenom: true,
        nom: true,
        sujet: true,
        lu: true,
        createdAt: true,
      },
    }),
    prisma.don.findMany({
      where: { statut: "CONFIRME" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        prenom: true,
        nom: true,
        montant: true,
        devise: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    // Stats simples — sérialisables nativement
    totalUsers,
    totalFormations,
    totalInscriptions,
    totalReservations,
    totalCandidatures,
    messagesNonLus,

    // Agrégats
    totalDons: {
      montant: formatMontant(totalDons._sum.montant || 0),
      count: totalDons._count,
    },
    donsMois: {
      montant: formatMontant(donsMois._sum.montant || 0),
      count: donsMois._count,
    },

    // Charts — BigInt → Number, Date → string
    visiteurs7j: visiteurs7j.map((v) => ({
      date: v.date, // déjà ::text depuis SQL
      count: Number(v.count),
    })),
    donsMensuels: donsMensuels.map((d) => ({
      mois: d.mois,
      total: Number(d.total),
    })),

    // Listes — Date → string formatée
    derniersMessages: derniersMessages.map((m) => ({
      id: m.id,
      prenom: m.prenom,
      nom: m.nom,
      sujet: m.sujet,
      lu: m.lu,
      createdAt: formatDate(m.createdAt, { day: "2-digit", month: "2-digit" }),
    })),
    derniersDons: derniersDons.map((d) => ({
      id: d.id,
      prenom: d.prenom,
      nom: d.nom,
      createdAt: formatDate(d.createdAt, { day: "2-digit", month: "2-digit" }),
      montantFormate: formatMontant(d.montant, d.devise),
    })),
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1300, margin: "0 auto" }}>
      {/* ── Header ── */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontFamily: "var(--font-d)",
            fontWeight: 900,
            fontSize: "clamp(1.4rem,3vw,2rem)",
            color: "var(--encre,#1A237E)",
            margin: 0,
          }}
        >
          Vue d'ensemble
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "var(--ardoise,#546E7A)",
            marginTop: 4,
          }}
        >
          Tableau de bord — Fondation Fitma
        </p>
      </div>

      {/* ── Stat cards — Client Component (icônes résolues côté client) ── */}
      <AdminStatsGrid
        stats={{
          totalUsers: stats.totalUsers,
          totalFormations: stats.totalFormations,
          totalInscriptions: stats.totalInscriptions,
          totalReservations: stats.totalReservations,
          totalCandidatures: stats.totalCandidatures,
          messagesNonLus: stats.messagesNonLus,
        }}
      />

      {/* ── Dons highlight (Server-rendered, pas d'icône en prop) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 16,
          margin: "24px 0",
        }}
      >
        {/* Total dons */}
        <div
          style={{
            borderRadius: 20,
            padding: "24px 22px",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg,#1B5E20,#2E7D32)",
            boxShadow: "0 8px 32px rgba(27,94,32,.3)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255,255,255,.06)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(249,168,37,.1)",
              pointerEvents: "none",
            }}
          />
          <Heart
            size={20}
            style={{ color: "rgba(255,255,255,.6)", marginBottom: 12 }}
          />
          <p
            style={{
              fontFamily: "var(--font-d)",
              fontWeight: 900,
              fontSize: "clamp(1.6rem,3vw,2.2rem)",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {stats.totalDons.montant}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,.65)",
              fontSize: 13,
              marginTop: 6,
            }}
          >
            Total dons reçus ({stats.totalDons.count})
          </p>
        </div>

        {/* Dons ce mois */}
        <div
          style={{
            borderRadius: 20,
            padding: "24px 22px",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg,#1A237E,#283593)",
            boxShadow: "0 8px 32px rgba(26,35,126,.28)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255,255,255,.05)",
              pointerEvents: "none",
            }}
          />
          <Heart
            size={20}
            style={{ color: "rgba(255,255,255,.6)", marginBottom: 12 }}
          />
          <p
            style={{
              fontFamily: "var(--font-d)",
              fontWeight: 900,
              fontSize: "clamp(1.6rem,3vw,2.2rem)",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {stats.donsMois.montant}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,.65)",
              fontSize: 13,
              marginTop: 6,
            }}
          >
            Dons ce mois ({stats.donsMois.count})
          </p>
        </div>
      </div>

      {/* ── Charts + listes ── */}
      <AdminDashboardCharts
        visiteurs={stats.visiteurs7j}
        donsMensuels={stats.donsMensuels}
        derniersMessages={stats.derniersMessages}
        derniersDons={stats.derniersDons}
      />
    </div>
  );
}
