import { AxiosInstance } from "axios"
import { getGenres } from "../routes/GetGenres"
import { createSpotifyAxiosInstance } from "../utils/AxiosInstance"
import { authenticateWithEnv } from "./authenticateWithEnv"

describe("GetGenres", () => {
  let axiosInstance: AxiosInstance

  beforeAll(async () => {
    const { access_token } = await authenticateWithEnv()
    axiosInstance = createSpotifyAxiosInstance(access_token)
  })

  it("should search artist", async () => {
    const { genres } = await getGenres({
      axiosInstance,
    })

    expect(genres.length).toBeTruthy()
  })
})
