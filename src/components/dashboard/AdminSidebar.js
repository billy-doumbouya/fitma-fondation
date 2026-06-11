"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, Users, GraduationCap, Rocket, Building2, Calendar, FileCheck, Heart, Newspaper, Image as Img, FolderOpen, Mail, HelpCircle, Bot, LogOut, ChevronLeft, ChevronRight } from "lucide-react"

const ICONS = { LayoutDashboard, Users, GraduationCap, Rocket, Building2, Calendar, FileCheck, Heart, Newspaper, Image:Img, FolderOpen, Mail, HelpCircle, Bot }
const NAV = [
  { label:"Dashboard",     href:"/admin/dashboard",     icon:"LayoutDashboard" },
  { label:"Utilisateurs",  href:"/admin/utilisateurs",  icon:"Users" },
  { label:"Formations",    href:"/admin/formations",     icon:"GraduationCap" },
  { label:"Programmes",    href:"/admin/programmes",     icon:"Rocket" },
  { label:"Espaces",       href:"/admin/espaces",        icon:"Building2" },
  { label:"Réservations",  href:"/admin/reservations",   icon:"Calendar" },
  { label:"Candidatures",  href:"/admin/candidatures",   icon:"FileCheck" },
  { label:"Dons",          href:"/admin/dons",           icon:"Heart" },
  { label:"Actualités",    href:"/admin/actualites",     icon:"Newspaper" },
  { label:"Galerie",       href:"/admin/galerie",        icon:"Image" },
  { label:"Documents",     href:"/admin/documents",      icon:"FolderOpen" },
  { label:"Messages",      href:"/admin/messages",       icon:"Mail" },
  { label:"FAQ",           href:"/admin/faq",            icon:"HelpCircle" },
  { label:"Chatbot",       href:"/admin/chatbot",        icon:"Bot" },
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const isActive = (href) => href === "/admin/dashboard" ? pathname === href : pathname.startsWith(href)

  return (
    <motion.aside animate={{ width:collapsed?72:240 }} transition={{ duration:.3 }}
      className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 z-40"
      style={{ background:"#0F1B0F" }}>
      <div className="flex items-center gap-3 p-4 h-16" style={{ borderBottom:"1px solid rgba(255,255,255,.06)" }}>
        <div className="relative w-9 h-9 shrink-0">
          <Image src="/logo/fitma-logo-white.svg" alt="Fitma" fill className="object-contain"/>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span initial={{opacity:0,width:0}} animate={{opacity:1,width:"auto"}} exit={{opacity:0,width:0}}
              className="font-d font-black text-white text-sm whitespace-nowrap overflow-hidden">
              Admin Fitma
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, href, icon }) => {
          const Icon = ICONS[icon]
          const active = isActive(href)
          return (
            <Link key={href} href={href} title={collapsed?label:undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
              style={{ background:active?"var(--savane)":"transparent", color:active?"white":"rgba(255,255,255,.5)", boxShadow:active?"var(--sh-savane)":"none" }}>
              <Icon size={17} className="shrink-0"/>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span initial={{opacity:0,width:0}} animate={{opacity:1,width:"auto"}} exit={{opacity:0,width:0}}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden">{label}</motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>

      <div className="p-3 space-y-1" style={{ borderTop:"1px solid rgba(255,255,255,.06)" }}>
        <button onClick={() => signOut({ callbackUrl:"/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
          style={{ color:"rgba(255,255,255,.4)" }}>
          <LogOut size={17} className="shrink-0"/>
          <AnimatePresence>
            {!collapsed && <motion.span initial={{opacity:0,width:0}} animate={{opacity:1,width:"auto"}} exit={{opacity:0,width:0}} className="text-sm whitespace-nowrap overflow-hidden">Déconnexion</motion.span>}
          </AnimatePresence>
        </button>
        <button onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl" style={{ color:"rgba(255,255,255,.3)" }}>
          {collapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
        </button>
      </div>
    </motion.aside>
  )
}
