import { SearchType } from "./SearchType"
import { Track } from "./Track"

interface RecommendationSeed {
  initialPoolSize: number
  afterFilteringSize: number
  afterRelinkingSize: number
  id: string
  type: SearchType
  href: string
}

export interface GetRecommendationsResponseProps {
  seeds: RecommendationSeed[]
  tracks: Track[]
}
