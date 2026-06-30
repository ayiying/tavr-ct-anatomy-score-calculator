# GitHub Pages Deployment Report

Run ID: v17_20260619_github_pages_deployment

Date: 2026-06-30

## Target

- GitHub owner requested: `suoxinsuo`
- Repository name: `tavr-ct-anatomy-score-calculator`
- Intended repository URL: `https://github.com/suoxinsuo/tavr-ct-anatomy-score-calculator`
- Intended GitHub Pages URL: `https://suoxinsuo.github.io/tavr-ct-anatomy-score-calculator/`
- Pages source branch: `main`
- Pages folder: `/docs`

## Local Deployment Directory

```text
02_output/v17_20260619_github_pages_deployment/
```

The GitHub Pages-ready static files are under:

```text
docs/
```

## Local Git Status

- Local repository initialized: Yes.
- Local commit created: Yes.
- Commit hash: `34e8df99fb26e29919020348a7375e16c4fd2d7a`
- Branch: `main`

## GitHub Publication Status

- Target repository lookup through the GitHub plugin returned: Not Found.
- GitHub CLI availability: unavailable in PATH.
- Homebrew install attempt for GitHub CLI: failed because no bottle was available for the current macOS environment.
- GitHub plugin capability available in this session: repository lookup and file writes to existing repositories; no exposed tool for creating a new repository or enabling Pages.
- Repository created: No.
- Push completed: No.
- GitHub Pages enabled: No.
- Public URL validated: No.

## Local Validation

Local `/docs` preview URL:

```text
http://127.0.0.1:8090/?figure=1
```

Results:

- Chinese UI: Pass.
- English UI: Pass.
- Logo loaded: Pass.
- Chinese KM image loaded: Pass.
- English KM image loaded: Pass.
- Example Delta MAo-STJ: `3.80`.
- Example CT Anatomy Score: `1.82`.
- Example Device Success probability: `86%`.
- Browser console warnings/errors: 0.
- Static resource requests: HTTP 200.

Screenshots:

```text
GitHubPages_local_preview_CN.png
GitHubPages_local_preview_EN.png
```

## Model And Data Integrity

- `app.js` was not modified.
- CT Anatomy Score formula was not modified.
- Locked results were not modified.
- No model retraining was performed.
- No individualized MACE absolute-risk calculator was added.
- No raw patient data were uploaded.

## Next Step

Create the repository manually or provide an authenticated GitHub CLI/session with repository-creation permission, then push this local deployment repository and enable GitHub Pages from `main` branch `/docs`.

