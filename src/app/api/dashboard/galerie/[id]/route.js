// src/app/api/dashboard/galerie/[id]/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { deleteFile } from "@/lib/cloudinary"

export async function DELETE(req, { params }) {
  try {
    const img = await prisma.imageGalerie.findUnique({ where:{ id:params.id } })
    if (!img) return NextResponse.json({ error:"Image introuvable" },{ status:404 })
    await deleteFile(img.publicKey)
    await prisma.imageGalerie.delete({ where:{ id:params.id } })
    return NextResponse.json({ ok:true })
  } catch (e) { return NextResponse.json({ error:"Erreur" },{ status:500 }) }
}
