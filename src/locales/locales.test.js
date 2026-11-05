import { describe, expect, it } from 'vitest'

import en from '@/locales/en'
import sv from '@/locales/sv'
import fr from '@/locales/fr'
import de from '@/locales/de'

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return value !== null && typeof value === 'object' ? flattenKeys(value, path) : [path]
  })
}

const reference = flattenKeys(en).sort()

describe.each([
  ['sv', sv],
  ['fr', fr],
  ['de', de],
])('locale parity: %s', (locale, messages) => {
  const keys = flattenKeys(messages).sort()

  it('has no keys missing from en', () => {
    const missing = reference.filter((key) => !keys.includes(key))
    expect(missing, `${locale} is missing keys: ${missing.join(', ')}`).toEqual([])
  })

  it('has no extra keys not in en', () => {
    const extra = keys.filter((key) => !reference.includes(key))
    expect(extra, `${locale} has extra keys: ${extra.join(', ')}`).toEqual([])
  })
})
