import { useRumorStore } from "../model/rumorStore"
import { formatTimeToMS } from "@/shared/lib/formatTime"

export function RumorHistoryCard() {
  const rumors = useRumorStore((s) => s.rumors)

  return (
    <div className="space-y-3">
      {rumors.length === 0 ? (
        <p className="text-sm text-muted-foreground">아직 찌라시가 없습니다.</p>
      ) : (
        <ul className="max-h-36 space-y-2 overflow-y-auto">
          {[...rumors].reverse().map((item, i) => (
            <li key={i} className="flex items-start justify-between gap-3">
              <span
                className={`text-sm ${item.type === "RUMOR_PREMIUM" ? "text-stock-up" : ""}`}
              >
                <span className="font-semibold">
                  {item.type === "RUMOR_PREMIUM" ? "[프리미엄] " : "[찌라시] "}
                </span>
                {item.content}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                {formatTimeToMS(item.recievedAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
