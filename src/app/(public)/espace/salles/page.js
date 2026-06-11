// src/app/(public)/espace/salles/page.js
import EspaceDetailClient from "../EspaceDetailClient"
import { prisma } from "@/lib/prisma"
export const metadata = { title:"Salles de Réunion | Fitma Espace" }
export default async function SallesPage() {
  const espaces = await prisma.espace.findMany({ where:{ type:"SALLE", disponible:true }, include:{ creneaux:{ where:{ disponible:true }, orderBy:{ date:"asc" }, take:14 } } })
  return <EspaceDetailClient espaces={JSON.parse(JSON.stringify(espaces))} type="SALLE" titre="Salles de Réunion" desc="Des salles équipées pour vos réunions, formations et présentations. Vidéoprojecteur, climatisation et WiFi inclus." emoji="🎯"/>
}
