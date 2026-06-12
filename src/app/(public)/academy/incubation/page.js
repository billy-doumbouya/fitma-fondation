// src/app/(public)/academy/incubation/page.js
import ProgrammePageClient from "../ProgrammePageClient"
import { prisma } from "@/lib/prisma"

export const metadata = { title:"Programme Incubation | Fitma Academy" }

export default async function IncubationPage() {
  const programme = await prisma.programme.findFirst({ where:{ type:"INCUBATION", ouvert:true }, orderBy:{ createdAt:"desc" } })
  return <ProgrammePageClient programme={JSON.parse(JSON.stringify(programme))} type="INCUBATION"/>
}
