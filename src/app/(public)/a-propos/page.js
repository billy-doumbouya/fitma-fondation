"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Target,
  Sparkles,
  Compass,
  Handshake,
  Sprout,
  HeartHandshake,
  Lightbulb,
  KeyRound,
  Star,
  ShieldCheck,
  Quote,
} from "lucide-react";
import { SectionTitle, Badge } from "@/components/ui";
import { EQUIPE, VALEURS, PARTENAIRES } from "@/constants/placeholders";
import { PartnerLogo } from "@/constants/logos";
import { useAnalytics } from "@/hooks";

/* ----------------------------------------------------------------
   Motif géométrique inline (Bogolan/Adinkra) — currentColor only,
   pour remplacer le pattern raster externe et garder un rendu net
   à toute densité d'écran.
----------------------------------------------------------------- */
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
          id="adinkraMotif"
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
      <rect width="240" height="240" fill="url(#adinkraMotif)" />
    </svg>
  );
}

const VALEUR_ICONS = {
  Impact: Sprout,
  Ubuntu: HeartHandshake,
  Innovation: Lightbulb,
  Accessibilité: KeyRound,
  Excellence: Star,
  Intégrité: ShieldCheck,
};

const PILIERS = [
  {
    titre: "Notre Mission",
    Icone: Target,
    accent: "var(--savane)",
    texte:
      "Démocratiser l'accès à la formation professionnelle, à l'incubation entrepreneuriale et aux espaces de travail de qualité pour la jeunesse africaine.",
  },
  {
    titre: "Notre Vision",
    Icone: Compass,
    accent: "var(--cauri-d)",
    texte:
      "Une Afrique où chaque entrepreneur a les compétences, le réseau et les ressources pour construire des solutions qui impactent positivement sa communauté.",
  },
  {
    titre: "Notre Approche",
    Icone: Handshake,
    accent: "var(--savane)",
    texte:
      "Pratique, inclusif et ancré dans les réalités locales. Nous croyons à l'apprentissage par l'action et au pouvoir de la communauté.",
  },
];

