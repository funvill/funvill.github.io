---
title: "Migrating from Jekyll to Astro"
date: 2026-06-22 00:01:00
categories:
- meta
tags:
- web
- astro
- jekyll
- meta
excerpt: "On June 21, 2026 I switched the site from Jekyll to Astro and rebuilt the theme from scratch. Here's why."
---

The blog has been running on [Jekyll](https://jekyllrb.com/) since around 2014, sitting on top of the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme. It worked fine for a long time. Write a [Markdown](https://www.markdownguide.org/) file, push to [GitHub](https://github.com/funvill/funvill.github.io), done.

But after a while I stopped adding things. The old site felt like an information dump. Everything was sorted into columns and sidebars and taxonomies. It was functional but it wasn't fun. I wanted something more whimsical and creative, something that felt like a workshop or a sketchbook rather than a filing cabinet. Updating the theme was the precursor to actually posting again. Hopefully it works.

## Why Astro

The main reason is that I've been using [Astro](https://astro.build/) at my day job at [Chipkin](http://store.chipkin.com/) and finding it genuinely useful. It made sense to bring it home.

Astro builds to plain static HTML by default. No JavaScript runtime, no client-side framework hydrating things in the browser. The pages load fast and work without JS. For a blog that's the right trade-off.

The component model is sensible too. Instead of Jekyll's [Liquid](https://shopify.github.io/liquid/) templates and `_includes/` folders full of `.html` snippets, you write `.astro` files that are a clean mix of HTML and TypeScript. The [front matter](https://jekyllrb.com/docs/front-matter/) is real code rather than [YAML](https://yaml.org/) config talking to a template engine, so pulling in content, filtering it, and building pages is just JavaScript.

Getting off [Ruby](https://www.ruby-lang.org/) was also a relief. Every time I came back to the Jekyll site after a few months away I needed to untangle Gem version conflicts before I could do anything. With Astro the whole toolchain is [Node.js](https://nodejs.org/) and `npm install` just works.

## The new theme

I used [Claude Design](https://claude.ai/) to help design the new theme, which was a useful experiment in itself. The old site was recognizably a Minimal Mistakes site, which is fine, but it looked like every other blog on that theme. The new design uses a dark starfield header, a custom design token system, and a star motif that runs through the whole thing. It feels more like mine, more playful.

![About page with the new design](/uploads/2026/website-about-2026.png)

![Projects page](/uploads/2026/website-projects-2026.png)

![Blog page](/uploads/2026/website-blog-2026.png)

## What changed

**Search that actually works.** The old [Lunr.js](https://lunrjs.com/) setup was wired up wrong and never filtered anything. The new site uses [Pagefind](https://pagefind.wild-alaskan.net/), which runs at build time and indexes every page. The header search now goes to a real `/search` page with full-text results across posts and projects.

**GitHub Actions deploy.** Deployment runs through [withastro/action](https://github.com/withastro/action) on push to master. It installs dependencies, runs `astro build`, runs `pagefind --site dist` to build the search index, and ships the output to [GitHub Pages](https://pages.github.com/).

## The numbers

The old site: roughly 35,000 lines of Sass, 15,000 lines of JavaScript, a 328-line `_config.yml`, and around 170 Liquid template files.

The new site: a handful of `.astro` components, about 900 lines of custom CSS, TypeScript for content, and no runtime JavaScript except where actually needed.