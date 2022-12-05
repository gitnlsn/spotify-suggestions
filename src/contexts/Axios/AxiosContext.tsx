import React, { createContext, useContext, useMemo } from "react"
import { AxiosInstance } from "axios"
import { createSpotifyAxiosInstance } from "../../api/spotify/utils/AxiosInstance"
import { SpotifyTokenContext } from "../SpotifyToken/SpotifyTokenContext"

interface AxiosContextProps {
  axiosInstance: AxiosInstance
}

/**
 * Provides axios instance for the application with proper headers
 */
export const AxiosContext = createContext<AxiosContextProps>(
  {} as AxiosContextProps
)

interface AxiosProviderProps {
  axiosInstance?: AxiosInstance
  children: React.ReactNode
}

/**
 * Provides axios instance for the application with proper headers
 */
export const AxiosProvider: React.FC<AxiosProviderProps> = ({
  children,
  axiosInstance: injectedAxiosInstance,
}) => {
  const { token } = useContext(SpotifyTokenContext)

  const axiosInstance = useMemo(() => {
    // Injects axios instance to mock requests
    if (injectedAxiosInstance) {
      return injectedAxiosInstance
    }

    // Sets Bearer token if token is available
    if (token) {
      return createSpotifyAxiosInstance(token)
    }

    return createSpotifyAxiosInstance()
  }, [injectedAxiosInstance, token])

  return (
    <AxiosContext.Provider value={{ axiosInstance }}>
      {children}
    </AxiosContext.Provider>
  )
}
