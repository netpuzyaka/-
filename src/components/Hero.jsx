import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useViews } from "../hooks/useViews.js";

const spring = { stiffness: 180, damping: 18 };

export default function Hero() {
  const views = useViews();
  const stageRef = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      px.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2))));
      py.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2))));
    };
    const onEnter = () => document.addEventListener("mousemove", onMove);
    const onLeave = () => {
      document.removeEventListener("mousemove", onMove);
      px.set(0);
      py.set(0);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousemove", onMove);
    };
  }, [px, py]);

  const rotX = useSpring(useTransform(py, [-1, 1], [10, -10]), spring);
  const rotY = useSpring(useTransform(px, [-1, 1], [-14, 14]), spring);

  return (
    <div className="text-center lg:col-span-4 lg:self-center lg:text-left">
      <div
        ref={stageRef}
        className="relative mx-auto w-fit lg:mx-0"
        style={{ perspective: 1000 }}
      >
        <div
          aria-hidden
          className="absolute -inset-7 -z-10 rounded-full bg-accent/25 blur-2xl"
        />
        <motion.div
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className="will-change-transform"
        >
          <img
            src="/assets/hero.png"
            alt="Hryak Team"
            className="h-44 w-44 rounded-2xl border border-line object-cover shadow-2xl shadow-black/60 sm:h-52 sm:w-52"
          />
        </motion.div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl"
      >
        Hryak Team
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft lg:mx-0"
      >
        <span className="font-semibold text-ink">imgenius_</span> ·{" "}
        <span className="font-semibold text-ink">drbabaxa</span> — промптологи со
        стажем: DeepSeek, сайты, программы и лёгкое гниение мозга.
      </motion.p>

      <motion.blockquote
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto mt-4 max-w-sm text-xs italic text-mist lg:mx-0"
      >
        «Эра легендарного Hryak Team прошла, раньше мы были там в почете,
        теперь нас там знать не хотят...»
      </motion.blockquote>

      {views !== null && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 font-mono text-[11px] text-mist"
        >
          просмотры: {views.toLocaleString("ru-RU")}
        </motion.p>
      )}
    </div>
  );
}
