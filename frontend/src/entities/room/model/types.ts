export type Room = Readonly<{
  id: string
  name: string
  hasPassword: boolean
  mode: RoomMode
  occupancy: Occupancy
}>

export type Occupancy = {
  currentCount: number
  capacity: number
}

export type RoomMode = {
  type: RoomModeType
  target: number
}

export type RoomModeType = "TIME" | "MONEY"

export type RoomSpec = Readonly<{
  titleMaxLength: number
  passwordMaxLength: number
}>
