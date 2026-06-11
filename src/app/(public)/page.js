// src/app/(public)/page.js
import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

export async function generateMetadata() {
  return {
    title: "Fondation Fitma — Bâtir l'Afrique Numérique, Ensemble",
    description:
      "Fitma Academy forme les entrepreneurs de demain. Fitma Espace les accueille. La Fondation les soutient.",
  };
}

async function getData() {
  try {
    const [formations, articles] = await Promise.all([
      prisma.formation.findMany({
        where: { publie: true },
        take: 4,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          titre: true,
          slug: true,
          description: true,
          categorie: true,
          niveau: true,
          format: true,
          prix: true,
          gratuit: true,
          imageUrl: true,
          duree: true,
          _count: { select: { inscriptions: true } },
        },
      }),
      prisma.article.findMany({
        where: { publie: true },
        take: 3,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          titre: true,
          slug: true,
          extrait: true,
          imageUrl: true,
          type: true,
          createdAt: true,
        },
      }),
    ]);
    return { formations, articles };
  } catch {
    return { formations: [], articles: [] };
  }
}

export default async function HomePage() {
  const { formations, articles } = await getData();
  return <HomeClient formations={formations} articles={articles} />;
}
