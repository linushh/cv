# Tasks: 001 — Remove the footer and sensitive personal data from published copies

Execution checklist for `spec.md` / `plan.md`. Phases are strictly ordered unless marked `[P]` (safe to do in parallel). Each task lists its verification; checkpoint lines gate the next phase.

Legend: `[P]` parallelizable · `FR/SC` traceability to the spec.

---

## Phase A — Pre-flight

- [ ] **A01** Confirm both worktrees are clean: `git status --short` (only `?? specs/` expected) and `git -C /home/linush/projects/cv status --short` (empty). (*Environment*)
- [ ] **A02** Record pre-rewrite refs for rollback: `git for-each-ref --format='%(refname) %(objectname)' > /tmp/opencode/pre-rewrite-refs.txt`; note `HEAD = 700ed93`. (*Rollback*)
- [ ] **A03** Backup: `git bundle create /tmp/opencode/cv-pre-purge.bundle --all` and verify with `git bundle verify /tmp/opencode/cv-pre-purge.bundle`. (*Rollback*)
- [ ] **A04** Download filter-repo: `curl -fsSL -o /tmp/opencode/git-filter-repo https://raw.githubusercontent.com/newren/git-filter-repo/main/git-filter-repo && chmod +x /tmp/opencode/git-filter-repo`; sanity check `python3 /tmp/opencode/git-filter-repo --version`. (*Tooling*)

**Checkpoint A:** backup verified, tool ready, worktrees clean.

---

## Phase B — History rewrite (before any content edits)

- [ ] **B01** Write expressions file `/tmp/opencode/purge-expressions.txt`:
  ```
  ***REMOVED***==>***REMOVED***
  ***REMOVED***==>***REMOVED***
  ```
  (*FR-8*)
- [ ] **B02** Run the rewrite from the repo root:
  ```
  python3 /tmp/opencode/git-filter-repo --force \
    --replace-text /tmp/opencode/purge-expressions.txt \
    --email-callback 'return email.replace(b"***REMOVED***", b"114801645+linushh@users.noreply.github.com")' \
    --invert-paths --path public/resume-en.pdf --path dist/resume-en.pdf --path resume-en.pdf
  ```
  (*FR-8*)
- [ ] **B03** Verify the local rewrite (before fetching anything):
  - `git log --all -S "***REMOVED***"` → empty
  - `git log --all -S "***REMOVED***"` → empty
  - `git log --all --format='%ae %ce' | grep -i mailbox` → empty (outlook may still appear — expected)
  - `git rev-list --all --objects | grep -i resume-en.pdf` → empty
  - `git remote -v` → no `origin` (removed by filter-repo). (*SC-5 local*)
- [ ] **B04** Sync the other worktree to the rewritten refs: `git -C /home/linush/projects/cv reset --hard`. (*Environment*)

**Checkpoint B:** rewritten history is leak-free locally; PDFs are gone from disk (regenerated later); origin remote absent (re-added in F01).

---

## Phase C — Content changes

- [ ] **C01** `src/service/socials.js`: delete the `phoneNumber` constant and its entry in `getSocials()`; change `email` to `linsahakansson@gmail.com`. (*FR-2, FR-4*)
- [ ] **C02** `scripts/generateResume.mjs`: contact line becomes `` `${socials.email}` `` (no `· phoneNumber`). (*FR-4*)
- [ ] **C03** Delete `src/components/footer.vue`. (*FR-1*)
- [ ] **C04** `src/App.vue`: remove the `Footer` import, component registration, and `<Footer …>` block; keep `socials` for the drawer. (*FR-1*)
- [ ] **C05 [P]** Remove the `footer` block from `src/locales/en.js`, `src/locales/sv.js`, `src/locales/fr.js`, `src/locales/de.js`. (*FR-1, FR-5*)
- [ ] **C06** Leftover check: no references to `components/footer`, `Footer`, or `footer.` i18n keys remain in `src/` (note: `gallery.vue` has its own HTML `<footer>` element — that stays). (*FR-1*)

**Checkpoint C:** sources contain no footer component, no phone number, no old email; name usages untouched (`homeView.vue`, generator).

---

## Phase D — Regenerate resume, rebuild, commit

