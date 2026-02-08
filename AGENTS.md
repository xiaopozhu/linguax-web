# Repository Guidelines

## Project Structure & Module Organization
This repository hosts the LinguaX marketing/docs site built with Docusaurus + React + TypeScript.

- `src/`: React pages, hooks, theme overrides, and homepage components (`src/components/*`, `src/pages/*`).
- `docs/`: documentation pages (MD/MDX).
- `blog/`: dated blog posts and metadata.
- `i18n/`: locale-specific translation resources.
- `static/`: public static assets served as-is.
- `assets/`: source media/content references used during content production.
- `worker/`: Cloudflare Worker entry (`worker/index.js`).
- `docusaurus.config.ts`, `sidebars.ts`: site configuration and navigation.

## Build, Test, and Development Commands
Use Node.js `>=18`.

- `npm install` (or `yarn`): install dependencies.
- `npm start`: run local Docusaurus dev server (with `/app-api` proxy to `http://localhost:9000`).
- `npm run build`: generate production static site into `build/`.
- `npm run serve`: preview the built site locally.
- `npm run typecheck`: run TypeScript checks (`tsc`).
- `npm run wrangler:dev`: run Worker locally.
- `npm run wrangler:deploy`: deploy Worker.
- `npm run wrangler:publish`: build site, then deploy Worker.

## Coding Style & Naming Conventions
- Use TypeScript for React UI (`.tsx`) and CSS Modules/SCSS for styles (`*.module.css`, `*.module.scss`).
- Follow existing formatting: 2-space indentation, semicolons, single quotes.
- Component files and exported React components use `PascalCase` (for example, `HomepageHeader`).
- Hooks use `camelCase` with `use` prefix (for example, `useDownload`).
- Keep translation keys and i18n content synchronized when changing user-facing text.

## Testing Guidelines
There is no dedicated unit test suite configured yet. Treat these as required checks before opening a PR:

1. `npm run typecheck`
2. `npm run build`
3. Manual smoke test with `npm start` for changed pages/components

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit prefixes:
- `feat: ...` for features
- `fix: ...` for bug fixes
- `chore: ...` for maintenance/content updates

For PRs, include:
- Clear scope and motivation
- Linked issue (if applicable)
- Screenshots/GIFs for UI or content layout changes
- Notes on i18n updates and manual verification steps
