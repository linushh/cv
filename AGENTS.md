# AGENTS.md

Personal CV website. Fun side project, not a product — keep changes simple and pragmatic.

## Commands

- `npm run dev` — start dev server (http://localhost:5173/cv/)
- `npm run build` — production build to `dist/`; a `postbuild` check fails the build if `dist/` is missing `index.html`/`404.html` or serves assets outside `/cv/`
- `npm run preview` — serve the production build
- `npm run lint` — ESLint over `src/` and root config files (fails on warnings too)
- `npm run lint:fix` — same, with `--fix`
- `npm run format` — format the codebase with Prettier
- `npm run format:check` — check formatting without writing
- `npm test` — run the unit tests once (Vitest + jsdom); `npm run test:watch` for watch mode. Tests live beside the code as `*.test.js` and also run in the deploy workflow before the build

## Deploy

Deploy by pushing to `master` — the `deploy.yml` GitHub Actions workflow runs lint and tests, builds and publishes to GitHub Pages (no local steps, no `gh-pages` subtree). `dist/` is not committed. The workflow can also be re-run by hand from the Actions tab.

Verify changes with `npm run lint`, `npm run build`, `npm test`, and a manual check in `npm run dev`.

## Stack

- Vue 3 (Composition or Options API — match the file you're editing)
- Vite 7 (config in `vite.config.js`, base path is `/cv/`, `@` aliases to `src/`)
- Vue Router 4 (`src/router/index.js`)
- Pinia (`src/stores/`)
- vue-i18n 11 (`src/i18n/index.js`, legacy mode — `$t()` in templates)
- vue3-lazyload for images
- Font Awesome 6 for icons

## Structure

- `src/views/` — route-level pages (homeView, experienceView, skillsView, projectsView)
- `src/components/` — shared components (lowercase filenames: card, drawer, footer, gallery, languageSwitcher)
- `src/i18n/` — vue-i18n instance, locale handling (localStorage + browser detection)
- `src/locales/` — translation dictionaries (en, sv, fr, de); all UI copy lives here, not hardcoded in components
- `src/service/` — data providers (e.g. `socials.js`); prefer keeping content/data in services rather than hardcoding in components
- `src/stores/` — Pinia stores
- `src/assets/` — css (`main.css`, `base.css`) and images, organized in subfolders per topic

## Conventions

- Plain JS (jsconfig.json), no TypeScript — don't introduce it unprompted
- Use the `@` alias for imports from `src/`
- Match existing component style (script setup vs options API) when editing a file
- Don't add dependencies without asking first
- Any new user-facing string must be added to all four locale files (en, sv, fr, de)
- vue-i18n runs in legacy mode: dynamic values use list interpolation — `$t('key', [value])` with `'{0}'` in the message; named-object args (`$t('key', { n })`) throw "Invalid arguments"

## Code quality goals

- Clean code: small files, descriptive names, no dead code, no leftover comments
- Reusable generic components: buttons, cards, badges etc. live in `src/components/`, take variation via props — never duplicate markup across views
- Components are presentational: data comes in via props, content/data lives in `src/service/`
- Always use `<style scoped>` in components so styles don't leak globally
- Views compose components; they should not contain reusable markup themselves
