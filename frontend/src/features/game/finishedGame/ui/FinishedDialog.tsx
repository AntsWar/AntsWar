import { useGame } from "@/entities/game"
import { PlayerTable } from "@/entities/player"
import { useMeQuery } from "@/features/getMe"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"

export default function FinishedDialog() {
  const { game, finished } = useGame()
  const { data: me } = useMeQuery()
  const players = game?.players ?? []

  const sortedPlayers = [...players].sort(
    (a, b) => b.balance.amount - a.balance.amount
  )

  return (
    <Dialog open={finished}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            랭킹
          </DialogTitle>
        </DialogHeader>
        <PlayerTable players={sortedPlayers ?? []} me={me?.player} />

        <DialogFooter>
          <Button variant={"outline"} onClick={() => window.location.reload()}>
            나가기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
