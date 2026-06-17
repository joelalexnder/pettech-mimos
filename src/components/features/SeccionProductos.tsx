"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";


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

interface SeccionProductosProps {
  nombrePerro?: string;
  propietario?: string;
  categoriasRelevantes?: ("medicamento" | "alimento" | "accesorio")[];
}

const CATEGORIA_LABELS: Record<string, string> = {
  medicamento: "💊 Medicamentos",
  alimento: "🍖 Alimentos",
  accesorio: "🦮 Accesorios",
};

const CATEGORIA_EMOJI: Record<string, string> = {
  medicamento: "💊",
  alimento: "🍖",
  accesorio: "🦮",
};

const URGENCIA_COLORS: Record<string, string> = {
  alta: "border-red-500/40 bg-red-500/5",
  media: "border-amber-500/40 bg-amber-500/5",
  baja: "border-white/10 bg-white/3",
};

const URGENCIA_BADGE: Record<string, { label: string; color: string }> = {
  alta:  { label: "Urgente",     color: "bg-red-500/20 text-red-300 border-red-500/30" },
  media: { label: "Recomendado", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  baja:  { label: "Opcional",    color: "bg-white/5 text-white/40 border-white/10" },
};


export default function SeccionProductos({
  nombrePerro,
  propietario,
  categoriasRelevantes,
}: SeccionProductosProps) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [seleccionados, setSeleccionados] = useState<Set<number>>(new Set<number>());
  const [reservando, setReservando] = useState(false);
  const [reservaHecha, setReservaHecha] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos");
  const [expandido, setExpandido] = useState(false);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set<number>());

  const cargarProductos = useCallback(async () => {
    setCargando(true);
    setError("");
    try {
      const res = await fetch("/api/productos");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setProductos(data.productos ?? []);
    } catch {
      setError("No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    if (expandido && productos.length === 0 && !error) {
      cargarProductos();
    }
  }, [expandido, productos.length, error, cargarProductos]);

  const toggleSeleccion = (id: number) => {
    setSeleccionados(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 2) return prev; // límite de 2
        next.add(id);
      }
      return next;
    });
  };

  const limpiarSeleccion = () => setSeleccionados(new Set<number>());


  const handleReservar = async () => {
    if (seleccionados.size === 0 || reservando) return;
    setReservando(true);
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productoIds: Array.from(seleccionados),
          nombrePerro,
          propietario,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReservaHecha(true);
      setTimeout(() => window.open(data.whatsappUrl, "_blank"), 600);
    } catch (err) {
      console.error(err);
      alert("Hubo un error al procesar la reserva. Intenta nuevamente.");
    } finally {
      setReservando(false);
    }
  };

  const productosFiltrados = productos
    .filter(p => filtroCategoria === "todos" || p.categoria === filtroCategoria)
    .sort((a, b) => {
      const urgOrder = { alta: 0, media: 1, baja: 2 };
      const aRel = categoriasRelevantes?.includes(a.categoria) ? -1 : 0;
      const bRel = categoriasRelevantes?.includes(b.categoria) ? -1 : 0;
      return aRel - bRel || urgOrder[a.urgencia] - urgOrder[b.urgencia];
    });

  const categorias = ["todos", ...Array.from(new Set(productos.map(p => p.categoria)))];

  const productosSeleccionados = Array.from(seleccionados)
    .map(id => productos.find(p => p.id === id))
    .filter(Boolean) as Producto[];

  const totalEstimado = productosSeleccionados.reduce((sum, p) => sum + p.precio, 0);


  return (
    <div className="mt-6">
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setExpandido(v => !v)}
        className="w-full py-4 px-5 rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-500/8 to-teal-500/8 hover:from-emerald-500/15 hover:to-teal-500/15 transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🏪</span>
          <div className="text-left">
            <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
              En Mimos tenemos lo que tu perro necesita
            </p>
            <p className="text-[11px] text-white/40">
              Ver productos disponibles · Reserva hasta 2 por WhatsApp
            </p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: expandido ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/30 group-hover:text-emerald-400 transition-colors"
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {expandido && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">

              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-xs text-white/40">
                  {cargando
                    ? "Cargando inventario..."
                    : `${productos.length} producto${productos.length !== 1 ? "s" : ""} disponible${productos.length !== 1 ? "s" : ""} hoy`}
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {categorias.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFiltroCategoria(cat)}
                      className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all border ${
                        filtroCategoria === cat
                          ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                          : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                      }`}
                    >
                      {cat === "todos" ? "Todos" : CATEGORIA_LABELS[cat] ?? cat}
                    </button>
                  ))}
                </div>
              </div>

              {cargando && (
                <div className="py-10 text-center">
                  <div className="flex justify-center gap-1.5">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-emerald-400"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/30 mt-3">Cargando inventario actual...</p>
                </div>
              )}

              {!cargando && error && (
                <div className="py-6 text-center">
                  <p className="text-sm text-red-400">{error}</p>
                  <button
                    onClick={cargarProductos}
                    className="mt-2 text-xs text-white/40 hover:text-white/70 underline"
                  >
                    Reintentar
                  </button>
                </div>
              )}

              {!cargando && !error && productosFiltrados.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-sm text-white/30">
                    No hay productos disponibles en este momento.
                  </p>
                </div>
              )}

              {!cargando && !error && productosFiltrados.length > 0 && (
                <>
                  <AnimatePresence>
                    {seleccionados.size > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center justify-between px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                      >
                        <p className="text-xs text-emerald-300">
                          {seleccionados.size === 1
                            ? "1 producto seleccionado"
                            : `${seleccionados.size} productos seleccionados`}
                          {seleccionados.size < 2 && " · Puedes elegir 1 más"}
                        </p>
                        <button
                          onClick={limpiarSeleccion}
                          className="text-[10px] text-white/30 hover:text-white/60 transition-colors"
                        >
                          Limpiar
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 gap-3">
                    {productosFiltrados.map(producto => {
                      const isSelected = seleccionados.has(producto.id);
                      const isDisabled = seleccionados.size >= 2 && !isSelected;
                      const esRelevante = categoriasRelevantes?.includes(producto.categoria);
                      const imgError = imgErrors.has(producto.id);
                      const badge = URGENCIA_BADGE[producto.urgencia];

                      return (
                        <motion.button
                          key={producto.id}
                          whileHover={!isDisabled ? { scale: 1.01 } : {}}
                          whileTap={!isDisabled ? { scale: 0.99 } : {}}
                          onClick={() => !isDisabled && toggleSeleccion(producto.id)}
                          disabled={isDisabled}
                          className={`relative w-full p-4 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-500/12 ring-1 ring-emerald-500/30"
                              : isDisabled
                              ? "border-white/5 bg-white/2 opacity-40 cursor-not-allowed"
                              : `${URGENCIA_COLORS[producto.urgencia]} hover:border-white/25`
                          }`}
                        >
                          {esRelevante && !isSelected && (
                            <div className="absolute -top-2 right-3 z-10">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[9px] text-emerald-300 font-medium">
                                ⭐ Recomendado por VetBot
                              </span>
                            </div>
                          )}

                          <div className="flex gap-4 items-start">
                            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0 overflow-hidden">
                              {producto.imagen && !imgError ? (
                                <img
                                  src={producto.imagen}
                                  alt={producto.nombre}
                                  className="w-full h-full object-cover"
                                  onError={() =>
                                    setImgErrors(prev => new Set(prev).add(producto.id))
                                  }
                                />
                              ) : (
                                <span className="text-2xl">
                                  {CATEGORIA_EMOJI[producto.categoria] ?? "🐾"}
                                </span>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className={`text-sm font-semibold leading-tight ${
                                  isSelected ? "text-emerald-300" : "text-white"
                                }`}>
                                  {producto.nombre}
                                </h4>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                                  isSelected
                                    ? "bg-emerald-500 border-emerald-500"
                                    : "border-white/20 bg-white/5"
                                }`}>
                                  {isSelected && (
                                    <span className="text-[10px] text-white font-bold">✓</span>
                                  )}
                                </div>
                              </div>

                              <p className="text-[11px] text-white/50 leading-relaxed mb-2 line-clamp-2">
                                {producto.descripcion}
                              </p>

                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-white">
                                  S/ {Number(producto.precio).toFixed(2)}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-medium ${badge.color}`}>
                                  {badge.label}
                                </span>
                                <span className="text-[10px] text-white/25">
                                  Stock: {producto.stock} un.
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {seleccionados.size > 0 && !reservaHecha && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="pt-2 space-y-3"
                      >
                        <div className="p-3 rounded-xl bg-white/3 border border-white/8">
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">
                            Tu selección
                          </p>
                          {Array.from(seleccionados).map(id => {
                            const p = productos.find(x => x.id === id);
                            if (!p) return null;
                            return (
                              <div
                                key={id}
                                className="flex justify-between items-center text-xs text-white/70 py-1"
                              >
                                <span className="truncate flex-1 mr-2">{p.nombre}</span>
                                <span className="text-white font-medium shrink-0">
                                  S/ {Number(p.precio).toFixed(2)}
                                </span>
                              </div>
                            );
                          })}
                          <div className="border-t border-white/8 mt-2 pt-2 flex justify-between text-xs font-semibold">
                            <span className="text-white/50">Total estimado</span>
                            <span className="text-emerald-400">
                              S/ {totalEstimado.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleReservar}
                          disabled={reservando}
                          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2be573] hover:to-[#1aaa96] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 font-semibold text-white text-sm shadow-lg shadow-green-900/20"
                        >
                          {reservando ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Preparando reserva...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              Reservar mi pedido en Mimos
                            </>
                          )}
                        </motion.button>

                        <p className="text-center text-[10px] text-white/20">
                          Te redirigirá a WhatsApp para confirmar con nuestro equipo
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {reservaHecha && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-center"
                      >
                        <p className="text-3xl mb-2">✅</p>
                        <p className="text-sm font-semibold text-emerald-300">
                          ¡Reserva enviada!
                        </p>
                        <p className="text-xs text-white/40 mt-1">
                          Abriendo WhatsApp para confirmar con Mimos Pet Club...
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}