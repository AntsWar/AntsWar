import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import type { Position } from "@/entities/position/model/types"
import { Money } from "@/shared/model/Money"

export default function PortfolioTable(props: { positions: Array<Position> }) {
  const { positions } = props
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
        {positions.map((position) => (
          <PositionRow
            key={position.meta.code + position.type}
            position={position}
          />
        ))}
      </TableBody>
    </Table>
  )
}

function PositionRow({ position }: { position: Position }) {
  const instrumentType = position.meta.type === "STOCK" ? "주식" : "코인"
  const positionType = position.type === "LONG" ? "매수" : "공매도"

  return (
    <TableRow>
      <TableCell>{position.meta.name}</TableCell>
      <TableCell className="text-center">
        <Money money={position.averagePrice} />
      </TableCell>
      <TableCell className="text-center">{position.quantity}</TableCell>
      <TableCell className="text-center">{instrumentType}</TableCell>
      <TableCell className="text-center">{positionType}</TableCell>
    </TableRow>
  )
}
