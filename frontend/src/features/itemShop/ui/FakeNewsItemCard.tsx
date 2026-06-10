import { toast } from "sonner"
import { MoneyText } from "@/shared/model/Money"
import { Separator } from "@/shared/ui/separator"
import { Button } from "@/shared/ui/button"
import { HatGlasses, ShoppingCart } from "lucide-react"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { NEWS_META } from "@/entities/news"
import { useBuyItemMutation } from "../model/useBuyItemMutation"

export function FakeNewsItemCard() {
  const { mutate, isPending } = useBuyItemMutation()
  const price = { amount: 3000 }

  const [code, setCode] = useState<string>("")

  const handleClick = () => {
    if (!code) {
      toast.error("뉴스를 선택해주세요.")
      return
    }

    mutate(
      { item: { code: "FAKE_NEWS", price: price }, code },
      {
        onSuccess: () => {
          toast.error("가짜뉴스 구매완료")
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-input/30 p-4">
      <div className="flex justify-between">
        <div className="flex flex-row gap-3">
          <HatGlasses />
          가짜 뉴스
        </div>

        <MoneyText money={price} />
      </div>

      <Separator />

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-3">
          <Select value={code} onValueChange={setCode}>
            <SelectTrigger>
              <SelectValue placeholder="뉴스 선택" />
            </SelectTrigger>

            <SelectContent>
              {NEWS_OPTIONS.map((opt) => (
                <SelectItem key={opt.code} value={opt.code}>
                  {opt.label}
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
