"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PawPrint {
  id: number;
  x: number;
  ySide: number;
  rotation: number;
  size: number;
}

export default function WalkingPaws() {
  const [paws, setPaws] = useState<PawPrint[]>([]);

  useEffect(() => {
    let id = 0;
    let x = -60;

    const interval = setInterval(() => {
      x += 55;
      
      if (x > window.innerWidth + 60) {
        x = -60;
      }

      const side = id % 2 === 0 ? 1 : -1;

      setPaws((prev) => {
        const next = [
          ...prev,
          {
            id: id++,
            x,
            ySide: side,
            rotation: side * 18,
            size: 22 + Math.random() * 6,
          },
        ];
        return next.slice(-14); // Mantenemos 14 huellas activas para el rastro
      });
    }, 320);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10] overflow-hidden mix-blend-difference">
      <AnimatePresence>
        {paws.map((p, i) => (
          <motion.div
            key={p.id}
            className="absolute bottom-[8vh]"
            style={{ 
              left: p.x, 
              transform: `translateY(${p.ySide * 8}px)` 
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            // 📉 AJUSTE DE OPACIDAD: Bajamos la opacidad máxima a 0.25 (25%) para que sea un tono grisáceo/opaco muy fino y elegante.
            // El rastro más antiguo se va desvaneciendo sutilmente hacia el 0.05.
            animate={{ opacity: 0.25 - (paws.length - 1 - i) * 0.015, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <svg
              viewBox="0 0 44 44"
              width={p.size}
              height={p.size}
              style={{ transform: `rotate(${p.rotation}deg)` }}
              className="fill-white"
            >
              <ellipse cx="22" cy="30" rx="8"   ry="9"   />
              <ellipse cx="9"  cy="19" rx="4.5" ry="5.5" />
              <ellipse cx="17" cy="12" rx="5"   ry="6"   />
              <ellipse cx="27" cy="12" rx="5"   ry="6"   />
              <ellipse cx="35" cy="19" rx="4.5" ry="5.5" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}