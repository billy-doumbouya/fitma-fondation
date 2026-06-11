import { prisma } from "@/lib/prisma"
import { SectionTitle, Badge } from "@/components/ui"
import { LAUREATS_PLACEHOLDER } from "@/constants/placeholders"

export const metadata = { title:"Lauréats | Fitma Academy" }

export default async function LaureatsPage() {
  let laureats = []
  try { laureats = await prisma.laureats.findMany({ orderBy:{ promotion:"desc" } }) } catch {}
  const data = laureats.length > 0 ? laureats : LAUREATS_PLACEHOLDER

  return (
    <main className="pt-20">
      <section className="section section-savane">
        <div className="container-fitma text-center">
          <h1 className="text-h1 text-white mb-4">Nos Lauréats</h1>
          <p className="text-white/75 max-w-xl mx-auto">Des entrepreneurs qui ont fait confiance à Fitma pour transformer leurs idées en startups florissantes.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((l,i) => (
              <div key={l.id} className="card p-6 text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-d font-black text-white"
                  style={{background:"linear-gradient(135deg,var(--savane),var(--cauri))",boxShadow:"var(--sh-savane)"}}>
                  {l.nom[0]}
                </div>
                <h3 className="font-d font-bold text-base mb-1" style={{color:"var(--encre)"}}>{l.nom}</h3>
                <p className="text-sm font-semibold mb-2" style={{color:"var(--savane)"}}>{l.startup}</p>
                {l.promotion && <Badge variant="gris" className="mb-3">Promotion {l.promotion}</Badge>}
                <p className="text-xs leading-relaxed" style={{color:"var(--ardoise)"}}>{l.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
