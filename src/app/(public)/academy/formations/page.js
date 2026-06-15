"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  X,
  RotateCcw,
} from "lucide-react";
import {
  SectionTitle,
  Badge,
  Spinner,
  EmptyState,
  Pagination,
} from "@/components/ui";
import { formatMontant } from "@/lib/utils";
import { useAnalytics } from "@/hooks";

const CATEGORIES = [
  "Tous",
  "Marketing",
  "Entrepreneuriat",
  "Technologie",
  "Leadership",
  "Finance",
  "Design",
  "Communication",
];
const NIVEAUX = [
  { value: "", label: "Tous niveaux" },
  { value: "DEBUTANT", label: "Débutant" },
  { value: "INTERMEDIAIRE", label: "Intermédiaire" },
  { value: "AVANCE", label: "Avancé" },
];
const FORMATS = [
  { value: "", label: "Tous formats" },
  { value: "EN_LIGNE", label: "En ligne" },
  { value: "PRESENTIEL", label: "Présentiel" },
  { value: "HYBRIDE", label: "Hybride" },
];
const NV_LABEL = {
  DEBUTANT: "Débutant",
  INTERMEDIAIRE: "Intermédiaire",
  AVANCE: "Avancé",
};
const FMT_LABEL = {
  EN_LIGNE: "En ligne",
  PRESENTIEL: "Présentiel",
  HYBRIDE: "Hybride",
};

/* Images Unsplash de fallback par catégorie — utilisées quand
   f.imageUrl est absent. Format optimisé via paramètres Unsplash. */
const CATEGORY_FALLBACK_IMG = {
  Marketing:
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=600&q=80",
  Entrepreneuriat:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80",
  Technologie:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
  Leadership:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
  Finance:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
  Design:
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
  Communication:
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80",
  default:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
};

