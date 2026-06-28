#!/usr/bin/env node
// Phase B: read audit.json + taxonomy.json; emit category-mapping.json, tag-mapping.json, per-file-plan.json,
// taxonomy-summary.md. Read-only on content. Run after 01-audit.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'out');
const AUDIT_PATH = path.join(OUT_DIR, 'audit.json');
const TAXONOMY_PATH = path.join(__dirname, 'taxonomy.json');

if (!fs.existsSync(AUDIT_PATH)) {
  console.error(`Missing ${AUDIT_PATH}. Run 01-audit.mjs first.`);
  process.exit(1);
}

const audit = JSON.parse(fs.readFileSync(AUDIT_PATH, 'utf8'));
const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));

const canonicalCategorySet = new Set(taxonomy.canonicalCategories);
const canonicalTagSet = new Set(taxonomy.canonicalTags);
const categoryPriority = new Map(taxonomy.canonicalCategories.map((c, i) => [c, i]));

// Validate taxonomy: every value in categoryMap must be canonical (or __SKIP__).
for (const [src, dst] of Object.entries(taxonomy.categoryMap)) {
  if (src === '_comment') continue;
  if (dst === '__SKIP__') continue;
  if (!canonicalCategorySet.has(dst)) {
    console.error(`categoryMap value "${dst}" (from source "${src}") is not in canonicalCategories.`);
    process.exit(1);
  }
}
for (const [src, dst] of Object.entries(taxonomy.tagMap)) {
  if (src === '_comment') continue;
  if (dst === null) continue;
  if (!canonicalTagSet.has(dst)) {
    console.error(`tagMap value "${dst}" (from source "${src}") is not in canonicalTags.`);
    process.exit(1);
  }
}

function pickCategory(sourceCats, collection) {
  let best = null;
  let bestRank = Infinity;
  for (const c of sourceCats) {
    const canon = taxonomy.categoryMap[c];
    if (!canon || canon === '__SKIP__') continue;
    const rank = categoryPriority.get(canon);
    if (rank != null && rank < bestRank) {
      best = canon;
      bestRank = rank;
    }
  }
  if (best) return best;
  // collection-specific default
  if (collection === 'projects') return 'Projects';
  return 'Uncategorized';
}

function mapTag(sourceTag) {
  // exact match first
  if (taxonomy.tagMap.hasOwnProperty(sourceTag)) return taxonomy.tagMap[sourceTag];
  // case-insensitive fallback
  const lower = sourceTag.toLowerCase();
  for (const [k, v] of Object.entries(taxonomy.tagMap)) {
    if (k === '_comment') continue;
    if (k.toLowerCase() === lower) return v;
  }
  // unknown — drop with log
  return undefined; // sentinel
}

function pickTags(sourceTags) {
  const out = new Set();
  const unknown = [];
  for (const t of sourceTags) {
    const m = mapTag(t);
    if (m === null) continue; // explicit drop
    if (m === undefined) { unknown.push(t); continue; }
    if (canonicalTagSet.has(m)) out.add(m);
  }
  return { tags: [...out], unknown };
}

const perFile = [];
const categoryUseCount = {};
const tagUseCount = {};
const unknownTagCount = {};
let needsLlmTags = 0;
let perfectTags = 0;
let tooManyTags = 0;

for (const e of audit.entries) {
  // skip out-of-scope collections
  if (e.collection === 'flockingai' || e.collection === 'pages') continue;

  const category = pickCategory(e.categories, e.collection);
  const { tags, unknown } = pickTags(e.tags);
  for (const u of unknown) unknownTagCount[u] = (unknownTagCount[u] ?? 0) + 1;

  // record use
  categoryUseCount[category] = (categoryUseCount[category] ?? 0) + 1;
  for (const t of tags) tagUseCount[t] = (tagUseCount[t] ?? 0) + 1;

  let tagStatus;
  if (tags.length >= 3 && tags.length <= 10) { tagStatus = 'ok'; perfectTags += 1; }
  else if (tags.length < 3) { tagStatus = 'needs-llm'; needsLlmTags += 1; }
  else { tagStatus = 'too-many'; tooManyTags += 1; }

  perFile.push({
    collection: e.collection,
    filePath: e.filePath,
    fileName: e.fileName,
    title: e.title,
    slug: e.finalSlug,
    explicitSlug: e.explicitSlug,
    derivedSlug: e.derivedSlug,
    eol: e.eol,
    existing: {
      categories: e.categories,
      tags: e.tags,
      excerpt: e.excerpt,
      teaser: e.teaser,
      hasDate: e.hasDate,
      hasPostDate: e.hasPostDate
    },
    proposed: {
      category,
      tags,
      tagStatus,
      excerpt: '__TODO__'
    },
    notes: {
      droppedTags: unknown,
      slugBecameExplicit: !e.explicitSlug
    }
  });
}

