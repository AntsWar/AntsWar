import { Outlet } from "react-router"

export default function CenterLayout() {
  return (
    <div className="min-h-screen bg-[url('/home_bg.png')] bg-size-[100%_auto] bg-bottom bg-no-repeat">
      <div className="flex min-h-screen items-center justify-center text-base">
        <main className="w-full max-w-xl px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
