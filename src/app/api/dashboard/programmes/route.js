// src/app/api/dashboard/programmes/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const programmes = await prisma.programme.findMany({ orderBy:{ createdAt:"desc" }, include:{ _count:{ select:{ candidatures:true } } } })
    return NextResponse.json({ programmes })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const programme = await prisma.programme.create({ data:{
      type:        body.type,
      titre:       body.titre,
      description: body.description,
      criteres:    body.criteres    || [],
      avantages:   body.avantages   || [],
      duree:       body.duree,
      ouvert:      body.ouvert !== false,
      dateLimite:  body.dateLimite ? new Date(body.dateLimite) : null,
    }})
    return NextResponse.json(programme, { status:201 })
  } catch (e) { return NextResponse.json({ error:"Erreur serveur" },{ status:500 }) }
}
