# blog.abluestar.com

Personal website source for [blog.abluestar.com](https://blog.abluestar.com/), migrated from Jekyll to Astro 6 and intended for deployment on Cloudflare Pages.

## Stack
- Astro 6 static build
- Cloudflare Pages hosting
- Existing Markdown content kept in `_posts`, `_projects`, `_flockingai`, and `_pages`
- Static assets preserved from `public/` and `other/`
- `utterances` comments retained on posts and Flocking AI entries

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Build output is written to `dist/`.

## Cloudflare Pages
- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22`

## Migration notes
- Google CSE search was removed and is not carried forward.
- The Elfsight embed was removed from `/about`.
- The `other/` directory is copied into the final build as preserved static content.
- Root `/` redirects to `/about` and `/birds` redirects to `/projects/2021-bird-playing-cards/`.
