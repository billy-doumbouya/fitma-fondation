"use client";
// src/components/widgets/ChatbotWidget.js
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      content:
        "Bonjour ! 👋 Je suis l'assistant de la Fondation Fitma. Je peux vous renseigner sur nos formations, espaces de coworking, ou comment faire un don. Comment puis-je vous aider ?",
      ts: new Date(),
    },
  ]);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  async function send() {
    if (!input.trim() || loading) return;
    const msg = { role: "user", content: input.trim(), ts: new Date() };
    setMsgs((p) => [...p, msg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...msgs, msg].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMsgs((p) => [
        ...p,
        { role: "assistant", content: data.message, ts: new Date() },
      ]);
    } catch {
      toast.error("Erreur de connexion avec l'assistant.");
      setMsgs((p) => [
        ...p,
        {
          role: "assistant",
          content:
            "Désolé, une erreur est survenue. Contactez-nous directement à contact@fondationfitma.org",
          ts: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const fmt = (d) =>
    new Date(d).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg,var(--savane-d),var(--savane))",
          boxShadow: "var(--sh-savane)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="b"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="animate-float"
            >
              <Bot size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
            style={{ background: "var(--cauri-d)" }}
          >
            1
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 20px 60px rgba(0,0,0,.2)",
              maxHeight: "70vh",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{
                background:
                  "linear-gradient(135deg,var(--savane-d),var(--savane))",
              }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/20">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="font-d font-bold text-sm text-white">
                  Assistant Fitma
                </p>
                <span className="flex items-center gap-1 text-xs text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  En ligne
                </span>
              </div>
            </div>
            {/* Messages */}
            <div
              className="overflow-y-auto p-4 space-y-3"
              style={{
                background: "var(--neige)",
                maxHeight: "45vh",
                minHeight: "200px",
              }}
            >
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                    style={{
                      background:
                        m.role === "assistant"
                          ? "var(--savane-pale)"
                          : "var(--savane)",
                      color:
                        m.role === "assistant" ? "var(--savane-d)" : "white",
                    }}
                  >
                    {m.role === "assistant" ? (
                      <Bot size={13} />
                    ) : (
                      <User size={13} />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className="px-3 py-2 rounded-2xl text-sm leading-relaxed"
                      style={{
                        background:
                          m.role === "assistant" ? "white" : "var(--savane)",
                        color:
                          m.role === "assistant" ? "var(--ardoise)" : "white",
                        boxShadow: "var(--sh-sm)",
                        borderTopLeftRadius:
                          m.role === "assistant" ? "4px" : "16px",
                        borderTopRightRadius:
                          m.role === "user" ? "4px" : "16px",
                      }}
                    >
                      {m.content}
                    </div>
                    <span className="text-[10px] mt-1 opacity-50">
                      {fmt(m.ts)}
                    </span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 items-center">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "var(--savane-pale)" }}
                  >
                    <Bot size={13} style={{ color: "var(--savane)" }} />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl"
                    style={{ background: "white", boxShadow: "var(--sh-sm)" }}
                  >
                    <Loader2
                      size={14}
                      className="animate-spin"
                      style={{ color: "var(--savane)" }}
                    />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
            {/* Input */}
            <div
              className="p-3 flex gap-2 items-center"
              style={{ background: "white", borderTop: "1px solid #F5F0E8" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Posez votre question..."
                disabled={loading}
                className="flex-1 text-sm px-3 py-2 rounded-xl border outline-none"
                style={{ borderColor: "#E0E0E0", color: "var(--encre)" }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0"
                style={{
                  background: input.trim() ? "var(--savane)" : "#E0E0E0",
                  color: input.trim() ? "white" : "var(--brume)",
                }}
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// src/components/widgets/WhatsAppButton.js
export function WhatsAppButton() {
  const num = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "224000000000")
    .replace(/\s+/g, "")
    .replace("+", "");
  const msg = encodeURIComponent(
    "Bonjour, je souhaite avoir des informations sur la Fondation Fitma.",
  );
  return (
    <motion.a
      href={`https://wa.me/${num}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center relative"
      style={{
        background: "#25D366",
        boxShadow: "0 4px 20px rgba(37,211,102,.4)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.522.658 4.888 1.808 6.94L2 30l7.258-1.782A13.922 13.922 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.256 19.482c-.342-.17-2.022-1-2.336-1.11-.314-.114-.542-.17-.77.17-.228.342-.884 1.11-1.084 1.338-.198.228-.398.256-.74.086-.342-.17-1.444-.532-2.75-1.694-1.016-.906-1.702-2.024-1.902-2.366-.2-.342-.022-.526.15-.696.154-.152.342-.398.514-.598.17-.2.228-.342.342-.57.114-.228.056-.428-.028-.598-.086-.17-.77-1.854-1.054-2.538-.278-.668-.56-.578-.77-.59-.198-.01-.426-.012-.654-.012-.228 0-.598.086-.912.428-.314.342-1.198 1.172-1.198 2.856 0 1.684 1.226 3.312 1.396 3.54.17.228 2.414 3.684 5.848 5.168.818.354 1.456.564 1.952.722.82.26 1.566.224 2.156.136.658-.1 2.022-.826 2.308-1.624.284-.798.284-1.482.198-1.624-.086-.142-.314-.228-.656-.398z" />
      </svg>
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-25"
        style={{ background: "#25D366" }}
      />
    </motion.a>
  );
}
