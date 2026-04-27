import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useState } from "react"
import { PortfolioTable, type Position } from "@/entities/position"
import type { PurchaseType } from "@/entities/purchase"

type FilterType = "all" | PurchaseType

export default function PortfolioSection(props: {
  positions: Array<Position>
}) {
  const { positions } = props

  const [selectedType, setSelectedType] = useState<FilterType>("all")
  const filteredPositions =
    selectedType === "all"
      ? positions
      : positions.filter((position) => position.meta.type === selectedType)

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
              <TabsTrigger value={"STOCK"}>주식보기</TabsTrigger>
              <TabsTrigger value={"CRYPTO"}>코인보기</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <PortfolioTable positions={filteredPositions} />
      </div>
    </section>
  )
}
