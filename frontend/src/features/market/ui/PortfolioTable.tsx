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
import type { PurchaseType, TradeQuantity } from "@/entities/purchase"
import { Button } from "@/shared/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { QuantitySelect } from "./QuantitySelect"
import { useSellPurchaseMutation } from "../model/useSellPurchaseMutation"
import type { SellPurchaseRequest } from "../api/sellPurchase"
import { cn } from "@/shared/ui/lib"

export default function PortfolioTable({
  positions,
  purchaseType,
}: {
  positions: Array<Position>
  purchaseType: PurchaseType | "all"
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead className="text-center">평단가</TableHead>
          <TableHead className="text-center">수량</TableHead>
          <TableHead className="text-center">자산 종류</TableHead>
          <TableHead className="text-center">거래 유형</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions && positions.length > 0 ? (
          positions.map((position) => (
            <PositionRow
              key={position.meta.code + position.type}
              position={position}
              hidden={purchaseType === position.purchase?.meta.type}
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
  const [quantity, setQuantity] = useState<TradeQuantity>(1)
  const instrumentType = position.meta.type === "STOCK" ? "주식" : "코인"
  const positionType = position.type === "LONG" ? "매수" : "공매도"
  const sellType = position.type === "LONG" ? "매도" : "상환"

  const { mutate, isPending } = useSellPurchaseMutation()

  const submitOrder = () => {
    const qty = quantity === "ALL" ? (position.quantity ?? 0) : quantity

    if (!qty || qty <= 0) {
      toast("수량이 없습니다")
      return
    }

    mutate({
      positionId: position.id,
      quantity: qty,
    } as SellPurchaseRequest)
  }

  return (
    <TableRow className={hidden ? "hidden" : ""}>
      <TableCell>{position.meta.name}</TableCell>
      <TableCell className="flex justify-center gap-1">
        <MoneyText money={position.averagePrice} />

        <span
          className={cn(
            position.profit!.amount >= 0 ? "text-red-400" : "text-blue-400"
          )}
        >
          (
          <MoneyText money={position.profit} />)
        </span>
      </TableCell>
      <TableCell className="text-center">{position.quantity}</TableCell>
      <TableCell className="text-center">{instrumentType}</TableCell>
      <TableCell className="text-center">{positionType}</TableCell>
      <TableCell className="flex justify-end">
        <QuantitySelect value={quantity} onValueChange={setQuantity} />
      </TableCell>
      <TableCell className="text-center">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => submitOrder()}
          disabled={isPending}
        >
          {sellType}
        </Button>
      </TableCell>
    </TableRow>
  )
}
