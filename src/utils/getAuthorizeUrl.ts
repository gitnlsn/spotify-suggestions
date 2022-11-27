import { createSearchParams } from "react-router-dom"

export const getAuthorizeUrl = () => {
  const searchParams = createSearchParams()
  searchParams.append("response_type", "code")
  searchParams.append(
    "client_id",
    process.env.REACT_APP_SPOTIFY_CLIENT_ID || ""
  )
  searchParams.append(
    "redirect_uri",
    process.env.REACT_APP_SPOTIFY_AUTH2_REDIRECT_URL || ""
  )

  return "https://accounts.spotify.com/authorize?" + searchParams.toString()
}
