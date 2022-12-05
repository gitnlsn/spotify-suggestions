import { AxiosInstance } from "axios"
import { createSpotifyAxiosInstance } from "../utils/AxiosInstance"
import { search, searchNext } from "../routes/Search"
import { authenticateWithEnv } from "./authenticateWithEnv"

describe("search", () => {
  let axiosInstance: AxiosInstance

  beforeAll(async () => {
    const { access_token } = await authenticateWithEnv()
    axiosInstance = createSpotifyAxiosInstance(access_token)
  })

  it("should search artist", async () => {
    const { artists } = await search({
      axiosInstance,
      params: { query: "Elton John", types: ["artist"], limit: 1 },
    })

    expect(artists).toBeTruthy()
    expect(artists?.total).toBeTruthy()
  })

  it("should search tracks", async () => {
    const { tracks } = await search({
      axiosInstance,
      params: { query: "A whiter shade of pale", types: ["track"], limit: 1 },
    })

    expect(tracks).toBeTruthy()
    expect(tracks?.total).toBeTruthy()
  })
})

describe("search next", () => {
  let axiosInstance: AxiosInstance

  beforeAll(async () => {
    const { access_token } = await authenticateWithEnv()
    axiosInstance = createSpotifyAxiosInstance(access_token)
  })

  it("should load next page with artists", async () => {
    const { artists } = await search({
      axiosInstance,
      params: { query: "Elton John", types: ["artist"], limit: 1 },
    })

    if (!artists) {
      throw new Error("Missing artists")
    }

    const { artists: nextArtists } = await searchNext({
      axiosInstance,
      link: artists.next,
    })

    if (!nextArtists) {
      throw new Error("Missing next artists")
    }

    expect(nextArtists).toBeTruthy()
    expect(nextArtists?.total).toBeTruthy()
  })

  it("should load next page with tracks", async () => {
    const { tracks } = await search({
      axiosInstance,
      params: { query: "A whiter shade of pale", types: ["track"], limit: 1 },
    })

    if (!tracks) {
      throw new Error("Missing tracks")
    }

    const { tracks: nextTracks } = await searchNext({
      axiosInstance,
      link: tracks.next,
    })

    if (!nextTracks) {
      throw new Error("Missing next tracks")
    }

    expect(nextTracks).toBeTruthy()
    expect(nextTracks?.total).toBeTruthy()
  })
})
