# Tasks: 002 — Replace the drawer with a navbar and sub navbar

Execution checklist for `spec.md` / `plan.md`. Phases are ordered unless marked `[P]`. Each task lists its verification; checkpoint lines gate the next phase.

Legend: `[P]` parallelizable · `FR/SC` traceability to the spec.

---

## Phase A — Navigation data and components

- [ ] **A01** Create `src/service/nav.js` with the ordered items (`/` → `nav.home`, `/skills` → `nav.skills`, `/projects` → `nav.projects`, `/experience` → `nav.experience`) and `getNavItems()`. (*FR-3*)
- [ ] **A02** Create `src/components/navLinks.vue`: props `items` + `vertical`; `RouterLink` per item; active class via `$route.path === item.path`; overrides global `li`/`a` styles. (*FR-2*)
- [ ] **A03** Create `src/components/subNavbar.vue`: fixed bar below the navbar, centered `navLinks`, hidden under 768px. (*FR-2*)
- [ ] **A04** Create `src/components/navbar.vue`: brand (`socials.name`, links home), socials icons, language switcher, theme toggle; burger + mobile menu (vertical `navLinks`, socials, controls) with Escape/overlay/route-change close and `aria-*`. (*FR-1, FR-7*)

**Checkpoint A:** four new files exist, no existing file touched yet.

---

## Phase B — Wire up and remove the drawer/rail

- [ ] **B01** `src/App.vue`: compose `navbar` + `subNavbar` with service props; remove the `.top-controls` header and the drawer import/registration/usage; `body-size` top padding for the fixed bars (mobile: navbar only). (*FR-4, FR-6*)
- [ ] **B02** Delete `src/components/drawer.vue`. (*FR-4*)
- [ ] **B03** `src/assets/base.css`: replace the `--mini-drawer-width` block with `--navbar-height` and `--sub-navbar-height`. (*FR-5*)
- [ ] **B04** `src/views/projectsView.vue`: drop the two rail margins (base margin → `2rem` all around; mobile keeps one column). (*FR-5, FR-6*)
- [ ] **B05** `src/components/gallery.vue`: replace the three `calc(var(--mini-drawer-width) + 2rem)` margins with `2rem`. (*FR-5, FR-6*)
- [ ] **B06** Leftover check: `grep -rn "mini-drawer\|drawer" src/` → no matches. (*FR-9, SC-5*)

**Checkpoint B:** no drawer, no rail, no leftovers; navigation composed in `App.vue`.

---

## Phase C — i18n

- [ ] **C01 [P]** Add `nav.menu` (`Menu` / `Meny` / `Menu` / `Menü`) to `src/locales/en.js`, `sv.js`, `fr.js`, `de.js`. (*FR-8*)
- [ ] **C02** Locale parity check: all four dictionaries expose the same key set (node one-liner). (*FR-8*)

**Checkpoint C:** locale files consistent; burger label translated in all four.

---

## Phase D — Build and verify

- [ ] **D01** `npm run build` succeeds. (*SC-1*)
- [ ] **D02** Dist checks: built output contains the new navigation; no `mini-drawer`/`drawer` references. (*SC-6*)
- [ ] **D03** Preview pass: production build at desktop and phone widths — all four routes navigable, active highlight correct, burger open/close (click, overlay, Escape, route change), socials/language/theme reachable, no overlap of content by the bars. (*SC-2, SC-3, SC-4*)
- [ ] **D04** Owner visual pass in `npm run dev` (desktop + mobile widths, four locales, dark/light); fix anything reported. (*SC-2, SC-3, SC-4*)

**Checkpoint D:** build + automated checks pass; owner visual pass signed off.

---

## Phase E — Commits, dist, deploy

- [ ] **E01** Commit sources: `feat: replace drawer with top navbar and sub navbar`. (*FR-10*)
- [ ] **E02** Rebuild `dist/` and commit: `chore: rebuild dist`. (*FR-10, SC-6*)
- [ ] **E03** Update spec status + this checklist; commit: `docs: mark spec and tasks complete`.
- [ ] **E04** Deploy after sign-off: `git subtree push --prefix dist origin gh-pages`; cache-busted spot check of the live site. (*SC-6*)

**Checkpoint E:** branch committed; live site serves the new navigation.
