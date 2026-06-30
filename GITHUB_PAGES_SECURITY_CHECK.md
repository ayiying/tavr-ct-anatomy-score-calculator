# GitHub Pages Security Check

Date: 2026-06-30

## Scope

Checked deployment directory:

```text
02_output/v17_20260619_github_pages_deployment/
```

Checked deployable site directory:

```text
docs/
```

## Results

- No local absolute project path was found in deployable static text files.
- No local-file URI was found in deployable static text files.
- No Xiyou Cloud server address was found in deployable static text files.
- No credential value was found in deployable static text files.
- No key material was found in deployable static text files.
- No raw patient-data table was included in `docs/`.
- No raw clinical workbook was included in `docs/`.
- No source data directory was included in `docs/`.

Expected non-sensitive terms retained:

- MACE appears only in the user-facing prognostic context already present in the validated calculator.
- Follow-up wording appears only in the KM image labels and UI copy.

## Integrity

- `docs/app.js` SHA-256 matches the v15 source `WebCalculator_app.js`.
- `docs/style.css` SHA-256 matches the v15 source `WebCalculator_style.css`.
- CT Anatomy Score calculation logic was not modified.
- Locked results were not modified.

