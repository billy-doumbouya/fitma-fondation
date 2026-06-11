// src/app/api/lms/progression/route.js
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

    const { inscriptionId, leconId, complete } = await req.json()

    const prog = await prisma.progressionLecon.upsert({
      where: { inscriptionId_leconId: { inscriptionId, leconId } },
      update: { complete, completedAt: complete ? new Date() : null },
      create: { inscriptionId, leconId, complete, completedAt: complete ? new Date() : null },
    })
    return NextResponse.json(prog)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
