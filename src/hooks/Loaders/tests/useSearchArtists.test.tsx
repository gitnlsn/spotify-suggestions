import { act, renderHook } from "@testing-library/react-hooks"
import { AxiosInstance } from "axios"
import React, { useState } from "react"
import { SearchResponseProps } from "../../../api/spotify/types/SearchResponse"
import { DevInfraProvider } from "../../../contexts/DevInfra/DevInfraProvider"
import { useSearchArtists } from "../useSearchArtists"

describe("useSearchArtists", () => {
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
    const [query, setQuery] = useState<string>()

    const hook = useSearchArtists({
      query,
      limit: 1,
    })

    return {
      ...hook,
      setQuery,
    }
  }

  it("should stay in idle state if no query", () => {
    const { result } = renderHook(() => TrialHook(), { wrapper })

    expect(result.current.loading).toBe("idle")
  })

  it("should autoLoad artists when query is provided", async () => {
    const { result, waitForNextUpdate } = renderHook(() => TrialHook(), {
      wrapper,
    })

    const data = { artists: { items: [{ id: "1" }] } } as SearchResponseProps

    axiosInstance.get.mockResolvedValueOnce({ data })

    act(() => {
      result.current.setQuery("query")
    })

    await waitForNextUpdate()

    expect(result.current.loading).toBe("success")
    expect(result.current.artists).toEqual(data.artists?.items)
  })

  it("should forceLoad with callback", async () => {
    const { result, waitForNextUpdate } = renderHook(() => TrialHook(), {
      wrapper,
    })

    const data = { artists: { items: [{ id: "1" }] } } as SearchResponseProps

    axiosInstance.get.mockResolvedValueOnce({ data })

    act(() => {
      result.current.setQuery("query")
    })

    await waitForNextUpdate()

    const newData = { artists: { items: [{ id: "2" }] } } as SearchResponseProps

    axiosInstance.get.mockResolvedValueOnce({ data: newData })

    act(() => {
      result.current.forceLoad().catch(console.error)
    })

    await waitForNextUpdate()

    expect(result.current.loading).toBe("success")
    expect(result.current.artists).toEqual(newData.artists?.items)
  })

  it("should load next page with callback", async () => {
    const { result, waitForNextUpdate } = renderHook(() => TrialHook(), {
      wrapper,
    })

    const data = {
      artists: { items: [{ id: "1" }], next: "next link" },
    } as SearchResponseProps

    axiosInstance.get.mockResolvedValueOnce({ data })

    act(() => {
      result.current.setQuery("query")
    })

    await waitForNextUpdate()

    const newData = { artists: { items: [{ id: "2" }] } } as SearchResponseProps

    axiosInstance.get.mockResolvedValueOnce({ data: newData })

    act(() => {
      result.current.loadNextPage().catch(console.error)
    })

    await waitForNextUpdate()

    expect(result.current.loading).toBe("success")
    expect(result.current.artists).toEqual(newData.artists?.items)
  })

  it("should raise failed state if forceLoad fails", async () => {
    const { result, waitForNextUpdate } = renderHook(() => TrialHook(), {
      wrapper,
    })

    axiosInstance.get.mockRejectedValueOnce("Error")

    act(() => {
      result.current.setQuery("query")
    })

    await waitForNextUpdate()

    expect(result.current.loading).toBe("error")
    expect(result.current.artists).toEqual([])
  })

  it("should raise failed state if loadNextPage is called without a link", async () => {
    const { result } = renderHook(() => TrialHook(), {
      wrapper,
    })

    await act(async () => {
      await expect(result.current.loadNextPage()).rejects.toBeTruthy()
    })

    expect(result.current.loading).toBe("error")
    expect(result.current.artists).toEqual([])
  })

  it("should raise failed state if loadNextPage fails", async () => {
    const { result, waitForNextUpdate } = renderHook(() => TrialHook(), {
      wrapper,
    })

    const data = {
      artists: { items: [{ id: "1" }], next: "next link" },
    } as SearchResponseProps

    axiosInstance.get.mockResolvedValueOnce({ data })

    act(() => {
      result.current.setQuery("query")
    })

    await waitForNextUpdate()

    axiosInstance.get.mockRejectedValueOnce("Error")

    act(() => {
      result.current.loadNextPage().catch(console.error)
    })

    await waitForNextUpdate()

    expect(result.current.loading).toBe("error")
    expect(result.current.artists).toEqual([])
  })
})
