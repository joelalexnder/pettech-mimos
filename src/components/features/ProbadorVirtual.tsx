"use client";

import { useState, useRef, useEffect, DragEvent } from "react";
import { animate, stagger, createTimeline } from "animejs";
import { clothingItems, ClothingItem } from "@/data/clothes";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: "medicamento" | "alimento" | "accesorio";
  precio: number;
  imagen: string | null;
  stock: number;
  disponible: boolean;
  urgencia: "alta" | "media" | "baja";
};

export default function ProbadorVirtual() {
  const [selectedCloth, setSelectedCloth] = useState<ClothingItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingTryOn, setLoadingTryOn] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [pollingStatus, setPollingStatus] = useState("");
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [petName, setPetName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const generateBtnRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline();
    if (heroRef.current) {
      tl.add(heroRef.current, { opacity: [0, 1], translateY: [-40, 0], duration: 800, easing: "easeOutExpo" });
    }
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".cloth-card");
      tl.add(cards, {
        opacity: [0, 1], translateY: [30, 0], scale: [0.92, 1],
        delay: stagger(70), duration: 600, easing: "easeOutExpo",
      }, "-=500");
    }
    if (uploadRef.current) {
      tl.add(uploadRef.current, { opacity: [0, 1], translateY: [24, 0], duration: 600, easing: "easeOutExpo" }, "-=400");
    }
  }, []);

  useEffect(() => {
    if (!resultImage || !resultRef.current) return;
    createTimeline()
      .add(resultRef.current, { opacity: [0, 1], scale: [0.88, 1], duration: 700, easing: "easeOutBack" });
  }, [resultImage]);

  useEffect(() => {
    if (!selectedCloth || !imagePreview || loadingTryOn || !generateBtnRef.current) return;
    const interval = setInterval(() => {
      if (!generateBtnRef.current) return;
      animate(generateBtnRef.current, {
        scale: [1, 1.03, 1], duration: 1800, easing: "easeInOutSine",
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [selectedCloth, imagePreview, loadingTryOn]);

  useEffect(() => {
    if (!loadingTryOn || !particlesRef.current) return;
    const dots = particlesRef.current.querySelectorAll(".particle");
    animate(dots, {
      translateY: [0, -18, 0],
      scale: [1, 1.4, 1],
      opacity: [0.4, 1, 0.4],
      delay: stagger(160),
      duration: 900,
      loop: true,
      easing: "easeInOutSine",
    });
  }, [loadingTryOn]);

  useEffect(() => {
    if (showReservaModal && modalRef.current) {
      animate(modalRef.current, { opacity: [0, 1], scale: [0.9, 1], duration: 400, easing: "easeOutBack" });
    }
  }, [showReservaModal]);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = e => {
      if (typeof e.target?.result === "string") {
        setImagePreview(e.target.result);
        setResultImage(null);
        if (uploadRef.current) {
          animate(uploadRef.current, { scale: [1, 1.025, 1], duration: 420, easing: "easeOutBack" });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) handleFile(f);
  };

  const handleCardClick = (item: ClothingItem, el: HTMLElement) => {
    setSelectedCloth(item);
    setResultImage(null);
    document.querySelectorAll(".cloth-card").forEach(c => {
      (c as HTMLElement).style.outline = "none";
      (c as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)";
    });
    animate(el, { scale: [1, 1.06, 1], duration: 350, easing: "easeOutBack" });
    const img = el.querySelector("img");
    if (img) animate(img, { scale: [1, 1.18, 1.05], duration: 500, easing: "easeOutBack" });
    el.style.outline = "2.5px solid #1D9E75";
    el.style.boxShadow = "0 10px 36px rgba(29,158,117,0.28), 0 0 0 5px rgba(159,225,203,0.2)";
    uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const fetchProductosRecomendados = async () => {
    setLoadingProductos(true);
    try {
      const res = await fetch(`/api/productos/recomendados?categoria=accesorio&limit=4`);
      const text = await res.text();
      if (!res.ok) return;
      const data = JSON.parse(text);
      if (data.productos) setProductos(data.productos);
    } catch (err) { console.error(err); }
    finally { setLoadingProductos(false); }
  };

  const pollTryOnResult = async (generationId: string, maxAttempts = 60, intervalMs = 2000): Promise<string> => {
    for (let i = 0; i < maxAttempts; i++) {
      setPollingStatus(`Procesando${".".repeat((i % 3) + 1)}`);
      await new Promise(r => setTimeout(r, intervalMs));
      const res = await fetch(`/api/tryon/result?generationId=${generationId}`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      if (data.status === "COMPLETED" && data.image) { setPollingStatus(""); return data.image; }
      if (data.status === "FAILED") throw new Error(data.error || "Generación fallida");
    }
    throw new Error("Tiempo de espera agotado");
  };

  const generateTryOn = async () => {
    if (!selectedFile || !selectedCloth) return;
    setLoadingTryOn(true); setResultImage(null); setProductos([]); setPollingStatus("");
    try {
      const fd = new FormData();
      fd.append("file", selectedFile);
      fd.append("clothId", `${selectedCloth.id}-${Date.now()}`);
      fd.append("clothImageUrl", selectedCloth.imageUrl);
      fd.append("clothName", selectedCloth.name);

      const [res] = await Promise.all([
        fetch("/api/tryon", { method: "POST", body: fd }),
        fetchProductosRecomendados(),
      ]);

      if (!res.ok) { alert(`Error (${res.status})`); return; }
      const data = await res.json();

      if (data.generationId) {
        const imageUrl = await pollTryOnResult(data.generationId);
        setResultImage(imageUrl);
      } else if (data.image) {
        setResultImage(data.image);
      } else {
        alert(data.error || "No se recibió imagen");
      }
    } catch (e: any) {
      alert(e.message || "Error inesperado");
    } finally {
      setLoadingTryOn(false);
      setPollingStatus("");
    }
  };

  const handleReservar = () => {
    setShowReservaModal(true);
  };

  const handleConfirmReserva = () => {
    if (!selectedCloth) return;
    const nombre = petName.trim() || "mi mascota";
    const msg = encodeURIComponent(
      `¡Hola! 🐾 Quiero reservar la prenda *${selectedCloth.name}* (S/ ${selectedCloth.price.toFixed(2)}) para ${nombre}.\n\nLa vi en el Probador Virtual de Mimos Pet Club ✨`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
    setShowReservaModal(false);
    setPetName("");
  };

  const urgColor = { alta: "#ef4444", media: "#f59e0b", baja: "#10b981" } as Record<string, string>;
  const urgLabel = { alta: "Muy pedido", media: "Popular", baja: "Disponible" } as Record<string, string>;
  const canGenerate = !!selectedCloth && !!imagePreview && !loadingTryOn;

  return (
    <div style={{
      width: "100%", minHeight: "100vh",
      background: "linear-gradient(160deg,#f0fdf8 0%,#e4f8f0 50%,#f5fffb 100%)",
      fontFamily: "'Nunito','Segoe UI',sans-serif",
      overflowX: "hidden",
    }}>

      {/* ── HERO ── */}
      <div ref={heroRef} style={{ textAlign: "center", padding: "3.5rem 1rem 1.5rem", opacity: 0 }}>

        <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, color: "#085041", margin: "0 0 8px", letterSpacing: "-1px", lineHeight: 1.1 }}>
          Probador <span style={{ color: "#1D9E75" }}>Virtual</span> 🐶
        </h1>
        <p style={{ fontSize: "15px", color: "#3aaa82", fontWeight: 600, margin: "0 0 16px" }}>
          Elige una prenda, sube la foto de tu peludo y ve el resultado con IA
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          {[{ n: "1", t: "Elige prenda", e: "👕" }, { n: "2", t: "Sube foto", e: "📸" }, { n: "3", t: "¡Magia IA!", e: "✨" }].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg,#1D9E75,#0a5c46)", color: "white", fontSize: "12px", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.n}</div>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#0F6E56" }}>{s.e} {s.t}</span>
              {i < 2 && <span style={{ color: "#9FE1CB", fontWeight: 900 }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>

        {/* ── TIENDA DE PRENDAS ── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", color: "#1D9E75", textTransform: "uppercase", margin: "0 0 2px" }}>👕 Colección Mimos</p>
              <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#085041", margin: 0 }}>Selecciona una prenda</h2>
            </div>
            {selectedCloth && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1.5px solid #9FE1CB", borderRadius: "50px", padding: "6px 16px", boxShadow: "0 2px 12px rgba(29,158,117,0.12)" }}>
                <img src={selectedCloth.imageUrl} alt="" style={{ width: "24px", height: "24px", objectFit: "contain", borderRadius: "6px" }} />
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#0F6E56" }}>{selectedCloth.name}</span>
                <span style={{ fontSize: "13px", fontWeight: 900, color: "#1D9E75" }}>S/ {selectedCloth.price.toFixed(2)}</span>
                <span style={{ fontSize: "10px", background: "#1D9E75", color: "white", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>✓</span>
              </div>
            )}
          </div>

          {/* Grid de prendas — tarjetas grandes */}
          <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "22px" }}>
            {clothingItems.map(item => {
              const isSel = selectedCloth?.id === item.id;
              return (
                <div
                  key={item.id}
                  className="cloth-card"
                  onClick={e => handleCardClick(item, e.currentTarget)}
                  onMouseEnter={e => !isSel && animate(e.currentTarget, { translateY: -6, duration: 200, easing: "easeOutBack" })}
                  onMouseLeave={e => !isSel && animate(e.currentTarget, { translateY: 0, duration: 220, easing: "easeOutBack" })}
                  style={{
                    background: isSel ? "linear-gradient(145deg,#f0fdf8,#e0f7ef)" : "white",
                    borderRadius: "24px",
                    padding: "0 0 16px",
                    cursor: "pointer",
                    border: isSel ? "2.5px solid #1D9E75" : "1.5px solid #b0dece",
                    boxShadow: isSel
                      ? "0 10px 36px rgba(29,158,117,0.28), 0 0 0 5px rgba(159,225,203,0.2)"
                      : "0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)",
                    transition: "border-color .2s, box-shadow .2s, background .2s",
                    opacity: 0,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {isSel && (
                    <div style={{ position: "absolute", top: "10px", right: "10px", background: "#1D9E75", color: "white", borderRadius: "50%", width: "26px", height: "26px", fontSize: "12px", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(29,158,117,0.5)", zIndex: 2 }}>✓</div>
                  )}

                  {/* Imagen grande */}
                  <div style={{ width: "100%", height: "160px", background: "linear-gradient(135deg,#f0fdf8,#d6f5ea)", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", boxSizing: "border-box", borderRadius: "22px 22px 0 0", overflow: "hidden" }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform .4s cubic-bezier(.34,1.56,.64,1)" }}
                      onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
                    />
                  </div>

                  <div style={{ padding: "12px 14px 0" }}>
                    <p style={{ fontWeight: 900, fontSize: "14px", color: "#085041", margin: "0 0 3px", lineHeight: 1.3 }}>{item.name}</p>
                    <p style={{ fontSize: "11.5px", color: "#7ecfb4", margin: "0 0 10px", lineHeight: 1.4 }}>{item.description}</p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "18px", fontWeight: 900, color: isSel ? "#0F6E56" : "#1D9E75", letterSpacing: "-0.5px" }}>
                        S/ {item.price.toFixed(2)}
                      </span>
                      <span style={{
                        fontSize: "10px", fontWeight: 800,
                        color: isSel ? "white" : "#1D9E75",
                        background: isSel ? "#1D9E75" : "rgba(29,158,117,0.1)",
                        padding: "4px 12px", borderRadius: "20px",
                        transition: "all .2s",
                      }}>
                        {isSel ? "✓ Elegida" : "Elegir"}
                      </span>
                    </div>

                    {/* Botón reservar directo */}
                    {isSel && (
                      <button
                        onClick={e => { e.stopPropagation(); handleReservar(); }}
                        onMouseEnter={ev => animate(ev.currentTarget, { scale: 1.04, duration: 150, easing: "easeOutBack" })}
                        onMouseLeave={ev => animate(ev.currentTarget, { scale: 1, duration: 160, easing: "easeOutBack" })}
                        style={{
                          marginTop: "10px", width: "100%",
                          background: "linear-gradient(135deg,#25D366,#128C7E)",
                          color: "white", border: "none", borderRadius: "14px",
                          padding: "10px 0", cursor: "pointer", fontFamily: "inherit",
                          fontWeight: 800, fontSize: "12px",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                          boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                        }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        Reservar por WhatsApp
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DIVISOR ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}>
          <div style={{ flex: 1, height: "1.5px", background: "linear-gradient(90deg,transparent,#9FE1CB)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1.5px solid #c8eedd", borderRadius: "50px", padding: "8px 18px", boxShadow: "0 2px 12px rgba(29,158,117,0.1)" }}>
            <span>📸</span>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#0F6E56", letterSpacing: "0.1em", textTransform: "uppercase" }}>Sube la foto de tu perrito</span>
          </div>
          <div style={{ flex: 1, height: "1.5px", background: "linear-gradient(90deg,#9FE1CB,transparent)" }} />
        </div>

        {/* ── UPLOAD + RESULTADO ── */}
        <div ref={uploadRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start", opacity: 0 }}>

          {/* LEFT — upload */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* Drop zone — foto completa */}
            <div
              onDrop={handleDrop}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => !imagePreview && fileInputRef.current?.click()}
              style={{
                background: isDragging ? "#d6f5ea" : "white",
                border: isDragging ? "2.5px dashed #1D9E75" : imagePreview ? "2px solid #9FE1CB" : "2.5px dashed #b8ead6",
                borderRadius: "24px",
                height: imagePreview ? "auto" : "280px",
                minHeight: "280px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                cursor: imagePreview ? "default" : "pointer",
                transition: "all .3s", position: "relative", overflow: "hidden",
                boxShadow: "0 6px 28px rgba(29,158,117,0.1)",
              }}
            >
              {imagePreview ? (
                <>
                  {/* Foto completa, sin recorte */}
                  <img
                    src={imagePreview}
                    alt="mascota"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "420px",
                      objectFit: "contain",
                      display: "block",
                      borderRadius: "22px",
                    }}
                  />
                  <button
                    onClick={e => { e.stopPropagation(); setImagePreview(null); setSelectedFile(null); setResultImage(null); }}
                    style={{ position: "absolute", top: "12px", right: "12px", background: "white", border: "1.5px solid #9FE1CB", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,.15)", zIndex: 2 }}>✕</button>
                  <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", background: "#1D9E75", color: "white", fontSize: "11px", fontWeight: 800, padding: "5px 16px", borderRadius: "20px", whiteSpace: "nowrap", boxShadow: "0 2px 10px rgba(29,158,117,0.4)" }}>
                    ✓ Foto lista
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 1.2rem" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#d6f5ea,#9FE1CB)", borderRadius: "50%", opacity: 0.5 }} />
                    <div style={{ position: "absolute", inset: "6px", background: "linear-gradient(135deg,#e8faf3,#d0f0e4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>🐶</div>
                  </div>
                  <p style={{ fontWeight: 900, fontSize: "16px", color: "#085041", margin: "0 0 8px" }}>Foto de tu perrito</p>
                  <p style={{ fontSize: "12px", color: "#7ecfb4", margin: 0, lineHeight: 1.6 }}>JPG, PNG · Arrastra o haz clic<br />¡Que se vea todo su cuerpito! 🐾</p>
                </div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

            {/* Botones solo visibles cuando NO hay imagen */}
            {!imagePreview && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[
                  { e: "🖼️", l: "Subir Foto" },
                  { e: "📂", l: "Explorar Archivos" },
                ].map(({ e, l }) => (
                  <button key={l} onClick={() => fileInputRef.current?.click()}
                    onMouseEnter={ev => { ev.currentTarget.style.background = "#e0f7ef"; animate(ev.currentTarget, { scale: 1.03, duration: 160, easing: "easeOutBack" }); }}
                    onMouseLeave={ev => { ev.currentTarget.style.background = "white"; animate(ev.currentTarget, { scale: 1, duration: 180, easing: "easeOutBack" }); }}
                    style={{ background: "white", border: "1.5px solid #c8eedd", borderRadius: "16px", padding: "14px 8px", cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: "13px", color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", boxShadow: "0 2px 10px rgba(29,158,117,0.07)", transition: "background .2s" }}>
                    <span style={{ fontSize: "18px" }}>{e}</span> {l}
                  </button>
                ))}
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: imagePreview ? "#1D9E75" : "#b8ead6", boxShadow: imagePreview ? "0 0 0 3px rgba(29,158,117,.2)" : "none", transition: "all .3s" }} />
              <span style={{ fontSize: "12px", color: imagePreview ? "#0F6E56" : "#7ecfb4", fontWeight: 700 }}>
                {imagePreview ? "✓ Foto lista para probar" : "Esperando foto..."}
              </span>
            </div>

            {/* Botón generar */}
            {canGenerate && (
              <button
                ref={generateBtnRef}
                onClick={generateTryOn}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg,#1D9E75,#0a5c46)",
                  color: "white", border: "none", borderRadius: "20px",
                  padding: "20px", cursor: "pointer", fontFamily: "inherit",
                  fontWeight: 900, fontSize: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  boxShadow: "0 10px 32px rgba(15,110,86,0.38)",
                }}
              >
                <span style={{ fontSize: "22px" }}>✨</span>
                <span>Probar "{selectedCloth?.name}" en mi mascota</span>
              </button>
            )}

            {(!selectedCloth || !imagePreview) && (
              <div style={{ textAlign: "center", padding: "14px", background: "rgba(159,225,203,0.15)", borderRadius: "16px", border: "1.5px dashed #c8eedd" }}>
                <p style={{ fontSize: "12px", color: "#7ecfb4", fontWeight: 700, margin: 0 }}>
                  {!selectedCloth && !imagePreview ? "👆 Elige una prenda y sube una foto" :
                    !selectedCloth ? "👆 Elige una prenda de la tienda" : "👆 Sube la foto de tu perrito"}
                </p>
              </div>
            )}

            {/* ── RECOMENDADOS — debajo del botón generar ── */}
            {(loadingProductos || productos.length > 0) && (
              <div style={{ marginTop: "4px" }}>
                <p style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em", color: "#1D9E75", textTransform: "uppercase", margin: "0 0 10px" }}>✨ Recomendados para tu peludo</p>
                {loadingProductos && productos.length === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[1, 2].map(i => (
                      <div key={i} style={{ background: "white", borderRadius: "14px", padding: "12px", display: "flex", gap: "10px", border: "1.5px solid #e4f5ee", animation: "pulse 1.4s ease-in-out infinite", animationDelay: `${i * .15}s` }}>
                        <div style={{ width: "50px", height: "50px", minWidth: "50px", borderRadius: "10px", background: "#e8f8f2" }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ height: "10px", background: "#e8f8f2", borderRadius: "6px", marginBottom: "8px", width: "65%" }} />
                          <div style={{ height: "8px", background: "#e8f8f2", borderRadius: "6px", width: "85%" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {productos.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {productos.map(prod => (
                      <div key={prod.id}
                        onMouseEnter={e => animate(e.currentTarget, { translateY: -2, duration: 160, easing: "easeOutBack" })}
                        onMouseLeave={e => animate(e.currentTarget, { translateY: 0, duration: 180, easing: "easeOutBack" })}
                        style={{ background: "white", borderRadius: "14px", padding: "11px", display: "flex", gap: "10px", alignItems: "center", border: "1.5px solid #e4f5ee", boxShadow: "0 2px 10px rgba(29,158,117,.06)", cursor: "pointer" }}>
                        <div style={{ width: "50px", height: "50px", minWidth: "50px", borderRadius: "10px", overflow: "hidden", background: "linear-gradient(135deg,#d6f5ea,#b8ead6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {prod.imagen ? <img src={prod.imagen} alt={prod.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} /> : <span style={{ fontSize: "20px" }}>🛍️</span>}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "4px" }}>
                            <p style={{ fontWeight: 800, fontSize: "12px", color: "#085041", margin: "0 0 2px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{prod.nombre}</p>
                            <p style={{ fontWeight: 900, fontSize: "13px", color: "#0F6E56", margin: 0, whiteSpace: "nowrap" }}>S/ {prod.precio.toFixed(2)}</p>
                          </div>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                            <span style={{ fontSize: "9px", fontWeight: 700, color: urgColor[prod.urgencia], background: `${urgColor[prod.urgencia]}18`, padding: "2px 7px", borderRadius: "20px", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: urgColor[prod.urgencia], display: "inline-block" }} />
                              {urgLabel[prod.urgencia]}
                            </span>
                            <span style={{ fontSize: "9px", color: prod.stock > 10 ? "#1D9E75" : "#f59e0b", fontWeight: 600 }}>{prod.stock > 0 ? `${prod.stock} en stock` : "Agotado"}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onMouseEnter={e => animate(e.currentTarget, { scale: 1.02, duration: 150, easing: "easeOutBack" })}
                      onMouseLeave={e => animate(e.currentTarget, { scale: 1, duration: 180, easing: "easeOutBack" })}
                      onClick={() => { const msg = encodeURIComponent(`¡Hola! Vi el probador virtual de Mimos Pet Club y me interesa: ${productos.slice(0, 2).map(p => p.nombre).join(", ")} 🐾`); window.open(`https://wa.me/?text=${msg}`, "_blank"); }}
                      style={{ width: "100%", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "white", border: "none", borderRadius: "14px", padding: "12px", cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 16px rgba(37,211,102,.28)" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                      Pedir por WhatsApp
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT — prenda seleccionada + loading + resultado + productos */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {selectedCloth ? (
              <div style={{ background: "linear-gradient(145deg,rgba(6,77,60,.97),rgba(4,52,44,.94))", borderRadius: "24px", padding: "1.8rem", position: "relative", overflow: "hidden", boxShadow: "0 14px 44px rgba(4,52,44,.32)" }}>
                <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "160px", height: "160px", background: "rgba(29,158,117,.12)", borderRadius: "50%", pointerEvents: "none" }} />
                <p style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", color: "#9FE1CB", textTransform: "uppercase", margin: "0 0 12px" }}>Prenda seleccionada</p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "90px", height: "90px", minWidth: "90px", background: "white", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", border: "2.5px solid #9FE1CB", overflow: "hidden", boxShadow: "0 6px 22px rgba(0,0,0,.28)" }}>
                    <img src={selectedCloth.imageUrl} alt={selectedCloth.name} style={{ width: "85%", height: "85%", objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 900, fontSize: "17px", color: "white", margin: "0 0 3px" }}>{selectedCloth.name}</p>
                    <p style={{ fontSize: "12px", color: "#9FE1CB", margin: "0 0 8px", lineHeight: 1.4 }}>{selectedCloth.description}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "22px", fontWeight: 900, color: "#9FE1CB", letterSpacing: "-0.5px" }}>S/ {selectedCloth.price.toFixed(2)}</span>
                      <button
                        onClick={handleReservar}
                        onMouseEnter={e => animate(e.currentTarget, { scale: 1.05, duration: 150, easing: "easeOutBack" })}
                        onMouseLeave={e => animate(e.currentTarget, { scale: 1, duration: 160, easing: "easeOutBack" })}
                        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", color: "white", border: "none", borderRadius: "12px", padding: "8px 16px", cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: "12px", display: "flex", alignItems: "center", gap: "5px", boxShadow: "0 3px 12px rgba(37,211,102,.3)" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        Reservar
                      </button>
                    </div>
                    <button
                      onClick={() => { setSelectedCloth(null); setResultImage(null); document.querySelectorAll(".cloth-card").forEach(c => { (c as HTMLElement).style.outline = "none"; (c as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)"; }); }}
                      style={{ marginTop: "8px", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", borderRadius: "8px", padding: "4px 12px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "11px", color: "rgba(255,255,255,.7)" }}>
                      Cambiar prenda
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ background: "white", borderRadius: "24px", padding: "2.5rem", textAlign: "center", border: "2px dashed #c8eedd", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "52px" }}>👕</span>
                <p style={{ fontWeight: 800, fontSize: "15px", color: "#085041", margin: 0 }}>Sin prenda seleccionada</p>
                <p style={{ fontSize: "12px", color: "#7ecfb4", margin: 0 }}>Elige una de la tienda de arriba</p>
              </div>
            )}

            {/* Loading */}
            {loadingTryOn && (
              <div style={{ background: "linear-gradient(145deg,rgba(6,77,60,.97),rgba(4,52,44,.94))", borderRadius: "24px", padding: "2.5rem 2rem", textAlign: "center", boxShadow: "0 12px 40px rgba(4,52,44,.3)" }}>
                <div ref={particlesRef} style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "1.5rem" }}>
                  {["#9FE1CB", "#1D9E75", "#0a5c46", "#1D9E75", "#9FE1CB"].map((color, i) => (
                    <div key={i} className="particle" style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, opacity: 0.4 }} />
                  ))}
                </div>
                <div style={{ marginBottom: "14px", display: "inline-block" }}>
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: "petBounce 1.0s ease-in-out infinite" }}>
                    {/* body */}
                    <ellipse cx="36" cy="44" rx="20" ry="16" fill="#9FE1CB"/>
                    {/* head */}
                    <circle cx="36" cy="24" r="14" fill="#9FE1CB"/>
                    {/* ears */}
                    <ellipse cx="24" cy="14" rx="7" ry="9" fill="#1D9E75" style={{ animation: "earWiggle 0.9s ease-in-out infinite alternate" }}/>
                    <ellipse cx="48" cy="14" rx="7" ry="9" fill="#1D9E75" style={{ animation: "earWiggle 0.9s ease-in-out infinite alternate-reverse" }}/>
                    {/* inner ears */}
                    <ellipse cx="24" cy="14" rx="4" ry="6" fill="#b8ead6"/>
                    <ellipse cx="48" cy="14" rx="4" ry="6" fill="#b8ead6"/>
                    {/* eyes */}
                    <circle cx="30" cy="22" r="3" fill="#085041"/>
                    <circle cx="42" cy="22" r="3" fill="#085041"/>
                    <circle cx="31" cy="21" r="1" fill="white"/>
                    <circle cx="43" cy="21" r="1" fill="white"/>
                    {/* nose */}
                    <ellipse cx="36" cy="28" rx="3" ry="2" fill="#085041"/>
                    {/* mouth */}
                    <path d="M33 31 Q36 34 39 31" stroke="#085041" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    {/* tail */}
                    <path d="M54 46 Q64 38 60 30" stroke="#1D9E75" strokeWidth="5" strokeLinecap="round" fill="none" style={{ animation: "tailWag 0.5s ease-in-out infinite alternate", transformOrigin: "54px 46px" }}/>
                    {/* legs */}
                    <rect x="20" y="55" width="8" height="12" rx="4" fill="#1D9E75" style={{ animation: "legBounce 0.5s ease-in-out infinite alternate" }}/>
                    <rect x="44" y="55" width="8" height="12" rx="4" fill="#1D9E75" style={{ animation: "legBounce 0.5s ease-in-out infinite alternate-reverse" }}/>
                  </svg>
                </div>
                <p style={{ fontWeight: 900, fontSize: "16px", color: "white", margin: "0 0 6px" }}>Generando ropa en tu mascota</p>
                <p style={{ fontSize: "12px", color: "#9FE1CB", margin: "0 0 18px", fontWeight: 600 }}>{pollingStatus || "Iniciando IA..."}</p>
                <div style={{ background: "rgba(255,255,255,.1)", borderRadius: "20px", height: "6px", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "linear-gradient(90deg,#1D9E75,#9FE1CB,#1D9E75)", backgroundSize: "200% 100%", borderRadius: "20px", animation: "shimmer 1.5s linear infinite" }} />
                </div>
              </div>
            )}

            {/* Resultado */}
            {resultImage && !loadingTryOn && (
              <div ref={resultRef} style={{ opacity: 0 }}>
                <div style={{ background: "linear-gradient(145deg,rgba(6,77,60,.96),rgba(4,52,44,.93))", borderRadius: "24px", padding: "1.4rem", boxShadow: "0 12px 40px rgba(4,52,44,.3)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <div style={{ flex: 1, height: "1px", background: "rgba(159,225,203,.3)" }} />
                    <p style={{ color: "white", fontWeight: 900, fontSize: "14px", margin: 0 }}>🎉 Resultado generado</p>
                    <div style={{ flex: 1, height: "1px", background: "rgba(159,225,203,.3)" }} />
                  </div>
                  <img src={resultImage} alt="Resultado" style={{ width: "100%", borderRadius: "16px", border: "2px solid #9FE1CB", boxShadow: "0 8px 28px rgba(0,0,0,.28)", display: "block" }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px" }}>
                    <button
                      onClick={generateTryOn}
                      onMouseEnter={e => animate(e.currentTarget, { scale: 1.03, duration: 150, easing: "easeOutBack" })}
                      onMouseLeave={e => animate(e.currentTarget, { scale: 1, duration: 180, easing: "easeOutBack" })}
                      style={{ background: "rgba(29,158,117,.2)", border: "1.5px solid #9FE1CB", borderRadius: "12px", padding: "10px", cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: "12px", color: "#9FE1CB" }}>
                      ↺ Regenerar
                    </button>
                    <button
                      onClick={handleReservar}
                      onMouseEnter={e => animate(e.currentTarget, { scale: 1.03, duration: 150, easing: "easeOutBack" })}
                      onMouseLeave={e => animate(e.currentTarget, { scale: 1, duration: 180, easing: "easeOutBack" })}
                      style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", border: "none", borderRadius: "12px", padding: "10px", cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: "12px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                      ¡Lo quiero!
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── MODAL RESERVA ── */}
      {showReservaModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(4,52,44,0.7)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "1rem",
        }} onClick={() => setShowReservaModal(false)}>
          <div
            ref={modalRef}
            onClick={e => e.stopPropagation()}
            style={{
              background: "white", borderRadius: "28px", padding: "2.5rem", maxWidth: "420px", width: "100%",
              boxShadow: "0 30px 80px rgba(4,52,44,.4)", opacity: 0,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "52px", marginBottom: "8px" }}>🐾</div>
              <h2 style={{ fontWeight: 900, fontSize: "22px", color: "#085041", margin: "0 0 6px" }}>Reservar prenda</h2>
              <p style={{ fontSize: "13px", color: "#7ecfb4", margin: 0 }}>Te llevamos directo a WhatsApp para coordinar</p>
            </div>

            {selectedCloth && (
              <div style={{ background: "linear-gradient(135deg,#f0fdf8,#e0f7ef)", borderRadius: "18px", padding: "14px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.2rem", border: "1.5px solid #c8eedd" }}>
                <div style={{ width: "60px", height: "60px", background: "white", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #9FE1CB", overflow: "hidden" }}>
                  <img src={selectedCloth.imageUrl} alt={selectedCloth.name} style={{ width: "85%", height: "85%", objectFit: "contain" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 900, fontSize: "15px", color: "#085041", margin: "0 0 2px" }}>{selectedCloth.name}</p>
                  <p style={{ fontWeight: 900, fontSize: "18px", color: "#1D9E75", margin: 0 }}>S/ {selectedCloth.price.toFixed(2)}</p>
                </div>
              </div>
            )}

            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 800, color: "#0F6E56", marginBottom: "6px", letterSpacing: "0.05em" }}>
                ¿Cómo se llama tu peludo? (opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: Tobi, Luna, Coco..."
                value={petName}
                onChange={e => setPetName(e.target.value)}
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "14px",
                  border: "1.5px solid #c8eedd", fontFamily: "inherit",
                  fontSize: "14px", fontWeight: 600, color: "#085041",
                  outline: "none", background: "#f8fffe",
                  boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#1D9E75"}
                onBlur={e => e.target.style.borderColor = "#c8eedd"}
                onKeyDown={e => e.key === "Enter" && handleConfirmReserva()}
              />
            </div>

            <button
              onClick={handleConfirmReserva}
              onMouseEnter={e => animate(e.currentTarget, { scale: 1.03, duration: 150, easing: "easeOutBack" })}
              onMouseLeave={e => animate(e.currentTarget, { scale: 1, duration: 160, easing: "easeOutBack" })}
              style={{
                width: "100%", background: "linear-gradient(135deg,#25D366,#128C7E)",
                color: "white", border: "none", borderRadius: "18px",
                padding: "16px", cursor: "pointer", fontFamily: "inherit",
                fontWeight: 900, fontSize: "15px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                boxShadow: "0 8px 24px rgba(37,211,102,.32)", marginBottom: "10px",
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              Ir a WhatsApp a reservar
            </button>

            <button
              onClick={() => setShowReservaModal(false)}
              style={{ width: "100%", background: "transparent", border: "1.5px solid #e4f5ee", borderRadius: "14px", padding: "12px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "13px", color: "#7ecfb4" }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes shimmer {
          0%{background-position:200% 0}
          100%{background-position:-200% 0}
        }
        @keyframes petBounce {
          0%,100%{transform:translateY(0) scale(1)}
          50%{transform:translateY(-10px) scale(1.04)}
        }
        @keyframes earWiggle {
          0%{transform:rotate(-8deg)}
          100%{transform:rotate(8deg)}
        }
        @keyframes tailWag {
          0%{transform:rotate(-20deg)}
          100%{transform:rotate(20deg)}
        }
        @keyframes legBounce {
          0%{transform:translateY(0)}
          100%{transform:translateY(-5px)}
        }
      `}</style>
    </div>
  );
}