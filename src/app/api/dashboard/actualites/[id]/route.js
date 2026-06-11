// src/app/api/dashboard/actualites/[id]/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req, { params }) {
  try {
    const article = await prisma.article.findUnique({ where:{ id:params.id } })
    if (!article) return NextResponse.json({ error:"Introuvable" },{ status:404 })
    return NextResponse.json({ article })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}

export async function PUT(req, { params }) {
  try {
    const { titre, extrait, contenu, type, publie } = await req.json()
    const article = await prisma.article.update({
      where:{ id:params.id },
      data:{ titre, extrait, contenu, type, publie },
    })
    return NextResponse.json(article)
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.article.delete({ where:{ id:params.id } })
    return NextResponse.json({ ok:true })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
