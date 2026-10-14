# 002 — Replace the drawer with a navbar and sub navbar

| | |
|---|---|
| **Status** | Approved — 2026-10-14 |
| **Created** | 2026-10-14 |
| **Owner** | Linus Håkansson |
| **Input** | Structured interview, 2026-10-14 |
| **Follow-ups** | Execution per `plan.md` / `tasks.md` in this folder |

## 1. Problem statement

Navigation today is a fixed left icon rail (`mini-drawer`, 40px wide) that expands a larger drawer on pointer hover (`src/components/drawer.vue`). It is clunky:

- It is hover-driven: the drawer opens on `pointerenter` and closes 300 ms after `mouseleave`; a small wrong movement dismisses it.
- On touch devices the hover never fires, so the labeled drawer is effectively unreachable; tapping an icon navigates directly and the labels are never seen.
- The rail permanently consumes layout width: `src/views/projectsView.vue` and `src/components/gallery.vue` hardcode margins around `calc(var(--mini-drawer-width) + …)`.
- There is no persistent overview of the site's sections and no "where am I" indicator beyond the small icon highlight; social links are buried inside the hover drawer.

## 2. Goal

After this change:

1. A clear two-tier navigation replaces the drawer: a top **navbar** with the site name, social links, language switcher and theme toggle; directly below it a **sub navbar** listing the four routes with the active route highlighted.
2. The drawer and the icon rail are gone completely, including `--mini-drawer-width` and every layout offset that depended on it.
3. On small screens (< 768px) the navigation collapses into a burger menu that still reaches every route, every social link and both controls.

## 3. Non-goals (out of scope)

- No new routes, pages, or in-page section anchors: the sub navbar lists exactly the four existing routes (Home, Skills, Projects, Experience). Growing real sub items is a possible later change, not this one.
- No redesign of view content; only the offset/margin adjustments required because the rail is gone.
- No changes to the i18n setup, theme store, router, or dependencies.
- No changes to `scrollToTop` behaviour.
- No automations (CI, deploy scripts) — deployment stays a manual `gh-pages` subtree push.

## 4. Affected surfaces

| Surface | Today | Target |
|---|---|---|
| `src/App.vue` | `.top-controls` header (language + theme) and `<Drawer>` | composes `navbar` + `subNavbar`; drawer import/usage removed |
| `src/components/drawer.vue` | rail + hover drawer, routes + socials | deleted |
| New: `src/components/navbar.vue` | — | top bar: brand, socials, language switcher, theme toggle, mobile burger |
| New: `src/components/subNavbar.vue` | — | the four routes, active route highlighted |
| New: `src/service/nav.js` | — | ordered nav item list (`path` + i18n label key) |
| `src/assets/base.css` | `--mini-drawer-width: 40px` | variable removed |
| `src/views/projectsView.vue` | 2 rail-based margins | plain margins, no rail offset |
| `src/components/gallery.vue` | 3 rail-based margins | plain margins, no rail offset |
| `src/locales/{en,sv,fr,de}.js` | `nav.*` labels, `header.switchTheme` | reuse; add one new key for the burger menu label (all four) |
| `dist/` (committed) | build output with the drawer | rebuilt with the new navigation |
| `origin/gh-pages` (deployed) | served build with the drawer | refreshed via the usual manual subtree push |

## 5. Requirements (FR)

