/*

"use client";

import { useState, useRef, useEffect } from "react";
import { animate, stagger, createTimeline } from "animejs";
import { clothingItems, ClothingItem } from "@/data/clothes";
import {
  Camera, Sun, Focus, Sparkles, MessageCircle,
  UploadCloud, X, Check, ShoppingBag, Clock, Wand2, ArrowRight, Image as ImageIcon
} from "lucide-react";

const optimizarImagenCliente = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const TARGET_WIDTH = 900;
        const TARGET_HEIGHT = 1200;
        const canvas = document.createElement("canvas");
        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;
        const ctx = canvas.getContext("2d");
        if (ctx) { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT); }
        const imgRatio = img.width / img.height;
        const targetRatio = TARGET_WIDTH / TARGET_HEIGHT;
        let drawWidth, drawHeight, drawX, drawY;
        if (imgRatio > targetRatio) {
          drawWidth = TARGET_WIDTH;
          drawHeight = img.height * (TARGET_WIDTH / img.width);
          drawX = 0; drawY = (TARGET_HEIGHT - drawHeight) / 2;
        } else {
          drawHeight = TARGET_HEIGHT;
          drawWidth = img.width * (TARGET_HEIGHT / img.height);
          drawX = (TARGET_WIDTH - drawWidth) / 2; drawY = 0;
        }
        ctx?.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        canvas.toBlob((blob) => {
          if (blob) resolve(new File([blob], "mascota_optimizada.jpg", { type: "image/jpeg" }));
          else reject(new Error("No se pudo crear la imagen optimizada."));
        }, "image/jpeg", 0.95);
      };
      img.onerror = () => reject(new Error("Error al cargar la imagen original."));
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo."));
  });
};

export default function ProbadorVirtual() {
  const [selectedCloth, setSelectedCloth] = useState<ClothingItem | null>(null);
  const [itemToBuy, setItemToBuy] = useState<ClothingItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingTryOn, setLoadingTryOn] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [pollingStatus, setPollingStatus] = useState("");
  const [limitReachedMsg, setLimitReachedMsg] = useState<string | null>(null);
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [petName, setPetName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const uploadRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = createTimeline();
    if (heroRef.current) tl.add(heroRef.current, { opacity: [0, 1], translateY: [-30, 0], duration: 800, easing: "easeOutExpo" });
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".cloth-card");
      tl.add(cards, { opacity: [0, 1], translateY: [20, 0], scale: [0.95, 1], delay: stagger(40), duration: 600, easing: "easeOutExpo" }, "-=500");
    }
    if (uploadRef.current) tl.add(uploadRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 600, easing: "easeOutExpo" }, "-=400");
  }, []);

  useEffect(() => {
    if (showGuideModal) {
      animate(".guide-card", { opacity: [0, 1], translateY: [20, 0], delay: stagger(100), duration: 500, easing: "easeOutBack" });
    }
  }, [showGuideModal]);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = e => {
      if (typeof e.target?.result === "string") {
        setImagePreview(e.target.result);
        setResultImage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) handleFile(f);
  };

  const handleUploadIntent = () => {
    if (!imagePreview) setShowGuideModal(true);
  };

  const confirmUpload = () => {
    setShowGuideModal(false);
    setTimeout(() => { fileInputRef.current?.click(); }, 100);
  };

  const selectForAI = (item: ClothingItem) => {
    setSelectedCloth(item);
    setResultImage(null);
    uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buyDirect = (item: ClothingItem) => {
    setItemToBuy(item);
    setShowReservaModal(true);
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
    setLoadingTryOn(true); setResultImage(null); setPollingStatus("Optimizando foto..."); setLimitReachedMsg(null);
    try {
      const optimizedFile = await optimizarImagenCliente(selectedFile);
      const fd = new FormData();
      fd.append("file", optimizedFile);
      fd.append("clothId", `${selectedCloth.id}-${Date.now()}`);
      fd.append("clothImageUrl", selectedCloth.imageUrl);
      fd.append("clothName", selectedCloth.name);

      const res = await fetch("/api/tryon", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) setLimitReachedMsg(data.error || "Has alcanzado el límite diario.");
        else alert(data.error || "Error al procesar la imagen");
        return;
      }

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

  const handleConfirmReserva = () => {
    const targetItem = itemToBuy || selectedCloth;
    if (!targetItem) return;
    const nombre = petName.trim() || "mi mascota";
    const msg = encodeURIComponent(`¡Hola! Quiero adquirir la prenda *${targetItem.name}* (S/ ${targetItem.price.toFixed(2)}) para ${nombre}.\n\nLo vi en la web de Mimos Pet Club.`);
    window.open(`https://wa.me/51952189680?text=${msg}`, "_blank");
    setShowReservaModal(false);
    setPetName("");
  };

  return (
    <div className="relative min-h-screen bg-[#fafaf9] text-slate-900 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
        
        <div ref={heroRef} className="opacity-0 mb-16 md:mb-24 text-center">
          <h1 className="font-black tracking-tight leading-tight text-4xl md:text-6xl lg:text-7xl text-slate-900">
            Vístelo. <br className="hidden md:block"/>
            <span className="italic font-light text-slate-500">Antes de</span>{" "}
            <span className="text-orange-500">comprarlo.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-xl text-base md:text-lg text-slate-500 leading-relaxed">
            Adquiere nuestras prendas directamente o usa nuestra Inteligencia Artificial para visualizar cómo le quedarán a tu mascota en segundos.
          </p>
        </div>

        <div className="mb-24">
          <div className="flex items-end justify-between mb-8 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-500 mb-2">Paso 01</p>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">Elige una prenda</h2>
            </div>
            <span className="hidden md:inline text-sm font-semibold text-slate-400">{clothingItems.length} piezas disponibles</span>
          </div>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {clothingItems.map(item => {
              const isSel = selectedCloth?.id === item.id;
              return (
                <div key={item.id} className={`cloth-card opacity-0 group relative rounded-2xl overflow-hidden border transition-all duration-300 bg-white ${isSel ? "border-emerald-500 ring-4 ring-emerald-50 scale-[1.02] shadow-xl" : "border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1"}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 p-4 flex items-center justify-center">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
                    {isSel && (
                      <div className="absolute top-3 right-3 flex items-center justify-center bg-emerald-500 text-white p-1.5 rounded-full shadow-md z-10">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between h-auto">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 leading-tight">{item.name}</h3>
                      <p className="text-xs font-medium text-slate-500 line-clamp-1 mt-1">{item.description}</p>
                    </div>
                    <div className="mt-3 mb-4">
                      <span className="text-lg font-black text-emerald-600">S/ {item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col xl:flex-row gap-2">
                      <button onClick={() => buyDirect(item)} className="flex-1 bg-slate-900 text-white hover:bg-slate-800 py-2.5 px-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">Comprar</span>
                      </button>
                      <button onClick={() => selectForAI(item)} className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${isSel ? "bg-emerald-100 text-emerald-700" : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100"}`}>
                        <Wand2 className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">Probar IA</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div ref={uploadRef} className="opacity-0">
          <div className="flex items-end justify-between mb-8 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-500 mb-2">Paso 02</p>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">Probador virtual</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Motor IA Activo
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 relative rounded-3xl p-5 md:p-6 border border-slate-200 bg-white shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Tu mascota</h3>
                  <p className="text-xs text-slate-500 font-medium">Sube una foto clara</p>
                </div>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={handleUploadIntent}
                className={`relative flex-1 w-full aspect-[4/5] min-h-[400px] flex flex-col items-center justify-center rounded-2xl transition-all duration-300 overflow-hidden group ${
                  imagePreview ? "bg-slate-100 border border-slate-200" :
                  isDragging ? "border-2 border-dashed border-emerald-500 bg-emerald-50" :
                  "border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 cursor-pointer"
                }`}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Mascota" className="absolute inset-0 w-full h-full object-contain p-4" />
                    <button onClick={e => { e.stopPropagation(); setImagePreview(null); setSelectedFile(null); setResultImage(null); setLimitReachedMsg(null); }} className="absolute top-4 right-4 bg-white text-slate-900 hover:bg-red-50 hover:text-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-20 shadow-md border border-slate-200">
                      <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-emerald-500 text-white font-bold px-4 py-2 rounded-full shadow-lg z-20 whitespace-nowrap text-xs">
                      <Check className="w-4 h-4" /> Foto lista
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-center px-6">
                    <div className="w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-emerald-500" />
                    </div>
                    <p className="font-bold text-slate-700">Subir foto</p>
                    <p className="text-xs font-medium text-slate-500 mt-1 mb-6">Cuerpo entero, buena luz</p>
                    <span className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl shadow-sm group-hover:border-emerald-200 group-hover:text-emerald-600 transition-colors text-sm">
                      Explorar galería <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>

            <div className="lg:col-span-3 relative rounded-3xl p-5 md:p-8 border border-slate-200 bg-white shadow-sm min-h-[500px] flex flex-col">
              {!resultImage ? (
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Wand2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Motor IA</h3>
                      <p className="text-xs text-slate-500 font-medium">Fusión foto + prenda</p>
                    </div>
                  </div>

                  {!selectedCloth ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                        <ImageIcon className="w-7 h-7 text-slate-400" />
                      </div>
                      <p className="font-bold text-slate-700">Aún no has elegido prenda</p>
                      <p className="text-sm font-medium text-slate-500 mt-1 max-w-xs">Selecciona "Probar IA" en el catálogo de arriba.</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-8">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-slate-200 p-1">
                          <img src={selectedCloth.imageUrl} alt={selectedCloth.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">Prenda en memoria</p>
                          <p className="font-bold text-slate-900 truncate">{selectedCloth.name}</p>
                        </div>
                        <Check className="hidden sm:block w-6 h-6 text-emerald-500" />
                      </div>

                      <div className="flex-1 flex flex-col justify-end">
                        {!imagePreview ? (
                          <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                            <Camera className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                            <p className="font-semibold text-slate-600">Falta la foto de tu mascota</p>
                            <p className="text-xs text-slate-500 mt-1">Súbela en el panel izquierdo.</p>
                          </div>
                        ) : limitReachedMsg ? (
                          <div className="w-full text-center p-6 bg-orange-50 border border-orange-100 rounded-2xl">
                            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto mb-3">
                              <Clock className="w-6 h-6" />
                            </div>
                            <p className="font-black text-slate-900 text-lg">Límite diario alcanzado</p>
                            <p className="text-sm font-medium text-slate-600 mt-1 mb-5">{limitReachedMsg}</p>
                            <button onClick={() => buyDirect(selectedCloth!)} className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-black py-4 rounded-xl shadow-md transition-transform hover:scale-[1.02] flex items-center justify-center gap-2">
                              <MessageCircle className="w-5 h-5" /> Comprar por WhatsApp
                            </button>
                          </div>
                        ) : loadingTryOn ? (
                          <div className="text-center w-full py-8">
                            <div className="relative w-20 h-20 mx-auto mb-5">
                              <div className="absolute inset-0 rounded-full border-2 border-slate-100" />
                              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500 border-r-emerald-500 animate-spin" />
                              <div className="absolute inset-2 rounded-full bg-emerald-50 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
                              </div>
                            </div>
                            <p className="font-black text-slate-900 text-lg">Procesando magia IA…</p>
                            <p className="text-sm font-medium text-slate-500 mt-1">{pollingStatus || "Ajustando costuras"}</p>
                          </div>
                        ) : (
                          <button onClick={generateTryOn} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl text-lg transition-transform hover:scale-[1.02] shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3">
                            <Sparkles className="w-5 h-5" /> Generar Fusión
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative h-full flex flex-col result-animation">
                  <div className="flex items-center justify-between mb-4 z-20">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Check className="w-4 h-4 font-bold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">¡Resultado listo!</h3>
                      </div>
                    </div>
                    <button onClick={() => setResultImage(null)} className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-full transition-colors border border-slate-200">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex-1 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-6 flex items-center justify-center p-4">
                    <img src={resultImage} alt="Resultado IA" className="w-full h-full object-contain drop-shadow-md" />
                  </div>
                  
                  <button onClick={() => buyDirect(selectedCloth!)} className="w-full py-4 rounded-xl font-black text-lg text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-transform hover:scale-[1.02] flex justify-center items-center gap-2">
                    <ShoppingBag className="w-5 h-5" /> ¡Me encanta! Comprar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowGuideModal(false)}>
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-2xl border border-slate-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900">Tips para una foto perfecta</h3>
              <p className="text-sm font-medium text-slate-500 mt-2">La IA necesita ver bien a tu peludo.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Focus, t: "De perfil", d: "Foto de costado o semi-perfil." },
                { icon: Camera, t: "Cuerpo entero", d: "Que se vean sus patitas." },
                { icon: Sun, t: "Buena luz", d: "Evita sombras o lugares oscuros." },
              ].map((g, i) => (
                <div key={i} className="guide-card opacity-0 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <g.icon className="w-6 h-6 text-emerald-500" />
                  </div>
                  <p className="font-bold text-slate-800">{g.t}</p>
                  <p className="text-xs font-medium text-slate-500 mt-1">{g.d}</p>
                </div>
              ))}
            </div>
            <button onClick={confirmUpload} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-transform hover:scale-[1.01]">
              Entendido, continuar
            </button>
          </div>
        </div>
      )}

      {showReservaModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowReservaModal(false)}>
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-3 border border-emerald-100">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Reservar prenda</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Coordinemos por WhatsApp</p>
            </div>
            {itemToBuy && (
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-6 shadow-sm">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 p-1 flex-shrink-0">
                  <img src={itemToBuy.imageUrl} alt={itemToBuy.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 truncate">{itemToBuy.name}</p>
                  <p className="text-sm text-emerald-600 font-bold mt-0.5">S/ {itemToBuy.price.toFixed(2)}</p>
                </div>
              </div>
            )}
            <label className="block mb-6">
              <span className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">Nombre de tu peludo (opcional)</span>
              <input value={petName} onChange={e => setPetName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleConfirmReserva()} placeholder="Ej: Toby" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:bg-white focus:border-emerald-500 outline-none transition-colors" />
            </label>
            <div className="flex gap-3">
              <button onClick={() => setShowReservaModal(false)} className="flex-1 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancelar</button>
              <button onClick={handleConfirmReserva} className="flex-1 py-3.5 rounded-xl font-black text-white bg-[#25D366] hover:bg-[#1DA851] shadow-lg shadow-[#25D366]/20 transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes resultFadeIn { 0% { opacity: 0; transform: scale(0.96); } 100% { opacity: 1; transform: scale(1); } }
        .result-animation { animation: resultFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
*/