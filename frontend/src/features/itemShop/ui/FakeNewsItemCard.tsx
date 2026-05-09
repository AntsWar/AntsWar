import { itemMeta } from "@/entities/item"
import { useBuyFakeNewsItemMutation } from "../model/useBuyFakeNewsItemMutation"
import { toast } from "sonner"
import { Money } from "@/shared/model/Money"
import { Separator } from "@/shared/ui/separator"
import { Button } from "@/shared/ui/button"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { NEWS_META } from "@/entities/news"

export function FakeNewsItemCard() {
  const { mutate, isPending } = useBuyFakeNewsItemMutation()
  const meta = itemMeta["FAKE_NEWS"]
  const [code, setCode] = useState<string>("")

  const Icon = meta.icon

  const handleClick = () => {
    if (!code) {
      toast.error("뉴스를 선택해주세요.")
      return
    }

    mutate(code, {
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: () => {
        toast.success(`${meta.name} 사용 완료`)
      },
    })
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-input/30 p-4">
      <div className="flex justify-between">
        <div className="flex flex-row gap-3">
          <Icon />
          {meta.name}
        </div>

        <Money money={{ amount: 200 }} />
      </div>

      <Separator />

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-3">
          <Select value={code} onValueChange={setCode}>
            <SelectTrigger>
              <SelectValue placeholder="뉴스 선택" />
            </SelectTrigger>

            <SelectContent>
              {NEWS_OPTIONS.map((item) => (
                <SelectItem key={item.code} value={item.code}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          onClick={handleClick}
          disabled={isPending || !code}
        >
          <ShoppingCart />
          구매
        </Button>
      </div>
    </div>
  )
}

const NEWS_OPTIONS = Object.entries(NEWS_META).map(([code, label]) => ({
  code,
  label,
}))
