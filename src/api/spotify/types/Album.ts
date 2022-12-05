import { AlbumType } from "./AlbumType"
import { Image } from "./Image"
import { ReducedArtist } from "./ReducedArtist"
import { ReleaseDatePrecision } from "./ReleaseDatePrecision"
import { SearchType } from "./SearchType"

export interface Album {
  album_type: AlbumType
  artists: ReducedArtist[]
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
  type: SearchType
  uri: string
}
