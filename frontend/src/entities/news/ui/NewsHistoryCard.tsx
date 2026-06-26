import NewsPaper from "@/assets/icon/newsPaper.svg?react"
import { Card } from "@/shared/ui/card"
import { useNoticeStore } from "../model/noticeStore"
import { formatTimeToMS } from "@/shared/lib/formatTime"

export function NewsHistoryCard() {
  const history = useNoticeStore((s) => s.history)

  return (
    <Card size="md" className="w-full rounded-xl">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <NewsPaper className="size-7" />
          <span className="font-bold">뉴스</span>
        </div>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">아직 뉴스가 없습니다.</p>
        ) : (
          <ul className="max-h-36 space-y-2 overflow-y-auto">
            {history.map((item, i) => (
              <li key={i} className="flex items-start justify-between gap-3">
                <span className={`text-sm ${item.type === "breaking" ? "text-stock-up" : ""}`}>
                  <span className="font-semibold">
                    {item.type === "breaking" ? "[속보] " : "[뉴스] "}
                  </span>
                  {item.message}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {formatTimeToMS(item.receivedAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}
