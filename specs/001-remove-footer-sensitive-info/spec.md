# 001 — Remove the footer and sensitive personal data from published copies

| | |
|---|---|
| **Status** | Implemented — 2026-10-14 |
| **Created** | 2026-10-14 |
| **Owner** | Linus Håkansson |
| **Input** | Structured interview + review rounds, 2026-10-14 |
| **Follow-ups** | Execution completed; `plan.md` and `tasks.md` in this folder record the approach |

## 1. Problem statement

The public CV site exposes personal contact data that should no longer be published (general privacy hygiene):

- `src/service/socials.js` hardcoded the old contact email and the phone number (values intentionally omitted from this document so the purge stays complete).
- `src/components/footer.vue` renders the name, email, and phone on every page.
- The phone number is baked into committed build output (`dist/assets/*.js` on master, `assets/*.js` on `origin/gh-pages`), which is what GitHub Pages serves.
- `public/resume-en.pdf` contains the phone number and the old email address; the deployed copy on `gh-pages` does too.
- The phone number and the old provider address exist in past commits: the number in file contents (source, build bundles, PDFs) and the address also in commit author/committer metadata.

The footer is also a redundant display surface: the name is already visible in the resume PDF and under the portrait on the home page, so the footer can be removed entirely instead of being trimmed. Because the site deploys from committed artifacts, removing the values from source alone would leave them live on the website and in the downloadable CV.

## 2. Goal

After this change:

1. The footer is removed from the site: no name, email, or phone is rendered in a site footer. The name remains where it is already visible (resume PDF and home page card under the portrait).
2. The phone number and the old provider address appear nowhere: not in source, not in generated PDFs, not in build output, not in the deployed site, not in git contents or metadata — including this documentation set, which refers to them only by description.
3. The resume PDF shows the new email `linsahakansson@gmail.com` and no phone number.

## 3. Non-goals (out of scope)

- Removing the name from the resume PDF or the home page card under the portrait — both keep it; the footer copy goes away with the footer.
- Changing the GitHub/LinkedIn/Facebook links in the drawer.
- Adding any replacement contact UI (contact form, new footer content, etc.).
- Adding dependencies or changing the ad-hoc `pdfmake` setup used by the resume generator.
- Deploy automation/CI changes — `gh-pages` stays a manual subtree push.

## 4. Affected surfaces

| Surface | Today | Target |
|---|---|---|
| `src/components/footer.vue` | renders name, email, phone | removed |
| `src/App.vue` | passes author/email/phone to footer | footer import, registration, and usage removed |
| `src/service/socials.js` | exports phone, name, email | `phoneNumber` deleted; `email` updated to the new address |
| `src/views/homeView.vue` | About card title = `socials.name` | unchanged |
| `src/locales/{en,sv,fr,de}.js` | `footer.author`, `footer.contact` keys | entire `footer` block removed from all four |
| `scripts/generateResume.mjs` | contact line = `email · phoneNumber` | contact line = new email only |
| `public/resume-en.pdf` | old email + phone | regenerated: new email, no phone |
| `dist/` (committed on master) | bundle contains phone | production build refreshed and committed |
| `origin/gh-pages` (deployed) | assets + PDF contain phone | refreshed via manual subtree push |
| git history (all refs) | phone + old email in contents and metadata | purged |

## 5. Requirements (FR)

- **FR-1 Footer removal.** Remove the name, email, and phone from the footer: the Author block (name) and Contact block (email, phone) both go, leaving the component empty. Delete `src/components/footer.vue`, its import/registration/usage in `src/App.vue`, and the entire `footer` i18n block (`footer.author`, `footer.contact`) from all four locale files (`en`, `sv`, `fr`, `de`). No replacement footer or contact UI is added.
- **FR-2 Phone number elimination.** Delete `phoneNumber` from `src/service/socials.js` and every reference to it (App.vue, footer, resume generator).
- **FR-3 Name stays where it is visible.** `socials.name` remains unchanged: the resume PDF name line and the home page card title under the portrait stay as they are. The footer instance is the only one removed.
- **FR-4 New resume email.** The resume PDF contact line shows `linsahakansson@gmail.com` and no phone number. The generator must not print a phone number. The new address lives in `src/service/socials.js` (`email`), which the generator already reads — single source of truth.
- **FR-5 Locale consistency.** Removal leaves no `footer` block remnants and no missing keys in any of the four locales. No new user-facing strings are introduced (email/phone are data, not UI copy).
- **FR-6 Clean build output.** Run the production build so committed `dist/` (bundle, `index.html`, `404.html`, `resume-en.pdf`) contains neither the phone number nor the old email; commit the refreshed output.
- **FR-7 Clean deployed artifact.** Refresh `origin/gh-pages` using the usual manual subtree push of `dist/` so the served assets and downloadable CV are free of the phone number and old email.
- **FR-8 History purge.** Rewrite history across all refs so that:
  - File contents contain no phone spelling (national or international, with or without prefixes) and no occurrence of the old provider address.
  - Commit author/committer metadata using the old address is rewritten (several old commits use it; the newer commits use `114801645+linushh@users.noreply.github.com`, which is the natural replacement).
  - Historical `resume-en.pdf` copies are dropped from all commits and the regenerated file is re-added, because the phone number inside PDF streams is compressed and text replacement cannot reach it.
  - The deprecated Outlook address found in some historical commit metadata is explicitly left alone (not part of the purge).
  Take a full backup (`git bundle`) before rewriting and force-push affected branches (including `gh-pages`) afterwards.

