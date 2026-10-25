# Adding content to this site

How the content is laid out and the rules for adding to it. Written for humans and for AI agents. Read it before creating or editing a post, project or page.

Related files:

- [ai-writing-rules.md](ai-writing-rules.md) - **required reading for any prose you write.** Banned words, tone, and the rules for excerpts. Anything you generate must pass its self-check (section 5).
- [scripts/frontmatter/taxonomy.json](scripts/frontmatter/taxonomy.json) - the allowed categories and tags.
- [scripts/lint-frontmatter.mjs](scripts/lint-frontmatter.mjs) - the validator. Run `npm run lint:frontmatter` before you finish.
- [README.md](README.md) - build and deploy.

## 1. Layout

| Path | What it holds | URL |
|---|---|---|
| `_posts/` | Blog posts, one Markdown file each | `/<slug>/` |
| `_projects/` | Project pages | `/projects/<slug>/` |
| `_flockingai/` | Flocking AI image entries (own layout, Midjourney metadata) | `/flockingai/<slug>/` |
| `_pages/` | Standalone pages (about, now, uses, cv, ...) | set by `permalink:` |
| `public/uploads/<year>/` | Images and files used by content | `/uploads/<year>/<file>` |
| `public/` | Other static files copied to the site root as is | `/<path>` |
| `_archived-uploads/` | Old media no longer referenced. Do not link to it | none |
| `src/` | Astro layouts, components, pages. Not content | n/a |
| `scripts/` | Lint and migration scripts | n/a |

The site is Astro, built to static HTML (`npm run build`). `npm run dev` previews it locally.

Existing URLs are permanent. Never change a `slug` or `permalink` on a published entry, and never rename a file in a way that changes its slug.

## 2. Posts

### File name

`_posts/YYYY-MM-DD-slug.md`, for example `_posts/2024-11-24-tetragonal-trapezohedron-retrospective.md`. The date in the file name matches `date:`. The slug part matches `slug:`.

### Frontmatter

```yaml
---
title: "Tetragonal Trapezohedron Retrospective"
date: 2024-11-24 00:01:00
slug: tetragonal-trapezohedron-retrospective
categories:
  - Projects
tags:
  - pcb
  - led
  - esp32
excerpt: "A paper-and-glass LED lamp shaped like a tetragonal trapezohedron, with the build notes."
header:
  teaser: /uploads/2024/trapezohedron.jpg
---
```

| Field | Required | Rule |
|---|---|---|
| `title` | yes | Non-empty string, in double quotes. |
| `date` | yes | `YYYY-MM-DD HH:MM:SS`. Posts on the same day get different times so the order is stable. |
| `slug` | yes | Lowercase kebab-case: letters, digits, hyphens. Unique across all posts. This is the URL. |
| `categories` | yes | A list with **exactly one** entry from `canonicalCategories`. |
| `tags` | yes | A list of **1 to 10** entries, all from `canonicalTags`, all lowercase kebab-case. |
| `excerpt` | yes | The description. See section 6. |
| `header.teaser` | no | Card/preview image. Must start with `/uploads/`, never `/public/uploads/`. |
| `toc` | no | `true` or `false` for a table of contents. |

Do not add other fields unless the site code reads them.

### Categories

Pick one:

`Year of Ideas`, `Year of Making`, `Vancouver`, `Dice`, `Drinking`, `Games`, `Media`, `Tips`, `Bookmarks`, `Rants`, `Self`, `Travel`, `Reviews`, `Development`, `Projects`, `Junk`, `Uncategorized`

The source of truth is `canonicalCategories` in `taxonomy.json`. Use `Uncategorized` only if nothing fits.

### Tags

Only tags in `canonicalTags` are accepted. They cover materials, techniques, hardware, languages, topics and game genres (`wood`, `laser-cut`, `esp32`, `kicad`, `code`, `ai`, `vancouver`, `ideas`, `game-idea`, ...). Open `taxonomy.json` for the full list.

If you truly need a new tag, add it to `canonicalTags` in `taxonomy.json` in the same change, keep it lowercase kebab-case, and say so in the commit message. Prefer an existing tag.

### Body

- Markdown, with HTML allowed where Markdown can't do it.
- Start at `##`. The page title already renders as the `h1`, so do not repeat it.
- Headings are sentence case.
- No code fences around things that are not code.
- Link to other posts with a site-relative path (`/slug/`) and to projects with `/projects/slug/`. Do not hard-code the full domain for internal links.

## 3. Projects

### File name

`_projects/YYYY-slug.md`, with the **year the project started**, for example `_projects/2025-skypixles.md`.

### Frontmatter

Same required fields and rules as posts, with these differences:

- `categories` is `Projects`.
- `slug` starts with the year, matching the file name: `2025-skypixles`.
- `title` starts with the year in brackets: `"(2025) Skypixels"`.

```yaml
---
title: "(2025) Skypixels"
date: 2025-05-09 00:00:00
slug: 2025-skypixles
categories:
  - Projects
tags:
  - art
  - code
  - photo
excerpt: "A timeline of the sky's average colour, sampled from public web cams every five minutes."
header:
  teaser: /uploads/2025/skypixels-header.png
toc: false
---
```

### Body

