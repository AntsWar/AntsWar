import { PlayerTable, type Player } from "@/entities/player"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
export default function FinishedDialog(props: {
  open: boolean
  players: Array<Player>
}) {
  const { open, players } = props
  const sortedPlayers = [...players].sort(
    (a, b) => b.balance.amount - a.balance.amount
  )
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            랭킹
          </DialogTitle>
        </DialogHeader>
        <PlayerTable players={sortedPlayers ?? []} />

        <DialogFooter>
          <Button variant={"outline"} onClick={() => window.location.reload()}>
            나가기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
