import { ThemeProvider } from "./provider/theme-provider"
import { createBrowserRouter, RouterProvider } from "react-router"
import RootLayout from "./layouts/RootLayout"
import GamePage from "@/pages/GamePage"
import { QueryProvider } from "./provider/queryProvider"
import { Toaster } from "@/shared/ui/sonner"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <GamePage /> },
      // { path: "room/:roomId", element: <GamePage /> },
    ],
  },
])

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App
