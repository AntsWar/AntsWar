import type { Money } from "@/shared/model/Money"
import type { Position } from "@/entities/position/@x/player"

export type Player = {
  id: number
  name: string
  balance: Money
  asset: Money
}

export type Me = {
  player: Player
  positions: Array<Position>
}
