// src/app/api/formations/[id]/lecons/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req, { params }) {
  try {
    const { titre, description, videoUrl, contenu, dureeMin, ordre } = await req.json()
    const lecon = await prisma.lecon.create({
      data:{ formationId:params.id, titre:titre||"Nouvelle leçon", description:description||null, videoUrl:videoUrl||null, contenu:contenu||null, dureeMin:dureeMin||null, ordre:ordre||0 },
    })
    return NextResponse.json(lecon, { status:201 })
  } catch (e) { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
