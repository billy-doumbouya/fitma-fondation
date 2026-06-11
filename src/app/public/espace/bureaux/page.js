// src/app/(public)/espace/bureaux/page.js
import EspaceDetailClient from "../EspaceDetailClient"
import { prisma } from "@/lib/prisma"
export const metadata = { title:"Bureaux Privés | Fitma Espace" }
export default async function BureauxPage() {
  const espaces = await prisma.espace.findMany({ where:{ type:"BUREAU", disponible:true }, include:{ creneaux:{ where:{ disponible:true }, orderBy:{ date:"asc" }, take:14 } } })
  return <EspaceDetailClient espaces={JSON.parse(JSON.stringify(espaces))} type="BUREAU" titre="Bureaux Privés" desc="Des bureaux fermés pour 1 à 10 personnes. Confidentialité, calme et équipements professionnels." emoji="🏢"/>
}
