import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STATUS = {
  online: { label: "В сети", color: "bg-online", text: "text-online" },
  idle: { label: "Не активен", color: "bg-idle", text: "text-idle" },
  dnd: { label: "Не беспокоить", color: "bg-dnd", text: "text-dnd" },
  offline: { label: "Не в сети", color: "bg-offline", text: "text-mist" },
};

function avatarUrl(id, hash, size = 256) {
  const ext = hash.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${id}/${hash}.${ext}?size=${size}`;
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-line bg-card p-7">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 rounded-full" />
        <div className="space-y-2.5">
          <div className="skeleton h-5 w-40 rounded-md" />
          <div className="skeleton h-3.5 w-24 rounded-md" />
        </div>
      </div>
      <div className="skeleton mt-6 h-16 w-full rounded-xl" />
    </div>
  );
}

function UnmonitoredCard({ username, id }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-7">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-ink font-display text-2xl font-bold text-mist">
          {username[0].toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg font-bold">{username}</h3>
          <p className="text-sm text-mist">не отслеживается</p>
        </div>
      </div>
      <div className="mt-5 rounded-xl border border-line bg-ink/60 p-4 text-sm leading-relaxed text-mist">
        Статус пока недоступен.
      </div>
      <a
        href={`https://discord.com/users/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blurple px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blurple-2"
      >
        Профиль в Discord
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

function Elapsed({ start }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(t);
  }, []);
  const mins = Math.max(0, Math.floor((now - start) / 60000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return (
    <span className="text-mist">
      {h > 0 ? `${h} ч ${m} мин` : `${m} мин`}
    </span>
  );
}

function SpotifyBlock({ spotify }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-ink/60 p-3">
      {spotify.album_art_url ? (
        <img
          src={spotify.album_art_url}
          alt=""
          className="h-12 w-12 rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-online/15">
          <div className="flex items-end gap-[3px]">
            <span className="eq-bar w-[3px] rounded bg-online" />
            <span className="eq-bar w-[3px] rounded bg-online" style={{ animationDelay: "0.2s" }} />
            <span className="eq-bar w-[3px] rounded bg-online" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">{spotify.song}</p>
        <p className="truncate text-xs text-mist">{spotify.artist}</p>
      </div>
      <span className="ml-auto shrink-0 rounded-full border border-online/30 bg-online/10 px-2 py-0.5 font-mono text-[10px] text-online">
        Spotify
      </span>
    </div>
  );
}

function ActivityBlock({ data }) {
  const activities = (data.activities || []).filter((a) => a.type !== 4);
  const custom = (data.activities || []).find((a) => a.type === 4);
  const status = STATUS[data.discord_status] || STATUS.offline;

  if (custom?.state) {
    return (
      <div className="rounded-xl border border-line bg-ink/60 p-4">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">Статус</p>
        <p className="text-sm">
          {custom.emoji && (
            <img
              src={
                custom.emoji.id
                  ? `https://cdn.discordapp.com/emojis/${custom.emoji.id}.png?size=32`
                  : `https://cdn.discordapp.com/emojis/${encodeURIComponent(custom.emoji.name)}.png`
              }
              alt=""
              className="mr-1.5 inline-block h-4 w-4 align-[-3px]"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          {custom.state}
        </p>
      </div>
    );
  }

  if (activities.length > 0) {
    const a = activities[0];
    return (
      <div className="rounded-xl border border-line bg-ink/60 p-4">
        <div className="flex items-center justify-between">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">Сейчас в</p>
          {a.timestamps?.start && (
            <p className="font-mono text-[11px]">
              <Elapsed start={a.timestamps.start} />
            </p>
          )}
        </div>
        <p className="text-sm font-semibold text-white">{a.name}</p>
        {(a.details || a.state) && (
          <p className="mt-0.5 truncate text-xs text-mist">
            {[a.details, a.state].filter(Boolean).join(" — ")}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-ink/60 p-4">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">Статус</p>
      <p className={`text-sm font-medium ${status.text}`}>
        {data.discord_status === "offline" ? "Не в сети" : "Просто в Discord"}
      </p>
    </div>
  );
}

export default function DiscordCard({ user, presence, index }) {
  if (presence?.status === "loading" || !presence) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.12 }}
      >
        <SkeletonCard />
      </motion.div>
    );
  }

  if (presence.status === "unmonitored") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.12 }}
      >
        <UnmonitoredCard username={user.username} id={user.id} />
      </motion.div>
    );
  }

  const { data } = presence;
  const du = data.discord_user;
  const st = STATUS[data.discord_status] || STATUS.offline;
  const name = du.display_name || du.username || user.username;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-blurple/50 hover:shadow-2xl hover:shadow-blurple/10"
    >
      <div className="relative flex items-center gap-4">
        <div className="relative shrink-0">
          {du.avatar ? (
            <img
              src={avatarUrl(user.id, du.avatar)}
              alt={name}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-line"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink font-display text-2xl font-bold text-mist">
              {name[0].toUpperCase()}
            </div>
          )}
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full border-4 border-card ${st.color}`}
            title={st.label}
          />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold">{name}</h3>
          <p className={`font-mono text-xs ${st.text}`}>
            ● {st.label}
          </p>
        </div>
        <span className="ml-auto shrink-0 font-mono text-[11px] text-mist/60">
          @{du.username}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <ActivityBlock data={data} />
        {data.listening_to_spotify && data.spotify && (
          <SpotifyBlock spotify={data.spotify} />
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <a
          href={`https://discord.com/users/${user.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-blurple px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blurple/25 transition-colors hover:bg-blurple-2"
        >
          Профиль в Discord
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        {data.active_on_discord_desktop && (
          <span className="font-mono text-[11px] text-mist/60">🖥 desktop</span>
        )}
        {data.active_on_discord_mobile && (
          <span className="font-mono text-[11px] text-mist/60">📱 mobile</span>
        )}
        {data.active_on_discord_web && (
          <span className="font-mono text-[11px] text-mist/60">🌐 web</span>
        )}
      </div>
    </motion.article>
  );
}
