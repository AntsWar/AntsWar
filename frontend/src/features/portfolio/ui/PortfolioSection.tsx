import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useState } from "react"
import { PortfolioTable, type Position } from "@/entities/portfolio"
import type { PurchaseType } from "@/entities/market"

type FilterType = "all" | PurchaseType

export default function PortfolioSection() {
  const [selectedType, setSelectedType] = useState<FilterType>("all")
  const filteredPositions =
    selectedType === "all"
      ? longPositions
      : longPositions.filter((position) => position.meta.type === selectedType)

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

const longPositions = [
  {
    meta: {
      id: 1,
      name: "삼성전자",
      type: "stock",
    },
    type: "long",
    quantity: 5,
    averagePrice: 70000,
  },
  {
    meta: {
      id: 2,
      name: "테슬라",
      type: "stock",
    },
    type: "long",
    quantity: 5,
    averagePrice: 70000,
  },
  {
    meta: {
      id: 3,
      name: "도지",
      type: "crypto",
    },
    type: "long",
    quantity: 5,
    averagePrice: 70000,
  },
] as Array<Position>
