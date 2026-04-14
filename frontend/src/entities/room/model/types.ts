export type RoomSpec = Readonly<{
  titleMaxLength: number
  passwordMaxLength: number
}>

export type Room = Readonly<{
  id: number
  title: string
  currentCount: number
  capacity: number
  hasPassword: boolean
  mode: RoomMode
}>

export type RoomMode = TimeMode | MoneyMode

export type TimeMode = {
  name: "time"
  target: TimeValue
}

export type MoneyMode = {
  name: "money"
  target: MoneyValue
}

export type TimeValue = 5 | 10 | 30 | 60
export type MoneyValue = 100 | 1000 | 10000
