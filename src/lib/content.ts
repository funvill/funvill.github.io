import fs from 'node:fs';
import path from 'node:path';
import { Marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { parseDocument } from 'yaml';

const marked = new Marked({
  gfm: true,
  breaks: false,
  async: false
});
marked.use(gfmHeadingId());

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, '_posts');
const PROJECTS_DIR = path.join(ROOT, '_projects');
const FLOCKING_DIR = path.join(ROOT, '_flockingai');
const PAGES_DIR = path.join(ROOT, '_pages');
const SITE_URL = 'https://blog.abluestar.com';

export type HeaderMeta = {
  teaser?: string;
};

export type ContentEntry = {
  id: string;
  slug: string;
  collection: 'posts' | 'projects' | 'flockingai' | 'pages';
  filePath: string;
  title: string;
  excerpt?: string;
  description?: string;
  date?: Date;
  permalink: string;
  layout?: string;
  redirectTo?: string;
  categories: string[];
  tags: string[];
  header: HeaderMeta;
  html: string;
  rawContent: string;
  headings: { depth: number; text: string; slug: string }[];
  draft: boolean;
  species?: string;
  prompt?: string;
  midjourney?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  gallery?: string[];
  toc?: boolean;
  comments?: boolean;
};

function normalizeAssetPaths(content: string) {
  return content
    .replaceAll('{{site.baseurl}}/public/', '/')
    .replace(/{{site\.baseurl}}\/public[\\/]+/g, '/')
    .replace(/[\\/]public[\\/]+/g, '/')
    .replace(/[\\/]uploads[\\/]+/g, '/uploads/')
    .replace(/src='\\/g, "src='/")
    .replace(/href='\\/g, "href='/")
    .replace(/src="\\/g, 'src="/')
    .replace(/href="\\/g, 'href="/')
    .replace(/<(img|a|source)[^>]*>/g, (tag) => tag.replaceAll('\\', '/'))
    .replace(/url\(([^)]*)\)/g, (value) => value.replaceAll('\\', '/'));
}

function normalizePublicUrl(value?: string) {
  if (!value) return value;
  return value
    .replace(/{{site\.baseurl}}\/public[\\/]+/g, '/')
    .replace(/[\\/]public[\\/]+/g, '/')
    .replace(/[\\/]uploads[\\/]+/g, '/uploads/')
    .replaceAll('\\', '/');
}

// Acronyms and proper nouns where the canonical casing is NOT title-case.
// Keys are the lowercase-kebab tag value; values are the display form.
const TAG_DISPLAY_OVERRIDES: Record<string, string> = {
  ai: 'AI',
  c: 'C',
  cnc: 'CNC',
  cpp: 'C++',
  esp32: 'ESP32',
  esp8266: 'ESP8266',
  fastled: 'FastLED',
  jlcpcb: 'JLCPCB',
  kicad: 'KiCad',
  led: 'LED',
  pcb: 'PCB',
  php: 'PHP',
  vhs: 'VHS',
  ws2812: 'WS2812',
  '3d-printing': '3D Printing',
  'raspberry-pi': 'Raspberry Pi',
  'stained-glass': 'Stained Glass',
  'maker-faire': 'Maker Faire',
  'laser-cut': 'Laser Cut'
};

export function displayTag(tag: string) {
  const key = tag.toLowerCase();
  if (TAG_DISPLAY_OVERRIDES[key]) return TAG_DISPLAY_OVERRIDES[key];
  return tag
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export function displayCategory(cat: string) {
  // Canonical categories from taxonomy.json are already display-cased
  // ("Year of Ideas", "Projects", etc.). Echo back unchanged.
  return cat;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function absoluteUrl(url: string) {
  if (!url.startsWith('/')) return url;
  return `${SITE_URL}${url}`;
}

function listFiles(dir: string) {
  return fs.readdirSync(dir)
    .filter((name) => fs.statSync(path.join(dir, name)).isFile())
    .sort();
}

function parseFrontmatter(raw: string) {
  if (!raw.startsWith('---')) {
    return { data: {}, content: raw };
  }
  const lines = raw.split(/\r?\n/);
  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === '---') {
      end = i;
      break;
    }
  }
  if (end === -1) {
    return { data: {}, content: raw };
  }
  const yaml = lines.slice(1, end).join('\n');
  const content = lines.slice(end + 1).join('\n');
  const document = parseDocument(yaml, { uniqueKeys: false, merge: true });
  return {
    data: (document.toJS() ?? {}) as Record<string, unknown>,
    content
  };
}

function parseDate(value: unknown) {
  if (!value) return undefined;
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function renderMarkdown(content: string) {
  const normalized = normalizeAssetPaths(content);
  const tokens = marked.lexer(normalized);
  const headings = tokens
    .filter((token: any) => token.type === 'heading')
    .map((token: any) => ({
      depth: token.depth,
      text: token.text,
      slug: token.tokens?.find?.((t: any) => t.type === 'text')?.text ? slugify(token.text) : slugify(token.text)
    }));
  const html = marked.parser(tokens) as string;
  return { html, headings };
}

function baseName(fileName: string) {
  return decodeURIComponent(fileName.replace(/\.[^.]+$/, '')).trim();
}

function postSlugFromFile(fileName: string) {
  return baseName(fileName).replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function ensureArray(value: unknown) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return [String(value)];
}

function createEntry(filePath: string, collection: ContentEntry['collection']): ContentEntry {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = parseFrontmatter(raw);
  const data = parsed.data as Record<string, any>;
  const fileName = path.basename(filePath);
  const derivedSlug = collection === 'posts' ? postSlugFromFile(fileName) : baseName(fileName);
  const slug = data.slug ? decodeURIComponent(String(data.slug).trim()) : derivedSlug;
  const permalink = data.permalink
    ? String(data.permalink).trim()
    : collection === 'posts'
      ? `/${slug}/`
      : `/${collection}/${slug}/`;
  const rendered = renderMarkdown(parsed.content);
  return {
    id: `${collection}:${slug}`,
    slug,
    collection,
    filePath,
    title: String(data.title ?? slug),
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
    description: data.excerpt ? String(data.excerpt).replace(/<[^>]+>/g, '') : undefined,
    date: parseDate(data.post_date ?? data.date),
    permalink,
    layout: data.layout ? String(data.layout) : undefined,
    redirectTo: data.redirect_to ? String(data.redirect_to) : undefined,
    categories: ensureArray(data.categories),
    tags: ensureArray(data.tags),
    header: {
      ...(data.header ?? {}),
      teaser: normalizePublicUrl(data.header?.teaser)
    } as HeaderMeta,
    html: rendered.html,
    rawContent: parsed.content,
    headings: rendered.headings,
    draft: false,
    species: data.species ? String(data.species) : undefined,
    prompt: data.prompt ? String(data.prompt) : undefined,
    midjourney: data.midjourney ? String(data.midjourney) : undefined,
    instagram: data.instagram ? String(data.instagram) : undefined,
    twitter: data.twitter ? String(data.twitter) : undefined,
    facebook: data.facebook ? String(data.facebook) : undefined,
    gallery: Array.isArray(data.gallery) ? data.gallery.map((item) => normalizePublicUrl(String(item))!) : undefined,
    toc: Boolean(data.toc),
    comments: data.comments !== false
  };
}

let postsCache: ContentEntry[] | undefined;
let projectsCache: ContentEntry[] | undefined;
let flockingCache: ContentEntry[] | undefined;
let pagesCache: ContentEntry[] | undefined;

export function getSiteMeta() {
  return {
    siteUrl: SITE_URL,
    title: 'A Blue Star',
    author: 'Steven Smethurst',
    description: 'Steven Smethurst is a Vancouver based Maker, Hacker, Coder, Artist, and all around great guy!',
    nav: [
      { href: '/about', label: 'About' },
      { href: '/projects', label: 'Projects' },
      { href: '/blog', label: 'Blog' },
      { href: '/uses', label: 'Tools' },
      { href: '/cv', label: 'CV' }
    ],
    social: [
      { href: 'https://mastodon.social/@funvill', label: 'Mastodon' },
      { href: 'https://instagram.com/funvill', label: 'Instagram' },
      { href: 'https://github.com/funvill', label: 'GitHub' },
      { href: 'https://www.inaturalist.org/people/funvill', label: 'iNaturalist' }
    ]
  };
}

export function getPosts() {
  if (!postsCache) {
    postsCache = listFiles(POSTS_DIR).map((file) => createEntry(path.join(POSTS_DIR, file), 'posts'));
    postsCache.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
  }
  return postsCache;
}

export function getProjects() {
  if (!projectsCache) {
    projectsCache = listFiles(PROJECTS_DIR).map((file) => createEntry(path.join(PROJECTS_DIR, file), 'projects'));
    projectsCache.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0) || a.slug.localeCompare(b.slug));
  }
  return projectsCache;
}

export function getFlockingAiEntries() {
  if (!flockingCache) {
    flockingCache = listFiles(FLOCKING_DIR).map((file) => createEntry(path.join(FLOCKING_DIR, file), 'flockingai'));
    flockingCache.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0) || a.slug.localeCompare(b.slug));
  }
  return flockingCache;
}

