import { Dialog, DialogContent } from "@/shared/ui/dialog"
import JoinForm from "./JoinForm"
import BlockForm from "./BlockForm"

export default function JoinDialog(props: {
  open: boolean
  onJoin: (password: string) => void
  apiCode: string
}) {
  const { open, onJoin, apiCode } = props

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        {apiCode === "ROOM_INVALID_PASSWORD" ||
        apiCode === "ROOM_REQUIRE_PASSWORD" ? (
          <JoinForm onJoin={onJoin} apiCode={apiCode} />
        ) : (
          <BlockForm apiCode={apiCode} />
        )}
      </DialogContent>
    </Dialog>
  )
}
