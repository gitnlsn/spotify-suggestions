import React from "react"
import { render } from "react-dom"
import { App } from "./App"
import { loadI18Next } from "./locales"

loadI18Next().then(() => {
  render(<App />, document.getElementById("root") as HTMLElement)
})
