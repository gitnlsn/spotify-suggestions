import axios from "axios"

export interface AuthResponse {
  access_token: string
  token_type: "Bearer"
  expires_in: number
}

interface AuthProps {
  client_id: string
  client_secret: string
}

/**
 * Authentication method for Server-side applications. Code from spotify developers
 * (https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/)
 */
export const authenticate = async ({
  client_id,
  client_secret,
}: AuthProps): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        grant_type: "client_credentials",
      },
    }

    return axios
      .post<AuthResponse>(authOptions.url, authOptions.form, {
        headers: authOptions.headers,
      })
      .then((data) => data.data)
  })
}
