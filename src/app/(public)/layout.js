// src/app/(public)/layout.js
"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChatbotWidget, WhatsAppButton } from "@/components/widgets";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ChatbotWidget />
      <WhatsAppButton />
    </>
  );
}
