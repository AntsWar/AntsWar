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
  MarketTable,
  type Purchase,
  type PurchaseType,
} from "@/entities/market"

export default function MarketSection() {
  const [selectedType, setSelectedType] = useState<PurchaseType>("stock")

  const filteredInstruments = useMemo(
    () => purchases.filter((purchase) => purchase.meta.type === selectedType),
    [selectedType]
  )
  return (
    <section className="flex flex-col gap-3">
      시장
      <div>
        <div className="flex flex-row justify-between">
          <Tabs
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as PurchaseType)}
          >
            <TabsList>
              <TabsTrigger value={"stock"}>주식보기</TabsTrigger>
              <TabsTrigger value={"crypto"}>코인보기</TabsTrigger>
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
        <MarketTable purchases={filteredInstruments} />
      </div>
    </section>
  )
}

const purchases = [
  // 주식 5개
  {
    meta: {
      id: 1,
      name: "삼성전자",
      type: "stock",
    },
    price: 72000,
  },
  {
    meta: {
      id: 1,
      name: "삼성전자",
      type: "stock",
    },
    price: 72000,
  },
  {
    meta: {
      id: 1,
      name: "삼성전자",
      type: "stock",
    },
    price: 72000,
  },
  {
    meta: {
      id: 1,
      name: "삼성전자",
      type: "stock",
    },
    price: 72000,
  },
  {
    meta: {
      id: 1,
      name: "삼성전자",
      type: "stock",
    },
    price: 72000,
  },
  {
    meta: {
      id: 1,
      name: "삼성전자",
      type: "stock",
    },
    price: 72000,
  },
  {
    meta: {
      id: 1,
      name: "삼성전자",
      type: "stock",
    },
    price: 72000,
  },
  {
    meta: {
      id: 1,
      name: "삼성전자",
      type: "stock",
    },
    price: 72000,
  },
] as Array<Purchase>

const quantities = ["1개", "100개", "전체"]
