import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { useState } from "react"
import { useJoinGameMutation } from "../api/useJoinGameMutation"
import type { Game } from "@/entities/game"

export default function JoinDialog(props: {
  open: boolean
  setGame: (game: Game) => void
}) {
  const { open, setGame } = props
  const [name, setName] = useState<string>("작은 개미")
  const { mutate, isPending } = useJoinGameMutation()

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <Button
          onClick={() => {
            console.log(name)
            mutate(name, {
              onSuccess: (data) => {
                setGame(data.game)
              },
            })
          }}
          disabled={isPending}
        >
          입장
        </Button>
      </DialogContent>
    </Dialog>
  )
}
