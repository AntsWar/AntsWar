import { ThemeProvider } from "./provider/theme-provider"
import { createBrowserRouter, RouterProvider } from "react-router"
import HomePage from "@/pages/HomePage"
import CenterLayout from "./layouts/CenterLayout"
import RootLayout from "./layouts/RootLayout"
import GamePage from "@/pages/GamePage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CenterLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/game/:roomId",
    element: <RootLayout />,
    children: [{ index: true, element: <GamePage /> }],
  },
])

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
