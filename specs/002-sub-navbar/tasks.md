# Tasks: 002 — Extending left sidebar (sub navbar)

Execution checklist for `spec.md` / `plan.md`. Phases are ordered unless marked `[P]`. Each task lists its verification; checkpoint lines gate the next phase.

Legend: `[P]` parallelizable · `FR/SC` traceability to the spec.

> **Revision (2026-10-14):** the first design (top navbar + route sub bar, Phases A–E below) was rejected in review. **Phase R** reworks navigation into the extending left sidebar recorded in `spec.md`; it supersedes the navigation-specific tasks of Phases A–D, which remain as the execution record of the first attempt.

---

## Phase A — Navigation data and components

- [x] **A01** Create `src/service/nav.js` with the ordered items (`/` → `nav.home`, `/skills` → `nav.skills`, `/projects` → `nav.projects`, `/experience` → `nav.experience`) and `getNavItems()`. (*FR-3*)
- [x] **A02** Create `src/components/navLinks.vue`: props `items` + `vertical`; `RouterLink` per item; active class via `$route.path === item.path`; overrides global `li`/`a` styles. (*FR-2*)
- [x] **A03** Create `src/components/subNavbar.vue`: fixed bar below the navbar, centered `navLinks`, hidden under 768px. (*FR-2*)
- [x] **A04** Create `src/components/navbar.vue`: brand (`socials.name`, links home), socials icons, language switcher, theme toggle; burger + mobile menu (vertical `navLinks`, socials, controls) with Escape/overlay/route-change close and `aria-*`. (*FR-1, FR-7*)

**Checkpoint A:** four new files exist, no existing file touched yet.

---

## Phase B — Wire up and remove the drawer/rail

- [x] **B01** `src/App.vue`: compose `navbar` + `subNavbar` with service props; remove the `.top-controls` header and the drawer import/registration/usage; `body-size` top padding for the fixed bars (mobile: navbar only). (*FR-4, FR-6*)
- [x] **B02** Delete `src/components/drawer.vue`. (*FR-4*)
- [x] **B03** `src/assets/base.css`: replace the `--mini-drawer-width` block with `--navbar-height` and `--sub-navbar-height`. (*FR-5*)
- [x] **B04** `src/views/projectsView.vue`: drop the two rail margins (base margin → `2rem` all around; mobile keeps one column). (*FR-5, FR-6*)
- [x] **B05** `src/components/gallery.vue`: replace the three `calc(var(--mini-drawer-width) + 2rem)` margins with `2rem`. (*FR-5, FR-6*)
- [x] **B06** Leftover check: `grep -rn "mini-drawer\|drawer" src/` → no matches. (*FR-9, SC-5*)

**Checkpoint B:** no drawer, no rail, no leftovers; navigation composed in `App.vue`.

---

## Phase C — i18n

- [x] **C01 [P]** Add `nav.menu` (`Menu` / `Meny` / `Menu` / `Menü`) to `src/locales/en.js`, `sv.js`, `fr.js`, `de.js`. (*FR-8*)
- [x] **C02** Locale parity check: all four dictionaries expose the same key set (node one-liner). (*FR-8*)

**Checkpoint C:** locale files consistent; burger label translated in all four.

---

## Phase D — Build and verify

- [x] **D01** `npm run build` succeeds. (*SC-1*)
- [x] **D02** Dist checks: built output contains the new navigation; no `mini-drawer`/`drawer` references. (*SC-6*)
- [x] **D03** Preview pass: production build at desktop and phone widths — all four routes navigable, active highlight correct, burger open/close (click, overlay, Escape, route change), socials/language/theme reachable, no overlap of content by the bars. (*SC-2, SC-3, SC-4*)

  Agent-pass result (2026-10-14, headless Chromium over CDP against `vite preview`): all four routes highlight correctly on load and after clicks; burger visible only < 768px; menu lists the four routes (active), socials, language and theme; Escape, overlay and route click all close it; `aria-expanded` tracks state; light and dark modes render correctly. The screenshots reviewed were light-mode desktop, dark-mode mobile menu and mobile skills/projects.
- [ ] **D04** Owner visual pass in `npm run dev` (desktop + mobile widths, four locales, dark/light); fix anything reported. (*SC-2, SC-3, SC-4*) — superseded by R08

**Checkpoint D:** build + automated checks pass; owner visual pass signed off.

---

## Phase E — Commits, dist, deploy

- [x] **E01** Commit sources: `feat: replace drawer with top navbar and sub navbar`. (*FR-10*)
- [x] **E02** Rebuild `dist/` and commit: `chore: rebuild dist`. (*FR-10, SC-6*)
- [x] **E03** Update spec status + this checklist; commit: `docs: mark spec and tasks complete`.
- [ ] **E04** Deploy after sign-off: `git subtree push --prefix dist origin gh-pages`; cache-busted spot check of the live site. (*SC-6*) — superseded by R09

**Checkpoint E:** branch committed; live site serves the new navigation.

---

## Phase R — Revision (supersedes the navigation tasks of Phases A–D)

- [x] **R01** Create `src/components/sidebar.vue`: fixed left rail (route icons + social icons, active route highlighted); pressing an icon toggles the extension; labels fade in beside the fixed icon column; route labels navigate + collapse; overlay click / Escape / second press / route change collapse; mobile burger + off-canvas panel. (*FR-1…FR-4, FR-6*)
- [x] **R02** `src/service/nav.js`: add `icon` classes to the four route items. (*FR-1*)
- [x] **R03** `src/assets/base.css`: replace `--navbar-height` / `--sub-navbar-height` with `--sidebar-width` (40px) and `--sidebar-expanded-width` (220px). (*FR-7*)
- [x] **R04** `src/App.vue`: restore floating `.top-controls` (language + theme); compose `sidebar` with the service data; mobile `.body-size` top padding for the floating chrome. (*FR-5, FR-7*)
- [x] **R05** Restore rail offsets: `projectsView.vue` (desktop margins + compact mobile), `gallery.vue` (3 margins + mobile override); remove `skillsView.vue`'s redundant mobile `padding-top`. (*FR-7*)
- [x] **R06** Delete `navbar.vue`, `subNavbar.vue`, `navLinks.vue`; greps for top-bar leftovers. (*FR-9, SC-5*)
- [x] **R07** Build + headless pass: desktop collapsed/expanded, icon toggles, label navigation + collapse, Escape/overlay, active states on all four routes; mobile burger open/close; screenshots reviewed. (*SC-1…SC-4*)
- [ ] **R08** Owner visual pass in `npm run dev` (desktop + mobile widths, four locales, dark/light); fix anything reported. (*SC-2…SC-4*)
- [ ] **R09** Rebuild `dist/`, commit; deploy via `git subtree push --prefix dist origin gh-pages` after sign-off. (*FR-10, SC-6*)

**Checkpoint R:** left sidebar behaves as specified; top bars removed; owner sign-off and deploy pending.
