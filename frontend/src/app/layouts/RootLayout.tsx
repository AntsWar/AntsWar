import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <div className="h-dvh bg-[url('/bg_light.png')] bg-contain bg-bottom bg-no-repeat dark:bg-[url('/bg_dark.png')]">
      <Outlet />
    </div>
  )
}
