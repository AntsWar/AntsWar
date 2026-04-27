import { PlayerTable, type Player } from "@/entities/player"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { useNavigate } from "react-router"

export default function FinishedOverlay(props: {
  open: boolean
  players: Array<Player>
}) {
  const { open, players } = props
  const sortedPlayers = [...players].sort(
    (a, b) => b.balance.amount - a.balance.amount
  )
  const navigate = useNavigate()

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            랭킹
          </DialogTitle>
        </DialogHeader>
        <PlayerTable players={sortedPlayers ?? []} />

        <Button variant={"outline"} onClick={() => navigate("/")}>
          나가기
        </Button>
      </DialogContent>
    </Dialog>
  )
}
