import { useEffect, useRef, useState } from "react";

const WS_URL = "wss://api.lanyard.rest/socket";
const REST_URL = "https://api.lanyard.rest/v1/users/";

export function useLanyard(userIds) {
  const [state, setState] = useState(() =>
    Object.fromEntries(userIds.map((id) => [id, { status: "loading" }]))
  );
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);
  const heartbeatRef = useRef(null);
  const reconnectRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const applyPresence = (id, data) => {
      if (cancelled) return;
      setState((prev) => ({ ...prev, [id]: { status: "ok", data } }));
    };

    const markUnmonitored = (id) => {
      if (cancelled) return;
      setState((prev) =>
        prev[id]?.status === "ok" ? prev : { ...prev, [id]: { status: "unmonitored" } }
      );
    };

    const fetchRest = async (id) => {
      try {
        const res = await fetch(REST_URL + id);
        if (res.ok) {
          const json = await res.json();
          applyPresence(id, json.data);
        } else {
          markUnmonitored(id);
        }
      } catch {
        /* ws init state will decide */
      }
    };

    userIds.forEach(fetchRest);

    const connect = () => {
      let socket;
      try {
        socket = new WebSocket(WS_URL);
      } catch {
        scheduleReconnect();
        return;
      }
      wsRef.current = socket;

      socket.addEventListener("open", () => {
        setConnected(true);
        socket.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: userIds } }));
        heartbeatRef.current = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ op: 3 }));
          }
        }, 30000);
      });

      socket.addEventListener("message", (event) => {
        let msg;
        try {
          msg = JSON.parse(event.data);
        } catch {
          return;
        }
        if ((msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") && msg.d) {
          Object.entries(msg.d).forEach(([id, data]) => applyPresence(id, data));
          if (msg.t === "INIT_STATE") {
            userIds.forEach((id) => {
              if (!msg.d[id]) markUnmonitored(id);
            });
          }
        }
      });

      socket.addEventListener("close", () => {
        setConnected(false);
        clearInterval(heartbeatRef.current);
        scheduleReconnect();
      });

      socket.addEventListener("error", () => {
        socket.close();
      });
    };

    const scheduleReconnect = () => {
      if (reconnectRef.current) return;
      reconnectRef.current = setTimeout(() => {
        reconnectRef.current = null;
        connect();
      }, 5000);
    };

    connect();

    return () => {
      cancelled = true;
      clearInterval(heartbeatRef.current);
      clearTimeout(reconnectRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [userIds.join(",")]);

  return { state, connected };
}
