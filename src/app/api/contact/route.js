// src/app/api/contact/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { mailer, mailAdminContact, mailConfirmContact } from "@/lib/nodemailer"

export async function POST(req) {
  try {
    const body = await req.json()
    const { prenom, nom, email, telephone, sujet, contenu } = body
    if (!prenom || !nom || !email || !sujet || !contenu) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 })
    }
    const message = await prisma.message.create({ data: { prenom, nom, email, telephone: telephone || null, sujet, contenu } })
    Promise.all([
      mailer.sendMail(mailAdminContact({ prenom, nom, email, telephone, sujet, contenu })),
      mailer.sendMail(mailConfirmContact({ prenom, email })),
    ]).catch(e => console.error("Mail error:", e))
    return NextResponse.json({ success: true, id: message.id }, { status: 201 })
  } catch (e) {
    console.error("Contact error:", e)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const page  = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const nonLus = searchParams.get("nonLus") === "true"
    const where = nonLus ? { lu: false } : {}
    const [messages, total] = await Promise.all([
      prisma.message.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page-1)*limit, take: limit }),
      prisma.message.count({ where }),
    ])
    return NextResponse.json({ messages, total, page, totalPages: Math.ceil(total/limit) })
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
