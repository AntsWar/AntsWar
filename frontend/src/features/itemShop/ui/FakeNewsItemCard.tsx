import { toast } from "sonner"
import { MoneyText } from "@/shared/model/Money"
import { Button } from "@/shared/ui/button"
import { useState } from "react"
import { useBuyItemMutation } from "../model/useBuyItemMutation"
import { Input } from "@/shared/ui/input"

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
    <div className="flex flex-col items-center space-y-2">
      <div className="flex gap-4">
        <img src="/thief.png" className="size-12" />
        <div>
          <p className="text-lg font-bold">가짜 뉴스</p>
          <p className="text-sm text-muted-foreground">가짜 뉴스를 뿌립니다.</p>
        </div>
      </div>
      <p className="text-lg font-bold">
        <MoneyText money={price} />
      </p>
      <Input
        inputSize="md"
        value={code}
        maxLength={40}
        placeholder="뉴스 내용"
        onChange={(e) => setCode(e.target.value)}
      />
      <Button
        size="md"
        className="w-36"
        onClick={handleClick || !code}
        disabled={isPending}
      >
        구매
      </Button>
    </div>
  )
}
