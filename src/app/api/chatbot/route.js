// src/app/api/chatbot/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🚀 Sécurité pour le build Vercel avec Prisma
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages invalides" },
        { status: 400 },
      );
    }

    // 1. Récupération du prompt système en base de données
    const config = await prisma.chatbotConfig.findFirst({
      where: { actif: true },
    });
    const systemPrompt =
      config?.systemPrompt ||
      `Tu es l'assistant de la Fondation Fitma. Réponds en français, sois concis (3-4 phrases max).`;

    // 2. Formatage de l'historique des messages pour Google AI Studio
    // Google attend "user" ou "model" (OpenRouter envoyait "assistant")
    const formattedContents = messages.slice(-10).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const apiKey = process.env.GEMINI_API_KEY;

    // 3. Appel de l'URL Google AI Studio en fetch natif
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedContents,
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Google AI Studio Error Details:", errorText);
      throw new Error(`Google AI Studio error: ${res.status}`);
    }

    const data = await res.json();

    // 4. Extraction de la réponse textuelle de Gemini
    const message =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Désolé, je n'ai pas pu générer une réponse.";

    return NextResponse.json({ message });
  } catch (e) {
    console.error("Gemini Chatbot error:", e);
    return NextResponse.json(
      { message: "Une erreur est survenue. Contactez-nous directement." },
      { status: 500 },
    );
  }
}
