import React, { useContext, useEffect, useState } from "react"
import {
  Button,
  Container,
  Grid,
  LinearProgress,
  Slider,
  Stack,
  TextField,
} from "@mui/material"
import { AudioContext, AudioProvider } from "../src/AudioContext"
import { VolumeDown, VolumeUp } from "@mui/icons-material"

export default {
  title: "System/AudioContext",
  component: AudioProvider,
  argsTypes: {},
}

const Consumer: React.FC = () => {
  const { audioRef, track, setTrack, play, pause, stop, setVolume } =
    useContext(AudioContext)

  const [progress, setProgress] = useState<number>(0)

  const [vol, setVol] = useState<number>(100)

  useEffect(() => {
    const timer = setInterval(() => {
      if (audioRef.current) {
        const { currentTime, duration } = audioRef.current
        setProgress(duration !== 0 ? (currentTime / duration) * 100 : 0)
      } else {
        setProgress(0)
      }
    }, 300)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Container sx={{ width: "300px" }}>
      <TextField
        sx={{ width: "100%" }}
        placeholder="Track Url"
        value={track}
        onChange={(e) => setTrack(e.target.value)}
      />
      <LinearProgress variant="determinate" value={progress} />
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid>
          <Button
            onClick={() => {
              play().catch(console.error)
            }}
          >
            Play
          </Button>
        </Grid>
        <Grid>
          <Button onClick={pause}>Pause</Button>
        </Grid>
        <Grid>
          <Button onClick={stop}>Stop</Button>
        </Grid>
      </Grid>

      <Stack direction="row">
        <VolumeDown />
        <Slider
          value={vol}
          onChange={(_, volume) => {
            setVolume((volume as number) / 100)
            setVol(volume as number)
          }}
        />
        <VolumeUp />
      </Stack>
    </Container>
  )
}

const Template = () => {
  return (
    <AudioProvider>
      <Consumer />
    </AudioProvider>
  )
}

export const Example = Template.bind({})
