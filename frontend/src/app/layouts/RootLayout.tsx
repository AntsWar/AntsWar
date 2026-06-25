import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <div className="h-dvh w-full p-4">
      <Outlet />
    </div>
  )
}
