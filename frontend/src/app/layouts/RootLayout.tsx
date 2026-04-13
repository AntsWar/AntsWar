import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <div className="flex min-h-screen justify-center">
      <main className="w-full max-w-xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
