// src/app/(public)/espace/coworking/page.js
import EspaceDetailClient from "../EspaceDetailClient";
import { prisma } from "@/lib/prisma";
export const metadata = { title: "Coworking | Fitma Espace" };
export default async function CoworkingPage() {
  const espaces = await prisma.espace.findMany({
    where: { type: "COWORKING", disponible: true },
    include: {
      creneaux: {
        where: { disponible: true },
        orderBy: { date: "asc" },
        take: 14,
      },
    },
  });
  return (
    <EspaceDetailClient
      espaces={JSON.parse(JSON.stringify(espaces))}
      type="COWORKING"
      titre="Coworking"
      desc="Rejoignez notre open space dynamique avec WiFi haut débit, café et une communauté d'entrepreneurs motivés."
      icon="laptop"
    />
  );
}
