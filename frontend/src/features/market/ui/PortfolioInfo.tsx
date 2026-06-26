import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useState } from "react"
import type { Purchase, PurchaseType } from "@/entities/purchase"
import PortfolioTable from "./PortfolioTable"
import type { Position } from "@/entities/position"

export default function PortfolioInfo({
  positions,
  purchases,
}: {
  positions: Array<Position>
  purchases: Array<Purchase>
}) {
  const positionsWithProfit: Array<Position> = positions.map((position) => {
    const purchase = purchases.find(
      (purchase) => purchase.meta.code === position.meta.code
    )
    position.purchase = purchase

    const currentPrice = purchase?.price.amount ?? 0

    const profitAmount =
      position.type === "LONG"
        ? currentPrice - position.averagePrice.amount
        : position.averagePrice.amount - currentPrice

    return {
      ...position,
      profit: {
        amount: profitAmount,
        currency: position.averagePrice.currency,
      },
    }
  })

  const [selectedType, setSelectedType] = useState<PurchaseType>("ALL")

  return (
    <div>
      <Tabs
        value={selectedType}
        onValueChange={(value) => setSelectedType(value as PurchaseType)}
      >
        <TabsList>
          <TabsTrigger value={"ALL"}>전체</TabsTrigger>
          <TabsTrigger value={"STOCK"}>주식</TabsTrigger>
          <TabsTrigger value={"CRYPTO"}>코인</TabsTrigger>
        </TabsList>
      </Tabs>
      <PortfolioTable
        positions={positionsWithProfit}
        purchaseType={selectedType}
      />
    </div>
  )
}
