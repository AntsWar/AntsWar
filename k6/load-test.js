import http from "k6/http";
import ws from "k6/ws";
import { check } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";

const BASE_URL = __ENV.BASE_URL || "https://localhost/api";
const WS_URL = __ENV.WS_URL || `${BASE_URL.replace(/^http/, "ws")}/ws`;
const VUS = Number(__ENV.VUS || 100);
const TEST_SECONDS = Number(__ENV.TEST_SECONDS || 60);
const ITEM_INTERVAL_MS = 2000;

const stompConnected = new Rate("stomp_connected");
const stompErrors = new Counter("stomp_errors");
const gameTicks = new Counter("game_ticks_received");
const gameTickGap = new Trend("game_tick_gap", true);
const itemDuration = new Trend("item_duration", true);
const joinDuration = new Trend("join_duration", true);

export const options = {
  scenarios: {
    websocket_game: {
      executor: "per-vu-iterations",
      vus: VUS,
      iterations: 1,
      maxDuration: `${TEST_SECONDS + 30}s`,
    },
  },

  thresholds: {
    checks: ["rate>0.99"],
    http_req_failed: ["rate<0.01"],
    stomp_connected: ["rate>0.99"],
    stomp_errors: ["count==0"],
    game_tick_gap: ["p(95)<4000"],
    join_duration: ["p(95)<2000", "p(99)<2500"],
    item_duration: ["p(95)<100", "p(99)<300"],
    "item_duration{tick_phase:0-1s}": ["p(95)<100", "p(99)<300"],
    "item_duration{tick_phase:1-2s}": ["p(95)<100", "p(99)<300"],
    "item_duration{tick_phase:2-3s}": ["p(95)<100", "p(99)<300"],
    "item_duration{tick_phase:3s+}": ["p(95)<100", "p(99)<300"],
  },

  summaryTrendStats: ["avg", "med", "p(95)", "p(99)", "max"],
};

function stompFrame(command, headers = {}, body = "") {
  const lines = [
    command,
    ...Object.entries(headers).map(([key, value]) => `${key}:${value}`),
    "",
    body,
  ];

  return `${lines.join("\n")}\x00`;
}

function parseStompFrame(message) {
  const frame = String(message).replace(/^\n+/, "");
  const separator = frame.indexOf("\n\n");

  if (separator < 0) {
    return { command: frame.trim(), body: "" };
  }

  return {
    command: frame.slice(0, frame.indexOf("\n")).trim(),
    body: frame.slice(separator + 2).replace(/\x00+$/, ""),
  };
}

function joinGame() {
  const response = http.post(
    `${BASE_URL}/game/join`,
    JSON.stringify({ playerName: `test-${__VU}` }),
    { headers: { "Content-Type": "application/json" } },
  );

  joinDuration.add(response.timings.duration);

  const succeeded = check(response, {
    "게임 입장 성공": (res) => res.status === 200,
  });

  if (!succeeded) return null;

  const sessionId = response.cookies.JSESSIONID?.[0]?.value;
  const body = response.json();

  check(
    { sessionId, body },
    {
      "세션 쿠키 수신": (value) => Boolean(value.sessionId),
      "게임 정보 수신": (value) => Boolean(value.body?.game?.id),
    },
  );

  if (!sessionId || !body?.game?.id) return null;

  return {
    sessionId,
    gameId: body.game.id,
  };
}

function tickPhase(lastTickAt) {
  if (lastTickAt === 0) return "before-first-tick";

  const elapsed = Date.now() - lastTickAt;
  if (elapsed < 1000) return "0-1s";
  if (elapsed < 2000) return "1-2s";
  if (elapsed < 3000) return "2-3s";
  return "3s+";
}

function buyGoldenFinger(lastTickAt) {
  const phase = tickPhase(lastTickAt);
  const response = http.post(
    `${BASE_URL}/player/item`,
    JSON.stringify({
      item: "GOLDEN_FINGER",
      category: null,
    }),
    {
      headers: { "Content-Type": "application/json" },
      tags: { tick_phase: phase },
    },
  );

  itemDuration.add(response.timings.duration, { tick_phase: phase });

  check(response, {
    "골드핑거 구매 성공": (res) => res.status === 204,
  });
}

export default function () {
  const joined = joinGame();
  if (!joined) return;

  let lastTickAt = 0;
  let connected = false;

  const response = ws.connect(
    WS_URL,
    {
      headers: {
        Cookie: `JSESSIONID=${joined.sessionId}`,
      },
    },
    (socket) => {
      socket.on("open", () => {
        socket.send(
          stompFrame("CONNECT", {
            "accept-version": "1.2",
            "heart-beat": "0,0",
          }),
        );
      });

      socket.on("message", (message) => {
        const frame = parseStompFrame(message);

        if (frame.command === "CONNECTED") {
          connected = true;
          stompConnected.add(true);
          socket.send(
            stompFrame("SUBSCRIBE", {
              id: `game-${__VU}`,
              destination: `/topic/game/${joined.gameId}`,
              ack: "auto",
            }),
          );
          return;
        }

        if (frame.command === "ERROR") {
          stompErrors.add(1);
          return;
        }

        if (frame.command !== "MESSAGE") return;

        try {
          const event = JSON.parse(frame.body);
          if (event.type !== "GAME_UPDATED") return;

          const now = Date.now();
          gameTicks.add(1);
          if (lastTickAt > 0) gameTickGap.add(now - lastTickAt);
          lastTickAt = now;
        } catch (_) {
          stompErrors.add(1);
        }
      });

      socket.on("error", () => {
        stompErrors.add(1);
      });

      socket.setInterval(() => {
        buyGoldenFinger(lastTickAt);
      }, ITEM_INTERVAL_MS);

      socket.setTimeout(() => {
        socket.send(stompFrame("DISCONNECT"));
        socket.close();
      }, TEST_SECONDS * 1000);
    },
  );

  if (!connected) stompConnected.add(false);

  check(response, {
    "WebSocket handshake 성공": (res) => res?.status === 101,
  });
}
