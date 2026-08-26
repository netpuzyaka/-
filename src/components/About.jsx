import { motion } from "framer-motion";
import { useTilt } from "../hooks/useTilt.js";

const cards = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
    title: "Промптология",
    text: "Говорим с DeepSeek на «ты»: пишем, тестируем и доводим промпты до идеала.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 3A2.5 2.5 0 0 0 7 5.5a2.5 2.5 0 0 0-1 4.8A3.5 3.5 0 0 0 3 13.5c0 2 1.5 3.5 3.5 3.5H12" />
        <path d="M12 5.5A2.5 2.5 0 0 1 14.5 3a2.5 2.5 0 0 1 2.5 2.5" />
        <path d="M12 17h8M16 13v8M14 15h4M14 19h4" />
      </svg>
    ),
    title: "Гниение мозга",
    text: "Brainrot — среда обитания. Знаем все мемы, мозг тает, контент остаётся.",
  },
];

function AboutCard({ card, index }) {
  const tiltRef = useTilt(5);
  return (
    <motion.article
      ref={tiltRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="will-change-transform rounded-2xl border border-line bg-card p-4 transition-colors hover:border-white/15"
    >
      <div className="mb-2 flex items-center gap-2 text-ink-soft">
        {card.icon}
        <h3 className="text-sm font-bold text-ink">{card.title}</h3>
      </div>
      <p className="text-[13px] leading-relaxed text-ink-soft">{card.text}</p>
    </motion.article>
  );
}

export default function About() {
  return (
    <section id="about" className="grid scroll-mt-24 gap-3 sm:grid-cols-2">
      {cards.map((c, i) => (
        <AboutCard key={c.title} card={c} index={i} />
      ))}
    </section>
  );
}
