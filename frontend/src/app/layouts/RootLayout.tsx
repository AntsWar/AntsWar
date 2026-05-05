import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-[url('/bg_light.png')] bg-contain bg-bottom bg-no-repeat dark:bg-[url('/bg_dark.png')]">
      <div className="flex min-h-screen justify-center">
        <main className="min-h-screen w-full max-w-xl px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
