export function DisabledOverlay({
  disabled,
  message,
  children,
}: {
  disabled: boolean
  message?: string
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      {children}
      {disabled && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-background/60 backdrop-blur-xs">
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  )
}
