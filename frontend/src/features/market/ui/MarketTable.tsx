import { Button } from "@/shared/ui/button2"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { MoneyText } from "@/shared/model/Money"
import { useStockStore, type Purchase } from "@/entities/purchase"

export default function MarketTable({
  purchases,
  purchaseType,
}: {
  purchases: Array<Purchase>
  purchaseType: string
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">이름</TableHead>
          <TableHead>현재가</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases &&
          purchases.map((purchase) => (
            <PurchaseRow
              key={purchase.meta.code}
              purchase={purchase}
              hidden={purchase.meta.type !== purchaseType}
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
  const selectStock = useStockStore((state) => state.selectStock)

  return (
    <TableRow className={hidden ? "hidden" : ""}>
      <TableCell>{purchase.meta.name}</TableCell>
      <TableCell>
        <MoneyText money={purchase.price} />
      </TableCell>
      <TableCell className="text-end">
        <Button onClick={() => selectStock(purchase.meta.code)}>보기</Button>
      </TableCell>
    </TableRow>
  )
}
