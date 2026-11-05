import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import i18n, { languages, setLocale } from '@/i18n'
import LanguageSwitcher from '@/components/languageSwitcher.vue'

function mountSwitcher() {
  return mount(LanguageSwitcher, {
    global: {
      plugins: [i18n]
    }
  })
}

beforeEach(() => {
  localStorage.clear()
  setLocale('en')
})

describe('languageSwitcher', () => {
  it('renders one button per language', () => {
    const wrapper = mountSwitcher()

    const buttons = wrapper.findAll('button.language-button')
    expect(buttons).toHaveLength(languages.length)
    expect(buttons.map((button) => button.attributes('aria-label'))).toEqual(
      languages.map((language) => language.label)
    )
  })

  it('marks the current locale as active', () => {
    setLocale('sv')
    const wrapper = mountSwitcher()

    const active = wrapper.findAll('button.language-button.active')
    expect(active).toHaveLength(1)
    expect(active[0].attributes('aria-label')).toBe('Svenska')
  })

  it('switches the locale on click', async () => {
    const wrapper = mountSwitcher()

    await wrapper.find('button[aria-label="Deutsch"]').trigger('click')

    expect(i18n.global.locale).toBe('de')
    expect(wrapper.findAll('button.language-button.active')[0].attributes('aria-label')).toBe('Deutsch')
  })
})
