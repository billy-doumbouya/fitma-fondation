// src/app/api/dashboard/documents/[id]/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { deleteFile } from "@/lib/cloudinary"

export async function DELETE(req, { params }) {
  try {
    const doc = await prisma.document.findUnique({ where:{ id:params.id } })
    if (!doc) return NextResponse.json({ error:"Document introuvable" },{ status:404 })
    await deleteFile(doc.publicKey, "raw")
    await prisma.document.delete({ where:{ id:params.id } })
    return NextResponse.json({ ok:true })
  } catch { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
