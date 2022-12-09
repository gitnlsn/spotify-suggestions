import React, { createContext, useCallback, useRef, useState } from "react"

export interface AudioContextProps {
  /**
   * React ref to the audio html element
   */
  audioRef: React.RefObject<HTMLAudioElement>
  
  /**
   * Url of the current track
   */
  track: string
  
  /**
   * Sets the tracks with an url
   */
  setTrack: (url: string) => void
  
  /**
   * Plays the track
   */
  play: () => Promise<void>
  
  /**
   * Paused the player and keeps currentTime
   */
  pause: () => void
  
  /**
   * Pauses the player and moves currentTimet to 0
   */
  stop: () => void
  
  /**
   * Sets volume percentage
   */
  setVolume: (volume: number) => void
}

/**
 * Provides single instance to play songs with url
 */
export const AudioContext = createContext<AudioContextProps>(
  {} as AudioContextProps
)

export interface AudioProviderProps {
  children: React.ReactNode
}

/**
 * Provides single instance to play songs with url
 */
export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [url, setUrl] = useState<string>("")

  const setTrack = useCallback(
    (url: string) => {
      if (!audioRef.current) {
        return
      }

      setUrl(url)
    },
    [audioRef.current, setUrl]
  )

  const play = useCallback(async () => {
    if (!audioRef.current) {
      return Promise.reject(new Error("Audio not ready"))
    }

    return audioRef.current.play()
  }, [audioRef.current])

  const pause = useCallback(() => {
    if (!audioRef.current) {
      console.warn("Audio not ready")
      return
    }

    audioRef.current.pause()
  }, [audioRef.current])

  const stop = useCallback(() => {
    if (!audioRef.current) {
      console.warn("Audio not ready")
      return
    }

    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }, [audioRef.current])

  const setVolume = useCallback(
    (volume: number) => {
      if (!audioRef.current) {
        console.warn("Audio not ready")
        return
      }

      if (volume > 1 || volume < 0) {
        console.warn("Audio volume must be percentage value")
        return
      }

      audioRef.current.volume = volume
    },
    [audioRef.current]
  )

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        track: url,
        setTrack,
        play,
        pause,
        stop,
        setVolume,
      }}
    >
      <audio ref={audioRef} style={{ display: "none" }} src={url} />
      {children}
    </AudioContext.Provider>
  )
}
