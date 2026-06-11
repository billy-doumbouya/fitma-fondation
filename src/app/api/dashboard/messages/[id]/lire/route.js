// src/app/api/dashboard/messages/[id]/lire/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export async function PUT(req, { params }) {
  try {
    await prisma.message.update({ where:{ id:params.id }, data:{ lu:true } })
    return NextResponse.json({ ok:true })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
