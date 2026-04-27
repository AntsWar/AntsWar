import { Dialog, DialogContent } from "@/shared/ui/dialog"
import JoinForm from "./JoinForm"
import BlockForm from "./BlockForm"

export default function JoinDialog(props: {
  roomId: string
  open: boolean
  apiCode: string
}) {
  const { roomId, open, apiCode } = props

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        {apiCode === "GAME_INVALID_PASSWORD" ||
        apiCode === "GAME_REQUIRE_PASSWORD" ? (
          <JoinForm roomId={roomId} apiCode={apiCode} />
        ) : (
          <BlockForm apiCode={apiCode} />
        )}
      </DialogContent>
    </Dialog>
  )
}
