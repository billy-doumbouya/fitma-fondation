// src/app/(public)/espace/showroom/page.js
"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { SectionTitle } from "@/components/ui"
export default function ShowroomPage() {
  const services = [
    { titre:"Fitma Pay", icone:"💳", desc:"Solution de paiement mobile adaptée à l'Afrique. Orange Money, MTN et cartes bancaires.", href:"https://fitma.africa" },
    { titre:"Fitma Academy", icone:"🎓", desc:"Plateforme de formations en ligne et présentiel pour les entrepreneurs africains.", href:"/academy/formations" },
    { titre:"Fitma Espace", icone:"🏢", desc:"Réseau d'espaces de coworking et bureaux dans les principales villes africaines.", href:"/espace" },
    { titre:"Fitma Connect", icone:"🌐", desc:"Mise en réseau des entrepreneurs et investisseurs de l'écosystème Fitma.", href:"https://fitma.africa" },
    { titre:"Fitma Invest", icone:"📈", desc:"Fonds d'investissement dédié aux startups africaines accompagnées par Fitma.", href:"https://fitma.africa" },
    { titre:"Agent Fitma", icone:"🤝", desc:"Devenez agent Fitma et proposez nos services de dépôt/retrait dans votre quartier.", href:"/contact" },
  ]
  return (
    <main className="pt-20">
      <section className="section section-nuit relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage:"url('/images/pattern-african.svg')",backgroundSize:"200px"}}/>
        <div className="container-fitma relative z-10 text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <span className="text-5xl mb-4 block">✨</span>
            <h1 className="text-h1 text-white mb-4">Showroom Fitma</h1>
            <p className="text-white/75 max-w-xl mx-auto">Découvrez l'ensemble de l'écosystème Fitma.africa — des solutions pensées pour l'Afrique, par l'Afrique.</p>
          </motion.div>
        </div>
      </section>
      <section className="section">
        <div className="container-fitma">
          <SectionTitle pretitle="L'Écosystème Fitma" title="Toutes Nos Solutions"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s,i) => (
              <motion.div key={s.titre} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}>
                <Link href={s.href} className="card card-hover p-8 block group text-center">
                  <span className="text-5xl mb-5 block">{s.icone}</span>
                  <h3 className="font-d font-bold text-xl mb-3 group-hover:text-savane transition-colors" style={{color:"var(--encre)"}}>{s.titre}</h3>
                  <p className="text-sm leading-relaxed" style={{color:"var(--ardoise)"}}>{s.desc}</p>
                  <span className="mt-4 inline-block text-xs font-semibold" style={{color:"var(--savane)"}}>En savoir plus →</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 rounded-3xl p-8 text-center section-savane">
            <h2 className="font-d font-bold text-2xl text-white mb-4">Devenez Agent Fitma</h2>
            <p className="text-white/75 mb-6 max-w-lg mx-auto">Rejoignez notre réseau d'agents et proposez les services Fitma dans votre communauté. Revenus complémentaires garantis.</p>
            <Link href="/contact" className="btn btn-cauri btn-lg">Je veux devenir agent</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
