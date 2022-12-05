import React from "react"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { SpotifyAuthProvider } from "./contexts/SpotifyAuth/SpotifyAuthContext"
import { Home } from "./pages/Home/Home"
import { Recommendations } from "./pages/Recommendations/Recommendations"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/recommendations", element: <Recommendations /> },
  { path: "*", element: <Navigate to="/" replace /> },
])

export const App: React.FC = () => {
  return (
    <SpotifyAuthProvider>
      <RouterProvider router={router} />
    </SpotifyAuthProvider>
  )
}
