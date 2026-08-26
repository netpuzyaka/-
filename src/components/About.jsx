import { motion } from "framer-motion";

const cards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
    title: "Промптология",
    text: "Наука говорить с моделями. Правильный промпт — и DeepSeek выдаёт ровно то, что нужно. Пишем, тестируем и доводим промпты до идеала.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 3A2.5 2.5 0 0 0 7 5.5a2.5 2.5 0 0 0-1 4.8A3.5 3.5 0 0 0 3 13.5c0 2 1.5 3.5 3.5 3.5H12" />
        <path d="M12 5.5A2.5 2.5 0 0 1 14.5 3a2.5 2.5 0 0 1 2.5 2.5" />
        <path d="M12 17h8M16 13v8M14 15h4M14 19h4" />
      </svg>
    ),
    title: "Гниение мозга",
    text: "Brainrot — наша среда обитания. Знаем все мемы, тренды и странные уголки интернета. Мозг тает, но контент остаётся.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-mist">
          // who we are
        </p>
        <h2 className="text-2xl font-bold tracking-tight">О нас</h2>
      </motion.div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-line bg-card p-6"
          >
            <div className="mb-4 text-ink-soft">{c.icon}</div>
            <h3 className="mb-2 text-base font-bold">{c.title}</h3>
            <p className="text-sm leading-relaxed text-ink-soft">{c.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
