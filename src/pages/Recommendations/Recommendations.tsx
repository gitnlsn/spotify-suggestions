import { Autocomplete, Container, Stack, TextField } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchArtist } from "../../api/spotify/types/SearchArtist"
import { SpotifyAuthContext } from "../../contexts/SpotifyAuthContext/SpotifyAuthContext"
import { useDebounce } from "../../hooks/useDebounce"
import { useSearchArtists } from "../../hooks/useSearchArtists"

export const Recommendations: React.FC = () => {
  const { token, loading, setIdle } = useContext(SpotifyAuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    if (loading === "success") {
      setIdle()
    }
  }, [loading])

  const [inputString, setInputString] = useState<string>("")

  const debouncedInputString = useDebounce({ value: inputString, delay: 100 })

  const { artists, loading: loadingArtits } = useSearchArtists({
    query: debouncedInputString,
    token,
    limit: 50,
  })

  const [selectedArtits, setSelectedArtits] = useState<SearchArtist[]>([])

  useEffect(() => {
    console.log(selectedArtits)
  }, [selectedArtits])

  useEffect(() => {
    console.log({
      inputString,
      debouncedInputString,
      artists,
    })
  }, [inputString, debouncedInputString, artists])

  return (
    <Container sx={{ paddingTop: "32px" }}>
      <Stack>
        <Autocomplete
          multiple
          fullWidth
          options={artists}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={selectedArtits}
          onChange={(_, data) => setSelectedArtits(data)}
          inputValue={inputString}
          onInputChange={(_, data) => setInputString(data)}
          getOptionLabel={(option) => option.name}
          filterOptions={(option) => option}
          renderOption={(props, { name, id }) => (
            <li key={id} {...props}>
              <p>
                <span>{name}</span>
                <br />
                <span>{id}</span>
              </p>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Artits"
              placeholder="Search artists"
            />
          )}
          sx={{ width: "100%" }}
          loading={loadingArtits === "pending"}
        />
      </Stack>
    </Container>
  )
}
