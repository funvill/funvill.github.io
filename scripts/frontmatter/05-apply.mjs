#!/usr/bin/env node
// Phase D: read per-file-plan.json; for each entry, rewrite the file's frontmatter to the
// canonical schema. Preserves original line endings. Default mode is DRY-RUN (prints diff,
// writes nothing). Pass --apply to actually write.
//
// Flags:
//   --apply            actually write files (default is dry-run)
//   --limit N          process only the first N files
//   --filter <regex>   process only files whose filePath matches
//   --skip-todo        skip files whose excerpt is still __TODO__ (default: include them with existing or empty)
//   --quiet            don't print per-file diff in dry-run
//
// Run: node scripts/frontmatter/05-apply.mjs [--apply] [--limit 5] [--filter projects]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stringify } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(__dirname, 'out');
const PLAN_PATH = path.join(OUT_DIR, 'per-file-plan.json');

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const QUIET = args.includes('--quiet');
const SKIP_TODO = args.includes('--skip-todo');
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : Infinity;
const filterIdx = args.indexOf('--filter');
const FILTER = filterIdx !== -1 ? new RegExp(args[filterIdx + 1]) : null;

const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'));

// Fixed field order. Optional fields are emitted only when present.
const FIELD_ORDER = ['title', 'date', 'slug', 'categories', 'tags', 'excerpt', 'header', 'permalink', 'redirect_to', 'layout', 'toc', 'comments'];

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { fm: null, body: raw, eol: detectEol(raw) };
  const eol = detectEol(raw);
  const lines = raw.split(/\r?\n/);
  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === '---') { end = i; break; }
  }
  if (end === -1) return { fm: null, body: raw, eol };
  return {
    fm: lines.slice(1, end),
    body: lines.slice(end + 1).join(eol === 'CRLF' ? '\r\n' : '\n'),
    eol
  };
}

function detectEol(raw) {
  if (raw.includes('\r\n')) return 'CRLF';
  return 'LF';
}

