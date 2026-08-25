import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "О нас" },
  { href: "#skills", label: "Скиллы" },
  { href: "#discord", label: "Discord" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/40" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="group flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="Hryak Team"
            className="h-10 w-10 rounded-xl border border-line object-cover shadow-md shadow-blurple/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
          />
          <div className="leading-tight">
            <span className="block text-[15px] font-bold tracking-tight text-white">Hryak Team</span>
            <span className="block text-[11px] font-medium text-mist">
              imgenius_ · drbabaxa
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-mist transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#discord"
            className="ml-3 rounded-xl bg-blurple px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blurple/40 transition-all hover:bg-blurple-2 hover:shadow-blurple-2/40"
          >
            Наши профили
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-white md:hidden"
          aria-label="Меню"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {menuOpen ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="glass border-t border-line px-5 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-4 py-2.5 text-sm font-medium text-mist hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </motion.header>
  );
}
