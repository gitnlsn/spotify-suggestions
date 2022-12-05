import { useEffect, useState } from "react"

interface useDebounceProps {
  value: string
  delay: number
}

export const useDebounce = ({ value, delay }: useDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}
