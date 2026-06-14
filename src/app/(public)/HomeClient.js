"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import {
  Heart,
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Building2,
  CheckCircle,
  Sparkles,
  Users,
  Trophy,
  MapPin,
  BookOpen,
  Wifi,
  Coffee,
  Monitor,
  Zap,
  Globe,
  Shield,
  Star,
  Quote,
} from "lucide-react";
import { SectionTitle, Badge } from "@/components/ui";
import {
  STATS,
  VALEURS,
  SERVICES_ACADEMY,
  SERVICES_ESPACE,
  LAUREATS_PLACEHOLDER,
} from "@/constants/placeholders";
import { StatsIcon } from "@/constants/logos";
import { formatDate, truncate, formatMontant } from "@/lib/utils";

/* ─── Animated counter ─────────────────────────────────────── */
function Counter({ from = 0, to, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [inView]);
  return (
    <span ref={ref}>
      {from}
      {suffix}
    </span>
  );
}

/* ─── African geometric SVG pattern ────────────────────────── */
function AfricanPattern({ opacity = 0.06 }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <pattern
          id="afro"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="80" height="80" fill="none" />
          {/* Diamond */}
          <polygon
            points="40,4 76,40 40,76 4,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Inner cross */}
          <line
            x1="40"
            y1="4"
            x2="40"
            y2="76"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          <line
            x1="4"
            y1="40"
            x2="76"
            y2="40"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          {/* Corner dots */}
          <circle cx="0" cy="0" r="2.5" fill="currentColor" />
          <circle cx="80" cy="0" r="2.5" fill="currentColor" />
          <circle cx="0" cy="80" r="2.5" fill="currentColor" />
          <circle cx="80" cy="80" r="2.5" fill="currentColor" />
          {/* Small inner diamond */}
          <polygon
            points="40,22 58,40 40,58 22,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#afro)" />
    </svg>
  );
}

/* ─── Fitma logo SVG custom ─────────────────────────────────── */
function FitmaLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-label="Fitma logo"
    >
      <circle cx="24" cy="24" r="24" fill="url(#logoGrad)" />
      <defs>
        <linearGradient
          id="logoGrad"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1B5E20" />
          <stop offset="1" stopColor="#1a237e" />
        </linearGradient>
      </defs>
      {/* Stylized F made of African kente lines */}
      <rect x="13" y="13" width="4" height="22" rx="2" fill="#F9A825" />
      <rect x="13" y="13" width="16" height="4" rx="2" fill="#F9A825" />
      <rect
        x="13"
        y="22"
        width="12"
        height="3.5"
        rx="1.75"
        fill="rgba(249,168,37,0.6)"
      />
      {/* Star accent */}
      <circle cx="34" cy="34" r="5" fill="#F9A825" opacity="0.9" />
      <polygon
        points="34,30 35.2,32.8 38.2,32.8 35.9,34.7 36.8,37.6 34,35.9 31.2,37.6 32.1,34.7 29.8,32.8 32.8,32.8"
        fill="#1B5E20"
      />
    </svg>
  );
}

/* ─── Hexagon badge SVG ─────────────────────────────────────── */
function HexBadge({ children, color = "#F9A825" }) {
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: 64, height: 64 }}
    >
      <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
        <polygon
          points="32,2 58,17 58,47 32,62 6,47 6,17"
          fill={color}
          opacity="0.15"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
      <span className="relative text-2xl">{children}</span>
    </div>
  );
}

/* ─── Section divider wave ──────────────────────────────────── */
function WaveDivider({ flip = false, fill = "#f9f6f0" }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none" }}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%" }}
      >
        <path
          d="M0 0L48 8.7C96 17.3 192 34.7 288 40C384 45.3 480 38.7 576 30.7C672 22.7 768 13.3 864 13.3C960 13.3 1056 22.7 1152 28C1248 33.3 1344 34.7 1392 35.3L1440 36V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0V0Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ─── Card hover glow wrapper ───────────────────────────────── */
