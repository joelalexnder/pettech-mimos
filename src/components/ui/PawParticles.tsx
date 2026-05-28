"use client";

import { useEffect, useRef } from "react";

interface Paw {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  speed: number;
  drift: number;
}

export default function PawParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const paws: Paw[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 18 + 8,
      opacity: Math.random() * 0.12 + 0.03,
      rotation: Math.random() * 360,
      speed: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
    }));

    function drawPaw(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, rotation: number) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.font = `${size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#10b981";
      ctx.fillText("🐾", 0, 0);
      ctx.restore();
    }

    let animId: number;

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      paws.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        p.rotation += 0.2;

        if (p.y < -30) {
          p.y = canvas!.height + 30;
          p.x = Math.random() * canvas!.width;
        }
        if (p.x < -30) p.x = canvas!.width + 30;
        if (p.x > canvas!.width + 30) p.x = -30;

        drawPaw(ctx!, p.x, p.y, p.size, p.opacity, p.rotation);
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}