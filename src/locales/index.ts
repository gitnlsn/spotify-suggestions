import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import home from "./en/home.json"

const resources = {
  en: {
    home,
  },
}

/**
 * i18next internationalization configurations.
 */
export const loadI18Next = async () => {
  return i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  })
}
