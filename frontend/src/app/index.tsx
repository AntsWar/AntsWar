import { ThemeProvider } from "./provider/theme-provider"
import { createBrowserRouter, RouterProvider } from "react-router"
import HomePage from "@/pages/HomePage"
import CenterLayout from "./layouts/CenterLayout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CenterLayout />,
    children: [{ index: true, element: <HomePage /> }],
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
