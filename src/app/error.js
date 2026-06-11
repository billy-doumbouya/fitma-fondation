"use client"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({ error, reset }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background:"var(--neige)" }}>
      <motion.div initial={{ opacity:0, scale:.9 }} animate={{ opacity:1, scale:1 }} className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl mb-6" style={{ background:"rgba(198,40,40,.1)" }}>⚠️</div>
        <h1 className="text-h2 mb-3 font-d" style={{ color:"var(--encre)" }}>Une erreur est survenue</h1>
        <p className="text-sm mb-6" style={{ color:"var(--ardoise)" }}>Une erreur inattendue s'est produite. Notre équipe a été notifiée.</p>
        {process.env.NODE_ENV === "development" && (
          <p className="text-xs font-mono p-3 rounded-xl mb-6 text-left break-all" style={{ background:"rgba(198,40,40,.08)", color:"var(--error)" }}>{error?.message}</p>
        )}
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn btn-savane"><RefreshCw size={18}/>Réessayer</button>
          <Link href="/" className="btn btn-outline-savane"><Home size={18}/>Accueil</Link>
        </div>
      </motion.div>
    </div>
  )
}
