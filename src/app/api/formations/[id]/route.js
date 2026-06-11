// src/app/api/formations/[id]/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(req, { params }) {
  try {
    const body = await req.json()
    const formation = await prisma.formation.update({
      where:{ id:params.id },
      data:{
        titre:       body.titre,
        description: body.description,
        format:      body.format,
        niveau:      body.niveau,
        prix:        body.prix ? Number(body.prix) : 0,
        gratuit:     Boolean(body.gratuit),
        publie:      Boolean(body.publie),
        duree:       body.duree,
        formateur:   body.formateur || null,
      },
    })
    return NextResponse.json(formation)
  } catch (e) { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.formation.delete({ where:{ id:params.id } })
    return NextResponse.json({ ok:true })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
