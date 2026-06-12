// src/app/(public)/soutenir/dons/succes/page.js
"use client"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Home, Heart } from "lucide-react"

export default function DonsSuccesPage() {
  const searchParams = useSearchParams()
  const ref = searchParams.get("ref")
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:"linear-gradient(135deg,var(--savane-pale),var(--cauri-pale))"}}>
      <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6" style={{background:"var(--savane-pale)",boxShadow:"var(--sh-savane)"}}>
          <CheckCircle size={48} style={{color:"var(--savane)"}}/>
        </div>
        <h1 className="font-d font-black text-3xl mb-3" style={{color:"var(--encre)"}}>Merci pour votre don !</h1>
        <p className="text-sm mb-2" style={{color:"var(--ardoise)"}}>Votre générosité contribue directement au développement des entrepreneurs africains.</p>
        {ref && <p className="text-xs font-mono mb-6 p-2 rounded-lg" style={{background:"white",color:"var(--ardoise)"}}>Référence : {ref}</p>}
        <p className="text-xs mb-8" style={{color:"var(--brume)"}}>Un reçu vous a été envoyé par email.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-savane btn-lg"><Home size={18}/>Retour à l'accueil</Link>
          <Link href="/soutenir/dons" className="btn btn-outline-savane btn-lg"><Heart size={18}/>Faire un autre don</Link>
        </div>
      </motion.div>
    </div>
  )
}
