import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import FormationDetailClient from "./FormationDetailClient"

export async function generateMetadata({ params }) {
  const f = await prisma.formation.findUnique({ where: { slug: params.slug } })
  if (!f) return {}
  return { title: `${f.titre} | Fitma Academy`, description: f.description?.slice(0, 160) }
}

export default async function FormationDetailPage({ params }) {
  const [formation, session] = await Promise.all([
    prisma.formation.findUnique({
      where: { slug: params.slug, publie: true },
      include: { lecons: { orderBy: { ordre:"asc" }, include: { quiz: true } }, _count: { select: { inscriptions:true } } },
    }),
    getServerSession(authOptions),
  ])

  if (!formation) notFound()

  let inscription = null
  if (session?.user?.id) {
    inscription = await prisma.inscription.findUnique({
      where: { utilisateurId_formationId: { utilisateurId: session.user.id, formationId: formation.id } },
      include: { progressions: true },
    })
  }

  return <FormationDetailClient formation={JSON.parse(JSON.stringify(formation))} inscription={JSON.parse(JSON.stringify(inscription))} session={JSON.parse(JSON.stringify(session))}/>
}
