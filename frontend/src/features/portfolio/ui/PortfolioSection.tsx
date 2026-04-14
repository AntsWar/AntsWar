import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useState } from "react"
import { formatMoney } from "@/shared/lib/formatMoney"

type FilterType = "all" | "stock" | "crypto"

export default function PortfolioSection() {
  const [selectedType, setSelectedType] = useState<FilterType>("all")
  const filteredTrades =
    selectedType === "all"
      ? positions
      : positions.filter((position) => position.assetType === selectedType)

  return (
    <section className="flex flex-col gap-3">
      포트폴리오
      <div>
        <div className="flex flex-row justify-between">
          <Tabs
            value={selectedType}
            onValueChange={(value) =>
              setSelectedType(value as Position["assetType"])
            }
          >
            <TabsList>
              <TabsTrigger value={"all"}>전체보기</TabsTrigger>
              <TabsTrigger value={"stock"}>주식보기</TabsTrigger>
              <TabsTrigger value={"crypto"}>코인보기</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
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
            {filteredTrades.map((market) => (
              <PositionRow key={market.name} position={market} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

type Position = {
  name: string
  currentPrice: number
  averagePrice: number
  quantity: number
  assetType: "stock" | "crypto"
  positionType: "long" | "short"
}

function PositionRow({ position }: { position: Position }) {
  const assetType = position.assetType === "stock" ? "주식" : "코인"
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
      <TableCell className="text-center">{assetType}</TableCell>
      <TableCell className="text-center">{positionType}</TableCell>
    </TableRow>
  )
}

const positions = [
  {
    name: "삼성전자",
    assetType: "stock",
    positionType: "long",
    quantity: 5,
    currentPrice: 72000,
    averagePrice: 70000,
  },
  {
    name: "테슬라",
    assetType: "stock",
    positionType: "long",
    quantity: 1,
    currentPrice: 180000,
    averagePrice: 175000,
  },
  {
    name: "도지코인",
    assetType: "crypto",
    positionType: "long",
    quantity: 500,
    currentPrice: 150,
    averagePrice: 120,
  },
] as Array<Position>
