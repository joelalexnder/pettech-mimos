"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function PawCursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  
  // Suavizado del movimiento
  const sx = useSpring(mx, { stiffness: 350, damping: 30 });
  const sy = useSpring(my, { stiffness: 350, damping: 30 });

  // Estados interactivos automáticos
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // 1. Seguimiento del mouse
    const moveCursor = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    // 2. Detección automática de Hover en botones, enlaces o elementos con clase 'cursor-pointer'
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // 3. Animación de clic (la patita se cierra)
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mx, my]);

  return (
    <motion.div
      // mix-blend-difference hace que cambie de color según el fondo (ej: si el fondo es negro, la pata se vuelve blanca)
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.svg
        viewBox="0 0 44 44" 
        width="44" 
        height="44" 
        // fill="currentColor" para que responda al cambio de mix-blend-mode de Tailwind (inyecta blanco base)
        className="fill-white drop-shadow-md"
        animate={{ 
          // Si hace hover se agranda, si hace clic se achica (se cierra)
          scale: isClicked ? 0.75 : isHovering ? 1.5 : 1, 
          rotate: isClicked ? -10 : isHovering ? 20 : 0 
        }}
        transition={{ type: "spring", stiffness: 450, damping: 20 }}
      >
        {/* Tu SVG original */}
        <ellipse cx="22" cy="30" rx="8"   ry="9"   />
        <ellipse cx="9"  cy="19" rx="4.5" ry="5.5" />
        <ellipse cx="17" cy="12" rx="5"   ry="6"   />
        <ellipse cx="27" cy="12" rx="5"   ry="6"   />
        <ellipse cx="35" cy="19" rx="4.5" ry="5.5" />
      </motion.svg>
    </motion.div>
  );
}