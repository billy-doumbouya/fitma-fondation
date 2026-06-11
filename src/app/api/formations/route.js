// src/app/api/formations/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const page      = parseInt(searchParams.get("page") || "1")
    const limit     = parseInt(searchParams.get("limit") || "12")
    const categorie = searchParams.get("categorie") || undefined
    const niveau    = searchParams.get("niveau")    || undefined
    const format    = searchParams.get("format")    || undefined
    const search    = searchParams.get("search")    || undefined
    const publie    = searchParams.get("publie")    !== "false"

    const where = {
      ...(publie && { publie: true }),
      ...(categorie && { categorie }),
      ...(niveau    && { niveau }),
      ...(format    && { format }),
      ...(search    && { OR: [{ titre: { contains: search, mode:"insensitive" } }, { description: { contains: search, mode:"insensitive" } }] }),
    }

    const [formations, total] = await Promise.all([
      prisma.formation.findMany({
        where, orderBy: { createdAt: "desc" },
        skip: (page-1)*limit, take: limit,
        include: { _count: { select: { inscriptions: true, lecons: true } } },
      }),
      prisma.formation.count({ where }),
    ])

    return NextResponse.json({ formations, total, page, totalPages: Math.ceil(total/limit) })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { titre, description, categorie, duree, format, niveau, prix, gratuit, objectifs, prerequis, formateur, placesMax, publie } = body
    if (!titre || !description || !categorie || !duree) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 })
    }
    const slug = titre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-") + "-" + Date.now()
    const formation = await prisma.formation.create({
      data: { titre, slug, description, categorie, duree, format: format||"PRESENTIEL", niveau: niveau||"DEBUTANT",
        prix: prix||0, gratuit: gratuit||false, objectifs: objectifs||[], prerequis, formateur, placesMax, publie: publie||false }
    })
    return NextResponse.json(formation, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
