#!/usr/bin/env node
// Phase A: read-only audit of frontmatter across _posts/, _projects/, _pages/, _flockingai/.
// Emits scripts/frontmatter/out/audit.json (raw parsed data) + audit-summary.md (human-readable counts).
// No writes to content. Run: node scripts/frontmatter/01-audit.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(__dirname, 'out');
const COLLECTIONS = [
  { name: 'posts', dir: path.join(ROOT, '_posts') },
  { name: 'projects', dir: path.join(ROOT, '_projects') },
  { name: 'pages', dir: path.join(ROOT, '_pages') },
  { name: 'flockingai', dir: path.join(ROOT, '_flockingai') }
];

fs.mkdirSync(OUT_DIR, { recursive: true });

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { data: {}, body: raw, hasFm: false };
  const lines = raw.split(/\r?\n/);
  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === '---') { end = i; break; }
  }
  if (end === -1) return { data: {}, body: raw, hasFm: false };
  const yaml = lines.slice(1, end).join('\n');
  let data = {};
  let parseError = null;
  try {
    const doc = parseDocument(yaml, { uniqueKeys: false, merge: true });
    data = doc.toJS() ?? {};
  } catch (e) {
    parseError = String(e.message || e);
  }
  return {
    data,
    body: lines.slice(end + 1).join('\n'),
    hasFm: true,
    parseError
  };
}

