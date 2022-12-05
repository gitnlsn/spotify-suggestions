import { authenticate } from "../routes/ServerAuthentication"

/**
 * Utility to authenticate with env data
 */
export const authenticateWithEnv = async () => {
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID as string
  const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET as string

  return await authenticate({
    client_id,
    client_secret,
  })
}
