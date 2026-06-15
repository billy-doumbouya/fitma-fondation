const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Fondation Fitma...");

  // Admin
  const hash = await bcrypt.hash("fitma@admin2024!", 12);
  await prisma.admin.upsert({
    where: { email: "admin@fondationfitma.org" },
    update: {},
    create: { email: "admin@fondationfitma.org", password: hash },
  });
  console.log("✅ Admin: admin@fondationfitma.org / fitma@admin2024!");

  // Utilisateur de test
  const memberHash = await bcrypt.hash("membre2024!", 10);
  await prisma.utilisateur.upsert({
    where: { email: "test@membre.com" },
    update: {},
    create: {
      email: "test@membre.com",
      password: memberHash,
      nom: "Diallo",
      prenom: "Mamadou",
      role: "MEMBRE",
    },
  });
  console.log("✅ Membre de test: test@membre.com / membre2024!");

  // Config chatbot
  const existConfig = await prisma.chatbotConfig.findFirst();
  if (!existConfig) {
    await prisma.chatbotConfig.create({
      data: {
        systemPrompt: `Tu es l'assistant virtuel de la Fondation Fitma, le bras philanthropique de Fitma.africa.
Tu aides les visiteurs concernant :
- Fitma Academy : formations, incubation, accélération entrepreneuriale
- Fitma Espace : coworking, bureaux, salles de réunion à Conakry
- Dons et soutien à la fondation
- Actualités et événements
Réponds toujours en français (ou dans la langue du visiteur). Sois concis (3-4 phrases max).
Email: contact@fondationfitma.org | Site: fondationfitma.org | Conakry, Guinée`,
        actif: true,
      },
    });
  }

  // Infos contact
  const contacts = [
    { cle: "telephone", valeur: "+224 000 00 00 00" },
    { cle: "email", valeur: "contact@fondationfitma.org" },
    { cle: "adresse", valeur: "Conakry, République de Guinée" },
    { cle: "whatsapp", valeur: "+224 000 00 00 00" },
    { cle: "horaires", valeur: "Lundi – Vendredi : 8h00 – 18h00" },
    { cle: "academy_email", valeur: "academy@fondationfitma.org" },
    { cle: "espace_email", valeur: "espace@fondationfitma.org" },
  ];
  for (const c of contacts) {
    await prisma.contactInfo.upsert({
      where: { cle: c.cle },
      update: {},
      create: c,
    });
  }

  // Formations de démo
  const formations = [
    {
      titre: "Marketing Digital en Afrique",
      slug: "marketing-digital-afrique",
      categorie: "Marketing",
      niveau: "DEBUTANT",
      format: "PRESENTIEL",
      duree: "3 jours",
      prix: 150000,
      description:
        "Apprenez les fondamentaux du marketing digital adaptés au contexte africain : réseaux sociaux, SEO, publicité en ligne et stratégie de contenu.",
      objectifs: [
        "Maîtriser les outils du marketing digital",
        "Créer une stratégie adaptée au marché africain",
        "Gérer des campagnes publicitaires",
      ],
      gratuit: false,
      publie: true,
    },
    {
      titre: "Entrepreneuriat & Business Plan",
      slug: "entrepreneuriat-business-plan",
      categorie: "Entrepreneuriat",
      niveau: "DEBUTANT",
      format: "HYBRIDE",
      duree: "5 jours",
      prix: 200000,
      description:
        "De l'idée au business plan solide : apprenez à structurer votre projet, analyser le marché et convaincre des investisseurs.",
      objectifs: [
        "Structurer son idée d'entreprise",
        "Rédiger un business plan convaincant",
        "Préparer sa présentation investisseurs",
      ],
      gratuit: false,
      publie: true,
    },
    {
      titre: "Développement Web Full Stack",
      slug: "dev-web-full-stack",
      categorie: "Technologie",
      niveau: "INTERMEDIAIRE",
      format: "EN_LIGNE",
      duree: "8 semaines",
      prix: 0,
      description:
        "Formation complète au développement web : HTML, CSS, JavaScript, React et Node.js. Du front-end au back-end.",
      objectifs: [
        "Maîtriser HTML/CSS/JS",
        "Développer avec React",
        "Créer des APIs REST",
      ],
      gratuit: true,
      publie: true,
    },
    {
      titre: "Leadership & Management",
      slug: "leadership-management",
      categorie: "Leadership",
      niveau: "INTERMEDIAIRE",
      format: "PRESENTIEL",
      duree: "2 jours",
      prix: 300000,
      description:
        "Développez vos compétences de leadership pour diriger vos équipes avec efficacité et bienveillance.",
      objectifs: [
        "Développer son style de leadership",
        "Gérer les conflits",
        "Motiver ses équipes",
      ],
      gratuit: false,
      publie: true,
    },
  ];

  for (const f of formations) {
    const exist = await prisma.formation.findUnique({
      where: { slug: f.slug },
    });
    if (!exist) await prisma.formation.create({ data: f });
  }

  // Espaces
  const espaces = [
    {
      nom: "Open Space Coworking",
      type: "COWORKING",
      description:
        "Espace de travail partagé avec WiFi haut débit, café gratuit et ambiance de travail collaborative.",
      capacite: 30,
      equipements: ["WiFi 100Mbps", "Café/Thé", "Climatisation", "Casiers"],
      prixJour: 25000,
      prixMois: 400000,
    },
    {
      nom: "Bureau Privé - Petit",
      type: "BUREAU",
      description:
        "Bureau privé pour 1-2 personnes, idéal pour les freelances et petites équipes.",
      capacite: 2,
      superficie: 12,
      equipements: ["WiFi dédié", "Bureau", "Climatisation", "Coffre-fort"],
      prixJour: 80000,
      prixMois: 1200000,
    },
    {
      nom: "Salle de Réunion - 10 places",
      type: "SALLE",
      description:
        "Salle de réunion équipée pour vos présentations et formations en présentiel.",
      capacite: 10,
      superficie: 25,
      equipements: [
        "Vidéoprojecteur",
        "Tableau blanc",
        "WiFi",
        "Climatisation",
        "Eau",
      ],
      prixDemi: 100000,
      prixJour: 180000,
    },
    {
      nom: "Salle de Conférence - 30 places",
      type: "SALLE",
      description:
        "Grande salle pour vos conférences, pitch days et événements professionnels.",
      capacite: 30,
      superficie: 60,
      equipements: [
        "Écran LED",
        "Sonorisation",
        "WiFi",
        "Climatisation",
        "Podium",
      ],
      prixDemi: 250000,
      prixJour: 450000,
    },
  ];

  for (const e of espaces) {
    const exist = await prisma.espace.findFirst({ where: { nom: e.nom } });
    if (!exist) await prisma.espace.create({ data: e });
  }

  // Programmes
  const programmes = [
    {
      type: "INCUBATION",
      titre: "Fitma Incubation - Promotion 2025",
      description:
        "Programme d'incubation de 6 mois pour les porteurs de projets innovants en phase de démarrage.",
      criteres: [
        "Projet innovant à impact social ou économique",
        "Équipe motivée minimum 2 personnes",
        "Disponibilité à temps plein",
      ],
      avantages: [
        "Espace de travail gratuit 6 mois",
        "Mentorat personnalisé",
        "Accès au réseau Fitma",
        "Accès aux financements",
      ],
      duree: "6 mois",
      ouvert: true,
    },
    {
      type: "ACCELERATION",
      titre: "Fitma Boost - Accélération 2025",
      description:
        "Programme d'accélération de 3 mois pour les startups déjà lancées souhaitant scaler rapidement.",
      criteres: [
        "Startup existante avec revenus",
        "Produit/service validé marché",
        "Ambition de croissance régionale",
      ],
      avantages: [
        "Investissement potentiel",
        "Mise en relation investisseurs",
        "Coaching intensif",
        "Visibilité médiatique",
      ],
      duree: "3 mois",
      ouvert: true,
    },
  ];

  for (const p of programmes) {
    const exist = await prisma.programme.findFirst({
      where: { titre: p.titre },
    });
    if (!exist) await prisma.programme.create({ data: p });
  }

  // FAQs
  const faqs = [
    {
      question: "Comment s'inscrire à une formation ?",
      reponse:
        "Rendez-vous sur notre catalogue de formations, choisissez la formation souhaitée et cliquez sur 'S'inscrire'. Vous serez guidé pour créer votre compte et effectuer le paiement si nécessaire.",
      ordre: 1,
    },
    {
      question: "Les formations sont-elles certifiantes ?",
      reponse:
        "Oui, la plupart de nos formations délivrent une attestation de participation ou un certificat de compétence reconnu par Fitma.africa et ses partenaires.",
      ordre: 2,
    },
    {
      question: "Comment réserver un espace de coworking ?",
      reponse:
        "Créez votre compte, accédez à la section Fitma Espace, choisissez votre type d'espace et sélectionnez votre créneau. Le paiement s'effectue en ligne.",
      ordre: 3,
    },
    {
      question: "Puis-je visiter les locaux avant de réserver ?",
      reponse:
        "Absolument ! Contactez-nous pour planifier une visite découverte de nos espaces à Conakry.",
      ordre: 4,
    },
    {
      question: "Comment postuler au programme d'incubation ?",
      reponse:
        "Remplissez le formulaire de candidature en ligne avec votre pitch deck et business plan. Nos équipes vous contacteront sous 5 jours ouvrables.",
      ordre: 5,
    },
    {
      question:
        "Les formations en ligne sont-elles accessibles depuis partout ?",
      reponse:
        "Oui, nos formations en ligne sont accessibles depuis n'importe quel appareil connecté à Internet.",
      ordre: 6,
    },
  ];

  for (const f of faqs) {
    const exist = await prisma.faq.findFirst({
      where: { question: f.question },
    });
    if (!exist) await prisma.faq.create({ data: f });
  }

  console.log("🎉 Seed terminé avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
