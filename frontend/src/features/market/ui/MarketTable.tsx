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
import type { Purchase, TradeQuantity } from "@/entities/purchase"
import { type Me } from "@/features/getMe"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { qk } from "@/shared/quries/keys"
import { useState } from "react"
import { useBuyPurchaseMutation } from "../model/useBuyPurchaseMutation"
import type { BuyPurchaseRequest } from "../api/buyPurchase"
import { QuantitySelect } from "./QuantitySelect"

export default function MarketTable({
  purchases,
}: {
  purchases: Array<Purchase>
}) {
  return (
    <Table>
      <TableHeader>
        <TableHead>이름</TableHead>
        <TableHead className="text-center">현재가</TableHead>
      </TableHeader>
      <TableBody>
        {purchases &&
          purchases.map((purchase) => (
            <PurchaseRow key={purchase.meta.code} purchase={purchase} />
          ))}
      </TableBody>
    </Table>
  )
}

function PurchaseRow({ purchase }: { purchase: Purchase }) {
  const { mutate, isPending } = useBuyPurchaseMutation()
  const queryClient = useQueryClient()

  const [quantity, setQuantity] = useState<TradeQuantity>(1)

  const submitOrder = (positionType: BuyPurchaseRequest["positionType"]) => {
    const me = queryClient.getQueryData<Me>(qk.getMe())

    const qty =
      quantity === "ALL"
        ? Math.floor((me?.player.balance?.amount ?? 0) / purchase.price.amount)
        : quantity

    if (!qty || qty <= 0) {
      toast("수량이 없습니다")
      return
    }

    mutate({
      purchaseId: purchase.id,
      positionType,
      quantity: qty,
    } as BuyPurchaseRequest)
  }

  return (
    <TableRow>
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
