import { motion } from "framer-motion";
import { useTilt } from "../hooks/useTilt.js";
import { useViews } from "../hooks/useViews.js";

const badges = ["React", "HTML", "CSS", "C#", "C++", "Python"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const tiltRef = useTilt(7);
  const views = useViews();

  return (
    <section id="top" className="relative mx-auto max-w-5xl px-5 pb-20 pt-36 text-center sm:pt-44">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
        className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 font-mono text-xs text-ink-soft backdrop-blur"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-online opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-online" />
        </span>
        Команда из двух разработчиков
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1}
        className="text-neon glitch-target font-display text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-7xl"
      >
        Hryak Team
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2}
        className="mx-auto mt-6 max-w-xl text-base text-ink-soft sm:text-lg"
      >
        <span className="font-bold text-ink">imgenius_</span> ·{" "}
        <span className="font-bold text-ink">drbabaxa</span> — создаём сайты на React,
        HTML и CSS, пишем программы на C#, C++ и Python.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={3}
        className="mt-12 flex justify-center"
      >
        <div ref={tiltRef} className="avatar-stage h-[200px] w-[200px]">
          <div className="avatar-glow" />
          <div className="conic-ring h-[200px] w-[200px]">
            <div className="spin-back h-full w-full bg-surface">
              <img
                src="/assets/hero.png"
                alt="Hryak Team"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.blockquote
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={4}
        className="glass-card mx-auto mt-12 max-w-2xl rounded-2xl border-l-2 border-l-neon-pink p-6 text-left font-mono text-sm leading-relaxed text-ink-soft sm:p-7"
      >
        «Эра легендарного Hryak Team прошла, раньше мы были там в почете,
        теперь нас там знать не хотят...»
      </motion.blockquote>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={5}
        className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
      >
        {badges.map((b) => (
          <span
            key={b}
            className="rounded-full border border-line bg-white/5 px-4 py-1.5 font-mono text-[13px] font-medium text-ink-soft transition-colors hover:border-neon-pink/60 hover:text-ink"
          >
            {b}
          </span>
        ))}
        {views !== null && (
          <span
            title="Просмотры страницы"
            className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1.5 font-mono text-[13px] font-medium text-neon-cyan"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1.5 12S5.5 5.5 12 5.5 22.5 12 22.5 12 18.5 18.5 12 18.5 1.5 12 1.5 12z" />
              <circle cx="12" cy="12" r="2.6" />
            </svg>
            {views.toLocaleString("ru-RU")}
          </span>
        )}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={6}
        className="mt-14 flex justify-center"
      >
        <a
          href="#discord"
          className="group flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
        >
          Смотреть профили
          <svg className="animate-bounce" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
