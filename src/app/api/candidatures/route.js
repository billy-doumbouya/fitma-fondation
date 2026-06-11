// src/app/api/candidatures/route.js
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Connexion requise" }, { status: 401 })

    const body = await req.json()
    const { programmeId, nomProjet, descriptionProjet, stadeAvancement, equipe, pitchDeckUrl, businessPlanUrl } = body

    if (!programmeId || !nomProjet || !descriptionProjet || !stadeAvancement) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 })
    }

    const existing = await prisma.candidature.findFirst({
      where: { utilisateurId: session.user.id, programmeId, statut: { not: "REFUSEE" } },
    })
    if (existing) return NextResponse.json({ error: "Vous avez déjà soumis une candidature pour ce programme." }, { status: 409 })

    const candidature = await prisma.candidature.create({
      data: { utilisateurId: session.user.id, programmeId, nomProjet, descriptionProjet, stadeAvancement, equipe, pitchDeckUrl, businessPlanUrl },
    })
    return NextResponse.json(candidature, { status: 201 })
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
    const candidatures = await prisma.candidature.findMany({
      where, orderBy: { createdAt: "desc" },
      include: { programme: { select: { titre:true, type:true } }, utilisateur: { select: { prenom:true, nom:true, email:true } } },
    })
    return NextResponse.json({ candidatures })
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
