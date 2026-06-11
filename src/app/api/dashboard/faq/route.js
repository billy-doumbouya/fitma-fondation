// src/app/api/dashboard/faq/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export async function GET() {
  try { return NextResponse.json({ faqs: await prisma.faq.findMany({ orderBy:{ ordre:"asc" } }) }) }
  catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
export async function POST(req) {
  try {
    const { question, reponse, categorie } = await req.json()
    const count = await prisma.faq.count()
    const faq = await prisma.faq.create({ data:{ question, reponse, categorie:categorie||null, ordre:count } })
    return NextResponse.json(faq, { status:201 })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
