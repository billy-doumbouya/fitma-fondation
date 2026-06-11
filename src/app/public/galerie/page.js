// src/app/(public)/galerie/page.js
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { EmptyState } from "@/components/ui"
export const metadata = { title:"Galerie | Fondation Fitma" }
export default async function GaleriePage() {
  let images = []
  try { images = await prisma.imageGalerie.findMany({ orderBy:{ ordre:"asc" } }) } catch {}
  return (
    <main className="pt-20">
      <section className="section section-savane"><div className="container-fitma text-center"><h1 className="text-h1 text-white mb-4">Galerie Photos</h1><p className="text-white/75 max-w-xl mx-auto">Moments forts des activités, formations et événements de la Fondation Fitma.</p></div></section>
      <section className="section"><div className="container-fitma">
        {images.length === 0 ? <EmptyState icon="📷" title="Galerie en cours de construction" description="Les photos seront bientôt disponibles."/> : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map(img => (
              <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden" style={{boxShadow:"var(--sh-sm)"}}>
                <Image src={img.url} alt={img.legende||"Fitma"} width={400} height={300} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"/>
                {img.legende && <p className="text-xs p-2 text-center" style={{color:"var(--ardoise)"}}>{img.legende}</p>}
              </div>
            ))}
          </div>
        )}
      </div></section>
    </main>
  )
}
