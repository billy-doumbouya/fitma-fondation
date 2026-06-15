"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  Heart,
  CheckCircle2,
  Shield,
  HandCoins,
  Sparkles,
  GraduationCap,
  Rocket,
  Receipt,
} from "lucide-react";
import { SectionTitle, Input, Button, Badge } from "@/components/ui";
import { donSchema } from "@/schemas";
import { MONTANTS_DONS } from "@/constants";
import { formatMontant } from "@/lib/utils";

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
          id="adinkraDons"
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
      <rect width="240" height="240" fill="url(#adinkraDons)" />
    </svg>
  );
}

export default function DonsPage() {
  const [montantSelect, setMontantSelect] = useState(100000);
  const [montantCustom, setMontantCustom] = useState("");
  const [typeDon, setTypeDon] = useState("UNIQUE");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(donSchema),
    defaultValues: {
      montant: 100000,
      type: "UNIQUE",
      accepteConditions: false,
    },
  });

  const montantFinal = montantCustom ? parseInt(montantCustom) : montantSelect;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "don",
          montant: montantFinal,
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          telephone: data.telephone,
          donType: typeDon,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      window.location.href = json.url;
    } catch (e) {
      toast.error(e.message || "Erreur lors du paiement.");
    } finally {
      setLoading(false);
    }
  };

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
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                delay: 0.1,
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
              <HandCoins
                size={36}
                style={{ color: "var(--cauri-l)" }}
                strokeWidth={1.75}
              />
            </motion.div>
            <h1 className="text-h1 text-white mb-4 tracking-tight">
              Soutenir la Fondation
            </h1>
            <p className="text-white/75 max-w-xl mx-auto">
              Votre don permet à des jeunes africains d'accéder à des formations
              de qualité et de concrétiser leurs projets entrepreneuriaux.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* -------- Formulaire don -------- */}
            <div className="lg:col-span-3">
              <div className="card p-6 sm:p-8 relative overflow-hidden">
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.06] pointer-events-none"
                  style={{ background: "var(--savane)" }}
                />

                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "var(--savane-pale)" }}
                  >
                    <Heart size={18} style={{ color: "var(--savane)" }} />
                  </div>
                  <h2
                    className="font-d font-bold text-xl"
                    style={{ color: "var(--encre)" }}
                  >
                    Faire un don
                  </h2>
                </div>

                {/* Type de don */}
                <div className="flex gap-3 mb-6 relative z-10">
                  {[
                    ["UNIQUE", "Don unique"],
                    ["MENSUEL", "Don mensuel"],
                  ].map(([v, l]) => (
                    <motion.button
                      key={v}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setTypeDon(v)}
                      className="flex-1 py-3 rounded-xl font-d font-semibold text-sm transition-all"
                      style={{
                        background:
                          typeDon === v ? "var(--savane)" : "var(--sable)",
                        color: typeDon === v ? "white" : "var(--ardoise)",
                        border: `2px solid ${typeDon === v ? "var(--savane)" : "transparent"}`,
                        boxShadow: typeDon === v ? "var(--sh-sm)" : "none",
                      }}
                    >
                      {l}
                    </motion.button>
                  ))}
                </div>

                {/* Montants suggérés */}
                <p
                  className="font-d font-semibold text-sm mb-3 relative z-10"
                  style={{ color: "var(--ardoise)" }}
                >
                  Choisissez un montant
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 relative z-10">
                  {MONTANTS_DONS.map((m) => {
                    const active = !montantCustom && montantSelect === m.valeur;
                    return (
                      <motion.button
                        key={m.valeur}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setMontantSelect(m.valeur);
                          setMontantCustom("");
                        }}
                        className="p-3 rounded-xl text-left transition-all"
                        style={{
                          background: active ? "var(--savane)" : "var(--sable)",
                          color: active ? "white" : "var(--ardoise)",
                          border: `2px solid ${active ? "var(--savane)" : "transparent"}`,
                          boxShadow: active ? "var(--sh-sm)" : "none",
                        }}
                      >
                        <p className="font-d font-bold text-sm">{m.label}</p>
                        <p className="text-xs opacity-75 mt-0.5">{m.desc}</p>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Montant libre */}
                <div className="mb-6 relative z-10">
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{
                      color: "var(--ardoise)",
                      fontFamily: "var(--font-d)",
                    }}
                  >
                    Ou saisissez un montant libre (GNF)
                  </label>
                  <input
                    type="number"
                    value={montantCustom}
                    onChange={(e) => {
                      setMontantCustom(e.target.value);
                      setMontantSelect(0);
                    }}
                    placeholder="Ex: 75000"
                    className="input-f"
                    min="10000"
                  />
                </div>

                {/* Montant final */}
                <motion.div
                  layout
                  className="p-4 rounded-xl mb-6 flex justify-between items-center relative z-10"
                  style={{ background: "var(--savane-pale)" }}
                >
                  <span
                    className="font-d font-semibold text-sm"
                    style={{ color: "var(--savane-d)" }}
                  >
                    Votre don {typeDon === "MENSUEL" ? "mensuel" : ""}
                  </span>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={montantFinal}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="font-d font-black text-xl"
                      style={{ color: "var(--savane-d)" }}
                    >
                      {formatMontant(montantFinal)}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>

                {/* Infos personnelles */}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(249,168,37,.14)" }}
                  >
                    <Sparkles size={16} style={{ color: "var(--cauri-d)" }} />
                  </div>
                  <h3
                    className="font-d font-semibold text-base"
                    style={{ color: "var(--encre)" }}
                  >
                    Vos informations
                  </h3>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="relative z-10"
                >
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Prénom"
                      placeholder="Mamadou"
                      required
                      error={errors.prenom?.message}
                      {...register("prenom")}
                    />
                    <Input
                      label="Nom"
                      placeholder="Diallo"
                      required
                      error={errors.nom?.message}
                      {...register("nom")}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="mamadou@email.com"
                      required
                      error={errors.email?.message}
                      {...register("email")}
                    />
                    <Input
                      label="Téléphone"
                      type="tel"
                      placeholder="+224 000 00 00 00"
                      {...register("telephone")}
                    />
                  </div>
                  <label className="flex items-start gap-3 mb-6 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5"
                      {...register("accepteConditions")}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "var(--ardoise)" }}
                    >
                      J'accepte que la Fondation Fitma conserve mes informations
                      pour l'envoi du reçu et des communications liées à mon
                      don.
                    </span>
                  </label>
                  {errors.accepteConditions && (
                    <p
                      className="text-xs mb-4 flex items-center gap-1.5"
                      style={{ color: "var(--error)" }}
                    >
                      <Shield size={12} />
                      {errors.accepteConditions.message}
                    </p>
                  )}

                  <Button
                    type="submit"
                    loading={loading}
                    variant="savane"
                    fullWidth
                    size="lg"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <Heart size={18} />
                      Faire un don de {formatMontant(montantFinal)}
                    </span>
                  </Button>

                  <div
                    className="mt-4 flex items-center justify-center gap-2 text-xs"
                    style={{ color: "var(--brume)" }}
                  >
                    <Shield size={13} />
                    Paiement 100% sécurisé — Reçu envoyé par email
                  </div>
                </form>
              </div>
            </div>

            {/* -------- Sidebar impact -------- */}
            <div className="lg:col-span-2 space-y-5">
              <div className="card p-6 relative overflow-hidden">
                <div
                  className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-[0.06] pointer-events-none"
                  style={{ background: "var(--savane)" }}
                />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "var(--savane-pale)" }}
                  >
                    <GraduationCap
                      size={18}
                      style={{ color: "var(--savane)" }}
                    />
                  </div>
                  <h3
                    className="font-d font-bold text-lg"
                    style={{ color: "var(--encre)" }}
                  >
                    Votre impact
                  </h3>
                </div>
                <div className="space-y-4 relative z-10">
                  {MONTANTS_DONS.map((m) => (
                    <div key={m.valeur} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "var(--savane-pale)" }}
                      >
                        <CheckCircle2
                          size={16}
                          style={{ color: "var(--savane)" }}
                        />
                      </div>
                      <div>
                        <p
                          className="font-d font-bold text-sm"
                          style={{ color: "var(--encre)" }}
                        >
                          {m.label}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--ardoise)" }}
                        >
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="card p-6 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,var(--savane-d),var(--savane))",
                }}
              >
                <MotifAdinkra
                  className="absolute -bottom-10 -right-10 w-40 h-40 opacity-[0.08] pointer-events-none"
                  color="var(--cauri-l)"
                />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,255,255,.12)" }}
                  >
                    <Receipt size={18} className="text-white" />
                  </div>
                  <h3 className="font-d font-bold text-lg text-white">
                    Transparence financière
                  </h3>
                </div>
                <p className="text-sm text-white/80 mb-4 relative z-10">
                  100% de votre don va directement aux programmes de formation
                  et d'accompagnement.
                </p>
                <div className="space-y-2 relative z-10">
                  {[
                    ["Formations & bourses", "60%"],
                    ["Incubation & accompagnement", "25%"],
                    ["Frais administratifs", "15%"],
                  ].map(([l, v], idx) => (
                    <div key={l}>
                      <div className="flex justify-between text-xs text-white/80 mb-1">
                        <span>{l}</span>
                        <span className="font-bold text-white">{v}</span>
                      </div>
                      <div
                        className="w-full rounded-full h-1.5 overflow-hidden"
                        style={{ background: "rgba(255,255,255,.2)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: v }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: idx * 0.15,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-1.5 rounded-full"
                          style={{ background: "var(--cauri-l)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encadré confiance additionnel */}
              <div
                className="card p-5 flex items-start gap-3"
                style={{ background: "var(--sable)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "white" }}
                >
                  <Rocket size={16} style={{ color: "var(--savane)" }} />
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--ardoise)" }}
                >
                  Depuis sa création, la Fondation Fitma a permis à des
                  centaines d'entrepreneurs africains de transformer leurs idées
                  en projets concrets grâce à la générosité de donateurs comme
                  vous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
