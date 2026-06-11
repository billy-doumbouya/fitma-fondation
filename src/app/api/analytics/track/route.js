// src/app/api/analytics/track/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  try {
    const { page, locale = "fr" } = await req.json()
    if (!page) return NextResponse.json({ ok: false })
    await prisma.pageView.create({ data: { page, locale } })
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ ok: false }) }
}