export function getPages() {
  if (!pagesCache) {
    pagesCache = listFiles(PAGES_DIR).map((file) => createEntry(path.join(PAGES_DIR, file), 'pages'));
  }
  return pagesCache;
}

export function getPageByPermalink(permalink: string) {
  return getPages().find((page) => page.permalink.replace(/\/$/, '') === permalink.replace(/\/$/, ''));
}

export function getPostBySlug(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}

export function getProjectBySlug(slug: string) {
  return getProjects().find((entry) => entry.slug === slug);
}

export function getFlockingBySlug(slug: string) {
  return getFlockingAiEntries().find((entry) => entry.slug === slug);
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    currentPage,
    totalPages,
    pageSize
  };
}

export function formatDate(date?: Date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Vancouver'
  }).format(date);
}

export function collectTags(entries: ContentEntry[]) {
  const counts = new Map<string, { name: string; count: number }>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      const slug = slugify(tag);
      const current = counts.get(slug);
      counts.set(slug, { name: current?.name ?? tag, count: (current?.count ?? 0) + 1 });
    }
  }
  return [...counts.entries()]
    .map(([slug, value]) => ({ name: value.name, count: value.count, slug }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function collectCategories(entries: ContentEntry[]) {
  const counts = new Map<string, { name: string; count: number }>();
  for (const entry of entries) {
    for (const category of entry.categories) {
      const slug = slugify(category);
      const current = counts.get(slug);
      counts.set(slug, { name: current?.name ?? category, count: (current?.count ?? 0) + 1 });
    }
  }
  return [...counts.entries()]
    .map(([slug, value]) => ({ name: value.name, count: value.count, slug }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getEntriesByTag(tagSlug: string) {
  return getPosts().filter((post) => post.tags.some((tag) => slugify(tag) === tagSlug));
}

export function getEntriesByCategory(categorySlug: string) {
  return getPosts().filter((post) => post.categories.some((category) => slugify(category) === categorySlug));
}

export function groupPostsByYear() {
  const years = new Map<string, ContentEntry[]>();
  for (const post of getPosts()) {
    const year = String(post.date?.getUTCFullYear() ?? 'Unknown');
    if (!years.has(year)) years.set(year, []);
    years.get(year)!.push(post);
  }
  return [...years.entries()]
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, posts]) => ({ year, posts }));
}

export function canonical(pathname: string) {
  return absoluteUrl(pathname);
}
