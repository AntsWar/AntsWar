import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { formatMoney } from "@/shared/lib/formatMoney"
import type { Position } from "../model/types"

export default function PortfolioTable(props: { positions: Array<Position> }) {
  const { positions } = props
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead className="text-center">현재가</TableHead>
          <TableHead className="text-center">평단가</TableHead>
          <TableHead className="text-center">수량</TableHead>
          <TableHead className="text-center">자산 종류</TableHead>
          <TableHead className="text-center">거래 유형</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((position) => (
          <PositionRow key={position.name} position={position} />
        ))}
      </TableBody>
    </Table>
  )
}

function PositionRow({ position }: { position: Position }) {
  const instrumentType = position.instrumentType === "stock" ? "주식" : "코인"
  const positionType = position.positionType === "long" ? "매수" : "공매도"

  return (
    <TableRow>
      <TableCell>{position.name}</TableCell>
      <TableCell className="text-center">
        {formatMoney(position.currentPrice)}
      </TableCell>
      <TableCell className="text-center">
        {formatMoney(position.averagePrice)}
      </TableCell>
      <TableCell className="text-center">{position.quantity}</TableCell>
      <TableCell className="text-center">{instrumentType}</TableCell>
      <TableCell className="text-center">{positionType}</TableCell>
    </TableRow>
  )
}
