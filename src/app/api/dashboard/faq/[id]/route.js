// src/app/api/dashboard/faq/[id]/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export async function DELETE(req, { params }) {
  try { await prisma.faq.delete({ where:{ id:params.id } }); return NextResponse.json({ ok:true }) }
  catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