## 6. Success criteria

- **SC-1** Grepping `src` and `scripts` for the removed phone number and provider address (patterns intentionally omitted from this document) returns no matches.
- **SC-2** `npm run build` succeeds.
- **SC-3** Grepping `dist` for the removed values returns no matches; `pdftotext dist/resume-en.pdf -` shows `linsahakansson@gmail.com` and neither the phone number nor the old address.
- **SC-4** Manual check in `npm run dev`: no footer on any route; page layout and scroll still look right on desktop and mobile widths; all four locales load with no leftover footer keys and no vue-i18n console warnings.
- **SC-5** `git log --all -S` for the removed phone number and address is empty; the commit-metadata check for the old address is empty; no historical `resume-en.pdf` blob is reachable (`git rev-list --all --objects` lists only the regenerated file's blob from the new commit).
- **SC-6** After the subtree push: grepping the remote refs for the removed values is empty, and a spot check of the live bundle and CV PDF shows no phone number or old email (hard refresh to bypass Pages/CDN caches).
- **SC-7** A fresh clone of the rewritten repo (or `git fetch --prune` + `git status`) is consistent with the force-pushed remote branches.

Note: SC-5 relies on byte-level detection for text blobs; compressed PDF content cannot be detected this way, which is why FR-8 removes historical PDF copies rather than string-replacing inside them.

## 7. Decisions log (interview + reviews)

| Topic | Decision |
|---|---|
| Motivation | General privacy hygiene (no specific incident) |
| Name | Stays in the resume PDF and the home page card under the portrait; removed from the footer together with the email, leaving no footer content |
| Footer | Removed entirely — dead code once name, email, and phone are gone |
| New email source | `linsahakansson@gmail.com` lives in `src/service/socials.js` |
| Resume PDF | Phone number removed; email changed to `linsahakansson@gmail.com` |
| Old provider address | Purged from history together with the phone number (contents and metadata) |
| Outlook metadata | Deprecated Outlook address left untouched — out of scope |
| Git history | Full purge across all refs |
| Historical PDF blobs | Dropped from history; regenerated file re-added |
| Deployment | Manual subtree push of `dist/` to `gh-pages` (as done in previous sessions) |
| Draft location | `specs/001-remove-footer-sensitive-info/spec.md` (this file) |

## 8. Constraints and notes

- Follow repo conventions: delete unused data instead of leaving it (no dead code), keep all four locales in sync, verify with `npm run build`.
- `socials.email` stays in the service as the single source consumed by the resume generator, even though no UI renders it anymore.
- The resume generator requires an ad-hoc `npm install --no-save pdfmake` (intentionally not a project dependency). Keep it that way.
- The repo has no tags; master has ~153 commits; the stale feature branches also carried the phone string. Include all refs in the rewrite, or delete the stale branches during rollout.
- `dist/resume-en.pdf` is copied from `public/` during the build, so a rebuild refreshes the deployed CV automatically once the source PDF is regenerated.

## 9. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Force-push after history rewrite breaks local clones | Coordinate; re-clone or hard-reset; keep a backup bundle until verified |
| `git subtree push` to `gh-pages` after the rewrite may hit ancestry mismatches | Verify locally with `git subtree split --prefix dist` before pushing; fallback is a one-time fresh split force-pushed to `gh-pages` (it is generated output anyway) |
| GitHub may retain unreachable objects (caches, old Pages CDN copies) | Hard refresh after deploy; optionally request GitHub support to purge cached views |
| Commit-metadata rewrite changes commit hashes everywhere (already implied by the purge) | Same as force-push risk; the rewrite is coordinated and verified with a fresh clone |
| Removing the footer changes the page bottom layout (`min-height` on `.body-size`) | Manual visual check on desktop and mobile widths (SC-4) |
| Old address may keep receiving mail after removal | Deliberate: the address stays valid at the provider unless closed separately |
| Regenerating the PDF requires the ad-hoc pdfmake install | Documented in the generator header; no change needed |

## 10. Suggested sequencing (detailed in `plan.md` after approval)

1. Source and data changes: footer removal, `socials.js` cleanup and new email, generator update, locale cleanup.
2. Regenerate `public/resume-en.pdf`; rebuild and commit `dist/`.
3. Verify locally (SC-1 to SC-4).
4. Back up (`git bundle`), then rewrite history across all refs (SC-5), including dropping historical PDFs and rewriting commit metadata.
5. Force-push branches; refresh `gh-pages` via the manual subtree push; verify the live site with a hard refresh (SC-6).
6. Notify anyone with clones; optionally ask GitHub to purge cached objects.
