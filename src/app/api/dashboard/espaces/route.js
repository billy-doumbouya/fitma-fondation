// src/app/api/dashboard/espaces/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const espaces = await prisma.espace.findMany({ orderBy:{ ordre:"asc" }, include:{ _count:{ select:{ creneaux:true, reservations:true } } } })
    return NextResponse.json({ espaces })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const count = await prisma.espace.count()
    const espace = await prisma.espace.create({ data:{
      nom:         body.nom,
      type:        body.type,
      description: body.description,
      capacite:    body.capacite   || null,
      superficie:  body.superficie || null,
      prixJour:    body.prixJour   || null,
      prixDemi:    body.prixDemi   || null,
      prixMois:    body.prixMois   || null,
      equipements: body.equipements || [],
      imageUrl:    body.imageUrl   || null,
      publicKey:   body.publicKey  || null,
      disponible:  body.disponible !== false,
      ville:       body.ville      || "Conakry",
      devise:      body.devise     || "GNF",
      ordre:       count,
    }})
    return NextResponse.json(espace, { status:201 })
  } catch (e) { console.error(e); return NextResponse.json({ error:"Erreur serveur" },{ status:500 }) }
}
