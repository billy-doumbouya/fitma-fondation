import Link from "next/link"
import Image from "next/image"
import { Heart, Phone, Mail, MapPin, Linkedin, Twitter, Instagram, Facebook } from "lucide-react"
import { CONTACT_DEFAULT } from "@/constants"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background:"var(--encre)", color:"var(--sable)" }}>
      <div className="h-1" style={{ background:"linear-gradient(90deg,var(--savane),var(--cauri),var(--nuit))" }}/>
      <div className="container-fitma">
        <div className="py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12"><Image src="/logo/fitma-logo-white.svg" alt="Fondation Fitma" fill className="object-contain"/></div>
              <div>
                <span className="block font-d text-base font-black text-white leading-tight">Fondation Fitma</span>
                <span className="block text-xs tracking-widest uppercase" style={{ color:"var(--cauri-l)" }}>Bâtir l'Afrique Numérique</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5 opacity-70 max-w-xs">
              Le bras philanthropique de Fitma.africa. Nous formons, accompagnons et soutenons les entrepreneurs africains vers l'excellence.
            </p>
            <div className="flex gap-3">
              {[{ href:CONTACT_DEFAULT.facebook, Icon:Facebook },{ href:CONTACT_DEFAULT.linkedin, Icon:Linkedin },{ href:CONTACT_DEFAULT.twitter, Icon:Twitter },{ href:CONTACT_DEFAULT.instagram, Icon:Instagram }].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background:"rgba(255,255,255,.08)" }}
                  onMouseEnter={e => { e.currentTarget.style.background="var(--savane)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.08)"; }}>
                  <Icon size={16} style={{ color:"rgba(255,255,255,.7)" }}/>
                </a>
              ))}
            </div>
          </div>

          {/* Academy */}
          <div>
            <h3 className="font-d font-bold text-sm mb-4" style={{ color:"var(--cauri-l)" }}>Fitma Academy</h3>
            <ul className="space-y-2">
              {[["Formations","/academy/formations"],["Incubation","/academy/incubation"],["Accélération","/academy/acceleration"],["Lauréats","/academy/laureats"],["Événements","/academy/evenements"]].map(([l,h])=>(
                <li key={h}><Link href={h} className="text-sm opacity-70 hover:opacity-100 transition-opacity">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Espace */}
          <div>
            <h3 className="font-d font-bold text-sm mb-4" style={{ color:"var(--cauri-l)" }}>Fitma Espace</h3>
            <ul className="space-y-2">
              {[["Coworking","/espace/coworking"],["Bureaux privés","/espace/bureaux"],["Salles de réunion","/espace/salles"],["Showroom","/espace/showroom"],["Devenir agent","/espace"]].map(([l,h])=>(
                <li key={h}><Link href={h} className="text-sm opacity-70 hover:opacity-100 transition-opacity">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-d font-bold text-sm mb-4" style={{ color:"var(--cauri-l)" }}>Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm opacity-70"><MapPin size={14} className="mt-0.5 shrink-0" style={{ color:"var(--cauri)" }}/>{CONTACT_DEFAULT.adresse}</li>
              <li className="flex items-center gap-2 text-sm opacity-70"><Phone size={14} className="shrink-0" style={{ color:"var(--cauri)" }}/><a href={`tel:${CONTACT_DEFAULT.telephone}`}>{CONTACT_DEFAULT.telephone}</a></li>
              <li className="flex items-center gap-2 text-sm opacity-70"><Mail size={14} className="shrink-0" style={{ color:"var(--cauri)" }}/><a href={`mailto:${CONTACT_DEFAULT.email}`}>{CONTACT_DEFAULT.email}</a></li>
              <li className="text-xs opacity-50 mt-2">{CONTACT_DEFAULT.horaires}</li>
            </ul>
            <Link href="/soutenir/dons" className="mt-5 btn btn-cauri btn-sm">
              <Heart size={14}/>Soutenir
            </Link>
          </div>
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-40" style={{ borderTop:"1px solid rgba(255,255,255,.1)" }}>
          <p>© {year} Fondation Fitma. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:opacity-70">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:opacity-70">Confidentialité</Link>
          </div>
          <p className="flex items-center gap-1">Fait avec <Heart size={10} className="text-red-400"/> en Guinée</p>
        </div>
      </div>
    </footer>
  )
}
