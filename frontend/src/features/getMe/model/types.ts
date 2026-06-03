import type { Player } from "@/entities/player"
import type { Position } from "@/entities/position"

export type Me = {
  player: Player
  positions: Array<Position>
}
