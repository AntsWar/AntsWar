export type GameSpec = Readonly<{
  titleMaxLength: number
  passwordMaxLength: number
}>

export type Game = Readonly<{
  id: string
  name: string
  hasPassword: boolean
  occupancy: Occupancy
  mode: GameMode
}>

export type Occupancy = {
  currentCount: number
  capacity: number
}

export type GameMode = TimeMode | MoneyMode

export type TimeMode = {
  type: "TIME"
  target: TimeValue
}

export type MoneyMode = {
  type: "MONEY"
  target: MoneyValue
}

export type TimeValue = 5 | 10 | 30 | 60
export type MoneyValue = 100 | 1000 | 10000
