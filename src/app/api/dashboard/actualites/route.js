// src/app/api/dashboard/actualites/route.js
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") return NextResponse.json({ error:"Non autorisé" },{ status:401 })
    const body = await req.json()
    const article = await prisma.article.create({ data: {
      titre:    body.titre,
      slug:     body.slug,
      extrait:  body.extrait,
      contenu:  body.contenu || "<p>Contenu à venir.</p>",
      type:     body.type || "ARTICLE",
      imageUrl: body.imageUrl || null,
      publicKey:body.publicKey || null,
      publie:   body.publie || false,
    }})
    return NextResponse.json(article, { status:201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error:"Erreur serveur" },{ status:500 })
  }
}

export async function GET() {
  try {
    const articles = await prisma.article.findMany({ orderBy:{ createdAt:"desc" } })
    return NextResponse.json({ articles })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
