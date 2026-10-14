# 002 — Extending left sidebar (sub navbar)

| | |
|---|---|
| **Status** | Implemented — 2026-10-14 (revision R1) |
| **Created** | 2026-10-14 |
| **Owner** | Linus Håkansson |
| **Input** | Structured interview, 2026-10-14; design revision after implementation review |
| **Follow-ups** | Execution recorded in `plan.md` / `tasks.md` (Phase R); owner visual pass and `gh-pages` deploy remain |

> **Revision (2026-10-14):** The first implementation moved navigation to a top navbar with a route sub bar. Review rejected it: navigation must stay a **left sidebar with icons**, where **pressing an icon extends the sidebar to reveal the menu labels without hiding the icons**. The spec below records the corrected design and supersedes the first one (kept in git history / Phase A–D of `tasks.md`).

## 1. Problem statement

Navigation is a fixed left icon rail (`mini-drawer`, 40px) that expands a *separate* drawer on pointer hover (`drawer.vue`). It is clunky:

- Hover-driven: the drawer opens on `pointerenter` and closes 300 ms after `mouseleave`; a wrong movement dismisses it, and touch devices never see it.
- The opened drawer (250px, `z-index` above the rail) **slides over and hides the rail icons**, so icons and labels are never visible at the same time.
- Labels are only reachable through hover; pressing an icon navigates instantly, so an accidental press while browsing is easy.

## 2. Goal

After this change:

1. The left sidebar stays: icons for the four routes (Home, Skills, Projects, Experience) and the three socials (GitHub, LinkedIn, Facebook) are always visible.
2. **Pressing an icon extends the sidebar in place** (40px → ~220px) so labels appear next to the icons. The icons remain visible and in the same position the whole time — no separate drawer, no hiding.
3. Labels are the navigation targets: route labels navigate (and collapse the sidebar), social labels open external links.
4. **Outside click, Escape, pressing an icon again, or a route change collapse** the sidebar.
5. Language switcher and theme toggle return to the floating top-right controls (`.top-controls`) as before the first implementation.
6. Below 768px the rail becomes a burger button that opens the same icon + label panel as an overlay.

## 3. Non-goals (out of scope)

- No top bars: the top navbar and route sub bar from the first implementation are removed (revision R1).
- No hover-open behaviour: opening is press-only.
- No new routes, pages, or in-page anchors.
- No redesign of view content; only the rail-offset margins (projects grid, gallery) are restored.
- No changes to the i18n setup, theme store, router, or dependencies.

## 4. Affected surfaces

| Surface | Today | Target |
|---|---|---|
| `src/components/navbar.vue`, `subNavbar.vue`, `navLinks.vue` | top navbar + route sub bar (first implementation) | deleted |
| New: `src/components/sidebar.vue` | — | fixed left rail; press-to-extend; labels; mobile burger + overlay panel |
| `src/App.vue` | composed top navbar + sub navbar | restore `.top-controls` (language + theme); compose `sidebar`; mobile top padding for floating chrome |
| `src/service/nav.js` | route items (`path`, `labelKey`) | adds `icon` class per item |
| `src/assets/base.css` | `--navbar-height`, `--sub-navbar-height` | `--sidebar-width: 40px`, `--sidebar-expanded-width: 220px` |
| `src/views/projectsView.vue` | plain margins | rail-offset margins restored (desktop), compact mobile margins |
| `src/components/gallery.vue` | plain margins | rail-offset margins restored (desktop), compact mobile margins |
| `src/views/skillsView.vue` | mobile `padding-top` for the old floating controls | removed (global mobile padding covers the chrome) |
| `src/locales/{en,sv,fr,de}.js` | `nav.menu` added | unchanged (burger label) |
| `dist/`, `origin/gh-pages` | built with the top bars | rebuilt, then deployed via the usual manual subtree push |

`src/components/drawer.vue` (deleted in the first implementation) stays deleted; its role is taken over by `sidebar.vue` without the separate-drawer hover behaviour.

## 5. Requirements (FR)

