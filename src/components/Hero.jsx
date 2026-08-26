import { motion } from "framer-motion";
import { useViews } from "../hooks/useViews.js";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const views = useViews();

  return (
    <section id="top" className="relative mx-auto max-w-3xl px-5 pb-16 pt-28 text-center">
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
        <img
          src="/assets/hero.png"
          alt="Hryak Team"
          className="mx-auto h-24 w-24 rounded-full border border-line object-cover"
        />
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1}
        className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl"
      >
        Hryak Team
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2}
        className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft"
      >
        <span className="font-semibold text-ink">imgenius_</span> ·{" "}
        <span className="font-semibold text-ink">drbabaxa</span> — промптологи со
        стажем: общаемся с DeepSeek, делаем сайты и программы, страдаем от гниения
        мозга.
      </motion.p>

      <motion.blockquote
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={3}
        className="mx-auto mt-8 max-w-xl text-sm italic text-mist"
      >
        «Эра легендарного Hryak Team прошла, раньше мы были там в почете,
        теперь нас там знать не хотят...»
      </motion.blockquote>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={4}
        className="mt-8 flex flex-wrap items-center justify-center gap-2"
      >
        <span className="rounded-full border border-line px-3.5 py-1 font-mono text-xs text-ink-soft">
          DeepSeek V4 Pro
        </span>
        <span className="rounded-full border border-line px-3.5 py-1 font-mono text-xs text-ink-soft">
          DeepSeek R1
        </span>
        <span className="rounded-full border border-line px-3.5 py-1 font-mono text-xs text-ink-soft">
          DeepSeek V3
        </span>
        {views !== null && (
          <span className="rounded-full border border-line px-3.5 py-1 font-mono text-xs text-mist">
            просмотры: {views.toLocaleString("ru-RU")}
          </span>
        )}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={5}
        className="mt-10 flex justify-center"
      >
        <a
          href="#discord"
          className="text-sm text-mist transition-colors hover:text-ink"
        >
          Смотреть профили ↓
        </a>
      </motion.div>
    </section>
  );
}
