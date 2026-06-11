// src/app/api/upload/route.js
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { uploadBuffer } from "@/lib/cloudinary"

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

    const formData = await req.formData()
    const file     = formData.get("file")
    const folder   = formData.get("folder") || "fitma"

    if (!file) return NextResponse.json({ error: "Fichier manquant" }, { status: 400 })

    // Validation taille (10 Mo max)
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)" }, { status: 400 })

    // Types autorisés
    const allowed = ["image/jpeg","image/png","image/webp","image/gif","application/pdf","video/mp4"]
    if (!allowed.includes(file.type)) return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 400 })

    const bytes  = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const isPdf  = file.type === "application/pdf"
    const isVideo = file.type === "video/mp4"

    const result = await uploadBuffer(buffer, folder, isPdf ? "raw" : isVideo ? "video" : "image")
    return NextResponse.json({ url: result.url, publicKey: result.publicKey })
  } catch (e) {
    console.error("Upload error:", e)
    return NextResponse.json({ error: "Erreur upload" }, { status: 500 })
  }
}
