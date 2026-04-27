import type { Game } from "@/entities/game"
import type { Room } from "@/entities/room"

export type JoinRoomRequest = {
  password?: string
}

export type JoinRoomResponse = {
  room: Room
  game: Game
  isHost: boolean
}
