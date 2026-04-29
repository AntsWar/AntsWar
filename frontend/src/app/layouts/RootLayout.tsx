import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-[url('/home_bg.png')] bg-contain bg-bottom bg-no-repeat">
      <div className="flex min-h-screen justify-center">
        <main className="min-h-screen w-full max-w-xl px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
