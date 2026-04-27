import type { RoomSpec } from "../../../../entities/room/model/types"

export const roomSpec: RoomSpec = {
  titleMaxLength: 20,
  passwordMaxLength: 10,
}

export const TIME_OPTIONS = [300, 600, 1800, 3600] as Array<number>
export const MONEY_OPTIONS = [
  1_000_000, 10_000_000, 100_000_000,
] as Array<number>
