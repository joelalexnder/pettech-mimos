"use client";

import { useState, useRef, useEffect, DragEvent, ChangeEvent } from "react";
import { animate, stagger, createTimeline } from "animejs";
import { clothingItems, ClothingItem } from "@/data/clothes";

const steps = [
  { icon: "📸", title: "Toma la foto", desc: "Usa la cámara o sube desde tu galería." },
  { icon: "🐾", title: "Análisis de IA", desc: "Comparamos sus rasgos con miles de razas." },
  { icon: "✨", title: "Resultados", desc: "Recibe recomendaciones personalizadas." },
];

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
  const [phase, setPhase] = useState<"upload" | "carousel">("upload");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingTryOn, setLoadingTryOn] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const heroRef    = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);
  const dropRef    = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const carouselRef= useRef<HTMLDivElement>(null);
  const resultRef  = useRef<HTMLDivElement>(null);
  const productosRef=useRef<HTMLDivElement>(null);
  const ctaBtnRef  = useRef<HTMLButtonElement>(null);
  const tryOnBtnRef= useRef<HTMLButtonElement>(null);

  const selectedItem = clothingItems[carouselIndex];

  // ── Hero + columna izquierda en cascada ──
  useEffect(() => {
    const tl = createTimeline();
    if (heroRef.current) {
      tl.add(heroRef.current, { opacity: [0, 1], translateY: [-32, 0], duration: 700, easing: "easeOutExpo" });
    }
    if (leftColRef.current) {
      tl.add(leftColRef.current, { opacity: [0, 1], translateX: [-28, 0], duration: 650, easing: "easeOutExpo" }, "-=400");
    }
    if (stepsRef.current) {
      const cards = stepsRef.current.querySelectorAll(".step-card");
      tl.add(cards, { opacity: [0, 1], translateX: [28, 0], delay: stagger(110), duration: 550, easing: "easeOutExpo" }, "-=500");
    }
  }, []);

  // ── Pulso periódico en CTA ──
  useEffect(() => {
    if (phase !== "upload" || !ctaBtnRef.current) return;
    let cancelled = false;
    const pulse = () => {
      if (cancelled || !ctaBtnRef.current) return;
      animate(ctaBtnRef.current, {
        scale: [1, 1.045, 1],
        duration: 1900,
        easing: "easeInOutSine",
        onComplete: () => pulse(),
      });
    };
    const t = setTimeout(pulse, 1400);
    return () => { cancelled = true; clearTimeout(t); };
  }, [phase]);

  // ── Auto-rotate carrusel ──
  useEffect(() => {
    if (phase !== "carousel" || loadingTryOn) return;
    const iv = setInterval(() => setCarouselIndex(p => (p + 1) % clothingItems.length), 2500);
    return () => clearInterval(iv);
  }, [phase, loadingTryOn]);

  // ── Animar entrada carrusel ──
  useEffect(() => {
    if (phase !== "carousel" || !carouselRef.current) return;
    animate(carouselRef.current, {
      opacity: [0, 1], translateY: [44, 0], scale: [0.95, 1],
      duration: 700, easing: "easeOutExpo",
    });
  }, [phase]);

  // ── Animar productos ──
  useEffect(() => {
    if (!productosRef.current || productos.length === 0) return;
    const cards = productosRef.current.querySelectorAll(".prod-card");
    animate(cards, {
      opacity: [0, 1], translateX: [-20, 0],
      delay: stagger(75), duration: 480, easing: "easeOutExpo",
    });
  }, [productos]);

  // ── Animar resultado try-on ──
  useEffect(() => {
    if (!resultImage || !resultRef.current) return;
    createTimeline()
      .add(resultRef.current, {
        opacity: [0, 1], scale: [0.86, 1],
        duration: 750, easing: "easeOutBack",
      });
  }, [resultImage]);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = e => {
      const r = e.target?.result;
      if (typeof r === "string") {
        setImagePreview(r);
        if (dropRef.current) animate(dropRef.current, { scale: [1, 1.035, 1], duration: 420, easing: "easeOutBack" });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) handleFile(f);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (f) handleFile(f);
  };

  const goToCarousel = () => {
    if (!stepsRef.current) { setPhase("carousel"); return; }
    animate(stepsRef.current, {
      opacity: [1, 0], translateX: [0, 30], duration: 280, easing: "easeInExpo",
      onComplete: () => setPhase("carousel"),
    });
  };

  const goBack = () => {
    if (!carouselRef.current) { setPhase("upload"); return; }
    animate(carouselRef.current, {
      opacity: [1, 0], translateY: [0, 24], duration: 280, easing: "easeInExpo",
      onComplete: () => {
        setPhase("upload");
        setImagePreview(null); setCarouselIndex(0); setResultImage(null); setProductos([]);
        setTimeout(() => {
          if (stepsRef.current) {
            const cards = stepsRef.current.querySelectorAll(".step-card");
            animate(cards, { opacity: [0, 1], translateX: [28, 0], delay: stagger(100), duration: 500, easing: "easeOutExpo" });
          }
        }, 40);
      },
    });
  };

  const goLeft  = () => setCarouselIndex(p => (p - 1 + clothingItems.length) % clothingItems.length);
  const goRight = () => setCarouselIndex(p => (p + 1) % clothingItems.length);

  const fetchProductosRecomendados = async () => {
    setLoadingProductos(true);
    try {
      const res = await fetch(`/api/productos/recomendados?categoria=accesorio&limit=4`);
      const text = await res.text();
      if (!res.ok) {
        console.error(`Error ${res.status} en /api/productos/recomendados:`, text.slice(0, 300));
        return;
      }
      try {
        const data = JSON.parse(text);
        if (data.productos) setProductos(data.productos);
      } catch {
        console.error("La API no devolvió JSON válido:", text.slice(0, 300));
      }
    } catch (err) { console.error("Error de red:", err); }
    finally { setLoadingProductos(false); }
  };

  // 🧪 DEV_MODE: true = solo prueba productos sin gastar tokens del try-on
  const DEV_MODE = true;

  const generateTryOn = async () => {
    if (!selectedFile) { alert("Sube una imagen primero"); return; }
    if (tryOnBtnRef.current) animate(tryOnBtnRef.current, { scale: [1, 0.92, 1], duration: 260, easing: "easeOutBack" });
    setLoadingTryOn(true); setResultImage(null); setProductos([]);
    try {
      if (DEV_MODE) {
        // Solo probar productos — imagen simulada, sin llamar a /api/tryon
        await fetchProductosRecomendados();
        setResultImage(imagePreview); // muestra la misma foto subida como "resultado"
        setLoadingTryOn(false);
        return;
      }
      const fd = new FormData();
      fd.append("file", selectedFile);
      fd.append("clothId", selectedItem.id);
      fd.append("clothImageUrl", selectedItem.imageUrl);
      fd.append("clothName", selectedItem.name);
      const [res] = await Promise.all([fetch("/api/tryon", { method: "POST", body: fd }), fetchProductosRecomendados()]);
      const data = await res.json();
      if (data.image) setResultImage(data.image);
      else alert(data.error || "Error generando resultado");
    } catch (e) { console.error(e); alert("Error inesperado"); }
    finally { setLoadingTryOn(false); }
  };

  const arrowHover = (el: HTMLButtonElement, enter: boolean) =>
    animate(el, { scale: enter ? 1.18 : 1, duration: 190, easing: "easeOutBack" });

  const btnHover = (el: HTMLElement, enter: boolean) =>
    animate(el, { scale: enter ? 1.04 : 1, duration: 180, easing: "easeOutBack" });

  const visibleItems = () => {
    const r: { item: ClothingItem; offset: number }[] = [];
    for (let i = -2; i <= 2; i++) {
      const idx = ((carouselIndex + i) % clothingItems.length + clothingItems.length) % clothingItems.length;
      r.push({ item: clothingItems[idx], offset: i });
    }
    return r;
  };

  const urgColor = { alta: "#ef4444", media: "#f59e0b", baja: "#10b981" } as Record<string,string>;
  const urgLabel = { alta: "Muy pedido", media: "Popular", baja: "Disponible" } as Record<string,string>;

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "linear-gradient(160deg,#f0fdf8 0%,#e6f9f2 60%,#f5fffb 100%)", fontFamily: "'Nunito','Segoe UI',sans-serif", overflowX: "hidden", display: "flex", flexDirection: "column" }}>

      {/* ── Hero ── */}
      <div ref={heroRef} style={{ textAlign: "center", padding: "5rem 1rem 2rem", opacity: 0 }}>
        {/* Título decorado */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "0.8rem" }}>
          <div style={{ width: "36px", height: "2px", background: "linear-gradient(90deg,transparent,#9FE1CB)", borderRadius: "2px" }} />
          <span style={{ fontSize: "12px", fontWeight: 800, color: "#1D9E75", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Moda para peludos ✦
          </span>
          <div style={{ width: "36px", height: "2px", background: "linear-gradient(90deg,#9FE1CB,transparent)", borderRadius: "2px" }} />
        </div>
        <h1 style={{ fontSize: "clamp(30px,5vw,46px)", fontWeight: 900, color: "#085041", margin: "0 0 8px", letterSpacing: "-1px", lineHeight: 1.1 }}>
          Probador <span style={{ color: "#1D9E75" }}>Virtual</span>
        </h1>
        <p style={{ fontSize: "15px", color: "#3aaa82", fontWeight: 600, margin: 0 }}>
          Descubre qué prenda le queda mejor a tu peludo 🐶
        </p>
      </div>

      {/* ── Grid principal ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.8rem", padding: "0 2.5rem 3rem", maxWidth: "1200px", margin: "0 auto", width: "100%", boxSizing: "border-box", flex: 1, alignItems: "start" }}>

        {/* LEFT */}
        <div ref={leftColRef} style={{ display: "flex", flexDirection: "column", gap: "14px", opacity: 0 }}>

          {/* Drop zone */}
          <div
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => !imagePreview && fileInputRef.current?.click()}
            style={{
              background: isDragging ? "#d6f5ea" : "white",
              border: isDragging ? "2.5px dashed #1D9E75" : imagePreview ? "2px solid #9FE1CB" : "2.5px dashed #b8ead6",
              borderRadius: "24px",
              height: "280px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              cursor: imagePreview ? "default" : "pointer",
              transition: "border-color .3s, background .3s",
              position: "relative", overflow: "hidden",
              boxShadow: "0 6px 32px rgba(29,158,117,0.10)",
            }}
          >
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="mascota" style={{ width:"100%",height:"100%",objectFit:"cover",borderRadius:"22px" }} />
                <button
                  onClick={e => { e.stopPropagation(); setImagePreview(null); setResultImage(null); setProductos([]); }}
                  style={{ position:"absolute",top:"10px",right:"10px",background:"white",border:"1.5px solid #9FE1CB",borderRadius:"50%",width:"30px",height:"30px",cursor:"pointer",fontSize:"14px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,.12)" }}
                >✕</button>
                <div style={{ position:"absolute",bottom:"12px",left:"50%",transform:"translateX(-50%)",background:"#1D9E75",color:"white",fontSize:"11px",fontWeight:800,padding:"5px 16px",borderRadius:"20px",whiteSpace:"nowrap",boxShadow:"0 3px 12px rgba(29,158,117,.4)" }}>
                  ✓ Foto cargada
                </div>
              </>
            ) : (
              <div style={{ textAlign:"center",padding:"2rem" }}>
                {/* Ícono animado */}
                <div style={{ position:"relative",width:"76px",height:"76px",margin:"0 auto 1.2rem" }}>
                  <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,#d6f5ea,#9FE1CB)",borderRadius:"50%",opacity:.5 }} />
                  <div style={{ position:"absolute",inset:"6px",background:"linear-gradient(135deg,#e8faf3,#d0f0e4)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px" }}>
                    📷
                  </div>
                </div>
                <p style={{ fontWeight:900,fontSize:"16px",color:"#085041",margin:"0 0 6px" }}>Sube a tu mascota</p>
                <p style={{ fontSize:"12px",color:"#7ecfb4",margin:0,lineHeight:1.5 }}>JPG, PNG · Arrastra o haz clic<br/>para elegir una foto</p>
              </div>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleInputChange} />

          {/* Botones acción */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px" }}>
            {[{ emoji:"📷",label:"Tomar Foto" },{ emoji:"🖼️",label:"Galería" }].map(({ emoji, label }) => (
              <button
                key={label}
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={e => { e.currentTarget.style.background="#e0f7ef"; btnHover(e.currentTarget, true); }}
                onMouseLeave={e => { e.currentTarget.style.background="white"; btnHover(e.currentTarget, false); }}
                style={{ background:"white",border:"1.5px solid #c8eedd",borderRadius:"16px",padding:"14px 8px",cursor:"pointer",fontFamily:"inherit",fontWeight:800,fontSize:"13px",color:"#0F6E56",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px",boxShadow:"0 2px 10px rgba(29,158,117,.08)" }}
              >
                <span style={{ fontSize:"16px" }}>{emoji}</span> {label}
              </button>
            ))}
          </div>

          {/* Status pill */}
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:"8px" }}>
            <div style={{ width:"8px",height:"8px",borderRadius:"50%",background:imagePreview?"#1D9E75":"#b8ead6",boxShadow:imagePreview?"0 0 0 3px rgba(29,158,117,.2)":"none",transition:"all .3s" }} />
            <span style={{ fontSize:"12px",color:imagePreview?"#0F6E56":"#7ecfb4",fontWeight:700,transition:"color .3s" }}>
              {imagePreview ? "✓ Imagen lista para probar" : "Esperando imagen..."}
            </span>
          </div>

          {/* Productos recomendados */}
          {(loadingProductos || productos.length > 0) && (
            <div ref={productosRef} style={{ marginTop:"2px" }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px" }}>
                <div>
                  <p style={{ fontSize:"10px",fontWeight:800,letterSpacing:".15em",color:"#1D9E75",textTransform:"uppercase",margin:"0 0 2px" }}>✨ Recomendados</p>
                  <p style={{ fontSize:"12px",color:"#7ecfb4",fontWeight:600,margin:0 }}>Basado en la prenda seleccionada</p>
                </div>
                <span style={{ fontSize:"10px",fontWeight:800,color:"white",background:"linear-gradient(135deg,#1D9E75,#0F6E56)",padding:"4px 12px",borderRadius:"20px",boxShadow:"0 2px 8px rgba(29,158,117,.3)" }}>
                  {productos.length} items
                </span>
              </div>

              {loadingProductos && productos.length === 0 && (
                <div style={{ display:"flex",flexDirection:"column",gap:"9px" }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ background:"white",borderRadius:"18px",padding:"13px",display:"flex",gap:"12px",border:"1.5px solid #e4f5ee",animation:"pulse 1.4s ease-in-out infinite",animationDelay:`${i*.15}s` }}>
                      <div style={{ width:"56px",height:"56px",minWidth:"56px",borderRadius:"14px",background:"#e8f8f2" }} />
                      <div style={{ flex:1 }}>
                        <div style={{ height:"11px",background:"#e8f8f2",borderRadius:"6px",marginBottom:"9px",width:"68%" }} />
                        <div style={{ height:"9px",background:"#e8f8f2",borderRadius:"6px",width:"88%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {productos.length > 0 && (
                <div style={{ display:"flex",flexDirection:"column",gap:"9px" }}>
                  {productos.map(prod => (
                    <div
                      key={prod.id}
                      className="prod-card"
                      onMouseEnter={e => animate(e.currentTarget, { translateY:-3,duration:180,easing:"easeOutBack" })}
                      onMouseLeave={e => animate(e.currentTarget, { translateY:0,duration:200,easing:"easeOutBack" })}
                      style={{ background:"white",borderRadius:"18px",padding:"13px",display:"flex",gap:"12px",alignItems:"center",border:"1.5px solid #e4f5ee",boxShadow:"0 2px 12px rgba(29,158,117,.07)",cursor:"pointer" }}
                    >
                      <div style={{ width:"58px",height:"58px",minWidth:"58px",borderRadius:"14px",overflow:"hidden",background:"linear-gradient(135deg,#d6f5ea,#b8ead6)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                        {prod.imagen
                          ? <img src={prod.imagen} alt={prod.nombre} style={{ width:"100%",height:"100%",objectFit:"cover" }} onError={e => { (e.target as HTMLImageElement).style.display="none"; }} />
                          : <span style={{ fontSize:"24px" }}>🛍️</span>
                        }
                      </div>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"6px" }}>
                          <p style={{ fontWeight:900,fontSize:"13px",color:"#085041",margin:"0 0 3px",lineHeight:1.3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical" }}>{prod.nombre}</p>
                          <p style={{ fontWeight:900,fontSize:"14px",color:"#0F6E56",margin:0,whiteSpace:"nowrap" }}>S/ {prod.precio.toFixed(2)}</p>
                        </div>
                        <p style={{ fontSize:"11px",color:"#7ecfb4",margin:"0 0 7px",lineHeight:1.4,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical" }}>{prod.descripcion}</p>
                        <div style={{ display:"flex",alignItems:"center",gap:"7px" }}>
                          <span style={{ display:"inline-flex",alignItems:"center",gap:"4px",fontSize:"10px",fontWeight:700,color:urgColor[prod.urgencia],background:`${urgColor[prod.urgencia]}18`,padding:"3px 9px",borderRadius:"20px" }}>
                            <span style={{ width:"5px",height:"5px",borderRadius:"50%",background:urgColor[prod.urgencia],display:"inline-block" }} />
                            {urgLabel[prod.urgencia]}
                          </span>
                          <span style={{ fontSize:"10px",color:prod.stock>10?"#1D9E75":"#f59e0b",fontWeight:700 }}>
                            {prod.stock>0?`${prod.stock} en stock`:"Agotado"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onMouseEnter={e => btnHover(e.currentTarget, true)}
                    onMouseLeave={e => btnHover(e.currentTarget, false)}
                    onClick={() => {
                      const msg = encodeURIComponent(`¡Hola! Vi el probador virtual de Mimos Pet Club y me interesa: ${productos.slice(0,2).map(p=>p.nombre).join(", ")} 🐾`);
                      window.open(`https://wa.me/?text=${msg}`, "_blank");
                    }}
                    style={{ width:"100%",background:"linear-gradient(135deg,#25D366,#128C7E)",color:"white",border:"none",borderRadius:"16px",padding:"13px",cursor:"pointer",fontFamily:"inherit",fontWeight:800,fontSize:"13px",display:"flex",alignItems:"center",justifyContent:"center",gap:"9px",boxShadow:"0 5px 18px rgba(37,211,102,.3)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Pedir por WhatsApp
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ position:"relative",minHeight:"360px" }}>

          {/* STEPS */}
          <div
            ref={stepsRef}
            style={{ opacity:phase==="carousel"?0:1, pointerEvents:phase==="upload"?"auto":"none", position:phase==="carousel"?"absolute":"relative", width:"100%", top:0 }}
          >
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"1rem" }}>
              <div style={{ width:"3px",height:"22px",background:"linear-gradient(180deg,#1D9E75,#9FE1CB)",borderRadius:"2px" }} />
              <p style={{ fontSize:"11px",fontWeight:800,letterSpacing:".16em",color:"#1D9E75",textTransform:"uppercase",margin:0 }}>¿Cómo funciona?</p>
            </div>

            <div style={{ display:"flex",flexDirection:"column",gap:"10px" }}>
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="step-card"
                  style={{ background:"white",borderRadius:"18px",padding:"15px 16px",display:"flex",alignItems:"center",gap:"14px",border:"1.5px solid #e4f5ee",boxShadow:"0 3px 14px rgba(29,158,117,.07)",opacity:0 }}
                >
                  <div style={{ width:"44px",height:"44px",minWidth:"44px",background:"linear-gradient(135deg,#d6f5ea,#b8ead6)",borderRadius:"14px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",boxShadow:"0 2px 8px rgba(29,158,117,.15)" }}>
                    {step.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight:900,fontSize:"14px",color:"#085041",margin:"0 0 3px" }}>{i+1}. {step.title}</p>
                    <p style={{ fontSize:"12px",color:"#7ecfb4",margin:0,lineHeight:1.4 }}>{step.desc}</p>
                  </div>
                  {/* Número decorativo */}
                  <div style={{ marginLeft:"auto",fontSize:"28px",fontWeight:900,color:"#e8f8f2",lineHeight:1,userSelect:"none" }}>{i+1}</div>
                </div>
              ))}
            </div>

            {/* Separador decorativo */}
            <div style={{ display:"flex",alignItems:"center",gap:"10px",margin:"16px 0" }}>
              <div style={{ flex:1,height:"1px",background:"linear-gradient(90deg,#e4f5ee,transparent)" }} />
              <span style={{ fontSize:"12px",color:"#9FE1CB" }}>✦</span>
              <div style={{ flex:1,height:"1px",background:"linear-gradient(90deg,transparent,#e4f5ee)" }} />
            </div>

            <button
              ref={ctaBtnRef}
              onClick={goToCarousel}
              onMouseEnter={e => btnHover(e.currentTarget, true)}
              onMouseLeave={e => btnHover(e.currentTarget, false)}
              style={{ width:"100%",background:"linear-gradient(135deg,#1D9E75,#0a5c46)",color:"white",border:"none",borderRadius:"18px",padding:"16px",cursor:"pointer",fontFamily:"inherit",fontWeight:900,fontSize:"15px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",boxShadow:"0 8px 24px rgba(15,110,86,.30)",letterSpacing:".01em" }}
            >
              <span style={{ fontSize:"18px" }}>👕</span>
              Ver prendas Mimos
              <span style={{ background:"rgba(255,255,255,.15)",borderRadius:"8px",padding:"2px 8px",fontSize:"11px",fontWeight:800,letterSpacing:".08em" }}>★ NEW</span>
            </button>
          </div>

          {/* CAROUSEL */}
          <div
            ref={carouselRef}
            style={{ opacity:phase==="upload"?0:1, pointerEvents:phase==="carousel"?"auto":"none", position:phase==="upload"?"absolute":"relative", width:"100%", top:0 }}
          >
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px" }}>
              <div style={{ width:"3px",height:"22px",background:"linear-gradient(180deg,#1D9E75,#9FE1CB)",borderRadius:"2px" }} />
              <p style={{ fontSize:"11px",fontWeight:800,letterSpacing:".16em",color:"#1D9E75",textTransform:"uppercase",margin:0 }}>Probador virtual</p>
            </div>
            <h2 style={{ fontSize:"21px",fontWeight:900,color:"#085041",margin:"0 0 4px" }}>Elige la prenda perfecta 🐾</h2>
            <p style={{ fontSize:"12px",color:"#7ecfb4",fontWeight:600,margin:"0 0 16px" }}>Desliza para explorar el catálogo</p>

            {/* Card oscura del carrusel */}
            <div style={{ background:"linear-gradient(145deg,rgba(6,77,60,.97),rgba(4,52,44,.94))",borderRadius:"26px",padding:"2.6rem 2rem 2rem",position:"relative",overflow:"hidden",boxShadow:"0 16px 48px rgba(4,52,44,.35)" }}>
              {/* Orbes decorativos */}
              <div style={{ position:"absolute",top:"-60px",right:"-60px",width:"180px",height:"180px",background:"rgba(29,158,117,.14)",borderRadius:"50%",pointerEvents:"none" }} />
              <div style={{ position:"absolute",bottom:"-40px",left:"-40px",width:"130px",height:"130px",background:"rgba(159,225,203,.07)",borderRadius:"50%",pointerEvents:"none" }} />
              <div style={{ position:"absolute",top:"50%",left:"-20px",transform:"translateY(-50%)",width:"60px",height:"60px",background:"rgba(29,158,117,.08)",borderRadius:"50%",pointerEvents:"none" }} />

              {/* Items */}
              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"1.4rem",position:"relative",zIndex:1 }}>
                <button onClick={goLeft} onMouseEnter={e=>arrowHover(e.currentTarget,true)} onMouseLeave={e=>arrowHover(e.currentTarget,false)}
                  style={{ background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.22)",borderRadius:"50%",width:"36px",height:"36px",cursor:"pointer",color:"white",fontSize:"19px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>‹</button>

                {visibleItems().map(({ item, offset }) => {
                  const isC = offset === 0;
                  const scale = isC ? 1 : Math.abs(offset)===1 ? 0.77 : 0.57;
                  const opac  = isC ? 1 : Math.abs(offset)===1 ? 0.62 : 0.28;
                  const blur  = isC ? 0 : Math.abs(offset)===1 ? 1.5 : 3;
                  const size  = isC ? 112 : Math.abs(offset)===1 ? 80 : 60;
                  return (
                    <div key={`${item.id}-${offset}`}
                      onClick={() => { if (offset<0) goLeft(); else if (offset>0) goRight(); }}
                      style={{ filter:`blur(${blur}px)`, transform:`perspective(1000px) translateX(${offset*6}px) rotateY(${offset*-18}deg) scale(${scale})`, opacity:opac, zIndex:isC?10:Math.abs(offset)===1?5:1, cursor:isC?"default":"pointer", transition:"transform .55s cubic-bezier(.22,1,.36,1),opacity .4s,filter .4s", flexShrink:0 }}
                    >
                      <div style={{ width:`${size}px`,height:`${size}px`,background:isC?"white":"rgba(255,255,255,.88)",borderRadius:"18px",display:"flex",alignItems:"center",justifyContent:"center",border:isC?"2.5px solid #9FE1CB":"1.5px solid rgba(255,255,255,.2)",overflow:"hidden",boxShadow:isC?"0 12px 36px rgba(0,0,0,.32),0 0 0 5px rgba(159,225,203,.18)":"none",transition:"all .38s",position:"relative" }}>
                        <img src={item.imageUrl} alt={item.name} style={{ width:"82%",height:"82%",objectFit:"contain",transition:"transform .35s",transform:isC?"scale(1.08)":"scale(1)" }} />
                        {isC && <div style={{ position:"absolute",top:"6px",right:"6px",background:"#1D9E75",color:"white",borderRadius:"50%",width:"20px",height:"20px",fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900 }}>✓</div>}
                      </div>
                    </div>
                  );
                })}

                <button onClick={goRight} onMouseEnter={e=>arrowHover(e.currentTarget,true)} onMouseLeave={e=>arrowHover(e.currentTarget,false)}
                  style={{ background:"rgba(255,255,255,.08)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,.22)",borderRadius:"50%",width:"36px",height:"36px",cursor:"pointer",color:"white",fontSize:"19px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>›</button>
              </div>

              {/* Info prenda */}
              <div style={{ textAlign:"center",position:"relative",zIndex:1 }}>
                <p style={{ fontWeight:900,fontSize:"17px",color:"white",margin:"0 0 3px" }}>{selectedItem.name}</p>
                <p style={{ fontSize:"12px",color:"#9FE1CB",margin:"0 0 14px",lineHeight:1.5 }}>{selectedItem.description}</p>

                {/* Dots */}
                <div style={{ display:"flex",gap:"5px",justifyContent:"center",marginBottom:"16px" }}>
                  {clothingItems.map((_,i) => (
                    <div key={i} onClick={() => setCarouselIndex(i)}
                      style={{ width:i===carouselIndex?"24px":"7px",height:"7px",borderRadius:"4px",background:i===carouselIndex?"#9FE1CB":"rgba(255,255,255,.22)",cursor:"pointer",transition:"all .3s" }} />
                  ))}
                </div>

                <button
                  ref={tryOnBtnRef}
                  onClick={generateTryOn}
                  disabled={loadingTryOn}
                  onMouseEnter={e => !loadingTryOn && btnHover(e.currentTarget, true)}
                  onMouseLeave={e => !loadingTryOn && btnHover(e.currentTarget, false)}
                  style={{ background:"linear-gradient(135deg,#1D9E75,#9FE1CB)",color:"white",border:"none",borderRadius:"16px",padding:"12px 30px",cursor:loadingTryOn?"not-allowed":"pointer",fontFamily:"inherit",fontWeight:900,fontSize:"14px",boxShadow:"0 5px 20px rgba(29,158,117,.45)",opacity:loadingTryOn?.7:1,letterSpacing:".02em" }}
                >
                  {loadingTryOn ? (
                    <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
                      <div style={{ width:"16px",height:"16px",border:"2px solid rgba(255,255,255,.4)",borderTop:"2px solid white",borderRadius:"50%",animation:"spin .8s linear infinite" }} />
                      <span>Generando look IA...</span>
                    </div>
                  ) : "✨ Ver resultado"}
                </button>

                {resultImage && (
                  <div ref={resultRef} style={{ marginTop:"20px",opacity:0 }}>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"12px" }}>
                      <div style={{ flex:1,height:"1px",background:"rgba(159,225,203,.3)" }} />
                      <p style={{ color:"white",fontWeight:800,fontSize:"13px",margin:0 }}>🐶 Resultado generado</p>
                      <div style={{ flex:1,height:"1px",background:"rgba(159,225,203,.3)" }} />
                    </div>
                    <img src={resultImage} alt="Resultado" style={{ width:"100%",borderRadius:"20px",border:"2px solid #9FE1CB",boxShadow:"0 8px 28px rgba(0,0,0,.28)" }} />
                  </div>
                )}
              </div>
            </div>

            {/* Back */}
            <button
              onClick={goBack}
              onMouseEnter={e => { e.currentTarget.style.background="#e0f7ef"; animate(e.currentTarget,{translateX:-4,duration:150,easing:"easeOutExpo"}); }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; animate(e.currentTarget,{translateX:0,duration:200,easing:"easeOutExpo"}); }}
              style={{ marginTop:"12px",background:"transparent",border:"1.5px solid #c8eedd",borderRadius:"12px",padding:"9px 18px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"12px",color:"#0F6E56" }}
            >← Volver</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
    </div>
  );
}