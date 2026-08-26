import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "О нас" },
  { href: "#skills", label: "Стек" },
  { href: "#discord", label: "Discord" },
];

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
      <div className="relative mx-auto flex max-w-6xl items-center justify-end px-5 py-3.5">
        <a
          href="#top"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3"
        >
          <img
            src="/assets/logo.png"
            alt="Hryak Team"
            className="invert h-8 w-8 rounded-lg border border-line object-cover"
          />
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight">Hryak Team</span>
            <span className="block text-[11px] text-mist">imgenius_ · drbabaxa</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-sm text-mist transition-colors hover:bg-white/5 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
