import { createSpotifyAxiosInstance } from "../utils/AxiosInstance"
import { Buffer } from "buffer"

export interface AuthResponse {
  access_token: string
  token_type: "Bearer"
  expires_in: number
}

interface AuthProps {
  client_id?: string
  client_secret?: string
}

/**
 * Authentication method for Server-side applications. Code from spotify developers
 * (https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/)
 */
export const authenticate = async ({
  client_id,
  client_secret,
}: AuthProps): Promise<AuthResponse> => {
  const token = Buffer.from(client_id + ":" + client_secret).toString("base64")

  return createSpotifyAxiosInstance()
    .post<AuthResponse>(
      "https://accounts.spotify.com/api/token",
      { grant_type: "client_credentials" },
      {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => response.data)
}
