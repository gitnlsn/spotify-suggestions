import { Album } from "./Album"
import { ReducedArtist } from "./ReducedArtist"
import { SearchType } from "./SearchType"

export interface Track {
  album: Album
  artists: ReducedArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
  }
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: SearchType
  uri: string
}
