import Target from "@/assets/icon/target.svg?react"
import Sprout from "@/assets/icon/sprout.svg?react"
import Speaker from "@/assets/icon/speaker.svg?react"
import Store from "@/assets/icon/store.svg?react"
import Chat from "@/assets/icon/chat.svg?react"

export default function Manual() {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <Target className="size-5" /> 목표
        </div>
        <p className="text-muted-foreground">
          정해진 시간 동안 가장 많은 자산을 모아 1위를 차지하세요.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <Sprout className="size-5 text-primary" /> 투자하라!
        </div>
        <p className="text-muted-foreground">
          종목을 매수하거나 공매도할 수 있습니다. 가격 변동에 따라 수익과 손실이
          발생합니다.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <Speaker className="size-5" /> 뉴스를 확인하라!
        </div>
        <p className="text-muted-foreground">
          시장은 뉴스에 반응합니다. 뉴스의 흐름을 읽고 남들보다 먼저 투자하세요.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <Store className="size-5 text-primary" /> 아이템을 사라!
        </div>
        <p className="text-muted-foreground">
          아이템을 사용해 정보를 얻거나 상대를 교란할 수 있습니다.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <Chat className="size-5 text-primary" /> 소통하라!
        </div>
        <p className="text-muted-foreground">
          정보는 무기이자 함정입니다. 다른 플레이어와 소통하며 기회를 찾고,
          때로는 거짓 정보에 속지 않도록 주의하세요.
        </p>
      </div>
    </div>
  )
}
