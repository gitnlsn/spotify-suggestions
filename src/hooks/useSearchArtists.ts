import { useEffect, useMemo, useState } from "react"
import { search } from "../api/spotify/Search"
import { searchNext } from "../api/spotify/SearchNext"
import { SearchResponseProps } from "../api/spotify/types/SearchResponse"
import { Loading } from "./types"

interface useSearchArtistsProps {
  query?: string
  token?: string | null
  limit?: number
}

interface State {
  artists: SearchResponseProps["artists"] | null
  loading: Loading
}

export const useSearchArtists = ({
  query,
  token,
  limit,
}: useSearchArtistsProps) => {
  const [state, setState] = useState<State>({
    artists: null,
    loading: "idle",
  })

  const artists = useMemo(() => {
    if (!state.artists) {
      return []
    }

    return state.artists.items
  }, [state])

  const forceLoad = () => {
    if (!query) {
      console.warn("Missing query string to search artists")
      return
    }

    if (!token) {
      console.warn("Missing authentication token")
      return
    }

    setState({
      artists: null,
      loading: "pending",
    })
    return search({
      token,
      query,
      types: ["artist", "track"],
      limit,
    })
      .then((data) =>
        setState({
          artists: data.artists,
          loading: "success",
        })
      )
      .catch((error) => {
        console.error(error)
        setState({
          artists: null,
          loading: "error",
        })
      })
  }

  const loadNextPage = () => {
    if (!state.artists) {
      console.warn("Can not force load next page if there is no previous")
      return
    }

    if (!token) {
      console.warn("Missing authentication token")
      return
    }

    return searchNext({
      token,
      link: state.artists.next,
    })
      .then((data) =>
        setState({
          artists: data.artists,
          loading: "success",
        })
      )
      .catch((error) => {
        console.error(error)
        setState({
          artists: null,
          loading: "error",
        })
      })
  }

  useEffect(() => {
    if (!query) {
      return
    }

    forceLoad()
  }, [query])

  return {
    artists,
    loading: state.loading,

    forceLoad,
    loadNextPage,
  }
}
