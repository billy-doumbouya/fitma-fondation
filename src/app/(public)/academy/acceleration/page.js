// src/app/(public)/academy/acceleration/page.js
import ProgrammePageClient from "../ProgrammePageClient"
import { prisma } from "@/lib/prisma"
export const metadata = { title:"Programme Accélération | Fitma Academy" }
export default async function AccelerationPage() {
  const programme = await prisma.programme.findFirst({ where:{ type:"ACCELERATION", ouvert:true } })
  return <ProgrammePageClient programme={JSON.parse(JSON.stringify(programme))} type="ACCELERATION"/>
}
