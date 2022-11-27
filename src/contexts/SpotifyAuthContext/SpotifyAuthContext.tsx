import React, { createContext, useEffect, useState } from "react"
import { Loading } from "../../hooks/types"
import { useAuthenticator } from "../../hooks/useAuthenticate"

interface SpotifyAuthContextProps {
  token: string | null
  refreshToken: string | null
  loading: Loading
  forceLoad: () => Promise<void> | undefined
  setIdle: () => void

  setAuthorizationCode: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const SpotifyAuthContext = createContext<SpotifyAuthContextProps>(
  {} as SpotifyAuthContextProps
)

interface SpotifyAuthProviderProps {
  children: React.ReactNode
}

export const SpotifyAuthProvider: React.FC<SpotifyAuthProviderProps> = ({
  children,
}) => {
  const [authorizationCode, setAuthorizationCode] = useState<string>()

  const { token, refreshToken, forceLoad, loading, setIdle } = useAuthenticator(
    {
      code: authorizationCode,
    }
  )

  return (
    <SpotifyAuthContext.Provider
      value={{
        token,
        refreshToken,
        loading,
        forceLoad,
        setIdle,

        setAuthorizationCode,
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  )
}
