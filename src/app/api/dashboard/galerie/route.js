// src/app/api/dashboard/galerie/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const images = await prisma.imageGalerie.findMany({ orderBy:{ ordre:"asc" } })
    return NextResponse.json({ images })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}

export async function POST(req) {
  try {
    const { url, publicKey, legende } = await req.json()
    const count = await prisma.imageGalerie.count()
    const img = await prisma.imageGalerie.create({ data:{ url, publicKey, legende:legende||null, ordre:count } })
    return NextResponse.json(img, { status:201 })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
