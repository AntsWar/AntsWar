import { Button } from "@/shared/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useMemo, useState } from "react"

export default function MarketSection() {
  const [selectedType, setSelectedType] = useState<Market["type"]>("주식")

  const filteredTrades = useMemo(
    () => markets.filter((market) => market.type === selectedType),
    [selectedType]
  )
  return (
    <section className="flex flex-col gap-3">
      시장
      <div>
        <div className="flex flex-row justify-between">
          <Tabs
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as Market["type"])}
          >
            <TabsList>
              <TabsTrigger value={"주식"}>주식보기</TabsTrigger>
              <TabsTrigger value={"코인"}>코인보기</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select>
            <SelectTrigger className="min-w-24">
              <SelectValue defaultValue={quantities[0]} placeholder="수량" />
            </SelectTrigger>
            <SelectContent className="min-w-0">
              {quantities.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead className="text-center">현재가</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrades.map((market) => (
              <MarketRow key={market.name} market={market} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

type Market = {
  name: string
  value: number
  type: "주식" | "코인"
}

function MarketRow({ market }: { market: Market }) {
  return (
    <TableRow>
      <TableCell>{market.name}</TableCell>
      <TableCell className="text-center">{market.value}</TableCell>
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

const markets = [
  // 주식 5개
  { name: "삼성전자", value: 72000, type: "주식" },
  { name: "애플", value: 210000, type: "주식" },
  { name: "테슬라", value: 180000, type: "주식" },
  { name: "엔비디아", value: 950000, type: "주식" },
  { name: "카카오", value: 55000, type: "주식" },

  // 코인 5개
  { name: "비트코인", value: 950000, type: "코인" },
  { name: "이더리움", value: 4500000, type: "코인" },
  { name: "솔라나", value: 180000, type: "코인" },
  { name: "리플", value: 900, type: "코인" },
  { name: "도지코인", value: 150, type: "코인" },
] as Array<Market>

const quantities = ["1개", "100개", "전체"]
