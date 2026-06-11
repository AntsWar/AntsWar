import { Button } from "@/shared/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { MoneyText } from "@/shared/model/Money"
import type { Purchase, PurchaseType, TradeQuantity } from "@/entities/purchase"
import { type Me } from "@/features/getMe"
import { useQueryClient } from "@tanstack/react-query"
import { qk } from "@/shared/quries/keys"
import { useState } from "react"
import {
  useBuyPurchaseMutation,
  type BuyPurchaseVariable,
} from "../model/useBuyPurchaseMutation"
import type { BuyPurchaseRequest } from "../api/buyPurchase"
import { QuantitySelect } from "./QuantitySelect"

export default function MarketTable({
  purchases,
  purchaseType,
}: {
  purchases: Array<Purchase>
  purchaseType: PurchaseType
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead className="text-center">현재가</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases &&
          purchases.map((purchase) => (
            <PurchaseRow
              key={purchase.meta.code}
              purchase={purchase}
              hidden={purchase.meta.type === purchaseType}
            />
          ))}
      </TableBody>
    </Table>
  )
}

function PurchaseRow({
  purchase,
  hidden,
}: {
  purchase: Purchase
  hidden: boolean
}) {
  const { mutate, isPending } = useBuyPurchaseMutation()
  const queryClient = useQueryClient()

  const [quantity, setQuantity] = useState<TradeQuantity>(1)

  const submitOrder = (positionType: BuyPurchaseRequest["positionType"]) => {
    const me = queryClient.getQueryData<Me>(qk.getMe())

    const qty =
      quantity === "ALL"
        ? Math.floor((me?.player.balance?.amount ?? 0) / purchase.price.amount)
        : quantity

    mutate({
      purchase: purchase,
      positionType: positionType,
      quantity: qty,
    } as BuyPurchaseVariable)
  }

  return (
    <TableRow className={hidden ? "hidden" : ""}>
      <TableCell>{purchase.meta.name}</TableCell>
      <TableCell className="text-center">
        <MoneyText money={purchase.price} />
      </TableCell>
      <TableCell className="flex justify-end">
        <QuantitySelect value={quantity} onValueChange={setQuantity} />
      </TableCell>
      <TableCell className="text-center">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => submitOrder("LONG")}
          disabled={isPending}
        >
          매수
        </Button>
      </TableCell>
      <TableCell className="text-center">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => submitOrder("SHORT")}
          disabled={isPending}
        >
          공매도
        </Button>
      </TableCell>
    </TableRow>
  )
}
