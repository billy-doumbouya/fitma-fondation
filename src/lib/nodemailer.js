// src/lib/nodemailer.js
import nodemailer from "nodemailer"

export const mailer = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || "smtp.gmail.com",
  port:   parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth:   { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

const FROM  = `"Fondation Fitma" <${process.env.SMTP_USER}>`
const ADMIN = process.env.ADMIN_EMAIL || "contact@fondationfitma.org"
const YEAR  = new Date().getFullYear()

function base(content) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/>
<style>
body{margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Arial,sans-serif}
.w{max-width:600px;margin:0 auto;padding:24px 16px}
.card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10)}
.hdr{background:linear-gradient(135deg,#1B5E20,#2E7D32);padding:32px;text-align:center}
.hdr h1{color:#FFF9C4;font-size:20px;margin:10px 0 4px;font-weight:700}
.hdr p{color:rgba(255,249,196,.7);font-size:13px;margin:0}
.ico{width:52px;height:52px;background:rgba(249,168,37,.25);border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:52px}
.bar{height:3px;background:linear-gradient(90deg,#2E7D32,#F9A825);margin:0 32px 24px}
.body{padding:32px}
.body h2{color:#1B5E20;font-size:18px;margin:0 0 16px;font-weight:700}
.body p{color:#4A4A4A;font-size:14px;line-height:1.7;margin:0 0 12px}
.field{background:#F5F0E8;border-radius:10px;padding:12px 16px;margin-bottom:10px}
.fl{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9E9E9E;margin-bottom:4px;font-weight:600}
.fv{font-size:14px;color:#1C1C1E}
.msg{background:#F5F0E8;border-left:4px solid #F9A825;border-radius:0 10px 10px 0;padding:14px 16px;margin:16px 0;font-size:14px;color:#4A4A4A;line-height:1.7}
.btn{display:inline-block;background:linear-gradient(135deg,#1B5E20,#2E7D32);color:white!important;text-decoration:none;padding:12px 28px;border-radius:50px;font-size:14px;font-weight:600;margin-top:16px}
.ok{background:#E8F5E9;border-radius:10px;padding:14px 16px;color:#1B5E20;font-size:13px;margin-top:16px}
.foot{padding:20px 32px;text-align:center;font-size:12px;color:#9E9E9E;border-top:1px solid #F5F0E8}
</style></head><body><div class="w"><div class="card">
<div class="hdr"><div class="ico">🌿</div><h1>Fondation Fitma</h1><p>fondationfitma.org · Conakry, Guinée</p></div>
<div class="bar"></div>
<div class="body">${content}</div>
<div class="foot">© ${YEAR} Fondation Fitma · <a href="https://www.fondationfitma.org" style="color:#2E7D32">fondationfitma.org</a></div>
</div></div></body></html>`
}

// ── Contact admin ─────────────────────────────────────────────
export function mailAdminContact({ prenom, nom, email, telephone, sujet, contenu }) {
  const html = base(`
    <h2>📬 Nouveau message</h2>
    <p>Un visiteur vous a envoyé un message depuis le site.</p>
    <div class="field"><div class="fl">De</div><div class="fv">${prenom} ${nom}</div></div>
    <div class="field"><div class="fl">Email</div><div class="fv"><a href="mailto:${email}" style="color:#2E7D32">${email}</a></div></div>
    ${telephone ? `<div class="field"><div class="fl">Tél</div><div class="fv">${telephone}</div></div>` : ""}
    <div class="field"><div class="fl">Sujet</div><div class="fv">${sujet}</div></div>
    <div class="msg">${contenu.replace(/\n/g,"<br/>")}</div>
    <a href="https://www.fondationfitma.org/admin/messages" class="btn">Voir dans l'admin</a>
  `)
  return { from:FROM, to:ADMIN, subject:`[Contact] ${sujet} — ${prenom} ${nom}`, html }
}

// ── Confirmation contact visiteur ─────────────────────────────
export function mailConfirmContact({ prenom, email }) {
  const html = base(`
    <h2>Merci, ${prenom} !</h2>
    <p>Nous avons bien reçu votre message. Notre équipe vous répondra sous 48 heures ouvrables.</p>
    <p>En attendant, découvrez <a href="https://www.fondationfitma.org/academy/formations" style="color:#2E7D32">nos formations</a> ou <a href="https://www.fondationfitma.org/espace" style="color:#2E7D32">nos espaces de coworking</a>.</p>
    <p>Cordialement,<br/><strong>L'équipe Fondation Fitma</strong></p>
  `)
  return { from:FROM, to:email, subject:"Nous avons bien reçu votre message — Fondation Fitma", html }
}

// ── Confirmation inscription formation ────────────────────────
export function mailConfirmInscription({ prenom, email, formation }) {
  const html = base(`
    <h2>🎓 Inscription confirmée !</h2>
    <p>Félicitations ${prenom}, votre inscription est confirmée.</p>
    <div class="field"><div class="fl">Formation</div><div class="fv"><strong>${formation.titre}</strong></div></div>
    <div class="field"><div class="fl">Durée</div><div class="fv">${formation.duree}</div></div>
    <div class="field"><div class="fl">Format</div><div class="fv">${formation.format}</div></div>
    <div class="ok">✅ Accédez à votre espace membre pour suivre votre progression.</div>
    <a href="https://www.fondationfitma.org/membre/mes-formations" class="btn">Accéder à ma formation</a>
  `)
  return { from:FROM, to:email, subject:`Inscription confirmée : ${formation.titre} — Fitma Academy`, html }
}

// ── Confirmation réservation espace ──────────────────────────
export function mailConfirmReservation({ prenom, email, espace, creneau, montant, qrCode }) {
  const html = base(`
    <h2>🏢 Réservation confirmée !</h2>
    <p>Votre réservation chez Fitma Espace est confirmée, ${prenom}.</p>
    <div class="field"><div class="fl">Espace</div><div class="fv"><strong>${espace.nom}</strong></div></div>
    <div class="field"><div class="fl">Date</div><div class="fv">${new Date(creneau.date).toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div></div>
    <div class="field"><div class="fl">Créneau</div><div class="fv">${creneau.type === "MATIN" ? "Matin (8h-13h)" : creneau.type === "APRES_MIDI" ? "Après-midi (13h-18h)" : "Journée complète"}</div></div>
    <div class="field"><div class="fl">Montant</div><div class="fv" style="font-weight:700;color:#1B5E20">${Number(montant).toLocaleString("fr-FR")} GNF</div></div>
    ${qrCode ? `<p style="margin-top:16px">Présentez ce QR code à l'accueil :</p><img src="${qrCode}" alt="QR Code" style="width:150px;margin:8px 0"/>` : ""}
    <div class="ok">⚠️ Annulation gratuite jusqu'à 24h avant. Après, remboursement partiel (50%).</div>
    <a href="https://www.fondationfitma.org/membre/mes-reservations" class="btn">Voir mes réservations</a>
  `)
  return { from:FROM, to:email, subject:"Réservation confirmée — Fitma Espace", html }
}

// ── Confirmation don ─────────────────────────────────────────
export function mailConfirmDon({ prenom, nom, email, montant, type, reference }) {
  const html = base(`
    <h2>🙏 Merci pour votre don, ${prenom} !</h2>
    <p>Votre générosité contribue directement au développement des entrepreneurs africains.</p>
    <div class="field"><div class="fl">Donateur</div><div class="fv">${prenom} ${nom}</div></div>
    <div class="field"><div class="fl">Montant</div><div class="fv" style="font-size:18px;font-weight:700;color:#1B5E20">${Number(montant).toLocaleString("fr-FR")} GNF</div></div>
    <div class="field"><div class="fl">Type</div><div class="fv">${type === "MENSUEL" ? "Don mensuel" : "Don unique"}</div></div>
    <div class="field"><div class="fl">Référence</div><div class="fv" style="font-family:monospace;font-size:13px">${reference}</div></div>
    <div class="field"><div class="fl">Date</div><div class="fv">${new Date().toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"})}</div></div>
    <div class="ok">✅ Ce document vaut reçu de don. Conservez-le pour vos archives.</div>
    <a href="https://www.fondationfitma.org" class="btn">Retourner sur le site</a>
  `)
  return { from:FROM, to:email, subject:`Reçu de votre don — Fondation Fitma`, html }
}

// ── Statut candidature ────────────────────────────────────────
export function mailStatutCandidature({ prenom, email, programme, statut }) {
  const msgs = {
    ACCEPTEE: { emoji:"🎉", titre:"Félicitations, vous êtes accepté !", texte:"Votre candidature au programme a été acceptée. Notre équipe vous contactera sous 48h pour les prochaines étapes." },
    REFUSEE:  { emoji:"😔", titre:"Candidature non retenue", texte:"Après examen attentif, votre candidature n'a pas été retenue pour cette session. Ne vous découragez pas, de nouvelles sessions ouvriront bientôt !" },
    EN_EVALUATION: { emoji:"⏳", titre:"Candidature en cours d'évaluation", texte:"Votre candidature est en cours d'évaluation par notre équipe. Nous vous informerons du résultat dans les 5 jours ouvrables." },
  }
  const m = msgs[statut] || msgs.EN_EVALUATION
  const html = base(`
    <h2>${m.emoji} ${m.titre}</h2>
    <div class="field"><div class="fl">Programme</div><div class="fv"><strong>${programme}</strong></div></div>
    <p>${m.texte}</p>
    <a href="https://www.fondationfitma.org/membre/mes-candidatures" class="btn">Voir mes candidatures</a>
  `)
  return { from:FROM, to:email, subject:`${m.emoji} Candidature ${programme} — Fondation Fitma`, html }
}
