import { AxiosInstance } from "axios"
import { GetRecommendationsResponseProps } from "../types/GetRecommendationsResponse"

interface getRecommendationsProps {
  params: {
    seed_artists?: string[] // artists id
    seed_genres?: string[] // genre name
    seed_tracks?: string[] // track id
    limit?: number
  }
  axiosInstance: AxiosInstance
}

/**
 * Gets tracks recommendations from spotify.
 * (https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations)
 */
export const getRecommendations = async ({
  params: { seed_artists, seed_genres, seed_tracks, limit },
  axiosInstance,
}: getRecommendationsProps) => {
  return axiosInstance
    .get<GetRecommendationsResponseProps>(
      "https://api.spotify.com/v1/recommendations",
      {
        headers: { "Content-Type": "application/json" },
        params: {
          seed_artists: seed_artists?.toString(),
          seed_genres: seed_genres?.toString(),
          seed_tracks: seed_tracks?.toString(),
          limit,
        },
      }
    )
    .then((data) => data.data)
}
