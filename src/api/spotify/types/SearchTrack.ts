import { AlbumType } from "./AlbumType"
import { Image } from "./Image"
import { ReleaseDatePrecision } from "./ReleaseDatePrecision"
import { SearchType } from "./SearchType"

export interface SearchTrack {
  album: {
    album_type: AlbumType
    artists: [
      {
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }
    ]
    available_markets: string[]
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string // yyyy-MM-dd
    release_date_precision: ReleaseDatePrecision
    total_tracks: 13
    type: "album"
    uri: string
  }
  artists: [
    {
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      name: string
      type: "artist"
      uri: string
    }
  ]
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
