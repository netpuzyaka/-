import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "нажми на меня :3",
  "давай, жми сюда ✦",
  "клик — и понеслась 🐗",
  "тыкни, не бойся 💗",
  "погнали? жми",
  "ну же... нажми :3",
];

export default function IntroOverlay() {
  const [closing, setClosing] = useState(false);
  const [gone, setGone] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % PHRASES.length;
      el.style.opacity = "0";
      setTimeout(() => {
        el.textContent = PHRASES[idx];
        el.style.opacity = "";
      }, 250);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => setGone(true), 500);
    return () => clearTimeout(t);
  }, [closing]);

  if (gone) return null;

  return (
    <div
      className="intro"
      style={{ opacity: closing ? 0 : 1 }}
      onClick={() => setClosing(true)}
    >
      <div ref={textRef} className="intro-text">
        {PHRASES[0]}
      </div>
    </div>
  );
}
