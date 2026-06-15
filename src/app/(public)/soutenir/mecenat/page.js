// src/app/(public)/soutenir/mecenat/page.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Compass,
  Scale,
  ArrowRight,
  Sparkles,
} from "lucide-react";

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
          id="adinkraMecenat"
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
      <rect width="240" height="240" fill="url(#adinkraMecenat)" />
    </svg>
  );
}

const ROLES = [
  {
    titre: "Formateur",
    Icone: GraduationCap,
    desc: "Animez une session de formation dans votre domaine d'expertise auprès de nos entrepreneurs.",
  },
  {
    titre: "Mentor",
    Icone: Compass,
    desc: "Accompagnez individuellement un entrepreneur incubé ou accéléré pendant 3 à 6 mois.",
  },
  {
    titre: "Jury",
    Icone: Scale,
    desc: "Participez à l'évaluation des candidatures et des pitch days de nos programmes.",
  },
];

export default function MecenatPage() {
  return (
    <main className="pt-20">
      {/* ---------------- HERO ---------------- */}
      <section className="py-24 section-savane text-center relative overflow-hidden">
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
        <div className="container-fitma relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border"
              style={{
                background: "rgba(249,168,37,.12)",
                borderColor: "rgba(249,168,37,.3)",
                color: "var(--cauri-l)",
                fontFamily: "var(--font-d)",
              }}
            >
              <Sparkles size={13} />
              Soutenir Fitma
            </span>
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
              <GraduationCap
                size={36}
                style={{ color: "var(--cauri-l)" }}
                strokeWidth={1.75}
              />
            </motion.div>
            <h1 className="text-h1 text-white mb-4 tracking-tight">
              Mécénat de Compétences
            </h1>
            <p className="text-white/75 max-w-xl mx-auto mb-8">
              Partagez votre expertise avec les entrepreneurs Fitma. Intervenez
              comme formateur, mentor ou jury lors de nos programmes.
            </p>
            <Link
              href="/contact"
              className="btn btn-cauri btn-lg inline-flex items-center gap-2 group"
            >
              Proposer mon expertise
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---------------- RÔLES ---------------- */}
      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {ROLES.map((r, i) => {
              const isSavane = i % 2 === 0;
              return (
                <motion.div
                  key={r.titre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="card p-6 text-center relative overflow-hidden"
                >
                  <div
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-[0.06] pointer-events-none"
                    style={{
                      background: isSavane ? "var(--savane)" : "var(--cauri-l)",
                    }}
                  />
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                    style={{
                      background: isSavane
                        ? "var(--savane-pale)"
                        : "rgba(249,168,37,.14)",
                    }}
                  >
                    <r.Icone
                      size={26}
                      strokeWidth={1.75}
                      style={{
                        color: isSavane ? "var(--savane)" : "var(--cauri-d)",
                      }}
                    />
                  </div>
                  <h3
                    className="font-d font-bold text-lg mb-2 relative z-10"
                    style={{ color: "var(--encre)" }}
                  >
                    {r.titre}
                  </h3>
                  <p
                    className="text-sm leading-relaxed relative z-10"
                    style={{ color: "var(--ardoise)" }}
                  >
                    {r.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
