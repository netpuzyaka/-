import { motion } from "framer-motion";

const skills = [
  { name: "DeepSeek V4 Pro", level: 96 },
  { name: "DeepSeek R1", level: 91 },
  { name: "DeepSeek V3", level: 88 },
  { name: "Промпт-инжиниринг", level: 94 },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-mist">
          // tech stack
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Наш стек</h2>
      </motion.div>

      <div className="mt-6 rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h3 className="mb-6 flex items-center gap-2.5 text-base font-bold">
          <span>🐋</span> DeepSeek
        </h3>
        <ul className="space-y-5">
          {skills.map((s, si) => (
            <li key={s.name}>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-sm">{s.name}</span>
                <span className="font-mono text-xs text-mist">{s.level}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-black/40">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, delay: 0.2 + si * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
