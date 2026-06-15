// src/app/(public)/actualites/page.js
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { EmptyState, Badge, Pagination } from "@/components/ui";
import { formatDate, truncate } from "@/lib/utils";
import {
  Newspaper,
  Calendar,
  ArrowRight,
  FileText,
  Megaphone,
  Sparkles,
} from "lucide-react";

export const metadata = { title: "Actualités | Fondation Fitma" };

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
          id="adinkraActualites"
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
      <rect width="240" height="240" fill="url(#adinkraActualites)" />
    </svg>
  );
}

/* Image de secours quand a.imageUrl est absent */
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=600&q=80";

export default async function ActualitesPage({ searchParams }) {
  const page = parseInt(searchParams?.page || "1"),
    limit = 9;
  let articles = [],
    total = 0;
  try {
    [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: { publie: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          titre: true,
          slug: true,
          extrait: true,
          imageUrl: true,
          type: true,
          createdAt: true,
        },
      }),
      prisma.article.count({ where: { publie: true } }),
    ]);
  } catch {}

  const totalPages = Math.max(1, Math.ceil(total / limit));

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
            <Newspaper size={13} />
            Fondation Fitma
          </span>
          <h1 className="text-h1 text-white mb-4 tracking-tight">Actualités</h1>
          <p className="text-white/75 max-w-xl mx-auto">
            Articles, analyses et communiqués de la Fondation Fitma.
          </p>
        </div>
      </section>

      {/* ---------------- LISTE ARTICLES ---------------- */}
      <section className="section">
        <div className="container-fitma">
          {articles.length === 0 ? (
            <EmptyState
              icon={<Newspaper size={40} style={{ color: "var(--savane)" }} />}
              title="Aucun article"
              description="Les actualités seront bientôt disponibles."
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((a, i) => {
                  const isCommunique = a.type === "COMMUNIQUE";
                  return (
                    <Link
                      key={a.id}
                      href={`/actualites/${a.slug}`}
                      className="card card-hover block group overflow-hidden"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={a.imageUrl || FALLBACK_IMG}
                          alt={a.titre}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,.25), transparent)",
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <Badge
                            variant={isCommunique ? "nuit" : "savane"}
                            className="inline-flex items-center gap-1.5"
                          >
                            {isCommunique ? (
                              <Megaphone size={11} />
                            ) : (
                              <FileText size={11} />
                            )}
                            {isCommunique ? "Communiqué" : "Article"}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <p
                          className="flex items-center gap-1.5 text-xs mb-2"
                          style={{ color: "var(--brume)" }}
                        >
                          <Calendar size={12} />
                          {formatDate(a.createdAt)}
                        </p>
                        <h2
                          className="font-d font-bold text-base mb-2 group-hover:text-savane transition-colors"
                          style={{ color: "var(--encre)" }}
                        >
                          {a.titre}
                        </h2>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "var(--ardoise)" }}
                        >
                          {truncate(a.extrait, 100)}
                        </p>
                        <span
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5"
                          style={{ color: "var(--savane)" }}
                        >
                          Lire la suite
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Pagination page={page} totalPages={totalPages} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
