// src/app/api/dons/route.js
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateRef } from "@/lib/utils"

export async function POST(req) {
  try {
    const body = await req.json()
    const { montant, prenom, nom, email, telephone, type = "UNIQUE" } = body
    if (!montant || !prenom || !nom || !email) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 })
    }
    const session = await getServerSession(authOptions)
    const reference = generateRef()
    const don = await prisma.don.create({
      data: { montant, prenom, nom, email, telephone: telephone||null, type, reference, utilisateurId: session?.user?.id || null },
    })
    return NextResponse.json({ donId: don.id, reference }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

    const where = session.user.role === "ADMIN" ? {} : { utilisateurId: session.user.id }
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")

    const [dons, total] = await Promise.all([
      prisma.don.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page-1)*limit, take: limit }),
      prisma.don.count({ where }),
    ])
    return NextResponse.json({ dons, total, totalPages: Math.ceil(total/limit) })
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
