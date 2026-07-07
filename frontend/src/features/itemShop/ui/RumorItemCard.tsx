import { Button } from "@/shared/ui/button2"
import { MoneyText } from "@/shared/model/Money"
import { useBuyRumorMutation } from "@/entities/rumors"
import { useRumorStore } from "@/entities/rumors/model/rumorStore"
import { toast } from "sonner"

const CONFIG = {
  RUMOR_BASIC: {
    label: "찌라시",
    description: "다음 뉴스의 힌트를 얻습니다",
    price: { amount: 500 },
    img: "/spy.png",
  },
  RUMOR_PREMIUM: {
    label: "프리미엄 찌라시",
    description: "더 정확한 힌트를 얻습니다",
    price: { amount: 1500 },
    img: "/spy-pri.png",
  },
} as const

type RumorType = keyof typeof CONFIG

export function RumorItemCard({ type }: { type: RumorType }) {
  const { mutate, isPending } = useBuyRumorMutation()
  const addRumor = useRumorStore((s) => s.add)
  const { label, description, price, img } = CONFIG[type]

  const handleClick = () => {
    mutate(
      { type, price, category: "IT" },
      {
        onSuccess: (res) => {
          addRumor(res.content, res.type)
        },
        onError: () => {
          toast.error("찌라시 구매에 실패했습니다.")
        },
      }
    )
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex gap-4">
        <img src={img} className="size-12" />
        <div>
          <p className="text-lg font-bold">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <p className="text-lg font-bold">
        <MoneyText money={price} />
      </p>
      <Button
        size="md"
        className="w-36"
        onClick={handleClick}
        disabled={isPending}
      >
        구매
      </Button>
    </div>
  )
}