function GlowCard({ children, className = "", style = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={className}
      style={{
        borderRadius: 20,
        background: "#fff",
        border: "1.5px solid rgba(27,94,32,0.1)",
        boxShadow: "0 4px 24px rgba(27,94,32,0.06)",
        transition: "box-shadow 0.25s ease",
        ...style,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 12px 48px rgba(27,94,32,0.14)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 24px rgba(27,94,32,0.06)")
      }
    >
      {children}
    </motion.div>
  );
}

/* ─── NIVEAU / FORMAT labels ────────────────────────────────── */
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

const FORMAT_ICON = { EN_LIGNE: Wifi, PRESENTIEL: Users, HYBRIDE: Globe };

/* ════════════════════════════════════════════════════════════ */
export default function HomeClient({ formations = [], articles = [] }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opY = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yVal = useTransform(scrollYProgress, [0, 0.7], [0, -60]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <main
      style={{
        fontFamily: "var(--font-body, system-ui, sans-serif)",
        overflowX: "hidden",
      }}
    >
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* BG image + parallax */}
        <motion.div
          style={{
            y: bgY,
            scale: scaleHero,
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1800&q=85"
            alt="Jeunes entrepreneurs africains"
            fill
            className="object-cover"
            priority
            quality={92}
          />
          {/* Multi-layer gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg,rgba(13,60,16,.96) 0%,rgba(18,26,100,.82) 55%,rgba(0,0,0,.45) 100%)",
            }}
          />
          {/* African geo pattern */}
          <AfricanPattern opacity={0.08} />
          {/* Diagonal light streak */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "10%",
              width: 600,
              height: 600,
              background:
                "radial-gradient(ellipse at center,rgba(249,168,37,.18) 0%,transparent 70%)",
              transform: "rotate(-25deg)",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            right: -100,
            top: "15%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(249,168,37,.12),transparent 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -80,
            bottom: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(76,175,80,.1),transparent 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <motion.div
          className="container-fitma"
          style={{
            position: "relative",
            zIndex: 10,
            paddingTop: 120,
            paddingBottom: 80,
            opacity: opY,
            y: yVal,
          }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: 780 }}
          >
            {/* Eyebrow pill */}
            <motion.div variants={fadeUp}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 18px",
                  borderRadius: 100,
                  background: "rgba(249,168,37,.12)",
                  border: "1px solid rgba(249,168,37,.35)",
                  backdropFilter: "blur(12px)",
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#4CAF50",
                    boxShadow: "0 0 0 3px rgba(76,175,80,.3)",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    color: "#FFD54F",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-d)",
                  }}
                >
                  Bâtir l'Afrique numérique, ensemble
                </span>
              </div>
            </motion.div>

            {/* H1 with gradient words */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: 24,
                fontFamily: "var(--font-d)",
              }}
            >
              {"Empowerons la ".split("").join("")}
              <span style={{ color: "#fff" }}>Empowerons la </span>
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FFD54F 0%, #F9A825 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                jeunesse{" "}
              </span>
              <span style={{ color: "#fff" }}>africaine</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,.78)",
                marginBottom: 40,
                maxWidth: 620,
              }}
            >
              Fitma Academy forme les entrepreneurs de demain.{" "}
              <strong
                style={{ color: "rgba(255,255,255,.95)", fontWeight: 600 }}
              >
                Fitma Espace
              </strong>{" "}
              les accueille.{" "}
              <strong
                style={{ color: "rgba(255,255,255,.95)", fontWeight: 600 }}
              >
                La Fondation
              </strong>{" "}
              les soutient.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexWrap: "wrap", gap: 14 }}
            >
              <Link
                href="/academy/formations"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 32px",
                  borderRadius: 100,
                  background: "linear-gradient(135deg,#F9A825,#FFD54F)",
                  color: "#1B3A00",
                  fontWeight: 800,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(249,168,37,.4)",
                  fontFamily: "var(--font-d)",
                  letterSpacing: "0.01em",
                  transition: "transform .2s,box-shadow .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(249,168,37,.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(249,168,37,.4)";
                }}
              >
                <GraduationCap size={20} />
                Découvrir nos formations
              </Link>
              <Link
                href="/espace"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 32px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,.1)",
                  border: "1.5px solid rgba(255,255,255,.35)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                  backdropFilter: "blur(12px)",
                  fontFamily: "var(--font-d)",
                  transition: "background .2s,border-color .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,.18)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.35)";
                }}
              >
                <Building2 size={20} />
                Réserver un espace
              </Link>
            </motion.div>

            {/* Micro-stats */}
            <motion.div
              variants={fadeUp}
              style={{
                marginTop: 56,
                paddingTop: 32,
                borderTop: "1px solid rgba(255,255,255,.12)",
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 24,
                maxWidth: 480,
              }}
            >
              {[
                { v: 2000, suf: "+", l: "Entrepreneurs formés" },
                { v: 50, suf: "+", l: "Startups incubées" },
                { v: 3, suf: "", l: "Villes (bientôt)" },
              ].map(({ v, suf, l }) => (
                <div key={l}>
                  <p
                    style={{
                      fontFamily: "var(--font-d)",
                      fontSize: "clamp(1.6rem,3vw,2.2rem)",
                      fontWeight: 900,
                      color: "#FFD54F",
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    <Counter to={v} suffix={suf} />
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,.6)",
                      lineHeight: 1.4,
                    }}
                  >
                    {l}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,.35)",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "var(--font-d)",
            }}
          >
            Découvrir
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={18} style={{ color: "rgba(255,255,255,.35)" }} />
          </motion.div>
        </motion.div>

        {/* Bottom clip divider */}
        <div
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            right: 0,
            zIndex: 11,
            lineHeight: 0,
          }}
        >
          <svg
            viewBox="0 0 1440 64"
            fill="none"
            style={{ display: "block", width: "100%" }}
          >
            <path
              d="M0 64L720 0L1440 64V64H0V64Z"
              fill="var(--savane-pale,#f1f8e9)"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--savane-pale,#f1f8e9)",
          padding: "72px 0 80px",
        }}
      >
        <div className="container-fitma">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 24,
            }}
          >
            {(
              STATS || [
                {
                  iconKey: "entrepreneurs",
                  valeur: "2 000+",
                  label: "Entrepreneurs formés",
                },
                {
                  iconKey: "startups",
                  valeur: "50+",
                  label: "Startups incubées",
                },
                {
                  iconKey: "satisfaction",
                  valeur: "95%",
                  label: "Taux de satisfaction",
                },
                {
                  iconKey: "donations",
                  valeur: "12M+",
                  label: "GNF de dons collectés",
                },
              ]
            ).map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "32px 24px",
                  textAlign: "center",
                  border: "1.5px solid rgba(27,94,32,.08)",
                  boxShadow: "0 2px 16px rgba(27,94,32,.06)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Geo accent top-right */}
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(249,168,37,.08)",
                  }}
                />
                <HexBadge>
                  <StatsIcon iconKey={s.iconKey} size={24} />
                </HexBadge>
                <p
                  style={{
                    fontFamily: "var(--font-d)",
                    fontSize: "2.2rem",
                    fontWeight: 900,
                    color: "var(--savane-d,#1B5E20)",
                    lineHeight: 1,
                    margin: "12px 0 6px",
                  }}
                >
                  {s.valeur}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--ardoise,#546E7A)",
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ACADEMY
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "100px 0" }}>
        <div className="container-fitma">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 60, textAlign: "center" }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "5px 16px",
                borderRadius: 100,
                background: "rgba(27,94,32,.08)",
                color: "var(--savane-d,#1B5E20)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
                fontFamily: "var(--font-d)",
              }}
            >
              Fitma Academy
            </span>
            <h2
              style={{
                fontFamily: "var(--font-d)",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                color: "var(--encre,#1A237E)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              Apprenez, Grandissez,{" "}
              <span style={{ color: "var(--savane-d,#1B5E20)" }}>
                Réussissez
              </span>
            </h2>
            <p
              style={{
                color: "var(--ardoise,#546E7A)",
                fontSize: 16,
                lineHeight: 1.7,
                maxWidth: 580,
                margin: "0 auto",
              }}
            >
              Des programmes adaptés au contexte africain, conçus par des
              experts pour les entrepreneurs de demain.
            </p>
          </motion.div>

          {/* Services academy grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
              marginBottom: 64,
            }}
          >
            {(
              SERVICES_ACADEMY || [
                {
                  icone: "💼",
                  titre: "Entrepreneuriat",
                  description: "Créer et développer votre entreprise.",
                  href: "/academy/entrepreneuriat",
                },
                {
                  icone: "💻",
                  titre: "Digital & Tech",
                  description: "Maîtrisez les outils du numérique.",
                  href: "/academy/digital",
                },
                {
                  icone: "📊",
                  titre: "Finance & Gestion",
                  description: "Gérer vos ressources intelligemment.",
                  href: "/academy/finance",
                },
                {
                  icone: "🎯",
                  titre: "Leadership",
                  description: "Développez votre posture de leader.",
                  href: "/academy/leadership",
                },
              ]
            ).map((s, i) => (
              <GlowCard key={s.titre} delay={i * 0.1}>
                <Link
                  href={s.href}
                  style={{
                    display: "block",
                    padding: 28,
                    textDecoration: "none",
                    height: "100%",
                  }}
                >
                  {/* Icon with hex bg */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      marginBottom: 18,
                      background:
                        "linear-gradient(135deg,rgba(27,94,32,.08),rgba(249,168,37,.08))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                    }}
                  >
                    {s.icone}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-d)",
                      fontWeight: 800,
                      fontSize: 16,
                      color: "var(--savane-d,#1B5E20)",
                      marginBottom: 8,
                    }}
                  >
                    {s.titre}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--ardoise,#546E7A)",
                      lineHeight: 1.6,
                      marginBottom: 16,
                    }}
                  >
                    {s.description}
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--savane,#388E3C)",
                      fontFamily: "var(--font-d)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    En savoir plus <ArrowRight size={13} />
                  </span>
                </Link>
              </GlowCard>
            ))}
          </div>

          {/* Formations populaires */}
          {formations.length > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 28,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-d)",
                    fontWeight: 900,
                    fontSize: "1.4rem",
                    color: "var(--encre,#1A237E)",
                  }}
                >
                  Formations populaires
                </h3>
                <Link
                  href="/academy/formations"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--savane,#388E3C)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  Voir toutes <ArrowRight size={14} />
                </Link>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                  gap: 22,
                }}
              >
                {formations.map((f, i) => (
                  <GlowCard
                    key={f.id}
                    delay={i * 0.08}
                    style={{ overflow: "hidden" }}
                  >
                    <Link
                      href={`/academy/formations/${f.slug}`}
                      style={{ display: "block", textDecoration: "none" }}
                    >
                      {/* Thumbnail */}
                      <div
                        style={{
                          position: "relative",
                          height: 164,
                          overflow: "hidden",
                          borderRadius: "18px 18px 0 0",
                        }}
                      >
                        {f.imageUrl ? (
                          <Image
                            src={f.imageUrl}
                            alt={f.titre}
                            fill
                            style={{
                              objectFit: "cover",
                              transition: "transform .5s",
                            }}
                            className="group-hover:scale-105"
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              background:
                                "linear-gradient(135deg,#E8F5E9,#FFF8E1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 48,
                            }}
                          >
                            📚
                          </div>
                        )}
                        {/* Price badge */}
                        <div
                          style={{ position: "absolute", top: 12, left: 12 }}
                        >
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: 100,
                              background: f.gratuit ? "#1B5E20" : "#F9A825",
                              color: f.gratuit ? "#fff" : "#1B3A00",
                              fontSize: 11,
                              fontWeight: 800,
                              fontFamily: "var(--font-d)",
                            }}
                          >
                            {f.gratuit ? "Gratuit" : formatMontant(f.prix)}
                          </span>
                        </div>
                        {/* Format icon overlay */}
                        <div
                          style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            background: "rgba(255,255,255,.85)",
                            backdropFilter: "blur(8px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {(() => {
                            const Icon = FORMAT_ICON[f.format] || Globe;
                            return (
                              <Icon size={14} style={{ color: "#1B5E20" }} />
                            );
                          })()}
                        </div>
                      </div>

                      <div style={{ padding: "18px 20px 20px" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            marginBottom: 10,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              padding: "3px 8px",
                              borderRadius: 6,
                              background: "rgba(27,94,32,.07)",
                              color: "var(--savane-d,#1B5E20)",
                              fontSize: 10,
                              fontWeight: 700,
                              fontFamily: "var(--font-d)",
                            }}
                          >
                            {FORMAT_LABEL[f.format]}
                          </span>
                          <span
                            style={{
                              padding: "3px 8px",
                              borderRadius: 6,
                              background: "rgba(249,168,37,.1)",
                              color: "#7a5000",
                              fontSize: 10,
                              fontWeight: 700,
                              fontFamily: "var(--font-d)",
                            }}
                          >
                            {NIVEAU_LABEL[f.niveau]}
                          </span>
                        </div>
                        <h4
                          style={{
                            fontFamily: "var(--font-d)",
                            fontWeight: 800,
                            fontSize: 14,
                            color: "var(--encre,#1A237E)",
                            marginBottom: 6,
                            lineHeight: 1.35,
                          }}
                        >
                          {f.titre}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p
                            style={{
                              fontSize: 12,
                              color: "var(--ardoise,#546E7A)",
                            }}
                          >
                            {f.duree}
                          </p>
                          <p
                            style={{
                              fontSize: 11,
                              color: "var(--brume,#90A4AE)",
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                            }}
                          >
                            <Users size={11} /> {f._count?.inscriptions}{" "}
                            inscrits
                          </p>
                        </div>
                      </div>
                    </Link>
                  </GlowCard>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: 40 }}>
                <Link
                  href="/academy/formations"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "13px 32px",
                    borderRadius: 100,
                    background: "linear-gradient(135deg,#1B5E20,#2E7D32)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 14,
                    textDecoration: "none",
                    fontFamily: "var(--font-d)",
                    boxShadow: "0 6px 24px rgba(27,94,32,.3)",
                  }}
                >
                  <GraduationCap size={18} /> Voir toutes nos formations
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ESPACE — dark sable bg with clip-path top
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--sable,#FFF8E1)",
          padding: "100px 0",
          position: "relative",
        }}
      >
        <AfricanPattern opacity={0.04} />
        <div
          className="container-fitma"
          style={{ position: "relative", zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 60, textAlign: "center" }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "5px 16px",
                borderRadius: 100,
                background: "rgba(26,35,126,.08)",
                color: "var(--nuit,#1A237E)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
                fontFamily: "var(--font-d)",
              }}
            >
              Fitma Espace
            </span>
            <h2
              style={{
                fontFamily: "var(--font-d)",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                color: "var(--nuit,#1A237E)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              Votre Bureau,{" "}
              <span style={{ color: "var(--savane-d,#1B5E20)" }}>
                Votre Succès
              </span>
            </h2>
            <p
              style={{
                color: "var(--ardoise,#546E7A)",
                fontSize: 16,
                lineHeight: 1.7,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              Des espaces modernes et inspirants à Conakry, conçus pour booster
              votre productivité.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
            }}
          >
            {(
              SERVICES_ESPACE || [
                {
                  icone: "🖥️",
                  titre: "Bureau privé",
                  description:
                    "Votre espace dédié, concentré et professionnel.",
                  href: "/espace/bureau",
                },
                {
                  icone: "🤝",
                  titre: "Salle de réunion",
                  description: "Équipée pour vos présentations clients.",
                  href: "/espace/reunion",
                },
                {
                  icone: "☕",
                  titre: "Coworking",
                  description: "Communauté d'entrepreneurs dynamiques.",
                  href: "/espace/coworking",
                },
                {
                  icone: "🎙️",
                  titre: "Studio podast",
                  description: "Créez votre contenu dans un cadre pro.",
                  href: "/espace/studio",
                },
              ]
            ).map((s, i) => (
              <motion.div
                key={s.titre}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  background: "#fff",
                  border: "1.5px solid rgba(26,35,126,.08)",
                  boxShadow: "0 4px 20px rgba(26,35,126,.06)",
                }}
              >
                <Link
                  href={s.href}
                  style={{
                    display: "block",
                    padding: 28,
                    textDecoration: "none",
                  }}
                >
                  {/* Colored top band */}
                  <div
                    style={{
                      width: "100%",
                      height: 5,
                      borderRadius: 100,
                      marginBottom: 20,
                      background: "linear-gradient(90deg,#1B5E20,#F9A825)",
                    }}
                  />
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 14,
                      marginBottom: 16,
                      background:
                        "linear-gradient(135deg,rgba(26,35,126,.07),rgba(27,94,32,.07))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                    }}
                  >
                    {s.icone}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-d)",
                      fontWeight: 800,
                      fontSize: 15,
                      color: "var(--nuit,#1A237E)",
                      marginBottom: 8,
                    }}
                  >
                    {s.titre}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--ardoise,#546E7A)",
                      lineHeight: 1.6,
                      marginBottom: 18,
                    }}
                  >
                    {s.description}
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--savane,#388E3C)",
                      fontFamily: "var(--font-d)",
                    }}
                  >
                    Réserver <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link
              href="/espace"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "13px 32px",
                borderRadius: 100,
                background: "linear-gradient(135deg,#1A237E,#283593)",
                color: "#fff",
                fontWeight: 800,
                fontSize: 14,
                textDecoration: "none",
                fontFamily: "var(--font-d)",
                boxShadow: "0 6px 24px rgba(26,35,126,.28)",
              }}
            >
              <Building2 size={18} /> Découvrir nos espaces
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VALEURS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "100px 0" }}>
        <div className="container-fitma">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "5px 16px",
                borderRadius: 100,
                background: "rgba(249,168,37,.12)",
                color: "#7a5000",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 14,
                fontFamily: "var(--font-d)",
              }}
            >
              Nos Valeurs
            </span>
            <h2
              style={{
                fontFamily: "var(--font-d)",
                fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                fontWeight: 900,
                color: "var(--encre,#1A237E)",
                letterSpacing: "-0.02em",
              }}
            >
              Ce Qui Nous Guide
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 20,
            }}
          >
            {(
              VALEURS || [
                {
                  icone: "🌱",
                  titre: "Impact",
                  description:
                    "Chaque action crée un changement durable dans nos communautés.",
                },
                {
                  icone: "🤲",
                  titre: "Ubuntu",
                  description:
                    "Je suis parce que nous sommes — la force du collectif.",
                },
                {
                  icone: "💡",
                  titre: "Innovation",
                  description:
                    "Des solutions africaines pour des défis africains.",
                },
                {
                  icone: "🔑",
                  titre: "Accessibilité",
                  description: "La qualité ouverte à tous, partout en Afrique.",
                },
                {
                  icone: "⭐",
                  titre: "Excellence",
                  description:
                    "Viser les sommets dans tout ce que nous faisons.",
                },
                {
                  icone: "🛡️",
                  titre: "Intégrité",
                  description:
                    "Confiance et transparence au cœur de nos relations.",
                },
              ]
            ).map((v, i) => (
              <motion.div
                key={v.titre}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.03 }}
                style={{
                  borderRadius: 18,
                  padding: "28px 22px",
                  background:
                    i % 2 === 0 ? "rgba(27,94,32,.04)" : "rgba(249,168,37,.06)",
                  border: "1.5px solid",
                  borderColor:
                    i % 2 === 0 ? "rgba(27,94,32,.1)" : "rgba(249,168,37,.15)",
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icone}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-d)",
                    fontWeight: 800,
                    fontSize: 15,
                    color: "var(--savane-d,#1B5E20)",
                    marginBottom: 8,
                  }}
                >
                  {v.titre}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--ardoise,#546E7A)",
                    lineHeight: 1.6,
                  }}
                >
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LAUREATS
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--sable,#FFF8E1)",
          padding: "100px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Large decorative circle */}
        <div
          style={{
            position: "absolute",
            right: -200,
            top: "50%",
            transform: "translateY(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(27,94,32,.06),transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="container-fitma"
          style={{ position: "relative", zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "5px 16px",
                borderRadius: 100,
                background: "rgba(26,35,126,.08)",
                color: "var(--nuit,#1A237E)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 14,
                fontFamily: "var(--font-d)",
              }}
            >
              Ils ont réussi
            </span>
            <h2
              style={{
                fontFamily: "var(--font-d)",
                fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                fontWeight: 900,
                color: "var(--encre,#1A237E)",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              Nos Lauréats
            </h2>
            <p
              style={{
                color: "var(--ardoise,#546E7A)",
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 540,
                margin: "0 auto",
              }}
            >
              Des entrepreneurs qui ont fait confiance à Fitma pour transformer
              leurs idées en startups florissantes.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 22,
            }}
          >
            {(
              LAUREATS_PLACEHOLDER || [
                {
                  id: 1,
                  nom: "Aïssatou Diallo",
                  startup: "AgriTech GN",
                  promotion: "Promo 2023",
                  description:
                    "Révolutionne l'agriculture guinéenne avec des solutions IoT.",
                },
                {
                  id: 2,
                  nom: "Mamadou Bah",
                  startup: "FinLink",
                  promotion: "Promo 2023",
                  description:
                    "Inclusion financière pour les marchands informels.",
                },
                {
                  id: 3,
                  nom: "Fatoumata Camara",
                  startup: "EduSahel",
                  promotion: "Promo 2024",
                  description:
                    "Éducation numérique dans les zones rurales d'Afrique.",
                },
                {
                  id: 4,
                  nom: "Ibrahima Sow",
                  startup: "SolarKonakry",
                  promotion: "Promo 2024",
                  description:
                    "Énergie solaire abordable pour tous les foyers.",
                },
              ]
            ).map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{
                  borderRadius: 20,
                  padding: "32px 24px",
                  background: "#fff",
                  border: "1.5px solid rgba(27,94,32,.08)",
                  boxShadow: "0 4px 20px rgba(27,94,32,.05)",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Quote icon top-right */}
                <Quote
                  size={28}
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    color: "rgba(249,168,37,.25)",
                  }}
                />

                {/* Avatar */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    background: "linear-gradient(135deg,#1B5E20,#1A237E)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    fontWeight: 900,
                    color: "#fff",
                    fontFamily: "var(--font-d)",
                    boxShadow: "0 4px 20px rgba(27,94,32,.25)",
                  }}
                >
                  {l.nom[0]}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-d)",
                    fontWeight: 800,
                    fontSize: 15,
                    color: "var(--encre,#1A237E)",
                    marginBottom: 4,
                  }}
                >
                  {l.nom}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--savane,#388E3C)",
                    marginBottom: 10,
                  }}
                >
                  {l.startup}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: 100,
                    background: "rgba(249,168,37,.12)",
                    color: "#7a5000",
                    fontSize: 10,
                    fontWeight: 700,
                    marginBottom: 14,
                    fontFamily: "var(--font-d)",
                  }}
                >
                  {l.promotion}
                </span>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--ardoise,#546E7A)",
                    lineHeight: 1.65,
                  }}
                >
                  {l.description}
                </p>

                {/* Stars */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                    marginTop: 14,
                  }}
                >
                  {[...Array(5)].map((_, k) => (
                    <Star
                      key={k}
                      size={12}
                      fill="#F9A825"
                      style={{ color: "#F9A825" }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link
              href="/academy/laureats"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                borderRadius: 100,
                background: "transparent",
                border: "2px solid var(--savane-d,#1B5E20)",
                color: "var(--savane-d,#1B5E20)",
                fontWeight: 800,
                fontSize: 14,
                textDecoration: "none",
                fontFamily: "var(--font-d)",
                transition: "background .2s",
              }}
            >
              Voir tous les lauréats <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ACTUALITES
      ══════════════════════════════════════════════════════ */}
      {articles.length > 0 && (
        <section style={{ background: "#fff", padding: "100px 0" }}>
          <div className="container-fitma">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: 48,
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 16px",
                    borderRadius: 100,
                    background: "rgba(27,94,32,.07)",
                    color: "var(--savane-d,#1B5E20)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                    fontFamily: "var(--font-d)",
                  }}
                >
                  Blog
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-d)",
                    fontWeight: 900,
                    fontSize: "clamp(1.6rem,3vw,2.4rem)",
                    color: "var(--encre,#1A237E)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Dernières Actualités
                </h2>
              </div>
              <Link
                href="/actualites"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--savane,#388E3C)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "10px 20px",
                  borderRadius: 100,
                  border: "1.5px solid rgba(27,94,32,.2)",
                }}
              >
                Tout voir <ArrowRight size={13} />
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: 24,
              }}
            >
              {articles.map((a, i) => (
                <GlowCard
                  key={a.id}
                  delay={i * 0.1}
                  style={{ overflow: "hidden" }}
                >
                  <Link
                    href={`/actualites/${a.slug}`}
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    <div
                      style={{
                        position: "relative",
                        height: 192,
                        overflow: "hidden",
                        borderRadius: "18px 18px 0 0",
                      }}
                    >
                      {a.imageUrl ? (
                        <Image
                          src={a.imageUrl}
                          alt={a.titre}
                          fill
                          style={{
                            objectFit: "cover",
                            transition: "transform .5s",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background:
                              "linear-gradient(135deg,#E8F5E9,#FFF8E1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 44,
                          }}
                        >
                          📰
                        </div>
                      )}
                      <div style={{ position: "absolute", top: 12, left: 12 }}>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: 100,
                            background:
                              a.type === "COMMUNIQUE" ? "#1A237E" : "#1B5E20",
                            color: "#fff",
                            fontSize: 10,
                            fontWeight: 800,
                            fontFamily: "var(--font-d)",
                          }}
                        >
                          {a.type === "COMMUNIQUE" ? "Communiqué" : "Article"}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: "20px 22px 24px" }}>
                      <p
                        style={{
                          fontSize: 11,
                          color: "var(--brume,#90A4AE)",
                          marginBottom: 8,
                        }}
                      >
                        {formatDate(a.createdAt)}
                      </p>
                      <h3
                        style={{
                          fontFamily: "var(--font-d)",
                          fontWeight: 800,
                          fontSize: 15,
                          color: "var(--encre,#1A237E)",
                          marginBottom: 8,
                          lineHeight: 1.35,
                        }}
                      >
                        {a.titre}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--ardoise,#546E7A)",
                          lineHeight: 1.6,
                        }}
                      >
                        {truncate(a.extrait, 100)}
                      </p>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          marginTop: 14,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "var(--savane,#388E3C)",
                        }}
                      >
                        Lire la suite <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          CTA DON — cinematic dark section
      ══════════════════════════════════════════════════════ */}
      <section
        style={{ position: "relative", overflow: "hidden", padding: "120px 0" }}
      >
        {/* Unsplash BG */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=80"
            alt="Solidarité africaine"
            fill
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg,rgba(13,60,16,.97) 0%,rgba(18,26,100,.9) 60%,rgba(0,0,0,.8) 100%)",
            }}
          />
          <AfricanPattern opacity={0.07} />
        </div>

        {/* Radial amber glow */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(249,168,37,.12),transparent 65%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div
          className="container-fitma"
          style={{ position: "relative", zIndex: 10, textAlign: "center" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                margin: "0 auto 28px",
                background:
                  "linear-gradient(135deg,rgba(249,168,37,.25),rgba(249,168,37,.08))",
                border: "1.5px solid rgba(249,168,37,.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
              }}
            >
              🙏
            </div>

            <span
              style={{
                display: "inline-block",
                padding: "5px 16px",
                borderRadius: 100,
                background: "rgba(249,168,37,.15)",
                border: "1px solid rgba(249,168,37,.3)",
                color: "#FFD54F",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 20,
                fontFamily: "var(--font-d)",
              }}
            >
              La Fondation Fitma
            </span>

            <h2
              style={{
                fontFamily: "var(--font-d)",
                fontSize: "clamp(2rem,5vw,3.8rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 18,
              }}
            >
              Soutenir{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#FFD54F,#F9A825)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                l'Afrique de demain
              </span>
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,.72)",
                maxWidth: 520,
                margin: "0 auto 40px",
                fontSize: 16,
                lineHeight: 1.75,
              }}
            >
              Votre don contribue directement au développement des entrepreneurs
              africains. Ensemble, construisons un continent prospère.
            </p>

            {/* Impact stats inline */}
            <div
              style={{
                display: "inline-flex",
                gap: 40,
                marginBottom: 44,
                padding: "20px 40px",
                borderRadius: 16,
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.1)",
                backdropFilter: "blur(12px)",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {[
                ["100%", "reversé aux projets"],
                ["GNF 500k", "don minimum"],
                ["🌍", "Impact continental"],
              ].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-d)",
                      fontWeight: 900,
                      fontSize: "1.3rem",
                      color: "#FFD54F",
                      marginBottom: 4,
                    }}
                  >
                    {v}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,.55)" }}>
                    {l}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/soutenir/dons"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "15px 36px",
                  borderRadius: 100,
                  background: "linear-gradient(135deg,#F9A825,#FFD54F)",
                  color: "#1B3A00",
                  fontWeight: 900,
                  fontSize: 15,
                  textDecoration: "none",
                  fontFamily: "var(--font-d)",
                  boxShadow: "0 8px 32px rgba(249,168,37,.4)",
                  letterSpacing: "0.01em",
                }}
              >
                <Heart size={18} fill="currentColor" /> Faire un don maintenant
              </Link>
              <Link
                href="/soutenir/partenaire"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "15px 36px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,.08)",
                  border: "1.5px solid rgba(255,255,255,.3)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                  fontFamily: "var(--font-d)",
                }}
              >
                Devenir partenaire <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
