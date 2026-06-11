// src/app/(admin)/programmes/page.js
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui"
export const metadata = { title:"Programmes | Admin Fitma" }
export default async function AdminProgrammesPage() {
  const programmes = await prisma.programme.findMany({
    orderBy:{ createdAt:"desc" },
    include:{ _count:{ select:{ candidatures:true } } },
  })
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Programmes</h1>
        <Link href="/admin/programmes/nouveau" className="btn btn-savane btn-md">+ Nouveau programme</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {programmes.map(p => (
          <div key={p.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <Badge variant={p.type==="INCUBATION"?"savane":"nuit"} className="mb-2">{p.type}</Badge>
                <h3 className="font-d font-bold text-base" style={{color:"var(--encre)"}}>{p.titre}</h3>
                <p className="text-xs mt-1" style={{color:"var(--ardoise)"}}>{p.duree}</p>
              </div>
              <Badge variant={p.ouvert?"savane":"gris"}>{p.ouvert?"Ouvert":"Fermé"}</Badge>
            </div>
            <p className="text-sm mb-4" style={{color:"var(--ardoise)"}}>{p.description?.slice(0,100)}...</p>
            <div className="flex items-center justify-between">
              <p className="text-xs" style={{color:"var(--brume)"}}>{p._count.candidatures} candidature{p._count.candidatures!==1?"s":""}</p>
              <Link href={`/admin/programmes/${p.id}`} className="btn btn-ghost btn-sm" style={{border:"1px solid #E0E0E0"}}>Modifier</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
