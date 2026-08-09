# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Pete Martin's personal site (pwm1991.com), built with Hugo. Static output is committed-free (`build/` is gitignored) and deployed via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — `hugo server -O`, local dev server with drafts
- `npm run build` — `hugo`, outputs to `build/` (per `publishDir` in `config.toml`)
- `npm run lint` / `npm run lint:fix` — ESLint (config is just Prettier-as-lint, see below)
- `npm run prettier` / `npm run prettier:fix` — Prettier check/write

There is no test suite (`npm test` is a stub that exits with an error).

Hugo itself is not an npm dependency — it must be installed separately (e.g. `brew install hugo`). CI pins Hugo `0.139.4` extended (see `.github/workflows/deploy.yml`).

## Architecture

- **Content** (`content/`): Markdown posts. Each post lives in its own directory (`content/blog/<slug>/index.md`) so page-bundle resources (images) sit alongside the post and are referenced via the `post-image` shortcode, which resizes to 800px webp via Hugo's image processing.
- **Layouts** (`layouts/`): all templates live under `layouts/`, no theme is used.
  - `_default/baseof.html` is the single base template all pages extend.
  - `layouts/partials/` is organized by page region (`head/`, `main/`, `post/`, `section/`).
  - `layouts/shortcodes/` are the only Markdown-callable helpers (`post-image`, `icon-link`, `subtitle`).
- **Styling** (`assets/css/`): SCSS partials (`_color.scss`, `_font.scss`, `_grid.scss`, etc.) imported into `index.scss`; compiled by Hugo Pipes, not a separate build step.
- **Config** (`config.toml`): site nav/menu, pagination (6 posts/page under `/blog`), and markdown rendering (`unsafe = true` in goldmark, so raw HTML in Markdown is allowed).

## Conventions

- Post frontmatter: `title`, `date`, `tags` (see `archetypes/default.md` for the scaffold used by `hugo new`).
- Deployment is fully automated: pushing to `main` triggers `hugo --minify` and publishes `build/` to GitHub Pages. There's no manual deploy step.
