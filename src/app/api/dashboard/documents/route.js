// src/app/api/dashboard/documents/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    return NextResponse.json({ documents: await prisma.document.findMany({ orderBy:{ createdAt:"desc" } }) })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}

export async function POST(req) {
  try {
    const { titre, url, publicKey, categorie } = await req.json()
    const doc = await prisma.document.create({ data:{ titre, url, publicKey, categorie:categorie||null } })
    return NextResponse.json(doc, { status:201 })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
