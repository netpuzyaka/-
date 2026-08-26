import { useEffect, useRef } from "react";

export default function CursorDot() {
  const ref = useRef(null);

  useEffect(() => {
    const dot = ref.current;
    const onMove = (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden />;
}
