"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

// ── Tipos ──────────────────────────────────────────────────────────────────────

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: "medicamento" | "alimento" | "accesorio";
  precio: number;
  imagen?: string | null;
  stock: number;
  urgencia: "alta" | "media" | "baja";
}

// ── Config ─────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999";

const CATEGORIAS = [
  { key: "todos",       label: "Todo",        emoji: "✦" },
  { key: "medicamento", label: "Medicamentos", emoji: "◈" },
  { key: "alimento",    label: "Alimentos",    emoji: "◉" },
  { key: "accesorio",   label: "Accesorios",   emoji: "◆" },
] as const;

const URGENCIA_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  alta:  { label: "Muy solicitado", color: "#c45c2a", bg: "#fdf0e8" },
  media: { label: "Popular",        color: "#2a5a8a", bg: "#e8f0fd" },
  baja:  { label: "Disponible",     color: "#5a5a5a", bg: "#f0f0f0" },
};

function buildWhatsappUrl(items: Producto[]): string {
  const lineas = items.map(p => `• ${p.nombre} — S/ ${p.precio.toFixed(2)}`).join("\n");
  const total  = items.reduce((s, p) => s + p.precio, 0);
  const msg =
    `🛍️ *Pedido desde Mimos Pet Club*\n\n` +
    `📦 *Productos:*\n${lineas}\n\n` +
    `💰 *Total: S/ ${total.toFixed(2)}*\n\n` +
    `Por favor confirmar y coordinar entrega. ¡Gracias! 🐾`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ── Magnetic Button ────────────────────────────────────────────────────────────

function MagneticBtn({
  children, onClick, className, style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width  / 2) * 0.3,
      y: (e.clientY - rect.top  - rect.height / 2) * 0.3,
    });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </motion.button>
  );
}

// ── Animated Number ────────────────────────────────────────────────────────────

function AnimatedNumber({ value }: { value: number }) {
  const spring  = useSpring(value, { stiffness: 100, damping: 20 });
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    spring.set(value);
    return spring.on("change", v => setDisplay(Math.round(v)));
  }, [value, spring]);
  return <>{display}</>;
}

// ── Product Card ───────────────────────────────────────────────────────────────

function ProductCard({
  producto, inCart, onToggle,
}: {
  producto: Producto;
  inCart: boolean;
  onToggle: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const urg = URGENCIA_CONFIG[producto.urgencia];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        animate={{
          y: hovered ? -8 : 0,
          boxShadow: hovered
            ? "0 32px 64px -12px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)"
            : "0 4px 24px -4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: "#faf8f5",
          outline: inCart ? "2px solid #c45c2a" : "none",
          outlineOffset: inCart ? "2px" : "0",
        }}
      >
        {/* Stock bajo */}
        {producto.stock <= 5 && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white"
              style={{ background: "#c45c2a" }}>
              Últimas {producto.stock}
            </span>
          </div>
        )}

        {/* Check cuando está en carrito */}
        <AnimatePresence>
          {inCart && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#c45c2a" }}
            >
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-white text-sm font-bold"
              >
                ✓
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Imagen */}
        <div className="relative h-52 overflow-hidden" style={{ background: "#f0ece6" }}>
          {producto.imagen && !imgError ? (
            <motion.img
              src={producto.imagen}
              alt={producto.nombre}
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <motion.span
                animate={{ scale: hovered ? 1.15 : 1 }}
                transition={{ duration: 0.4 }}
                className="text-7xl opacity-20"
              >
                {producto.categoria === "medicamento" ? "💊"
                  : producto.categoria === "alimento" ? "🍖" : "🦮"}
              </motion.span>
            </div>
          )}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(250,248,245,0.7) 0%, transparent 40%)" }} />
        </div>

        {/* Contenido */}
        <div className="p-5">
          {/* Urgencia */}
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
              style={{ color: urg.color, background: urg.bg }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: urg.color }} />
              {urg.label}
            </span>
            <span className="text-[10px] font-medium" style={{ color: "#999" }}>
              {producto.stock} en stock
            </span>
          </div>

          {/* Nombre */}
          <h3 className="font-bold leading-snug mb-2 line-clamp-2"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "#1a1a1a" }}>
            {producto.nombre}
          </h3>

          {/* Descripción */}
          <p className="text-[11px] leading-relaxed line-clamp-2 mb-5" style={{ color: "#888" }}>
            {producto.descripcion}
          </p>

          {/* Precio + botón */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#bbb" }}>Precio</p>
              <p className="text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a1a" }}>
                S/ {Number(producto.precio).toFixed(2)}
              </p>
            </div>

            <MagneticBtn
              onClick={onToggle}
              className="relative overflow-hidden px-5 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300"
              style={{
                background: inCart ? "#c45c2a" : "transparent",
                color: inCart ? "#fff" : "#1a1a1a",
                border: inCart ? "none" : "1px solid #e0dbd4",
              }}
            >
              <AnimatePresence mode="wait">
                {inCart ? (
                  <motion.span key="quitar"
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
                    className="flex items-center gap-1.5">
                    ✓ Quitar
                  </motion.span>
                ) : (
                  <motion.span key="agregar"
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
                    className="flex items-center gap-1.5">
                    + Agregar
                  </motion.span>
                )}
              </AnimatePresence>
            </MagneticBtn>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Cart Drawer ────────────────────────────────────────────────────────────────

