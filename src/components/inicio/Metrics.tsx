"use client";

import { Counter, FadeUp } from "./shared";

const metrics = [
  { value: 500,  suffix: "+", label: "Mascotas atendidas" },
  { value: 98,   suffix: "%", label: "Clientes satisfechos" },
  { value: 3,    suffix: "",  label: "Años de experiencia" },
  { value: 24,   suffix: "/7",label: "Monitoreo en vivo" },
];

export default function Metrics() {
  return (
    <section className="relative z-30 mt-8 sm:mt-12">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 overflow-hidden">
          {metrics.map((m, i) => (
            <FadeUp key={i} delay={i * 0.08}
              className="px-4 py-10 lg:py-12 text-center hover:bg-slate-50/80 transition-colors duration-300 group cursor-default flex flex-col justify-center"
            >
              <div className="text-4xl lg:text-5xl font-black text-slate-900 mb-3 tabular-nums group-hover:text-orange-500 transition-colors duration-300">
                <Counter value={m.value} suffix={m.suffix} />
              </div>
              <div className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] group-hover:text-slate-600 transition-colors">
                {m.label}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}