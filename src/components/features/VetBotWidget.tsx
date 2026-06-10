"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Tipos ──────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "ai";
  text: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const formatAIText = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^[-•]\s(.+)/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*<\/li>)/, "<ul class='pl-4 space-y-1 list-disc'>$1</ul>")
    .split("\n")
    .map((line) => (line.startsWith("<") ? line : line ? `<p>${line}</p>` : ""))
    .join("");
};

const QUICK_REPLIES = [
  "¿Es urgente?",
  "Vómitos y diarrea",
  "No quiere comer",
  "Está muy decaído",
];

// ── COMPONENTE PRINCIPAL ───────────────────────────────────────────────────────
export default function VetBotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [chatHistory, setChatHistory] = useState<
    { role: string; parts: { text: string }[] }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus al input cuando se abre
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasUnread(false);
    }
  }, [open]);

  // ── Iniciar chat con mensaje de bienvenida ─────────────────────────────────
  const iniciarChat = () => {
    if (started) return;
    setStarted(true);
    const bienvenida: Message = {
      role: "ai",
      text: "¡Hola! 🐾 Soy **VetBot**, el asistente veterinario de **Mimos Pet Club**.\n\nCuéntame qué le pasa a tu perro: nombre, síntomas, hace cuánto comenzaron...\n\n*Recuerda que soy una IA y no reemplazo a un veterinario presencial.*",
    };
    setMessages([bienvenida]);
    setChatHistory([{ role: "model", parts: [{ text: bienvenida.text }] }]);
  };

  const handleOpen = () => {
    setOpen(true);
    if (!started) iniciarChat();
  };

  // ── Enviar mensaje ─────────────────────────────────────────────────────────
  const enviarMensaje = async (texto?: string) => {
    const msgTexto = texto || input;
    if (!msgTexto.trim() || loading) return;

    const userMsg: Message = { role: "user", text: msgTexto };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const newHistory = [
      ...chatHistory,
      { role: "user", parts: [{ text: msgTexto }] },
    ];

    try {
      const res = await fetch("/api/vetbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgTexto, history: chatHistory }),
      });
      const data = await res.json();
      const aiText =
        data.text || data.error || "No pude procesar tu consulta.";
      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
      setChatHistory([
        ...newHistory,
        { role: "model", parts: [{ text: aiText }] },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Error de conexión. Intenta de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setChatHistory([]);
    setStarted(false);
    setInput("");
    iniciarChat();
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* ── Ventana del chat ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-[360px] sm:w-[380px] rounded-2xl border border-white/8 shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(10, 14, 26, 0.97)",
              backdropFilter: "blur(20px)",
              maxHeight: "min(600px, calc(100vh - 120px))",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-white/7 shrink-0"
              style={{ background: "rgba(15, 20, 35, 0.95)" }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-lg shrink-0">
                🐾
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    VetBot IA
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 font-medium tracking-wide">
                    BETA
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-white/35">En línea</span>
                </div>
              </div>

              {/* Botones header */}
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Nueva consulta"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/8 transition-all text-base"
                >
                  ↺
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/8 transition-all text-base"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xs shrink-0 mt-1">
                        🐾
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-emerald-500/18 border border-emerald-500/25 text-white rounded-tr-sm"
                          : "bg-white/5 border border-white/7 text-white/80 rounded-tl-sm"
                      }`}
                    >
                      {msg.role === "ai" ? (
                        <div
                          className="prose prose-invert prose-xs max-w-none [&_p]:mb-1 [&_strong]:text-white [&_ul]:mt-1"
                          dangerouslySetInnerHTML={{
                            __html: formatAIText(msg.text),
                          }}
                        />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xs shrink-0">
                    🐾
                  </div>
                  <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/7">
                    <div className="flex gap-1 items-center">
                      {[0, 0.18, 0.36].map((delay, i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400 block"
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.1, 0.8],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies — solo al inicio */}
            {messages.length === 1 && !loading && (
              <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide shrink-0">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => enviarMensaje(qr)}
                    className="shrink-0 text-[11px] px-3 py-1.5 rounded-full border border-white/10 bg-white/4 text-white/50 hover:bg-white/8 hover:text-white/80 hover:border-emerald-500/30 transition-all whitespace-nowrap"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-3 py-3 border-t border-white/7 flex gap-2 items-center shrink-0"
              style={{ background: "rgba(8, 11, 20, 0.9)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe los síntomas..."
                disabled={loading}
                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/40 focus:bg-white/7 transition-all disabled:opacity-40"
              />
              <button
                onClick={() => enviarMensaje()}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center text-white shrink-0"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            {/* Disclaimer */}
            <div className="px-4 py-2 border-t border-white/5 shrink-0">
              <p className="text-[10px] text-white/20 text-center leading-relaxed">
                ⚠️ Solo perros · No reemplaza consulta presencial
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tooltip "¿Tienes dudas sobre tu perro?" — solo cuando está cerrado ── */}
      <AnimatePresence>
        {!open && hasUnread && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ delay: 1.5 }}
            className="bg-white/95 dark:bg-gray-900/95 text-gray-800 dark:text-white text-xs px-4 py-2.5 rounded-2xl rounded-br-sm shadow-xl border border-white/20 max-w-[200px] text-center cursor-pointer"
            onClick={handleOpen}
            style={{ backdropFilter: "blur(12px)" }}
          >
            <span className="text-sm">🐾</span>{" "}
            <span>¿Le pasa algo a tu perro?</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB (botón flotante) ── */}
      <motion.button
        onClick={() => (open ? setOpen(false) : handleOpen())}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center text-white transition-shadow hover:shadow-emerald-500/50"
        aria-label={open ? "Cerrar VetBot" : "Abrir VetBot"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-xl leading-none"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="paw"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-2xl leading-none"
            >
              🐾
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notificación de bienvenida */}
        {!open && hasUnread && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-[#0a0e1a] text-[9px] flex items-center justify-center text-amber-900 font-bold"
          >
            1
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}