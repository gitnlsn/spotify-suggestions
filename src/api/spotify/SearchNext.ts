import axios from "axios"
import { SearchResponseProps } from "./types/SearchResponse"

interface getNextPageProps {
  token: string
  link: string
}

/**
 * Search next page with provided link
 * (https://developer.spotify.com/documentation/web-api/reference/#/operations/search)
 */
export const searchNext = ({ token, link }: getNextPageProps) => {
  return axios
    .get<SearchResponseProps>(link, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((data) => data.data)
}
