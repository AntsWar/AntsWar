import { formatTime } from "@/shared/lib/formatTime"
import type { RoomMode } from "../model/types"
import { Share2 } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { toast } from "sonner"

export default function RoomInfo(props: { name: string; mode: RoomMode }) {
  const { name, mode } = props
  return (
    <div className="flex flex-row gap-2">
      <div className="text-primary">{name}</div>
      <div className="text-muted-foreground">
        ({mode.type === "TIME" ? "시간모드" : "돈모드"}
        {" | "}
        {mode.type === "TIME" && formatTime(mode.target)})
      </div>
      <Button
        variant={"outline"}
        size={"icon-sm"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href)
            toast.success("링크가 복사되었습니다.")
          } catch (e) {
            toast.error("링크 복사에 실패했습니다.")
            console.log(e)
          }
        }}
      >
        <Share2 />
      </Button>
    </div>
  )
}
