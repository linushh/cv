# Plan: 001 — Remove the footer and sensitive personal data from published copies

Implements `specs/001-remove-footer-sensitive-info/spec.md` (FR-1…FR-8, SC-1…SC-7). Written before any implementation changes; execution follows `tasks.md` in this folder.

## Approach overview

Four building blocks, in this order:

1. **Rewrite git history first**, while the working tree is still the old, clean state. One `git filter-repo` pass:
   - purges every phone spelling and the old provider address from all file contents,
   - rewrites commit author/committer metadata that uses the old address,
   - drops historical `resume-en.pdf` blobs (compressed streams the text replacement cannot reach).
2. **Apply the content changes** on top of the rewritten history: footer removal, `socials.js` cleanup, locale cleanup, generator update. Regenerate the resume PDF, rebuild `dist/`, commit.
3. **Publish**: force-push the rewritten refs, replace the `gh-pages` history with the clean build, and remove the stale feature branches.
4. **Verify** locally and on the live site; keep the backup bundle until verification passes.

Why rewrite first instead of last:

- The purge runs on a pristine tree; the regenerated PDF and rebuilt `dist/` are brand-new files that never need to be removed from history.
- `filter-repo` hard-resets the worktree; doing it first means the content edits are made once, after the reset, and never re-done.
- (One second pass was later needed to redact the spec artifacts themselves — see "Docs hygiene" below.)

## Key decisions and gotchas

| Topic | Detail |
|---|---|
| Tooling | `git-filter-repo` is not installed and there is no pip module. Download the single-file script to `/tmp/opencode/git-filter-repo` and run it with `python3` (3.13 available, network verified). |
| Replacement patterns | Contents only, via `--replace-text`: the removed phone number and the old provider address (values intentionally omitted) are each redacted as `***REMOVED***`. |
| Commit metadata | `--email-callback` rewrites historical author/committer emails using the old address to `114801645+linushh@users.noreply.github.com`. The deprecated Outlook address is deliberately left alone (spec FR-8). |
| Historical PDFs | `--invert-paths --path public/resume-en.pdf --path dist/resume-en.pdf --path resume-en.pdf` removes them from every commit. The files disappear from the worktree in the reset; they are regenerated in step 2. |
| **Docs hygiene** | The spec/plan/tasks documents must never quote the removed values — reference them by description only. (The first publish attempt leaked them via the docs commit and required a second purge pass.) |
| `origin` remote | `filter-repo` removes the `origin` remote; re-add it before pushing. |
| Branch layout | Two worktrees: current `/home/linush/orca/workspaces/cv/master` (branch `linushh/master`, **no upstream**) and `/home/linush/projects/cv` (branch `master`, tracks `origin/master`). Both at `700ed93`. The other worktree looks stale after a rewrite and needs a `reset --hard`. |
| Push refspec | Because `linushh/master` has no upstream: `git push --force origin HEAD:master`. |
| Stale feature branches | The two `feature/*` branches carried the leaked data. Decision: delete them during publish. |
| `gh-pages` first update | Do **not** use plain `git subtree push` as the first post-rewrite update — it would stack the new history on top of the old, leaking `gh-pages` history. Replace it instead: `git subtree split --prefix dist --branch gh-pages-clean HEAD`, then `git push --force origin gh-pages-clean:gh-pages`. Regular `git subtree push` resumes for later deploys (one-time cost). |
| GitHub-side retention | Force-push makes old commits unreachable but they can linger by SHA / in caches. Optional: ask GitHub support to purge. Pages CDN may serve old assets briefly: verify with a cache-busting query. |
| `pdfmake` | Not installed; use the documented ad-hoc `npm install --no-save pdfmake`. Confirm `package.json` / `package-lock.json` are untouched afterwards and revert them if they changed. |
| Deploy target | `https://linushh.github.io/cv/` (vite `base: '/cv/'`), served from `gh-pages`. |
| Outlook address | Explicitly out of scope; left in history. |

## File changes

| File | Change |
|---|---|
| `src/components/footer.vue` | delete |
| `src/App.vue` | remove `Footer` import, registration, and template usage (keep `socials` for the drawer) |
| `src/service/socials.js` | delete `phoneNumber`; `email` → `linsahakansson@gmail.com`; `name` unchanged |
| `src/locales/{en,sv,fr,de}.js` | remove the `footer` block (`footer.author`, `footer.contact`) |
| `scripts/generateResume.mjs` | contact line `${socials.email} · ${socials.phoneNumber}` → `${socials.email}` |
| `public/resume-en.pdf` | regenerated via the script |
| `dist/**` | rebuilt and committed (stays a committed artifact, unchanged policy) |
| `specs/001-remove-footer-sensitive-info/*` | spec, plan, tasks committed as docs |

## Commit strategy

1. `docs: add spec, plan and tasks for footer/sensitive-data removal` (specs folder)
2. `chore: remove footer and purge phone/old email from sources; regenerate resume` (source + PDF)
3. `chore: rebuild dist`
4. `docs: redact sensitive values from spec artifacts` (added after publish verification caught the docs quoting the values; followed by a second purge pass and re-push)

## Verification strategy (SC mapping)

Run locally in Phase E, and again against the remote in Phase G:

| SC | Check |
|---|---|
| SC-1 | Grep `src` and `scripts` for the removed phone number and provider address → no matches |
| SC-2 | `npm run build` succeeds |
| SC-3 | Grep `dist` for the removed values → no matches; `pdftotext dist/resume-en.pdf -` shows `linsahakansson@gmail.com` only |
| SC-4 | `npm run dev` manual pass: all routes, desktop + mobile widths, 4 locales, no footer, no i18n warnings |
| SC-5 | `git log --all -S` for the removed phone number and address → empty; the metadata check for the old address → empty; `git rev-list --all --objects \| grep -i resume-en.pdf` → only the new blob |
| SC-6 | Grep the remote refs for the removed values → empty after `fetch --prune`; live: fetch the site, grep its bundle, `pdftotext` the served PDF |
| SC-7 | Fresh clone into `/tmp/opencode/cv-verify`; history checks pass; `git status` clean |

## Rollback

- Backup: `git bundle create /tmp/opencode/cv-pre-purge.bundle --all` **before** the rewrite; keep until live verification passes.
- Restore: clone/import the bundle, reset refs, and force-push the old tips again (remote rollback = force-push old SHAs recorded in `/tmp/opencode/pre-rewrite-refs.txt`).
- Content rollback before pushing is a normal `git reset`/`revert`; nothing is public until Phase F.

## Execution prerequisites checklist

- [x] Spec approved; plan/tasks written
- [x] Both worktrees clean
- [x] Network reachable; `python3`, `git subtree`, `pdftotext`, `curl` available
- [x] `git-filter-repo` script downloaded
- [x] Backup bundle created and verified
