import type { Player } from "@/entities/player/@x/game"
import type { Purchase } from "@/entities/purchase/@x/game"

export type Game = Readonly<{
  meta: GameMeta
  players: Array<Player>
  purchases: Array<Purchase>
  serverTime: string
}>

export type GameMeta = {
  status: GameStatus
  startedAt: string
}

export type GameStatus = "WAITING" | "READY" | "RUNNING" | "FINISHED"
