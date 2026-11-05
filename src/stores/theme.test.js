import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useThemeStore } from '@/stores/theme'

function stubSystemTheme(lightPreferred) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query) => ({
      matches: query === '(prefers-color-scheme: light)' ? lightPreferred : false,
      media: query,
    })),
  )
}

beforeEach(() => {
  localStorage.clear()
  vi.unstubAllGlobals()
  document.body.classList.remove('light-mode')
  setActivePinia(createPinia())
})

describe('theme store', () => {
  it('uses the saved theme', () => {
    localStorage.setItem('theme', 'light')
    stubSystemTheme(false)

    const store = useThemeStore()
    store.init()

    expect(store.theme).toBe('light')
    expect(document.body.classList.contains('light-mode')).toBe(true)
  })

  it('uses the system light preference when nothing is saved', () => {
    stubSystemTheme(true)

    const store = useThemeStore()
    store.init()

    expect(store.theme).toBe('light')
  })

  it('defaults to dark', () => {
    stubSystemTheme(false)

    const store = useThemeStore()
    store.init()

    expect(store.theme).toBe('dark')
    expect(document.body.classList.contains('light-mode')).toBe(false)
  })

  it('toggle flips the theme, saves it and toggles the light-mode class', () => {
    stubSystemTheme(false)

    const store = useThemeStore()
    store.init()

    store.toggle()

    expect(store.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.body.classList.contains('light-mode')).toBe(true)

    store.toggle()

    expect(store.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.body.classList.contains('light-mode')).toBe(false)
  })
})
