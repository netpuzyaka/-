import { motion } from "framer-motion";

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
  return (
    <section id="top" className="relative mx-auto max-w-5xl px-5 pb-20 pt-36 text-center sm:pt-44">
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 font-mono text-xs text-mist backdrop-blur">
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
        className="font-display text-6xl leading-[1.15] tracking-normal sm:text-8xl lg:text-9xl"
      >
        <span className="text-gradient">Hryak Team</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2}
        className="mx-auto mt-6 max-w-xl text-base text-mist sm:text-lg"
      >
        <span className="text-white">imgenius_</span> ·{" "}
        <span className="text-white">drbabaxa</span> — создаём сайты на React,
        HTML и CSS, пишем программы на C#, C++ и Python.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={3}
        className="mt-10 flex justify-center"
      >
        <img
          src="/assets/hero.gif"
          alt="Hryak Team"
          className="w-full max-w-xl rounded-2xl border border-line object-cover shadow-2xl shadow-blurple/20"
        />
      </motion.div>

      <motion.blockquote
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={4}
        className="glass mx-auto mt-10 max-w-2xl rounded-2xl border-l-2 border-l-blurple p-6 text-left font-mono text-sm leading-relaxed text-gray-300 sm:p-7"
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
            className="rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-[13px] font-medium text-gray-200 transition-colors hover:border-blurple/60 hover:text-white"
          >
            {b}
          </span>
        ))}
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
          className="group flex items-center gap-2 text-sm text-mist transition-colors hover:text-white"
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
