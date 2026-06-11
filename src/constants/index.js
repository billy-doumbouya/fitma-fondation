// src/constants/index.js

export const LOCALES = ["fr", "en"]
export const DEFAULT_LOCALE = "fr"
export const SITE_URL = "https://www.fondationfitma.org"
export const SITE_NAME = "Fondation Fitma"

export const NAV_ACADEMY = [
  { label:"Formations",  href:"/academy/formations",  labelEn:"Training" },
  { label:"Incubation",  href:"/academy/incubation",  labelEn:"Incubation" },
  { label:"Accélération",href:"/academy/acceleration",labelEn:"Acceleration" },
  { label:"Lauréats",    href:"/academy/laureats",     labelEn:"Alumni" },
  { label:"Événements",  href:"/academy/evenements",   labelEn:"Events" },
]

export const NAV_ESPACE = [
  { label:"Nos espaces",         href:"/espace",           labelEn:"Our spaces" },
  { label:"Coworking",           href:"/espace/coworking",  labelEn:"Coworking" },
  { label:"Bureaux privés",      href:"/espace/bureaux",    labelEn:"Private offices" },
  { label:"Salles de réunion",   href:"/espace/salles",     labelEn:"Meeting rooms" },
  { label:"Showroom",            href:"/espace/showroom",   labelEn:"Showroom" },
]

export const NAV_SOUTENIR = [
  { label:"Faire un don",        href:"/soutenir/dons",      labelEn:"Donate" },
  { label:"Devenir partenaire",  href:"/soutenir/partenaire",labelEn:"Become a partner" },
  { label:"Mécénat",             href:"/soutenir/mecenat",   labelEn:"Skills patronage" },
]

export const ADMIN_NAV = [
  { label:"Dashboard",       href:"/admin/dashboard",      icon:"LayoutDashboard" },
  { label:"Utilisateurs",    href:"/admin/utilisateurs",   icon:"Users" },
  { label:"Formations",      href:"/admin/formations",     icon:"GraduationCap" },
  { label:"Programmes",      href:"/admin/programmes",     icon:"Rocket" },
  { label:"Espaces",         href:"/admin/espaces",        icon:"Building2" },
  { label:"Réservations",    href:"/admin/reservations",   icon:"Calendar" },
  { label:"Candidatures",    href:"/admin/candidatures",   icon:"FileCheck" },
  { label:"Dons",            href:"/admin/dons",           icon:"Heart" },
  { label:"Actualités",      href:"/admin/actualites",     icon:"Newspaper" },
  { label:"Galerie",         href:"/admin/galerie",        icon:"Image" },
  { label:"Documents",       href:"/admin/documents",      icon:"FolderOpen" },
  { label:"Messages",        href:"/admin/messages",       icon:"Mail" },
  { label:"FAQ",             href:"/admin/faq",            icon:"HelpCircle" },
  { label:"Chatbot",         href:"/admin/chatbot",        icon:"Bot" },
]

export const MEMBRE_NAV = [
  { label:"Mon dashboard",       href:"/membre/dashboard",          icon:"LayoutDashboard" },
  { label:"Mes formations",      href:"/membre/mes-formations",     icon:"GraduationCap" },
  { label:"Mes réservations",    href:"/membre/mes-reservations",   icon:"Calendar" },
  { label:"Mes candidatures",    href:"/membre/mes-candidatures",   icon:"FileCheck" },
  { label:"Mes dons",            href:"/membre/mes-dons",           icon:"Heart" },
  { label:"Mon profil",          href:"/membre/profil",             icon:"User" },
]

export const MONTANTS_DONS = [
  { valeur:10000,  label:"10 000 GNF",  desc:"Matériel pédagogique" },
  { valeur:50000,  label:"50 000 GNF",  desc:"Bourse partielle" },
  { valeur:100000, label:"100 000 GNF", desc:"Formation complète" },
  { valeur:500000, label:"500 000 GNF", desc:"Mois de coworking offert" },
]

export const CONTACT_DEFAULT = {
  telephone:     "+224 000 00 00 00",
  email:         "contact@fondationfitma.org",
  emailAcademy:  "academy@fondationfitma.org",
  emailEspace:   "espace@fondationfitma.org",
  adresse:       "Conakry, République de Guinée",
  whatsapp:      "+224 000 00 00 00",
  horaires:      "Lundi – Vendredi : 8h00 – 18h00",
  facebook:      "https://facebook.com/fondationfitma",
  linkedin:      "https://linkedin.com/company/fondationfitma",
  twitter:       "https://twitter.com/fondationfitma",
  instagram:     "https://instagram.com/fondationfitma",
}
