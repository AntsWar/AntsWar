export default function StartGameOverlay(props: { open: boolean }) {
  const { open } = props

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="flex flex-col gap-3 text-center">
        <div className="text-5xl font-extrabold">영웅호걸들의 시간이다!!</div>
        <div className="text-white/70">서버와 싱크를 맞추는 중...</div>
      </div>
    </div>
  )
}
