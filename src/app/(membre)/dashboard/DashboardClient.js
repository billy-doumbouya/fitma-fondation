// src/app/(membre)/dashboard/DashboardClient.jsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  FileCheck,
  Heart,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock3,
  Eye,
  Sparkles,
} from "lucide-react";

/* ─── Statut config (Client-side only, fonctions OK ici) ───── */
const STATUT_CFG = {
  SOUMISE: {
    color: "#7a5000",
    bg: "rgba(249,168,37,.12)",
    Icon: Clock3,
    label: "Soumise",
  },
  EN_EVALUATION: {
    color: "#1A237E",
    bg: "rgba(26,35,126,.1)",
    Icon: Eye,
    label: "En évaluation",
  },
  ACCEPTEE: {
    color: "#1B5E20",
    bg: "rgba(27,94,32,.1)",
    Icon: CheckCircle2,
    label: "Acceptée",
  },
  REFUSEE: {
    color: "#546E7A",
    bg: "rgba(0,0,0,.07)",
    Icon: XCircle,
    label: "Refusée",
  },
};

const RESA_STATUT = {
  EN_ATTENTE: {
    color: "#7a5000",
    bg: "rgba(249,168,37,.12)",
    label: "En attente",
  },
  CONFIRME: { color: "#1B5E20", bg: "rgba(27,94,32,.1)", label: "Confirmée" },
  ANNULE: { color: "#546E7A", bg: "rgba(0,0,0,.07)", label: "Annulée" },
};

/* ─── Stat card (Client, peut avoir state/icons) ────────────── */
function StatCard({ Icon, label, value, sub, accent, bg, href }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4 }}
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: 18,
        padding: "20px 18px",
        background: "#fff",
        border: "1.5px solid rgba(0,0,0,.07)",
        boxShadow: "0 2px 12px rgba(0,0,0,.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blob déco */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: bg,
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          marginBottom: 12,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={19} style={{ color: accent }} />
      </div>
      <p
        style={{
          fontFamily: "var(--font-d)",
          fontSize: "1.5rem",
          fontWeight: 900,
          color: "var(--encre,#1A237E)",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "var(--ardoise,#546E7A)",
          marginTop: 3,
        }}
      >
        {label}
      </p>
      {sub && (
        <p
          style={{ fontSize: 11, color: "var(--brume,#90A4AE)", marginTop: 1 }}
        >
          {sub}
        </p>
      )}
    </motion.a>
  );
}

/* ─── Section card wrapper ───────────────────────────────────── */
function SectionCard({
  title,
  Icon,
  accent,
  bg,
  href,
  linkLabel = "Voir tout",
  children,
}) {
  return (
    <div
      style={{
        borderRadius: 20,
        background: "#fff",
        overflow: "hidden",
        border: "1.5px solid rgba(0,0,0,.07)",
        boxShadow: "0 2px 12px rgba(0,0,0,.05)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(0,0,0,.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={15} style={{ color: accent }} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-d)",
              fontWeight: 800,
              fontSize: 15,
              color: "var(--encre,#1A237E)",
            }}
          >
            {title}
          </span>
        </div>
        <Link
          href={href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 700,
            color: accent,
            textDecoration: "none",
          }}
        >
          {linkLabel} <ArrowRight size={12} />
        </Link>
      </div>
      {children}
    </div>
  );
}

/* ─── Empty slot ─────────────────────────────────────────────── */
function Empty({ Icon, accent, bg, message, linkHref, linkLabel }) {
  return (
    <div style={{ padding: "32px 20px", textAlign: "center" }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 16,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
        }}
      >
        <Icon
          size={22}
          style={{ color: accent, opacity: 0.8 }}
          strokeWidth={1.6}
        />
      </div>
      <p style={{ fontSize: 13, color: "var(--brume,#90A4AE)" }}>
        {message}{" "}
        {linkHref && (
          <Link
            href={linkHref}
            style={{
              color: accent,
              fontWeight: 700,
              textDecoration: "underline",
            }}
          >
            {linkLabel}
          </Link>
        )}
      </p>
    </div>
  );
}

/* ─── Badge statut ───────────────────────────────────────────── */
function StatusBadge({ cfg }) {
  const { Icon, color, bg, label } = cfg;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 9999,
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "var(--font-d)",
        color,
        background: bg,
      }}
    >
      <Icon size={11} /> {label}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN CLIENT COMPONENT
