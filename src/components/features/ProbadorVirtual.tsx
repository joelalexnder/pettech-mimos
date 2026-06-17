"use client";

import { useState, useRef, useEffect, DragEvent } from "react";
import { animate, stagger, createTimeline } from "animejs";
import { clothingItems, ClothingItem } from "@/data/clothes";
import { Camera, Sun, Focus, Shirt, Sparkles, MessageCircle, Image as ImageIcon, UploadCloud, X, Check, ShoppingBag, Clock } from "lucide-react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

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

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
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
    setLoadingTryOn(true); setResultImage(null); setPollingStatus(""); setLimitReachedMsg(null);
    try {
      const fd = new FormData();
      fd.append("file", selectedFile);
      fd.append("clothId", `${selectedCloth.id}-${Date.now()}`);
      fd.append("clothImageUrl", selectedCloth.imageUrl);
      fd.append("clothName", selectedCloth.name);

      const res = await fetch("/api/tryon", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setLimitReachedMsg(data.error || "Has alcanzado el límite diario.");
        } else {
          alert(data.error || "Error al procesar la imagen");
        }
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
    <div className="min-h-screen bg-[#fafaf9] font-sans selection:bg-emerald-500 selection:text-white pb-32 overflow-x-hidden">
      
      {/* ── HERO ── */}
      <div ref={heroRef} className="pt-32 md:pt-40 pb-12 px-6 max-w-4xl mx-auto text-center opacity-0">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6 shadow-md">
          <Sparkles size={14} className="text-emerald-400" />
          Estudio de Prueba
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Colección <span className="text-emerald-600">Mimos</span>
        </h1>
        <p className="text-slate-500 text-lg font-light mb-10 max-w-2xl mx-auto">
          Adquiere nuestras prendas directamente o utiliza nuestra Inteligencia Artificial para visualizar cómo le quedarán a tu mascota antes de comprar.
        </p>
      </div>

      <div className="max-w-350 mx-auto px-6">
        <div className="mb-24">
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {clothingItems.map(item => {
              const isSel = selectedCloth?.id === item.id;
              return (
                <div key={item.id} className={`cloth-card flex flex-col bg-white rounded-3xl p-4 transition-all duration-300 border ${isSel ? "border-emerald-500 shadow-xl ring-4 ring-emerald-50 scale-[1.02]" : "border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1"}`}>
                  <div className="aspect-square w-full bg-slate-50 rounded-2xl mb-4 relative flex items-center justify-center p-4">
                    {isSel && <div className="absolute top-3 right-3 z-10 bg-emerald-500 text-white p-1.5 rounded-full shadow-md"><Check size={14} strokeWidth={3}/></div>}
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-tight mb-1">{item.name}</h3>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-3">{item.description}</p>
                    </div>
                    <span className="font-black text-emerald-600 text-lg mb-4">S/ {item.price.toFixed(2)}</span>
                    <div className="flex gap-2 mt-auto">
                      <button onClick={() => buyDirect(item)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                        <MessageCircle size={14} /> Comprar
                      </button>
                      <button onClick={() => selectForAI(item)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${isSel ? "bg-emerald-100 text-emerald-800" : "bg-slate-900 hover:bg-slate-800 text-white shadow-sm"}`}>
                        <Sparkles size={14} /> Probar IA
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div ref={uploadRef} className="max-w-350 mx-auto px-6 opacity-0">
        <div className="relative bg-[#0a0f1c] rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-slate-900/30 border border-slate-800 flex flex-col lg:flex-row gap-8 items-stretch min-h-125 overflow-hidden">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-120 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="relative z-10 w-full lg:w-1/2 flex flex-col h-full">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                <Camera className="text-emerald-400" /> Tu Mascota
              </h3>
              <p className="text-slate-400 text-sm">Sube una foto clara para la IA.</p>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={handleUploadIntent}
              className={`relative flex-1 w-full min-h-100 flex flex-col items-center justify-center rounded-4xl transition-all duration-300 overflow-hidden group ${
                imagePreview ? "bg-black/40 border border-white/5" :
                isDragging ? "border-2 border-dashed border-emerald-500 bg-emerald-500/10" : 
                "border-2 border-dashed border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer"
              }`}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Mascota" className="absolute inset-0 w-full h-full object-contain p-6" />
                  <button onClick={(e) => { e.stopPropagation(); setImagePreview(null); setSelectedFile(null); setResultImage(null); setLimitReachedMsg(null); }} className="absolute top-4 right-4 bg-black/50 hover:bg-red-500 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-20 shadow-lg border border-white/10">
                    <X size={20} />
                  </button>
                  <div className="absolute bottom-6 bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md text-emerald-300 text-xs font-bold px-5 py-2 rounded-full flex items-center gap-2 shadow-lg z-20">
                    <Check size={14} /> Imagen lista para la IA
                  </div>
                </>
              ) : (
                <div className="text-center p-8 relative z-10">
                  <div className="w-24 h-24 bg-linear-to-b from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6 shadow-inner border border-slate-600/50 group-hover:scale-105 transition-transform">
                    <UploadCloud size={40} />
                  </div>
                  <p className="font-bold text-lg text-white mb-2">Subir o tomar foto</p>
                  <p className="text-slate-500 text-sm mb-8">Usa una foto de cuerpo entero</p>
                  <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg">
                    Explorar Galería
                  </div>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </div>

          <div className="relative z-10 w-full lg:w-1/2 flex flex-col h-full min-h-100 bg-slate-900/50 rounded-4xl border border-slate-700/50 overflow-hidden">
            
            {!resultImage ? (
              <div className="flex flex-col h-full p-6 md:p-10 flex-1">
                <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                  <Sparkles className="text-emerald-400" /> Motor IA
                </h3>

                {!selectedCloth ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                      <Shirt size={32} className="text-slate-500" />
                    </div>
                    <p className="font-bold text-white text-lg">Ninguna prenda seleccionada</p>
                    <p className="text-slate-500 text-sm mt-2">Haz clic en "Probar IA" en el catálogo.</p>
                  </div>
                ) : (
                  <div className="flex flex-col flex-1 h-full">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 flex items-center gap-5 border border-white/10 mb-8 shrink-0">
                      <div className="w-16 h-16 bg-white rounded-xl p-1 shrink-0 shadow-inner">
                        <img src={selectedCloth.imageUrl} className="w-full h-full object-contain mix-blend-multiply" alt=""/>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Sparkles size={10}/> En memoria IA</p>
                        <h4 className="font-bold text-white text-lg leading-tight">{selectedCloth.name}</h4>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-col justify-center flex-1">
                      {!imagePreview ? (
                        <div className="text-center bg-slate-900/50 text-slate-500 rounded-2xl py-8 font-semibold text-sm border border-slate-700/50 border-dashed flex flex-col items-center justify-center gap-3">
                          <ImageIcon size={24} className="opacity-50"/> 
                          <span>Sube la foto para habilitar la magia...</span>
                        </div>
                      ) : limitReachedMsg ? (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-center shadow-inner">
                          <div className="w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="text-amber-400" size={28} />
                          </div>
                          <h4 className="text-amber-400 font-black text-lg mb-2">Límite Diario Alcanzado</h4>
                          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                            {limitReachedMsg}
                          </p>
                          <button
                            onClick={() => buyDirect(selectedCloth!)}
                            className="w-full bg-[#128C7E] hover:bg-[#075E54] text-white font-black py-3.5 md:py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-3"
                          >
                            <MessageCircle size={22} fill="currentColor" /> Comprar por WhatsApp
                          </button>
                        </div>
                      ) : loadingTryOn ? (
                        <div className="flex flex-col items-center justify-center text-center py-6">
                          <div className="mb-6">
                            <svg width="80" height="80" viewBox="0 0 72 72" fill="none" style={{ animation: "petBounce 1.0s ease-in-out infinite" }}>
                              <ellipse cx="36" cy="44" rx="20" ry="16" fill="#9FE1CB"/>
                              <circle cx="36" cy="24" r="14" fill="#9FE1CB"/>
                              <ellipse cx="24" cy="14" rx="7" ry="9" fill="#1D9E75" style={{ animation: "earWiggle 0.9s ease-in-out infinite alternate" }}/>
                              <ellipse cx="48" cy="14" rx="7" ry="9" fill="#1D9E75" style={{ animation: "earWiggle 0.9s ease-in-out infinite alternate-reverse" }}/>
                              <ellipse cx="24" cy="14" rx="4" ry="6" fill="#b8ead6"/>
                              <ellipse cx="48" cy="14" rx="4" ry="6" fill="#b8ead6"/>
                              <circle cx="30" cy="22" r="3" fill="#085041"/>
                              <circle cx="42" cy="22" r="3" fill="#085041"/>
                              <circle cx="31" cy="21" r="1" fill="white"/>
                              <circle cx="43" cy="21" r="1" fill="white"/>
                              <ellipse cx="36" cy="28" rx="3" ry="2" fill="#085041"/>
                              <path d="M33 31 Q36 34 39 31" stroke="#085041" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                              <path d="M54 46 Q64 38 60 30" stroke="#1D9E75" strokeWidth="5" strokeLinecap="round" fill="none" style={{ animation: "tailWag 0.5s ease-in-out infinite alternate", transformOrigin: "54px 46px" }}/>
                              <rect x="20" y="55" width="8" height="12" rx="4" fill="#1D9E75" style={{ animation: "legBounce 0.5s ease-in-out infinite alternate" }}/>
                              <rect x="44" y="55" width="8" height="12" rx="4" fill="#1D9E75" style={{ animation: "legBounce 0.5s ease-in-out infinite alternate-reverse" }}/>
                            </svg>
                          </div>
                          <p className="text-white font-bold text-lg mb-1">Diseñando el look...</p>
                          <p className="text-emerald-400 font-medium text-sm">{pollingStatus || "Ajustando costuras virtuales"}</p>
                        </div>
                      ) : (
                        <button
                          onClick={generateTryOn}
                          className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-5 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.02] flex items-center justify-center gap-3 text-lg"
                        >
                          <Sparkles size={22} /> Generar Fusión IA
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 z-40 flex flex-col bg-[#0a0f1c] result-animation rounded-4xl overflow-hidden">
                <button 
                  onClick={() => setResultImage(null)} 
                  className="absolute top-4 right-4 z-50 text-white bg-black/40 hover:bg-red-500/80 backdrop-blur-md border border-white/10 rounded-full p-2 transition-colors shadow-lg"
                >
                  <X size={20}/>
                </button>
                <div className="absolute top-4 left-6 z-50 pointer-events-none">
                  <div className="bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <Check size={14} className="text-emerald-400" /> 
                    <span className="text-emerald-300 text-xs font-bold">¡Resultado Listo!</span>
                  </div>
                </div>

                <div className="flex-1 relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 z-0">
                    <img src={resultImage} alt="" className="w-full h-full object-cover opacity-40 blur-2xl scale-110" />
                  </div>
                  <img 
                    src={resultImage} 
                    alt="Resultado IA" 
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl" 
                  />
                </div>

                <div className="p-5 md:p-6 bg-slate-900 border-t border-slate-800 shrink-0 relative z-20">
                  <button 
                    onClick={() => buyDirect(selectedCloth!)} 
                    className="w-full py-3.5 md:py-4 rounded-xl font-black text-base md:text-lg text-white bg-[#128C7E] hover:bg-[#075E54] shadow-lg shadow-[#128C7E]/30 transition-transform hover:scale-[1.02] flex justify-center items-center gap-3"
                  >
                    <MessageCircle size={22} fill="currentColor" /> Comprar por WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showGuideModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowGuideModal(false)}>
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                <Camera className="text-emerald-600" /> Tips para una foto perfecta
              </h2>
              <p className="text-slate-500 text-sm mt-2">Nuestra IA necesita ver bien a tu peludo para un mejor resultado.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="guide-card opacity-0 bg-slate-50 border border-slate-100 p-5 rounded-2xl text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-700 mx-auto mb-3 shadow-sm"><Focus /></div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">De Perfil</h4>
                <p className="text-slate-500 text-xs">La foto debe ser de costado o semi-perfil.</p>
              </div>
              <div className="guide-card opacity-0 bg-slate-50 border border-slate-100 p-5 rounded-2xl text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-700 mx-auto mb-3 shadow-sm"><ImageIcon /></div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Cuerpo Entero</h4>
                <p className="text-slate-500 text-xs">Asegúrate de que se vean sus patitas.</p>
              </div>
              <div className="guide-card opacity-0 bg-slate-50 border border-slate-100 p-5 rounded-2xl text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-700 mx-auto mb-3 shadow-sm"><Sun /></div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Buena Luz</h4>
                <p className="text-slate-500 text-xs">Evita sombras oscuras o lugares cerrados.</p>
              </div>
            </div>

            <button onClick={confirmUpload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-colors flex justify-center items-center gap-2 shadow-lg">
              <Check size={18}/> Entendido, Abrir Cámara/Galería
            </button>
          </div>
        </div>
      )}

      {showReservaModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowReservaModal(false)}>
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4"><ShoppingBag size={28}/></div>
              <h2 className="text-2xl font-black text-slate-900">Reservar Prenda</h2>
              <p className="text-slate-500 text-sm mt-1">Coordinemos los detalles por WhatsApp</p>
            </div>

            {itemToBuy && (
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100 mb-6">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl p-1 shrink-0">
                  <img src={itemToBuy.imageUrl} className="w-full h-full object-contain mix-blend-multiply" alt=""/>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-tight">{itemToBuy.name}</h4>
                  <p className="text-emerald-700 font-black">S/ {itemToBuy.price.toFixed(2)}</p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Nombre de tu peludo (opcional)</label>
              <input type="text" placeholder="Ej: Tobi, Luna..." value={petName} onChange={e => setPetName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleConfirmReserva()} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-600 outline-none transition-colors font-medium bg-slate-50 focus:bg-white" />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowReservaModal(false)} className="flex-1 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancelar</button>
              <button onClick={handleConfirmReserva} className="flex-1 py-3.5 rounded-xl font-bold text-white bg-[#128C7E] hover:bg-[#075E54] shadow-lg shadow-[#128C7E]/30 transition-colors flex justify-center items-center gap-2">
                <MessageCircle size={18}/> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes petBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-10px) scale(1.04)} }
        @keyframes earWiggle { 0%{transform:rotate(-8deg)} 100%{transform:rotate(8deg)} }
        @keyframes tailWag { 0%{transform:rotate(-20deg)} 100%{transform:rotate(20deg)} }
        @keyframes legBounce { 0%{transform:translateY(0)} 100%{transform:translateY(-5px)} }
        
        @keyframes resultFadeIn {
          0% { opacity: 0; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }
        .result-animation {
          animation: resultFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}