// src/app/api/payment/initiate/route.js
import { NextResponse } from "next/server"
import { createCheckoutSession, createDonSession } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { generateRef } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    const { type, itemId, montant, email, prenom, nom, donType } = body
    const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fondationfitma.org"

    // Paiement formation
    if (type === "formation") {
      const formation = await prisma.formation.findUnique({ where: { id: itemId } })
      if (!formation) return NextResponse.json({ error: "Formation introuvable" }, { status: 404 })

      const { url } = await createCheckoutSession({
        type, itemId, itemNom: formation.titre,
        montant: formation.prix, devise: formation.devise,
        userId: session?.user?.id, email,
        successUrl: `${BASE}/academy/formations/${formation.slug}?success=1`,
        cancelUrl:  `${BASE}/academy/formations/${formation.slug}`,
      })
      return NextResponse.json({ url })
    }

    // Paiement don
    if (type === "don") {
      const reference = generateRef()
      const don = await prisma.don.create({
        data: { montant, prenom, nom, email, type: donType||"UNIQUE", reference, utilisateurId: session?.user?.id||null },
      })
      const { url } = await createDonSession({
        montant, devise:"GNF", email, type: donType||"unique",
        successUrl: `${BASE}/soutenir/dons?success=1&ref=${reference}`,
        cancelUrl:  `${BASE}/soutenir/dons`,
      })
      await prisma.don.update({ where: { id: don.id }, data: { stripeSessionId: url } })
      return NextResponse.json({ url, reference })
    }

    return NextResponse.json({ error: "Type invalide" }, { status: 400 })
  } catch (e) {
    console.error("Payment error:", e)
    return NextResponse.json({ error: "Erreur paiement" }, { status: 500 })
  }
}
