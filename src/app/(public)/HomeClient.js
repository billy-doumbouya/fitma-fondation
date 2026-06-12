"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Heart,
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Building2,
  CheckCircle,
} from "lucide-react";
import { SectionTitle, Badge } from "@/components/ui";
import {
  STATS,
  VALEURS,
  SERVICES_ACADEMY,
  SERVICES_ESPACE,
  LAUREATS_PLACEHOLDER,
} from "@/constants/placeholders";
import { formatDate, truncate, formatMontant } from "@/lib/utils";

export default function HomeClient({ formations, articles }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opY = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yVal = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  const itemV = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const contV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const NIVEAU_LABEL = {
    DEBUTANT: "Débutant",
    INTERMEDIAIRE: "Intermédiaire",
    AVANCE: "Avancé",
  };
  const FORMAT_LABEL = {
    EN_LIGNE: "En ligne",
    PRESENTIEL: "Présentiel",
    HYBRIDE: "Hybride",
  };

  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <Image
            src="/images/hero/hero-bg.jpg"
            alt="Fondation Fitma"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg,rgba(27,94,32,.92) 0%,rgba(26,35,126,.75) 60%,rgba(0,0,0,.5) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: "url('/images/pattern-african.svg')",
              backgroundSize: "250px",
            }}
          />
        </motion.div>

        {/* Décors */}
        <div
          className="absolute right-0 top-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "var(--cauri)" }}
        />
        <div
          className="absolute left-0 bottom-20 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "var(--savane-l)" }}
        />

        <motion.div
          className="container-fitma relative z-10 pt-24 pb-16"
          style={{ opacity: opY, y: yVal }}
        >
          <motion.div
            className="max-w-3xl"
            variants={contV}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemV}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
                style={{
                  background: "rgba(249,168,37,.2)",
                  border: "1px solid rgba(249,168,37,.4)",
                  color: "var(--cauri-l)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "var(--font-d)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Bâtir l'Afrique numérique, ensemble
              </span>
            </motion.div>

            <motion.h1 className="text-hero text-white mb-6" variants={itemV}>
              {"Empowerons la jeunesse africaine".split(" ").map((w, i) => (
                <span key={i}>
                  {i === 2 || i === 3 ? (
                    <span
                      style={{
                        background:
                          "linear-gradient(135deg,var(--cauri-l),var(--cauri))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {w}{" "}
                    </span>
                  ) : (
                    `${w} `
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl mb-10 max-w-2xl leading-relaxed"
              style={{ color: "rgba(255,255,255,.8)" }}
              variants={itemV}
            >
              Fitma Academy forme les entrepreneurs de demain. Fitma Espace les
              accueille. La Fondation les soutient.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemV}
            >
              <Link
                href="/academy/formations"
                className="btn btn-cauri btn-lg animate-pulse-g"
              >
                <GraduationCap size={20} />
                Découvrir nos formations
              </Link>
              <Link href="/espace" className="btn btn-outline-white btn-lg">
                <Building2 size={20} />
                Réserver un espace
              </Link>
            </motion.div>

            <motion.div
              className="mt-14 pt-8 grid grid-cols-3 gap-6 max-w-lg"
              variants={itemV}
              style={{ borderTop: "1px solid rgba(255,255,255,.15)" }}
            >
              {[
                ["2 000+", "Entrepreneurs formés"],
                ["50+", "Startups incubées"],
                ["3", "Villes (bientôt)"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p
                    className="font-d text-2xl sm:text-3xl font-black"
                    style={{ color: "var(--cauri-l)" }}
                  >
                    {v}
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-0.5"
                    style={{ color: "rgba(255,255,255,.65)" }}
                  >
                    {l}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white/40 text-xs tracking-widest uppercase font-d">
            Découvrir
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={20} className="text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="section section-savane">
        <div className="container-fitma">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-4xl mb-3 block">{s.icone}</span>
                <p
                  className="font-d text-3xl sm:text-4xl font-black mb-1"
                  style={{ color: "var(--cauri-l)" }}
                >
                  {s.valeur}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,.75)" }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACADEMY ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container-fitma">
          <SectionTitle
            pretitle="Fitma Academy"
            title="Apprenez, Grandissez, Réussissez"
            subtitle="Des programmes de formation adaptés au contexte africain, conçus par des experts pour les entrepreneurs de demain."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {SERVICES_ACADEMY.map((s, i) => (
              <motion.div
                key={s.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={s.href}
                  className="card card-hover p-6 block h-full"
                >
                  <span className="text-4xl mb-4 block">{s.icone}</span>
                  <h3
                    className="font-d font-bold text-base mb-2"
                    style={{ color: "var(--savane-d)" }}
                  >
                    {s.titre}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--ardoise)" }}
                  >
                    {s.description}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold"
                    style={{ color: "var(--savane)" }}
                  >
                    En savoir plus <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Formations vedettes */}
          {formations.length > 0 && (
            <>
              <h3
                className="font-d text-xl font-bold mb-6"
                style={{ color: "var(--encre)" }}
              >
                Formations populaires
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {formations.map((f, i) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={`/academy/formations/${f.slug}`}
                      className="card card-hover block group h-full"
                    >
                      <div className="relative h-40 overflow-hidden">
                        {f.imageUrl ? (
                          <Image
                            src={f.imageUrl}
                            alt={f.titre}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-5xl"
                            style={{ background: "var(--savane-pale)" }}
                          >
                            📚
                          </div>
                        )}
                        <div className="absolute top-2 left-2 flex gap-1">
                          <Badge variant={f.gratuit ? "savane" : "cauri"}>
                            {f.gratuit ? "Gratuit" : formatMontant(f.prix)}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex gap-1 mb-2">
                          <Badge variant="gris" className="text-[10px]">
                            {FORMAT_LABEL[f.format]}
                          </Badge>
                          <Badge variant="gris" className="text-[10px]">
                            {NIVEAU_LABEL[f.niveau]}
                          </Badge>
                        </div>
                        <h4
                          className="font-d font-bold text-sm mb-1"
                          style={{ color: "var(--encre)" }}
                        >
                          {f.titre}
                        </h4>
                        <p
                          className="text-xs"
                          style={{ color: "var(--ardoise)" }}
                        >
                          {f.duree}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: "var(--brume)" }}
                        >
                          {f._count.inscriptions} inscrits
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/academy/formations"
                  className="btn btn-savane btn-md"
                >
                  <GraduationCap size={18} />
                  Voir tout (Nos Formations)
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── ESPACE ────────────────────────────────────────────── */}
      <section className="section section-sable">
        <div className="container-fitma">
          <SectionTitle
            pretitle="Fitma Espace"
            title="Votre Bureau, Votre Succès"
            subtitle="Des espaces de travail modernes et inspirants à Conakry, conçus pour booster votre productivité."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES_ESPACE.map((s, i) => (
              <motion.div
                key={s.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={s.href}
                  className="card card-hover p-6 block h-full"
                >
                  <span className="text-4xl mb-4 block">{s.icone}</span>
                  <h3
                    className="font-d font-bold text-base mb-2"
                    style={{ color: "var(--nuit)" }}
                  >
                    {s.titre}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--ardoise)" }}
                  >
                    {s.description}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold"
                    style={{ color: "var(--savane)" }}
                  >
                    Réserver <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/espace" className="btn btn-nuit btn-md">
              <Building2 size={18} />
              Découvrir nos espaces
            </Link>
          </div>
        </div>
      </section>

      {/* ── VALEURS ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container-fitma">
          <SectionTitle pretitle="Nos Valeurs" title="Ce Qui Nous Guide" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {VALEURS.map((v, i) => (
              <motion.div
                key={v.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card p-6 text-center"
              >
                <span className="text-4xl mb-3 block">{v.icone}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* ── LAUREATS ──────────────────────────────────────────── */}
      <section className="section section-sable">
        <div className="container-fitma">
          <SectionTitle
            pretitle="Ils ont réussi"
            title="Nos Lauréats"
            subtitle="Des entrepreneurs qui ont fait confiance à Fitma pour transformer leurs idées en startups florissantes."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LAUREATS_PLACEHOLDER.map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center"
              >
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center font-d text-2xl font-black text-white"
                  style={{
                    background:
                      "linear-gradient(135deg,var(--savane),var(--cauri)",
                    boxShadow: "var(--sh-savane)",
                  }}
                >
                  {l.nom[0]}
                </div>
                <h3
                  className="font-d font-bold text-sm"
                  style={{ color: "var(--encre)" }}
                >
                  {l.nom}
                </h3>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "var(--savane)" }}
                >
                  {l.startup}
                </p>
                <Badge variant="gris" className="mb-3">
                  {l.promotion}
                </Badge>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--ardoise)" }}
                >
                  {l.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/academy/laureats"
              className="btn btn-outline-savane btn-md"
            >
              Voir tous les lauréats
            </Link>
          </div>
        </div>
      </section>

      {/* ── ACTUALITES ────────────────────────────────────────── */}
      {articles.length > 0 && (
        <section className="section">
          <div className="container-fitma">
            <div className="flex items-end justify-between mb-10">
              <SectionTitle
                pretitle="Blog"
                title="Dernières Actualités"
                align="left"
              />
              <Link
                href="/actualites"
                className="btn btn-outline-savane btn-sm hidden sm:inline-flex"
              >
                Tout voir →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {articles.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/actualites/${a.slug}`}
                    className="card card-hover block group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {a.imageUrl ? (
                        <Image
                          src={a.imageUrl}
                          alt={a.titre}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-4xl"
                          style={{ background: "var(--savane-pale)" }}
                        >
                          📰
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant={a.type === "COMMUNIQUE" ? "nuit" : "savane"}
                        >
                          {a.type === "COMMUNIQUE" ? "Communiqué" : "Article"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <p
                        className="text-xs mb-2"
                        style={{ color: "var(--brume)" }}
                      >
                        {formatDate(a.createdAt)}
                      </p>
                      <h3
                        className="font-d font-bold text-base mb-2"
                        style={{ color: "var(--encre)" }}
                      >
                        {a.titre}
                      </h3>
                      <p
                        className="text-xs"
                        style={{ color: "var(--ardoise)" }}
                      >
                        {truncate(a.extrait, 100)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA DON ───────────────────────────────────────────── */}
      <section className="section section-nuit relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url('/images/pattern-african.svg')",
            backgroundSize: "200px",
          }}
        />
        <div className="container-fitma relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl mb-6 block">🙏</span>
            <h2 className="text-h1 text-white mb-4">Soutenir la Fondation</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-base">
              Votre don contribue directement au développement des entrepreneurs
              africains.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/soutenir/dons"
                className="btn btn-cauri btn-lg animate-pulse-g"
              >
                <Heart size={18} />
                Faire un don maintenant
              </Link>
              <Link
                href="/soutenir/partenaire"
                className="btn btn-outline-white btn-lg"
              >
                Devenir partenaire
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
