import { Button } from "@/shared/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { formatMoney } from "@/shared/lib/formatMoney"
import type { Purchase } from "../model/types"

export default function MarketTable(props: { purchases: Array<Purchase> }) {
  const { purchases } = props
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead className="text-center">현재가</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map((purchase) => (
          <PurchaseRow key={purchase.meta.id} purchase={purchase} />
        ))}
      </TableBody>
    </Table>
  )
}

function PurchaseRow({ purchase }: { purchase: Purchase }) {
  return (
    <TableRow>
      <TableCell>{purchase.meta.name}</TableCell>
      <TableCell className="text-center">
        {formatMoney(purchase.price)}
      </TableCell>
      <TableCell className="text-center">
        <Button className="w-full">매수</Button>
      </TableCell>
      <TableCell className="text-center">
        <Button className="w-full">매도</Button>
      </TableCell>
      <TableCell className="text-center">
        <Button className="w-full">공매도</Button>
      </TableCell>
    </TableRow>
  )
}
