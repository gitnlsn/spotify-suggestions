import { SearchArtist } from "./SearchArtist"
import { SearchTrack } from "./SearchTrack"

export interface SearchResponseProps {
  artists?: {
    href: string // current get url
    next: string // url to the next page
    limit: number
    offset: number
    total: number
    previous: null
    items: SearchArtist[]
  }
  tracks?: {
    href: string // current get url
    next: string // url to the next page
    limit: number
    offset: number
    total: number
    previous: null
    items: SearchTrack[]
  }
}
