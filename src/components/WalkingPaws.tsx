"use client";

import { useEffect, useRef } from "react";

const PAW_SVG = `
  <ellipse cx="22" cy="30" rx="8"   ry="9"   fill="rgba(80,60,40,0.75)" />
  <ellipse cx="9"  cy="19" rx="4.5" ry="5.5" fill="rgba(80,60,40,0.75)" />
  <ellipse cx="17" cy="12" rx="5"   ry="6"   fill="rgba(80,60,40,0.75)" />
  <ellipse cx="27" cy="12" rx="5"   ry="6"   fill="rgba(80,60,40,0.75)" />
  <ellipse cx="35" cy="19" rx="4.5" ry="5.5" fill="rgba(80,60,40,0.75)" />
`;

interface PawPrint {
  x: number;
  ySide: number;
  rotation: number;
  size: number;
  opacity: number;
  el: SVGSVGElement;
}

export default function WalkingPaws() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const MAX_PAWS = 14;
    const paws: PawPrint[] = [];
    let stepIndex = 0;
    let x = -60;
    let rafId: number;
    let lastTime = 0;
    const STEP_INTERVAL = 320;

    function createPawElement(pawData: Omit<PawPrint, "el">): SVGSVGElement {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 44 44");
      svg.setAttribute("width", String(pawData.size));
      svg.setAttribute("height", String(pawData.size));
      svg.style.cssText = `
        position: absolute;
        bottom: 8vh;
        left: ${pawData.x}px;
        transform: translateY(${pawData.ySide * 8}px) rotate(${pawData.rotation}deg);
        opacity: 0;
        transition: opacity 0.35s ease-out;
        will-change: opacity;
        filter: drop-shadow(0px 0px 3px rgba(0,0,0,0.6));
      `;
      svg.innerHTML = PAW_SVG;
      return svg;
    }

    function addPaw() {
      if (!container) return;

      x += 55;
      if (x > window.innerWidth + 60) x = -60;

      const side = stepIndex % 2 === 0 ? 1 : -1;
      const size = 22 + Math.random() * 6;

      const pawData = {
        x,
        ySide: side,
        rotation: side * 18,
        size,
        opacity: 0.7,
      };

      const el = createPawElement(pawData);
      container.appendChild(el);

      el.getBoundingClientRect();
      el.style.opacity = "0.7";

      paws.push({ ...pawData, el });
      stepIndex++;

      if (paws.length > MAX_PAWS) {
        const oldest = paws.shift()!;
        oldest.el.style.opacity = "0";
        setTimeout(() => oldest.el.remove(), 350);
      }

      paws.forEach((p, i) => {
        const targetOpacity = 0.7 - (paws.length - 1 - i) * 0.04;
        p.el.style.opacity = String(Math.max(0, targetOpacity));
      });
    }

    function loop(timestamp: number) {
      if (timestamp - lastTime >= STEP_INTERVAL) {
        addPaw();
        lastTime = timestamp;
      }
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    />
  );
}