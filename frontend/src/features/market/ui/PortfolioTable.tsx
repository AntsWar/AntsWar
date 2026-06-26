import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { MoneyText } from "@/shared/model/Money"
import type { Position } from "@/entities/position"
import type { PurchaseType } from "@/entities/purchase"
import { toast } from "sonner"
import { useSellPurchaseMutation } from "../model/useSellPurchaseMutation"
import type { SellPurchaseRequest } from "../api/sellPurchase"
import { cn } from "@/shared/ui/lib"
import { TradeButton } from "@/shared/ui/tradeButton"

export default function PortfolioTable({
  positions,
  purchaseType,
}: {
  positions: Array<Position>
  purchaseType: PurchaseType
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">이름</TableHead>
          <TableHead>평단가</TableHead>
          <TableHead>수량</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions && positions.length > 0 ? (
          positions.map((position) => (
            <PositionRow
              key={position.meta.code + position.type}
              position={position}
              hidden={
                purchaseType !== "ALL" &&
                purchaseType !== position.purchase?.meta.type
              }
            />
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              보유한 포지션이 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

function PositionRow({
  position,
  hidden,
}: {
  position: Position
  hidden: boolean
}) {
  const sellType = position.type === "LONG" ? "매도" : "상환"

  const { mutate, isPending } = useSellPurchaseMutation()

  const submitOrder = (quantity: number) => {
    if (position.quantity < quantity) {
      toast("가진 수량보다 많습니다.")
      return
    }

    mutate({
      positionId: position.id,
      quantity: quantity,
    } as SellPurchaseRequest)
  }

  return (
    <TableRow className={hidden ? "hidden" : ""}>
      <TableCell>{position.meta.name}</TableCell>
      <TableCell>
        <div className="flex gap-1">
          <MoneyText money={position.averagePrice} />
          <span
            className={cn(
              position.profit!.amount >= 0 ? "text-stock-up" : "text-stock-down"
            )}
          >
            (
            <MoneyText money={position.profit} />)
          </span>
        </div>
      </TableCell>
      <TableCell>{position.quantity}</TableCell>
      <TableCell className="flex justify-end text-end">
        <TradeButton
          containerClassName={cn(
            sellType === "매도" ? "bg-stock-up" : "bg-stock-down"
          )}
          label={sellType}
          onClick={(quantity) => {
            submitOrder(quantity)
          }}
          disabled={isPending}
        />
      </TableCell>
    </TableRow>
  )
}
