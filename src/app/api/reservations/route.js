// src/app/api/reservations/route.js
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { mailer, mailConfirmReservation } from "@/lib/nodemailer"

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Connexion requise" }, { status: 401 })

    const { creneauId, notes } = await req.json()
    if (!creneauId) return NextResponse.json({ error: "Créneau requis" }, { status: 400 })

    const creneau = await prisma.creneau.findUnique({ where: { id: creneauId }, include: { espace: true, reservation: true } })
    if (!creneau) return NextResponse.json({ error: "Créneau introuvable" }, { status: 404 })
    if (!creneau.disponible || creneau.reservation) return NextResponse.json({ error: "Créneau non disponible" }, { status: 409 })

    const montant = creneau.type === "JOURNEE" ? (creneau.espace.prixJour||0) : (creneau.espace.prixDemi||0)
    const utilisateur = await prisma.utilisateur.findUnique({ where: { id: session.user.id } })

    const reservation = await prisma.reservation.create({
      data: { utilisateurId: session.user.id, creneauId, montant, notes: notes||null },
    })
    await prisma.creneau.update({ where: { id: creneauId }, data: { disponible: false } })

    mailer.sendMail(mailConfirmReservation({
      prenom: utilisateur.prenom, email: utilisateur.email,
      espace: creneau.espace, creneau, montant,
    })).catch(console.error)

    return NextResponse.json(reservation, { status: 201 })
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
    const reservations = await prisma.reservation.findMany({
      where, orderBy: { createdAt: "desc" },
      include: { creneau: { include: { espace: true } }, utilisateur: { select: { prenom:true, nom:true, email:true } } },
    })
    return NextResponse.json({ reservations })
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
