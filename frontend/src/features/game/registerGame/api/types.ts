import type { GameMode } from "@/entities/game"

export type RegisterGameRequest = {
  name: string
  password: string
  capacity: number
  mode: GameMode
}
