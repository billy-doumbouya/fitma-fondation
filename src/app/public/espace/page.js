// src/app/(public)/espace/page.js
import Link from "next/link"
import { SERVICES_ESPACE } from "@/constants/placeholders"
import { SectionTitle } from "@/components/ui"

export const metadata = { title:"Fitma Espace — Coworking & Bureaux Conakry" }

export default function EspacePage() {
  return (
    <main className="pt-20">
      <section className="section section-nuit relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage:"url('/images/pattern-african.svg')",backgroundSize:"200px"}}/>
        <div className="container-fitma relative z-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full" style={{background:"rgba(249,168,37,.25)",color:"var(--cauri-l)",fontFamily:"var(--font-d)"}}>Conakry, Guinée</span>
          <h1 className="text-h1 text-white mb-4">Fitma Espace</h1>
          <p className="text-white/75 max-w-2xl mx-auto mb-8">
            Des espaces de travail modernes, connectés et inspirants. Rejoignez une communauté d'entrepreneurs et de professionnels au cœur de Conakry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/espace/coworking" className="btn btn-cauri btn-lg">Voir le coworking</Link>
            <Link href="/contact" className="btn btn-outline-white btn-lg">Planifier une visite</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-fitma">
          <SectionTitle pretitle="Nos Espaces" title="Choisissez Votre Espace" subtitle="Du poste en open space au bureau privatif, nous avons la solution adaptée à vos besoins."/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES_ESPACE.map((s,i) => (
              <Link key={s.href} href={s.href} className="card card-hover p-6 block text-center group">
                <span className="text-5xl mb-4 block">{s.icone}</span>
                <h3 className="font-d font-bold text-base mb-2 group-hover:text-savane transition-colors" style={{color:"var(--encre)"}}>{s.titre}</h3>
                <p className="text-xs leading-relaxed" style={{color:"var(--ardoise)"}}>{s.description}</p>
                <span className="mt-4 inline-block text-xs font-semibold" style={{color:"var(--savane)"}}>Découvrir →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Avantages */}
      <section className="section section-sable">
        <div className="container-fitma">
          <SectionTitle pretitle="Pourquoi Fitma Espace" title="Bien Plus qu'Un Bureau"/>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { icone:"⚡", titre:"WiFi Ultra-rapide", desc:"100 Mbps fibre dédiée" },
              { icone:"☕", titre:"Café & Thé", desc:"Offerts toute la journée" },
              { icone:"🔒", titre:"Sécurisé 24/7", desc:"Accès sécurisé" },
              { icone:"🤝", titre:"Communauté", desc:"Réseau d'entrepreneurs" },
              { icone:"📅", titre:"Salles de réunion", desc:"Sur réservation" },
              { icone:"🖨️", titre:"Impression", desc:"Imprimante & scanner" },
              { icone:"📦", titre:"Casiers", desc:"Stockage sécurisé" },
              { icone:"🎯", titre:"Événements", desc:"Networking mensuel" },
            ].map(a => (
              <div key={a.titre} className="card p-4 text-center">
                <span className="text-3xl mb-2 block">{a.icone}</span>
                <p className="font-d font-bold text-xs mb-1" style={{color:"var(--encre)"}}>{a.titre}</p>
                <p className="text-xs" style={{color:"var(--ardoise)"}}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