function normalizeTeaser(p) {
  if (!p) return p;
  return p
    .replace(/^\/public\/uploads\//, '/uploads/')
    .replace(/^\/public\//, '/');
}

function buildFrontmatterObject(entry, original) {
  const out = {};
  out.title = entry.title;
  // date: derive from existing
  if (original.date != null) out.date = original.date;
  else if (original.post_date != null) out.date = original.post_date;
  // slug: always explicit
  out.slug = entry.slug;
  // categories: single-element list
  out.categories = [entry.proposed.category];
  // tags: 3..10 from proposed
  if (entry.proposed.tags && entry.proposed.tags.length > 0) out.tags = entry.proposed.tags;
  // excerpt
  if (entry.proposed.excerpt && entry.proposed.excerpt !== '__TODO__') {
    out.excerpt = entry.proposed.excerpt;
  } else if (entry.existing.excerpt) {
    out.excerpt = entry.existing.excerpt;
  }
  // header.teaser
  if (entry.existing.teaser) {
    out.header = { teaser: normalizeTeaser(entry.existing.teaser) };
  }
  // permalink, redirect_to, layout, toc, comments — pass through originals
  for (const k of ['permalink', 'redirect_to', 'layout']) {
    if (original[k] != null) out[k] = original[k];
  }
  if (original.toc != null) out.toc = !!original.toc;
  if (original.comments === false) out.comments = false;
  return out;
}

function orderedFrontmatter(obj) {
  const ordered = {};
  for (const k of FIELD_ORDER) {
    if (obj[k] !== undefined) ordered[k] = obj[k];
  }
  // any unexpected keys
  for (const k of Object.keys(obj)) {
    if (!FIELD_ORDER.includes(k)) ordered[k] = obj[k];
  }
  return ordered;
}

function stringifyFrontmatter(obj) {
  // Custom string stringification for guaranteed double-quoting on title + excerpt.
  // Use the yaml lib for the structure but post-process the title/excerpt lines if needed.
  return stringify(obj, {
    defaultStringType: 'PLAIN',
    defaultKeyType: 'PLAIN',
    lineWidth: 0,
    singleQuote: false,
    indent: 2
  }).replace(/^(title|excerpt): (.+)$/gm, (m, key, val) => {
    const trimmed = val.trim();
    // Already quoted?
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) return `${key}: ${trimmed}`;
    // Double-quote, escaping internal " and \
    const escaped = trimmed.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `${key}: "${escaped}"`;
  });
}

function diff(a, b) {
  const al = a.split('\n');
  const bl = b.split('\n');
  const out = [];
  for (let i = 0; i < Math.max(al.length, bl.length); i += 1) {
    if (al[i] !== bl[i]) {
      out.push(`  - ${al[i] ?? ''}`);
      out.push(`  + ${bl[i] ?? ''}`);
    }
  }
  return out.join('\n');
}

let processed = 0;
let skipped = 0;
let written = 0;
let changedFiles = 0;
const errors = [];

const candidates = plan
  .filter((e) => !FILTER || FILTER.test(e.filePath))
  .slice(0, LIMIT);

for (const entry of candidates) {
  if (SKIP_TODO && entry.proposed.excerpt === '__TODO__') { skipped += 1; continue; }

  const absPath = path.join(ROOT, entry.filePath);
  let raw;
  try { raw = fs.readFileSync(absPath, 'utf8'); }
  catch (e) { errors.push({ filePath: entry.filePath, error: String(e) }); continue; }

  const { fm, body, eol } = parseFrontmatter(raw);
  if (!fm) { errors.push({ filePath: entry.filePath, error: 'no frontmatter' }); continue; }

  // re-parse original YAML to extract pass-through fields (date, post_date, permalink, etc.)
  const yamlText = fm.join('\n');
  let original = {};
  try {
    const { parseDocument } = await import('yaml');
    original = parseDocument(yamlText, { uniqueKeys: false, merge: true }).toJS() ?? {};
  } catch (e) {
    errors.push({ filePath: entry.filePath, error: `yaml parse: ${e.message}` });
    continue;
  }

  const fmObj = orderedFrontmatter(buildFrontmatterObject(entry, original));
  const newFm = stringifyFrontmatter(fmObj);
  const eolStr = eol === 'CRLF' ? '\r\n' : '\n';
  // ensure body starts with a single blank line after the closing ---
  const bodyTrimmed = body.startsWith(eolStr) ? body : `${eolStr}${body}`;
  const newRaw = `---${eolStr}${newFm.replace(/\n/g, eolStr).trimEnd()}${eolStr}---${bodyTrimmed}`;

  if (newRaw === raw) { processed += 1; continue; }
  changedFiles += 1;

  if (APPLY) {
    fs.writeFileSync(absPath, newRaw, 'utf8');
    written += 1;
  } else if (!QUIET) {
    const oldFmBlock = `---${eolStr}${fm.join(eolStr)}${eolStr}---`;
    const newFmBlock = `---${eolStr}${newFm.replace(/\n/g, eolStr).trimEnd()}${eolStr}---`;
    console.log(`\n## ${entry.filePath}`);
    console.log(diff(oldFmBlock, newFmBlock));
  }
  processed += 1;
}

if (APPLY) {
  console.log(`\nAPPLIED: ${written}/${candidates.length} files written (${changedFiles} had frontmatter changes).`);
} else {
  console.log(`\nDRY-RUN: ${changedFiles}/${candidates.length} files would change.`);
  console.log('Pass --apply to write.');
}
if (skipped) console.log(`Skipped (still __TODO__): ${skipped}`);
if (errors.length) {
  console.log(`\nErrors: ${errors.length}`);
  fs.writeFileSync(path.join(OUT_DIR, 'apply-errors.json'), JSON.stringify(errors, null, 2), 'utf8');
}
