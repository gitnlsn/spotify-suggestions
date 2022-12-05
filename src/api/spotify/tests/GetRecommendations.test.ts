import { AxiosInstance } from "axios"
import { getRecommendations } from "../routes/GetRecommendations"
import { createSpotifyAxiosInstance } from "../utils/AxiosInstance"
import { authenticateWithEnv } from "./authenticateWithEnv"

describe("GetRecommendations", () => {
  let axiosInstance: AxiosInstance

  beforeAll(async () => {
    const { access_token } = await authenticateWithEnv()
    axiosInstance = createSpotifyAxiosInstance(access_token)
  })

  it("should get with artist seed", async () => {
    const { tracks } = await getRecommendations({
      axiosInstance,
      params: { seed_artists: ["3PhoLpVuITZKcymswpck5b"], limit: 1 },
    })

    expect(tracks).toBeTruthy()
    expect(tracks.length).toBe(1)
    expect(tracks[0]).toHaveProperty("name")
    expect(tracks[0]).toHaveProperty("artists")
    expect(tracks[0]).toHaveProperty("album")
  })

  it("should get with genre seed", async () => {
    const { tracks } = await getRecommendations({
      axiosInstance,
      params: { seed_genres: ["samba"], limit: 1 },
    })

    expect(tracks).toBeTruthy()
    expect(tracks.length).toBe(1)
    expect(tracks[0]).toHaveProperty("name")
    expect(tracks[0]).toHaveProperty("artists")
    expect(tracks[0]).toHaveProperty("album")
  })

  it("should get with track seed", async () => {
    const { tracks } = await getRecommendations({
      axiosInstance,
      params: { seed_tracks: ["5TJEBoTCDbJXiKMdCN9pd3"], limit: 1 },
    })

    expect(tracks).toBeTruthy()
    expect(tracks.length).toBe(1)
    expect(tracks[0]).toHaveProperty("name")
    expect(tracks[0]).toHaveProperty("artists")
    expect(tracks[0]).toHaveProperty("album")
  })
})
