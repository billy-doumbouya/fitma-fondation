// src/app/(public)/documents-juridiques/page.js (redirect alias)
// src/app/(public)/actualites/ already covers documents — this page handles /documents-juridiques
import { prisma } from "@/lib/prisma"
import { FileText, Download, ExternalLink } from "lucide-react"
import { EmptyState, Badge } from "@/components/ui"
import { formatDate } from "@/lib/utils"

export const metadata = { title:"Documents Officiels | Fondation Fitma" }

export default async function DocumentsPage() {
  let documents = []
  try { documents = await prisma.document.findMany({ orderBy:{ createdAt:"desc" } }) } catch {}

  const categories = [...new Set(documents.map(d => d.categorie).filter(Boolean))]

  return (
    <main className="pt-20">
      <section className="section section-savane">
        <div className="container-fitma text-center">
          <h1 className="text-h1 text-white mb-4">Documents Officiels</h1>
          <p className="text-white/75 max-w-xl mx-auto">Accédez aux documents juridiques, rapports d'activité et publications officielles de la Fondation Fitma.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-fitma max-w-3xl mx-auto">
          {documents.length === 0 ? (
            <EmptyState icon="📄" title="Documents à venir" description="Les documents officiels seront bientôt disponibles."/>
          ) : (
            <>
              {categories.length > 0 ? (
                categories.map(cat => {
                  const docs = documents.filter(d => d.categorie === cat)
                  return (
                    <div key={cat} className="mb-8">
                      <h2 className="font-d font-bold text-lg mb-4" style={{color:"var(--encre)"}}>{cat}</h2>
                      <div className="space-y-3">
                        {docs.map(doc => (
                          <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                            className="card p-4 flex items-center gap-4 hover:shadow-card transition-all group">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:"rgba(198,40,40,.1)"}}>
                              <FileText size={18} style={{color:"var(--error)"}}/>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-d font-bold text-sm group-hover:text-savane transition-colors" style={{color:"var(--encre)"}}>{doc.titre}</p>
                              <p className="text-xs mt-0.5" style={{color:"var(--brume)"}}>{formatDate(doc.createdAt)}</p>
                            </div>
                            <ExternalLink size={16} style={{color:"var(--savane)"}}/>
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="space-y-3">
                  {documents.map(doc => (
                    <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                      className="card p-4 flex items-center gap-4 hover:shadow-card transition-all group">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:"rgba(198,40,40,.1)"}}>
                        <FileText size={18} style={{color:"var(--error)"}}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-d font-bold text-sm group-hover:text-savane transition-colors" style={{color:"var(--encre)"}}>{doc.titre}</p>
                        <p className="text-xs mt-0.5" style={{color:"var(--brume)"}}>{formatDate(doc.createdAt)}</p>
                      </div>
                      <ExternalLink size={16} style={{color:"var(--savane)"}}/>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
