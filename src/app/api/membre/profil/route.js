// src/app/api/membre/profil/route.js
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    const { prenom, nom, telephone } = await req.json()
    const user = await prisma.utilisateur.update({
      where: { id: session.user.id },
      data: { prenom, nom, telephone: telephone || null },
    })
    return NextResponse.json({ id: user.id, name: `${prenom} ${nom}` })
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
