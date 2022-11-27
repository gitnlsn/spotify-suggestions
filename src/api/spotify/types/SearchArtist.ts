import { Image } from "./Image"
import { SearchType } from "./SearchType"

export interface SearchArtist {
  name: string
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null
    total: number
  }
  genres: string[]
  href: string
  id: string
  images: Image[]
  popularity: number
  type: SearchType
  uri: string
}
