// src/app/api/formations/[id]/inscrire/route.js
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { mailer, mailConfirmInscription } from "@/lib/nodemailer"

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Connexion requise" }, { status: 401 })

    const formation = await prisma.formation.findUnique({ where: { id: params.id } })
    if (!formation) return NextResponse.json({ error: "Formation introuvable" }, { status: 404 })
    if (!formation.gratuit) return NextResponse.json({ error: "Formation payante" }, { status: 400 })

    const inscription = await prisma.inscription.upsert({
      where: { utilisateurId_formationId: { utilisateurId: session.user.id, formationId: params.id } },
      update: { statut: "CONFIRME" },
      create: { utilisateurId: session.user.id, formationId: params.id, statut: "CONFIRME", montantPaye: 0 },
    })

    const user = await prisma.utilisateur.findUnique({ where: { id: session.user.id } })
    if (user) mailer.sendMail(mailConfirmInscription({ prenom: user.prenom, email: user.email, formation })).catch(console.error)

    return NextResponse.json(inscription, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
