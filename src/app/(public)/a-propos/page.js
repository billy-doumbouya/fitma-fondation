"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle, Badge } from "@/components/ui";
import { EQUIPE, VALEURS, PARTENAIRES } from "@/constants/placeholders";
import { PartnerLogo } from "@/constants/logos";
import { useAnalytics } from "@/hooks";

export default function AProposPage() {
  useAnalytics("/a-propos");
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section section-savane relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url('/images/pattern-african.svg')",
            backgroundSize: "200px",
          }}
        />
        <div className="container-fitma relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
              style={{
                background: "rgba(249,168,37,.25)",
                color: "var(--cauri-l)",
                fontFamily: "var(--font-d)",
              }}
            >
              Notre Identité
            </span>
            <h1 className="text-h1 text-white mb-4">Qui Sommes-Nous ?</h1>
            <p className="text-white/75 max-w-2xl mx-auto text-base leading-relaxed">
              La Fondation Fitma est le bras philanthropique de{" "}
              <strong className="text-white">Fitma.africa</strong>. Nous croyons
              que l'avenir de l'Afrique passe par la formation,
              l'entrepreneuriat et la technologie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                style={{
                  background: "var(--savane-pale)",
                  color: "var(--savane-d)",
                  fontFamily: "var(--font-d)",
                }}
              >
                Notre Histoire
              </span>
              <h2 className="text-h2 mb-5" style={{ color: "var(--encre)" }}>
                Nés d'une Vision pour l'Afrique
              </h2>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--ardoise)" }}
              >
                La Fondation Fitma a été créée avec la conviction que chaque
                jeune Africain mérite d'avoir accès aux outils, aux savoirs et
                aux espaces pour transformer ses idées en réalité. Nous sommes
                le pont entre l'ambition et l'accomplissement.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--ardoise)" }}
              >
                À travers <strong>Fitma Academy</strong>, nous formons les
                entrepreneurs de demain. Avec <strong>Fitma Espace</strong>,
                nous leur offrons un cadre de travail professionnel et
                stimulant. Et grâce aux <strong>dons et partenariats</strong>,
                nous rendons tout cela accessible au plus grand nombre.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 rounded-3xl overflow-hidden"
              style={{ boxShadow: "var(--sh-lg)" }}
            >
              <Image
                src="/images/hero/hero-bg.jpg"
                alt="Fondation Fitma"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top,rgba(46,125,50,.5),transparent)",
                }}
              />
            </motion.div>
          </div>

          {/* Mission / Vision / Objectifs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                titre: "Notre Mission",
                icone: "🎯",
                texte:
                  "Démocratiser l'accès à la formation professionnelle, à l'incubation entrepreneuriale et aux espaces de travail de qualité pour la jeunesse africaine.",
              },
              {
                titre: "Notre Vision",
                icone: "🌟",
                texte:
                  "Une Afrique où chaque entrepreneur a les compétences, le réseau et les ressources pour construire des solutions qui impactent positivement sa communauté.",
              },
              {
                titre: "Notre Approche",
                icone: "🤝",
                texte:
                  "Pratique, inclusif et ancré dans les réalités locales. Nous croyons à l'apprentissage par l'action et au pouvoir de la communauté.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-8"
              >
                <span className="text-4xl mb-4 block">{item.icone}</span>
                <h3
                  className="font-d font-bold text-lg mb-3"
                  style={{ color: "var(--savane-d)" }}
                >
                  {item.titre}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--ardoise)" }}
                >
                  {item.texte}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section section-sable">
        <div className="container-fitma">
          <SectionTitle
            pretitle="Ce Qui Nous Guide"
            title="Nos Valeurs Fondamentales"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {VALEURS.map((v, i) => (
              <motion.div
                key={v.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card p-6 text-center"
              >
                <span className="text-4xl mb-3 block">{v.icone}</span>
                <h3
                  className="font-d font-bold text-base mb-2"
                  style={{ color: "var(--savane-d)" }}
                >
                  {v.titre}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--ardoise)" }}
                >
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="section">
        <div className="container-fitma">
          <SectionTitle
            pretitle="Notre Équipe"
            title="Les Personnes Derrière Fitma"
            subtitle="Une équipe passionnée, engagée pour l'avenir de l'Afrique numérique."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPE.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="relative mx-auto mb-4 h-28 w-28 rounded-full overflow-hidden border-4 border-white/15 shadow-[0_22px_60px_rgba(0,0,0,0.14)]">
                  <Image
                    src={m.image}
                    alt={m.nom}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <h3
                  className="font-d font-bold text-base"
                  style={{ color: "var(--encre)" }}
                >
                  {m.nom}
                </h3>
                <p
                  className="text-xs font-semibold mb-3"
                  style={{ color: "var(--savane)" }}
                >
                  {m.poste}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--ardoise)" }}
                >
                  {m.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="section section-sable">
        <div className="container-fitma">
          <SectionTitle
            pretitle="Ils nous font confiance"
            title="Nos Partenaires"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {PARTENAIRES.map((p, i) => (
              <motion.div
                key={p.nom}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card p-5 text-center"
              >
                <PartnerLogo logoKey={p.logoKey} label={p.nom} />
                <div className="mt-4">
                  <p
                    className="font-d font-semibold text-sm mb-2"
                    style={{ color: "var(--encre)" }}
                  >
                    {p.nom}
                  </p>
                  <Badge variant="gris" className="text-[9px]">
                    {p.type}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
