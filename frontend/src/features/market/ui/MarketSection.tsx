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
  type Instrument,
  type InstrumentType,
} from "@/entities/market"

export default function MarketSection() {
  const [selectedType, setSelectedType] = useState<InstrumentType>("stock")

  const filteredInstruments = useMemo(
    () => instruments.filter((instrument) => instrument.type === selectedType),
    [selectedType]
  )
  return (
    <section className="flex flex-col gap-3">
      시장
      <div>
        <div className="flex flex-row justify-between">
          <Tabs
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as InstrumentType)}
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
        <MarketTable instruments={filteredInstruments} />
      </div>
    </section>
  )
}

const instruments = [
  // 주식 5개
  { name: "삼성전자", value: 72000, type: "stock" },
  { name: "애플", value: 210000, type: "stock" },
  { name: "테슬라", value: 180000, type: "stock" },
  { name: "엔비디아", value: 950000, type: "stock" },
  { name: "카카오", value: 55000, type: "stock" },

  // 코인 5개
  { name: "비트코인", value: 950000, type: "crypto" },
  { name: "이더리움", value: 4500000, type: "crypto" },
  { name: "솔라나", value: 180000, type: "crypto" },
  { name: "리플", value: 900, type: "crypto" },
  { name: "도지코인", value: 150, type: "crypto" },
] as Array<Instrument>

const quantities = ["1개", "100개", "전체"]
