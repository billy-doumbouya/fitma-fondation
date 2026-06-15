"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui";
import { Linkedin, Sparkles, Award } from "lucide-react";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80";

export default function LaureatsGrid({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((l, i) => (
        <motion.div
          key={l.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.08,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ y: -4 }}
          className="card p-6 text-center overflow-hidden relative group"
        >
          {/* Accent décoratif en coin */}
          <div
            className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-[0.06] pointer-events-none transition-transform duration-500 group-hover:scale-125"
            style={{ background: "var(--savane)" }}
          />

          <div className="relative mx-auto mb-4 h-28 w-28 rounded-full overflow-hidden border-4 border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.14)]">
            <Image
              src={l.image || FALLBACK_IMG}
              alt={l.nom}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {/* Badge trophée flottant */}
            <div
              className="absolute bottom-1 right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: "var(--cauri-l)",
                boxShadow: "var(--sh-sm)",
              }}
            >
              <Award size={13} className="text-white" />
            </div>
          </div>

          <h3
            className="font-d font-bold text-base mb-1 relative z-10"
            style={{ color: "var(--encre)" }}
          >
            {l.nom}
          </h3>
          <p
            className="text-sm font-semibold mb-2 relative z-10"
            style={{ color: "var(--savane)" }}
          >
            {l.startup}
          </p>
          {l.promotion && (
            <Badge
              variant="gris"
              className="mb-3 inline-flex items-center gap-1.5"
            >
              <Sparkles size={10} />
              Promotion {l.promotion}
            </Badge>
          )}
          <p
            className="text-xs leading-relaxed relative z-10"
            style={{ color: "var(--ardoise)" }}
          >
            {l.description}
          </p>

          {l.linkedinUrl && (
            <a
              href={l.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold relative z-10 transition-colors hover:opacity-80"
              style={{ color: "var(--savane)" }}
            >
              <Linkedin size={13} />
              Voir le profil
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
}
