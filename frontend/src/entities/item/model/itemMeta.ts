import { RadioTower, type LucideIcon } from "lucide-react"

export const itemMeta: Record<
  string,
  { name: string; icon: LucideIcon; description: string }
> = {
  NEWS_RADAR: {
    name: "뉴스레이더",
    icon: RadioTower,
    description: "모든 뉴스를 받습니다.",
  },
}
