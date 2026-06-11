import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useState } from "react"
import { type Purchase, type PurchaseType } from "@/entities/purchase"
import MarketTable from "./MarketTable"

export default function MarketInfo(props: { purchases: Array<Purchase> }) {
  const { purchases } = props
  const [selectedType, setSelectedType] = useState<PurchaseType>("STOCK")

  return (
    <>
      <div className="flex flex-row justify-between">
        <PurchaseTypeTabs
          value={selectedType}
          onValueChange={setSelectedType}
        />
      </div>
      <MarketTable purchases={purchases} purchaseType={selectedType} />
    </>
  )
}

function PurchaseTypeTabs(props: {
  value: PurchaseType
  onValueChange: (value: PurchaseType) => void
}) {
  const { value, onValueChange } = props
  return (
    <Tabs
      value={value}
      onValueChange={(value) => onValueChange(value as PurchaseType)}
    >
      <TabsList>
        <TabsTrigger value={"STOCK"}>주식</TabsTrigger>
        <TabsTrigger value={"CRYPTO"}>코인</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
