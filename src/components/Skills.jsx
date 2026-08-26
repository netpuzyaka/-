import { motion } from "framer-motion";
import { useTilt } from "../hooks/useTilt.js";

const skills = [
  { name: "DeepSeek V4 Pro", level: 96 },
  { name: "DeepSeek R1", level: 91 },
  { name: "DeepSeek V3", level: 88 },
  { name: "Промпт-инжиниринг", level: 94 },
];

export default function Skills() {
  const tiltRef = useTilt(4);

  return (
    <section
      ref={tiltRef}
      id="skills"
      className="will-change-transform scroll-mt-24 rounded-2xl border border-line bg-card p-4 transition-colors hover:border-white/15 sm:p-5"
    >
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
        <span>🐋</span> Наш стек — DeepSeek
      </h3>
      <div className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
        {skills.map((s, si) => (
          <div key={s.name}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-mono text-xs">{s.name}</span>
              <span className="font-mono text-[11px] text-mist">{s.level}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-black/40">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: 0.15 + si * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-accent"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
