import { BriefcaseBusiness, Gift } from "lucide-react"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldTitle,
} from "@/shared/ui/field"
import { Money } from "@/shared/model/Money"
import { PlayerTable, type Player } from "@/entities/player"
import type { Position } from "@/entities/position"
import type { Purchase } from "@/entities/purchase"
import { TapToEarnButton } from "@/features/earn/earnByClick"
import { MarketInfo } from "@/features/market"
import { PortfolioInfo } from "@/features/getMe"
import MarketIcon from "@/assets/icon/chart_icon.svg?react"

export default function GameSection(props: {
  players: Array<Player>
  purchases: Array<Purchase>
  positions: Array<Position>
}) {
  const { players, purchases, positions } = props
  return (
    <FieldGroup>
      <Field className="rounded-xl border bg-popover p-4">
        <FieldContent>
          <PlayerTable players={players} />
        </FieldContent>
      </Field>
      <Field className="w-full rounded-xl border bg-popover p-4">
        <FieldTitle className="text-xl font-semibold">
          <MarketIcon className="size-8 text-primary" />
          시장
        </FieldTitle>
        <FieldDescription>
          가격이 <Money money={{ amount: 100 }} /> 아래로 떨어지면 상폐됩니다.
        </FieldDescription>
        <FieldContent>
          <MarketInfo purchases={purchases} />
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
          <PortfolioInfo positions={positions} />
        </FieldContent>
      </Field>
      <Field className="rounded-xl border bg-popover p-4">
        <FieldTitle className="text-xl font-semibold">
          <Gift className="size-6 text-primary" />
          시드벌기
        </FieldTitle>
        <FieldDescription>
          돈이 모자라면 여기서 버실 수 있습니다.
        </FieldDescription>
        <FieldContent>
          <TapToEarnButton />
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
