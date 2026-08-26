import { motion } from "framer-motion";
import { useLanyard } from "../hooks/useLanyard.js";
import DiscordCard from "./DiscordCard.jsx";

const USERS = [
  { id: "1099012863835783168", username: "imgenius_" },
  { id: "1323381913410601150", username: "drbabaxa" },
];

export default function DiscordProfiles() {
  const { state, connected } = useLanyard(USERS.map((u) => u.id));

  return (
    <section id="discord" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-mist">
            // live presence
          </p>
          <h2 className="text-2xl font-bold tracking-tight">Мы в Discord</h2>
        </div>
        <div
          className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs ${
            connected
              ? "border-online/30 bg-online/10 text-online"
              : "border-idle/30 bg-idle/10 text-idle"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${connected ? "bg-online" : "bg-idle"}`}
          />
          {connected ? "LIVE · реальное время" : "подключение…"}
        </div>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {USERS.map((u, i) => (
          <DiscordCard key={u.id} user={u} presence={state[u.id]} index={i} />
        ))}
      </div>
    </section>
  );
}
