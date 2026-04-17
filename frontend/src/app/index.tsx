import { ThemeProvider } from "./provider/theme-provider"
import { createBrowserRouter, RouterProvider } from "react-router"
import HomePage from "@/pages/HomePage"
import CenterLayout from "./layouts/CenterLayout"
import RootLayout from "./layouts/RootLayout"
import GamePage from "@/pages/GamePage"
import { QueryProvider } from "./provider/queryProvider"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CenterLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/game/:gameId",
    element: <RootLayout />,
    children: [{ index: true, element: <GamePage /> }],
  },
])

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App