function derivePostSlug(fileName) {
  return fileName.replace(/\.[^.]+$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function deriveProjectSlug(fileName) {
  return fileName.replace(/\.[^.]+$/, '');
}

function detectEol(raw) {
  if (raw.includes('\r\n')) return 'CRLF';
  if (raw.includes('\n')) return 'LF';
  return 'NONE';
}

const allEntries = [];
const fieldCounts = {};
const collectionFieldCounts = {};
const categoryCounts = {};
const tagCounts = {};
const categoryByFile = [];
const tagShapes = { string: 0, array: 0, missing: 0 };
const dateShapes = { date: 0, post_date: 0, both: 0, neither: 0 };
const eolCounts = { CRLF: 0, LF: 0, NONE: 0 };
const slugCollisions = [];
const slugBySlug = new Map();
const titlesWithSpecialChars = [];
const teaserPaths = { '/public/uploads/': 0, '/uploads/': 0, other: 0, none: 0 };
const parseErrors = [];

for (const { name: collection, dir } of COLLECTIONS) {
  if (!fs.existsSync(dir)) continue;
  collectionFieldCounts[collection] = {};
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  for (const fileName of files) {
    const filePath = path.join(dir, fileName);
    const raw = fs.readFileSync(filePath, 'utf8');
    const eol = detectEol(raw);
    eolCounts[eol] = (eolCounts[eol] ?? 0) + 1;
    const { data, parseError } = parseFrontmatter(raw);
    if (parseError) parseErrors.push({ filePath, parseError });

    // field presence
    for (const k of Object.keys(data)) {
      fieldCounts[k] = (fieldCounts[k] ?? 0) + 1;
      collectionFieldCounts[collection][k] = (collectionFieldCounts[collection][k] ?? 0) + 1;
    }

    // date shape
    const hasDate = data.date != null;
    const hasPostDate = data.post_date != null;
    if (hasDate && hasPostDate) dateShapes.both += 1;
    else if (hasDate) dateShapes.date += 1;
    else if (hasPostDate) dateShapes.post_date += 1;
    else dateShapes.neither += 1;

    // categories
    let cats = [];
    if (Array.isArray(data.categories)) cats = data.categories.map(String);
    else if (typeof data.categories === 'string') cats = data.categories.split(/\s+/).filter(Boolean);
    for (const c of cats) categoryCounts[c] = (categoryCounts[c] ?? 0) + 1;
    categoryByFile.push({ collection, fileName, cats });

    // tags
    if (Array.isArray(data.tags)) {
      tagShapes.array += 1;
      for (const t of data.tags) tagCounts[String(t)] = (tagCounts[String(t)] ?? 0) + 1;
    } else if (typeof data.tags === 'string') {
      tagShapes.string += 1;
      for (const t of data.tags.split(/\s+/).filter(Boolean)) tagCounts[t] = (tagCounts[t] ?? 0) + 1;
    } else {
      tagShapes.missing += 1;
    }

    // slug derivation
    const explicitSlug = typeof data.slug === 'string' ? data.slug.trim() : '';
    const derivedSlug = collection === 'posts' ? derivePostSlug(fileName) : deriveProjectSlug(fileName);
    const finalSlug = explicitSlug || derivedSlug;
    const slugKey = `${collection}:${finalSlug}`;
    if (slugBySlug.has(slugKey)) {
      slugCollisions.push({ slug: finalSlug, files: [slugBySlug.get(slugKey), filePath] });
    } else {
      slugBySlug.set(slugKey, filePath);
    }

    // title special chars
    const titleStr = typeof data.title === 'string' ? data.title : '';
    if (/[:"'`]/.test(titleStr) || /[‘’“”]/.test(titleStr)) {
      titlesWithSpecialChars.push({ filePath, title: titleStr });
    }

    // teaser path
    const teaser = data.header?.teaser;
    if (!teaser) teaserPaths.none += 1;
    else if (typeof teaser === 'string' && teaser.startsWith('/public/uploads/')) teaserPaths['/public/uploads/'] += 1;
    else if (typeof teaser === 'string' && teaser.startsWith('/uploads/')) teaserPaths['/uploads/'] += 1;
    else teaserPaths.other += 1;

    allEntries.push({
      collection,
      fileName,
      filePath: path.relative(ROOT, filePath).replace(/\\/g, '/'),
      eol,
      explicitSlug,
      derivedSlug,
      finalSlug,
      hasDate,
      hasPostDate,
      title: titleStr,
      categories: cats,
      tags: Array.isArray(data.tags)
        ? data.tags.map(String)
        : typeof data.tags === 'string'
          ? data.tags.split(/\s+/).filter(Boolean)
          : [],
      excerpt: typeof data.excerpt === 'string' ? data.excerpt : null,
      teaser: typeof teaser === 'string' ? teaser : null,
      permalink: typeof data.permalink === 'string' ? data.permalink : null,
      redirect_to: typeof data.redirect_to === 'string' ? data.redirect_to : null,
      layout: typeof data.layout === 'string' ? data.layout : null,
      toc: typeof data.toc === 'boolean' ? data.toc : null,
      comments: typeof data.comments === 'boolean' ? data.comments : null,
      allFields: Object.keys(data).sort()
    });
  }
}

// write raw JSON
fs.writeFileSync(
  path.join(OUT_DIR, 'audit.json'),
  JSON.stringify(
    {
      entries: allEntries,
      summary: {
        totalFiles: allEntries.length,
        byCollection: allEntries.reduce((acc, e) => { acc[e.collection] = (acc[e.collection] ?? 0) + 1; return acc; }, {}),
        fieldCounts,
        collectionFieldCounts,
        dateShapes,
        tagShapes,
        eolCounts,
        teaserPaths,
        categoryCounts,
        tagCounts,
        slugCollisions,
        titlesWithSpecialChars: titlesWithSpecialChars.length,
        parseErrors
      }
    },
    null,
    2
  ),
  'utf8'
);

// human-readable summary
const lines = [];
lines.push(`# Frontmatter audit — ${new Date().toISOString()}`);
lines.push('');
lines.push('## Counts');
lines.push('');
lines.push(`- Total files: ${allEntries.length}`);
for (const [c, n] of Object.entries(allEntries.reduce((acc, e) => { acc[e.collection] = (acc[e.collection] ?? 0) + 1; return acc; }, {}))) {
  lines.push(`  - ${c}: ${n}`);
}
lines.push('');
lines.push('## Field presence (any collection)');
lines.push('');
lines.push('| Field | Count | % |');
lines.push('|---|---:|---:|');
for (const [k, n] of Object.entries(fieldCounts).sort((a, b) => b[1] - a[1])) {
  lines.push(`| \`${k}\` | ${n} | ${((n / allEntries.length) * 100).toFixed(1)} |`);
}
lines.push('');
lines.push('## Field presence by collection');
lines.push('');
for (const [coll, counts] of Object.entries(collectionFieldCounts)) {
  const total = allEntries.filter((e) => e.collection === coll).length;
  lines.push(`### ${coll} (${total} files)`);
  lines.push('');
  lines.push('| Field | Count | % |');
  lines.push('|---|---:|---:|');
  for (const [k, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    lines.push(`| \`${k}\` | ${n} | ${((n / total) * 100).toFixed(1)} |`);
  }
  lines.push('');
}
lines.push('## Date field shape');
lines.push('');
for (const [k, n] of Object.entries(dateShapes)) lines.push(`- ${k}: ${n}`);
lines.push('');
lines.push('## Tags field shape');
lines.push('');
for (const [k, n] of Object.entries(tagShapes)) lines.push(`- ${k}: ${n}`);
lines.push('');
lines.push('## Line endings');
lines.push('');
for (const [k, n] of Object.entries(eolCounts)) lines.push(`- ${k}: ${n}`);
lines.push('');
lines.push('## Teaser path prefixes');
lines.push('');
for (const [k, n] of Object.entries(teaserPaths)) lines.push(`- \`${k}\`: ${n}`);
lines.push('');
lines.push(`## Categories — ${Object.keys(categoryCounts).length} unique`);
lines.push('');
lines.push('| Category | Count |');
lines.push('|---|---:|');
for (const [k, n] of Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])) {
  lines.push(`| \`${k}\` | ${n} |`);
}
lines.push('');
lines.push(`## Tags — ${Object.keys(tagCounts).length} unique`);
lines.push('');
lines.push('| Tag | Count |');
lines.push('|---|---:|');
const tagsSorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
for (const [k, n] of tagsSorted) {
  lines.push(`| \`${k}\` | ${n} |`);
}
lines.push('');
lines.push('## Slug collisions');
lines.push('');
if (slugCollisions.length === 0) lines.push('_none_');
else for (const c of slugCollisions) lines.push(`- \`${c.slug}\` — ${c.files.join(' vs ')}`);
lines.push('');
lines.push(`## Titles with special chars (need double-quoting): ${titlesWithSpecialChars.length}`);
lines.push('');
lines.push(`## YAML parse errors: ${parseErrors.length}`);
for (const pe of parseErrors.slice(0, 20)) {
  lines.push(`- \`${path.relative(ROOT, pe.filePath).replace(/\\/g, '/')}\` — ${pe.parseError.split('\n')[0]}`);
}
if (parseErrors.length > 20) lines.push(`- … and ${parseErrors.length - 20} more`);
lines.push('');

fs.writeFileSync(path.join(OUT_DIR, 'audit-summary.md'), lines.join('\n'), 'utf8');

console.log(`Audited ${allEntries.length} files across ${COLLECTIONS.filter((c) => fs.existsSync(c.dir)).length} collections.`);
console.log(`Wrote: ${path.relative(ROOT, path.join(OUT_DIR, 'audit.json'))}`);
console.log(`Wrote: ${path.relative(ROOT, path.join(OUT_DIR, 'audit-summary.md'))}`);
console.log(`Categories: ${Object.keys(categoryCounts).length} unique`);
console.log(`Tags: ${Object.keys(tagCounts).length} unique`);
console.log(`Slug collisions: ${slugCollisions.length}`);
console.log(`YAML parse errors: ${parseErrors.length}`);
