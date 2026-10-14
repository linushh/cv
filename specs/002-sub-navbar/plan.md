# Plan: 002 — Replace the drawer with a navbar and sub navbar

Implements `specs/002-sub-navbar/spec.md` (FR-1…FR-10, SC-1…SC-6). Written before implementation changes; execution follows `tasks.md` in this folder.

## Approach overview

Three building blocks:

1. **New navigation components** — `src/service/nav.js` (data), `src/components/navLinks.vue` (generic route list, horizontal or vertical), `src/components/navbar.vue` (top bar + mobile burger menu), `src/components/subNavbar.vue` (second bar). `App.vue` composes them and passes service data as props (presentational components, data in services).
2. **Removal of the drawer/rail** — delete `drawer.vue`; remove rail offsets (`--mini-drawer-width` and its 5 usages); give `.body-size` a top padding for the fixed bars.
3. **Rebuild + verify** — `npm run build`, commit the refreshed `dist/`; deploy stays the manual `gh-pages` subtree push and waits until the manual visual pass passes.

No router changes: the four routes and hash history stay as they are. No new dependencies.

## Key decisions and gotchas

| Topic | Detail |
|---|---|
| Component split | `navLinks.vue` renders the route list once, reused horizontally (sub navbar, desktop) and vertically (burger panel, mobile) — avoids duplicated markup across two components. |
| Active state | `$route.path === item.path` (same rule as the old drawer's `isActive`). Works with `createWebHashHistory`; do not rely on `router-link-active` (the home route `/` would match every route). |
| Global element styles | `base.css` styles `li` inline/floated with chip borders and `a` with a background. Nav components override these in scoped styles, as the drawer did. |
| Fixed bars + content | `.body-size` gets `padding-top: calc(var(--navbar-height) + var(--sub-navbar-height))` (mobile: navbar height only). `box-sizing: border-box` is global, so `min-height: 100vh` still includes the padding. |
| Dimensions | New roots in `base.css`: `--navbar-height: 56px`, `--sub-navbar-height: 44px`, replacing the `--mini-drawer-width` block. |
| Z-index map | Navbar/sub navbar `z-index: 2` (content is unpositioned), below the gallery modal (`z-index: 3`) so the modal still covers the navigation; `scrollToTop` stays at 2 (bottom-right, no overlap). The burger sits at `z-index: 2` inside the navbar so the transparent overlay (z 1) cannot block it. |
| Breakpoint | 768px, as used across the repo. Below it: burger visible, desktop tools and sub navbar hidden. |
| Mobile menu close paths | Route change, overlay click, Escape. `aria-label` + `aria-expanded` from the new `nav.menu` key. |
| Rail offsets | `projectsView.vue` (grid margin) and `gallery.vue` (3 margins) lose their `--mini-drawer-width` math and revert to plain `2rem` padding. Top margin `5rem` on the projects grid drops to `2rem` because the fixed bars now provide the clearance. |
| i18n | Reuse `nav.home|skills|projects|experience` and `header.switchTheme`; add `nav.menu` to all four locales. |
| Verification | Build + greps (no `mini-drawer`, no `drawer.vue`), locale-key parity script, production preview; visual pass in dev by the owner (desktop + mobile widths, 4 locales, light/dark). |
| Deploy | Manual `git subtree push --prefix dist origin gh-pages` only after the visual pass passes. |

## File changes

| File | Change |
|---|---|
| `src/service/nav.js` | new: ordered `[{ path, labelKey }]` items + `getNavItems()` |
| `src/components/navLinks.vue` | new: generic route list with active highlight, `vertical` prop |
| `src/components/navbar.vue` | new: brand, socials, `languageSwitcher`, `themeToggle`, burger + mobile menu |
| `src/components/subNavbar.vue` | new: horizontal bar wrapping `navLinks`, hidden < 768px |
| `src/components/drawer.vue` | delete |
| `src/App.vue` | compose `navbar` + `subNavbar`; remove drawer and `.top-controls`; `body-size` padding |
| `src/assets/base.css` | `--mini-drawer-width` → navbar/sub-navbar height variables |
| `src/views/projectsView.vue` | rail margins → plain grid margins |
| `src/components/gallery.vue` | 3 rail margins → `2rem` |
| `src/locales/{en,sv,fr,de}.js` | add `nav.menu` |
| `dist/**` | rebuilt and committed (unchanged policy) |

## Commit strategy

1. `docs: add plan and tasks for navbar/sub-navbar rework` (spec status → approved, plan, tasks)
2. `feat: replace drawer with top navbar and sub navbar` (sources + locales)
3. `chore: rebuild dist`
4. `docs: mark spec and tasks complete` (checkboxes, status)

## Verification strategy (SC mapping)

| SC | Check |
|---|---|
| SC-1 | `npm run build` succeeds |
| SC-2/3/4 | Production preview at desktop and phone widths, all four routes, burger open/close paths, 4 locales, theme toggle; owner does the visual pass in `npm run dev` |
| SC-5 | `grep -rn "mini-drawer\|drawer" src/` → no matches; `drawer.vue` gone; `App.vue` has no leftovers |
| SC-6 | `dist/` grep contains the new nav chunks and no drawer references; after deploy, cache-busted spot check of the live bundle |

## Rollback

- Everything is local to the branch until the deploy step: `git reset --hard master` (or delete the branch) discards the change.
- After deploy: redeploy the previous `dist/` (the prior commit's subtree) via the same manual push.

## Execution prerequisites checklist

- [x] Spec approved; branch `feature/sub-navbar` created
- [x] Plan/tasks written
- [x] Working tree clean before implementation
