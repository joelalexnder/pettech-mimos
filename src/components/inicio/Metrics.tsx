"use client";

import { Counter, FadeUp } from "./shared";

const metrics = [
  { value: 500,  suffix: "+", label: "Mascotas atendidas" },
  { value: 98,   suffix: "%", label: "Clientes satisfechos" },
  { value: 3,    suffix: "",  label: "Años de experiencia" },
];

export default function Metrics() {
  return (
    <section className="relative z-30 pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
          {metrics.map((m, i) => (
            <FadeUp 
              key={i} 
              delay={i * 0.1}
              className="px-6 py-6 md:py-8 text-center group cursor-default flex flex-col justify-center"
            >
              <div className="text-[clamp(3rem,5vw,4.5rem)] font-black text-slate-900 mb-3 tabular-nums group-hover:text-orange-500 transition-colors duration-500 leading-none">
                <Counter value={m.value} suffix={m.suffix} />
              </div>
              <div className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] group-hover:text-slate-500 transition-colors duration-500">
                {m.label}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}