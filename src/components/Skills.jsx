import { motion } from "framer-motion";

const groups = [
  {
    title: "Сайты",
    emoji: "🌐",
    skills: [
      { name: "React", level: 92 },
      { name: "HTML", level: 96 },
      { name: "CSS", level: 90 },
    ],
  },
  {
    title: "Программы",
    emoji: "⚙️",
    skills: [
      { name: "C#", level: 88 },
      { name: "C++", level: 85 },
      { name: "Python", level: 90 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-blurple">
          // tech stack
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Наш стек</h2>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: gi * 0.12 }}
            className="rounded-3xl border border-line bg-card p-7"
          >
            <h3 className="mb-6 flex items-center gap-2.5 text-xl font-bold">
              <span>{g.emoji}</span>
              {g.title}
            </h3>
            <ul className="space-y-5">
              {g.skills.map((s, si) => (
                <li key={s.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-sm font-medium">{s.name}</span>
                    <span className="font-mono text-xs text-mist">{s.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ink">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 1, delay: 0.25 + si * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-blurple to-blurple-2"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
