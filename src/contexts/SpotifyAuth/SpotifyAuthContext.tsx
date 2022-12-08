import React, { createContext, useMemo, useState } from "react"
import { Loading } from "../../hooks/types/Loading"
import { useAuthenticate } from "../../hooks/Infra/useAuthenticate"
import { SpotifyTokenProvider } from "../SpotifyToken/SpotifyTokenContext"
import {
  useAuthenticatorProps,
  useServerAuthenticate,
} from "../../hooks/Infra/useServerAuthenticate"
import { AuthResponse } from "../../api/spotify/routes/ClientAuthentication"

interface SpotifyAuthContextProps {
  refreshToken: string | null
  loading: Loading
  forceLoad: () => Promise<AuthResponse>
  setIdle: () => void

  setAuthorizationCode: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const SpotifyAuthContext = createContext<SpotifyAuthContextProps>(
  {} as SpotifyAuthContextProps
)

interface SpotifyAuthProviderProps {
  children: React.ReactNode
  authentication?: useAuthenticatorProps
  token?: string
}

/**
 * Provides authentication props and callbacks for authorization method.
 */
export const SpotifyAuthProvider: React.FC<SpotifyAuthProviderProps> = ({
  children,
  authentication: serverAuthentication,
  token: injectedToken,
}) => {
  const [authorizationCode, setAuthorizationCode] = useState<string>()

  const {
    token: authorizedToken,
    refreshToken,
    forceLoad,
    loading,
    setIdle,
  } = useAuthenticate({
    code: authorizationCode,
  })

  const { token: serverToken } = useServerAuthenticate(
    serverAuthentication ?? {}
  )

  const token = useMemo(() => {
    if (injectedToken) {
      return injectedToken
    }

    if (serverAuthentication && serverToken) {
      return serverToken
    }

    if (authorizedToken) {
      return authorizedToken
    }

    return undefined
  }, [injectedToken, serverAuthentication, serverToken, authorizedToken])

  return (
    <SpotifyAuthContext.Provider
      value={{
        refreshToken,
        loading,
        forceLoad,
        setIdle,

        setAuthorizationCode,
      }}
    >
      <SpotifyTokenProvider token={token}>{children}</SpotifyTokenProvider>
    </SpotifyAuthContext.Provider>
  )
}
