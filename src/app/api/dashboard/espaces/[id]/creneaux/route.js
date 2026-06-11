// src/app/api/dashboard/espaces/[id]/creneaux/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { addDays, startOfDay } from "date-fns"

export async function POST(req, { params }) {
  try {
    // Génère automatiquement les créneaux pour les 30 prochains jours
    const espace = await prisma.espace.findUnique({ where:{ id:params.id } })
    if (!espace) return NextResponse.json({ error:"Espace introuvable" },{ status:404 })

    const today    = startOfDay(new Date())
    const creneaux = []

    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i)
      const dow  = date.getDay()
      if (dow === 0 || dow === 6) continue // Skip weekends

      const types = espace.type === "COWORKING" ? ["JOURNEE"] : ["MATIN","APRES_MIDI","JOURNEE"]

      for (const type of types) {
        const existing = await prisma.creneau.findFirst({
          where: { espaceId:params.id, date, type },
        })
        if (!existing) {
          creneaux.push({ espaceId:params.id, date, type, disponible:true })
        }
      }
    }

    const created = await prisma.creneau.createMany({ data:creneaux })
    return NextResponse.json({ created:created.count })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error:"Erreur serveur" },{ status:500 })
  }
}

export async function GET(req, { params }) {
  try {
    const creneaux = await prisma.creneau.findMany({
      where: { espaceId:params.id, date:{ gte:new Date() } },
      orderBy: { date:"asc" },
      include: { reservation:{ select:{ statut:true } } },
    })
    return NextResponse.json({ creneaux })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
