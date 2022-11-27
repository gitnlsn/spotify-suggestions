import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import { loadI18Next } from "./locales"

loadI18Next().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  )
  root.render(<App />)
})
