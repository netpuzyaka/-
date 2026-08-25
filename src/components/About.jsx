import { motion } from "framer-motion";

const cards = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M8 4h10v18H8V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M13 4v18M6.5 8.5h1.5M6.5 12.5h1.5M18 8.5h1.5M18 12.5h1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Разработка сайтов",
    text: "Современные сайты и веб-приложения на React с чистой разметкой на HTML и стилизацией на CSS. Адаптивно, быстро, с вниманием к деталям.",
    tags: ["React", "HTML", "CSS"],
    accent: "from-blurple/25 to-transparent",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M9 20l-5.5-5.5L9 9M17 9l5.5 5.5L17 20M15 7l-4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Разработка программ",
    text: "Десктопные приложения на C#, производительный системный код на C++ и скрипты, утилиты и автоматизация на Python.",
    tags: ["C#", "C++", "Python"],
    accent: "from-blurple-2/25 to-transparent",
  },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-blurple">
          // who we are
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">О нас</h2>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {cards.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="group relative overflow-hidden rounded-3xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-blurple/50 hover:shadow-2xl hover:shadow-blurple/10"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.accent}`} />
            <div className="relative">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface text-blurple transition-colors duration-300 group-hover:text-blurple-2">
                {c.icon}
              </div>
              <h3 className="mb-2.5 text-xl font-bold">{c.title}</h3>
              <p className="text-sm leading-relaxed text-mist">{c.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-md border border-line bg-ink/60 px-2.5 py-1 font-mono text-xs text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
