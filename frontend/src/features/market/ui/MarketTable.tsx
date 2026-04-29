import { Button } from "@/shared/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Money } from "@/shared/model/Money"
import { useParams } from "react-router"
import type { Purchase, TradeQuantity } from "@/entities/purchase"
import { type OrderRequest } from "../api/order"
import { useOrderMutation } from "../api/useOrderMutation"
import { useMeQuery } from "@/features/getMe"
import { toast } from "sonner"

export default function MarketTable(props: {
  purchases: Array<Purchase>
  quantity: TradeQuantity
}) {
  const { roomId } = useParams()
  const { purchases, quantity } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead className="text-center">현재가</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases && purchases.length > 0 ? (
          purchases.map((purchase) => (
            <PurchaseRow
              key={purchase.meta.code}
              purchase={purchase}
              gameId={roomId!}
              quantity={quantity}
            />
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={2}
              className="text-center text-muted-foreground"
            >
              남은 종목이 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

function PurchaseRow(props: {
  purchase: Purchase
  gameId: string
  quantity: TradeQuantity
}) {
  const { purchase, gameId, quantity } = props
  const { mutate, isPending } = useOrderMutation(gameId)

  // 같은 feature라 원래 안됨. 고칠 필요 있음
  const { data: me } = useMeQuery(gameId)

  const submitOrder = (
    orderType: OrderRequest["orderType"],
    positionType: OrderRequest["positionType"]
  ) => {
    let qty = 0
    if (orderType === "BUY") {
      qty =
        quantity === "ALL"
          ? Math.floor(
              (me?.player.balance?.amount ?? 0) / purchase.price.amount
            )
          : quantity
    } else {
      qty =
        quantity === "ALL"
          ? (me?.positions.find(
              (pos) =>
                pos.meta.code === purchase.meta.code &&
                pos.type === positionType
            )?.quantity ?? 0)
          : quantity
    }

    if (!qty || qty <= 0) {
      toast("수량이 없습니다")
      return
    }

    mutate({
      orderType,
      meta: purchase.meta.code,
      positionType,
      quantity: qty,
    } as OrderRequest)
  }

  return (
    <TableRow>
      <TableCell>{purchase.meta.name}</TableCell>
      <TableCell className="text-center">
        <Money money={purchase.price} />
      </TableCell>
      <TableCell className="text-center">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => submitOrder("BUY", "LONG")}
          disabled={isPending}
        >
          매수
        </Button>
      </TableCell>
      <TableCell className="text-center">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => submitOrder("SELL", "LONG")}
          disabled={isPending}
        >
          매도
        </Button>
      </TableCell>
      <TableCell className="text-center">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => submitOrder("BUY", "SHORT")}
          disabled={isPending}
        >
          공매도
        </Button>
      </TableCell>
      <TableCell className="text-center">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => submitOrder("SELL", "SHORT")}
          disabled={isPending}
        >
          상환
        </Button>
      </TableCell>
    </TableRow>
  )
}