fs.writeFileSync(path.join(OUT_DIR, 'per-file-plan.json'), JSON.stringify(perFile, null, 2), 'utf8');

// category-mapping.json (echo of the source-of-truth for review)
const categoryMappingForReview = {};
for (const src of Object.keys(audit.summary.categoryCounts)) {
  categoryMappingForReview[src] = taxonomy.categoryMap[src] ?? '__UNMAPPED__';
}
fs.writeFileSync(
  path.join(OUT_DIR, 'category-mapping.json'),
  JSON.stringify(categoryMappingForReview, null, 2),
  'utf8'
);

// tag-mapping.json (every source tag → canonical-or-null-or-unmapped)
const tagMappingForReview = {};
for (const src of Object.keys(audit.summary.tagCounts)) {
  const v = mapTag(src);
  tagMappingForReview[src] = v === undefined ? '__UNMAPPED__' : v;
}
fs.writeFileSync(path.join(OUT_DIR, 'tag-mapping.json'), JSON.stringify(tagMappingForReview, null, 2), 'utf8');

// summary
const lines = [];
lines.push(`# Taxonomy proposal — ${new Date().toISOString()}`);
lines.push('');
lines.push(`Files in scope: **${perFile.length}** (posts + projects; pages + flockingai skipped)`);
lines.push('');
lines.push(`Canonical categories: **${taxonomy.canonicalCategories.length}** (limit 20)`);
lines.push(`Canonical tags: **${taxonomy.canonicalTags.length}** (limit 60)`);
lines.push('');
lines.push('## Proposed category distribution');
lines.push('');
lines.push('| Category | Files | % |');
lines.push('|---|---:|---:|');
const sortedCats = Object.entries(categoryUseCount).sort((a, b) => b[1] - a[1]);
for (const [c, n] of sortedCats) {
  lines.push(`| \`${c}\` | ${n} | ${((n / perFile.length) * 100).toFixed(1)} |`);
}
lines.push('');
lines.push(`## Proposed tag distribution (${Object.keys(tagUseCount).length} of ${taxonomy.canonicalTags.length} canonical tags used)`);
lines.push('');
lines.push('| Tag | Files |');
lines.push('|---|---:|');
const sortedTags = Object.entries(tagUseCount).sort((a, b) => b[1] - a[1]);
for (const [t, n] of sortedTags) lines.push(`| \`${t}\` | ${n} |`);
lines.push('');
const unusedTags = taxonomy.canonicalTags.filter((t) => !tagUseCount[t]);
lines.push(`## Canonical tags currently unused: ${unusedTags.length}`);
lines.push('');
for (const t of unusedTags) lines.push(`- \`${t}\``);
lines.push('');
lines.push('## Tag coverage per file');
lines.push('');
lines.push(`- 3–10 tags (ready): **${perfectTags}**`);
lines.push(`- < 3 tags (needs LLM-assist): **${needsLlmTags}**`);
lines.push(`- > 10 tags (needs trim): **${tooManyTags}**`);
lines.push('');
lines.push('## Unknown source tags (dropped, would benefit from a mapping)');
lines.push('');
const unknownSorted = Object.entries(unknownTagCount).sort((a, b) => b[1] - a[1]);
if (unknownSorted.length === 0) lines.push('_none_');
else {
  lines.push('| Source tag | Count |');
  lines.push('|---|---:|');
  for (const [t, n] of unknownSorted) lines.push(`| \`${t}\` | ${n} |`);
}
lines.push('');

fs.writeFileSync(path.join(OUT_DIR, 'taxonomy-summary.md'), lines.join('\n'), 'utf8');

console.log(`Wrote per-file-plan.json (${perFile.length} entries).`);
console.log(`Wrote category-mapping.json, tag-mapping.json, taxonomy-summary.md.`);
console.log(`Categories used: ${sortedCats.length} / ${taxonomy.canonicalCategories.length}`);
console.log(`Tags used: ${sortedTags.length} / ${taxonomy.canonicalTags.length}`);
console.log(`Files needing LLM tag-assist: ${needsLlmTags}`);
console.log(`Files with >10 tags (need trim): ${tooManyTags}`);
console.log(`Unknown source tags dropped: ${unknownSorted.length}`);
