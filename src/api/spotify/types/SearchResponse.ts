import { Artist } from "./Artist"
import { Track } from "./Track"

export interface SearchResponseProps {
  artists?: {
    href: string // current get url
    next: string // url to the next page
    limit: number
    offset: number
    total: number
    previous: null
    items: Artist[]
  }
  tracks?: {
    href: string // current get url
    next: string // url to the next page
    limit: number
    offset: number
    total: number
    previous: null
    items: Track[]
  }
}
