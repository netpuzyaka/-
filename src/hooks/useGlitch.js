import { useEffect } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#$%&01";

function scramble(el) {
  const original = el.dataset.glitchOriginal || el.textContent;
  el.dataset.glitchOriginal = original;
  el.classList.add("rgb-glitch");
  let iterations = 0;
  const timer = setInterval(() => {
    el.textContent = original
      .split("")
      .map((ch, i) => {
        if (ch === " ") return " ";
        if (i < iterations) return original[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join("");
    iterations += 1.4;
    if (iterations >= original.length) {
      clearInterval(timer);
      el.textContent = original;
      el.classList.remove("rgb-glitch");
    }
  }, 30);
}

export function useGlitch() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(".glitch-target"));
    const timers = targets.map((el) => {
      const schedule = () => {
        const delay = 6000 + Math.random() * 5000;
        return setTimeout(() => {
          scramble(el);
          schedule();
        }, delay);
      };
      return schedule();
    });
    return () => timers.forEach(clearTimeout);
  }, []);
}
