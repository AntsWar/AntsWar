export function Logo() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <img className="" src="/logo.png" />
        <div className="text-6xl font-extrabold">개미 전쟁</div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center">
          <span className="h-px w-10 bg-linear-to-r from-transparent to-secondary/70" />
          <span className="size-1 rotate-45 bg-secondary" />
        </div>

        <span>영웅호걸들의 투자전쟁</span>

        <div className="flex items-center">
          <span className="size-1 rotate-45 bg-secondary" />
          <span className="h-px w-10 bg-linear-to-l from-transparent to-secondary/70" />
        </div>
      </div>
    </div>
  )
}
