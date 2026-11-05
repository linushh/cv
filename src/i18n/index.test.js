import { beforeEach, describe, expect, it, vi } from 'vitest'

function stubBrowserLanguage(language) {
  vi.stubGlobal('navigator', { ...navigator, language })
}

async function importI18n() {
  vi.resetModules()
  return (await import('@/i18n')).default
}

beforeEach(() => {
  localStorage.clear()
  vi.unstubAllGlobals()
  document.documentElement.removeAttribute('lang')
})

describe('locale detection', () => {
  it('uses the saved locale when it is supported', async () => {
    localStorage.setItem('locale', 'sv')
    stubBrowserLanguage('en-US')

    const i18n = await importI18n()

    expect(i18n.global.locale).toBe('sv')
  })

  it('ignores an unsupported saved locale', async () => {
    localStorage.setItem('locale', 'ja')
    stubBrowserLanguage('fr-FR')

    const i18n = await importI18n()

    expect(i18n.global.locale).toBe('fr')
  })

  it('uses the browser language when nothing is saved', async () => {
    stubBrowserLanguage('de-DE')

    const i18n = await importI18n()

    expect(i18n.global.locale).toBe('de')
  })

  it('falls back to en for an unsupported browser language', async () => {
    stubBrowserLanguage('ja-JP')

    const i18n = await importI18n()

    expect(i18n.global.locale).toBe('en')
  })
})

describe('setLocale', () => {
  it('updates the active locale, localStorage and <html lang>', async () => {
    const { default: i18n, setLocale } = await import('@/i18n')

    setLocale('fr')

    expect(i18n.global.locale).toBe('fr')
    expect(localStorage.getItem('locale')).toBe('fr')
    expect(document.documentElement.getAttribute('lang')).toBe('fr')
  })
})
