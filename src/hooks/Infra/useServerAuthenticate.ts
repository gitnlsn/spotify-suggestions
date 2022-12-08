import { useCallback, useEffect, useState } from "react"
import { authenticate } from "../../api/spotify/routes/ServerAuthentication"
import { Loading } from "../types/Loading"

export interface useAuthenticatorProps {
  client_id?: string
  client_secret?: string
}

interface State {
  token: string | null
  loading: Loading
}

/**
 * Hook that makes authentication.
 * Created for storybook.
 */
export const useServerAuthenticate = ({
  client_id,
  client_secret,
}: useAuthenticatorProps) => {
  const [state, setState] = useState<State>({
    token: null,
    loading: "idle",
  })

  const forceLoad = useCallback(async () => {
    setState({
      token: null,
      loading: "pending",
    })

    const authenticatePromise = authenticate({
      client_id,
      client_secret,
    })

    authenticatePromise
      .then((data) =>
        setState({
          token: data.access_token,
          loading: "success",
        })
      )
      .catch(() => {
        setState({
          token: null,
          loading: "error",
        })
      })

    return authenticatePromise
  }, [client_id, client_secret])

  useEffect(() => {
    if (!client_id || !client_secret) {
      return
    }

    forceLoad().catch(console.error)
  }, [client_id, client_secret, forceLoad])

  return {
    ...state,
    forceLoad,
  }
}
