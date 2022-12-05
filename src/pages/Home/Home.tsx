import React, { useContext, useEffect } from "react"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getAuthorizeUrl } from "../../utils/getAuthorizeUrl"
import { SpotifyAuthContext } from "../../contexts/SpotifyAuth/SpotifyAuthContext"
import { SpotifyTokenContext } from "../../contexts/SpotifyToken/SpotifyTokenContext"

export const Home: React.FC = () => {
  const { t: homeText } = useTranslation("home")

  const authorizeUrl = getAuthorizeUrl()

  const { token } = useContext(SpotifyTokenContext)
  const { setAuthorizationCode } = useContext(SpotifyAuthContext)

  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const code = searchParams.get("code")

  useEffect(() => {
    if (!code) {
      return
    }

    setAuthorizationCode(code)
    setSearchParams((prev) => {
      prev.delete("code")
      return prev
    })
  }, [code, setAuthorizationCode, setSearchParams])

  useEffect(() => {
    if (token) {
      navigate("/recommendations")
    }
  }, [token, navigate])

  const onClickAuthorize = () => {
    if (!token) {
      window.location.assign(authorizeUrl)
    } else {
      navigate("/recommendations")
    }
  }

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h2">{homeText("welcome-title")}</Typography>
          <Typography variant="h4">{homeText("welcome-content")}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={onClickAuthorize}>
            {homeText("welcome-login-button")}
          </Button>
        </CardActions>
      </Card>
    </Container>
  )
}
