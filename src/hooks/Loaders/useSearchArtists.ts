import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { search, searchNext } from "../../api/spotify/routes/Search"
import { SearchResponseProps } from "../../api/spotify/types/SearchResponse"
import { AxiosContext } from "../../contexts/Axios/AxiosContext"
import { SpotifyTokenContext } from "../../contexts/SpotifyToken/SpotifyTokenContext"
import { Loading } from "../types/Loading"

interface useSearchArtistsProps {
  query?: string
  limit?: number
}

interface State {
  artists: SearchResponseProps["artists"] | null
  loading: Loading
}

export const useSearchArtists = ({ query, limit }: useSearchArtistsProps) => {
  const { axiosInstance } = useContext(AxiosContext)
  const { token } = useContext(SpotifyTokenContext)

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

  const forceLoad = useCallback(async () => {
    setState({
      artists: null,
      loading: "pending",
    })

    const searchPromise = search({
      axiosInstance,
      params: { query, types: ["artist"], limit },
    })

    searchPromise
      .then((data) =>
        setState({
          artists: data.artists,
          loading: "success",
        })
      )
      .catch(() => {
        setState({
          artists: null,
          loading: "error",
        })
      })

    return searchPromise
  }, [limit, query, axiosInstance])

  const loadNextPage = useCallback(async () => {
    if (!state.artists?.next) {
      setState({
        artists: null,
        loading: "error",
      })
      return Promise.reject(new Error("Missing link to load next page"))
    }

    const searchPromise = searchNext({
      axiosInstance,
      link: state.artists.next,
    })

    searchPromise
      .then((data) =>
        setState({
          artists: data.artists,
          loading: "success",
        })
      )
      .catch(() => {
        setState({
          artists: null,
          loading: "error",
        })
      })

    return searchPromise
  }, [state, axiosInstance])

  useEffect(() => {
    if (!token || !query) {
      return
    }

    forceLoad().catch(console.error)
  }, [query, forceLoad, token])

  return {
    artists,
    loading: state.loading,

    forceLoad,
    loadNextPage,
  }
}
