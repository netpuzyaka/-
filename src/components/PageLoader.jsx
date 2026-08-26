import { useEffect, useState } from "react";

export default function PageLoader() {
  const [closing, setClosing] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setClosing(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => setGone(true), 500);
    return () => clearTimeout(t);
  }, [closing]);

  if (gone) return null;

  return (
    <div id="page-loader" style={{ opacity: closing ? 0 : 1 }}>
      <div className="loader-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
