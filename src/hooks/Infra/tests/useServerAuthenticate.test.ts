import { act, renderHook } from "@testing-library/react-hooks"
import { useState } from "react"
import {
  useAuthenticatorProps,
  useServerAuthenticate,
} from "../../Infra/useServerAuthenticate"

describe("useServerAuthenticate", () => {
  const envCrendetials: useAuthenticatorProps = {
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? "",
    client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET ?? "",
  }

  const TrialHook = () => {
    const [crendentials, setCredentials] = useState<useAuthenticatorProps>({})

    const authHook = useServerAuthenticate(crendentials)

    return {
      ...authHook,
      setCredentials,
    }
  }

  it("should provide token", async () => {
    const { result, waitForNextUpdate } = renderHook(() => TrialHook())

    expect(result.current.token).toBe(null)
    expect(result.current.loading).toBe("idle")

    act(() => {
      result.current.setCredentials(envCrendetials)
    })

    await waitForNextUpdate()

    expect(result.current.token).toBeTruthy()
    expect(result.current.loading).toBe("success")
  })
})
