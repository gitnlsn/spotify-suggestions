import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { getRecommendations } from "../../api/spotify/routes/GetRecommendations"
import { Track } from "../../api/spotify/types/Track"
import { AxiosContext } from "../../contexts/Axios/AxiosContext"
import { SpotifyTokenContext } from "../../contexts/SpotifyToken/SpotifyTokenContext"
import { Loading } from "../types/Loading"

interface useRecommendationsProps {
  genres?: string[]
  artistIds?: string[]
  limit?: number
}

interface State {
  tracks: Track[]
  loading: Loading
}

export const useRecommendations = ({
  genres,
  artistIds,
  limit,
}: useRecommendationsProps) => {
  const { token } = useContext(SpotifyTokenContext)
  const { axiosInstance } = useContext(AxiosContext)

  const [state, setState] = useState<State>({
    tracks: [],
    loading: "idle",
  })

  const totalSeeds = useMemo(() => {
    let total = 0

    if (genres) {
      total += genres.length
    }

    if (artistIds) {
      total += artistIds.length
    }

    return total
  }, [genres, artistIds])

  const forceLoad = useCallback(async () => {
    if (totalSeeds === 0) {
      setState({
        tracks: [],
        loading: "error",
      })
      return Promise.reject(new Error("Missing seeds to get recommendations"))
    }

    if (totalSeeds > 5) {
      setState({
        tracks: [],
        loading: "error",
      })
      return Promise.reject(new Error("Exceeded the number of seeds"))
    }

    const recommendationsPromise = getRecommendations({
      params: {
        seed_artists: artistIds,
        seed_genres: genres,
        limit,
      },
      axiosInstance,
    })

    recommendationsPromise
      .then((data) =>
        setState({
          tracks: data.tracks,
          loading: "success",
        })
      )
      .catch(() => {
        setState({
          tracks: [],
          loading: "error",
        })
      })

    return recommendationsPromise
  }, [genres, artistIds, limit, totalSeeds, axiosInstance])

  useEffect(() => {
    if (!token) {
      return
    }

    if (totalSeeds === 0 || totalSeeds > 5) {
      return
    }

    forceLoad().catch(console.error)
  }, [forceLoad, token, totalSeeds])

  return {
    ...state,
    forceLoad,
  }
}
