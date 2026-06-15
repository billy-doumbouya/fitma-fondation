// src/app/(membre)/dashboard/page.js
// ✅ Server Component pur — zéro fonction passée aux Client Components

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate, formatMontant, calcProgression } from "@/lib/utils";
import { DashboardClient } from "./DashboardClient"; // ← Client Component isolé

export const metadata = { title: "Mon Dashboard | Fitma" };

export default async function MembreDashboard() {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  const [inscriptions, reservations, candidatures, dons] = await Promise.all([
    prisma.inscription.findMany({
      where: { utilisateurId: userId, statut: "CONFIRME" },
      include: {
        formation: { select: { titre: true, slug: true } },
        progressions: true,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.reservation.findMany({
      where: { utilisateurId: userId },
      include: { creneau: { include: { espace: { select: { nom: true } } } } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.candidature.findMany({
      where: { utilisateurId: userId },
      include: { programme: { select: { titre: true, type: true } } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.don.aggregate({
      where: { utilisateurId: userId, statut: "CONFIRME" },
      _sum: { montant: true },
      _count: true,
    }),
  ]);

  // ✅ On sérialise UNIQUEMENT des données plain-object vers le Client
  const data = {
    prenom: session.user.name?.split(" ")[0] ?? "",

    stats: {
      formations: inscriptions.length,
      reservations: reservations.length,
      candidatures: candidatures.length,
      donsTotal: formatMontant(dons._sum.montant || 0),
      donsCount: dons._count,
    },

    inscriptions: inscriptions.map((i) => ({
      id: i.id,
      slug: i.formation.slug,
      titre: i.formation.titre,
      progression: calcProgression(i.progressions, 0),
    })),

    candidatures: candidatures.map((c) => ({
      id: c.id,
      nomProjet: c.nomProjet,
      programmeTitre: c.programme.titre,
      statut: c.statut,
    })),

    reservations: reservations.map((r) => ({
      id: r.id,
      espace: r.creneau.espace.nom,
      date: formatDate(r.creneau.date),
      statut: r.statut,
    })),
  };

  return <DashboardClient data={data} />;
}
