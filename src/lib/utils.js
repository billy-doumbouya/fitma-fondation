// src/lib/utils.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...i) { return twMerge(clsx(i)) }

export function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim()
}

export function formatDate(date, options = {}) {
  return new Date(date).toLocaleDateString("fr-FR", { day:"numeric", month:"long", year:"numeric", ...options })
}

export function formatDateEn(date, options = {}) {
  return new Date(date).toLocaleDateString("en-US", { day:"numeric", month:"long", year:"numeric", ...options })
}

export function formatMontant(montant, devise = "GNF") {
  return `${Number(montant).toLocaleString("fr-FR")} ${devise}`
}

export function truncate(text, length) {
  return text?.length > length ? text.slice(0, length) + "…" : (text || "")
}

export function generateRef() {
  return `FITMA-${Date.now()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`
}

export function getInitials(nom, prenom) {
  return `${prenom?.[0] || ""}${nom?.[0] || ""}`.toUpperCase()
}

export function calcProgression(progressions = [], totalLecons = 0) {
  if (!totalLecons) return 0
  const done = progressions.filter(p => p.complete).length
  return Math.round((done / totalLecons) * 100)
}
