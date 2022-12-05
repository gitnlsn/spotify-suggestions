import axios from "axios"

/**
 * Creates axios instance for Spotify Api.
 */
export const createSpotifyAxiosInstance = (token?: string) =>
  axios.create({
    headers: {
      // injects beared token
      Authorization: `Bearer ${token}`,

      // Those additional headers if set with axios default
      // will make spotify api return wrong encoding
      Accept: null,
      "User-Agent": null,
      "Accept-Encoding": null,
    },
  })
