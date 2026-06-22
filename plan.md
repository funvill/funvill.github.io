# Astro + Cloudflare Migration Plan

## Summary
- Target: migrate the main site from Jekyll on GitHub Pages to Astro on Cloudflare Pages.
- Chosen direction: full redesign of the main site, while preserving all existing URLs.
- Deployment target: Cloudflare Pages with static Astro output by default; only add Functions if a concrete redirect/runtime need appears.
- `other/` stays separate for v1. Treat those pages/apps as preserved static subpaths, not part of the initial Astro rewrite.
- Updated decisions:
  - Do not carry forward Google CSE.
  - Remove the Elfsight embed from `/about`.

## Current Site Inventory
- Theme/runtime: Jekyll with Minimal Mistakes, `contrast` skin, wide layouts, breadcrumb support, paginated blog index, category/tag archives, sitemap, feed, and Jekyll collections.
- Primary information architecture:
  - Root `/` redirects to `/about`
  - Main nav: `/about`, `/projects`, `/blog`, `/uses`, `/cv`
  - Additional pages: `/now`, `/ideas`, `/quotes`, `/categories`, `/tags`, `/year-archive`, `/sitemap`, `/flockingai`, `/birds` redirect, custom `404`
- Content volume:
  - `755` blog posts in `_posts`
  - `30` project entries in `_projects`
  - `303` `Flocking AI` entries in `_flockingai`
  - `16` Jekyll pages in `_pages`
  - `3183` uploaded media files in `public/uploads`
- Distinctive site-specific behaviors to preserve or explicitly replace:
  - Custom `Flocking AI` collection index and detail layout with Midjourney metadata, gallery treatment, and license block
  - `utterances` comments on posts and Flocking AI entries
  - Explicit HTML redirect pages such as `/`, `/birds`
  - Large historical media archive with many inline image references inside Markdown/HTML content
  - Standalone microsites/tools under `other/`, especially `other/medallion`, which is effectively its own app
- Behaviors to retire:
  - Google CSE search
  - Elfsight embed on `/about`

## Key Changes
- Create an Astro site that models three first-class content domains:
  - Posts
  - Projects
  - Flocking AI entries
- Define Astro content schemas that cover the frontmatter actually in use:
  - Common fields: `title`, `excerpt`, `date` or `post_date`, `tags`, `categories`, `header.teaser`, `toc`, `permalink`, `redirect_to`
  - Flocking AI-specific fields: `species`, `midjourney`, any gallery/image metadata used by custom includes
- Preserve existing URLs exactly:
  - Post permalinks remain `/:title/`
  - Project permalinks remain `/projects/:slug/`
  - Flocking AI permalinks remain `/flockingai/:slug/`
  - Keep `/about`, `/blog`, `/projects`, `/cv`, `/uses`, `/now`, `/ideas`, `/quotes`, `/categories`, `/tags`, `/year-archive`, `/sitemap`, `/birds`, `/404.html`
  - Recreate root redirect `/ -> /about`
- Redesign the visual system in Astro rather than cloning Minimal Mistakes:
  - Keep the site's personal-archive identity, project-heavy emphasis, and maker/artist tone
  - Build a custom design system for typography, navigation, cards, article pages, archive pages, and collection pages
  - Preserve recognizable content structure such as author/profile context, project grids, and archive discoverability
- Search strategy:
  - Remove Google CSE entirely
  - Replace it with either no site search in v1 or a local/static Astro search solution during implementation
  - Keep search out of the critical path unless it is needed to preserve core navigation and discoverability
- About page strategy:
  - Remove Elfsight script/embed
  - Replace with static authored content, curated links, featured projects, or social links if the redesigned page needs a richer lower section
- Treat supporting features as follows:
  - Keep: main nav, content pages, post pages, project pages, Flocking AI collection, sitemap, feed, redirects
  - Re-evaluate during implementation: comments and archive UX
  - Default v1 posture: keep archives available, but redesign their presentation
- Keep `other/` outside the Astro content migration:
  - Continue serving existing files under their current paths on Cloudflare
  - Inventory each sub-app for later follow-up, with `other/medallion` explicitly tracked as a separate migration candidate
- Cloudflare setup:
  - Deploy Astro static output to Cloudflare Pages
  - Move DNS/custom domain from GitHub Pages to Cloudflare
  - Recreate redirect behavior using static redirect rules or Cloudflare config as needed
  - Preserve SEO-critical outputs: sitemap, feed, robots behavior, canonical URLs, verification meta tags

## Implementation Sequence
- Phase 1: write `plan.md` with the research inventory above and the migration decisions already chosen.
- Phase 2: build a content audit/mapping table for pages, collections, redirects, archives, comments, retired features, and `other/` paths.
- Phase 3: scaffold Astro with content collections, shared layout primitives, Cloudflare Pages config, and redirect strategy.
- Phase 4: build the redesigned main routes first:
  - `/about`, `/projects`, `/blog`, `/cv`, `/uses`, `/now`, `/ideas`
  - post detail pages
  - project detail pages
  - Flocking AI index and detail pages
- Phase 5: migrate secondary/archive routes:
  - `/categories`, `/tags`, `/year-archive`, `/quotes`, `/sitemap`, `/404.html`, `/birds`, root redirect
- Phase 6: decide and implement v1 search posture:
  - no search, or local/static search only
  - no Google-hosted search dependency
- Phase 7: validate rendered content against the Jekyll site, especially inline HTML, media references, embeds, and permalink parity.
- Phase 8: cut over to Cloudflare Pages and verify DNS, HTTPS, redirects, and crawlability.

## Public Interfaces / Outputs
- Astro content collections for `posts`, `projects`, and `flockingai`
- Redirect manifest/config for legacy URLs and shortlinks
- Cloudflare Pages project config and domain/DNS mapping
- Generated outputs that must remain available: `sitemap.xml`, feed, `404.html`, preserved static `other/` paths

## Test Plan
- URL parity checks for representative samples from:
  - recent posts
  - old posts
  - projects
  - Flocking AI entries
  - archives
  - short-link redirects
- Content rendering checks:
  - Markdown plus inline HTML
  - local media paths under `public/uploads`
  - teaser images and collection cards
  - removal of the Elfsight embed from `/about`
- Feature checks:
  - root redirect to `/about`
  - `/birds` redirect
  - blog pagination
  - category/tag/year archive availability
  - sitemap/feed generation
  - 404 behavior on Cloudflare
  - no Google CSE scripts or markup in the Astro build
- SEO checks:
  - canonical URLs
  - meta verification tags
  - sitemap discoverability
  - no broken internal links for preserved routes
- Deployment checks:
  - Cloudflare Pages build succeeds
  - custom domain resolves correctly
  - HTTPS enforced
  - static assets and `other/` subpaths served correctly

## Assumptions
- This plan is the intended content for `plan.md`.
- Main site gets a full redesign; content model and URL structure do not.
- `other/` is preserved as static content for v1, not rewritten into Astro.
- Cloudflare Pages static hosting is sufficient for v1.
- Google CSE is removed and not replaced with another third-party hosted search dependency.
- Elfsight is removed rather than ported.
