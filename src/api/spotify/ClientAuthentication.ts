import axios from "axios"

export interface AuthResponse {
  access_token: string
  token_type: "Bearer"
  scope?: string
  expires_in: number
  refresh_token: string
}

interface AuthProps {
  client_id: string
  client_secret: string
  code: string
  redirect_uri: string
}

/**
 * Authentication method for client-side applications. Code from spotify developers
 * (https://developer.spotify.com/documentation/general/guides/authorization/code-flow/)
 */
export const authenticate = async ({
  client_id,
  client_secret,
  code,
  redirect_uri,
}: AuthProps): Promise<AuthResponse> => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
  }

  return axios
    .post(authOptions.url, authOptions.form, {
      headers: authOptions.headers,
    })
    .then((data) => data.data)
}
