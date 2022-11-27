import React from "react"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { SpotifyAuthProvider } from "./contexts/SpotifyAuthContext/SpotifyAuthContext"
import { Home } from "./pages/Home/Home"
import { Suggestions } from "./pages/Suggestions/Suggestions"

const router = createBrowserRouter([
  { path: "/home", element: <Home /> },
  { path: "/suggestions", element: <Suggestions /> },
  { path: "*", element: <Navigate to="/home" replace /> },
])

export const App: React.FC = () => {
  return (
    <SpotifyAuthProvider>
      <RouterProvider router={router} />
    </SpotifyAuthProvider>
  )
}
