// src/app/(public)/academy/evenements/page.js
import {
  Calendar,
  MapPin,
  Mic2,
  Monitor,
  Presentation,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata = { title: "Événements | Fitma Academy" };

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
          id="adinkraEvenements"
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
      <rect width="240" height="240" fill="url(#adinkraEvenements)" />
    </svg>
  );
}

const TYPE_STYLE = {
  "Pitch Day": {
    Icone: Presentation,
    accent: "var(--savane)",
    bg: "rgba(27,94,32,.1)",
  },
  Webinaire: {
    Icone: Monitor,
    accent: "var(--cauri-d)",
    bg: "rgba(249,168,37,.14)",
  },
  Conférence: { Icone: Mic2, accent: "var(--savane)", bg: "rgba(27,94,32,.1)" },
  Formation: {
    Icone: GraduationCap,
    accent: "var(--cauri-d)",
    bg: "rgba(249,168,37,.14)",
  },
};

export default function EvenementsPage() {
  const events = [
    {
      titre: "Pitch Day — Promotion 2025",
      date: "15 Juillet 2025",
      type: "Pitch Day",
      desc: "Les startups incubées présentent leurs projets à un jury d'investisseurs et de partenaires.",
      lieu: "Fitma Espace, Conakry",
    },
    {
      titre: "Webinaire : Marketing Digital en Afrique",
      date: "20 Juin 2025",
      type: "Webinaire",
      desc: "Comment adapter sa stratégie marketing aux réalités du marché africain.",
      lieu: "En ligne",
    },
    {
      titre: "AfriTech Summit — Partenariat Fitma",
      date: "10 Août 2025",
      type: "Conférence",
      desc: "La grande conférence tech de l'Afrique de l'Ouest. Fitma est partenaire officiel.",
      lieu: "Conakry",
    },
    {
      titre: "Formation gratuite : Excel pour entrepreneurs",
      date: "5 Juillet 2025",
      type: "Formation",
      desc: "Session gratuite d'initiation à Excel pour les entrepreneurs débutants.",
      lieu: "Fitma Espace + En ligne",
    },
  ];

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
            Fitma Academy
          </span>
          <h1 className="text-h1 text-white mb-4 tracking-tight">
            Événements & Webinaires
          </h1>
          <p className="text-white/75 max-w-xl mx-auto">
            Rejoignez notre communauté lors de nos événements : pitch days,
            webinaires, conférences et networking.
          </p>
        </div>
      </section>

      {/* ---------------- LISTE ÉVÉNEMENTS ---------------- */}
      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((e, i) => {
              const style = TYPE_STYLE[e.type] || TYPE_STYLE["Webinaire"];
              const Icone = style.Icone;
              return (
                <div
                  key={i}
                  className="card p-6 relative overflow-hidden group transition-transform hover:-translate-y-1"
                >
                  <div
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-[0.06] pointer-events-none transition-transform duration-500 group-hover:scale-125"
                    style={{ background: style.accent }}
                  />

                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <span
                      className="inline-flex items-center gap-1.5 badge text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: style.bg, color: style.accent }}
                    >
                      <Icone size={13} />
                      {e.type}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: "var(--brume)" }}
                    >
                      <Calendar size={13} />
                      {e.date}
                    </span>
                  </div>

                  <h3
                    className="font-d font-bold text-lg mb-2 relative z-10"
                    style={{ color: "var(--encre)" }}
                  >
                    {e.titre}
                  </h3>
                  <p
                    className="text-sm mb-4 leading-relaxed relative z-10"
                    style={{ color: "var(--ardoise)" }}
                  >
                    {e.desc}
                  </p>
                  <p
                    className="flex items-center gap-1.5 text-xs relative z-10"
                    style={{ color: "var(--brume)" }}
                  >
                    <MapPin size={13} />
                    {e.lieu}
                  </p>

                  <button className="mt-4 btn btn-savane btn-sm relative z-10 inline-flex items-center gap-2 group/btn">
                    S'inscrire à l'événement
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
