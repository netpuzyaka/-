export default function Footer() {
  return (
    <footer className="relative border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 text-center">
        <img
          src="/assets/images.jpg"
          alt="Hryak Team"
          className="h-10 w-10 rounded-xl border border-line object-cover"
        />
        <p className="font-display text-sm font-bold">Hryak Team</p>
        <p className="font-mono text-xs text-mist">
          © 2026 — imgenius_ & drbabaxa · сайты на React, программы на C# / C++ / Python
        </p>
      </div>
    </footer>
  );
}
