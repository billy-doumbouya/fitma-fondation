// src/app/(public)/espace/page.js
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Zap,
  Coffee,
  ShieldCheck,
  Users2,
  CalendarDays,
  Printer,
  Archive,
  PartyPopper,
} from "lucide-react";
import { SERVICES_ESPACE } from "@/constants/placeholders";
import { SectionTitle } from "@/components/ui";

export const metadata = { title: "Fitma Espace — Coworking & Bureaux Conakry" };

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
          id="adinkraEspaceHome"
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
      <rect width="240" height="240" fill="url(#adinkraEspaceHome)" />
    </svg>
  );
}

const HERO_IMG =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80";

const AVANTAGES = [
  { Icone: Zap, titre: "WiFi Ultra-rapide", desc: "100 Mbps fibre dédiée" },
  { Icone: Coffee, titre: "Café & Thé", desc: "Offerts toute la journée" },
  { Icone: ShieldCheck, titre: "Sécurisé 24/7", desc: "Accès sécurisé" },
  { Icone: Users2, titre: "Communauté", desc: "Réseau d'entrepreneurs" },
  { Icone: CalendarDays, titre: "Salles de réunion", desc: "Sur réservation" },
  { Icone: Printer, titre: "Impression", desc: "Imprimante & scanner" },
  { Icone: Archive, titre: "Casiers", desc: "Stockage sécurisé" },
  { Icone: PartyPopper, titre: "Événements", desc: "Networking mensuel" },
];

export default function EspacePage() {
  return (
    <main className="pt-20">
      {/* ---------------- HERO ---------------- */}
      <section className="section section-nuit relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt=""
            fill
            priority
            className="object-cover opacity-30"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15,20,30,.45), var(--nuit) 92%)",
            }}
          />
        </div>
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
            <MapPin size={13} />
            Conakry, Guinée
          </span>
          <h1 className="text-h1 text-white mb-4 tracking-tight">
            Fitma Espace
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto mb-8 leading-relaxed">
            Des espaces de travail modernes, connectés et inspirants. Rejoignez
            une communauté d'entrepreneurs et de professionnels au cœur de
            Conakry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/espace/coworking"
              className="btn btn-cauri btn-lg inline-flex items-center justify-center gap-2 group"
            >
              Voir le coworking
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link href="/contact" className="btn btn-outline-white btn-lg">
              Planifier une visite
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- NOS ESPACES ---------------- */}
      <section className="section">
        <div className="container-fitma">
          <SectionTitle
            pretitle="Nos Espaces"
            title="Choisissez Votre Espace"
            subtitle="Du poste en open space au bureau privatif, nous avons la solution adaptée à vos besoins."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES_ESPACE.map((s, i) => {
              const Icone = s.Icone;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="card card-hover p-6 block text-center group relative overflow-hidden"
                >
                  <div
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-[0.06] transition-opacity pointer-events-none"
                    style={{ background: "var(--savane)" }}
                  />
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors"
                    style={{ background: "var(--savane-pale)" }}
                  >
                    {Icone ? (
                      <Icone
                        size={28}
                        strokeWidth={1.75}
                        style={{ color: "var(--savane)" }}
                      />
                    ) : (
                      <span className="text-4xl">{s.icone}</span>
                    )}
                  </div>
                  <h3
                    className="font-d font-bold text-base mb-2 group-hover:text-savane transition-colors"
                    style={{ color: "var(--encre)" }}
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
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                    style={{ color: "var(--savane)" }}
                  >
                    Découvrir
                    <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- AVANTAGES ---------------- */}
      <section className="section section-sable relative overflow-hidden">
        <MotifAdinkra
          className="absolute -bottom-20 -right-20 w-80 h-80 opacity-[0.05] pointer-events-none"
          color="var(--savane)"
        />
        <div className="container-fitma relative z-10">
          <SectionTitle
            pretitle="Pourquoi Fitma Espace"
            title="Bien Plus qu'Un Bureau"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {AVANTAGES.map((a, i) => {
              const isSavane = i % 2 === 0;
              return (
                <div
                  key={a.titre}
                  className="card p-4 text-center group transition-transform hover:-translate-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: isSavane
                        ? "rgba(27,94,32,.1)"
                        : "rgba(249,168,37,.14)",
                    }}
                  >
                    <a.Icone
                      size={22}
                      strokeWidth={1.75}
                      style={{
                        color: isSavane ? "var(--savane)" : "var(--cauri-d)",
                      }}
                    />
                  </div>
                  <p
                    className="font-d font-bold text-xs mb-1"
                    style={{ color: "var(--encre)" }}
                  >
                    {a.titre}
                  </p>
                  <p className="text-xs" style={{ color: "var(--ardoise)" }}>
                    {a.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
