import { useEffect, useState } from "react"
import { authenticate } from "../api/spotify/ClientAuthentication"
import { Loading } from "./types"

interface useAuthenticatorProps {
  code?: string | null
}

interface State {
  token: string | null
  refreshToken: string | null
  loading: Loading
}

export const useAuthenticator = ({ code }: useAuthenticatorProps) => {
  const [state, setState] = useState<State>({
    token: null,
    refreshToken: null,
    loading: "idle",
  })

  const forceLoad = () => {
    if (!code) {
      console.warn("Missing authorization code to perform authentication")
      return
    }

    setState({
      token: null,
      refreshToken: null,
      loading: "pending",
    })
    return authenticate({
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID || "",
      client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || "",
      redirect_uri: process.env.REACT_APP_SPOTIFY_AUTH2_REDIRECT_URL || "",
      code,
    })
      .then((data) =>
        setState({
          token: data.access_token,
          refreshToken: data.refresh_token,
          loading: "success",
        })
      )
      .catch((error) => {
        console.error(error)
        setState({
          token: null,
          refreshToken: null,
          loading: "error",
        })
      })
  }

  const setIdle = () => {
    setState((current) => ({
      ...current,
      loading: "idle",
    }))
  }

  useEffect(() => {
    if (state.loading === "idle" && code && !state.token) {
      forceLoad()
    }
  }, [code])

  return {
    ...state,
    forceLoad,
    setIdle,
  }
}
