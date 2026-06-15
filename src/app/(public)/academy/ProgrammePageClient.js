"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Rocket,
  Sprout,
  Users,
  FileText,
  Target,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";
import { SectionTitle, Input, Textarea, Button } from "@/components/ui";
import { candidatureSchema } from "@/schemas";

/* ----------------------------------------------------------------
   Petit motif géométrique inspiré des tissus Bogolan / Kente,
   tracé en SVG natif — remplace le pattern raster générique.
   Utilise uniquement les couleurs du design system via currentColor.
----------------------------------------------------------------- */
function MotifBogolan({ className }) {
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
          id="bogolan"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 30 L30 0 L60 30 L30 60 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="30" cy="30" r="4" fill="currentColor" />
          <path d="M0 0 L8 0 L0 8 Z" fill="currentColor" />
          <path d="M60 60 L52 60 L60 52 Z" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="240" height="240" fill="url(#bogolan)" />
    </svg>
  );
}

const STAGE_ICONS = {
  idee: Lightbulb,
  prototype: Rocket,
  mvp: Target,
  traction: TrendingUp,
};

export default function ProgrammePageClient({ programme, type }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedStage, setSelectedStage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const isIncubation = type === "INCUBATION";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(candidatureSchema),
  });

  const onSubmit = async (data) => {
    if (!session) {
      router.push("/login");
      return;
    }
    if (!programme) {
      toast.error("Aucun programme ouvert actuellement.");
      return;
    }
    try {
      const res = await fetch("/api/candidatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, programmeId: programme.id }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSubmitted(true);
      toast.success("Candidature soumise avec succès !");
    } catch (e) {
      toast.error(e.message || "Erreur lors de la soumission.");
    }
  };

  const info = isIncubation
    ? {
        badge: "Fitma Academy — Incubation",
        titre: programme?.titre || "Programme d'Incubation",
        desc:
          programme?.description ||
          "6 mois d'accompagnement intensif pour transformer votre idée en startup viable.",
        duree: programme?.duree || "6 mois",
        avantages: programme?.avantages || [
          "Espace de travail offert",
          "Mentorat personnalisé",
          "Accès réseau Fitma",
          "Mise en relation investisseurs",
        ],
        criteres: programme?.criteres || [
          "Projet innovant",
          "Équipe motivée",
          "Disponibilité temps plein",
        ],
        Icon: Sprout,
      }
    : {
        badge: "Fitma Academy — Accélération",
        titre: programme?.titre || "Programme d'Accélération",
        desc:
          programme?.description ||
          "3 mois pour faire passer votre startup au niveau supérieur.",
        duree: programme?.duree || "3 mois",
        avantages: programme?.avantages || [
          "Investissement potentiel",
          "Coaching intensif",
          "Visibilité médiatique",
          "Réseau d'experts",
        ],
        criteres: programme?.criteres || [
          "Startup existante",
          "Revenus validés",
          "Ambition de croissance",
        ],
        Icon: Rocket,
      };

  const stages = [
    { value: "idee", label: "Idée", sub: "Pas encore de produit" },
    { value: "prototype", label: "Prototype", sub: "MVP en cours" },
    { value: "mvp", label: "MVP lancé", sub: "Premiers utilisateurs" },
    { value: "traction", label: "Traction", sub: "Revenus ou usage actif" },
  ];

  return (
    <main className="pt-20">
      {/* ---------------- HERO ---------------- */}
      <section className="section section-savane relative overflow-hidden">
        {/* Motif décoratif — coin supérieur droit, atténué */}
        <MotifBogolan
          className="absolute -top-10 -right-10 w-72 h-72 opacity-[0.07] pointer-events-none"
          style={{ color: "var(--cauri-l)" }}
        />
        <MotifBogolan
          className="absolute -bottom-16 -left-16 w-64 h-64 opacity-[0.05] pointer-events-none rotate-45"
          style={{ color: "#FFFFFF" }}
        />

        {/* Glow ambiant */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(249,168,37,.18) 0%, transparent 70%)",
          }}
        />

        <div className="container-fitma relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-6 px-4 py-1.5 rounded-full border"
              style={{
                background: "rgba(249,168,37,.12)",
                borderColor: "rgba(249,168,37,.35)",
                color: "var(--cauri-l)",
                fontFamily: "var(--font-d)",
              }}
            >
              <Sparkles size={13} />
              {info.badge}
            </span>

            {/* Icône signature au lieu de l'emoji */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                delay: 0.15,
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
              <info.Icon
                size={36}
                style={{ color: "var(--cauri-l)" }}
                strokeWidth={1.75}
              />
            </motion.div>

            <h1 className="text-h1 text-white mb-4 tracking-tight">
              {info.titre}
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              {info.desc}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(249,168,37,.14)",
                border: "1px solid rgba(249,168,37,.25)",
              }}
            >
              <Clock size={15} style={{ color: "var(--cauri-l)" }} />
              <span className="text-sm text-white/85">
                Durée du programme&nbsp;
                <strong className="text-white font-semibold">
                  {info.duree}
                </strong>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- CONTENU ---------------- */}
      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* -------- Colonne infos -------- */}
            <div className="space-y-10">
              {/* Avantages */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "var(--savane-pale)" }}
                  >
                    <ShieldCheck size={18} style={{ color: "var(--savane)" }} />
                  </div>
                  <h2
                    className="font-d font-bold text-xl"
                    style={{ color: "var(--encre)" }}
                  >
                    Ce que vous obtenez
                  </h2>
                </div>

                <div className="space-y-3">
                  {info.avantages.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 p-4 rounded-xl border border-transparent transition-colors"
                      style={{ background: "var(--savane-pale)" }}
                    >
                      <div
                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-d font-bold text-xs transition-colors"
                        style={{
                          background: "var(--bg)",
                          color: "var(--savane)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p
                        className="text-sm leading-relaxed pt-1"
                        style={{ color: "var(--ardoise)" }}
                      >
                        {a}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Critères */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(249,168,37,.15)" }}
                  >
                    <Target size={18} style={{ color: "var(--cauri-d)" }} />
                  </div>
                  <h2
                    className="font-d font-bold text-xl"
                    style={{ color: "var(--encre)" }}
                  >
                    Critères d'éligibilité
                  </h2>
                </div>

                <div
                  className="rounded-xl border divide-y overflow-hidden"
                  style={{ borderColor: "var(--ligne)" }}
                >
                  {info.criteres.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3 text-sm px-4 py-3.5"
                      style={{
                        color: "var(--ardoise)",
                        borderColor: "var(--ligne)",
                      }}
                    >
                      <CheckCircle2
                        size={17}
                        className="shrink-0"
                        style={{ color: "var(--savane)" }}
                      />
                      {c}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* -------- Colonne formulaire -------- */}
            <div className="lg:sticky lg:top-24 self-start">
              <div
                className="card p-6 sm:p-8 relative overflow-hidden"
                style={{ border: "1px solid var(--ligne)" }}
              >
                {/* Accent décoratif en angle */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.06] pointer-events-none"
                  style={{ background: "var(--savane)" }}
                />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center py-10 relative z-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                        className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-5"
                        style={{ background: "var(--savane-pale)" }}
                      >
                        <CheckCircle2
                          size={40}
                          style={{ color: "var(--savane)" }}
                        />
                      </motion.div>
                      <h3
                        className="font-d font-bold text-xl mb-2"
                        style={{ color: "var(--encre)" }}
                      >
                        Candidature soumise !
                      </h3>
                      <p
                        className="text-sm max-w-xs mx-auto leading-relaxed"
                        style={{ color: "var(--ardoise)" }}
                      >
                        Notre équipe vous contactera sous 5 jours ouvrables.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative z-10"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: "var(--savane-pale)" }}
                        >
                          <FileText
                            size={18}
                            style={{ color: "var(--savane)" }}
                          />
                        </div>
                        <h2
                          className="font-d font-bold text-xl"
                          style={{ color: "var(--encre)" }}
                        >
                          Postuler au programme
                        </h2>
                      </div>

                      {!programme?.ouvert && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-3 p-4 rounded-xl mb-6 text-sm"
                          style={{
                            background: "var(--cauri-pale)",
                            color: "var(--cauri-d)",
                          }}
                        >
                          <Clock size={16} className="shrink-0 mt-0.5" />
                          <span>
                            Aucune session ouverte actuellement. Laissez vos
                            coordonnées pour être notifié dès l'ouverture.
                          </span>
                        </motion.div>
                      )}

                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                        noValidate
                      >
                        <Input
                          label="Nom du projet"
                          placeholder="Ex: AgriTech GN"
                          required
                          error={errors.nomProjet?.message}
                          {...register("nomProjet")}
                        />

                        <Textarea
                          label="Description du projet"
                          placeholder="Décrivez votre projet, le problème résolu et votre solution..."
                          required
                          rows={4}
                          error={errors.descriptionProjet?.message}
                          {...register("descriptionProjet")}
                        />

                        {/* Stade d'avancement — sélecteur visuel en cartes */}
                        <div>
                          <label
                            className="block text-sm font-semibold mb-2.5"
                            style={{
                              color: "var(--ardoise)",
                              fontFamily: "var(--font-d)",
                            }}
                          >
                            Stade d'avancement *
                          </label>

                          <input
                            type="hidden"
                            {...register("stadeAvancement")}
                          />

                          <div className="grid grid-cols-2 gap-2.5">
                            {stages.map((s) => {
                              const StageIcon = STAGE_ICONS[s.value];
                              const active = selectedStage === s.value;
                              return (
                                <motion.button
                                  key={s.value}
                                  type="button"
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => {
                                    setSelectedStage(s.value);
                                    setValue("stadeAvancement", s.value, {
                                      shouldValidate: true,
                                    });
                                  }}
                                  className="flex flex-col items-start gap-2 p-3 rounded-xl border text-left transition-all"
                                  style={{
                                    borderColor: active
                                      ? "var(--savane)"
                                      : "var(--ligne)",
                                    background: active
                                      ? "var(--savane-pale)"
                                      : "var(--bg)",
                                  }}
                                >
                                  <StageIcon
                                    size={18}
                                    style={{
                                      color: active
                                        ? "var(--savane)"
                                        : "var(--brume)",
                                    }}
                                  />
                                  <div>
                                    <div
                                      className="text-sm font-semibold"
                                      style={{
                                        color: active
                                          ? "var(--encre)"
                                          : "var(--ardoise)",
                                        fontFamily: "var(--font-d)",
                                      }}
                                    >
                                      {s.label}
                                    </div>
                                    <div
                                      className="text-xs mt-0.5"
                                      style={{ color: "var(--brume)" }}
                                    >
                                      {s.sub}
                                    </div>
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>

                          {errors.stadeAvancement && (
                            <p
                              className="text-xs mt-2"
                              style={{ color: "var(--error)" }}
                            >
                              {errors.stadeAvancement.message}
                            </p>
                          )}
                        </div>

                        <Textarea
                          label="Composition de l'équipe"
                          placeholder="Présentez les membres de votre équipe et leurs rôles..."
                          rows={3}
                          {...register("equipe")}
                        />

                        <Button
                          type="submit"
                          loading={isSubmitting}
                          variant="savane"
                          fullWidth
                          size="lg"
                          className="group"
                        >
                          <span className="inline-flex items-center justify-center gap-2">
                            Soumettre ma candidature
                            <ArrowRight
                              size={16}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </span>
                        </Button>

                        {!session && (
                          <p
                            className="text-xs text-center flex items-center justify-center gap-1.5"
                            style={{ color: "var(--brume)" }}
                          >
                            <Users size={13} />
                            Vous devez être connecté pour postuler.{" "}
                            <a
                              href="/login"
                              className="font-semibold underline-offset-2 hover:underline"
                              style={{ color: "var(--savane)" }}
                            >
                              Se connecter
                            </a>
                          </p>
                        )}
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
