import { JoinDialog, useJoinRoomMutation } from "@/features/room/joinRoom"
import { isApiError } from "@/shared/api/apiError"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router"
import { type Room } from "@/entities/room"
import { GameView } from "@/widgets/game"
import type { Game } from "@/entities/game"

export default function GamePage() {
  const { roomId } = useParams()
  if (!roomId) throw new Error("roomId is required")

  const [room, setRoom] = useState<Room | null>(null)
  const [game, setGame] = useState<Game>()
  const [isHost, setIsHost] = useState(false)

  const { mutate } = useJoinRoomMutation(roomId)
  const [joined, setJoined] = useState<boolean>(true)
  const [apiCode, setApiCode] = useState("")

  const onJoin = useCallback(
    (password: string) => {
      mutate(
        { password },
        {
          onSuccess: (data) => {
            setJoined(true)
            setApiCode("")
            setRoom(data.room)
            setGame(data.game)
            setIsHost(data.isHost)
          },
          onError: (err) => {
            if (!isApiError(err)) return
            setApiCode(err.apiCode)
            setJoined(false)
          },
        }
      )
    },
    [mutate]
  )

  useEffect(() => {
    onJoin("")
  }, [onJoin])

  return (
    <>
      <JoinDialog open={!joined} onJoin={onJoin} apiCode={apiCode} />

      {room && game && <GameView room={room} game={game} isHost={isHost} />}
    </>
  )
}