════════════════════════════════════════════════════════════ */
export function DashboardClient({ data }) {
  const { prenom, stats, inscriptions, candidatures, reservations } = data;

  const fadeUp = (i) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div
      style={{ padding: "64px 24px 40px", maxWidth: 1100, margin: "0 auto" }}
    >
      {/* ── Greeting ── */}
      <motion.div
        {...fadeUp(0)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            flexShrink: 0,
            background: "rgba(27,94,32,.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sparkles
            size={22}
            style={{ color: "var(--savane,#388E3C)" }}
            strokeWidth={1.75}
          />
        </div>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-d)",
              fontWeight: 900,
              fontSize: "clamp(1.4rem,3vw,2rem)",
              color: "var(--encre,#1A237E)",
              margin: 0,
            }}
          >
            Bonjour, {prenom} 👋
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "var(--ardoise,#546E7A)",
              marginTop: 2,
            }}
          >
            Bienvenue dans votre espace personnel Fitma.
          </p>
        </div>
      </motion.div>

      {/* ── Stat cards ── */}
      <motion.div
        {...fadeUp(1)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <StatCard
          Icon={GraduationCap}
          label="Formations"
          value={stats.formations}
          sub="actives"
          accent="var(--savane,#388E3C)"
          bg="rgba(27,94,32,.09)"
          href="/membre/mes-formations"
        />
        <StatCard
          Icon={Calendar}
          label="Réservations"
          value={stats.reservations}
          sub="récentes"
          accent="#1A237E"
          bg="rgba(26,35,126,.09)"
          href="/membre/mes-reservations"
        />
        <StatCard
          Icon={FileCheck}
          label="Candidatures"
          value={stats.candidatures}
          sub="soumises"
          accent="#7a5000"
          bg="rgba(249,168,37,.12)"
          href="/membre/mes-candidatures"
        />
        <StatCard
          Icon={Heart}
          label="Dons versés"
          value={stats.donsTotal}
          sub={`${stats.donsCount} don${stats.donsCount !== 1 ? "s" : ""}`}
          accent="var(--savane,#388E3C)"
          bg="rgba(27,94,32,.09)"
          href="/membre/mes-dons"
        />
      </motion.div>

      {/* ── Grid 2 cols ── */}
      <motion.div
        {...fadeUp(2)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {/* Formations */}
        <SectionCard
          title="Mes Formations"
          Icon={GraduationCap}
          accent="var(--savane,#388E3C)"
          bg="rgba(27,94,32,.09)"
          href="/membre/mes-formations"
        >
          {inscriptions.length === 0 ? (
            <Empty
              Icon={GraduationCap}
              accent="var(--savane,#388E3C)"
              bg="rgba(27,94,32,.08)"
              message="Aucune formation."
              linkHref="/academy/formations"
              linkLabel="Explorer le catalogue"
            />
          ) : (
            inscriptions.map((insc) => (
              <Link
                key={insc.id}
                href={`/membre/mes-formations/${insc.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 20px",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(0,0,0,.05)",
                  transition: "background .15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(0,0,0,.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: "rgba(27,94,32,.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GraduationCap
                    size={16}
                    style={{ color: "var(--savane,#388E3C)" }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--encre,#1A237E)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: 6,
                    }}
                  >
                    {insc.titre}
                  </p>
                  {/* Progress bar */}
                  <div
                    style={{
                      width: "100%",
                      height: 5,
                      borderRadius: 9999,
                      background: "rgba(0,0,0,.07)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${insc.progression}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        height: "100%",
                        borderRadius: 9999,
                        background: "linear-gradient(90deg,#1B5E20,#F9A825)",
                      }}
                    />
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "var(--savane,#388E3C)",
                    flexShrink: 0,
                  }}
                >
                  {insc.progression}%
                </span>
              </Link>
            ))
          )}
        </SectionCard>

        {/* Candidatures */}
        <SectionCard
          title="Mes Candidatures"
          Icon={FileCheck}
          accent="#7a5000"
          bg="rgba(249,168,37,.12)"
          href="/membre/mes-candidatures"
        >
          {candidatures.length === 0 ? (
            <Empty
              Icon={FileCheck}
              accent="#7a5000"
              bg="rgba(249,168,37,.1)"
              message="Aucune candidature."
              linkHref="/academy/incubation"
              linkLabel="Postuler à un programme"
            />
          ) : (
            candidatures.map((c) => {
              const cfg = STATUT_CFG[c.statut] || STATUT_CFG.SOUMISE;
              return (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 20px",
                    borderBottom: "1px solid rgba(0,0,0,.05)",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "var(--encre,#1A237E)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {c.nomProjet}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "var(--ardoise,#546E7A)",
                        marginTop: 2,
                      }}
                    >
                      {c.programmeTitre}
                    </p>
                  </div>
                  <StatusBadge cfg={cfg} />
                </div>
              );
            })
          )}
        </SectionCard>

        {/* Réservations */}
        <SectionCard
          title="Mes Réservations"
          Icon={Calendar}
          accent="#1A237E"
          bg="rgba(26,35,126,.09)"
          href="/membre/mes-reservations"
        >
          {reservations.length === 0 ? (
            <Empty
              Icon={Calendar}
              accent="#1A237E"
              bg="rgba(26,35,126,.08)"
              message="Aucune réservation."
              linkHref="/espace"
              linkLabel="Réserver un espace"
            />
          ) : (
            reservations.map((r) => {
              const cfg = RESA_STATUT[r.statut] || RESA_STATUT.EN_ATTENTE;
              return (
                <div
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 20px",
                    borderBottom: "1px solid rgba(0,0,0,.05)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: "rgba(26,35,126,.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Calendar size={15} style={{ color: "#1A237E" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "var(--encre,#1A237E)",
                      }}
                    >
                      {r.espace}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "var(--ardoise,#546E7A)",
                        marginTop: 1,
                      }}
                    >
                      {r.date}
                    </p>
                  </div>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 9999,
                      fontSize: 11,
                      fontWeight: 700,
                      color: cfg.color,
                      background: cfg.bg,
                      fontFamily: "var(--font-d)",
                    }}
                  >
                    {cfg.label}
                  </span>
                </div>
              );
            })
          )}
        </SectionCard>
      </motion.div>
    </div>
  );
}
