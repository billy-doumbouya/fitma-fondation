// src/app/api/payment/webhook/route.js
import { NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import {
  mailer,
  mailConfirmDon,
  mailConfirmInscription,
} from "@/lib/nodemailer";

export async function POST(req) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;
  try {
    event = constructWebhookEvent(payload, signature);
  } catch (e) {
    return NextResponse.json(
      { error: "Webhook signature invalide" },
      { status: 400 },
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const sess = event.data.object;
      const meta = sess.metadata || {};

      // Confirmer un don
      if (meta.type === "don" || !meta.type) {
        const don = await prisma.don.findFirst({
          where: { stripeSessionId: sess.id },
        });
        if (don) {
          await prisma.don.update({
            where: { id: don.id },
            data: { statut: "CONFIRME", stripePaymentId: sess.payment_intent },
          });
          mailer
            .sendMail(
              mailConfirmDon({
                prenom: don.prenom,
                nom: don.nom,
                email: don.email,
                montant: don.montant,
                type: don.type,
                reference: don.reference,
              }),
            )
            .catch(console.error);
        }
      }

      // Confirmer une inscription formation
      if (meta.type === "formation" && meta.itemId && meta.userId) {
        const formation = await prisma.formation.findUnique({
          where: { id: meta.itemId },
        });
        const utilisateur = meta.userId
          ? await prisma.utilisateur.findUnique({ where: { id: meta.userId } })
          : null;

        const inscription = await prisma.inscription.upsert({
          where: {
            utilisateurId_formationId: {
              utilisateurId: meta.userId,
              formationId: meta.itemId,
            },
          },
          update: {
            statut: "CONFIRME",
            paiementId: sess.payment_intent,
            montantPaye: formation?.prix,
          },
          create: {
            utilisateurId: meta.userId,
            formationId: meta.itemId,
            statut: "CONFIRME",
            paiementId: sess.payment_intent,
            montantPaye: formation?.prix,
          },
        });

        if (utilisateur && formation) {
          mailer
            .sendMail(
              mailConfirmInscription({
                prenom: utilisateur.prenom,
                email: utilisateur.email,
                formation,
              }),
            )
            .catch(console.error);
        }
      }
    }
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Webhook processing error:", e);
    return NextResponse.json({ error: "Erreur traitement" }, { status: 500 });
  }
}

// La ligne "export const config" obsolète a été supprimée d'ici !
