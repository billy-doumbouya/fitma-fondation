// src/app/(public)/soutenir/partenaire/page.js
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Megaphone,
  Network,
  Target,
  Building2,
  Handshake,
  Sprout,
  Briefcase,
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
          id="adinkraPartenaire"
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
      <rect width="240" height="240" fill="url(#adinkraPartenaire)" />
    </svg>
  );
}

const AVANTAGES = [
  {
    titre: "Visibilité Premium",
    desc: "Logo sur le site, les événements et les supports de communication Fitma.",
    Icone: Megaphone,
  },
  {
    titre: "Accès au Réseau",
    desc: "Connexion directe avec 2000+ entrepreneurs et professionnels de l'écosystème Fitma.",
    Icone: Network,
  },
  {
    titre: "Talent Pipeline",
    desc: "Accès prioritaire aux lauréats de Fitma Academy pour vos recrutements.",
    Icone: Target,
  },
  {
    titre: "Espaces Gratuits",
    desc: "Utilisation gratuite des salles de réunion pour vos événements internes.",
    Icone: Building2,
  },
  {
    titre: "Co-branding",
    desc: "Co-création de formations et programmes à votre image avec Fitma Academy.",
    Icone: Handshake,
  },
  {
    titre: "Impact RSE",
    desc: "Contribuez à des objectifs RSE mesurables et documentés.",
    Icone: Sprout,
  },
];

export default function PartenairePage() {
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
              <Briefcase
                size={36}
                style={{ color: "var(--cauri-l)" }}
                strokeWidth={1.75}
              />
            </motion.div>
            <h1 className="text-h1 text-white mb-4 tracking-tight">
              Devenir Partenaire
            </h1>
            <p className="text-white/75 max-w-xl mx-auto">
              Associez votre marque au développement numérique de l'Afrique.
              Rejoignez les entreprises et institutions qui font confiance à
              Fitma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------- AVANTAGES ---------------- */}
      <section className="section">
        <div className="container-fitma">
          <SectionTitle
            pretitle="Avantages Partenaires"
            title="Ce Que Vous Gagnez"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {AVANTAGES.map((a, i) => {
              const isSavane = i % 2 === 0;
              return (
                <motion.div
                  key={a.titre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="card p-6 relative overflow-hidden"
                >
                  <div
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-[0.06] pointer-events-none"
                    style={{
                      background: isSavane ? "var(--savane)" : "var(--cauri-l)",
                    }}
                  />
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                    style={{
                      background: isSavane
                        ? "var(--savane-pale)"
                        : "rgba(249,168,37,.14)",
                    }}
                  >
                    <a.Icone
                      size={26}
                      strokeWidth={1.75}
                      style={{
                        color: isSavane ? "var(--savane)" : "var(--cauri-d)",
                      }}
                    />
                  </div>
                  <h3
                    className="font-d font-bold text-base mb-2 relative z-10"
                    style={{ color: "var(--encre)" }}
                  >
                    {a.titre}
                  </h3>
                  <p
                    className="text-sm leading-relaxed relative z-10"
                    style={{ color: "var(--ardoise)" }}
                  >
                    {a.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ---------------- CTA ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card p-8 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,var(--savane-pale),var(--cauri-pale))",
            }}
          >
            <MotifAdinkra
              className="absolute -top-10 -right-10 w-56 h-56 opacity-[0.05] pointer-events-none"
              color="var(--savane)"
            />
            <MotifAdinkra
              className="absolute -bottom-12 -left-12 w-48 h-48 opacity-[0.04] pointer-events-none rotate-45"
              color="var(--cauri-d)"
            />
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center relative z-10"
              style={{ background: "white", boxShadow: "var(--sh-sm)" }}
            >
              <Handshake
                size={28}
                style={{ color: "var(--savane)" }}
                strokeWidth={1.75}
              />
            </div>
            <h2
              className="font-d font-bold text-2xl mb-4 relative z-10"
              style={{ color: "var(--encre)" }}
            >
              Parlons de votre partenariat
            </h2>
            <p
              className="text-sm mb-6 max-w-lg mx-auto relative z-10"
              style={{ color: "var(--ardoise)" }}
            >
              Chaque partenariat est unique. Contactez-nous pour construire
              ensemble une collaboration sur mesure.
            </p>
            <Link
              href="/contact"
              className="btn btn-savane btn-lg inline-flex items-center gap-2 group relative z-10"
            >
              Nous contacter
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
