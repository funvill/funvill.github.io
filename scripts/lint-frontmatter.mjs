#!/usr/bin/env node
// Track 3.2: validate that every _posts/* and _projects/* file conforms to the canonical
// frontmatter schema. Designed to run in CI / pre-commit hooks AFTER the Track 2 migration
// has landed. Exits non-zero on any violation.
//
// Schema (see scripts/frontmatter/taxonomy.json + the canonical schema in the cleanup plan):
//   title:        non-empty string
//   date:         valid Date (any parseable form)
//   slug:         non-empty kebab-case
//   categories:   array of exactly 1 entry, from canonicalCategories
//   tags:         array of 1–10 entries, all in canonicalTags (lowercase-kebab)
//   excerpt:      non-empty string, ≤200 chars, no AI-tell words
//   header.teaser (optional): string starting with /uploads/ (not /public/uploads/)
//
// Run: node scripts/lint-frontmatter.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TAXONOMY = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/frontmatter/taxonomy.json'), 'utf8'));
const ALLOWED_CATEGORIES = new Set(TAXONOMY.canonicalCategories);
const ALLOWED_TAGS = new Set(TAXONOMY.canonicalTags);
const DIRS = [path.join(ROOT, '_posts'), path.join(ROOT, '_projects')];

const AI_TELLS = /\b(delve|tapestry|testament|vibrant|underscore|pivotal|crucial|essential|robust|seamless|landscape|realm|foster|leverage|embark|harness|garner|intricate|multifaceted|holistic|transformative|paramount|notably|ultimately|meticulous|showcasing|boasts|emphasizing|highlighting|underscoring|enhance|enduring|nestled|in the heart of|stands as|serves as|represents a|in essence|in conclusion|it is worth noting)\b/i;
const KEBAB = /^[a-z0-9][a-z0-9-]*$/;

function parseFm(raw) {
  if (!raw.startsWith('---')) return null;
  const lines = raw.split(/\r?\n/);
  let end = -1;
  for (let i = 1; i < lines.length; i += 1) if (lines[i] === '---') { end = i; break; }
  if (end === -1) return null;
  try {
    return parseDocument(lines.slice(1, end).join('\n'), { uniqueKeys: false, merge: true }).toJS() ?? {};
  } catch {
    return null;
  }
}

function validateEntry(filePath, data) {
  const errs = [];
  if (!data) { errs.push('cannot parse frontmatter'); return errs; }
  if (!data.title || typeof data.title !== 'string') errs.push('title: missing or not a string');
  if (data.date == null) errs.push('date: missing');
  else if (Number.isNaN(new Date(data.date).getTime())) errs.push('date: unparseable');
  if (!data.slug || typeof data.slug !== 'string') errs.push('slug: missing or not a string');
  else if (!KEBAB.test(data.slug)) errs.push(`slug: not kebab-case ("${data.slug}")`);

  if (!Array.isArray(data.categories) || data.categories.length !== 1) errs.push('categories: must be a single-element array');
  else if (!ALLOWED_CATEGORIES.has(data.categories[0])) errs.push(`categories: "${data.categories[0]}" not in canonicalCategories`);

  if (!Array.isArray(data.tags) || data.tags.length < 1 || data.tags.length > 10) errs.push(`tags: must be array of 1–10 (got ${data.tags?.length ?? 'none'})`);
  else for (const t of data.tags) if (!ALLOWED_TAGS.has(t)) errs.push(`tags: "${t}" not in canonicalTags`);

  if (!data.excerpt || typeof data.excerpt !== 'string') errs.push('excerpt: missing');
  else {
    if (data.excerpt.length > 200) errs.push(`excerpt: too long (${data.excerpt.length})`);
    const m = data.excerpt.match(AI_TELLS);
    if (m) errs.push(`excerpt: contains AI-tell word "${m[0]}"`);
  }

  if (data.header?.teaser) {
    const t = String(data.header.teaser);
    if (!t.startsWith('/uploads/')) errs.push(`header.teaser: should start with /uploads/ (got "${t}")`);
  }

  return errs;
}

let totalFiles = 0;
let badFiles = 0;
let totalErrors = 0;

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith('.md')) continue;
    const filePath = path.join(dir, name);
    totalFiles += 1;
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = parseFm(raw);
    const errs = validateEntry(filePath, data);
    if (errs.length) {
      badFiles += 1;
      totalErrors += errs.length;
      console.error(`\n${path.relative(ROOT, filePath)}`);
      for (const e of errs) console.error(`  - ${e}`);
    }
  }
}

console.log(`\n${totalFiles - badFiles}/${totalFiles} files pass. ${totalErrors} errors in ${badFiles} files.`);
process.exit(badFiles ? 1 : 0);
