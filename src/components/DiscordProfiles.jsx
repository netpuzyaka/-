import { useLanyard } from "../hooks/useLanyard.js";
import DiscordCard from "./DiscordCard.jsx";

const USERS = [
  { id: "1099012863835783168", username: "imgenius_" },
  { id: "1323381913410601150", username: "drbabaxa" },
];

export default function DiscordProfiles() {
  const { state, connected } = useLanyard(USERS.map((u) => u.id));

  return (
    <section id="discord" className="scroll-mt-24">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold">Мы в Discord</h2>
        <span
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] ${
            connected
              ? "border-online/30 bg-online/10 text-online"
              : "border-idle/30 bg-idle/10 text-idle"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-online" : "bg-idle"}`} />
          {connected ? "LIVE" : "…"}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {USERS.map((u, i) => (
          <DiscordCard key={u.id} user={u} presence={state[u.id]} index={i} />
        ))}
      </div>
    </section>
  );
}
