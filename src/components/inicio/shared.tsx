"use client";

import { useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const [scaleX, setScaleX] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setScaleX(v));
  }, [scrollYProgress]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-200"
      style={{
        transform: `scaleX(${scaleX})`,
        background: "linear-gradient(90deg,#f97316,#fb923c,#fbbf24)",
        willChange: "transform",
      }}
    />
  );
}

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let frameId: number;
        const t0 = performance.now();
        const dur = 1600; 
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
          if (p < 1) frameId = requestAnimationFrame(tick);
        };
        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
      },
      { rootMargin: "-10% 0px" } 
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{n}{suffix}</span>;
}

export function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    inner.style.transition = "none";
    inner.style.transform = "translateY(50px)"; 
    inner.style.opacity = "0";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        requestAnimationFrame(() => {
          inner.style.transition = `transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, opacity 0.7s ease-out ${delay + 0.05}s`;
          inner.style.transform = "translateY(0)";
          inner.style.opacity = "1";
        });
      },
      { rootMargin: "-15% 0px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  );
}

export function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = "none";
    el.style.transform = "translateY(30px)";
    el.style.opacity = "0";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        requestAnimationFrame(() => {
          el.style.transition = `transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, opacity 0.7s ease-out ${delay}s`;
          el.style.transform = "translateY(0)";
          el.style.opacity = "1";
        });
      },
      { rootMargin: "-100px 0px" } 
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}