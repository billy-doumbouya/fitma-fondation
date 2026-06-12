// src/app/(public)/soutenir/partenaire/page.js
"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { SectionTitle } from "@/components/ui"
export default function PartenairePage() {
  const avantages = [
    { titre:"Visibilité Premium", desc:"Logo sur le site, les événements et les supports de communication Fitma.", icone:"📢" },
    { titre:"Accès au Réseau", desc:"Connexion directe avec 2000+ entrepreneurs et professionnels de l'écosystème Fitma.", icone:"🌐" },
    { titre:"Talent Pipeline", desc:"Accès prioritaire aux lauréats de Fitma Academy pour vos recrutements.", icone:"🎯" },
    { titre:"Espaces Gratuits", desc:"Utilisation gratuite des salles de réunion pour vos événements internes.", icone:"🏢" },
    { titre:"Co-branding", desc:"Co-création de formations et programmes à votre image avec Fitma Academy.", icone:"🤝" },
    { titre:"Impact RSE", desc:"Contribuez à des objectifs RSE mesurables et documentés.", icone:"🌱" },
  ]
  return (
    <main className="pt-20">
      <section className="section section-nuit relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage:"url('/images/pattern-african.svg')",backgroundSize:"200px"}}/>
        <div className="container-fitma relative z-10 text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h1 className="text-h1 text-white mb-4">Devenir Partenaire</h1>
            <p className="text-white/75 max-w-xl mx-auto">Associez votre marque au développement numérique de l'Afrique. Rejoignez les entreprises et institutions qui font confiance à Fitma.</p>
          </motion.div>
        </div>
      </section>
      <section className="section">
        <div className="container-fitma">
          <SectionTitle pretitle="Avantages Partenaires" title="Ce Que Vous Gagnez"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {avantages.map((a,i) => (
              <motion.div key={a.titre} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}
                className="card p-6">
                <span className="text-4xl mb-4 block">{a.icone}</span>
                <h3 className="font-d font-bold text-base mb-2" style={{color:"var(--encre)"}}>{a.titre}</h3>
                <p className="text-sm" style={{color:"var(--ardoise)"}}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="card p-8 text-center" style={{background:"linear-gradient(135deg,var(--savane-pale),var(--cauri-pale))"}}>
            <h2 className="font-d font-bold text-2xl mb-4" style={{color:"var(--encre)"}}>Parlons de votre partenariat</h2>
            <p className="text-sm mb-6" style={{color:"var(--ardoise)"}}>Chaque partenariat est unique. Contactez-nous pour construire ensemble une collaboration sur mesure.</p>
            <Link href="/contact" className="btn btn-savane btn-lg">Nous contacter</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
