import { useEffect, useRef } from "react";

export function useTilt(max = 6) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotateY = Math.max(-1, Math.min(1, dx)) * max;
      const rotateX = -Math.max(-1, Math.min(1, dy)) * max;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [max]);

  return ref;
}
