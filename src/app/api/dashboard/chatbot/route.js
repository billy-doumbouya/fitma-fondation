// src/app/api/dashboard/chatbot/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const config = await prisma.chatbotConfig.findFirst({ orderBy:{ updatedAt:"desc" } })
    return NextResponse.json({ config })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}

export async function PUT(req) {
  try {
    const { systemPrompt, actif } = await req.json()
    const existing = await prisma.chatbotConfig.findFirst()
    let config
    if (existing) {
      config = await prisma.chatbotConfig.update({ where:{ id:existing.id }, data:{ systemPrompt, actif } })
    } else {
      config = await prisma.chatbotConfig.create({ data:{ systemPrompt, actif } })
    }
    return NextResponse.json(config)
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
