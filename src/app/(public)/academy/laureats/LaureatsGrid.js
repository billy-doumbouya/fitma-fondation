import { prisma } from "@/lib/prisma";
import { LAUREATS_PLACEHOLDER } from "@/constants/placeholders";
import { Trophy } from "lucide-react";
import LaureatsGrid from "./LaureatsGrid";

export const metadata = { title: "Lauréats | Fitma Academy" };

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
          id="adinkraLaureats"
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
      <rect width="240" height="240" fill="url(#adinkraLaureats)" />
    </svg>
  );
}

export default async function LaureatsPage() {
  let laureats = [];
  try {
    laureats = await prisma.laureats.findMany({
      orderBy: { promotion: "desc" },
    });
  } catch {}
  const data = laureats.length > 0 ? laureats : LAUREATS_PLACEHOLDER || [];

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
            <Trophy size={13} />
            Fitma Academy
          </span>
          <h1 className="text-h1 text-white mb-4 tracking-tight">
            Nos Lauréats
          </h1>
          <p className="text-white/75 max-w-xl mx-auto">
            Des entrepreneurs qui ont fait confiance à Fitma pour transformer
            leurs idées en startups florissantes.
          </p>
        </div>
      </section>

      {/* ---------------- GRID LAURÉATS (client) ---------------- */}
      <section className="section">
        <div className="container-fitma">
          <LaureatsGrid data={data} />
        </div>
      </section>
    </main>
  );
}
