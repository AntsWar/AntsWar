import { Button } from "@/shared/ui/button"
import { startGame } from "../api/startGame"

export default function StartGameButton({
  gameId,
  ...props
}: React.ComponentProps<"button"> & { gameId: string }) {
  return (
    <Button {...props} onClick={() => startGame(gameId)}>
      게임시작
    </Button>
  )
}
