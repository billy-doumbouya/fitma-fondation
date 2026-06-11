// src/lib/stripe.js
// PLACEHOLDER — Sera remplacé par l'API Fitma Pay
// La structure des fonctions reste identique pour un swap facile

import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
})

// Créer une session de paiement (formation ou espace)
export async function createCheckoutSession({ type, itemId, itemNom, montant, devise, userId, email, successUrl, cancelUrl }) {
  // TODO: Remplacer par Fitma Pay API quand disponible
  // L'équipe Fitma fournira: endpoint, credentials, structure de requête

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    line_items: [{
      price_data: {
        currency: devise === "GNF" ? "gnf" : devise.toLowerCase(),
        product_data: { name: itemNom, metadata: { type, itemId } },
        unit_amount: Math.round(montant), // Stripe attend des centimes pour EUR/USD, unités pour GNF
      },
      quantity: 1,
    }],
    metadata: { type, itemId, userId: userId || "" },
    success_url: successUrl,
    cancel_url:  cancelUrl,
  })

  return { sessionId: session.id, url: session.url }
}

// Créer un intent de paiement pour don
export async function createDonSession({ montant, devise, email, successUrl, cancelUrl, type = "unique" }) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: type === "mensuel" ? "subscription" : "payment",
    customer_email: email,
    line_items: [{
      price_data: {
        currency: "eur", // Fallback EUR pour Stripe, Fitma Pay gérera GNF
        product_data: { name: "Don — Fondation Fitma" },
        unit_amount: Math.round(montant / 10000 * 100), // Conversion approximative GNF→EUR cents
        ...(type === "mensuel" ? { recurring: { interval: "month" } } : {}),
      },
      quantity: 1,
    }],
    success_url: successUrl,
    cancel_url:  cancelUrl,
  })

  return { sessionId: session.id, url: session.url }
}

// Vérifier un webhook Stripe
export function constructWebhookEvent(payload, signature) {
  return stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET)
}
