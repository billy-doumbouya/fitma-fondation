"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  Wifi,
  Coffee,
  Monitor,
  Sparkles,
} from "lucide-react";
import { Badge, Button, EmptyState } from "@/components/ui";
import { formatMontant, formatDate } from "@/lib/utils";

const CRENEAU_LABEL = {
  MATIN: "Matin (8h–13h)",
  APRES_MIDI: "Après-midi (13h–18h)",
  JOURNEE: "Journée complète",
};

/* Icônes équipements — fallback générique si non reconnu */
const EQUIP_ICONS = {
  wifi: Wifi,
  "wi-fi": Wifi,
  internet: Wifi,
  café: Coffee,
  cafe: Coffee,
  boissons: Coffee,
  écran: Monitor,
  ecran: Monitor,
  projecteur: Monitor,
};

function EquipIcon({ label, ...props }) {
  const key = label?.toLowerCase().trim();
  const Icon =
    Object.entries(EQUIP_ICONS).find(([k]) => key?.includes(k))?.[1] ||
    Sparkles;
  return <Icon {...props} />;
}

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
          id="adinkraEspace"
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
      <rect width="240" height="240" fill="url(#adinkraEspace)" />
    </svg>
  );
}

const HERO_IMG =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80";

export default function EspaceDetailClient({
  espaces,
  type,
  titre,
  desc,
  emoji,
  icon,
}) {
  const [selectedEspace, setSelectedEspace] = useState(espaces[0] || null);
  const [selectedCreneau, setSelectedCreneau] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  async function handleReservation() {
    if (!session) {
      router.push("/login");
      return;
    }
    if (!selectedCreneau) {
      toast.error("Veuillez sélectionner un créneau.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creneauId: selectedCreneau.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Réservation confirmée ! Vérifiez votre email.");
      setSelectedCreneau(null);
      router.refresh();
    } catch (e) {
      toast.error(e.message || "Erreur lors de la réservation.");
    } finally {
      setLoading(false);
    }
  }

  const montant = selectedCreneau
    ? selectedCreneau.type === "JOURNEE"
      ? selectedEspace?.prixJour
      : selectedEspace?.prixDemi
    : null;

  return (
    <main className="pt-20">
      {/* ---------------- HERO ---------------- */}
      <section className="section section-nuit relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt=""
            fill
            className="object-cover opacity-25"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15,20,30,.55), var(--nuit) 90%)",
            }}
          />
        </div>
        <MotifAdinkra
          className="absolute -top-12 -right-12 w-72 h-72 opacity-[0.06] pointer-events-none"
          color="var(--cauri-l)"
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
              <Building2
                size={36}
                style={{ color: "var(--cauri-l)" }}
                strokeWidth={1.75}
              />
            </motion.div>
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full border"
              style={{
                background: "rgba(249,168,37,.12)",
                borderColor: "rgba(249,168,37,.3)",
                color: "var(--cauri-l)",
                fontFamily: "var(--font-d)",
              }}
            >
              <Sparkles size={13} />
              Fitma Espace
            </span>
            <h1 className="text-h1 text-white mb-4 tracking-tight">{titre}</h1>
            <p className="text-white/75 max-w-xl mx-auto">{desc}</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-fitma">
          {espaces.length === 0 ? (
            <EmptyState
              icon={<Building2 size={40} style={{ color: "var(--savane)" }} />}
              title="Aucun espace disponible"
              description="Revenez bientôt ou contactez-nous."
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* -------- Sélection espace -------- */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "var(--savane-pale)" }}
                  >
                    <Building2 size={18} style={{ color: "var(--savane)" }} />
                  </div>
                  <h2
                    className="font-d font-bold text-lg"
                    style={{ color: "var(--encre)" }}
                  >
                    Choisir un espace
                  </h2>
                </div>

                {espaces.map((e, i) => {
                  const active = selectedEspace?.id === e.id;
                  return (
                    <motion.button
                      key={e.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -2 }}
                      onClick={() => {
                        setSelectedEspace(e);
                        setSelectedCreneau(null);
                      }}
                      className="w-full text-left card p-4 transition-all relative overflow-hidden"
                      style={{
                        border: active
                          ? "2px solid var(--savane)"
                          : "2px solid transparent",
                      }}
                    >
                      {active && (
                        <div
                          className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-[0.08] pointer-events-none"
                          style={{ background: "var(--savane)" }}
                        />
                      )}
                      <div className="flex justify-between items-start mb-2 relative z-10">
                        <h3
                          className="font-d font-bold text-sm"
                          style={{ color: "var(--encre)" }}
                        >
                          {e.nom}
                        </h3>
                        <Badge
                          variant="savane"
                          className="text-[10px] inline-flex items-center gap-1"
                        >
                          <Users size={10} />
                          {e.capacite} pers.
                        </Badge>
                      </div>
                      <p
                        className="text-xs mb-3 relative z-10"
                        style={{ color: "var(--ardoise)" }}
                      >
                        {e.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3 relative z-10">
                        {e.equipements?.slice(0, 3).map((eq) => (
                          <span
                            key={eq}
                            className="badge badge-gris text-[9px] inline-flex items-center gap-1"
                          >
                            <EquipIcon label={eq} size={10} />
                            {eq}
                          </span>
                        ))}
                      </div>
                      <div className="relative z-10">
                        {e.prixJour && (
                          <p
                            className="text-xs font-semibold"
                            style={{ color: "var(--savane)" }}
                          >
                            {formatMontant(e.prixJour)} / jour
                          </p>
                        )}
                        {e.prixDemi && (
                          <p
                            className="text-xs"
                            style={{ color: "var(--brume)" }}
                          >
                            {formatMontant(e.prixDemi)} / demi-journée
                          </p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* -------- Sélection créneau -------- */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "var(--savane-pale)" }}
                  >
                    <Calendar size={18} style={{ color: "var(--savane)" }} />
                  </div>
                  <h2
                    className="font-d font-bold text-lg"
                    style={{ color: "var(--encre)" }}
                  >
                    Choisir un créneau
                  </h2>
                </div>

                {!selectedEspace ? (
                  <div className="card p-8 text-center">
                    <p style={{ color: "var(--brume)" }}>
                      Sélectionnez un espace pour voir les disponibilités.
                    </p>
                  </div>
                ) : selectedEspace.creneaux?.length === 0 ? (
                  <div className="card p-8 text-center">
                    <Clock
                      size={28}
                      className="mx-auto mb-2"
                      style={{ color: "var(--brume)" }}
                    />
                    <p style={{ color: "var(--brume)" }}>
                      Aucun créneau disponible actuellement.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                      {selectedEspace.creneaux?.map((c, i) => {
                        const active = selectedCreneau?.id === c.id;
                        return (
                          <motion.button
                            key={c.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedCreneau(c)}
                            className="p-4 rounded-2xl text-left transition-all"
                            style={{
                              background: active ? "var(--savane)" : "white",
                              color: active ? "white" : "var(--ardoise)",
                              border: `2px solid ${active ? "var(--savane)" : "var(--ligne)"}`,
                              boxShadow: "var(--sh-sm)",
                            }}
                          >
                            <p className="font-d font-bold text-xs mb-1 flex items-center gap-1.5">
                              <Calendar
                                size={12}
                                className={active ? "opacity-90" : "opacity-50"}
                              />
                              {formatDate(c.date, {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })}
                            </p>
                            <p className="text-xs flex items-center gap-1.5">
                              <Clock
                                size={12}
                                className={active ? "opacity-90" : "opacity-50"}
                              />
                              {CRENEAU_LABEL[c.type]}
                            </p>
                            <p className="text-xs mt-1 font-semibold">
                              {formatMontant(
                                c.type === "JOURNEE"
                                  ? selectedEspace.prixJour
                                  : selectedEspace.prixDemi,
                              )}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {selectedCreneau && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="card p-5 border-2 relative overflow-hidden"
                          style={{ borderColor: "var(--savane)" }}
                        >
                          <div
                            className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.06] pointer-events-none"
                            style={{ background: "var(--savane)" }}
                          />
                          <h3
                            className="font-d font-bold mb-3 flex items-center gap-2 relative z-10"
                            style={{ color: "var(--encre)" }}
                          >
                            <CheckCircle2
                              size={18}
                              style={{ color: "var(--savane)" }}
                            />
                            Récapitulatif
                          </h3>
                          <div className="space-y-2 mb-4 text-sm relative z-10">
                            <div className="flex justify-between">
                              <span style={{ color: "var(--ardoise)" }}>
                                Espace
                              </span>
                              <span className="font-semibold">
                                {selectedEspace.nom}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span style={{ color: "var(--ardoise)" }}>
                                Date
                              </span>
                              <span className="font-semibold">
                                {formatDate(selectedCreneau.date)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span style={{ color: "var(--ardoise)" }}>
                                Créneau
                              </span>
                              <span className="font-semibold">
                                {CRENEAU_LABEL[selectedCreneau.type]}
                              </span>
                            </div>
                            <div
                              className="flex justify-between items-center text-base pt-2 border-t"
                              style={{ borderColor: "var(--ligne)" }}
                            >
                              <span style={{ color: "var(--ardoise)" }}>
                                Total
                              </span>
                              <span
                                className="font-d font-black text-lg"
                                style={{ color: "var(--savane)" }}
                              >
                                {formatMontant(montant)}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={handleReservation}
                            loading={loading}
                            variant="savane"
                            fullWidth
                            size="lg"
                            className="relative z-10 group"
                          >
                            <span className="inline-flex items-center justify-center gap-2">
                              Confirmer la réservation
                              <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                              />
                            </span>
                          </Button>
                          {!session && (
                            <p
                              className="text-xs text-center mt-2 relative z-10"
                              style={{ color: "var(--brume)" }}
                            >
                              Connexion requise.{" "}
                              <a
                                href="/login"
                                className="font-semibold underline-offset-2 hover:underline"
                                style={{ color: "var(--savane)" }}
                              >
                                Se connecter
                              </a>
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