function CartDrawer({
  items, onRemove, onClear, onCheckout, isOpen, onClose,
}: {
  items: Producto[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onCheckout: () => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const total = items.reduce((s, p) => s + p.precio, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(6px)" }}
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm z-50 flex flex-col"
            style={{ background: "#faf8f5", fontFamily: "'DM Sans', sans-serif" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "#ede8e1" }}>
              <div>
                <h2 className="font-black text-xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a1a" }}>
                  Tu pedido
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "#999" }}>
                  {items.length} producto{items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-light transition-all"
                style={{ border: "1px solid #e0dbd4", color: "#999" }}>
                ×
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    className="text-5xl mb-4"
                  >🛒</motion.div>
                  <p className="text-sm" style={{ color: "#bbb" }}>Tu carrito está vacío</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item, i) => (
                    <motion.div key={item.id}
                      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-2xl border bg-white"
                      style={{ borderColor: "#ede8e1" }}>
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                        style={{ background: "#f0ece6" }}>
                        {item.imagen ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">
                            {item.categoria === "medicamento" ? "💊" : item.categoria === "alimento" ? "🍖" : "🦮"}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold line-clamp-2 leading-tight" style={{ color: "#1a1a1a" }}>
                          {item.nombre}
                        </p>
                        <p className="text-sm font-black mt-1" style={{ color: "#c45c2a" }}>
                          S/ {Number(item.precio).toFixed(2)}
                        </p>
                      </div>
                      <button onClick={() => onRemove(item.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all"
                        style={{ background: "#faf0e8", color: "#c45c2a" }}>
                        ×
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t space-y-4" style={{ borderColor: "#ede8e1" }}>
                <div className="flex justify-between items-end">
                  <span className="text-sm" style={{ color: "#999" }}>Total estimado</span>
                  <span className="text-3xl font-black" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a1a" }}>
                    S/ {total.toFixed(2)}
                  </span>
                </div>
                <MagneticBtn
                  onClick={onCheckout}
                  className="w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2.5"
                  style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Pedir por WhatsApp
                </MagneticBtn>
                <button onClick={onClear}
                  className="w-full py-2 text-xs transition-colors"
                  style={{ color: "#bbb" }}>
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Página principal ───────────────────────────────────────────────────────────

export default function TiendaPage() {
  const [productos, setProductos]           = useState<Producto[]>([]);
  const [cargando, setCargando]             = useState(true);
  const [error, setError]                   = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos");
  const [busqueda, setBusqueda]             = useState("");
  const [orden, setOrden]                   = useState("relevancia");
  const [carrito, setCarrito]               = useState<Set<number>>(new Set());
  const [carritoOpen, setCarritoOpen]       = useState(false);
  const [enviado, setEnviado]               = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Cargar productos
  useEffect(() => {
    const cargar = async () => {
      setCargando(true); setError("");
      try {
        const res  = await fetch("/api/productos?limit=50");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setProductos(data.productos ?? []);
      } catch {
        setError("No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  // Filtros + orden
  const productosFiltrados = useMemo(() => {
    let lista = [...productos];
    if (filtroCategoria !== "todos") lista = lista.filter(p => p.categoria === filtroCategoria);
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      lista = lista.filter(p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q));
    }
    const urgOrder: Record<string, number> = { alta: 0, media: 1, baja: 2 };
    switch (orden) {
      case "precio_asc":  lista.sort((a, b) => a.precio - b.precio); break;
      case "precio_desc": lista.sort((a, b) => b.precio - a.precio); break;
      case "nombre":      lista.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
      default:            lista.sort((a, b) => urgOrder[a.urgencia] - urgOrder[b.urgencia]);
    }
    return lista;
  }, [productos, filtroCategoria, busqueda, orden]);

  // Carrito
  const toggleCarrito = (id: number) => {
    setCarrito(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const itemsCarrito  = Array.from(carrito).map(id => productos.find(p => p.id === id)).filter(Boolean) as Producto[];
  const totalCarrito  = itemsCarrito.reduce((s, p) => s + p.precio, 0);

  const handleCheckout = () => {
    if (!itemsCarrito.length) return;
    setEnviado(true);
    setTimeout(() => {
      window.open(buildWhatsappUrl(itemsCarrito), "_blank");
      setCarritoOpen(false);
      setCarrito(new Set());
      setTimeout(() => setEnviado(false), 3000);
    }, 500);
  };

  const conteo = useMemo(() => {
    const c: Record<string, number> = { todos: productos.length };
    productos.forEach(p => { c[p.categoria] = (c[p.categoria] || 0) + 1; });
    return c;
  }, [productos]);

  // ── RENDER ─────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .line-clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
        .line-clamp-3 { display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden; }
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#f0ece6}
        ::-webkit-scrollbar-thumb{background:#c8bfb4;border-radius:4px}
      `}</style>

      <div className="min-h-screen" style={{ background: "#f7f4ef", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative h-[560px] overflow-hidden flex items-center">

          {/* Fondo con imagen de perrito + parallax */}
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            {/* Imagen elegante de perrito */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1800&q=90&fit=crop&crop=center"
              alt="perro elegante"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay oscuro degradado */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(8,5,2,0.88) 0%, rgba(25,14,6,0.72) 45%, rgba(8,5,2,0.60) 100%)",
              }}
            />
          </motion.div>

          {/* Contenido hero */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 max-w-7xl mx-auto px-6 w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: "#c45c2a" }} />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: "#c45c2a" }}>
                  Mimos Pet Club
                </span>
              </div>

              {/* Título */}
              <h1
                className="font-black text-white leading-none mb-6"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(52px, 7vw, 80px)" }}
              >
                Tienda
                <br />
                <em className="not-italic" style={{ color: "#c45c2a" }}>Premium</em>
              </h1>

              <p className="text-lg leading-relaxed max-w-md" style={{ color: "#a09080" }}>
                Medicamentos, alimentos y accesorios de la más alta calidad para tu mejor amigo.
              </p>
            </motion.div>
          </motion.div>

          {/* Fade inferior */}
          <div
            className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #564d3f)" }}
          />
        </section>

        {/* ── STICKY TOOLBAR ── */}
        <div
          className="sticky top-0 z-30 border-b"
          style={{
            background: "rgba(247,244,239,0.94)",
            backdropFilter: "blur(16px)",
            borderColor: "#ede8e1",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

              {/* Categorías — más grandes */}
              <div className="flex gap-2 flex-wrap">
                {CATEGORIAS.map(cat => {
                  const active = filtroCategoria === cat.key;
                  return (
                    <motion.button
                      key={cat.key}
                      onClick={() => setFiltroCategoria(cat.key)}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 rounded-xl font-semibold transition-all duration-200"
                      style={{
                        padding: "10px 20px",
                        fontSize: "14px",
                        background: active ? "#1a1a1a" : "transparent",
                        color:      active ? "#fff"    : "#666",
                        border:     `1.5px solid ${active ? "#1a1a1a" : "#e0dbd4"}`,
                      }}
                    >
                      <span style={{ color: active ? "#c45c2a" : "inherit" }}>{cat.emoji}</span>
                      <span>{cat.label}</span>
                      {conteo[cat.key] !== undefined && (
                        <span
                          className="rounded-full font-bold"
                          style={{
                            padding: "2px 7px",
                            fontSize: "11px",
                            background: active ? "rgba(255,255,255,0.15)" : "#f0ece6",
                            color:      active ? "#fff" : "#999",
                          }}
                        >
                          {conteo[cat.key]}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Derecha: búsqueda + orden + carrito */}
              <div className="flex items-center gap-2">
                {/* Búsqueda */}
                <div className="relative">
                  <input
                    type="text"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    placeholder="Buscar..."
                    className="pl-8 pr-3 py-2.5 rounded-xl text-sm focus:outline-none transition-all w-36 sm:w-44"
                    style={{
                      background: "#eee9e2",
                      border: "1px solid transparent",
                      color: "#1a1a1a",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#bbb" }}>🔍</span>
                  {busqueda && (
                    <button onClick={() => setBusqueda("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sm transition-colors"
                      style={{ color: "#bbb" }}>
                      ×
                    </button>
                  )}
                </div>

                {/* Orden */}
                <select
                  value={orden}
                  onChange={e => setOrden(e.target.value)}
                  className="px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
                  style={{ background: "#eee9e2", border: "none", color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="precio_asc">Menor precio</option>
                  <option value="precio_desc">Mayor precio</option>
                  <option value="nombre">A → Z</option>
                </select>

                {/* Botón carrito */}
                <MagneticBtn
                  onClick={() => setCarritoOpen(true)}
                  className="relative flex items-center gap-2 rounded-xl font-bold transition-all"
                  style={{ padding: "10px 18px", background: "#1a1a1a", color: "#fff", fontSize: "14px" }}
                >
                  <span>🛒</span>
                  <span className="hidden sm:inline">Carrito</span>
                  <AnimatePresence>
                    {carrito.size > 0 && (
                      <motion.span
                        key={carrito.size}
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white flex items-center justify-center font-black"
                        style={{ background: "#c45c2a", fontSize: "10px" }}
                      >
                        {carrito.size}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </MagneticBtn>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <main className="max-w-7xl mx-auto px-6 py-10">

          {/* Loading */}
          {cargando && (
            <div className="py-32 flex flex-col items-center gap-6">
              <div className="flex gap-2">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.div key={i}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "#c45c2a" }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay }}
                  />
                ))}
              </div>
              <p className="text-sm" style={{ color: "#bbb" }}>Cargando productos...</p>
            </div>
          )}

          {/* Error */}
          {!cargando && error && (
            <div className="py-24 text-center">
              <p className="text-5xl mb-4">😔</p>
              <p className="font-medium mb-3" style={{ color: "#666" }}>{error}</p>
              <button onClick={() => window.location.reload()}
                className="text-sm underline" style={{ color: "#c45c2a" }}>
                Reintentar
              </button>
            </div>
          )}

          {/* Sin resultados */}
          {!cargando && !error && productosFiltrados.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-medium mb-3" style={{ color: "#666" }}>
                No encontramos productos con esa búsqueda
              </p>
              <button onClick={() => { setBusqueda(""); setFiltroCategoria("todos"); }}
                className="text-sm underline" style={{ color: "#c45c2a" }}>
                Ver todos los productos
              </button>
            </div>
          )}

          {/* Grid */}
          {!cargando && !error && productosFiltrados.length > 0 && (
            <>
              {/* Info bar */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm" style={{ color: "#999" }}>
                  <span className="font-bold" style={{ color: "#1a1a1a" }}>
                    {productosFiltrados.length}
                  </span>{" "}
                  producto{productosFiltrados.length !== 1 ? "s" : ""}
                  {filtroCategoria !== "todos" && (
                    <> · <span style={{ color: "#c45c2a" }}>
                      {CATEGORIAS.find(c => c.key === filtroCategoria)?.label}
                    </span></>
                  )}
                </p>
                {carrito.size > 0 && (
                  <motion.button
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                    onClick={() => setCarritoOpen(true)}
                    className="text-sm font-bold" style={{ color: "#c45c2a" }}
                  >
                    {carrito.size} en carrito →
                  </motion.button>
                )}
              </div>

              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {productosFiltrados.map((producto, i) => (
                    <motion.div
                      key={producto.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <ProductCard
                        producto={producto}
                        inCart={carrito.has(producto.id)}
                        onToggle={() => toggleCarrito(producto.id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </main>

        {/* ── FLOATING BAR ── */}
        <AnimatePresence>
          {carrito.size > 0 && !carritoOpen && (
            <motion.div
              initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
            >
              <MagneticBtn
                onClick={() => setCarritoOpen(true)}
                className="flex items-center gap-4 rounded-2xl text-white shadow-2xl"
                style={{ padding: "14px 24px", background: "#1a1a1a" }}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black"
                  style={{ background: "#c45c2a" }}>
                  <AnimatedNumber value={carrito.size} />
                </div>
                <span className="text-sm font-semibold">Ver mi pedido</span>
                <span className="text-sm font-black" style={{ fontFamily: "'Playfair Display', serif", color: "#c45c2a" }}>
                  S/ {totalCarrito.toFixed(2)}
                </span>
              </MagneticBtn>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TOAST ÉXITO ── */}
        <AnimatePresence>
          {enviado && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-2xl text-white shadow-xl text-sm font-semibold"
              style={{ background: "#25D366" }}
            >
              <span>✅</span> ¡Abriendo WhatsApp con tu pedido!
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CART DRAWER ── */}
        <CartDrawer
          items={itemsCarrito}
          onRemove={id => toggleCarrito(id)}
          onClear={() => setCarrito(new Set())}
          onCheckout={handleCheckout}
          isOpen={carritoOpen}
          onClose={() => setCarritoOpen(false)}
        />
      </div>
    </>
  );
}