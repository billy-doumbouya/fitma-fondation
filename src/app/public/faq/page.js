// src/app/(public)/faq/page.js
import { prisma } from "@/lib/prisma"
export const metadata = { title:"FAQ | Fondation Fitma" }
export default async function FaqPage() {
  let faqs = []
  try { faqs = await prisma.faq.findMany({ orderBy:{ ordre:"asc" } }) } catch {}
  return (
    <main className="pt-20">
      <section className="section section-savane"><div className="container-fitma text-center"><h1 className="text-h1 text-white mb-4">Questions Fréquentes</h1></div></section>
      <section className="section"><div className="container-fitma max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((f,i) => (
            <details key={f.id} className="card p-5 group cursor-pointer">
              <summary className="font-d font-bold text-base list-none flex items-center justify-between" style={{color:"var(--encre)"}}>
                {f.question}<span className="text-xl" style={{color:"var(--savane)"}}>+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{color:"var(--ardoise)"}}>{f.reponse}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 card p-6 text-center">
          <p className="font-d font-bold text-lg mb-2" style={{color:"var(--encre)"}}>Vous ne trouvez pas votre réponse ?</p>
          <p className="text-sm mb-4" style={{color:"var(--ardoise)"}}>Notre équipe est disponible pour vous aider.</p>
          <a href="/contact" className="btn btn-savane btn-md">Nous contacter</a>
        </div>
      </div></section>
    </main>
  )
}
