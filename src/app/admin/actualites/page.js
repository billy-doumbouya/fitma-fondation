// src/app/(admin)/actualites/page.js
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge, EmptyState } from "@/components/ui"
import { formatDate } from "@/lib/utils"
export const metadata = { title:"Actualités | Admin Fitma" }
export default async function AdminActualitesPage() {
  const articles = await prisma.article.findMany({ orderBy:{ createdAt:"desc" } })
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Actualités</h1><p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>{articles.length} articles</p></div>
        <Link href="/admin/actualites/nouveau" className="btn btn-savane btn-md">+ Nouvel article</Link>
      </div>
      {articles.length === 0 ? (
        <EmptyState icon="📰" title="Aucun article" action={<Link href="/admin/actualites/nouveau" className="btn btn-savane btn-md">Créer un article</Link>}/>
      ) : (
        <div className="space-y-3">
          {articles.map(a => (
            <div key={a.id} className="card p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-d font-bold text-sm truncate" style={{color:"var(--encre)"}}>{a.titre}</h3>
                  <Badge variant={a.type==="COMMUNIQUE"?"nuit":"gris"}>{a.type}</Badge>
                  <Badge variant={a.publie?"savane":"gris"}>{a.publie?"Publié":"Brouillon"}</Badge>
                </div>
                <p className="text-xs" style={{color:"var(--brume)"}}>{formatDate(a.createdAt)}</p>
              </div>
              <Link href={`/admin/actualites/${a.id}`} className="btn btn-ghost btn-sm" style={{border:"1px solid #E0E0E0"}}>Modifier</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
