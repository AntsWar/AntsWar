import type { Player } from "@/entities/player"
import type { Position } from "@/entities/position"
import type { Money } from "@/shared/model/Money"

export type Me = {
  player: Player
  positions: Array<Position>
}

export type Score = {
  score: Money
}
