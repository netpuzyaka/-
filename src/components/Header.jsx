import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-surface/80 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4">
        <img
          src="/assets/logo.png"
          alt="Hryak Team"
          className="invert h-8 w-8 rounded-lg border border-line object-cover"
        />
        <div className="leading-tight">
          <span className="block text-sm font-bold tracking-tight">Hryak Team</span>
          <span className="block text-[11px] text-mist">imgenius_ · drbabaxa</span>
        </div>
      </div>
    </header>
  );
}
