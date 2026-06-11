// src/app/(public)/actualites/page.js
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { EmptyState, Badge, Pagination } from "@/components/ui"
import { formatDate, truncate } from "@/lib/utils"
export const metadata = { title:"Actualités | Fondation Fitma" }
export default async function ActualitesPage({ searchParams }) {
  const page  = parseInt(searchParams?.page||"1"), limit = 9
  let articles = [], total = 0
  try {
    ;[articles, total] = await Promise.all([
      prisma.article.findMany({ where:{ publie:true }, orderBy:{ createdAt:"desc" }, skip:(page-1)*limit, take:limit, select:{ id:true, titre:true, slug:true, extrait:true, imageUrl:true, type:true, createdAt:true } }),
      prisma.article.count({ where:{ publie:true } }),
    ])
  } catch {}
  return (
    <main className="pt-20">
      <section className="section section-savane"><div className="container-fitma text-center"><h1 className="text-h1 text-white mb-4">Actualités</h1><p className="text-white/75 max-w-xl mx-auto">Articles, analyses et communiqués de la Fondation Fitma.</p></div></section>
      <section className="section"><div className="container-fitma">
        {articles.length === 0 ? <EmptyState icon="📰" title="Aucun article" description="Les actualités seront bientôt disponibles."/> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(a => (
              <Link key={a.id} href={`/actualites/${a.slug}`} className="card card-hover block group">
                <div className="relative h-48 overflow-hidden">
                  {a.imageUrl ? <Image src={a.imageUrl} alt={a.titre} fill className="object-cover transition-transform duration-500 group-hover:scale-105"/> : <div className="w-full h-full flex items-center justify-center text-5xl" style={{background:"var(--savane-pale)"}}>📰</div>}
                  <div className="absolute top-3 left-3"><Badge variant={a.type==="COMMUNIQUE"?"nuit":"savane"}>{a.type==="COMMUNIQUE"?"Communiqué":"Article"}</Badge></div>
                </div>
                <div className="p-5">
                  <p className="text-xs mb-2" style={{color:"var(--brume)"}}>{formatDate(a.createdAt)}</p>
                  <h2 className="font-d font-bold text-base mb-2 group-hover:text-savane transition-colors" style={{color:"var(--encre)"}}>{a.titre}</h2>
                  <p className="text-xs" style={{color:"var(--ardoise)"}}>{truncate(a.extrait,100)}</p>
                  <span className="mt-3 inline-block text-xs font-semibold" style={{color:"var(--savane)"}}>Lire la suite →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div></section>
    </main>
  )
}
