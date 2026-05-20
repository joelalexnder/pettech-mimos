"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate, stagger } from "animejs";
import SeccionProductos from "@/components/features/SeccionProductos";
import PawParticles from "@/components/ui/PawParticles";

// ── Tipos ──────────────────────────────────────────────────────────────────────
type Mode = "selector" | "chat" | "form";
type Step = "nombre" | "edad" | "sintomas" | "duracion" | "consultando" | "resultado";

interface Message { role: "user" | "ai"; text: string; }
interface FormData {
  nombre: string; edad: string; raza: string;
  sintomas: string[]; duracion: string; descripcionExtra: string;
}


const SINTOMAS_OPCIONES = [
  "Vómitos", "Diarrea", "Pérdida de apetito", "Letargia / cansancio",
  "Picazón / rascado excesivo", "Estornudos / secreción nasal", "Cojera",
  "Pérdida de pelo", "Ojos rojos o con legañas", "Tos persistente",
  "Orina con sangre", "Distensión abdominal", "Sed excesiva",
  "Pérdida de peso", "Convulsiones", "Dificultad para respirar",
];

const DURACIONES = [
  "Menos de 24 horas", "1-3 días", "3-7 días",
  "Más de una semana", "Crónico (más de un mes)",
];

const FORM_DATA_INITIAL: FormData = {
  nombre: "", edad: "", raza: "", sintomas: [], duracion: "", descripcionExtra: "",
};

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/40 focus:bg-white/8 transition-all";

