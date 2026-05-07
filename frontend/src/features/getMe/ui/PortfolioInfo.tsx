import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useState } from "react"
import type { PurchaseType } from "@/entities/purchase"
import PortfolioTable from "./PortfolioTable"
import type { Position } from "@/entities/position"

type FilterType = "all" | PurchaseType

export default function PortfolioInfo(props: { positions: Array<Position> }) {
  const { positions } = props

  const [selectedType, setSelectedType] = useState<FilterType>("all")
  const filteredPositions =
    selectedType === "all"
      ? positions
      : positions.filter((position) => position.meta.type === selectedType)

  return (
    <>
      <Tabs
        value={selectedType}
        onValueChange={(value) => setSelectedType(value as FilterType)}
      >
        <TabsList>
          <TabsTrigger value={"all"}>전체</TabsTrigger>
          <TabsTrigger value={"STOCK"}>주식</TabsTrigger>
          <TabsTrigger value={"CRYPTO"}>코인</TabsTrigger>
        </TabsList>
      </Tabs>
      <PortfolioTable positions={filteredPositions} />
    </>
  )
}