Open with the one-line blockquote summary, then an `## Overview`, then the details (what it is, why, how it was built, status, links to related posts). Link to the posts that document the build.

## 4. Flocking AI entries and pages

- `_flockingai/` entries follow the existing files there. Copy a recent entry and change it. They carry extra fields (such as `species` and `midjourney`) that the Flocking AI layout reads.
- `_pages/` files set their own `permalink:` and often `sitemap: false`. Look at a neighbouring page before adding one. New top-level pages also need a nav link in `src/`.

## 5. Images and files

- Put files in `public/uploads/<year>/`, using the year of the post. Reference them as `/uploads/<year>/<file>`.
- File names: lowercase, hyphens instead of spaces, no special characters.
- Always write alt text: `![A short description](/uploads/2025/file.jpg)`.
- Resize before committing. Photos wider than about 2000 px are wasted bytes.
- Do not link to `_archived-uploads/`.

## 6. Writing the excerpt (the page description)

The `excerpt` is used as the meta description and in cards and search results. The full rules are in [ai-writing-rules.md](ai-writing-rules.md), section 3. In short:

1. One sentence, 160 characters or fewer.
2. Present tense, neutral voice: "A laser-cut map of Vancouver...", "How to ...", "Review of ...". Not "I built...".
3. Name the actual thing, with specifics. Not the reading experience.
4. No meta-phrases: "this post", "this project", "a look at", "a deep dive into", "an exploration of".
5. No emoji, no HTML, no double quotes inside the text.
6. None of the banned words in ai-writing-rules.md section 1. The lint rejects the common ones.

Good: `"A wall-mounted monthly habit tracker, one row per habit, one column per day, magnets for the marks."`

Bad: `"Delving into the intricate world of habit tracking to foster meaningful daily change."`

## 7. Writing style

Everything on the site is written in Steven's voice: plain, short, concrete, first person for posts. Follow [ai-writing-rules.md](ai-writing-rules.md). Before you return any text, run its self-check (section 5).

Also:

- American-style spelling is not required. Be consistent within a post.
- Spell-check. Use real contractions (`don't`, not `dont`).
- "I", never lowercase "i" for the pronoun. "an" before a vowel sound, "a" before a consonant sound.
- Do not rewrite the voice of old posts. Fix typos and broken characters, nothing more.
- Do not state facts you can't back up. If a detail is unknown, leave it out.

### Tells that survive the word checks

A draft can pass every check in ai-writing-rules.md section 5 and still read as AI. These four came out of the Tokyo post, which passed the word list on the first try and still had to be rewritten.

- **A punchline at the end of every paragraph.** The surest tell. An LLM lands each paragraph on a tidy quotable line: "and nothing fails loudly", "I'm writing it up now because the part I find interesting has already happened", "It was both." One or two in a post is voice. One per paragraph is a machine trying to sound profound. Let most paragraphs just stop when the information runs out.
- **Explaining the lesson instead of saying what happened.** "That's true while the routing exists, because the via is near the pad because a track runs to it" teaches the reader. Say what happened, say what it looked like, move on. The reader can draw the moral.
- **Tables in a post.** Posts make their comparisons in prose. Tables belong on project pages and in docs like this one. If a draft post has a table, write it out as sentences instead.
- **Even sentence rhythm.** Covered as 2h in ai-writing-rules.md, but worth numbers. Measured over the posts:

| Post | Mean words per sentence | Stdev | Sentences under 6 words |
| --- | --- | --- | --- |
| Montréal Métro PCB | 14.9 | 6.3 | 5.9% |
| Mixxtape | 15.8 | 7.6 | 4.8% |
| Vancouver SkyTrain v3 | 20.3 | 8.1 | 0% |

Aim for a mean of 14 to 18 words with a standard deviation around 7. Short sentences carry weight here because they are rare, roughly one in seventeen. **Overcorrecting is its own tell**: the first rewrite of the Tokyo post hit 19% short sentences and read as staccato, which is no more like Steven than the smooth version was. Fix the rhythm by rejoining sentences that were split for effect, not by chopping more.

Do not tune a draft until it matches those numbers. They are a check on a finished draft, not a target to write against.

## 8. Before you commit

```bash
npm run lint:frontmatter
```

Fix every error your files introduce. A few older entries still fail on slug format (underscores, upper case). Those slugs are live URLs, so leave them.

Optional checks:

```bash
npm run lint:md
npm run build
```

Checklist for a new post or project:

- [ ] File name follows the pattern and matches `date` and `slug`
- [ ] `title`, `date`, `slug`, `categories` (one), `tags` (1-10, canonical), `excerpt` are all present
- [ ] `excerpt` follows section 6
- [ ] Images are in `public/uploads/<year>/` with alt text
- [ ] Internal links are site-relative
- [ ] Spelling checked
- [ ] Lint passes for the new file
- [ ] Read once for the tells in section 7, which the lint cannot catch

## 9. Git

- Agents commit as `SWS-Chipkin <sws-dev@chipkin.com>`, set explicitly on each commit. Never commit under a human's name.
- Commit message subjects are short. Wrap the body at about 72 characters.
- Do not hard-wrap text posted to GitHub (pull request and issue titles, bodies, comments). One paragraph is one line.
- Keep content changes (posts, projects) separate from code changes (`src/`, `scripts/`) so each commit is easy to review.