- **FR-1 Navbar.** New presentational component `src/components/navbar.vue`: brand = `socials.name` from `src/service/socials.js`, linked to home; social links (GitHub, LinkedIn, Facebook) and the existing `languageSwitcher` + `themeToggle` components on the right; fixed at the top of the viewport above content; replaces the `.top-controls` header in `src/App.vue`. Styles `<style scoped>` using existing CSS variables so dark and light modes both look right.
- **FR-2 Sub navbar.** New presentational component `src/components/subNavbar.vue`: renders the four routes as links, directly below the navbar, on every route. The active route is visually highlighted (same treatment idea as today's drawer active state). Works with hash routing (`createWebHashHistory`) — use `RouterLink`/`$route` matching, not raw `location` checks.
- **FR-3 Nav data service.** `src/service/nav.js` exports the ordered items `[{ path, labelKey }]` (`/` → `nav.home`, `/skills` → `nav.skills`, `/projects` → `nav.projects`, `/experience` → `nav.experience`). Components stay presentational; a future sub item is a data change, not a markup change.
- **FR-4 Drawer removal.** Delete `src/components/drawer.vue`; remove its import, registration and template usage from `src/App.vue`. `App.vue` keeps only navbar composition, `RouterView` and `scrollToTop`.
- **FR-5 Rail removal.** Delete `--mini-drawer-width` from `src/assets/base.css`; remove its five usages (`projectsView.vue` ×2, `gallery.vue` ×3). No occurrence of `mini-drawer` remains anywhere in `src/`.
- **FR-6 Layout.** Content always starts below the two bars and nothing is hidden behind them (including after scrolling, on all four routes). Space freed by the rail is reclaimed: content uses full width with sensible padding on desktop. The gallery modal must stay above the navigation; `scrollToTop` keeps working.
- **FR-7 Mobile (< 768px).** The top bar shows the brand and a burger button; the burger toggles a menu containing the four routes (active highlighted), the social links, the language switcher and the theme toggle. The menu closes on route change, overlay click and Escape. The burger exposes `aria-label` and `aria-expanded`. No hover-only interaction anywhere.
- **FR-8 i18n.** All labels come from the locale files (`nav.*`, `header.switchTheme`). Add the burger label as a new key (e.g. `nav.menu`) to all four locales (`en`, `sv`, `fr`, `de`) with real translations. No hardcoded user-facing strings.
- **FR-9 No dead code.** No unused imports, styles, or leftovers from the drawer/rail; new components follow repo conventions (lowercase filenames, presentational, scoped styles, `@` alias imports).
- **FR-10 Build and deploy.** `npm run build` succeeds; committed `dist/` is rebuilt; deployment is the usual manual `gh-pages` subtree push (the site is served from committed artifacts).

## 6. Success criteria

- **SC-1** `npm run build` succeeds.
- **SC-2** Manual pass in `npm run dev`: all four routes render navbar + sub navbar, the correct item is highlighted, navigation works by mouse and keyboard; no drawer or rail anywhere; content is not overlapped by the bars at desktop width.
- **SC-3** Mobile-width pass: burger opens/closes (route change, overlay, Escape), every route, social link, language and theme control is reachable; layout looks right.
- **SC-4** All four locales show translated labels and the theme toggle flips the new bars correctly; no vue-i18n console warnings.
- **SC-5** Grepping `src/` for `mini-drawer` and `drawer` returns no matches; `drawer.vue` is gone and `App.vue` has no leftovers.
- **SC-6** Rebuilt `dist/` contains the new navigation; after the subtree push the live site serves it (spot check with a cache-buster).

## 7. Decisions log (interview)

| Topic | Decision |
|---|---|
| Structure | Top navbar + sub navbar, replacing the left rail/drawer |
| Top bar content | Site name (brand), socials, language switcher, theme toggle |
| Sub navbar content | The four routes again, active one highlighted — no new pages or anchors yet |
| Drawer | Removed completely; no icon rail |
| Mobile | Burger menu below ~768px |
| Mobile menu content | Routes, socials, language and theme live in the panel |
| Deploy | Unchanged: manual subtree push of `dist/` to `gh-pages` |

## 8. Constraints and notes

- Global element styles in `src/assets/base.css` (`li` is inline/floated with chip borders, `a` has a background) affect nav markup; the new components must override them in scoped styles, as the drawer does today.
- Active-state detection must keep working with hash routing (`/#/skills` etc.).
- Current z-index map: `scrollToTop` 2, old top controls 3, drawer container 4, gallery modal 3 (later in DOM). Pick navbar z-indices deliberately so the modal still covers the navigation.
- `.body-size` in `App.vue` has `min-height: calc(100vh - 93px)` tuned to old spacing; revisit it together with FR-6.
- No new dependencies.

## 9. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Fixed bars overlap route content (every view has ad-hoc margins) | One shared top offset (FR-6) + manual check of all four routes at desktop and mobile widths |
| Global `li`/`a` styles fight the new markup | Override in scoped styles, mirroring the drawer's approach |
| Navbar vs gallery modal z-index conflict | Keep navbar below the modal's stacking level; verify with an open project |
| Mobile menu usability/a11y regressions | FR-7 close paths + `aria-*`; manual phone-width check |
| Stale deployed site if `dist/` is not rebuilt/pushed | FR-10 is the last done criterion; deploy stays manual by design |
| Scope creep into restyling views | Non-goals; only rail-related offsets change |

## 10. Suggested sequencing (detailed in `plan.md` after approval)

1. Add `src/service/nav.js`, `navbar.vue`, `subNavbar.vue`; compose them in `App.vue`.
2. Delete the drawer; remove rail variable and all rail offsets; layout adjustments.
3. Add the burger label key to all four locales.
4. Build + manual verification (SC-1…SC-5).
5. Rebuild `dist/`, commit, deploy via the manual subtree push (SC-6).
