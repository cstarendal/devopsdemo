# Hello Toggle App (Trunk-based TDD + CI/CD to GitHub Pages)

Small demo app to show trunk-based development, TDD, and continuous delivery to GitHub Pages with test/staging/production paths.

## App
- Hello World text
- One toggle button showing `Toggle: ON/OFF`

## Local Dev
- `npm run dev` – start Vite
- `npm test` – Vitest in watch
- `npm run test:run` – CI mode
- `npm run build` – production build

## Environments
- Test: push to branches `test/*` → deployed at `/test/`
- Staging: push to `main` → deployed at `/staging/`
- Production: tag `v*` on `main` → deployed at `/`
  - Root auto-redirects to the current target (test/staging) unless prod tag

## TDD Runbook (Live Demo)
1. Write failing test in `src/App.test.tsx`
2. Implement minimal code in `src/App.tsx`
3. Keep tests green while refactoring
4. Push to `main` → CI runs, deploys to staging
5. Tag `v1.0.0` → deploys to production

## Notes
- Vite `base` path is set per build by `VITE_BASE_PATH` in CI.
