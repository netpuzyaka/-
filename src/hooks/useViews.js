import { useEffect, useState } from "react";

const NAMESPACE = "hryak-team-site-views";

export function useViews() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://countapi.mileshilliard.com/api/v1/hit/${NAMESPACE}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && typeof data.value === "number") setViews(data.value);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return views;
}
