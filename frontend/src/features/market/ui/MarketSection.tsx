import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useMemo, useState } from "react"
import {
  type Purchase,
  type PurchaseType,
  type TradeQuantity,
} from "@/entities/purchase"
import MarketTable from "./MarketTable"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/shared/ui/field"
import { Money } from "@/shared/model/Money"

export default function MarketSection(props: { purchases: Array<Purchase> }) {
  const { purchases } = props
  const [selectedType, setSelectedType] = useState<PurchaseType>("STOCK")
  const [selectedQuantity, setSelectedQuantity] = useState<TradeQuantity>(1)

  const filteredInstruments = useMemo(
    () =>
      (purchases ?? []).filter(
        (purchase) => purchase.meta.type === selectedType
      ),
    [purchases, selectedType]
  )

  return (
    <Field>
      <FieldTitle className="text-lg font-semibold">시장</FieldTitle>
      <FieldDescription>
        가격이 <Money money={{ amount: 100 }} /> 아래로 떨어지면 상폐됩니다.
      </FieldDescription>
      <FieldContent>
        <div className="flex flex-row justify-between">
          <PurchaseTypeTabs
            value={selectedType}
            onValueChange={setSelectedType}
          />
          <QuantitySelect
            value={selectedQuantity}
            onValueChange={setSelectedQuantity}
          />
        </div>
        <MarketTable
          purchases={filteredInstruments}
          quantity={selectedQuantity}
        />
      </FieldContent>
    </Field>
  )
}

function QuantitySelect(props: {
  value: TradeQuantity
  onValueChange: (quantity: TradeQuantity) => void
}) {
  const { value, onValueChange } = props

  const quantityOptions: Array<{ label: string; value: TradeQuantity }> = [
    { label: "1개", value: 1 },
    { label: "100개", value: 100 },
    { label: "전체", value: "ALL" },
  ]

  return (
    <Select
      value={String(value)}
      onValueChange={(value) =>
        onValueChange(value === "ALL" ? "ALL" : (Number(value) as 1 | 100))
      }
    >
      <SelectTrigger className="min-w-24">
        <SelectValue placeholder="수량" />
      </SelectTrigger>

      <SelectContent className="min-w-0">
        {quantityOptions.map((option) => (
          <SelectItem key={String(option.value)} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
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
        <TabsTrigger value={"STOCK"}>주식보기</TabsTrigger>
        <TabsTrigger value={"CRYPTO"}>코인보기</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
