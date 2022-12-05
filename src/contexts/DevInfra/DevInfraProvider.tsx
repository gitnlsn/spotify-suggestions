import { AxiosInstance } from "axios"
import React, { createContext, useMemo } from "react"
import { AuthResponse } from "../../api/spotify/routes/ServerAuthentication"
import {
  useAuthenticatorProps,
  useServerAuthenticate,
} from "../../hooks/Infra/useServerAuthenticate"
import { Loading } from "../../hooks/types/Loading"
import { AxiosProvider } from "../Axios/AxiosContext"
import { SpotifyTokenProvider } from "../SpotifyToken/SpotifyTokenContext"

interface ServerAuthContextProps {
  loading: Loading
  forceLoad: () => Promise<AuthResponse>
}

export const ServerAuthContext = createContext<ServerAuthContextProps>(
  {} as ServerAuthContextProps
)

interface DevInfraProviderProps {
  children: React.ReactNode
  authentication?: useAuthenticatorProps
  token?: string
  axiosInstance?: AxiosInstance
}

/**
 * Provides injection for axiosInstance and bearer token.
 * If authentication is provided, it will try authentication.
 */
export const DevInfraProvider: React.FC<DevInfraProviderProps> = ({
  children,
  authentication,
  token: injectedToken,
  axiosInstance: injectedAxiosInstance,
}) => {
  const {
    token: authenticatedToken,
    loading,
    forceLoad,
  } = useServerAuthenticate(authentication ? authentication : {})

  const token = useMemo(() => {
    if (injectedToken) {
      return injectedToken
    }

    if (authentication && authenticatedToken) {
      return authenticatedToken
    }

    return undefined
  }, [injectedToken, authenticatedToken])

  const axiosInstance = useMemo(() => {
    if (injectedAxiosInstance) {
      return injectedAxiosInstance
    }

    return undefined
  }, [token])

  return (
    <ServerAuthContext.Provider value={{ loading, forceLoad }}>
      <SpotifyTokenProvider token={token}>
        <AxiosProvider axiosInstance={axiosInstance}>{children}</AxiosProvider>
      </SpotifyTokenProvider>
    </ServerAuthContext.Provider>
  )
}