/* ----------------------------------------------------------------
   Motif géométrique inline (Adinkra) — currentColor only.
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
          id="adinkraFormations"
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
      <rect width="240" height="240" fill="url(#adinkraFormations)" />
    </svg>
  );
}

export default function FormationsPage() {
  useAnalytics("/academy/formations");
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("Tous");
  const [niveau, setNiveau] = useState("");
  const [format, setFormat] = useState("");

  async function load(p = 1) {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: p, limit: 9 });
      if (search) params.set("search", search);
      if (categorie !== "Tous") params.set("categorie", categorie);
      if (niveau) params.set("niveau", niveau);
      if (format) params.set("format", format);
      const res = await fetch(`/api/formations?${params}`);
      const data = await res.json();
      setFormations(data.formations || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setPage(p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(1);
  }, [categorie, niveau, format]);

  function handleSearch(e) {
    e.preventDefault();
    load(1);
  }

  const activeFilters =
    (categorie !== "Tous" ? 1 : 0) + (niveau ? 1 : 0) + (format ? 1 : 0);

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
              <GraduationCap size={13} />
              Fitma Academy
            </span>
            <h1 className="text-h1 text-white mb-4 tracking-tight">
              Catalogue des Formations
            </h1>
            <p className="text-white/75 max-w-xl mx-auto mb-8">
              Des programmes pratiques conçus par des experts pour développer
              vos compétences et votre carrière.
            </p>

            <form
              onSubmit={handleSearch}
              className="max-w-lg mx-auto flex gap-2"
            >
              <div
                className="flex-1 relative rounded-xl overflow-hidden"
                style={{ background: "rgba(255,255,255,.96)" }}
              >
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--brume)" }}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher une formation..."
                  className="w-full pl-9 pr-4 py-3 text-sm outline-none bg-transparent"
                  style={{ color: "var(--encre)" }}
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="btn btn-cauri btn-md px-5"
              >
                Chercher
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-fitma">
          {/* ---------------- FILTRES ---------------- */}
          <div
            className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl border"
            style={{ background: "var(--sable)", borderColor: "var(--ligne)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "var(--savane-pale)" }}
              >
                <SlidersHorizontal
                  size={13}
                  style={{ color: "var(--savane)" }}
                />
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--ardoise)", fontFamily: "var(--font-d)" }}
              >
                Filtres
              </span>
            </div>

            {/* Catégories */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <motion.button
                  key={c}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategorie(c)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: categorie === c ? "var(--savane)" : "white",
                    color: categorie === c ? "white" : "var(--ardoise)",
                    fontFamily: "var(--font-d)",
                    boxShadow: categorie === c ? "var(--sh-sm)" : "none",
                  }}
                >
                  {c}
                </motion.button>
              ))}
            </div>

            <select
              value={niveau}
              onChange={(e) => setNiveau(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border outline-none bg-white"
              style={{
                borderColor: "var(--ligne)",
                fontFamily: "var(--font-d)",
                color: "var(--ardoise)",
              }}
            >
              {NIVEAUX.map((n) => (
                <option key={n.value} value={n.value}>
                  {n.label}
                </option>
              ))}
            </select>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border outline-none bg-white"
              style={{
                borderColor: "var(--ligne)",
                fontFamily: "var(--font-d)",
                color: "var(--ardoise)",
              }}
            >
              {FORMATS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>

            {activeFilters > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCategorie("Tous");
                  setNiveau("");
                  setFormat("");
                }}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ml-auto"
                style={{
                  color: "var(--cauri-d)",
                  background: "rgba(249,168,37,.12)",
                }}
              >
                <X size={12} />
                Effacer ({activeFilters})
              </motion.button>
            )}
          </div>

          <p
            className="text-sm mb-6 flex items-center gap-1.5"
            style={{ color: "var(--brume)" }}
          >
            <BookOpen size={14} />
            {total} formation{total !== 1 ? "s" : ""} trouvée
            {total !== 1 ? "s" : ""}
          </p>

          {loading ? (
            <div className="py-20">
              <Spinner size="lg" />
            </div>
          ) : formations.length === 0 ? (
            <EmptyState
              icon={<BookOpen size={40} style={{ color: "var(--savane)" }} />}
              title="Aucune formation trouvée"
              description="Essayez de modifier vos filtres."
              action={
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setCategorie("Tous");
                    setNiveau("");
                    setFormat("");
                    setSearch("");
                  }}
                  className="btn btn-savane btn-sm inline-flex items-center gap-1.5"
                >
                  <RotateCcw size={14} />
                  Réinitialiser
                </motion.button>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {formations.map((f, i) => (
                    <motion.div
                      key={f.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={`/academy/formations/${f.slug}`}
                        className="card card-hover block group h-full overflow-hidden"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={
                              f.imageUrl ||
                              CATEGORY_FALLBACK_IMG[f.categorie] ||
                              CATEGORY_FALLBACK_IMG.default
                            }
                            alt={f.titre}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge variant={f.gratuit ? "savane" : "cauri"}>
                              {f.gratuit ? "Gratuit" : formatMontant(f.prix)}
                            </Badge>
                          </div>
                          {/* dégradé bas pour lisibilité au survol */}
                          <div
                            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                              background:
                                "linear-gradient(to top, rgba(0,0,0,.25), transparent)",
                            }}
                          />
                        </div>
                        <div className="p-5 flex flex-col h-full">
                          <div className="flex gap-2 mb-3">
                            <Badge variant="gris" className="text-[10px]">
                              {FMT_LABEL[f.format]}
                            </Badge>
                            <Badge variant="gris" className="text-[10px]">
                              {NV_LABEL[f.niveau]}
                            </Badge>
                          </div>
                          <h2
                            className="font-d font-bold text-base mb-2 group-hover:text-savane transition-colors"
                            style={{ color: "var(--encre)" }}
                          >
                            {f.titre}
                          </h2>
                          <p
                            className="text-xs leading-relaxed mb-3 flex-1"
                            style={{ color: "var(--ardoise)" }}
                          >
                            {f.description?.slice(0, 100)}...
                          </p>
                          <div
                            className="flex items-center justify-between pt-3 gap-2"
                            style={{ borderTop: "1px solid var(--ligne)" }}
                          >
                            <span
                              className="flex items-center gap-1.5 text-xs"
                              style={{ color: "var(--brume)" }}
                            >
                              <Clock size={12} />
                              {f.duree}
                            </span>
                            <span
                              className="flex items-center gap-1.5 text-xs font-semibold"
                              style={{ color: "var(--brume)" }}
                            >
                              <Users size={12} />
                              {f._count?.inscriptions || 0} inscrits
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={(p) => load(p)}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
