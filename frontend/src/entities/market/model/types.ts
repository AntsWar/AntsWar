import type { Money } from "@/shared/model/money"

export type Instrument = {
  name: string
  value: Money
  type: InstrumentType
}

export type InstrumentType = "stock" | "crypto"
