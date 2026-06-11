// src/app/api/candidatures/[id]/statut/route.js
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { mailer, mailStatutCandidature } from "@/lib/nodemailer"

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    const { statut, commentaire } = await req.json()
    const candidature = await prisma.candidature.update({
      where: { id: params.id },
      data: { statut, commentaireAdmin: commentaire || null },
      include: { utilisateur: true, programme: { select: { titre: true } } },
    })
    mailer.sendMail(mailStatutCandidature({
      prenom: candidature.utilisateur.prenom,
      email:  candidature.utilisateur.email,
      programme: candidature.programme.titre,
      statut,
    })).catch(console.error)
    return NextResponse.json(candidature)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
