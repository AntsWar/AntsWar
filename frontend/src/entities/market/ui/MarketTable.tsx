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
import type { Instrument } from "../model/types"

export default function MarketTable(props: { instruments: Array<Instrument> }) {
  const { instruments } = props
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead className="text-center">현재가</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {instruments.map((instrument) => (
          <InstrumentRow key={instrument.name} instrument={instrument} />
        ))}
      </TableBody>
    </Table>
  )
}

function InstrumentRow({ instrument }: { instrument: Instrument }) {
  return (
    <TableRow>
      <TableCell>{instrument.name}</TableCell>
      <TableCell className="text-center">
        {formatMoney(instrument.value)}
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
