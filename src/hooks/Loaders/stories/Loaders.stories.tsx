import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import React, { useContext, useState } from "react"
import {
  DevInfraProvider,
  ServerAuthContext,
} from "../../../contexts/DevInfra/DevInfraProvider"
import { useRecommendations } from "../useRecommendations"
import { useSearchArtists } from "../useSearchArtists"

export default {
  title: "Api/Loaders",
  component: DevInfraProvider,
  argsTypes: {},
}

const Consumer: React.FC = () => {
  const { loading: loadingAuthentication, forceLoad: forceLoadAuthentication } =
    useContext(ServerAuthContext)

  const { loading: loadingSearchArtists, forceLoad: forceLoadSearchArtists } =
    useSearchArtists({
      query: "elton john",
      limit: 1,
    })

  const [genres] = useState<string[]>(["samba"])
  const [artistIds] = useState<string[]>(["7x4So74vIUx3DaLk93JCFf"])

  const {
    loading: loadingRecommendations,
    forceLoad: forceLoadRecommendations,
  } = useRecommendations({
    genres,
    artistIds,
    limit: 1,
  })

  return (
    <Container>
      <Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hook</TableCell>
                <TableCell>Request State</TableCell>
                <TableCell>Reload</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>ServerAuthentication</TableCell>
                <TableCell>{loadingAuthentication}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      forceLoadAuthentication().catch(console.error)
                    }}
                  >
                    Reload
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>SearchArtists</TableCell>
                <TableCell>{loadingSearchArtists}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      forceLoadSearchArtists().catch(console.error)
                    }}
                  >
                    Reload
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Recommendations</TableCell>
                <TableCell>{loadingRecommendations}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      forceLoadRecommendations().catch(console.error)
                    }}
                  >
                    Reload
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  )
}

const Template = () => {
  return (
    <DevInfraProvider
      authentication={{
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? "",
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET ?? "",
      }}
    >
      <Consumer />
    </DevInfraProvider>
  )
}

export const Monitor = Template.bind({})
