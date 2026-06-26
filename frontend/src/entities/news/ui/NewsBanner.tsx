import Speaker from "@/assets/icon/speaker.svg?react"
import { useNoticeStore } from "../model/noticeStore"
import { WideCard } from "@/shared/ui/card"

export function NewsBanner() {
  const message = useNoticeStore((s) => s.message)
  const type = useNoticeStore((s) => s.type)

  return (
    <WideCard size="lg" className="w-full rounded-sm sm:rounded-lg">
      <div className="flex gap-2">
        <Speaker className="size-7" />
        {message ? (
          <>
            <span className={type === "breaking" ? "font-bold text-stock-up" : ""}>
              {type === "breaking" ? "[속보]" : "[뉴스]"}
            </span>
            <span className={type === "breaking" ? "text-stock-up" : ""}>
              {message}
            </span>
          </>
        ) : (
          "뉴스를 기다리는 중..."
        )}
      </div>
    </WideCard>
  )
}
