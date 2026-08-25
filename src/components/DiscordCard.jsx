import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STATUS = {
  online: { label: "В сети", color: "bg-online", text: "text-online" },
  idle: { label: "Не активен", color: "bg-idle", text: "text-idle" },
  dnd: { label: "Не беспокоить", color: "bg-dnd", text: "text-dnd" },
  offline: { label: "Не в сети", color: "bg-offline", text: "text-mist" },
};

const FLAGS = {
  STAFF: 1 << 0,
  PARTNER: 1 << 1,
  HYPESQUAD_EVENTS: 1 << 2,
  BUG_HUNTER_1: 1 << 3,
  HOUSE_BRAVERY: 1 << 6,
  HOUSE_BRILLIANCE: 1 << 7,
  HOUSE_BALANCE: 1 << 8,
  EARLY_SUPPORTER: 1 << 9,
  BUG_HUNTER_2: 1 << 14,
  VERIFIED_DEVELOPER: 1 << 17,
  CERTIFIED_MODERATOR: 1 << 18,
  ACTIVE_DEVELOPER: 1 << 22,
};

function avatarUrl(id, hash, size = 256) {
  const ext = hash.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${id}/${hash}.${ext}?size=${size}`;
}

function bannerUrl(id, hash) {
  const ext = hash.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/banners/${id}/${hash}.${ext}?size=512`;
}

function assetUrl(a, key) {
  const img = a?.assets?.[key];
  if (!img) return null;
  if (img.startsWith("mp:")) return `https://media.discordapp.net/${img.slice(3)}`;
  if (img.startsWith("spotify:")) return null;
  return `https://cdn.discordapp.com/app-assets/${a.application_id}/${img}.png?size=128`;
}

function useNow(interval = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(t);
  }, [interval]);
  return now;
}

function fmtClock(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function fmtElapsed(ms) {
  const mins = Math.max(0, Math.floor(ms / 60000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h} ч ${m} мин` : `${m} мин`;
}

/* ---------- badge icons ---------- */

const ShieldIcon = (c) => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill={c}>
    <path d="M6 0.8l4.6 1.3v3.2c0 2.9-2 4.8-4.6 5.9C3.4 10.1 1.4 8.2 1.4 5.3V2.1L6 0.8z" />
  </svg>
);

const BugIcon = (c) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round">
    <circle cx="6" cy="6.2" r="2.5" />
    <path d="M3.7 4.5L2 2.8M8.3 4.5L10 2.8M3.2 9.8L1.4 11.4M8.8 9.8l1.8 1.6M4 3.4V1.7M8 3.4V1.7" />
  </svg>
);

const GemIcon = (c) => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill={c}>
    <path d="M6 0.6l3.8 4.4L6 11.4 2.2 5 6 0.6z" />
  </svg>
);

const CheckIcon = (c) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6.5l2.6 2.6L10 3.5" />
  </svg>
);

const BoltIcon = (c) => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill={c}>
    <path d="M7.2 0.6L1.8 7h3.4L4.8 11.4l5.4-6.4H6.8L7.2 0.6z" />
  </svg>
);

const TermIcon = (c) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 3.2L1.4 6 4 8.8M8 8.8L10.6 6 8 3.2" />
  </svg>
);

const HammerIcon = (c) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 1.5l2 2-4.5 4.5-2-2L9.5 1.5zM6.2 3.8l2 2M1.5 11.5l4-4 1.5 1.5-4 4H1.5v-1.5z" />
  </svg>
);

function getBadges(du) {
  const f = du?.public_flags ?? 0;
  const list = [];
  if (f & FLAGS.STAFF) list.push({ label: "Discord Staff", color: "#3b82f6", icon: HammerIcon });
  if (f & FLAGS.PARTNER) list.push({ label: "Партнёр Discord", color: "#3b82f6", icon: CheckIcon });
  if (f & FLAGS.CERTIFIED_MODERATOR) list.push({ label: "Модератор Discord", color: "#38bdf8", icon: ShieldIcon });
  const house =
    f & FLAGS.HOUSE_BRAVERY
      ? ["HypeSquad Bravery", "#a78bfa"]
      : f & FLAGS.HOUSE_BRILLIANCE
        ? ["HypeSquad Brilliance", "#fb923c"]
        : f & FLAGS.HOUSE_BALANCE
          ? ["HypeSquad Balance", "#4ade80"]
          : f & FLAGS.HYPESQUAD_EVENTS
            ? ["HypeSquad Events", "#a78bfa"]
            : null;
  if (house) list.push({ label: house[0], color: house[1], icon: ShieldIcon });
  if (f & FLAGS.EARLY_SUPPORTER) list.push({ label: "Early Supporter", color: "#f87171", icon: GemIcon });
  if (f & FLAGS.BUG_HUNTER_2) list.push({ label: "Bug Hunter", color: "#facc15", icon: BugIcon });
  else if (f & FLAGS.BUG_HUNTER_1) list.push({ label: "Bug Hunter", color: "#4ade80", icon: BugIcon });
  if (f & FLAGS.ACTIVE_DEVELOPER) list.push({ label: "Active Developer", color: "#60a5fa", icon: TermIcon });
  if (f & FLAGS.VERIFIED_DEVELOPER) list.push({ label: "Verified Developer", color: "#94a3b8", icon: TermIcon });
  if (du?.premium_type) list.push({ label: "Nitro", color: "#818cf8", icon: BoltIcon });
  return list;
}

function Badge({ label, color, icon }) {
  return (
    <span
      title={label}
      className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-md border border-line bg-ink/70"
    >
      {icon(color)}
    </span>
  );
}

/* ---------- blocks ---------- */

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-card">
      <div className="skeleton h-24 w-full rounded-none" />
      <div className="px-6 pb-6">
        <div className="-mt-8 flex items-end gap-4">
          <div className="skeleton h-16 w-16 rounded-full ring-4 ring-card" />
          <div className="flex-1 space-y-2 pb-1">
            <div className="skeleton h-5 w-32 rounded" />
            <div className="skeleton h-3 w-20 rounded" />
          </div>
        </div>
        <div className="skeleton mt-4 h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}

function UnmonitoredCard({ username, id }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-card">
      <div className="h-24 w-full bg-gradient-to-r from-blurple/35 to-blurple-2/20" />
      <div className="px-6 pb-6">
        <div className="-mt-8 flex items-end gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-ink text-2xl font-bold text-mist ring-4 ring-card">
            {username[0].toUpperCase()}
          </div>
          <div className="pb-1">
            <h3 className="text-lg font-bold">{username}</h3>
            <p className="text-sm text-mist">статус недоступен</p>
          </div>
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
    </div>
  );
}

function CustomStatus({ custom }) {
  if (!custom?.state) return null;
  return (
    <p className="flex items-center gap-1.5 text-sm italic text-mist">
      {custom.emoji && (
        <img
          src={
            custom.emoji.id
              ? `https://cdn.discordapp.com/emojis/${custom.emoji.id}.png?size=32`
              : `https://cdn.discordapp.com/emojis/${encodeURIComponent(custom.emoji.name)}.png`
          }
          alt=""
          className="inline-block h-4 w-4 align-[-3px]"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
      {custom.state}
    </p>
  );
}

