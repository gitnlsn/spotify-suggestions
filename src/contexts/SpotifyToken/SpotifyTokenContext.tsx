import React, { createContext } from "react"

interface SpotifyTokenContextProps {
  token?: string
}

export const SpotifyTokenContext = createContext({} as SpotifyTokenContextProps)

interface SpotifyTokenProviderProps {
  children: React.ReactNode
  token?: string
}

export const SpotifyTokenProvider: React.FC<SpotifyTokenProviderProps> = ({
  children,
  token,
}) => {
  return (
    <SpotifyTokenContext.Provider value={{ token }}>
      {children}
    </SpotifyTokenContext.Provider>
  )
}