export default function AProposPage() {
  useAnalytics("/a-propos");
  return (
    <main className="pt-20">
      {/* ---------------- HERO ---------------- */}
      <section className="section section-savane relative overflow-hidden">
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
              Notre Identité
            </span>
            <h1 className="text-h1 text-white mb-4 tracking-tight">
              Qui Sommes-Nous ?
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-base leading-relaxed">
              La Fondation Fitma est le bras philanthropique de{" "}
              <strong className="text-white">Fitma.africa</strong>. Nous croyons
              que l'avenir de l'Afrique passe par la formation,
              l'entrepreneuriat et la technologie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------- MISSION & VISION ---------------- */}
      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                style={{
                  background: "var(--savane-pale)",
                  color: "var(--savane-d)",
                  fontFamily: "var(--font-d)",
                }}
              >
                Notre Histoire
              </span>
              <h2 className="text-h2 mb-5" style={{ color: "var(--encre)" }}>
                Nés d'une Vision pour l'Afrique
              </h2>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--ardoise)" }}
              >
                La Fondation Fitma a été créée avec la conviction que chaque
                jeune Africain mérite d'avoir accès aux outils, aux savoirs et
                aux espaces pour transformer ses idées en réalité. Nous sommes
                le pont entre l'ambition et l'accomplissement.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--ardoise)" }}
              >
                À travers <strong>Fitma Academy</strong>, nous formons les
                entrepreneurs de demain. Avec <strong>Fitma Espace</strong>,
                nous leur offrons un cadre de travail professionnel et
                stimulant. Et grâce aux <strong>dons et partenariats</strong>,
                nous rendons tout cela accessible au plus grand nombre.
              </p>

              {/* Mini repères chiffrés inline */}
              <div
                className="flex flex-wrap gap-6 mt-6 pt-6 border-t"
                style={{ borderColor: "var(--ligne)" }}
              >
                {[
                  { val: "3", label: "Piliers d'action" },
                  { val: "100%", label: "Ancré en Afrique" },
                  { val: "∞", label: "Ambition" },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      className="font-d font-extrabold text-2xl"
                      style={{ color: "var(--savane)" }}
                    >
                      {s.val}
                    </div>
                    <div className="text-xs" style={{ color: "var(--brume)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 rounded-3xl overflow-hidden"
              style={{ boxShadow: "var(--sh-lg)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                alt="Jeunes entrepreneurs africains collaborant dans un espace de travail"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top,rgba(46,125,50,.5),transparent)",
                }}
              />
              {/* Badge flottant signature */}
              <div
                className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,.12)",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
              >
                <Quote size={20} className="text-white/80 shrink-0" />
                <p className="text-white/90 text-xs leading-snug italic">
                  « Je suis parce que nous sommes » — l'esprit Ubuntu guide
                  chacune de nos actions.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mission / Vision / Approche */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PILIERS.map((item, i) => (
              <motion.div
                key={item.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="card p-8 relative overflow-hidden"
              >
                <div
                  className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-[0.06] pointer-events-none"
                  style={{ background: item.accent }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "var(--savane-pale)" }}
                >
                  <item.Icone
                    size={26}
                    strokeWidth={1.75}
                    style={{ color: item.accent }}
                  />
                </div>
                <h3
                  className="font-d font-bold text-lg mb-3"
                  style={{ color: "var(--savane-d)" }}
                >
                  {item.titre}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--ardoise)" }}
                >
                  {item.texte}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- VALEURS ---------------- */}
      <section className="section section-sable relative overflow-hidden">
        <MotifAdinkra
          className="absolute -bottom-20 -right-20 w-80 h-80 opacity-[0.05] pointer-events-none"
          color="var(--savane)"
        />
        <div className="container-fitma relative z-10">
          <SectionTitle
            pretitle="Ce Qui Nous Guide"
            title="Nos Valeurs Fondamentales"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {VALEURS.map((v, i) => {
              const Icone = VALEUR_ICONS[v.titre] || Sparkles;
              const isSavane = i % 2 === 0;
              return (
                <motion.div
                  key={v.titre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="card p-6 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: isSavane
                        ? "rgba(27,94,32,.1)"
                        : "rgba(249,168,37,.14)",
                    }}
                  >
                    <Icone
                      size={26}
                      strokeWidth={1.75}
                      style={{
                        color: isSavane ? "var(--savane)" : "var(--cauri-d)",
                      }}
                    />
                  </div>
                  <h3
                    className="font-d font-bold text-base mb-2"
                    style={{ color: "var(--savane-d)" }}
                  >
                    {v.titre}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--ardoise)" }}
                  >
                    {v.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- ÉQUIPE ---------------- */}
      <section className="section">
        <div className="container-fitma">
          <SectionTitle
            pretitle="Notre Équipe"
            title="Les Personnes Derrière Fitma"
            subtitle="Une équipe passionnée, engagée pour l'avenir de l'Afrique numérique."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPE.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="card p-6 text-center group"
              >
                <div className="relative mx-auto mb-4 h-28 w-28 rounded-full overflow-hidden border-4 border-white/15 shadow-[0_22px_60px_rgba(0,0,0,0.14)]">
                  <Image
                    src={m.image}
                    alt={m.nom}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  {/* Anneau accent au survol */}
                  <div
                    className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-offset-2 transition-all duration-300"
                    style={{
                      boxShadow: "0 0 0 0 var(--savane)",
                    }}
                  />
                </div>
                <h3
                  className="font-d font-bold text-base"
                  style={{ color: "var(--encre)" }}
                >
                  {m.nom}
                </h3>
                <p
                  className="text-xs font-semibold mb-3"
                  style={{ color: "var(--savane)" }}
                >
                  {m.poste}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--ardoise)" }}
                >
                  {m.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PARTENAIRES ---------------- */}
      <section className="section section-sable">
        <div className="container-fitma">
          <SectionTitle
            pretitle="Ils nous font confiance"
            title="Nos Partenaires"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {PARTENAIRES.map((p, i) => (
              <motion.div
                key={p.nom}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="card p-5 text-center"
              >
                <PartnerLogo logoKey={p.logoKey} label={p.nom} />
                <div className="mt-4">
                  <p
                    className="font-d font-semibold text-sm mb-2"
                    style={{ color: "var(--encre)" }}
                  >
                    {p.nom}
                  </p>
                  <Badge variant="gris" className="text-[9px]">
                    {p.type}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
