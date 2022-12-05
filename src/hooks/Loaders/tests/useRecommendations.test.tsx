import React, { useState } from "react"
import { AxiosInstance } from "axios"
import { DevInfraProvider } from "../../../contexts/DevInfra/DevInfraProvider"
import { useRecommendations } from "../useRecommendations"
import { act, renderHook } from "@testing-library/react-hooks"
import { GetRecommendationsResponseProps } from "../../../api/spotify/types/GetRecommendationsResponse"

describe("useRecommendations", () => {
  const axiosInstance = jest.mocked(
    jest.genMockFromModule<AxiosInstance>("axios"),
    true
  )

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <DevInfraProvider token="token" axiosInstance={axiosInstance}>
      {children}
    </DevInfraProvider>
  )

  const TrialHook = () => {
    const [genres, setGenres] = useState<string[]>()
    const [artistIds, setArtistIds] = useState<string[]>()

    const hook = useRecommendations({
      artistIds,
      genres,
      limit: 1,
    })

    return {
      ...hook,
      setGenres,
      setArtistIds,
    }
  }

  it("should set idle state", () => {
    const { result } = renderHook(() => TrialHook(), { wrapper })

    expect(result.current.loading).toBe("idle")
    expect(result.current.tracks).toEqual([])
  })

  it("should auto load tracks if genre is provided", async () => {
    const { result, waitForNextUpdate } = renderHook(() => TrialHook(), {
      wrapper,
    })

    const data = { tracks: [{ id: "1" }] } as GetRecommendationsResponseProps
    axiosInstance.get.mockResolvedValueOnce({ data })

    act(() => {
      result.current.setGenres(["samba"])
    })

    await waitForNextUpdate()

    expect(result.current.loading).toBe("success")
    expect(result.current.tracks).toEqual(data.tracks)
  })

  it("should auto load tracks if artists is provided", async () => {
    const { result, waitForNextUpdate } = renderHook(() => TrialHook(), {
      wrapper,
    })

    const data = { tracks: [{ id: "1" }] } as GetRecommendationsResponseProps
    axiosInstance.get.mockResolvedValueOnce({ data })

    act(() => {
      result.current.setArtistIds(["id 1"])
    })

    await waitForNextUpdate()

    expect(result.current.loading).toBe("success")
    expect(result.current.tracks).toEqual(data.tracks)
  })

  it("should not auto load tracks if more than 5 seeds are provided", async () => {
    const { result } = renderHook(() => TrialHook(), {
      wrapper,
    })

    act(() => {
      result.current.setArtistIds([
        "id 1",
        "id 2",
        "id 3",
        "id 4",
        "id 5",
        "id 6",
      ])
    })

    expect(result.current.loading).toBe("idle")
    expect(result.current.tracks).toEqual([])
  })

  it("should forceLoad", async () => {
    const { result, waitForNextUpdate } = renderHook(() => TrialHook(), {
      wrapper,
    })

    const data = { tracks: [{ id: "1" }] } as GetRecommendationsResponseProps
    axiosInstance.get.mockResolvedValueOnce({ data })

    act(() => {
      result.current.setArtistIds(["id 1"])
    })

    await waitForNextUpdate()

    const newData = { tracks: [{ id: "2" }] } as GetRecommendationsResponseProps
    axiosInstance.get.mockResolvedValueOnce({ data: newData })

    act(() => {
      result.current.setArtistIds(["id 2"])
    })

    await waitForNextUpdate()

    expect(result.current.loading).toBe("success")
    expect(result.current.tracks).toEqual(newData.tracks)
  })

  it("should reject forceLoad if no seeds", async () => {
    const { result } = renderHook(() => TrialHook(), {
      wrapper,
    })

    await act(async () => {
      await expect(result.current.forceLoad()).rejects.toBeTruthy()
    })

    expect(result.current.loading).toBe("error")
    expect(result.current.tracks).toEqual([])
  })

  it("should reject forceLoad if more than 5 seeds", async () => {
    const { result } = renderHook(() => TrialHook(), {
      wrapper,
    })

    act(() => {
      result.current.setArtistIds([
        "id 1",
        "id 2",
        "id 3",
        "id 4",
        "id 5",
        "id 6",
      ])
    })

    await act(async () => {
      await expect(result.current.forceLoad()).rejects.toBeTruthy()
    })

    expect(result.current.loading).toBe("error")
    expect(result.current.tracks).toEqual([])
  })
})
