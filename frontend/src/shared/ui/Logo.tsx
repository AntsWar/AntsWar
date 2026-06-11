export function Logo() {
  return (
    <div className="flex flex-col items-center">
      <img className="max-w-1/2" src="/logo.png" />
      <div className="text-7xl font-black text-foreground">
        개미
        <span className="bg-linear-(--primary-gradient) bg-clip-text text-transparent">
          전쟁
        </span>
      </div>
    </div>
  )
}
