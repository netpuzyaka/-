import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useViews } from "../hooks/useViews.js";

const spring = { stiffness: 55, damping: 15 };

export default function Hero() {
  const views = useViews();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const imgX = useSpring(useTransform(mx, [0, 1], [-22, 22]), spring);
  const imgY = useSpring(useTransform(my, [0, 1], [-16, 16]), spring);
  const rotX = useSpring(useTransform(my, [0, 1], [9, -9]), spring);
  const rotY = useSpring(useTransform(mx, [0, 1], [-12, 12]), spring);
  const glowX = useSpring(useTransform(mx, [0, 1], [-32, 32]), spring);
  const glowY = useSpring(useTransform(my, [0, 1], [-24, 24]), spring);

  return (
    <div className="text-center lg:col-span-4 lg:self-center lg:text-left">
      <div className="relative mx-auto w-fit lg:mx-0" style={{ perspective: 1000 }}>
        <motion.div
          aria-hidden
          style={{ x: glowX, y: glowY }}
          className="absolute -inset-7 -z-10 rounded-full bg-accent/25 blur-2xl"
        />
        <motion.div
          style={{
            x: imgX,
            y: imgY,
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: "preserve-3d",
          }}
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
