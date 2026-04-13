import { Outlet } from "react-router"

export default function CenterLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center text-base">
      <main className="w-full max-w-xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
