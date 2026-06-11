// src/app/api/auth/register/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req) {
  try {
    const { prenom, nom, email, telephone, motDePasse } = await req.json()
    if (!prenom || !nom || !email || !motDePasse) return NextResponse.json({ error:"Champs obligatoires manquants" },{ status:400 })

    const exists = await prisma.utilisateur.findUnique({ where:{ email } })
    if (exists) return NextResponse.json({ error:"Un compte existe déjà avec cet email." },{ status:409 })

    const hash = await bcrypt.hash(motDePasse, 12)
    const user = await prisma.utilisateur.create({ data:{ prenom, nom, email, telephone:telephone||null, password:hash, role:"MEMBRE" } })
    return NextResponse.json({ id:user.id, email:user.email },{ status:201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error:"Erreur serveur" },{ status:500 })
  }
}
