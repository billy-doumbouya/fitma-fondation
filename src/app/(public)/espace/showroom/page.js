// src/app/(public)/espace/showroom/page.js
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CreditCard,
  GraduationCap,
  Building2,
  Network,
  TrendingUp,
  Handshake,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { SectionTitle } from "@/components/ui";

/* Motif géométrique inline (Adinkra) — currentColor only */
function MotifAdinkra({ className, color = "#fff" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="adinkraShowroom"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 30 L30 0 L60 30 L30 60 Z"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="30" cy="30" r="3.5" fill={color} />
          <path d="M0 0 L8 0 L0 8 Z" fill={color} />
          <path d="M60 60 L52 60 L60 52 Z" fill={color} />
        </pattern>
      </defs>
      <rect width="240" height="240" fill="url(#adinkraShowroom)" />
    </svg>
  );
}

const SERVICES = [
  {
    titre: "Fitma Pay",
    Icone: CreditCard,
    accent: "savane",
    desc: "Solution de paiement mobile adaptée à l'Afrique. Orange Money, MTN et cartes bancaires.",
    href: "https://fitma.africa",
  },
  {
    titre: "Fitma Academy",
    Icone: GraduationCap,
    accent: "cauri",
    desc: "Plateforme de formations en ligne et présentiel pour les entrepreneurs africains.",
    href: "/academy/formations",
  },
  {
    titre: "Fitma Espace",
    Icone: Building2,
    accent: "savane",
    desc: "Réseau d'espaces de coworking et bureaux dans les principales villes africaines.",
    href: "/espace",
  },
  {
    titre: "Fitma Connect",
    Icone: Network,
    accent: "cauri",
    desc: "Mise en réseau des entrepreneurs et investisseurs de l'écosystème Fitma.",
    href: "https://fitma.africa",
  },
  {
    titre: "Fitma Invest",
    Icone: TrendingUp,
    accent: "savane",
    desc: "Fonds d'investissement dédié aux startups africaines accompagnées par Fitma.",
    href: "https://fitma.africa",
  },
  {
    titre: "Agent Fitma",
    Icone: Handshake,
    accent: "cauri",
    desc: "Devenez agent Fitma et proposez nos services de dépôt/retrait dans votre quartier.",
    href: "/contact",
  },
];

export default function ShowroomPage() {
  return (
    <main className="pt-20">
      {/* ---------------- HERO ---------------- */}
      <section className="section section-nuit relative overflow-hidden">
        <MotifAdinkra
          className="absolute -top-12 -right-12 w-72 h-72 opacity-[0.06] pointer-events-none"
          color="var(--cauri-l)"
        />
        <MotifAdinkra className="absolute -bottom-16 -left-16 w-64 h-64 opacity-[0.04] pointer-events-none rotate-45" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(249,168,37,.15) 0%, transparent 70%)",
          }}
        />
        <div className="container-fitma relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.55,
                type: "spring",
                bounce: 0.35,
              }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,168,37,.25), rgba(249,168,37,.05))",
                border: "1px solid rgba(249,168,37,.3)",
              }}
            >
              <Sparkles
                size={36}
                style={{ color: "var(--cauri-l)" }}
                strokeWidth={1.75}
              />
            </motion.div>
            <h1 className="text-h1 text-white mb-4 tracking-tight">
              Showroom Fitma
            </h1>
            <p className="text-white/75 max-w-xl mx-auto">
              Découvrez l'ensemble de l'écosystème Fitma.africa — des solutions
              pensées pour l'Afrique, par l'Afrique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="section">
        <div className="container-fitma">
          <SectionTitle
            pretitle="L'Écosystème Fitma"
            title="Toutes Nos Solutions"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => {
              const isSavane = s.accent === "savane";
              return (
                <motion.div
                  key={s.titre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={s.href}
                    className="card card-hover p-8 block group text-center relative overflow-hidden h-full"
                  >
                    <div
                      className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: isSavane
                          ? "var(--savane)"
                          : "var(--cauri-l)",
                      }}
                    />
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                      style={{
                        background: isSavane
                          ? "var(--savane-pale)"
                          : "rgba(249,168,37,.14)",
                      }}
                    >
                      <s.Icone
                        size={28}
                        strokeWidth={1.75}
                        style={{
                          color: isSavane ? "var(--savane)" : "var(--cauri-d)",
                        }}
                      />
                    </div>
                    <h3
                      className="font-d font-bold text-xl mb-3 group-hover:text-savane transition-colors"
                      style={{ color: "var(--encre)" }}
                    >
                      {s.titre}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--ardoise)" }}
                    >
                      {s.desc}
                    </p>
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5"
                      style={{ color: "var(--savane)" }}
                    >
                      En savoir plus
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ---------------- CTA AGENT ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 rounded-3xl p-8 text-center section-savane relative overflow-hidden"
          >
            <MotifAdinkra
              className="absolute -top-10 -right-10 w-56 h-56 opacity-[0.06] pointer-events-none"
              color="var(--cauri-l)"
            />
            <MotifAdinkra className="absolute -bottom-12 -left-12 w-48 h-48 opacity-[0.04] pointer-events-none rotate-45" />
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center relative z-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,168,37,.25), rgba(249,168,37,.05))",
                border: "1px solid rgba(249,168,37,.3)",
              }}
            >
              <Handshake
                size={28}
                style={{ color: "var(--cauri-l)" }}
                strokeWidth={1.75}
              />
            </div>
            <h2 className="font-d font-bold text-2xl text-white mb-4 relative z-10">
              Devenez Agent Fitma
            </h2>
            <p className="text-white/75 mb-6 max-w-lg mx-auto relative z-10">
              Rejoignez notre réseau d'agents et proposez les services Fitma
              dans votre communauté. Revenus complémentaires garantis.
            </p>
            <Link
              href="/contact"
              className="btn btn-cauri btn-lg inline-flex items-center gap-2 group relative z-10"
            >
              Je veux devenir agent
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
