"use client";

import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function ScrollBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    
    return (
        <motion.div 
        className="fixed top-0 left-0 right-0 h-0.75 origin-left z-200"
        style={{ scaleX, background: "linear-gradient(90deg,#f97316,#fb923c,#fbbf24)" }} 
        />
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