function GameBlock({ a }) {
  const now = useNow(1000);
  const large = assetUrl(a, "large_image");
  const small = assetUrl(a, "small_image");
  const start = a.timestamps?.start;
  const end = a.timestamps?.end;
  const hasProgress = Boolean(start && end && end > start);
  const pct = hasProgress ? Math.min(100, ((now - start) / (end - start)) * 100) : null;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-ink/60 p-3">
      {large && (
        <div className="relative h-12 w-12 shrink-0">
          <img src={large} alt="" className="h-12 w-12 rounded-lg object-cover" />
          {small && (
            <img
              src={small}
              alt=""
              className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-ink"
            />
          )}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">Играет</p>
          {start && (
            <span className="shrink-0 font-mono text-[11px] text-mist">
              {fmtElapsed(now - start)}
            </span>
          )}
        </div>
        <p className="truncate text-sm font-semibold text-white">{a.name}</p>
        {(a.details || a.state) && (
          <p className="truncate text-xs text-mist">
            {[a.details, a.state].filter(Boolean).join(" — ")}
          </p>
        )}
        {hasProgress && (
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-blurple" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}

function SpotifyBlock({ spotify }) {
  const now = useNow(1000);
  const start = spotify.timestamps?.start;
  const end = spotify.timestamps?.end;
  const total = start && end ? end - start : 0;
  const elapsed = start ? now - start : 0;
  const pct = total > 0 ? Math.min(100, (elapsed / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-line bg-ink/60 p-3">
      <div className="flex items-center gap-3">
        {spotify.album_art_url ? (
          <img src={spotify.album_art_url} alt="" className="h-11 w-11 shrink-0 rounded-md object-cover" />
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-online/15">
            <div className="flex items-end gap-[3px]">
              <span className="eq-bar w-[3px] rounded bg-online" />
              <span className="eq-bar w-[3px] rounded bg-online" style={{ animationDelay: "0.2s" }} />
              <span className="eq-bar w-[3px] rounded bg-online" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-white">{spotify.song}</p>
            <span className="shrink-0 rounded-full border border-online/30 bg-online/10 px-2 py-0.5 font-mono text-[10px] text-online">
              Spotify
            </span>
          </div>
          <p className="truncate text-xs text-mist">{spotify.artist}</p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="font-mono text-[10px] text-mist">{fmtClock(elapsed)}</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-online" style={{ width: `${pct}%` }} />
        </div>
        <span className="font-mono text-[10px] text-mist">{fmtClock(total)}</span>
      </div>
    </div>
  );
}

const PlatformIcon = ({ type }) => {
  const icons = {
    desktop: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <rect x="1.5" y="2.5" width="13" height="8.5" rx="1" />
        <path d="M5.5 14h5M8 11v3" />
      </svg>
    ),
    web: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <circle cx="8" cy="8" r="6" />
        <path d="M2 8h12M8 2c2 1.8 3 3.8 3 6s-1 4.2-3 6c-2-1.8-3-3.8-3-6s1-4.2 3-6z" />
      </svg>
    ),
    mobile: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <rect x="4.5" y="1.5" width="7" height="13" rx="1.5" />
        <path d="M7 12.5h2" />
      </svg>
    ),
  };
  const labels = { desktop: "Desktop", web: "Web", mobile: "Mobile" };
  return (
    <span title={labels[type]} className="text-mist/70 transition-colors hover:text-white">
      {icons[type]}
    </span>
  );
};

/* ---------- main card ---------- */

export default function DiscordCard({ user, presence, index }) {
  const motionProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay: index * 0.12 },
  };

  if (presence?.status === "loading" || !presence) {
    return (
      <motion.div {...motionProps}>
        <SkeletonCard />
      </motion.div>
    );
  }

  if (presence.status === "unmonitored") {
    return (
      <motion.div {...motionProps}>
        <UnmonitoredCard username={user.username} id={user.id} />
      </motion.div>
    );
  }

  const { data } = presence;
  const du = data.discord_user;
  const st = STATUS[data.discord_status] || STATUS.offline;
  const name = du.display_name || du.global_name || du.username || user.username;
  const badges = getBadges(du);
  const custom = (data.activities || []).find((a) => a.type === 4);
  const activities = (data.activities || []).filter((a) => a.type !== 4);
  const accent = du.accent_color
    ? `#${du.accent_color.toString(16).padStart(6, "0")}`
    : null;

  return (
    <motion.article
      {...motionProps}
      className="group overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-blurple/50 hover:shadow-2xl hover:shadow-blurple/10"
    >
      <div className="relative h-24 w-full">
        {du.banner ? (
          <img
            src={bannerUrl(user.id, du.banner)}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: accent
                ? `linear-gradient(120deg, ${accent}55, transparent)`
                : "linear-gradient(120deg, rgba(100,116,139,0.35), rgba(132,148,168,0.12))",
            }}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
      </div>

      <div className="px-6 pb-6">
        <div className="-mt-8 flex items-end gap-4">
          <div className="relative shrink-0">
            {du.avatar ? (
              <img
                src={avatarUrl(user.id, du.avatar)}
                alt={name}
                className="h-16 w-16 rounded-full object-cover ring-4 ring-card"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-2xl font-bold text-mist ring-4 ring-card">
                {name[0].toUpperCase()}
              </div>
            )}
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-[18px] w-[18px] rounded-full border-[3px] border-card ${st.color}`}
              title={st.label}
            />
          </div>
          <div className="min-w-0 flex-1 pb-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="truncate text-xl font-bold text-white">{name}</h3>
              {badges.map((b) => (
                <Badge key={b.label} {...b} />
              ))}
            </div>
            <p className="text-sm text-mist">@{du.username}</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <p className="flex items-center gap-2 text-sm">
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${st.color}`} />
            <span className={`font-medium ${st.text}`}>{st.label}</span>
          </p>

          <CustomStatus custom={custom} />

          {activities.length > 0 && <GameBlock a={activities[0]} />}
          {data.listening_to_spotify && data.spotify && (
            <SpotifyBlock spotify={data.spotify} />
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
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
          <div className="flex items-center gap-2.5">
            {data.active_on_discord_desktop && <PlatformIcon type="desktop" />}
            {data.active_on_discord_web && <PlatformIcon type="web" />}
            {data.active_on_discord_mobile && <PlatformIcon type="mobile" />}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