// ── Subcomponentes ─────────────────────────────────────────────────────────────
function FormStep({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-white/40 text-sm">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  );
}

function NextButton({ onClick, disabled = false, label = "Siguiente →", primary = false }: {
  onClick: () => void; disabled?: boolean; label?: string; primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
        primary
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white"
          : "border border-white/15 bg-white/5 hover:bg-white/10 text-white"
      }`}
    >
      {label}
    </button>
  );
}

// ── COMPONENTE PRINCIPAL ───────────────────────────────────────────────────────
export default function VetIA() {
  const [mode, setMode] = useState<Mode>("selector");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: string; parts: { text: string }[] }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<Step>("nombre");
  const [formData, setFormData] = useState<FormData>(FORM_DATA_INITIAL);
  const [resultadoForm, setResultadoForm] = useState("");


  // ── Refs Anime.js ──────────────────────────────────────────────────────────
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const warningRef = useRef<HTMLDivElement>(null);

  // ── Anime.js: hero ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (mode !== "selector") return;

    const timeout = setTimeout(() => {
      if (badgeRef.current) {
        animate(badgeRef.current, {
          opacity: [0, 1], translateY: [-20, 0],
          duration: 700, ease: "outExpo", delay: 100,
        });
      }
      if (titleRef.current) {
        animate(titleRef.current, {
          opacity: [0, 1], translateY: [40, 0],
          duration: 900, ease: "outExpo", delay: 250,
        });
      }
      if (subtitleRef.current) {
        animate(subtitleRef.current, {
          opacity: [0, 1], translateY: [20, 0],
          duration: 800, ease: "outExpo", delay: 400,
        });
      }
      const cards = document.querySelectorAll(".vet-card");
      if (cards.length > 0) {
        animate(".vet-card", {
          opacity: [0, 1], translateY: [50, 0], scale: [0.95, 1],
          duration: 800, ease: "outExpo",
          delay: stagger(150, { start: 550 }),
        });
      }
      if (warningRef.current) {
        animate(warningRef.current, {
          opacity: [0, 1], translateY: [20, 0],
          duration: 700, ease: "outExpo", delay: 900,
        });
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [mode]);

  // ── Anime.js: form steps ───────────────────────────────────────────────────
  useEffect(() => {
    if (mode !== "form") return;
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll(".form-step-indicator");
      if (elements.length === 0) return;
      animate(".form-step-indicator", {
        scale: [0.8, 1], opacity: [0, 1],
        duration: 500, ease: "outBack",
        delay: stagger(80),
      });
    }, 50);
    return () => clearTimeout(timeout);
  }, [step, mode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const resetForm = () => {
    setStep("nombre");
    setFormData(FORM_DATA_INITIAL);
    setResultadoForm("");
  };

  const formatAIText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^[-•]\s(.+)/gm, "<li>$1</li>")
      .replace(/(<li>[\s\S]*<\/li>)/, "<ul>$1</ul>")
      .split("\n")
      .map(line => (line.startsWith("<") ? line : `<p>${line}</p>`))
      .join("");
  };

  // ── Chat ───────────────────────────────────────────────────────────────────
  const iniciarChat = async () => {
    setMode("chat");
    const bienvenida: Message = {
      role: "ai",
      text: "¡Hola! 🐾 Soy VetBot, tu asistente veterinario IA. Cuéntame qué le pasa a tu perro: nombre, síntomas, hace cuánto comenzaron...",
    };
    setMessages([bienvenida]);
    setChatHistory([{ role: "model", parts: [{ text: bienvenida.text }] }]);
  };

  const enviarMensaje = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    const newHistory = [...chatHistory, { role: "user", parts: [{ text: input }] }];
    try {
      const res = await fetch("/api/vetbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: chatHistory }),
      });
      const data = await res.json();
      const aiText = data.text || data.error || "No pude procesar tu consulta.";
      setMessages(prev => [...prev, { role: "ai", text: aiText }]);
      setChatHistory([...newHistory, { role: "model", parts: [{ text: aiText }] }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "⚠️ Error de conexión." }]);
    } finally {
      setLoading(false);
    }
  };

  // ── Formulario ─────────────────────────────────────────────────────────────
  const toggleSintoma = (s: string) => {
    setFormData(prev => ({
      ...prev,
      sintomas: prev.sintomas.includes(s)
        ? prev.sintomas.filter(x => x !== s)
        : [...prev.sintomas, s],
    }));
  };

  const consultarFormulario = async () => {
    setStep("consultando");
    try {
      const res = await fetch("/api/vetbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      const data = await res.json();
      setResultadoForm(data.text || data.error || "No se pudo generar el análisis.");
    } catch {
      setResultadoForm("⚠️ Error de conexión.");
    } finally {
      setStep("resultado");
    }
  };


  const STEPS_LIST: Step[] = ["nombre", "edad", "sintomas", "duracion"];
  const STEPS_LABELS = ["Datos", "Edad", "Síntomas", "Duración"];
  const currentStepIndex = STEPS_LIST.indexOf(step);

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      <PawParticles />

      <section className="relative min-h-screen text-white font-sans overflow-hidden">

        {/* ── FONDO: veterinario con perro ── */}
        <div className="fixed inset-0 z-0">
          {/* Foto libre de derechos: veterinario examinando perro - Karsten Winegeart / Unsplash */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=1920&q=80')`,
              filter: "brightness(0.22) saturate(0.8)",
            }}
          />
          {/* Gradiente oscuro encima */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-[#0a0e1a]/98" />
          {/* Tinte verde esmeralda sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-transparent to-teal-950/20" />
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-white/5 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-base">
              🐾
            </div>
            <div>
              <span className="font-semibold text-sm tracking-tight">VetBot IA</span>
              <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                BETA
              </span>
            </div>
          </div>
          {mode !== "selector" && (
            <button
              onClick={() => { setMode("selector"); setMessages([]); setChatHistory([]); resetForm(); }}
              className="text-xs text-white/40 hover:text-white/80 transition-colors"
            >
              ← Volver
            </button>
          )}
        </header>

        <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">

            {/* ── SELECTOR ── */}
            {mode === "selector" && (
              <motion.div key="selector" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>

                <div className="text-center mb-12">
                  <div
                    ref={badgeRef}
                    style={{ opacity: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs mb-6"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Asistente veterinario disponible
                  </div>

                  <h1
                    ref={titleRef}
                    style={{ opacity: 0 }}
                    className="text-5xl sm:text-7xl font-black mb-4 tracking-tight uppercase leading-none"
                  >
                    Consulta
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Veterinaria
                    </span>
                    <br />
                    <span
                      className="text-white/10"
                      style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                    >
                      IA
                    </span>
                  </h1>

                  <p
                    ref={subtitleRef}
                    style={{ opacity: 0 }}
                    className="text-white/50 text-base max-w-md mx-auto leading-relaxed"
                  >
                    Describe los síntomas de tu perro y nuestro veterinario IA
                    te orientará al instante. Al finalizar, te recomienda
                    productos de nuestra tienda.
                  </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={iniciarChat}
                    className="vet-card group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-left"
                    style={{ opacity: 0 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 border border-emerald-500/30 flex items-center justify-center text-xl mb-4">
                      💬
                    </div>
                    <h3 className="font-semibold text-base mb-1">Chat libre</h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      Cuéntale directamente al veterinario IA qué le pasa a tu perro.
                    </p>
                    <div className="mt-4 text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Comenzar chat →
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMode("form")}
                    className="vet-card group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-left"
                    style={{ opacity: 0 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400/20 to-cyan-400/20 border border-teal-500/30 flex items-center justify-center text-xl mb-4">
                      📋
                    </div>
                    <h3 className="font-semibold text-base mb-1">Formulario guiado</h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      Responde preguntas paso a paso para un análisis más preciso.
                    </p>
                    <div className="mt-4 text-xs text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Iniciar formulario →
                    </div>
                  </motion.button>
                </div>

                <div
                  ref={warningRef}
                  style={{ opacity: 0 }}
                  className="mt-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm flex gap-3"
                >
                  <span className="text-amber-400 text-sm mt-0.5 shrink-0">⚠️</span>
                  <p className="text-white/40 text-xs leading-relaxed">
                    VetBot es un asistente informativo. No reemplaza la consulta
                    presencial con un veterinario certificado. En emergencias,
                    visita la clínica inmediatamente.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── CHAT ── */}
            {mode === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col"
                style={{ height: "calc(100vh - 140px)" }}
              >
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {msg.role === "ai" && (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-sm shrink-0 mt-0.5">
                          🐾
                        </div>
                      )}
                      <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm ${
                        msg.role === "user"
                          ? "bg-emerald-500/20 border border-emerald-500/30 text-white ml-auto rounded-tr-sm"
                          : "bg-white/5 border border-white/8 text-white/85 rounded-tl-sm"
                      }`}>
                        {msg.role === "ai" ? (
                          <div className="prose prose-invert prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: formatAIText(msg.text) }} />
                        ) : msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-sm shrink-0">🐾</div>
                      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/8 backdrop-blur-sm">
                        <div className="flex gap-1.5 items-center h-5">
                          {[0, 0.15, 0.3].map((delay, i) => (
                            <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay }} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex gap-2">
                    <input
                      type="text" value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && enviarMensaje()}
                      placeholder="Describe los síntomas de tu perro..."
                      disabled={loading}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/50 backdrop-blur-sm transition-all disabled:opacity-50"
                    />
                    <button onClick={enviarMensaje} disabled={loading || !input.trim()}
                      className="px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium text-white shrink-0">
                      Enviar
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── FORMULARIO ── */}
            {mode === "form" && (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>

                {step !== "resultado" && step !== "consultando" && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2">
                      {STEPS_LIST.map((s, i) => {
                        const isActive = s === step;
                        const isDone = i < currentStepIndex;
                        return (
                          <div key={s} className="flex items-center gap-2 flex-1 form-step-indicator" style={{ opacity: 0 }}>
                            <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-medium transition-all ${
                              isDone ? "bg-emerald-500 text-white" :
                              isActive ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400" :
                              "bg-white/5 border border-white/10 text-white/20"
                            }`}>
                              {isDone ? "✓" : i + 1}
                            </div>
                            {i < STEPS_LIST.length - 1 && (
                              <div className={`flex-1 h-px ${isDone ? "bg-emerald-500/50" : "bg-white/10"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-2">
                      {STEPS_LABELS.map((label, i) => (
                        <span key={label} className={`text-[10px] ${i === currentStepIndex ? "text-emerald-400" : "text-white/20"}`}>
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <AnimatePresence mode="wait">

                  {step === "nombre" && (
                    <FormStep key="nombre" title="¿Cómo se llama tu perro?" subtitle="Y cuéntanos un poco sobre él">
                      <input type="text" placeholder="Nombre del perro" value={formData.nombre}
                        onChange={e => setFormData(p => ({ ...p, nombre: e.target.value }))} className={inputClass} />
                      <input type="text" placeholder="Raza (opcional)" value={formData.raza}
                        onChange={e => setFormData(p => ({ ...p, raza: e.target.value }))} className={inputClass} />
                      <NextButton onClick={() => setStep("edad")} />
                    </FormStep>
                  )}

                  {step === "edad" && (
                    <FormStep key="edad" title={`¿Cuántos años tiene ${formData.nombre || "tu perro"}?`} subtitle="La edad nos ayuda a personalizar el análisis">
                      <div className="grid grid-cols-3 gap-3">
                        {["Cachorro (0-1 año)", "Joven (1-3 años)", "Adulto (3-7 años)", "Maduro (7-10 años)", "Senior (+10 años)", "No sé"].map(e => (
                          <button key={e} onClick={() => setFormData(p => ({ ...p, edad: e }))}
                            className={`p-3 rounded-xl border text-xs text-left transition-all leading-tight ${
                              formData.edad === e
                                ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                                : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                            }`}>{e}
                          </button>
                        ))}
                      </div>
                      <NextButton onClick={() => setStep("sintomas")} disabled={!formData.edad} />
                    </FormStep>
                  )}

                  {step === "sintomas" && (
                    <FormStep key="sintomas" title="¿Qué síntomas presenta?" subtitle="Selecciona todos los que apliquen">
                      <div className="grid grid-cols-2 gap-2">
                        {SINTOMAS_OPCIONES.map(s => {
                          const selected = formData.sintomas.includes(s);
                          const isUrgent = ["Convulsiones", "Dificultad para respirar", "Orina con sangre"].includes(s);
                          return (
                            <button key={s} onClick={() => toggleSintoma(s)}
                              className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center gap-2 ${
                                selected
                                  ? isUrgent ? "border-red-500 bg-red-500/15 text-red-300" : "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                                  : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                              }`}>
                              <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 text-[10px] ${
                                selected ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/20"
                              }`}>
                                {selected && "✓"}
                              </span>
                              {isUrgent && <span className="text-red-400">⚠️</span>}
                              {s}
                            </button>
                          );
                        })}
                      </div>
                      {formData.sintomas.some(s => ["Convulsiones", "Dificultad para respirar"].includes(s)) && (
                        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                          🚨 <strong>Atención:</strong> Síntomas graves. Considera ir a urgencias inmediatamente.
                        </div>
                      )}
                      <textarea placeholder="Describe con más detalle... (opcional)" value={formData.descripcionExtra}
                        onChange={e => setFormData(p => ({ ...p, descripcionExtra: e.target.value }))}
                        rows={3} className={`${inputClass} resize-none`} />
                      <NextButton onClick={() => setStep("duracion")} disabled={formData.sintomas.length === 0} label="Siguiente" />
                    </FormStep>
                  )}

                  {step === "duracion" && (
                    <FormStep key="duracion" title="¿Desde cuándo tiene estos síntomas?" subtitle="La duración es clave para el diagnóstico">
                      <div className="space-y-2">
                        {DURACIONES.map(d => (
                          <button key={d} onClick={() => setFormData(p => ({ ...p, duracion: d }))}
                            className={`w-full p-4 rounded-xl border text-sm text-left transition-all ${
                              formData.duracion === d
                                ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                                : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                            }`}>{d}
                          </button>
                        ))}
                      </div>
                      <NextButton onClick={consultarFormulario} disabled={!formData.duracion} label="🔍 Analizar con IA" primary />
                    </FormStep>
                  )}

                  {step === "consultando" && (
                    <motion.div key="consultando" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto mb-6">
                        <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>🐾</motion.span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Analizando los síntomas...</h3>
                      <p className="text-white/40 text-sm">VetBot está procesando la información de {formData.nombre || "tu perro"}</p>
                      <div className="flex justify-center gap-1.5 mt-6">
                        {[0, 0.2, 0.4].map((delay, i) => (
                          <motion.div key={i} className="w-2 h-2 rounded-full bg-emerald-400"
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay }} />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === "resultado" && (
                    <motion.div key="resultado" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xl shrink-0">🐾</div>
                        <div>
                          <h3 className="font-semibold">Análisis de VetBot</h3>
                          <p className="text-white/40 text-xs">Para {formData.nombre || "tu perro"} • {formData.edad}</p>
                        </div>
                      </div>
                      <div
                        className="bg-white/5 border border-white/8 rounded-2xl p-5 text-sm text-white/80 leading-relaxed backdrop-blur-sm"
                        dangerouslySetInnerHTML={{ __html: formatAIText(resultadoForm) }}
                      />
                      <SeccionProductos
                        nombrePerro={formData.nombre}
            
                        categoriasRelevantes={["medicamento", "alimento"]}
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  
                        className="w-full py-4 rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 backdrop-blur-sm transition-all flex items-center justify-center gap-3 group"
                      >
                        <span className="text-xl">🪪</span>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">Genera tu Carnet Canino</p>
                          <p className="text-[11px] text-white/40">Crea el documento oficial de {formData.nombre || "tu perro"}</p>
                        </div>
                        <span className="ml-auto text-white/20 group-hover:text-emerald-400 transition-colors text-sm">→</span>
                      </motion.button>
                      <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-300/80 text-xs leading-relaxed">
                        ⚠️ Este análisis es orientativo y no reemplaza la consulta veterinaria presencial.
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button onClick={() => { resetForm(); setMode("selector"); }}
                          className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-sm text-white/60 hover:text-white transition-all backdrop-blur-sm">
                          Nueva consulta
                        </button>
                        <button onClick={iniciarChat}
                          className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sm font-medium text-white transition-all">
                          Continuar en chat →
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </>
  );
}