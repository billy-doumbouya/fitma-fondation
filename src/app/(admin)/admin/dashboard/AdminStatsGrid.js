// src/app/(admin)/dashboard/AdminStatsGrid.jsx
"use client";
// ✅ Les icônes Lucide vivent ici — jamais passées en prop depuis le serveur

import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  Building2,
  Heart,
  Mail,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const CARDS = [
  {
    key: "totalUsers",
    Icon: Users,
    label: "Membres",
    accent: "#1A237E",
    bg: "rgba(26,35,126,.1)",
    href: "/admin/utilisateurs",
  },
  {
    key: "totalFormations",
    Icon: GraduationCap,
    label: "Formations",
    accent: "#1B5E20",
    bg: "rgba(27,94,32,.1)",
    href: "/admin/formations",
  },
  {
    key: "totalInscriptions",
    Icon: GraduationCap,
    label: "Inscrits",
    accent: "#388E3C",
    bg: "rgba(56,142,60,.1)",
    href: "/admin/formations",
  },
  {
    key: "totalReservations",
    Icon: Building2,
    label: "Réservations",
    accent: "#7a5000",
    bg: "rgba(249,168,37,.12)",
    href: "/admin/reservations",
  },
  {
    key: "totalCandidatures",
    Icon: FileCheck,
    label: "Candidatures",
    accent: "#1A237E",
    bg: "rgba(26,35,126,.1)",
    href: "/admin/candidatures",
    sub: "à traiter",
  },
  {
    key: "messagesNonLus",
    Icon: Mail,
    label: "Messages",
    accent: "#7a5000",
    bg: "rgba(249,168,37,.12)",
    href: "/admin/messages",
    sub: "non lus",
  },
];

export default function AdminStatsGrid({ stats }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 14,
      }}
    >
      {CARDS.map(({ key, Icon, label, accent, bg, href, sub }, i) => (
        <motion.a
          key={key}
          href={href}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.07,
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ y: -4 }}
          style={{
            display: "block",
            textDecoration: "none",
            borderRadius: 18,
            padding: "18px 16px",
            background: "#fff",
            border: "1.5px solid rgba(0,0,0,.07)",
            boxShadow: "0 2px 12px rgba(0,0,0,.05)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Blob déco */}
          <div
            style={{
              position: "absolute",
              top: -18,
              right: -18,
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: bg,
              opacity: 0.7,
              pointerEvents: "none",
            }}
          />
          {/* Icon */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              marginBottom: 12,
              background: bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={17} style={{ color: accent }} />
          </div>
          {/* Value */}
          <p
            style={{
              fontFamily: "var(--font-d)",
              fontWeight: 900,
              fontSize: "1.5rem",
              color: "var(--encre,#1A237E)",
              lineHeight: 1,
              marginBottom: 4,
            }}
          >
            {stats[key]}
          </p>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--ardoise,#546E7A)",
            }}
          >
            {label}
          </p>
          {sub && (
            <p
              style={{
                fontSize: 11,
                color: "var(--brume,#90A4AE)",
                marginTop: 1,
              }}
            >
              {sub}
            </p>
          )}
        </motion.a>
      ))}
    </div>
  );
}
