import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useState } from "react"
import { PortfolioTable, type Position } from "@/entities/portfolio"
import type { InstrumentType } from "@/entities/market"

type FilterType = "all" | InstrumentType

export default function PortfolioSection() {
  const [selectedType, setSelectedType] = useState<FilterType>("all")
  const filteredPositions =
    selectedType === "all"
      ? positions
      : positions.filter((position) => position.instrumentType === selectedType)

  return (
    <section className="flex flex-col gap-3">
      포트폴리오
      <div>
        <div className="flex flex-row justify-between">
          <Tabs
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as FilterType)}
          >
            <TabsList>
              <TabsTrigger value={"all"}>전체보기</TabsTrigger>
              <TabsTrigger value={"stock"}>주식보기</TabsTrigger>
              <TabsTrigger value={"crypto"}>코인보기</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <PortfolioTable positions={filteredPositions} />
      </div>
    </section>
  )
}

const positions = [
  {
    name: "삼성전자",
    instrumentType: "stock",
    positionType: "long",
    quantity: 5,
    currentPrice: 72000,
    averagePrice: 70000,
  },
  {
    name: "테슬라",
    instrumentType: "stock",
    positionType: "long",
    quantity: 1,
    currentPrice: 180000,
    averagePrice: 175000,
  },
  {
    name: "도지코인",
    instrumentType: "crypto",
    positionType: "long",
    quantity: 500,
    currentPrice: 150,
    averagePrice: 120,
  },
] as Array<Position>
