# Plan: 002 — Extending left sidebar (sub navbar)

Implements `specs/002-sub-navbar/spec.md` (FR-1…FR-10, SC-1…SC-6). Revised 2026-10-14 after the first implementation (top navbar + route sub bar) was rejected in review; this plan covers the corrected design.

## Approach overview

Four building blocks:

1. **`sidebar.vue`** — one component for the whole navigation:
   - fixed left rail (`--sidebar-width: 40px`) with icons: four routes (from `service/nav.js`, active highlighted) + three socials;
   - `isExpanded` state: pressing any icon toggles it; width animates to `--sidebar-expanded-width: 220px`; labels fade in beside the fixed icon column;
   - labels are the targets: `RouterLink` for routes (navigate + collapse), `<a target="_blank">` for socials;
   - collapse paths: transparent full-screen overlay click, Escape, second press, `$route` watcher;
   - mobile (< 768px): burger fixed top-left toggles the same panel as an off-canvas overlay; burger stays above the panel as the close toggle.
2. **Restore the original chrome** — `App.vue` gets `.top-controls` (language + theme) back; `.body-size` gains a mobile top padding so content clears the burger/controls.
3. **Restore rail-based layout** — `--sidebar-width` replaces the navbar height vars; projects grid and gallery margins return to rail offsets (desktop) with compact mobile variants; `skillsView`'s mobile `padding-top` (old floating-control compensation) is removed since the global padding covers it.
4. **Remove the first implementation** — delete `navbar.vue`, `subNavbar.vue`, `navLinks.vue`; `drawer.vue` stays deleted; `nav.menu` locale key stays (burger label).

## Revision R1 (what changed vs the first implementation)

| First implementation | Revision |
|---|---|
| Fixed top navbar (brand, socials, controls) | Removed; socials back in the left rail; controls back top-right |
| Horizontal route sub bar below the navbar | Removed; routes are rail icons + labels revealed by extending |
| `navLinks.vue` shared route list | Removed; sidebar renders its own rows (icon + label) |
| `nav.menu` burger on mobile only | Kept; burger is now also the rail's mobile form |
| `--navbar-height`/`--sub-navbar-height` | Replaced by `--sidebar-width`/`--sidebar-expanded-width` |

## Key decisions and gotchas

| Topic | Detail |
|---|---|
| Extend semantics | Press = toggle. When expanded, labels are visible; pressing any icon (including the same one) collapses. Navigation happens only through labels. |
| No hover | The old `pointerenter`/`mouseleave` timers are gone; opening is click/press only. |
| Overlay | Transparent full-screen click-catcher rendered when expanded (desktop and mobile); clicking outside collapses. |
| Icon column | Icons keep a fixed 40px column inside the growing sidebar so they never shift; labels occupy the remaining width and clip via `overflow: hidden` during the width animation. |
| Labels collapsed | `visibility: hidden` so they are neither clickable nor tabbable while collapsed. |
| Mobile | `left`-based off-canvas slide (width fixed at expanded size), panel top padding so the burger (z above panel) stays visible as the close toggle. |
| Top padding | `.body-size` gets `padding-top: 3.5rem` only ≤768px; desktop keeps the original `min-height: calc(100vh - 93px)`. |
| `skillsView` | Remove its mobile `padding-top: 3.5rem` (was for the pre-revision floating controls; now double padding). |
| Gallery | Rail offsets restored on desktop; new mobile override sets left/right margins to `1rem` because the rail no longer exists there. |
| z-index | Sidebar root `4` (as the old drawer root), overlay/panel/burger inside it; `.top-controls` `3`; gallery modal `3`; `scrollToTop` `2`. |
| i18n | No new keys; `nav.menu` (added earlier) is the burger label. |

## File changes

| File | Change |
|---|---|
| `src/components/sidebar.vue` | new: rail, extend behaviour, labels, collapse, mobile burger/overlay |
| `src/components/navbar.vue`, `subNavbar.vue`, `navLinks.vue` | delete |
| `src/service/nav.js` | items gain `icon` classes |
| `src/App.vue` | restore `.top-controls`; compose `sidebar`; mobile `.body-size` padding |
| `src/assets/base.css` | navbar height vars → sidebar width vars |
| `src/views/projectsView.vue` | rail offsets restored (desktop) + compact mobile margins |
| `src/components/gallery.vue` | rail offsets restored + mobile override |
| `src/views/skillsView.vue` | remove mobile `padding-top` |
| `src/locales/*` | unchanged (`nav.menu` already present) |
| `dist/**` | rebuilt and committed (unchanged policy) |

## Commit strategy

1. `docs: revise spec and plan for extending left sidebar` (spec/plan/tasks revision)
2. `feat: rework navigation into extending left sidebar` (sources)
3. `chore: rebuild dist`
4. `docs: mark revision complete` (status/checklists)

## Verification strategy (SC mapping)

| SC | Check |
|---|---|
| SC-1 | `npm run build` succeeds |
| SC-2 | Headless Chromium over CDP: rail + active icon per route; icon press expands (labels visible, icons unchanged); label click navigates + collapses; Escape/overlay/second press collapse; screenshots reviewed |
| SC-3 | Same at 390px width: burger visible, panel opens with icons + labels, close paths work, content not overlapped |
| SC-4 | Locale key parity script; light + dark screenshots; console warning grep |
| SC-5 | `grep -rn "navbar\|subNavbar\|navLinks\|navbar-height\|mini-drawer" src/` → no matches |
| SC-6 | `dist/` grep + cache-busted live check after the manual subtree push |

## Rollback

- Revert the revision commits (`git revert` or `git reset`) — everything is local to the branch until deploy.
- After deploy: push the previous `dist/` subtree again.

## Execution prerequisites checklist

- [x] Corrected design confirmed in review (left sidebar, press-to-extend, label navigation, burger on mobile)
- [x] Branch `feature/sub-navbar` present with the first implementation as history
- [x] Headless Chromium + CDP tooling working (`/tmp/opencode/cdp-test.mjs` pattern)
