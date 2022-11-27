import axios from "axios"
import { SearchResponseProps } from "./types/SearchResponse"
import { SearchType } from "./types/SearchType"

interface SearchProps {
  token: string
  query: string
  types: SearchType[]
  limit?: number
}

/**
 * Search request at spotify. It gets tracks, artists, albums.
 * (https://developer.spotify.com/documentation/web-api/reference/#/operations/search)
 */
export const search = async ({ token, query, types, limit }: SearchProps) => {
  return axios
    .get<SearchResponseProps>("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        type: types.toString(),
        include_external: "audio",
        q: query,
        limit,
      },
    })
    .then((data) => data.data)
}