- [ ] **D01** `npm install --no-save pdfmake` then `node scripts/generateResume.mjs`. Confirm `git status` shows no changes to `package.json` / `package-lock.json` (revert if it does). (*FR-4*)
- [ ] **D02** Confirm PDF content: `pdftotext public/resume-en.pdf -` → shows `linsahakansson@gmail.com`, no phone, no `mailbox`. (*SC-3*)
- [ ] **D03** `npm run build` (also refreshes `dist/resume-en.pdf`, `dist/404.html`). (*FR-6, SC-2*)
- [ ] **D04** Verify build output: `grep -rE "0***REMOVED***|***REMOVED***" dist` and `grep -rn "mailbox" dist` → no matches; `pdftotext dist/resume-en.pdf -` clean. (*SC-3*)
- [ ] **D05** Commit docs: `git add specs && git commit -m "docs: add spec, plan and tasks for footer/sensitive-data removal"`.
- [ ] **D06** Commit sources + PDF: `git add -A src scripts public && git commit -m "chore: remove footer and purge phone/old email from sources; regenerate resume"`.
- [ ] **D07** Commit build output: `git add dist && git commit -m "chore: rebuild dist"`.

**Checkpoint D:** three clean commits on the rewritten history; nothing pushed yet.

---

## Phase E — Local verification

- [ ] **E01** SC-1 greps: `grep -rE "0***REMOVED***|***REMOVED***" src scripts` and `grep -rn "mailbox" src scripts` → no matches. (*SC-1*)
- [ ] **E02** Manual dev pass: `npm run dev` → no footer on any route; name visible under the portrait on home; layout and scroll fine at desktop + mobile widths; switch all 4 locales; no vue-i18n console warnings. (*SC-4*)
- [ ] **E03** Confirm working tree is clean and `diff` of `git show --stat HEAD~2..HEAD` matches the plan's file list. (*Sanity*)

**Checkpoint E:** local verification passed; ready to publish.

---

## Phase F — Publish

- [ ] **F01** Re-add remote: `git remote add origin https://github.com/linushh/cv.git` and `git fetch origin` (brings the still-stale remote refs; expected).
- [ ] **F02** Force-push the rewritten branch: `git push --force origin HEAD:master`. (*FR-8*)
- [ ] **F03** Replace `gh-pages` with the clean build (one-time; plain subtree push resumes afterwards):
  `git subtree split --prefix dist --branch gh-pages-clean HEAD` then `git push --force origin gh-pages-clean:gh-pages`; delete the temp branch: `git branch -D gh-pages-clean`. (*FR-7*)
- [ ] **F04** Handle stale feature branches: delete (`git push origin --delete feature/slide-button feature/sunbotjs-gallery`) — recommended; or force-push rewritten versions if keeping them.
- [ ] **F05** Update refs: `git fetch --prune origin`; delete any stale local refs that remain.
- [ ] **F06** Remote-side verify: `git grep -E "***REMOVED***|mailbox" origin/master origin/gh-pages` → no matches; `git log --all -S "***REMOVED***"` and `-S "***REMOVED***"` → empty. (*SC-5, SC-6*)
- [ ] **F07** Fresh-clone check into `/tmp/opencode/cv-verify`: `git clone /home/linush/orca/workspaces/cv/master cv-verify` → history checks pass, `git status` clean. (*SC-7*)

**Checkpoint F:** all remote refs are clean; feature branches resolved.

---

## Phase G — Live verification and wrap-up

- [ ] **G01** Live bundle check: fetch `https://linushh.github.io/cv/`, extract the `assets/index-*.js` URL, `curl` it with a cache-buster and grep for `***REMOVED***` / `mailbox` → no matches. (*SC-6*)
- [ ] **G02** Live CV check: `curl -s -o /tmp/opencode/live-resume.pdf "https://linushh.github.io/cv/resume-en.pdf?cb=$(date +%s)" && pdftotext /tmp/opencode/live-resume.pdf -` → new email only. (*SC-6*)
- [ ] **G03** If old data is still served: check Pages deployment status and CDN cache; retry with cache-buster before investigating further.
- [ ] **G04** Notify anyone with clones to re-clone or hard-reset; optionally open a GitHub support request to purge unreachable cached objects.
- [ ] **G05** Keep `/tmp/opencode/cv-pre-purge.bundle` and `pre-rewrite-refs.txt` until acceptance; then archive or remove per preference.

**Checkpoint G:** spec SC-1…SC-7 all pass on the live site; wrap-up notes recorded.
