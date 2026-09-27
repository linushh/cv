import { createI18n } from 'vue-i18n'

import en from '@/locales/en'
import sv from '@/locales/sv'
import fr from '@/locales/fr'
import de from '@/locales/de'

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'sv', label: 'Svenska' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' }
]

const messages = { en, sv, fr, de }

function getLocale() {
  const saved = localStorage.getItem('locale')
  if (saved && saved in messages) {
    return saved
  }

  const browser = navigator.language.slice(0, 2)
  return browser in messages ? browser : 'en'
}

export function setLocale(locale) {
  i18n.global.locale = locale
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale)
}

const i18n = createI18n({
  legacy: true,
  locale: getLocale(),
  fallbackLocale: 'en',
  messages
})

setLocale(i18n.global.locale)

export default i18n
