// src/app/(admin)/candidatures/page.js
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui"
import { formatDate } from "@/lib/utils"
import AdminCandidaturesClient from "./AdminCandidaturesClient"
export const metadata = { title:"Candidatures | Admin Fitma" }
export default async function CandidaturesPage() {
  const candidatures = await prisma.candidature.findMany({
    orderBy:{ createdAt:"desc" },
    include:{ programme:{ select:{ titre:true, type:true } }, utilisateur:{ select:{ prenom:true, nom:true, email:true } } },
  })
  return <AdminCandidaturesClient candidatures={JSON.parse(JSON.stringify(candidatures))}/>
}
