"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative" style={{ background:"linear-gradient(135deg,#E8F5E9,#FFF9C4)" }}>
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-15 blur-3xl" style={{ background:"var(--savane)" }} />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background:"var(--cauri)" }} />
      <div className="relative z-10 text-center max-w-lg mx-auto">
        <motion.div initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.6, ease:[.34,1.56,.64,1] }}>
          <div className="text-[8rem] sm:text-[11rem] font-d font-black leading-none grad-text-savane">404</div>
        </motion.div>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.2 }}>
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl mb-6" style={{ background:"linear-gradient(135deg,var(--savane),var(--cauri))", boxShadow:"var(--sh-savane)" }}>🔍</div>
          <h1 className="text-h2 mb-3 font-d" style={{ color:"var(--savane-d)" }}>Page introuvable</h1>
          <p className="text-sm mb-8" style={{ color:"var(--ardoise)" }}>Cette page n'existe pas ou a été déplacée.</p>
        </motion.div>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.4 }} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-savane"><Home size={18}/>Accueil</Link>
          <button onClick={() => window.history.back()} className="btn btn-outline-savane"><ArrowLeft size={18}/>Page précédente</button>
        </motion.div>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.6 }} className="mt-10">
          <p className="text-sm mb-3" style={{ color:"var(--brume)" }}>Liens utiles</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[["Formations","/academy/formations"],["Coworking","/espace/coworking"],["Dons","/soutenir/dons"],["Contact","/contact"]].map(([l,h])=>(
              <Link key={h} href={h} className="badge badge-savane hover:opacity-80 transition-opacity">{l}</Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
