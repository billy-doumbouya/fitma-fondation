// src/app/(public)/soutenir/mecenat/page.js
"use client"
import Link from "next/link"
export default function MecenatPage() {
  return (
    <main className="pt-20">
      <section className="py-24 section-savane text-center">
        <div className="container-fitma">
          <div className="text-6xl mb-6">🎓</div>
          <h1 className="text-h1 text-white mb-4">Mécénat de Compétences</h1>
          <p className="text-white/75 max-w-xl mx-auto mb-8">Partagez votre expertise avec les entrepreneurs Fitma. Intervenez comme formateur, mentor ou jury lors de nos programmes.</p>
          <Link href="/contact" className="btn btn-cauri btn-lg">Proposer mon expertise</Link>
        </div>
      </section>
      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { titre:"Formateur", icone:"📚", desc:"Animez une session de formation dans votre domaine d'expertise auprès de nos entrepreneurs." },
              { titre:"Mentor", icone:"🧭", desc:"Accompagnez individuellement un entrepreneur incubé ou accéléré pendant 3 à 6 mois." },
              { titre:"Jury", icone:"⚖️", desc:"Participez à l'évaluation des candidatures et des pitch days de nos programmes." },
            ].map(r => (
              <div key={r.titre} className="card p-6 text-center">
                <span className="text-4xl mb-4 block">{r.icone}</span>
                <h3 className="font-d font-bold text-lg mb-2" style={{color:"var(--encre)"}}>{r.titre}</h3>
                <p className="text-sm" style={{color:"var(--ardoise)"}}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
