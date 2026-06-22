# Content Audit

## Collections
- `_posts`: blog post source. Permalink target `/:title/`.
- `_projects`: custom collection. Permalink target `/projects/:slug/`.
- `_flockingai`: custom collection. Permalink target `/flockingai/:slug/`.
- `_pages`: top-level authored pages and redirect stubs.

## Preserved Top-Level Routes
- `/about`
- `/blog`
- `/projects`
- `/cv`
- `/uses`
- `/now`
- `/ideas`
- `/quotes`
- `/categories`
- `/tags`
- `/year-archive`
- `/sitemap`
- `/flockingai`
- `/birds`
- `/404.html`
- `/`

## Redirects
- `/` -> `/about`
- `/birds` -> `/projects/2021-bird-playing-cards/`
- Additional redirect pages in `_pages` should be carried over if discovered later.

## Retired Dependencies
- Google CSE search
- Elfsight embed on `/about`

## Static Assets To Preserve
- `public/uploads/**`
- `other/**`
- `favicon.ico`
- `keybase.txt`
- `CNAME`

## Deferred For Later Review
- `other/medallion` app migration into Astro
- search replacement beyond no-search v1
- richer comments customization beyond `utterances`
