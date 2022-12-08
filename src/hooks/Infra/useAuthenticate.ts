import { useCallback, useEffect, useState } from "react"
import { authenticate } from "../../api/spotify/routes/ClientAuthentication"
import { Loading } from "../types/Loading"

interface useAuthenticatorProps {
  code?: string | null
}

interface State {
  token: string | null
  refreshToken: string | null
  loading: Loading
}

export const useAuthenticate = ({ code }: useAuthenticatorProps) => {
  const [state, setState] = useState<State>({
    token: null,
    refreshToken: null,
    loading: "idle",
  })

  const forceLoad = useCallback(async () => {
    if (!code) {
      return Promise.reject(
        new Error("Missing authorization code to authenticate")
      )
    }

    setState({
      token: null,
      refreshToken: null,
      loading: "pending",
    })
    const authenticationPromise = authenticate({
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? "",
      client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET ?? "",
      redirect_uri: process.env.REACT_APP_SPOTIFY_AUTH2_REDIRECT_URL ?? "",
      code,
    })

    authenticationPromise
      .then((data) =>
        setState({
          token: data.access_token,
          refreshToken: data.refresh_token,
          loading: "success",
        })
      )
      .catch(() => {
        setState({
          token: null,
          refreshToken: null,
          loading: "error",
        })
      })

    return authenticationPromise
  }, [code])

  const setIdle = () => {
    setState((current) => ({
      ...current,
      loading: "idle",
    }))
  }

  useEffect(() => {
    if (state.loading === "idle" && code && !state.token) {
      forceLoad().catch(console.error)
    }
  }, [code, forceLoad, state.loading, state.token])

  return {
    ...state,
    forceLoad,
    setIdle,
  }
}
