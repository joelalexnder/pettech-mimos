"use client";

import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  opacity: number;
}

export function WalkingPaws() {
  const [paws, setPaws] = useState<PawPrint[]>([]);
  useEffect(() => {
    let id = 0;
    let x = -60;
    const iv = setInterval(() => {
      x += 55;
      if (x > window.innerWidth + 60) x = -60;
      const side = id % 2 === 0 ? 1 : -1;
      setPaws(prev => {
        const next = [...prev, {
          id: id++, x,
          y: window.innerHeight * 0.9 + side * 10,
          rotation: side * 18,
          size: 20 + Math.random() * 8,
          opacity: 0.12,
        }];
        return next.slice(-16);
      });
    }, 300);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      <AnimatePresence>
        {paws.map((p, i) => (
          <motion.div key={p.id} className="absolute"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 0.13 - i * 0.005, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <svg viewBox="0 0 44 44" width={p.size} height={p.size}
              style={{ transform: `rotate(${p.rotation}deg)` }} fill="none">
              <ellipse cx="22" cy="30" rx="8"   ry="9"   fill="#f97316" />
              <ellipse cx="9"  cy="19" rx="4.5" ry="5.5" fill="#f97316" />
              <ellipse cx="17" cy="12" rx="5"   ry="6"   fill="#f97316" />
              <ellipse cx="27" cy="12" rx="5"   ry="6"   fill="#f97316" />
              <ellipse cx="35" cy="19" rx="4.5" ry="5.5" fill="#f97316" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div className="fixed top-0 left-0 right-0 h-0.75 origin-left z-200"
      style={{ scaleX, background: "linear-gradient(90deg,#f97316,#fb923c,#fbbf24)" }} />
  );
}

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}