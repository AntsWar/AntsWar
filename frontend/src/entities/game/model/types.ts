import type { Item } from "@/entities/item"
import type { Player } from "@/entities/player/@x/game"
import type { Purchase } from "@/entities/purchase/@x/game"

export type Game = Readonly<{
  id: number
  meta: GameMeta
  players: Array<Player>
  purchases: Array<Purchase>
  items: Array<Item>
  serverTime: string
}>

export type GameMeta = {
  startedAt: string
  endedAt: string
}
