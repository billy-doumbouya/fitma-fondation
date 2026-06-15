import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("Email obligatoire").email("Email invalide"),
  motDePasse: yup
    .string()
    .required("Mot de passe obligatoire")
    .min(6, "Minimum 6 caractères"),
});

export const inscriptionSchema = yup.object({
  prenom: yup.string().required("Prénom obligatoire").min(2),
  nom: yup.string().required("Nom obligatoire").min(2),
  email: yup.string().required("Email obligatoire").email("Email invalide"),
  telephone: yup.string().optional(),
  motDePasse: yup
    .string()
    .required("Mot de passe obligatoire")
    .min(8, "Minimum 8 caractères"),
  confirmerMdp: yup
    .string()
    .oneOf([yup.ref("motDePasse")], "Les mots de passe ne correspondent pas")
    .required(),
});

export const contactSchema = yup.object({
  prenom: yup.string().required("Prénom obligatoire").min(2),
  nom: yup.string().required("Nom obligatoire").min(2),
  email: yup.string().required("Email obligatoire").email("Email invalide"),
  telephone: yup.string().optional(),
  sujet: yup.string().required("Sujet obligatoire").min(5).max(100),
  contenu: yup.string().required("Message obligatoire").min(20).max(2000),
});

export const donSchema = yup.object({
  montant: yup
    .number()
    .required("Montant obligatoire")
    .positive()
    .min(10000, "Minimum 10 000 GNF"),
  montantCustom: yup.number().optional().positive(),
  prenom: yup.string().required("Prénom obligatoire").min(2),
  nom: yup.string().required("Nom obligatoire").min(2),
  email: yup
    .string()
    .required("Email obligatoire pour votre reçu")
    .email("Email invalide"),
  telephone: yup.string().optional(),
  type: yup.string().oneOf(["UNIQUE", "MENSUEL"]).default("UNIQUE"),
  accepteConditions: yup
    .boolean()
    .oneOf([true], "Veuillez accepter les conditions"),
});

export const candidatureSchema = yup.object({
  nomProjet: yup.string().required("Nom du projet obligatoire").min(3),
  descriptionProjet: yup
    .string()
    .required("Description obligatoire")
    .min(50, "Décrivez votre projet en au moins 50 caractères"),
  stadeAvancement: yup.string().required("Stade d'avancement obligatoire"),
  equipe: yup.string().optional(),
});

export const reservationSchema = yup.object({
  espaceId: yup.string().required("Espace obligatoire"),
  creneauId: yup.string().required("Créneau obligatoire"),
  notes: yup.string().optional().max(500),
});

export const formationAdminSchema = yup.object({
  titre: yup.string().required("Titre obligatoire").min(5).max(150),
  description: yup.string().required("Description obligatoire").min(20),
  categorie: yup.string().required("Catégorie obligatoire"),
  duree: yup.string().required("Durée obligatoire"),
  format: yup.string().oneOf(["EN_LIGNE", "PRESENTIEL", "HYBRIDE"]).required(),
  niveau: yup
    .string()
    .oneOf(["DEBUTANT", "INTERMEDIAIRE", "AVANCE"])
    .required(),
  prix: yup.number().min(0).default(0),
  gratuit: yup.boolean().default(false),
  publie: yup.boolean().default(false),
});

export const espaceAdminSchema = yup.object({
  nom: yup.string().required("Nom obligatoire").min(3),
  type: yup.string().oneOf(["COWORKING", "BUREAU", "SALLE"]).required(),
  description: yup.string().required("Description obligatoire").min(20),
  capacite: yup.number().optional().positive(),
  prixJour: yup.number().optional().min(0),
  prixDemi: yup.number().optional().min(0),
  prixMois: yup.number().optional().min(0),
});

export const articleAdminSchema = yup.object({
  titre: yup.string().required("Titre obligatoire").min(5).max(150),
  extrait: yup.string().required("Extrait obligatoire").min(20).max(300),
  contenu: yup.string().required("Contenu obligatoire").min(50),
  type: yup.string().oneOf(["ARTICLE", "COMMUNIQUE"]).default("ARTICLE"),
  publie: yup.boolean().default(false),
});
