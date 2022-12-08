import { AxiosInstance } from "axios"
import { GetGenresResponseProps } from "../types/GetGenresResponse"

interface getGenresProps {
  axiosInstance: AxiosInstance
}

/**
 * Gets available genres from spotify.
 * (https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendation-genres)
 */
export const getGenres = async ({ axiosInstance }: getGenresProps) => {
  return axiosInstance
    .get<GetGenresResponseProps>(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      { headers: { "Content-Type": "application/json" } }
    )
    .then((data) => data.data)
}