- **FR-1 Rail.** `sidebar.vue` renders a fixed left sidebar with an icon column: the four routes (from `src/service/nav.js`, active route highlighted) and the three socials. Icons are always visible. Overrides the global `li`/`a` styles in scoped CSS, like the old rail did. Uses existing CSS variables so dark and light modes work.
- **FR-2 Extend on press.** Pressing any icon toggles the expanded state. The sidebar width animates from `--sidebar-width` to `--sidebar-expanded-width`; labels fade in beside the icons; the icons do not move or hide. No hover trigger.
- **FR-3 Labels navigate.** Route labels are `RouterLink`s: clicking navigates and collapses the sidebar. Social labels are external links opening in a new tab. While collapsed, labels are hidden and not focusable (`visibility: hidden`).
- **FR-4 Collapse.** Overlay click (transparent click-catcher over the page), Escape, pressing an icon again, and route changes collapse the sidebar.
- **FR-5 Top-right controls.** Language switcher and theme toggle return to the floating top-right `.top-controls` header exactly as before the first implementation.
- **FR-6 Mobile (< 768px).** The rail is replaced by a burger button (fixed top-left) that toggles the sidebar as an off-canvas overlay panel with icons + labels. The burger sits above the panel and doubles as the close toggle; the panel keeps top padding so the burger stays visible. Overlay click, Escape and route change also close it.
- **FR-7 Layout.** Restore the rail offsets in `projectsView.vue` (content margin next to the rail) and `gallery.vue` (header/grid/link margins) using `--sidebar-width`; compact mobile margins where the rail no longer exists on small screens. `.body-size` gains a mobile top padding so content clears the burger and the floating controls. On desktop, content spacing (e.g. projects grid top margin) returns to its original values.
- **FR-8 i18n.** Reuse `nav.*` labels and the `nav.menu` burger label; no new user-facing strings are needed. All four locales stay in sync.
- **FR-9 No dead code.** `navbar.vue`, `subNavbar.vue`, `navLinks.vue` and the `--navbar-height`/`--sub-navbar-height` variables are removed; no top-bar leftovers in `src/`.
- **FR-10 Build and deploy.** `npm run build` succeeds; committed `dist/` is rebuilt; deployment stays the manual `gh-pages` subtree push.

## 6. Success criteria

- **SC-1** `npm run build` succeeds.
- **SC-2** Desktop pass (dev/preview, mouse + keyboard): rail visible with icons on all four routes and the correct route highlighted; pressing an icon extends the sidebar and the icons stay visible; clicking a label navigates and collapses; Escape, overlay click and pressing the icon again collapse it.
- **SC-3** Mobile-width pass: burger visible, rail off-canvas; burger opens the panel with icons + labels; every route, social link, language and theme control is reachable; no overlap of content with the floating chrome.
- **SC-4** All four locales show translated labels; dark and light themes render the sidebar correctly; no vue-i18n console warnings.
- **SC-5** Grepping `src/` for `navbar`, `subNavbar`, `navLinks`, `navbar-height` and `mini-drawer` returns no matches; no dead components remain.
- **SC-6** Rebuilt `dist/` contains the sidebar; after the subtree push the live site serves it (cache-busted spot check).

## 7. Decisions log (interview + revision)

| Topic | Decision |
|---|---|
| Structure (R1) | Left sidebar only; no top bars; language + theme float top-right as before |
| Icons (R1) | Route icons + social icons always visible in the rail |
| Extend (R1) | Pressing an icon extends the sidebar in place; icons never hidden; overlay extends over content without reflow |
| Press behaviour (R1) | Press = extend/close toggle; label = navigate (route) or open (social) |
| Collapse (R1) | Outside click, Escape, second press, route change |
| Mobile (R1) | Burger top-left opens the same icon + label panel as an overlay |
| First design | Top navbar + route sub bar — implemented, then rejected and removed (kept in git history) |
| Sub navbar term | Realised as the sidebar's expanding label panel, not a separate top bar |
| Deploy | Unchanged: manual subtree push of `dist/` to `gh-pages` |

## 8. Constraints and notes

- Global element styles in `src/assets/base.css` (`li` inline/floated with borders, `a` with background) affect the sidebar markup; override them in scoped styles, as the old rail/drawer did.
- Active state uses `$route.path === item.path`; works with hash routing.
- Stacking kept as the original: sidebar group `z-index: 4` (above the gallery modal at 3, like the old rail), `.top-controls` 3, `scrollToTop` 2.
- `--sidebar-width`/`--sidebar-expanded-width` are the single source for rail dimensions and content offsets.
- The spec folder keeps its original name (`002-sub-navbar`) although the design changed; this document supersedes the title.
- No new dependencies.

## 9. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Collapsed labels still clickable/focusable | `visibility: hidden` + `pointer-events` while collapsed; keyboard check in SC-2 |
| Mobile burger overlapping content or panel rows | Panel top padding on mobile; `.body-size` top padding; visual pass at 390px (SC-3) |
| Rail offsets missed in one view after the rework | Grep for `--sidebar-width` usages + screenshots of projects/gallery on desktop and mobile |
| Global `li`/`a` styles bleeding into the sidebar | Scoped overrides, same approach as the original rail |
| Content jump when extending (reflow) | Extending overlays content (fixed sidebar); no layout change |
| Top-bar leftovers (CSS vars, components) | Removal grep in SC-5 |

## 10. Suggested sequencing (detail in `plan.md`)

1. Write `sidebar.vue` (rail, extend, labels, collapse, mobile burger).
2. Update `nav.js` (icons), `base.css` (vars), `App.vue` (top controls + sidebar).
3. Restore rail offsets (projects, gallery); drop the old mobile compensations.
4. Delete the first-implementation components; leftover greps.
5. Build + headless interaction pass (desktop + mobile); owner visual pass.
6. Rebuild `dist/`, commit; deploy via the manual subtree push.
