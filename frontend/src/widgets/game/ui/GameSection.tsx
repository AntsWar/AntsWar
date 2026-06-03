import { BriefcaseBusiness, Store } from "lucide-react"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldTitle,
} from "@/shared/ui/field"
import { MoneyText } from "@/shared/model/Money"
import { PlayerTable, type Player } from "@/entities/player"
import { MarketInfo, PortfolioInfo } from "@/features/market"
import MarketIcon from "@/assets/icon/chart_icon.svg?react"
import { useGame, useGameSocketEvent } from "@/entities/game"
import { ItemShop } from "@/features/itemShop"
import type { Purchase } from "@/entities/purchase"
import { toast } from "sonner"
import { queryClient } from "@/shared/quries/queryClient"
import { qk } from "@/shared/quries/keys"
import { useNoticeStore, NEWS_META } from "@/entities/news"
import { useMeQuery, type Me } from "@/features/getMe"

export default function GameSection() {
  const { game, setGame } = useGame()
  const { data: me } = useMeQuery()

  useGameSocketEvent("GAME_UPDATED", (payload) => {
    const msg = payload as {
      purchases: Array<Purchase>
      players: Array<Player>
      serverTime: string
    }

    setGame((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        purchases: msg.purchases,
        players: msg.players,
        serverTime: msg.serverTime,
      }
    })

    const currentMe = queryClient.getQueryData<Me>(qk.getMe())
    if (currentMe) {
      const updatedPlayer = msg.players.find(
        (p) => p.id === currentMe.player.id
      )
      if (updatedPlayer) {
        queryClient.setQueryData(qk.getMe(), {
          ...currentMe,
          player: updatedPlayer,
        })
      }
    }
  })

  useGameSocketEvent("NOTICE", (payload) => {
    const expiredAt = useNoticeStore.getState().expiredAt

    const noticeRate = expiredAt > Date.now() ? 1.0 : 0.3
    if (Math.random() < noticeRate) {
      const code = payload as string
      const message = NEWS_META[code] ?? code
      toast.info(message)
    }
  })

  useGameSocketEvent("PURCHASE_DELIST", (payload) => {
    const { name } = payload as { name: string }
    toast.info(`${name}(이)가 상폐되었습니다.`)
    queryClient.invalidateQueries({
      queryKey: qk.getMe(),
    })
  })

  return (
    <FieldGroup>
      <Field className="rounded-xl border bg-popover p-4">
        <FieldContent>
          <PlayerTable players={game?.players ?? []} me={me?.player} />
        </FieldContent>
      </Field>
      <Field className="w-full rounded-xl border bg-popover p-4">
        <FieldTitle className="text-xl font-semibold">
          <MarketIcon className="size-8 text-primary" />
          시장
        </FieldTitle>
        <FieldDescription>
          가격이 <MoneyText money={{ amount: 100 }} /> 아래로 떨어지면
          상폐됩니다.
        </FieldDescription>
        <FieldContent>
          <MarketInfo purchases={game?.purchases ?? []} />
        </FieldContent>
      </Field>
      <Field className="rounded-xl border bg-popover p-4">
        <FieldTitle className="text-xl font-semibold">
          <BriefcaseBusiness className="size-6 text-primary" />
          포트폴리오
        </FieldTitle>
        <FieldDescription>
          상장폐지된 종목은 자동으로 청산됩니다.
        </FieldDescription>
        <FieldContent>
          <PortfolioInfo positions={me?.positions ?? []} />
        </FieldContent>
      </Field>
      <Field className="rounded-xl border bg-popover p-4">
        <FieldTitle className="text-xl font-semibold">
          <Store className="size-6 text-primary" />
          상점
        </FieldTitle>
        <FieldDescription>아이템을 살 수 있습니다.</FieldDescription>
        <FieldContent>
          <ItemShop />
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
