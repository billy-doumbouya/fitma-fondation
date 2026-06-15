"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, GraduationCap, Calendar, FileCheck, Heart, User, LogOut, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { getInitials } from "@/lib/utils"

const ICONS = { LayoutDashboard, GraduationCap, Calendar, FileCheck, Heart, User }
const NAV = [
  { label:"Dashboard",        href:"/dashboard",        icon:"LayoutDashboard" },
  { label:"Mes formations",   href:"/mes-formations",   icon:"GraduationCap" },
  { label:"Mes réservations", href:"/mes-reservations", icon:"Calendar" },
  { label:"Mes candidatures", href:"/mes-candidatures", icon:"FileCheck" },
  { label:"Mes dons",         href:"/mes-dons",         icon:"Heart" },
  { label:"Mon profil",       href:"/profil",           icon:"User" },
]

export default function MembreSidebar({ user }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href) => href === "/dashboard" ? pathname === href : pathname.startsWith(href)

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 p-4 h-16" style={{ borderBottom:"1px solid rgba(255,255,255,.08)" }}>
        <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-d font-black text-sm text-white" style={{ background:"var(--savane)" }}>
          {getInitials(user?.name?.split(" ")[1]||"", user?.name?.split(" ")[0]||"")}
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{opacity:0,width:0}} animate={{opacity:1,width:"auto"}} exit={{opacity:0,width:0}} className="overflow-hidden">
              <p className="font-d font-bold text-white text-sm whitespace-nowrap truncate max-w-[130px]">{user?.name}</p>
              <p className="text-xs whitespace-nowrap" style={{color:"rgba(255,255,255,.5)"}}>Membre</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV.map(({ label, href, icon }) => {
          const Icon = ICONS[icon]
          const active = isActive(href)
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              title={collapsed ? label : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
              style={{ background:active?"var(--savane)":"transparent", color:active?"white":"rgba(255,255,255,.55)", boxShadow:active?"var(--sh-savane)":"none" }}>
              <Icon size={18} className="shrink-0"/>
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
      <div className="p-3 space-y-1" style={{ borderTop:"1px solid rgba(255,255,255,.08)" }}>
        <button onClick={() => signOut({ callbackUrl:"/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
          style={{ color:"rgba(255,255,255,.5)" }}>
          <LogOut size={18} className="shrink-0"/>
          <AnimatePresence>
            {!collapsed && <motion.span initial={{opacity:0,width:0}} animate={{opacity:1,width:"auto"}} exit={{opacity:0,width:0}} className="text-sm whitespace-nowrap overflow-hidden">Déconnexion</motion.span>}
          </AnimatePresence>
        </button>
        <button onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex w-full items-center justify-center p-2 rounded-xl transition-colors"
          style={{ color:"rgba(255,255,255,.4)" }}>
          {collapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 px-4" style={{ background:"var(--savane-d)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-d font-bold text-sm text-white" style={{ background:"var(--savane)" }}>{getInitials(user?.name?.split(" ")[1]||"",user?.name?.split(" ")[0]||"")}</div>
          <span className="font-d font-bold text-white text-sm">{user?.name}</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white"><Menu size={22}/></button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)}/>
            <motion.aside initial={{x:-280}} animate={{x:0}} exit={{x:-280}} transition={{duration:.3}} className="md:hidden fixed left-0 top-0 bottom-0 z-50 flex flex-col w-64" style={{ background:"var(--savane-d)" }}>
              <div className="flex items-center justify-between p-4 h-14" style={{ borderBottom:"1px solid rgba(255,255,255,.08)" }}>
                <span className="font-d font-bold text-white">Mon Espace</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/60"><X size={20}/></button>
              </div>
              <SidebarContent/>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside animate={{ width:collapsed?72:240 }} transition={{ duration:.3 }} className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 z-40" style={{ background:"var(--savane-d)" }}>
        <SidebarContent/>
      </motion.aside>
    </>
  )
}
