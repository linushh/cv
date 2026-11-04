import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

function fail(message) {
  console.error(`build check failed: ${message}`)
  process.exit(1)
}

const indexPath = join(dist, 'index.html')
const notFoundPath = join(dist, '404.html')

if (!existsSync(indexPath)) fail('dist/index.html is missing')
if (!existsSync(notFoundPath)) fail('dist/404.html is missing')

const index = readFileSync(indexPath, 'utf8')
const notFound = readFileSync(notFoundPath, 'utf8')
if (index !== notFound) fail('dist/404.html is not identical to dist/index.html')

const refs = [...index.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1])
const absoluteRefs = refs.filter((ref) => ref.startsWith('/'))

const wrongBase = absoluteRefs.filter((ref) => !ref.startsWith('/cv/'))
if (wrongBase.length > 0) {
  fail(`asset URLs outside the /cv/ base: ${wrongBase.join(', ')}`)
}

const assetRefs = absoluteRefs.filter((ref) => ref.startsWith('/cv/assets/'))
if (assetRefs.length === 0) fail('no /cv/assets/ references found in dist/index.html')

const missing = assetRefs.filter((ref) => !existsSync(join(dist, ref.replace(/^\/cv\//, ''))))
if (missing.length > 0) fail(`referenced assets missing from dist/: ${missing.join(', ')}`)

console.log('build check ok')
