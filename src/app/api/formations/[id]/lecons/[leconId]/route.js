// src/app/api/formations/[id]/lecons/[leconId]/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(req, { params }) {
  try {
    await prisma.lecon.delete({ where:{ id:params.leconId } })
    return NextResponse.json({ ok:true })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json()
    const lecon = await prisma.lecon.update({
      where:{ id:params.leconId },
      data:{
        titre:       body.titre,
        description: body.description || null,
        videoUrl:    body.videoUrl    || null,
        contenu:     body.contenu     || null,
        dureeMin:    body.dureeMin    ? Number(body.dureeMin) : null,
        ordre:       body.ordre       || 0,
      },
    })
    return NextResponse.json(lecon)
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
