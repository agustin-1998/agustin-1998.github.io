# agustin-1998.github.io

Personal site of Agustín Rodriguez, Senior Full Stack Engineer (Vue 3, TypeScript, Laravel, AI agent workflows).

Live at **https://agustin-1998.github.io**

## Stack

- Vue 3 + TypeScript (`<script setup>`), built with Vite
- PrimeVue 4 with a custom Aura preset (teal primary, stone/zinc neutrals), light and dark themes
- No backend: a static single page deployed to GitHub Pages by GitHub Actions

## Editing content

All copy lives in `src/data/profile.ts` (case studies, experience, stack). Components only render it.

## Run locally

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # type-checks with vue-tsc, then builds to dist/
```

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.
One-time setup: in the repository settings, **Pages → Build and deployment → Source: GitHub Actions**.
