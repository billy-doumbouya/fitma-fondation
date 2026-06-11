// src/app/(admin)/formations/page.js
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge, EmptyState } from "@/components/ui"
import { formatMontant } from "@/lib/utils"
export const metadata = { title:"Formations | Admin Fitma" }
const FMT = { EN_LIGNE:"En ligne", PRESENTIEL:"Présentiel", HYBRIDE:"Hybride" }
const NV  = { DEBUTANT:"Débutant", INTERMEDIAIRE:"Intermédiaire", AVANCE:"Avancé" }
export default async function AdminFormationsPage() {
  const formations = await prisma.formation.findMany({
    orderBy:{ createdAt:"desc" },
    include:{ _count:{ select:{ inscriptions:true, lecons:true } } },
  })
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-d font-black text-2xl" style={{color:"var(--encre)"}}>Formations</h1><p className="text-sm mt-1" style={{color:"var(--ardoise)"}}>{formations.length} formations</p></div>
        <Link href="/admin/formations/nouveau" className="btn btn-savane btn-md">+ Nouvelle formation</Link>
      </div>
      {formations.length === 0 ? <EmptyState icon="📚" title="Aucune formation" action={<Link href="/admin/formations/nouveau" className="btn btn-savane btn-md">Créer une formation</Link>}/> : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{background:"var(--sable)"}}>
                <tr>{["Titre","Catégorie","Format","Niveau","Prix","Inscrits","Leçons","Statut","Actions"].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{color:"var(--ardoise)",fontFamily:"var(--font-d)"}}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {formations.map((f,i) => (
                  <tr key={f.id} style={{borderBottom:"1px solid #F5F0E8",background:i%2===0?"white":"var(--sable)"}}>
                    <td className="px-4 py-3 font-semibold max-w-[200px] truncate" style={{color:"var(--encre)"}}>{f.titre}</td>
                    <td className="px-4 py-3" style={{color:"var(--ardoise)"}}>{f.categorie}</td>
                    <td className="px-4 py-3"><Badge variant="gris">{FMT[f.format]}</Badge></td>
                    <td className="px-4 py-3"><Badge variant="gris">{NV[f.niveau]}</Badge></td>
                    <td className="px-4 py-3" style={{color:"var(--ardoise)"}}>{f.gratuit?"Gratuit":formatMontant(f.prix)}</td>
                    <td className="px-4 py-3 text-center" style={{color:"var(--ardoise)"}}>{f._count.inscriptions}</td>
                    <td className="px-4 py-3 text-center" style={{color:"var(--ardoise)"}}>{f._count.lecons}</td>
                    <td className="px-4 py-3"><Badge variant={f.publie?"savane":"gris"}>{f.publie?"Publié":"Brouillon"}</Badge></td>
                    <td className="px-4 py-3"><Link href={`/admin/formations/${f.id}`} className="text-xs font-semibold" style={{color:"var(--savane)"}}>Modifier</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
