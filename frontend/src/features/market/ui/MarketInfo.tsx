import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useState } from "react"
import { type Purchase } from "@/entities/purchase"
import MarketTable from "./MarketTable"

export default function MarketInfo(props: { purchases: Array<Purchase> }) {
  const { purchases } = props
  const [selectedType, setSelectedType] = useState<string>("IT")

  return (
    <div>
      <div className="flex flex-row justify-between">
        <PurchaseTypeTabs
          value={selectedType}
          onValueChange={setSelectedType}
        />
      </div>
      <MarketTable purchases={purchases} purchaseType={selectedType} />
    </div>
  )
}

function PurchaseTypeTabs(props: {
  value: string
  onValueChange: (value: string) => void
}) {
  const { value, onValueChange } = props
  return (
    <Tabs
      value={value}
      onValueChange={(value) => onValueChange(value as string)}
    >
      <TabsList>
        <TabsTrigger value={"IT"}>IT</TabsTrigger>
        <TabsTrigger value={"CRYPTO"}>코인</TabsTrigger>
        <TabsTrigger value={"CAR"}>차</TabsTrigger>
        <TabsTrigger value={"AIRPORT"}>항공</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
