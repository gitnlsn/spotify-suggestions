import { AxiosInstance } from "axios"
import { SearchResponseProps } from "../types/SearchResponse"
import { SearchType } from "../types/SearchType"

interface SearchProps {
  params: { query?: string; types?: SearchType[]; limit?: number }
  axiosInstance: AxiosInstance
}

/**
 * Search request at spotify. It gets tracks, artists, albums.
 * (https://developer.spotify.com/documentation/web-api/reference/#/operations/search)
 */
export const search = async ({
  params: { query, types, limit },
  axiosInstance,
}: SearchProps) => {
  return axiosInstance
    .get<SearchResponseProps>("https://api.spotify.com/v1/search", {
      headers: { "Content-Type": "application/json" },
      params: {
        type: types?.toString(),
        include_external: "audio",
        q: query,
        limit,
      },
    })
    .then((response) => response.data)
}

interface getNextPageProps {
  axiosInstance: AxiosInstance
  link: string
}

/**
 * Search next page with provided link
 * (https://developer.spotify.com/documentation/web-api/reference/#/operations/search)
 */
export const searchNext = async ({ axiosInstance, link }: getNextPageProps) => {
  return axiosInstance
    .get<SearchResponseProps>(link, {
      headers: { "Content-Type": "application/json" },
    })
    .then((data) => data.data)
}