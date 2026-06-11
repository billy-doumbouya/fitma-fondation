// src/app/api/formations/[id]/admin/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export async function GET(req, { params }) {
  try {
    const formation = await prisma.formation.findUnique({
      where:{ id:params.id },
      include:{ lecons:{ orderBy:{ ordre:"asc" }, include:{ quiz:true } }, _count:{ select:{ inscriptions:true } } },
    })
    if (!formation) return NextResponse.json({ error:"Introuvable" },{ status:404 })
    return NextResponse.json({ formation })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
