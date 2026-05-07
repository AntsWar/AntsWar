export function Logo() {
  return (
    <>
      <div className="flex flex-col items-center">
        <img className="max-w-1/2" src="/logo.png" />
        <div className="text-7xl font-black text-foreground">
          개미
          <span className="bg-linear-(--primary-gradient) bg-clip-text text-transparent">
            전쟁
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center">
          <span className="h-px w-10 bg-linear-to-r from-transparent to-secondary/70" />
          <span className="size-1 rotate-45 bg-secondary" />
        </div>

        <span className="text-sm text-muted-foreground">
          영웅호걸들의 투자전쟁
        </span>

        <div className="flex items-center">
          <span className="size-1 rotate-45 bg-secondary" />
          <span className="h-px w-10 bg-linear-to-l from-transparent to-secondary/70" />
        </div>
      </div>
    </>
  )
}
